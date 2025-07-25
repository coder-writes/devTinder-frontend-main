import React from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../../theme/colors';

const SubmitButton = ({ 
    type = "submit", 
    className = "", 
    disabled = false,
    text = "Submit",
    onClick,
    isLoading = false
}) => {
    return (
        <motion.button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`
                ${commonStyles.primaryButton} 
                ${className}
                relative overflow-hidden
                ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            whileHover={!disabled && !isLoading ? { 
                scale: 1.02,
                boxShadow: "0 10px 40px rgba(168, 85, 247, 0.4)" 
            } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2 }}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                </div>
            ) : (
                <span className="relative z-10">{text}</span>
            )}
            
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
};

export default SubmitButton;
