import React from 'react';
import { commonStyles } from '../../theme/colors';

const SocialLoginButton = ({ provider, icon, text, bgColor = "bg-white/5", hoverColor = "hover:bg-white/10" }) => {
    const getButtonStyles = () => {
        switch (provider) {
            case 'google':
                return `border border-gray-700 ${bgColor} ${hoverColor}`;
            case 'github':
                return 'bg-black/80 hover:bg-black';
            case 'linkedin':
                return 'bg-blue-700/90 hover:bg-blue-800';
            default:
                return `border border-gray-700 ${bgColor} ${hoverColor}`;
        }
    };

    return (
        <button className={`${commonStyles.socialButton} ${getButtonStyles()}`}>
            <img src={icon} alt={provider} className="w-5 h-5" />
            <span>{text}</span>
        </button>
    );
};

export default SocialLoginButton;
