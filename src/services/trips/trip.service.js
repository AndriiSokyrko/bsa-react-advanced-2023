class Trip {
    constructor({ apiPath, http }) {
        this._apiPath = apiPath;
        this._http = http;
    }

    getTripById(tripId) {
        return this._http.load(
            `${this._apiPath}${tripId}`,
            {
                method: 'GET',
                contentType: 'application/json'
            }
        );
    }

    getTrips() {
        return this._http.load(
            `${this._apiPath}`,
            {
                method: 'GET',
                contentType: 'application/json'
            }
        );
    }

}

export { Trip };
