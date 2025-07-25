import React from 'react';

const CompletionScreen = ({ title, message, subtitle, children }) => {
    return (
        <div className="relative z-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl text-center border border-green-400/30 max-w-2xl mx-4">
            <div className="mb-4 sm:mb-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎉</div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                    {title}
                </h1>
                <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed px-4">
                {message}
            </p>
            {subtitle && (
                <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-400">
                    {subtitle}
                </div>
            )}
            {children}
        </div>
    );
};

export default CompletionScreen;
