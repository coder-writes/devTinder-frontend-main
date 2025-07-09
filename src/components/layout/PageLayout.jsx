import React from 'react';

const PageLayout = ({ children, backgroundComponent = null, fullHeight = false, compact = false }) => {
  const heightClass = fullHeight ? "min-h-screen" : "min-h-[60vh]";
  const paddingClass = compact ? "p-2" : "p-4";

  return (
    <div className={`relative ${heightClass} bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col ${paddingClass}`}>
      {backgroundComponent}
      {children}
    </div>
  );
};


export default PageLayout;
