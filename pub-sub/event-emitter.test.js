import { createEventEmitter } from './EventEmitter';

describe('EventManager', () => {
  let EventEmitter;

  beforeEach(() => {
    global.console.warn = jest.fn();
    EventEmitter = createEventEmitter({ name: 'TestEventEmitter' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new SubscribesManager when creating EventEmitter', () => {
    expect(EventEmitter.subscribesManager.name).toBe('TestEventEmitter');
  });

  it('should call `add` method of SubscribesManager when adding new subscription', () => {
    const fn = () => {};
    const eventName = 'test';
    const spy = jest.spyOn(EventEmitter.subscribesManager, 'add');

    EventEmitter.subscribe(eventName, fn);

    expect(spy).toHaveBeenCalledWith(eventName, fn);
  });

  it('should call `hasEvent` method of SubscribesManager when checking if event exists', () => {
    const eventName = 'test';
    const spy = jest.spyOn(EventEmitter.subscribesManager, 'hasEvent');

    EventEmitter.hasEvent(eventName);

    expect(spy).toHaveBeenCalledWith(eventName);
  });

  it('should call `call` method of SubscribesManager when emitting event', () => {
    const eventName = 'test';
    const eventData = { test: 'test' };
    const spy = jest.spyOn(EventEmitter.subscribesManager, 'call');

    EventEmitter.emit(eventName, eventData);
    expect(spy).toHaveBeenCalledWith(eventName, eventData);
  });

  it('should call `remove` method of SubscribesManager when unsubscribing from event', () => {
    const fn = () => {};
    const eventName = 'test';
    const spy = jest.spyOn(EventEmitter.subscribesManager, 'remove');

    EventEmitter.unsubscribe(eventName, fn);
    expect(spy).toHaveBeenCalledWith(eventName, fn);
  });

  it('should remove event when using method `once`', () => {
    const fn = () => {};
    const eventName = 'test';
    EventEmitter.once(eventName, fn);
    EventEmitter.emit(eventName, 'data');

    expect(EventEmitter.hasEvent(eventName)).toBeFalsy();
  });
});
