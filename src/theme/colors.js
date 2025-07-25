// DevTinder Theme Colors
export const colors = {
  // Primary brand colors
  primary: {
    gradient: 'from-[#ff512f] to-[#dd2476]',
    main: '#ff512f',
    secondary: '#dd2476',
  },
  
  // Background colors
  background: {
    main: 'from-[#232526] to-[#414345]',
    card: 'rgba(34,34,34,0.92)',
    dark: 'from-gray-900 via-black to-gray-800',
  },
  
  // Developer theme colors
  dev: {
    green: '#10b981',
    blue: '#3b82f6', 
    purple: '#8b5cf6',
    code: '#00ff88',
  },
  
  // UI element colors
  ui: {
    border: '#232526',
    borderLight: 'border-gray-700',
    glass: 'bg-white/5',
    glassHover: 'hover:bg-white/10',
    ring: 'ring-[#ff512f]',
  },
  
  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    gradient: 'bg-gradient-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent',
  }
};

// Common CSS classes for consistency
export const commonStyles = {
  // Layout
  centerLayout: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] to-[#414345] py-4 sm:py-6 md:py-8',
  
  // Cards
  glassCard: 'bg-[rgba(34,34,34,0.92)] rounded-xl sm:rounded-2xl shadow-2xl border border-[#232526]/30 backdrop-blur-md',
  
  // Buttons
  primaryButton: 'w-full py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white rounded-lg font-semibold shadow-lg hover:from-[#dd2476] hover:to-[#ff512f] transition-all duration-300 text-sm sm:text-base md:text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Input fields
  inputField: 'flex items-center gap-2 border border-gray-700 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 rounded-lg bg-white/5 focus-within:ring-2 focus-within:ring-[#ff512f] transition text-sm sm:text-base',
  
  // Social buttons
  socialButton: 'w-full flex items-center justify-center gap-2 rounded-lg py-2 sm:py-2.5 md:py-3 transition font-medium text-white text-sm sm:text-base',
  
  // Gradients
  primaryGradient: 'bg-gradient-to-r from-[#ff512f] to-[#dd2476]',
  backgroundGradient: 'bg-gradient-to-br from-[#232526] to-[#414345]',
};
