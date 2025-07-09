import React from 'react';

const CompletionScreen = ({ title, message, subtitle, children }) => {
    return (
        <div className="relative z-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-3xl p-16 shadow-2xl text-center border border-green-400/30 max-w-2xl mx-4">
            <div className="mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
                {message}
            </p>
            {subtitle && (
                <div className="mt-8 text-sm text-gray-400">
                    {subtitle}
                </div>
            )}
            {children}
        </div>
    );
};

export default CompletionScreen;
