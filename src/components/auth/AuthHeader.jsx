import React from 'react';
import { colors } from '../../theme/colors';

const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-2">
            <h2 className={`text-3xl font-bold tracking-tight ${colors.text.gradient} drop-shadow-lg`}>
                {title}
            </h2>
            <p className="text-gray-300 mt-1 text-base">
                {subtitle}
            </p>
        </div>
    );
};

export default AuthHeader;
