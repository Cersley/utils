import { createEventEmitter, createSubscribesManager } from './event-emitter';

describe('EventManager', () => {
  let SubscribesManager;
  let EventEmitter;

  beforeEach(() => {
    SubscribesManager = createSubscribesManager();
    EventEmitter = createEventEmitter(SubscribesManager);
  });

  afterEach(() => {
    SubscribesManager.reset();
  });

  describe('subscriptions', () => {
    it('should add new subscription', () => {
      const fn = () => {};
      const eventName = 'test';
      const expected = [fn];

      EventEmitter.on(eventName, fn);

      expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
    });
    it('should delete correct subscription', () => {
      const fn = () => {};
      const fn1 = () => {};
      const eventName = 'test';
      const expected = [fn1];
      EventEmitter.on(eventName, fn);
      EventEmitter.on(eventName, fn1);

      EventEmitter.off(eventName, fn);
      expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
    });
    it('will not delete anything without subscription event', () => {
      const fn = () => {};
      const fn1 = () => {};
      const eventName = 'test';
      const expected = [fn, fn1];
      EventEmitter.on(eventName, fn);
      EventEmitter.on(eventName, fn1);

      EventEmitter.off();
      expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
    });
    it('will not delete anything without subscription cb', () => {
      const fn = () => {};
      const fn1 = () => {};
      const eventName = 'test';
      const expected = [fn, fn1];
      EventEmitter.on(eventName, fn);
      EventEmitter.on(eventName, fn1);

      EventEmitter.off(eventName);
      expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
    });
    it('will not trow error when emit event without any subscribe', () => {
      const testData = 'test data';
      const testEvent = 'test';
      SubscribesManager.call = jest.fn();

      EventEmitter.emit(testEvent, testData);

      expect(SubscribesManager.get(testEvent)).toBeUndefined();
      expect(SubscribesManager.call).toHaveBeenCalledWith(testEvent, testData);
    });
    it('should call subscriptions correctly', () => {
      const mockFn = jest.fn(() => 0);
      const mockFn1 = jest.fn(() => 1);
      const mockFn2 = jest.fn(() => 2);
      EventEmitter.on('test', mockFn);
      EventEmitter.on('test', mockFn1);
      EventEmitter.on('test1', mockFn1);
      EventEmitter.on('test1', mockFn2);

      EventEmitter.emit('test');
      expect(mockFn.mock.calls.length).toBe(1);
      expect(mockFn1.mock.calls.length).toBe(1);
      expect(mockFn2.mock.calls.length).toBe(0);

      EventEmitter.emit('test');
      expect(mockFn.mock.calls.length).toBe(2);
      expect(mockFn1.mock.calls.length).toBe(2);
      expect(mockFn2.mock.calls.length).toBe(0);

      EventEmitter.emit('test1');
      expect(mockFn.mock.calls.length).toBe(2);
      expect(mockFn1.mock.calls.length).toBe(3);
      expect(mockFn2.mock.calls.length).toBe(1);
    });
  });
});
