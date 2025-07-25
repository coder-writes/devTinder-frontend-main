import React from 'react';
import { motion as Motion } from 'framer-motion';
import { HeroSection, FeatureCard } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { commonStyles, colors } from '../theme/colors';

const Index = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    if(user){
        navigate('/feed');
    }
    return (
        <Motion.div
            className={`
                flex flex-col items-center justify-center flex-grow 
                ${commonStyles.padding.section} text-white min-h-screen
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto">
                <Motion.h1
                    className={`
                        ${commonStyles.responsiveText.hero} 
                        font-bold mb-4 sm:mb-6
                        ${colors.text.gradient}
                        drop-shadow-2xl
                    `}
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                >
                    DevTinder
                </Motion.h1>
                <Motion.p
                    className={`
                        ${commonStyles.responsiveText.subtitle} 
                        mt-4 sm:mt-6 text-gray-300 leading-relaxed
                        max-w-2xl mx-auto
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Connect. Collaborate. Code. <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Find your perfect coding partner!
                    </span>
                </Motion.p>
            </div>

            <Motion.div
                className={`
                    ${commonStyles.glassCard} 
                    ${commonStyles.padding.card}
                    max-w-sm w-full text-center
                    hover:scale-105 transition-transform duration-300
                `}
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            >
                <Motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                >
                    <span className="text-2xl sm:text-3xl">💻</span>
                </Motion.div>
                
                <Motion.h2
                    className={`
                        ${commonStyles.responsiveText.title} 
                        font-semibold mb-4 
                        ${colors.text.gradient}
                    `}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                >
                    Meet Developers Like You
                </Motion.h2>
                
                <Motion.p
                    className={`
                        ${commonStyles.responsiveText.body} 
                        text-gray-300 mb-6 leading-relaxed
                    `}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    Swipe right to connect with fellow developers, collaborate on projects, or just chat about code!
                </Motion.p>
                
                <Motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                >
                    <a
                        href="/signup"
                        className={`
                            ${commonStyles.primaryButton}
                            inline-block text-center no-underline
                            transform hover:scale-105 active:scale-95
                        `}
                    >
                        Get Started
                    </a>
                </Motion.div>
            </Motion.div>
        </Motion.div>
    );
};

export { Index };
