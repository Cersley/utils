import { createTimer } from '../Utils/create-timer';
import {
  RECONNECT_TIMEOUT_RANGE,
  RANDOM_RECONNECT_TIME,
  DEFAULT_RECONNECT_ATTEMPT_NUMBER,
} from './config';

const SOCKET_EVENTS = {
  ON_OPEN: 'on-open',
  ON_CONNECTION_LOST: 'on-connection-lost',
  ON_CLOSE: 'on-close',
  ON_MESSAGE: 'on-message',
};

const SOCKET_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

/**
 * @typedef {Object} WebSocketService
 * @property {function(object):void} send - socket.send
 * @property {function(object):void} sendHeartbeat - socket.send - heartbeat wrapper
 * @property {function} close - socket.close - close and reconnect immediately
 * @property {function} clearMessagesQueue - clean up messagesQueue
 * @property {function(callback):void} onMessage - socket.onmessage
 * @property {function(callback):void} onConnectionLost - socket.close - if socket connection suspended
 * @property {function(callback):void} onClose - socket.onclose - when a socket connection cannot be automatically reopened
 * @property {function(callback):void} onOpen - socket.onopen
 * @property {boolean} isConnected - check if socket connected
 */

/**
 * @param {object} config - config to create web socket connection
 * @param {string} config.name - name of WebSocketService to show service name in logs
 * @param {string} config.url - web socket url
 * @param {Array.<string>} [config.protocols] - optional protocols
 *
 * @returns {WebSocketService}
 */
export function createWebSocket({
  name = '',
  url = '',
  protocols = [],
}) {
  if (name === '' || url === '') {
    console.error('[createWebSocket] missed required params. Pass `name` and `url`');
    return;
  }

  let reconnectAttemptNumber = 0;
  let socket = null;
  const messagesQueue = [];
  const socketStatusCallbacks = [];
  // 30sec without messages - recreate websocket connection
  const RECONNECT_TIMEOUT = createTimer({ duration: 30000 });

  connect();

  function reconnect() {
    if (socket.readyState === SOCKET_STATE.OPEN || socket.readyState === SOCKET_STATE.CONNECTING) {
      return;
    }

    connect({ isReconnect: true });
  }

  function connect({ isReconnect = false } = {}) {
    socket = new WebSocket(url, protocols);

    socket.onopen = () => {
      reconnectAttemptNumber = 0;

      processMessagesQueue();

      handleSocketStatus(SOCKET_EVENTS.ON_OPEN, { isReconnect });

      RECONNECT_TIMEOUT.start(() => {
        close();
      });
    };

    socket.onmessage = (event) => {
      RECONNECT_TIMEOUT.start(() => {
        close();
      });

      try {
        const data = JSON.parse(event.data);

        handleSocketStatus(SOCKET_EVENTS.ON_MESSAGE, data);
      } catch (error) {
        console.error(`[${name}] WebSocket event data parsing error`, error);
      }
    };

    socket.onclose = (closeEvent) => {
      if (socket.readyState === SOCKET_STATE.OPEN || socket.readyState === SOCKET_STATE.CONNECTING) {
        /**
         * In case when socket started to close after internet connection lost (e.g. RECONNECT_TIMEOUT)
         *
         * in a minute(approximately) after internet connection lost
         * `on close` event will be fired
         * (socket.readyState will be changed from 2 [CLOSING] to 3 [CLOSED])
         *
         * to prevent disconnect and reconnect from firing
         * check if a new socket is already opened
         * and skip this event
         */
        return;
      }

      /**
       * if was triggered by client - socket.close()
       * or for some clear reason from BE side
       *
       * For nginx close equals to false
       */
      if (closeEvent.wasClean) {
        reconnect();
        return;
      }

      /**
       * if socket was closed unexpectedly
       */
      console.error(`[${name}] WebSocket was closed at: ${new Date().toLocaleTimeString()}`, closeEvent.reason);

      /**
       * try to reconnect after different time
       * to prevent server connection overload
       * when everyone disconnected at the same time
       */
      const reconnectionAttemptTimeout = RECONNECT_TIMEOUT_RANGE * reconnectAttemptNumber;
      const reconnectTimeout = RANDOM_RECONNECT_TIME + reconnectionAttemptTimeout;
      const timer = setTimeout(() => {
        if (reconnectAttemptNumber === DEFAULT_RECONNECT_ATTEMPT_NUMBER) {
          handleSocketStatus(SOCKET_EVENTS.ON_CLOSE);
        }

        reconnectAttemptNumber += 1;
        if (socket.readyState === SOCKET_STATE.OPEN || socket.readyState === SOCKET_STATE.CONNECTING) {
          clearInterval(timer);
        }

        if (socket.readyState === SOCKET_STATE.CLOSED || socket.readyState === SOCKET_STATE.CLOSING) {
          reconnect();
        }
      }, reconnectTimeout);
    };
  }

  function close() {
    if (socket === null) {
      return;
    }

    if (socket.readyState === SOCKET_STATE.OPEN || socket.readyState === SOCKET_STATE.CONNECTING) {
      handleSocketStatus(SOCKET_EVENTS.ON_CONNECTION_LOST);
      socket.close();
    }
  }

  function send(data) {
    if (socket === null || socket.readyState !== SOCKET_STATE.OPEN) {
      addToMessagesQueue(data);
      return;
    }

    socket.send(JSON.stringify(data));
  }

  function sendHeartbeat(data) {
    if (socket === null || socket.readyState !== SOCKET_STATE.OPEN) {
      return;
    }

    socket.send(JSON.stringify(data));
  }

  function onMessage(cb) {
    socketStatusCallbacks.push({ event: SOCKET_EVENTS.ON_MESSAGE, cb });
  }

  function onConnectionLost(cb) {
    socketStatusCallbacks.push({ event: SOCKET_EVENTS.ON_CONNECTION_LOST, cb });
  }

  function onClose(cb) {
    socketStatusCallbacks.push({ event: SOCKET_EVENTS.ON_CLOSE, cb });
  }

  function onOpen(cb) {
    socketStatusCallbacks.push({ event: SOCKET_EVENTS.ON_OPEN, cb });
  }

  function handleSocketStatus(event, data = {}) {
    socketStatusCallbacks.forEach((sub) => {
      if (sub.event === event) {
        sub.cb(data);
      }
    });
  }

  function clearMessagesQueue() {
    messagesQueue.length = 0;
  }

  function processMessagesQueue() {
    if (messagesQueue.length === 0) {
      return;
    }

    /**
     * In case of internet disruptions on mobile devices
     * Use setInterval to make sure we handle issues between event loop ticks
     *
     * catch socket state changes to ensure:
     * - that messages are sent
     * - that messagesQueue do not miss any message to send
     */
    const intervalId = window.setInterval(() => {
      if (socket.readyState !== SOCKET_STATE.OPEN) {
        window.clearInterval(intervalId);
        return;
      }

      const message = messagesQueue.shift();
      send(message);
    });
  }

  function addToMessagesQueue(data) {
    messagesQueue.push(data);
  }

  return {
    send,
    sendHeartbeat,
    clearMessagesQueue,
    close,
    onMessage,
    onConnectionLost,
    onClose,
    onOpen,
    get isConnected() {
      return socket?.readyState === SOCKET_STATE.OPEN;
    },
  };
}
