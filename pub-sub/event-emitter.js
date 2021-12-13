import { createSubscribesManager } from './SubscribesManager';

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
