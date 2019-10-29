const subscribesManager = {
  subscribes: {},
  call(event, data) {
    this.subscribes[event].forEach(fn => fn(data));
  },
  add(event, cb) {
    if (this.subscribes[event] === undefined) {
      this.subscribes[event] = [cb];

      return;
    }

    this.subscribes[event].push(cb);
  },
  remove(event, cb) {
    if (this.subscribes[event] === undefined) {
      return;
    }

    this.subscribes[event] = this.subscribes[event].filter(fn => fn !== cb);
  },
};

const on = (event, cb) => {
  subscribesManager.add(event, cb);
};

const off = (event, cb) => {
  subscribesManager.remove(event, cb);
};

const emit = (event, data) => {
  subscribesManager.call(event, data);
};

export const EventEmitter = {
  on, off, emit,
};
