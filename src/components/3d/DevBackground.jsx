import React from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingCodeElements from './FloatingCodeElements';
import { colors } from '../../theme/colors';

const DevBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.background.dark}`}></div>
            
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,81,47,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,81,47,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
            </div>
            
            {/* 3D Canvas */}
            <Canvas className="absolute inset-0">
                <FloatingCodeElements />
            </Canvas>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-2 bg-[#ff512f] rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default DevBackground;
