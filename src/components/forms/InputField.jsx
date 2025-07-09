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
            {Icon && <Icon size={18} className="text-[#ff512f]" />}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
            />
        </div>
    );
};

export default InputField;
