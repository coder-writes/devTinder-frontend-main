import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router';

const FeatureCard = () => {
    return (
        <Motion.div
            className="bg-[rgba(34,34,34,0.85)] p-8 rounded-2xl shadow-lg max-w-sm w-full text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
            <Motion.img
                src="https://img.icons8.com/ios-filled/100/ffffff/source-code.png"
                alt="DevTinder Logo"
                className="w-20 mb-6 mx-auto"
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6, type: 'spring' }}
            />
            <Motion.h2
                className="my-4 text-2xl font-semibold"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                Meet Developers Like You
            </Motion.h2>
            <Motion.p
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
            >
                Swipe right to connect with fellow developers, collaborate on projects, or just chat about code!
            </Motion.p>
            <Motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
            >
                <Link
                    to="/signup"
                    className="inline-block px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-lg hover:from-[#dd2476] hover:to-[#ff512f] transition-all duration-300"
                >
                    Get Started
                </Link>
            </Motion.div>
        </Motion.div>
    );
};

export default FeatureCard;
