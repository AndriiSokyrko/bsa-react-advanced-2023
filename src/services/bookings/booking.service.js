class Booking {
    constructor({ apiPath, http }) {
        this._apiPath = apiPath;
        this._http = http;
    }

    allBookings() {
        return this._http.load(
            `${this._apiPath}`,
            {
                method: 'GET',
                contentType: 'application/json',
                hasAuth: true
            }
        );
    }

    deleteBookingById(id) {
        return this._http.load(
            `${this._apiPath}${id}`,
            {
                method: 'DELETE',
                hasAuth: true
            }
        );
    }

    addBooking(payload) {
        return this._http.load(`${this._apiPath}`, {
            method: 'POST',
            contentType: 'application/json',
            hasAuth: true,
            payload: JSON.stringify(payload)
        });
    }
    getBookingById(payload) {
        return this._http.load(`${this._apiPath}/${payload.id}`, {
            method: 'POST',
            contentType: 'application/json',
            hasAuth: true
        });
    }
}

export { Booking };
