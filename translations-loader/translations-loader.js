/**
 * Load translation by window object from separated files
 */
const DEFAULT_LANGUAGE = 'en';

// create global translations object
window.APP.translations = {};

// list of all languages in project
const langsList = {
  // define list of files
  // for example use gere dynamic imports
  // en: () => import(/* webpackChunkName: "en" */ '.../translate.json'),
};

// get lang from url
const languageFromUrl = getUrlParameter('lang');

if (langsList[languageFromUrl] === undefined) {
  console.warn(`No such language in this app. Setup with: ${DEFAULT_LANGUAGE}`);
}

const langPromises = [langsList[DEFAULT_LANGUAGE]()];

if (languageFromUrl !== DEFAULT_LANGUAGE && langsList[languageFromUrl] !== undefined) {
  langPromises.push(langsList[languageFromUrl]());
}

// setup languages to window.APP.translations object
Promise.all(langPromises).then(([defaultLang, currentLang]) => {
  window.APP.translations[DEFAULT_LANGUAGE] = defaultLang.default;

  if (currentLang !== undefined) {
    window.APP.translations[languageFromUrl] = currentLang.default;
  }
});

/**
 * 1) check downloaded langs
 * 2) check if such lang presented in langs list
 *    if not - use default language
 * 3) download new language from langs list
 */
window.APP.translations.getTranslations = (lang) => {
  if (window.APP.translations[lang] !== undefined) {
    return Promise.resolve(window.APP.translations[lang]);
  }

  if (langsList[lang] === undefined) {
    console.warn(`No such language in this app. Setup with: ${DEFAULT_LANGUAGE}`);
    return Promise.resolve(window.APP.translations[DEFAULT_LANGUAGE]);
  }

  return langsList[lang]().then((newLang) => {
    window.APP.translations[lang] = newLang.default;

    return newLang.default;
  });
};

// utils
function getUrlParameter(name) {
  const escapedName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[?&]${escapedName}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
