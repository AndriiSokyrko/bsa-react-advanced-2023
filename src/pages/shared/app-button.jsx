import React from 'react';

const AppButton = ({dataTestId='', className='', title}) => {
    return (
        <button
            data-test-id={dataTestId}
            className={className}
            title={title}
        >
            <span className="visually-hidden">{title}</span>
            ×
        </button>
    );
}

export default AppButton;