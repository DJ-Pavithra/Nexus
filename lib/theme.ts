export const theme = {
  colors: {
    background: {
      primary: '#121212',
      secondary: '#1E1E1E',
      overlay: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    accent: {
      primary: '#4A90E2',
      secondary: '#FF4081',
      success: '#32CD32',
      warning: '#FFA500',
      error: '#FF4C4C',
    },
    gradient: {
      primary: ['#4A90E2', '#6A5ACD'],
    },
  },
  shadows: {
    neon: {
      primary: '0px 0px 10px rgba(74, 144, 226, 0.5)',
    },
  },
};

// Common styles that can be reused
export const commonStyles = {
  glassBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  cardContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.colors.accent.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
}; 