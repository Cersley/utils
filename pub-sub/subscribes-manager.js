export const createSubscribesManager = ({ name = 'Default', logger = console }) => {
  let subscribes = {};

  const call = (event, data) => {
    if (subscribes[event] === undefined) {
      logger.warn(`[event-emitter](${name}) Can't call event. No subscription on \`${event}\` event`);
      return;
    }

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
      logger.warn(`[event-emitter](${name}) Can't remove event. No subscription on \`${event}\` event`);
      return;
    }

    subscribes[event] = subscribes[event].filter((fn) => fn !== cb);

    if (subscribes[event].length === 0) {
      delete subscribes[event];
    }
  };

  const get = (event) => subscribes[event];

  /**
   * Indicates if event is present and has listeners
   *
   * @param {string} event - event key
   * @returns {boolean}
   */
  const hasEvent = (event) => get(event) !== undefined;

  const reset = () => { subscribes = {}; };

  return {
    call,
    add,
    remove,
    reset,
    hasEvent,
    // for testing
    get,
    name,
  };
};
