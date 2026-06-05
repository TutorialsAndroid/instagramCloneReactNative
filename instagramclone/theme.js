import {Platform} from 'react-native';

export const colors = {
  background: '#F6F7FB',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  subtle: '#9CA3AF',
  line: '#E5E7EB',
  soft: '#EEF0F4',
  brand: '#E1306C',
  orange: '#F77737',
  violet: '#7C3AED',
  blue: '#2563EB',
  cyan: '#06B6D4',
  green: '#10B981',
  warning: '#F59E0B',
  dark: '#050816',
};

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  xxl: 36,
};

export const spacing = {
  page: 14,
  card: 16,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: colors.text,
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.1,
    shadowRadius: 26,
  },
  android: {
    elevation: 6,
  },
  default: {},
});

export const softShadow = Platform.select({
  ios: {
    shadowColor: colors.text,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.07,
    shadowRadius: 18,
  },
  android: {
    elevation: 3,
  },
  default: {},
});

export const formatCount = value => {
  const count = Number(value || 0);

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace('.0', '')}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace('.0', '')}K`;
  }

  return `${count}`;
};

export const getAdaptiveLayout = width => {
  const isTablet = width >= 768;
  const isCompact = width < 360;

  return {
    isTablet,
    isCompact,
    maxContentWidth: isTablet ? 720 : width,
    pagePadding: isTablet ? 24 : 14,
    exploreColumns: width >= 900 ? 4 : width >= 620 ? 3 : 2,
    profileColumns: width >= 900 ? 5 : width >= 620 ? 4 : 3,
  };
};
