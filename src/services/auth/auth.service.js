class Auth {
    constructor({ apiPath, http }) {
        this._apiPath = apiPath;
        this._http = http;
    }

    signIn(payload) {
        return this._http.load(
            `${this._apiPath}${payload.path}`,
            {
                method: 'POST',
                contentType: 'application/json',
                hasAuth: false,
                payload: JSON.stringify(payload.request)
            }
        );
    }

    signUp(payload) {
        return this._http.load(
            `${this._apiPath}${payload.path}`,
            {
                method: 'POST',
                contentType: 'application/json',
                hasAuth: false,
                payload: JSON.stringify(payload.request)
            }
        );
    }

    authenticatedUser(payload) {
         return this._http.load(
             `${this._apiPath}${payload.path}`,
            {
                method: 'GET',
                contentType: 'application/json',
                hasAuth: true

            }
        );
    }

    signOut(payload) {
        return this._http.load(
            `${this._apiPath}${payload.path}`,
            {
                method: 'DELETE',
                hasAuth: true,
            }
        );
    }
}

export { Auth };