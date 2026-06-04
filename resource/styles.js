import {Platform, StyleSheet} from 'react-native';

const colors = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  soft: '#EEF0F4',
  brand: '#E1306C',
  accent: '#F77737',
  success: '#10B981',
};

const shadow = Platform.select({
  ios: {
    shadowColor: '#111827',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  android: {
    elevation: 3,
  },
  default: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  feedContent: {
    paddingBottom: 28,
  },
  toolbar: {
    height: 66,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.soft,
  },
  toolbarLogo: {
    width: 116,
    height: 48,
    resizeMode: 'contain',
  },
  toolbarButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...shadow,
  },
  toolbarIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  notificationDot: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: colors.brand,
    borderWidth: 1.5,
    borderColor: colors.surface,
    position: 'absolute',
    top: 9,
    right: 9,
  },
  messageBadge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: colors.brand,
    borderWidth: 1.5,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 4,
  },
  messageBadgeText: {
    color: colors.surface,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '800',
  },
  sectionDivider: {
    height: 10,
    backgroundColor: colors.background,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});

export default styles;
