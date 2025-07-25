// DevTinder Theme Colors
export const colors = {
  // Primary brand colors
  primary: {
    gradient: 'from-[#ff512f] via-[#f09819] to-[#dd2476]',
    main: '#ff512f',
    secondary: '#dd2476',
    accent: '#f09819',
  },
  
  // Background colors
  background: {
    main: 'from-[#0f0f23] via-[#1a1a2e] to-[#16213e]',
    card: 'rgba(255, 255, 255, 0.03)',
    cardHover: 'rgba(255, 255, 255, 0.08)',
    dark: 'from-gray-900 via-black to-gray-800',
    glass: 'backdrop-blur-xl bg-white/5 border border-white/10',
  },
  
  // Developer theme colors
  dev: {
    green: '#00ff88',
    blue: '#00d4ff', 
    purple: '#a855f7',
    pink: '#ec4899',
    cyan: '#06b6d4',
    code: '#00ff88',
    neon: '#00ffff',
  },
  
  // UI element colors
  ui: {
    border: 'border-white/10',
    borderGlow: 'border-purple-500/30',
    glass: 'bg-white/5 backdrop-blur-md',
    glassHover: 'hover:bg-white/10 backdrop-blur-lg',
    ring: 'ring-purple-500/50',
    shadow: 'shadow-2xl shadow-purple-500/10',
  },
  
  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    gradient: 'bg-gradient-to-r from-[#ff512f] via-[#f09819] to-[#dd2476] bg-clip-text text-transparent',
    glow: 'text-white drop-shadow-lg',
  }
};

// Common CSS classes for consistency
export const commonStyles = {
  // Layout
  centerLayout: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] px-4 sm:px-6 lg:px-8',
  
  // Cards
  glassCard: 'backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-purple-500/20',
  
  // Buttons
  primaryButton: `
    w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-[#ff512f] via-[#f09819] to-[#dd2476] 
    text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:shadow-purple-500/30
    transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98]
    text-base sm:text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100 disabled:hover:shadow-lg
  `,
  
  // Input fields
  inputField: `
    flex items-center gap-3 border border-white/10 px-4 py-3 sm:py-4 rounded-xl 
    bg-white/5 backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-500/50 
    focus-within:border-purple-500/30 transition-all duration-300 hover:bg-white/10
    text-sm sm:text-base
  `,
  
  // Social buttons
  socialButton: `
    w-full flex items-center justify-center gap-3 rounded-xl py-3 sm:py-4 px-6
    transition-all duration-300 font-medium text-white backdrop-blur-md
    border border-white/10 hover:border-white/20 hover:shadow-lg transform
    hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base
  `,
  
  // Gradients
  primaryGradient: 'bg-gradient-to-r from-[#ff512f] via-[#f09819] to-[#dd2476]',
  backgroundGradient: 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]',
  
  // Animations
  smoothTransition: 'transition-all duration-300 ease-out',
  hoverScale: 'transform hover:scale-105 transition-transform duration-200',
  
  // Responsive text
  responsiveText: {
    hero: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    title: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    subtitle: 'text-base sm:text-lg md:text-xl',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
  },
  
  // Responsive spacing
  padding: {
    section: 'px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16',
    container: 'px-4 sm:px-6 lg:px-8',
    card: 'p-4 sm:p-6 lg:p-8',
  },
  
  // Grid systems
  grid: {
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  }
};
