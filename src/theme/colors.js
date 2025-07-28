// DevTinder Theme Colors
export const colors = {
  // Primary brand colors
  primary: {
    gradient: 'from-orange-500 to-red-600',
    main: '#f97316', // orange-500
    secondary: '#dc2626', // red-600
  },
  
  // Background colors
  background: {
    main: 'from-gray-900 via-gray-800 to-gray-900',
    card: 'rgba(31,41,55,0.92)', // gray-800 with opacity
    dark: 'from-gray-900 via-black to-gray-800',
  },
  
  // Developer theme colors
  dev: {
    orange: '#f97316',
    red: '#dc2626', 
    yellow: '#eab308',
    amber: '#f59e0b',
  },
  
  // UI element colors
  ui: {
    border: '#374151', // gray-700
    borderLight: 'border-gray-600',
    glass: 'bg-white/5',
    glassHover: 'hover:bg-white/10',
    ring: 'ring-orange-500',
  },
  
  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent',
  }
};

// Common CSS classes for consistency
export const commonStyles = {
  // Layout
  centerLayout: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8',
  
  // Cards
  glassCard: 'bg-gray-800/95 rounded-2xl shadow-2xl border border-gray-700/30 backdrop-blur-md',
  
  // Buttons
  primaryButton: 'w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-orange-500 transition-all duration-300 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Input fields
  inputField: 'flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg bg-white/5 focus-within:ring-2 focus-within:ring-orange-500 transition',
  
  // Social buttons
  socialButton: 'w-full flex items-center justify-center gap-2 rounded-lg py-2 transition font-medium text-white',
  
  // Gradients
  primaryGradient: 'bg-gradient-to-r from-orange-500 to-red-600',
  backgroundGradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
};
