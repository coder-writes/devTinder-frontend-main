import React from 'react';
import { motion } from 'framer-motion';
import { commonStyles } from '../../theme/colors';

const AuthLayout = ({ children }) => {
    return (
        <div className={`${commonStyles.centerLayout} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                    duration: 0.6, 
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                className={`
                    ${commonStyles.glassCard} 
                    max-w-md w-full mx-4 sm:mx-0 
                    ${commonStyles.padding.card} 
                    space-y-6 sm:space-y-8 
                    text-white relative z-10
                    hover:shadow-2xl hover:shadow-purple-500/20
                    transform transition-all duration-500
                `}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default AuthLayout;
