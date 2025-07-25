import React from 'react';

const AuthLogo = ({ className = "" }) => {
    return (
        <img
            src="https://img.icons8.com/ios-filled/80/ffffff/source-code.png"
            alt="DevTinder Logo"
            className={`mx-auto mb-2 animate-bounce w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${className}`}
            style={{ filter: 'drop-shadow(0 2px 8px #ff512f88)' }}
        />
    );
};

export default AuthLogo;
