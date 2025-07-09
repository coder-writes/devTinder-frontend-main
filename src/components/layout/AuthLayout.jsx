import React from 'react';
import { commonStyles } from '../../theme/colors';

const AuthLayout = ({ children }) => {
    return (
        <div className={commonStyles.centerLayout}>
            <div className={`${commonStyles.glassCard} max-w-md w-full p-8 space-y-7 text-white`}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
