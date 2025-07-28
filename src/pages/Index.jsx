import React from 'react';
import { motion as Motion } from 'framer-motion';
import { HeroSection, FeatureCard } from '../components';
import { Link } from 'react-router';

const Index = () => {
    
    
    return (
        <Motion.div
            className="flex flex-col items-center justify-center flex-grow py-8 md:py-16 px-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center mb-6 md:mb-10">
                <Motion.h1
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    DevTinder
                </Motion.h1>
                <Motion.p
                    className="text-lg md:text-xl mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    Connect. Collaborate. Code. <br />
                    Find your perfect coding partner!
                </Motion.p>
            </div>

            <Motion.div
                className="bg-gray-800/85 p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg max-w-xs md:max-w-sm w-full text-center mx-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <Motion.img
                    src="https://img.icons8.com/ios-filled/100/ffffff/source-code.png"
                    alt="DevTinder Logo"
                    className="w-16 md:w-20 mb-4 md:mb-6 mx-auto"
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6, type: 'spring' }}
                />
                <Motion.h2
                    className="my-3 md:my-4 text-xl md:text-2xl font-semibold"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    Meet Developers Like You
                </Motion.h2>
                <Motion.p
                    className="text-sm md:text-base"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                >
                    Swipe right to connect with fellow developers, collaborate on projects, or just chat about code!
                </Motion.p>
                <Motion.div
                    className="mt-4 md:mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.4 }}
                >
                    <Link
                        to="/signup"
                        className="inline-block px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-red-600 hover:to-orange-500 transition-all duration-300"
                    >
                        Get Started
                    </Link>
                </Motion.div>
            </Motion.div>
        </Motion.div>
    );
};

export { Index };
