import React from 'react';
import { commonStyles } from '../../theme/colors';

const AuthLayout = ({ children }) => {
    return (
        <div className={`${commonStyles.centerLayout} px-4 sm:px-6 lg:px-8`}>
            <div className={`${commonStyles.glassCard} max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 text-white`}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
