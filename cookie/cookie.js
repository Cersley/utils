// `${cookieName}-legacy` for SameSite issue
const Cookie = {
  // return cookie with name,
  // or undefined
  get(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ));

    if (matches !== null) {
      return matches[1];
    }

    const nameLegacy = `${name}-legacy`;
    const matchesLegacy = document.cookie.match(new RegExp(
      `(?:^|; )${nameLegacy.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ));

    if (matchesLegacy !== null) {
      return matchesLegacy[1];
    }

    return undefined;
  },
  set(key, value) {
    document.cookie = `${key}=${value};path=/;SameSite=None;Secure`;
    document.cookie = `${key}-legacy=${value};path=/;Secure`;
  },
  check() {
    document.cookie = 'cookieEnabled=1;path=/;SameSite=None;Secure';
    document.cookie = 'cookieEnabled-legacy=1;path=/;Secure';

    return (
      document.cookie.indexOf('cookieEnabled=') !== -1
      || document.cookie.indexOf('cookieEnabled-legacy=') !== -1
    );
  },
};

export default Cookie;
