import React from 'react';

const AuthDivider = ({ text }) => {
    return (
        <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex-grow border-t border-gray-700"></div>
            {text}
            <div className="flex-grow border-t border-gray-700"></div>
        </div>
    );
};

export default AuthDivider;
