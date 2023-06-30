import { createTimer } from './create-timer';

describe('[Utils] createTimer', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should throw error when duration param is missed', () => {
    createTimer();

    expect(console.error).toBeCalledWith('[Utils][createTimer] error: missed `duration` param in config object');
  });

  it('should throw warning when type param is invalid', () => {
    createTimer({ duration: 1000, type: 'test' });

    expect(console.error).toBeCalledWith('[Utils][createTimer] error: invalid type');
  });

  it('should call callback when timer is end', () => {
    const callback = jest.fn();

    const timer = createTimer({ duration: 1000 });

    timer.start(callback);

    jest.runAllTimers();

    expect(callback).toBeCalled();
  });
  it('should not call callback when timeout timer is stopped', () => {
    const callback = jest.fn();

    const timeoutTimer = createTimer({ duration: 1000, type: 'timeout' });

    timeoutTimer.start(callback);
    timeoutTimer.stop();

    jest.runAllTimers();

    expect(callback).not.toBeCalled();
  });
  it('should stop previous timer when starting a new one', () => {
    const callback = jest.fn();

    const timer = createTimer({ duration: 1000 });

    timer.start(callback);
    timer.start(callback);

    jest.runAllTimers();

    expect(callback).toBeCalledTimes(1);
  });
  it('should create interval timer when passing type `interval`', () => {
    const callback = jest.fn();

    const timer = createTimer({ duration: 1000, type: 'interval' });

    timer.start(callback);
    jest.advanceTimersByTime(3000);

    expect(callback).toBeCalledTimes(3);
  });
  it('should not call callback after interval timer is stopped', () => {
    const callback = jest.fn();

    const intervalTimer = createTimer({ duration: 1000, type: 'interval' });

    intervalTimer.start(callback);
    jest.advanceTimersByTime(3000);
    intervalTimer.stop();
    jest.advanceTimersByTime(2000);

    expect(callback).toBeCalledTimes(3);
  });
});
