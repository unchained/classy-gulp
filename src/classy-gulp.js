const forwardRefRegistry = require('undertaker-forward-reference');

class gulpClassFacade extends forwardRefRegistry {
  constructor() {
    super();
    this._selfProxy = new Proxy(this, {
      get: (target, name) => {
        // console.log(`getting this.[${name}]`);
        if (typeof target[name] === 'function') {
          return target[name].bind(this._selfProxy);
        } else {
          return target[name];
        }
      },
    });

    // Defining init to be non-overridable. init() gets called automatically by undertaker registry.
    Object.defineProperty(this, 'init', {
      value: (taker) => {
        const tasksObject = this.defineTasks.apply(this._selfProxy);
        for (const [name, fn] of Object.entries(tasksObject)) {
          taker.task(name, fn);
        }
      },
      writable: false,
    });
  }

  /**
   * Override this function to return an object of your tasks.
   * @return {Object} - The tasks to be registered. An Object of taskName{string}: task{function} pairs.
   */
  defineTasks() {
    return {};
  }
}

module.exports = gulpClassFacade;
