export const createSubscribesManager = () => {
  let subscribes = {};

  const get = (event) => subscribes[event];

  const call = (event, data) => {
    subscribes[event].forEach((fn) => fn(data));
  };

  const add = (event, cb) => {
    if (subscribes[event] === undefined) {
      subscribes[event] = [cb];

      return;
    }

    subscribes[event].push(cb);
  };

  const remove = (event, cb) => {
    if (subscribes[event] === undefined) {
      return;
    }

    subscribes[event] = subscribes[event].filter((fn) => fn !== cb);
  };

  const reset = () => { subscribes = {}; };

  return {
    get, call, add, remove, reset,
  };
};

export const createEventEmitter = (subscribesManager) => {
  const on = (event, cb) => {
    subscribesManager.add(event, cb);
  };

  const off = (event, cb) => {
    subscribesManager.remove(event, cb);
  };

  const emit = (event, data) => {
    subscribesManager.call(event, data);
  };

  return {
    on, off, emit,
  };
};
