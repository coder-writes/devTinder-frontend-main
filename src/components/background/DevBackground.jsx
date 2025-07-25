import React from 'react';
import { colors } from '../../theme/colors';

const DevBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.background.dark}`}></div>
            
            {/* Responsive animated grid pattern */}
            <div className="absolute inset-0 opacity-15 sm:opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,81,47,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,81,47,0.1)_1px,transparent_1px)] bg-[size:25px_25px] sm:bg-[size:35px_35px] md:bg-[size:45px_45px] lg:bg-[size:50px_50px] animate-pulse"></div>
            </div>
            
            {/* Responsive floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Mobile: 8 particles, Tablet: 15 particles, Desktop: 20 particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`mobile-${i}`}
                        className="absolute w-0.5 h-1 sm:w-1 sm:h-2 bg-[#ff512f] rounded-full animate-pulse block sm:hidden"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`tablet-${i}`}
                        className="absolute w-1 h-2 bg-[#ff512f] rounded-full animate-pulse hidden sm:block lg:hidden"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`desktop-${i}`}
                        className="absolute w-1 h-2 bg-[#ff512f] rounded-full animate-pulse hidden lg:block"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
            
            {/* Responsive CSS-only animated code symbols */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Mobile optimized symbols */}
                <div className="absolute top-1/4 left-1/4 text-2xl sm:text-3xl md:text-4xl font-mono text-[#00ff88] opacity-30 sm:opacity-40 animate-bounce">
                    {'{ }'}
                </div>
                <div className="absolute top-3/4 left-1/6 text-lg sm:text-xl md:text-2xl font-mono text-[#ff6b6b] opacity-25 sm:opacity-30 animate-pulse transform rotate-6 sm:rotate-12">
                    {'</>'}
                </div>
                <div className="absolute top-1/2 right-1/4 text-base sm:text-lg md:text-xl font-mono text-[#ffd93d] opacity-30 sm:opacity-35 animate-ping transform -rotate-6 sm:-rotate-12">
                    {'()'}
                </div>
                <div className="absolute top-1/6 right-1/6 text-xl sm:text-2xl md:text-3xl font-mono text-[#ff512f] opacity-20 sm:opacity-25 animate-bounce">
                    {'[]'}
                </div>
                <div className="absolute bottom-1/4 right-1/3 text-lg sm:text-xl md:text-2xl font-mono text-[#00ff88] opacity-25 sm:opacity-30 animate-pulse">
                    {'=>'}
                </div>
                
                {/* Additional symbols for larger screens */}
                <div className="absolute top-1/3 left-1/12 text-sm sm:text-base md:text-lg font-mono text-[#9d4edd] opacity-20 sm:opacity-25 animate-bounce hidden sm:block">
                    {'&&'}
                </div>
                <div className="absolute bottom-1/3 left-1/3 text-base sm:text-lg md:text-xl font-mono text-[#f72585] opacity-15 sm:opacity-20 animate-pulse hidden md:block">
                    {'||'}
                </div>
                <div className="absolute top-1/5 right-1/12 text-sm sm:text-base font-mono text-[#4cc9f0] opacity-15 sm:opacity-20 animate-ping hidden lg:block">
                    {'==='}
                </div>
            </div>
        </div>
    );
};

export default DevBackground;
