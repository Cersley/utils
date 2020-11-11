import Cookie from './cookie';

let hasStorageAccess = false;

if (!document.hasStorageAccess) {
  document.hasStorageAccess = () => Promise.resolve(true);
}

if (!document.requestStorageAccess) {
  document.requestStorageAccess = () => Promise.resolve();
}

export const checkStorageAccess = () => {
  const promise = document.hasStorageAccess();

  return promise.then((hasAccess) => {
    // Boolean hasAccess says whether the document has access or not.
    hasStorageAccess = hasAccess;
  }).catch((reason) => {
    // error occurred when user denied access to cookies in requestStorageAccess
    console.error('StorageAccessAPI error', reason);

    return Promise.reject();
  });
};

export const requestStorageAccess = () => document.requestStorageAccess()
  .then(() => {
    /**
     * if safari
     * when user firstly request storage access in iframe
     * sometimes system can behave buggy:
     * when storage access resolved successfully but actually cookies are blocked (i don't know why)
     *
     * so check again is cookie available or not
     */
    if (Cookie.check() === false) {
      return Promise.reject();
    }

    /**
     * if safari:
     * after success requestStorageAccess you will be granted to use cookie
     * but document.hasStorageAccess will return false
     * to get true from document.hasStorageAccess you have to reload the page
     * but it's not necessary
     *
     * so:
     * change hasStorageAccess variable to true after success request and use it
     */
    hasStorageAccess = true;

    return hasStorageAccess;
  });

export const getStorageAccess = () => hasStorageAccess;
