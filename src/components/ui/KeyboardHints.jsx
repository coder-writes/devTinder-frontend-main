import React from 'react';

const KeyboardHints = ({ hints = [
    { key: '←', action: 'Pass' },
    { key: '→', action: 'Like' },
    { key: 'Space', action: 'Next' }
] }) => {
    return (
        <div className="relative z-10 mt-4 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm">
            {hints.map((hint, index) => (
                <div key={index} className="flex items-center gap-1 sm:gap-2">
                    <kbd className="px-1.5 py-1 sm:px-2 sm:py-1 bg-gray-800 rounded text-xs border border-gray-600 font-mono">
                        {hint.key}
                    </kbd>
                    <span className="text-xs sm:text-sm">{hint.action}</span>
                </div>
            ))}
        </div>
    );
};

export default KeyboardHints;
