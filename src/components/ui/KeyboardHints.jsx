import React from 'react';

const KeyboardHints = ({ hints }) => {
    return (
        <div className="relative z-10 mt-8 flex items-center gap-8 text-gray-400 text-sm">
            {hints.map((hint, index) => (
                <div key={index} className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-600">
                        {hint.key}
                    </kbd>
                    <span>{hint.action}</span>
                </div>
            ))}
        </div>
    );
};

export default KeyboardHints;
