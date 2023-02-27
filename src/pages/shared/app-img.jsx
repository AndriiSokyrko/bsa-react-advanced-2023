import React from 'react';
const AppImg = ({dataTestId='', src='', fromInet = false, className='', alt=''}) => {
    const path =  !fromInet ? require(`../assets/images/${src}`) : src;
    return (
        <img
            data-test-id={dataTestId}
            src={path}
            className={className}
            alt={alt}
        />
    );
}

export default AppImg;