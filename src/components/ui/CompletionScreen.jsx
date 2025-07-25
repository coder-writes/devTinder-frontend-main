import React from 'react';

const CompletionScreen = ({ title, message, subtitle, children }) => {
    return (
        <div className="relative z-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl text-center border border-green-400/30 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-4">
            <div className="mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4">🎉</div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {title}
                </h1>
                <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full"></div>
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                {message}
            </p>
            {subtitle && (
                <div className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm text-gray-400">
                    {subtitle}
                </div>
            )}
            {children}
        </div>
    );
};

export default CompletionScreen;
