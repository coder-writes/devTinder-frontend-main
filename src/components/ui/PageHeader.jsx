import React from 'react';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="relative z-10 mb-4 md:mb-6 lg:mb-8 text-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                {title}
            </h1>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg">{subtitle}</p>
        </div>
    );
};

export default PageHeader;
