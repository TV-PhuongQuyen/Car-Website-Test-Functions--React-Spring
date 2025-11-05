import React from 'react';

const Input = ({ label, ...props }) => {
    return (
        <div className="form-group">
            <div>
                <label>{label}</label>
            </div>
            <div>
                <input {...props} />
            </div>
        </div>
    );
};

export default Input;
