const DEFAULT_SEPARATOR = '.';

/**
 *  Hierarchical key/value storage
 */
export default class Registry {
  /**
   * @param {Object} startValue - plain JS object used as initial
   * storage value
   * @param {Object} options
   */
  constructor(startValue = {}, options = {}) {
    const {
      separator = DEFAULT_SEPARATOR,
    } = options;

    this.registry = startValue;
    this.separator = separator;
  }

  /**
   * @param path - string that contains path to key in storage
   * @param {any} defaultValue - will be return if key does not exist
   * @returns {any} - value^ that was fount in storage or defaultValue in negative case
   */
  get(path, defaultValue = undefined) {
    if (path === undefined) {
      return this.registry;
    }

    const result = path.split(this.separator)
      .reduce((currentBlock, part) => {
        if (currentBlock === undefined
          || currentBlock[part] === undefined
          || currentBlock[part] === null
        ) {
          return undefined;
        }

        return currentBlock[part];
      }, this.registry);

    return (result === undefined)
      ? defaultValue
      : result;
  }

  /**
   * @param path
   * @param value
   */
  set(path, value) {
    let currentBlock = this.registry;
    const parts = path.split(this.separator);

    parts.forEach((part, index) => {
      if ((parts.length - 1) === index) {
        currentBlock[part] = value;

        return;
      }

      if (currentBlock[part] === undefined) {
        currentBlock[part] = {};
      }

      currentBlock = currentBlock[part];
    });
  }
}
