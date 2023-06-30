import GlobalTheme from './global-theme';

beforeEach(() => {
  localStorage.removeItem('theme');
  GlobalTheme.init();
});

describe('GlobalTheme', () => {
  it('should have initial theme', () => {
    expect(GlobalTheme.get()).toEqual(GlobalTheme.LIGHT);
  });
  it('should set initial theme from localStorage', () => {
    localStorage.setItem('theme', GlobalTheme.DARK);
    GlobalTheme.init();
    expect(GlobalTheme.get()).toEqual(GlobalTheme.DARK);
  });
  it('should change theme', () => {
    const expectedValue = GlobalTheme.DARK;
    expect(GlobalTheme.get()).toEqual(GlobalTheme.LIGHT);
    GlobalTheme.change(GlobalTheme.DARK);
    expect(GlobalTheme.get()).toEqual(expectedValue);
  });
  it('should change localStorage on theme change', () => {
    GlobalTheme.change(GlobalTheme.DARK);
    expect(localStorage.getItem('theme')).toEqual(GlobalTheme.DARK);
    GlobalTheme.change(GlobalTheme.LIGHT);
    expect(localStorage.getItem('theme')).toEqual(GlobalTheme.LIGHT);
  });
  it('should not change value if the current value is the same as new value', () => {
    const mockFn = jest.fn(() => {});

    GlobalTheme.onChange(mockFn);
    GlobalTheme.change('test');

    expect(mockFn.mock.calls.length).toBe(1);

    GlobalTheme.change('test');

    expect(mockFn.mock.calls.length).toBe(1);

    GlobalTheme.change('test2');

    expect(mockFn.mock.calls.length).toBe(2);

    GlobalTheme.change('test2');

    expect(mockFn.mock.calls.length).toBe(2);
  });
  it('should call subscribers on theme change', () => {
    const mockFn = jest.fn(() => {});
    const expectedArgument = 'test';

    GlobalTheme.onChange(mockFn);
    GlobalTheme.change(expectedArgument);

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn).toHaveBeenCalledWith(expectedArgument);
  });
  it('should call subscribers on theme update', () => {
    const mockFn = jest.fn(() => {});

    GlobalTheme.onChange(mockFn);
    GlobalTheme.update();

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it('should call subscriber immediately with shouldStartWithInitialValue argument', () => {
    const mockFn = jest.fn(() => {});
    const expectedArgument = 'test';

    localStorage.setItem('theme', expectedArgument);
    GlobalTheme.init();

    GlobalTheme.onChange(mockFn, { shouldStartWithInitialValue: true });

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn).toHaveBeenCalledWith(expectedArgument);
  });
  it('should make correct comparison based on currentTheme', () => {
    GlobalTheme.change(GlobalTheme.DARK);
    expect(GlobalTheme.isDark()).toEqual(true);

    GlobalTheme.change(GlobalTheme.LIGHT);
    expect(GlobalTheme.isLight()).toEqual(true);
  });
});
