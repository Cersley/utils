import { createEventEmitter } from '../pub-sub/event-emitter';

const THEMES = {
  LIGHT: 'scxThemeLight',
  DARK: 'scxThemeDark',
};

let currentTheme = '';
/**
 * Every app module that have to know about theme change
 * Have to subscribe to the `GlobalTheme.onChange` callback
 */
const globalThemeEventEmitter = createEventEmitter({ name: 'GlobalTheme' });
const GLOBAL_THEME_CHANGE_EVENT = 'global-theme-change';

const GlobalTheme = {
  ...THEMES,
  get() {
    return currentTheme;
  },
  init() {
    const cachedTheme = localStorage.getItem('theme');
    if (cachedTheme) {
      currentTheme = cachedTheme;
    } else {
      currentTheme = THEMES.LIGHT;
    }

    // apply initial theme to draw UI correctly
    document.body.classList.add(currentTheme);
  },
  change(theme) {
    if (currentTheme === theme) {
      return;
    }

    currentTheme = theme;

    const { classList } = document.body;
    classList.remove(this.LIGHT);
    classList.remove(this.DARK);

    classList.add(theme);

    globalThemeEventEmitter.emit(GLOBAL_THEME_CHANGE_EVENT, theme);

    localStorage.setItem('theme', theme);
  },

  /**
   * Use this method to call all subscribers again
   *
   * e.g. to update css custom props in Modals.js
   */
  update() {
    globalThemeEventEmitter.emit(GLOBAL_THEME_CHANGE_EVENT, currentTheme);
  },

  /**
   * @param {Function} cb - callback with `theme` param
   * @param {Object} config.shouldStartWithInitialValue - if you need immediately call this callback to pass an initial value (BehaviorSubject)
   */
  onChange(cb, config = {}) {
    globalThemeEventEmitter.subscribe(GLOBAL_THEME_CHANGE_EVENT, cb);

    if (config.shouldStartWithInitialValue === true) {
      cb(currentTheme);
    }
  },
  // utils
  isDark() {
    return currentTheme === THEMES.DARK;
  },
  isLight() {
    return currentTheme === THEMES.LIGHT;
  },
};

/**
 * To reduce the time it takes to initialize theme
 * Save and retrieve Theme value from localStorage on app load
 *
 * Note:
 *
 * for default theme (LIGHT) we do not use localStorage
 * because we set the value in memory
 */
GlobalTheme.init();

export default GlobalTheme;
