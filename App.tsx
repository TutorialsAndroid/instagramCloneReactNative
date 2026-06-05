import React, {useMemo, useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';

import styles from './resource/styles';
import HomeScreen from './instagramclone/screens/HomeScreen';
import ExploreScreen from './instagramclone/screens/ExploreScreen';
import ReelsScreen from './instagramclone/screens/ReelsScreen';
import ChatScreen from './instagramclone/screens/ChatScreen';
import ProfileScreen from './instagramclone/screens/ProfileScreen';

type TabKey = 'home' | 'explore' | 'reels' | 'chat' | 'profile';

type TabItem = {
  key: TabKey;
  label: string;
  icon: string;
  activeIcon: string;
  badge?: number;
};

const tabs: TabItem[] = [
  {key: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home'},
  {key: 'explore', label: 'Explore', icon: 'compass-outline', activeIcon: 'compass'},
  {key: 'reels', label: 'Reels', icon: 'play-circle-outline', activeIcon: 'play-circle'},
  {key: 'chat', label: 'Chat', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses', badge: 2},
  {key: 'profile', label: 'Profile', icon: 'person-circle-outline', activeIcon: 'person-circle'},
];

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const ActiveScreen = useMemo(() => {
    switch (activeTab) {
      case 'explore':
        return <ExploreScreen />;
      case 'reels':
        return <ReelsScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'home':
      default:
        return <HomeScreen onOpenChat={() => setActiveTab('chat')} />;
    }
  }, [activeTab]);

  const isDarkSurface = activeTab === 'reels';

  return (
    <SafeAreaProvider>
      <View style={[styles.appRoot, isDarkSurface && styles.appRootDark]}>
        <StatusBar
          backgroundColor={isDarkSurface ? '#050816' : '#F6F7FB'}
          barStyle={isDarkSurface ? 'light-content' : 'dark-content'}
        />

        <SafeAreaView edges={['top']} style={styles.screenSafeArea}>
          <View style={styles.screenHost}>{ActiveScreen}</View>
        </SafeAreaView>

        <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
          <View style={styles.bottomNavShell}>
            {tabs.map(tab => {
              const active = activeTab === tab.key;

              return (
                <TouchableOpacity
                  key={tab.key}
                  activeOpacity={0.78}
                  style={[styles.tabButton, active && styles.tabButtonActive]}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${tab.label}`}
                  onPress={() => setActiveTab(tab.key)}>
                  <View style={styles.tabIconWrap}>
                    <Ionicons
                      name={active ? tab.activeIcon : tab.icon}
                      size={active ? 24 : 23}
                      color={active ? '#FFFFFF' : '#6B7280'}
                    />
                    {tab.badge ? (
                      <View style={styles.tabBadge}>
                        <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

export default App;
