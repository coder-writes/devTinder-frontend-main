import React from 'react';
import { colors } from '../../theme/colors';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="relative z-10 mb-6 sm:mb-8 text-center px-4">
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${colors.text.gradient} mb-2 drop-shadow-lg leading-tight`}>
                {title}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">{subtitle}</p>
        </div>
    );
};

export default PageHeader;
