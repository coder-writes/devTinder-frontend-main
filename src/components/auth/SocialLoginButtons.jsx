import React from 'react';
import SocialLoginButton from './SocialLoginButton';

const SocialLoginButtons = ({ type = "login" }) => {
    const actionText = type === "login" ? "Log in" : "Sign up";
    
    const socialProviders = [
        {
            provider: 'google',
            icon: 'https://img.icons8.com/color/20/google-logo.png',
            text: `${actionText} with Google`
        },
        {
            provider: 'github',
            icon: 'https://img.icons8.com/ios-glyphs/20/ffffff/github.png',
            text: `${actionText} with GitHub`
        },
        {
            provider: 'linkedin',
            icon: 'https://img.icons8.com/ios-filled/20/ffffff/linkedin.png',
            text: `${actionText} with LinkedIn`
        }
    ];

    return (
        <div className="space-y-3">
            {socialProviders.map((social) => (
                <SocialLoginButton
                    key={social.provider}
                    provider={social.provider}
                    icon={social.icon}
                    text={social.text}
                />
            ))}
        </div>
    );
};

export default SocialLoginButtons;
