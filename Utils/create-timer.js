const TIMER_TYPES = {
  INTERVAL: 'interval',
  TIMEOUT: 'timeout',
};

/**
 * @typedef {Object} timerManager
 * @property {function} start - start created timer (automatically stops current timer)
 * @property {function} stop - stop current timer
 *
 * @param {Object} config
 * @param {number} config.duration - set timer duration
 * @param {'timeout'|'interval'} [config.type=timeout] - set timer type
 * @param {function} [config.logger] - custom logger (default: console)
 *
 * @returns {timerManager}
 */
export const createTimer = ({ duration, type = TIMER_TYPES.TIMEOUT, logger = console } = {}) => {
  if (duration === undefined) {
    logger.error('[Utils][createTimer] error: missed `duration` param in config object');
    return;
  }

  if (type !== TIMER_TYPES.TIMEOUT && type !== TIMER_TYPES.INTERVAL) {
    console.error('[Utils][createTimer] error: invalid type');
    return;
  }

  let timer = 0;

  // eslint-disable-next-line consistent-return

  const timerManager = {
    start: (callback) => {
      timerManager.stop();

      if (type === TIMER_TYPES.TIMEOUT) {
        timer = setTimeout(callback, duration);
        return;
      }

      if (type === TIMER_TYPES.INTERVAL) {
        timer = setInterval(callback, duration);
      }
    },
    stop: () => {
      if (type === TIMER_TYPES.TIMEOUT) {
        clearTimeout(timer);
        return;
      }

      if (type === TIMER_TYPES.INTERVAL) {
        clearInterval(timer);
      }
    },
  };

  return timerManager;
};
