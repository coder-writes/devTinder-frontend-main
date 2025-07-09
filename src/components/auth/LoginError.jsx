import React from 'react';

const LoginError = ({ message }) => {
    if (!message) return null;
    return (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded mb-3 text-sm text-center">
            {message}
        </div>
    );
};

export default LoginError;