import React from 'react';
import '../assets/css/style.css'

const Spinner = (error='') => {
    return (
        <>
            {error.length ? <h2>{error}</h2> : ""}
            <div data-test-id="loader" className="loader"></div>
        </>
    );
}

export default Spinner;