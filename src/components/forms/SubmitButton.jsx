import React from 'react';
import { commonStyles } from '../../theme/colors';

const SubmitButton = ({ 
    type = "submit", 
    className = "", 
    disabled = false,
    text = "Submit",
    onClick
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${commonStyles.primaryButton} ${className}`}
        >
            {text}
        </button>
    );
};

export default SubmitButton;
