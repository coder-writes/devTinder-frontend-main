import React from 'react';
import { commonStyles } from '../../theme/colors';

const SocialLoginButton = ({ provider, icon, text, bgColor = "bg-white/5", hoverColor = "hover:bg-white/10", onClick, isLoading = false }) => {
    const getButtonStyles = () => {
        switch (provider) {
            case 'google':
                return `border hover:cursor-pointer border-gray-700 ${bgColor} ${hoverColor}`;
            case 'github':
                return 'bg-black/80 hover:bg-black hover:cursor-pointer';
            case 'linkedin':
                return 'bg-blue-700/90 hover:bg-blue-800 hover:cursor-pointer';
            default:
                return `border border-gray-700 ${bgColor} ${hoverColor}`;
        }
    };

    const handleClick = () => {
        if (onClick && !isLoading) {
            onClick(provider);
        }
    };

    return (
        <button 
            className={`${commonStyles.socialButton} ${getButtonStyles()} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            type="button"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    <img src={icon} alt={provider} className="w-5 h-5" />
                    <span>{text}</span>
                </>
            )}
        </button>
    );
};

export default SocialLoginButton;
