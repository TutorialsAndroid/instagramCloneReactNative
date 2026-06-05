import {Platform, StyleSheet} from 'react-native';

const shadow = Platform.select({
  ios: {
    shadowColor: '#111827',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 24,
  },
  android: {
    elevation: 8,
  },
  default: {},
});

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  appRootDark: {
    backgroundColor: '#050816',
  },
  screenSafeArea: {
    flex: 1,
  },
  screenHost: {
    flex: 1,
  },
  bottomSafeArea: {
    backgroundColor: 'transparent',
  },
  bottomNavShell: {
    minHeight: 78,
    marginHorizontal: 14,
    marginBottom: Platform.OS === 'android' ? 10 : 6,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(229,231,235,0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 9,
    ...shadow,
  },
  tabButton: {
    flex: 1,
    height: 58,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#111827',
  },
  tabIconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadge: {
    position: 'absolute',
    right: -12,
    top: -8,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#E1306C',
    borderWidth: 1.4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '900',
  },
  tabLabel: {
    color: '#6B7280',
    fontSize: 10.5,
    fontWeight: '900',
    marginTop: 3,
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
});

export default styles;
