import React from 'react';

const PageLayout = ({ children, backgroundComponent = null, fullHeight = false, compact = false }) => {
  const heightClass = fullHeight ? "min-h-screen" : "min-h-[60vh]";
  const paddingClass = compact ? "p-2 sm:p-3 md:p-4" : "p-4 sm:p-6 md:p-8";

  return (
    <div className={`relative ${heightClass} bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col ${paddingClass}`}>
      {backgroundComponent}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};


export default PageLayout;
