export const SocketEvents = {
  ON_SOCKET_CONNECT: 'on_socket_connect',
  ON_SOCKET_CLOSED: 'on_socket_closed',
};

export class Socket {
  static get CONNECTING() { return 0; }

  static get OPEN() { return 1; }

  static get CLOSING() { return 2; }

  static get CLOSED() { return 3; }

  constructor() {
    this.socket = null;
    this.streamUrl = '';

    this.initialDataToSend = [];
    this.subscribes = [];

    this.init = this.init.bind(this);
    this.send = this.send.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.callSubscribes = this.callSubscribes.bind(this);
  }

  init(streamUrl) {
    const regex = /^(http)(s)?/;
    const socketHost = streamUrl.replace(regex, (match, a, b) => {
      if (b === 's') {
        return 'wss';
      }

      return 'ws';
    });
    const socketUrl = `${socketHost}/stream`;

    this.streamUrl = streamUrl;
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      this.initialDataToSend.forEach((data) => {
        this.send(data);
      });
      this.initialDataToSend = [];

      this.callSubscribes(SocketEvents.ON_SOCKET_CONNECT);
    };

    this.socket.onmessage = (json) => {
      const data = JSON.parse(json.data);

      this.callSubscribes(data.event, data);
    };

    this.socket.onclose = (closeEvent) => {
      if (!closeEvent.wasClean) { // when socket closed unexpectedly
        this.callSubscribes(SocketEvents.ON_SOCKET_CLOSED);
        const timer = setInterval(() => {
          if (this.socket.readyState === Socket.OPEN) {
            clearInterval(timer);
          }

          if (this.socket.readyState === Socket.CLOSED) {
            this.init(this.streamUrl);
          }
        }, 1000);
      }
    };

    this.socket.onerror = (error) => {
      console.log('WEBSOCKET ONERROR EVENT', error);
    };
  }

  send(data) {
    if (this.socket === null) {
      this.initialDataToSend.push(data);
      return;
    }

    if (this.socket.readyState !== Socket.OPEN) {
      this.initialDataToSend.push(data);
      return;
    }

    if (typeof data === 'string') {
      this.socket.send(data);
    } else {
      this.socket.send(JSON.stringify(data));
    }
  }

  on(event, cb) {
    this.subscribes.push({ event, cb });
  }

  off(event, cb) {
    this.subscribes = this.subscribes.filter((obj) => {
      if (obj.event !== event) {
        return obj;
      }

      if (cb !== obj.cb) {
        return obj;
      }
    });
  }

  callSubscribes(event, data = {}) {
    this.subscribes.forEach((sub) => {
      if (sub.event === event) {
        sub.cb(data);
      }
    });
  }
}

export const socketService = new Socket();
