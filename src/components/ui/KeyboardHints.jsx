import React from 'react';

const KeyboardHints = ({ hints }) => {
    return (
        <div className="relative z-10 mt-4 sm:mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8 text-gray-400 text-xs sm:text-sm px-4">
            {hints.map((hint, index) => (
                <div key={index} className="flex items-center gap-1 sm:gap-2">
                    <kbd className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-800 rounded text-xs border border-gray-600">
                        {hint.key}
                    </kbd>
                    <span className="hidden sm:inline">{hint.action}</span>
                    <span className="sm:hidden">{hint.action.split(' ')[0]}</span>
                </div>
            ))}
        </div>
    );
};

export default KeyboardHints;
