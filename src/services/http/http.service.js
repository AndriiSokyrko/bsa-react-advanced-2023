class Http {
  constructor({ storage }) {
    this._storage = storage;
  }

  load(url, options = {}) {
    const {
      method = 'GET',
      payload = null,
      hasAuth = true,
      contentType = 'application/json',
      query
    } = options;
    const headers = this._getHeaders({
      hasAuth,
      contentType
    });

    return fetch(this._getUrl(url, query), {
      method,
      headers,
      body: payload
    })
      .then(this._checkStatus)
      .then(this._parseJSON)
      .catch(this._throwError);
  }

  _getHeaders({ hasAuth, contentType }) {
    const headers = new Headers();

    if (contentType) {
      headers.append('content-type', contentType);
    }

    if (hasAuth) {
      const token = this._storage.getItem('TOKEN');

      headers.append('authorization', `Bearer ${token}`);
    }

    return headers;
  }

  async _checkStatus(response) {
    if (!response.ok) {

      const parsedException = await response.json().catch(() => ({
        message: response.statusText
      }));
        throw ({
        status: response.status,
        message: parsedException?.message
      });
    }

    return response;
  }

  _getUrl(url, query) {
    return `${url}${query ? `?${JSON.stringify(query)}` : ''}`;
  }

  _parseJSON(response) {
    return response.json();
  }

  _throwError(err) {
      throw err;
  }
}

export { Http };
