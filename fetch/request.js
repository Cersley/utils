class Request {
  constructor(xsrf) {
    this.xsrf = xsrf;
  }

  get(url) {
    return this._make(url, {
      method: 'GET',
      credentials: 'same-origin',
    });
  }

  post(url, data) {
    const dataWithMeta = {
      ...data,
      meta: {
        _xsrf: this.xsrf,
      },
    };

    return this._make(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithMeta),
    });
  }

  put(url, data) {
    const dataWithMeta = {
      ...data,
      meta: {
        _xsrf: this.xsrf,
      },
    };

    return this._make(url, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithMeta),
    });
  }

  _make(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.status !== 200) {
          console.log('request error:\n\n', response);
          return Promise.reject(response.text());
        }

        return response.json();
      })
      .then((response) => {
        if (response.meta._xsrf !== undefined) {
          this.xsrf = response.meta._xsrf;
        }

        return response;
      });
  }
}

export const request = new Request(/* xsrf */);
