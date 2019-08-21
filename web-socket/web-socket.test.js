import { Socket } from './web-socket';

describe('socketService', () => {
  let socketService;

  beforeEach(() => {
    socketService = new Socket();
  });

  describe('subscriptions', () => {
    it('should add new subscription', () => {
      const fn = () => {};
      const expected = [{ event: 'test', cb: fn }];
      socketService.on('test', fn);

      expect(socketService.subscribes).toEqual(expect.arrayContaining(expected));
    });
    it('should delete correct subscription', () => {
      const fn = () => {};
      const fn1 = () => {};
      const expected = [{ event: 'test', cb: fn1 }];
      socketService.on('test', fn);
      socketService.on('test', fn1);

      socketService.off('test', fn);
      expect(socketService.subscribes).toEqual(expect.arrayContaining(expected));
    });
    it('will not delete anything without subscription event', () => {
      const fn = () => {};
      const fn1 = () => {};
      const expected = [{ event: 'test', cb: fn }, { event: 'test', cb: fn1 }];
      socketService.on('test', fn);
      socketService.on('test', fn1);

      socketService.off();
      expect(socketService.subscribes).toEqual(expect.arrayContaining(expected));
    });
    it('will not delete anything without subscription cb', () => {
      const fn = () => {};
      const fn1 = () => {};
      const expected = [{ event: 'test', cb: fn }, { event: 'test', cb: fn1 }];
      socketService.on('test', fn);
      socketService.on('test', fn1);

      socketService.off('test');
      expect(socketService.subscribes).toEqual(expect.arrayContaining(expected));
    });
    it('should call subscriptions correctly', () => {
      const mockFn = jest.fn(() => 0);
      const mockFn1 = jest.fn(() => 1);
      const mockFn2 = jest.fn(() => 2);
      socketService.on('test', mockFn);
      socketService.on('test', mockFn1);
      socketService.on('test1', mockFn1);
      socketService.on('test1', mockFn2);

      socketService.callSubscribes('test');
      expect(mockFn.mock.calls.length).toBe(1);
      expect(mockFn1.mock.calls.length).toBe(1);
      expect(mockFn2.mock.calls.length).toBe(0);

      socketService.callSubscribes('test');
      expect(mockFn.mock.calls.length).toBe(2);
      expect(mockFn1.mock.calls.length).toBe(2);
      expect(mockFn2.mock.calls.length).toBe(0);

      socketService.callSubscribes('test1');
      expect(mockFn.mock.calls.length).toBe(2);
      expect(mockFn1.mock.calls.length).toBe(3);
      expect(mockFn2.mock.calls.length).toBe(1);
    });
  });
});
