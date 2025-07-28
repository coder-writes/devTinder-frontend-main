import React from 'react';
import { commonStyles } from '../../theme/colors';

const AuthLayout = ({ children }) => {
    return (
        <div className={commonStyles.centerLayout}>
            <div className={`${commonStyles.glassCard} max-w-sm md:max-w-md w-full mx-4 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-7 text-white`}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
