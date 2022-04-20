/**
 * ScheduleManager - module for scheduling tasks
 * Task - function/callback that can be called multiple times
 *
 * Task can be scheduled if it do same thing over time and *do not depends* on input data
 */
const timeoutPointers = {};

/**
  * Creates a timer to run task
  * If schedule requests are having the same ID, old will be canceled, and new is scheduled
  * @param {Object} config
  * @param {function} config.task - callback|function to execute
  * @param {string} config.id - unique identification
  * @param {number} [config.timeout=500] - (optional) timeout (default: 500ms)
  */
export function scheduleTask(config = {}) {
  const { task, id, timeout = 500 } = config;

  if (!id) {
    return;
  }

  clearTimeout(timeoutPointers[id]);

  timeoutPointers[id] = setTimeout(() => {
    task();
    delete timeoutPointers[id];
  }, timeout);
}
