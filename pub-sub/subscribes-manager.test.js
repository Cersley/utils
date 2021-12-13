import { createSubscribesManager } from './SubscribesManager';

describe('SubscribesManager', () => {
  let SubscribesManager;

  beforeEach(() => {
    global.console.warn = jest.fn();
    SubscribesManager = createSubscribesManager({ name: 'Test', logger: global.console });
  });

  afterEach(() => {
    SubscribesManager.reset();
    jest.clearAllMocks();
  });

  it('should return correct name after creation', () => {
    const expectedName = 'ExpectedName';
    const newSubscribesManager = createSubscribesManager({ name: expectedName });

    expect(newSubscribesManager.name).toBe(expectedName);
  });

  it('should check if event is exists', () => {
    const fn = () => {};
    const eventName = 'test';

    expect(SubscribesManager.hasEvent(eventName, fn)).toBeFalsy();

    SubscribesManager.add(eventName, fn);

    expect(SubscribesManager.hasEvent(eventName, fn)).toBeTruthy();
  });

  it('should remove correct subscription', () => {
    const fn = () => {};
    const fn1 = () => {};
    const eventName = 'test';
    const expected = [fn1];
    SubscribesManager.add(eventName, fn);
    SubscribesManager.add(eventName, fn1);

    SubscribesManager.remove(eventName, fn);
    expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
  });

  it('should log warn when removing event without subscription', () => {
    const newName = 'NewName';
    const newSubscribesManager = createSubscribesManager({ name: newName });
    const eventName = 'test';
    const expectedLogMessage = `[event-emitter](${newName}) Can't remove event. No subscription on \`${eventName}\` event`;
    newSubscribesManager.remove(eventName, 'data');

    expect(console.warn).toBeCalledWith(expectedLogMessage);

    expect(newSubscribesManager.hasEvent(eventName)).toBeFalsy();
  });
  it('should remove event after removing last subscription', () => {
    const fn = () => {};
    const fn1 = () => {};
    const eventName = 'test';
    const expected = [fn1];
    SubscribesManager.add(eventName, fn);
    SubscribesManager.add(eventName, fn1);

    SubscribesManager.remove(eventName, fn);
    expect(SubscribesManager.hasEvent(eventName)).toBeTruthy();
    expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
    SubscribesManager.remove(eventName, fn1);
    expect(SubscribesManager.hasEvent(eventName)).toBeFalsy();
  });
  it('should not delete anything without subscription event', () => {
    const fn = () => {};
    const fn1 = () => {};
    const eventName = 'test';
    const expected = [fn, fn1];
    SubscribesManager.add(eventName, fn);
    SubscribesManager.add(eventName, fn1);

    SubscribesManager.remove();
    expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
  });
  it('should not delete anything without subscription cb', () => {
    const fn = () => {};
    const fn1 = () => {};
    const eventName = 'test';
    const expected = [fn, fn1];
    SubscribesManager.add(eventName, fn);
    SubscribesManager.add(eventName, fn1);

    SubscribesManager.remove(eventName);
    expect(SubscribesManager.get(eventName)).toEqual(expect.arrayContaining(expected));
  });

  it('should log warn when emitting event without subscription', () => {
    const newName = 'NewName';
    const newSubscribesManager = createSubscribesManager({ name: newName });
    const eventName = 'test';
    const expectedLogMessage = `[event-emitter](${newName}) Can't call event. No subscription on \`${eventName}\` event`;
    newSubscribesManager.call(eventName, 'data');

    expect(console.warn).toBeCalledWith(expectedLogMessage);

    expect(newSubscribesManager.hasEvent(eventName)).toBeFalsy();
  });

  it('should call subscriptions correctly', () => {
    const mockFn = jest.fn(() => 0);
    const mockFn1 = jest.fn(() => 1);
    const mockFn2 = jest.fn(() => 2);
    SubscribesManager.add('test', mockFn);
    SubscribesManager.add('test', mockFn1);
    SubscribesManager.add('test1', mockFn1);
    SubscribesManager.add('test1', mockFn2);

    SubscribesManager.call('test');
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn1.mock.calls.length).toBe(1);
    expect(mockFn2.mock.calls.length).toBe(0);

    SubscribesManager.call('test');
    expect(mockFn.mock.calls.length).toBe(2);
    expect(mockFn1.mock.calls.length).toBe(2);
    expect(mockFn2.mock.calls.length).toBe(0);

    SubscribesManager.call('test1');
    expect(mockFn.mock.calls.length).toBe(2);
    expect(mockFn1.mock.calls.length).toBe(3);
    expect(mockFn2.mock.calls.length).toBe(1);
  });
});
