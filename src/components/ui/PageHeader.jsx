import React from 'react';
import { colors } from '../../theme/colors';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="relative z-10 mb-4 sm:mb-6 md:mb-8 text-center px-4">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${colors.text.gradient} mb-1 sm:mb-2 drop-shadow-lg`}>
                {title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">{subtitle}</p>
        </div>
    );
};

export default PageHeader;
