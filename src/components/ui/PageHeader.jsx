import React from 'react';
import { colors } from '../../theme/colors';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="relative z-10 mb-8 text-center">
            <h1 className={`text-4xl font-bold ${colors.text.gradient} mb-2 drop-shadow-lg`}>
                {title}
            </h1>
            <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
    );
};

export default PageHeader;
