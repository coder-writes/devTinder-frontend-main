import React from 'react';
import { motion as Motion } from 'framer-motion';
import { colors } from '../../theme/colors';

const HeroSection = () => {
    return (
        <div className="text-center mb-10">
            <Motion.h1
                className={`text-5xl font-bold ${colors.text.gradient} drop-shadow-lg`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                DevTinder
            </Motion.h1>
            <Motion.p
                className="text-xl mt-2 text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                Connect. Collaborate. Code. <br />
                <span className="text-gray-400">Find your perfect coding partner!</span>
            </Motion.p>
        </div>
    );
};

export default HeroSection;
