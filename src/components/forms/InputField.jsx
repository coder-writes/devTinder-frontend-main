import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div 
            className={`
                ${commonStyles.inputField}
                group focus-within:scale-[1.02]
            `}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {Icon && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-purple-400 group-focus-within:text-purple-300 transition-colors duration-200"
                >
                    <Icon size={18} />
                </motion.div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                className={`
                    bg-transparent w-full focus:outline-none text-white 
                    placeholder-gray-400 placeholder:transition-colors
                    focus:placeholder-gray-500
                    ${commonStyles.responsiveText.body}
                `}
            />
        </motion.div>
    );
};

export default InputField;
