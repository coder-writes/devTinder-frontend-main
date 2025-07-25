import React from 'react';
import { commonStyles } from '../../theme/colors';

const InputField = ({ 
    icon: Icon, 
    type = "text", 
    placeholder, 
    value, 
    onChange, 
    name,
    required = false 
}) => {
    return (
        <div className={commonStyles.inputField}>
            {Icon && <Icon size={16} className="text-[#ff512f] sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base min-w-0"
            />
        </div>
    );
};

export default InputField;
