export function jsonp(url, cb) {
  const CALLBACK_NAME = `cb${String(Math.random()).slice(-6)}`;
  let scriptOk = false;

  window[CALLBACK_NAME] = () => {
    console.log('jsonp success');
    scriptOk = true;
    delete window[CALLBACK_NAME];
    cb(false);
  };

  const script = document.createElement('script');

  function checkCallback() {
    if (scriptOk) return;

    console.log('jsonp fail');
    delete window[CALLBACK_NAME];
    cb(true); // error === true
  }

  script.onreadystatechange = function onReadyStateChange() {
    if (this.readyState === 'complete' || this.readyState === 'loaded') {
      this.onreadystatechange = null;
      setTimeout(checkCallback, 0); // call after script
    }
  };

  script.onerror = checkCallback;
  script.onload = checkCallback;

  script.src = `${url}?callback=${CALLBACK_NAME}`;
  document.head.appendChild(script);
}
