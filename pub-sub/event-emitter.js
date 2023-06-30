import { createSubscribesManager } from './subscribes-manager';

/**
 * @typedef {object} EventEmitter
 * @property {function(string, function):void} subscribe
 * @property {function(string, function):void} unsubscribe
 * @property {function(string, object):void} emit
 * @property {function(string, function):void} once - subscribe only for one time call
 * @property {function(string):boolean} hasEvent - check if such event is exists
 *
 * @param {object} config
 * @param {string} config.name - event emitter name
 * @param {Object} [config.logger] - custom logger (default: console)
 * @returns {EventEmitter}
 */
export const createEventEmitter = ({ name, logger = console }) => {
  const subscribesManager = createSubscribesManager({ name, logger });

  const subscribe = (event, cb) => {
    subscribesManager.add(event, cb);
  };

  const unsubscribe = (event, cb) => {
    subscribesManager.remove(event, cb);
  };

  const emit = (event, data) => {
    subscribesManager.call(event, data);
  };

  const once = (event, fn) => {
    const wrapper = (args) => {
      fn(args);
      unsubscribe(event, wrapper);
    };

    subscribe(event, wrapper);
  };

  const hasEvent = (event) => subscribesManager.hasEvent(event);

  return {
    subscribe,
    unsubscribe,
    emit,
    once,
    hasEvent,
    // for test
    subscribesManager,
  };
};
