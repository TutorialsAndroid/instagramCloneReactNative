import React, {memo} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {exploreItems, profile} from '../data';
import {colors, getAdaptiveLayout, shadow, softShadow} from '../theme';

const ProfileScreen = () => {
  const {width} = useWindowDimensions();
  const layout = getAdaptiveLayout(width);
  const gap = 8;
  const contentWidth = Math.min(width, layout.maxContentWidth) - layout.pagePadding * 2;
  const gridSize = (contentWidth - gap * (layout.profileColumns - 1)) / layout.profileColumns;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, {paddingHorizontal: layout.pagePadding, maxWidth: layout.maxContentWidth, alignSelf: 'center'}]}>
      <ProfileHero />
      <CreatorTools />
      <Text style={styles.sectionTitle}>Creator highlights</Text>
      <View style={styles.highlightsRow}>
        {profile.highlights.map(item => <Highlight key={item.id} item={item} />)}
      </View>
      <Text style={styles.sectionTitle}>Visual grid</Text>
      <View style={styles.grid}>
        {exploreItems.map((item, index) => (
          <View key={item.id} style={[styles.gridItem, {width: gridSize, height: gridSize, marginRight: (index + 1) % layout.profileColumns === 0 ? 0 : gap}]}> 
            <Image source={item.image} style={styles.gridImage} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const ProfileHero = memo(() => (
  <View style={styles.heroCard}>
    <Image source={profile.cover} style={styles.cover} />
    <View style={styles.coverOverlay} />
    <View style={styles.settingsButton}><Ionicons name="settings-outline" size={21} color="#FFFFFF" /></View>

    <View style={styles.profileBlock}>
      <Image source={profile.avatar} style={styles.avatar} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.username}>@{profile.username}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
      <View style={styles.statsRow}>
        {profile.stats.map(stat => <Stat key={stat.id} stat={stat} />)}
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity activeOpacity={0.8} style={styles.primaryAction}><Text style={styles.primaryActionText}>Edit Profile</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.secondaryAction}><Ionicons name="share-social-outline" size={18} color={colors.text} /></TouchableOpacity>
      </View>
    </View>
  </View>
));

const Stat = ({stat}) => <View style={styles.stat}><Text style={styles.statValue}>{stat.value}</Text><Text style={styles.statLabel}>{stat.label}</Text></View>;

const CreatorTools = memo(() => (
  <View style={styles.toolsCard}>
    <View style={styles.toolsHeader}>
      <View><Text style={styles.toolsEyebrow}>Creator Tools</Text><Text style={styles.toolsTitle}>Weekly performance</Text></View>
      <View style={styles.growthPill}><Ionicons name="trending-up" size={14} color={colors.green} /><Text style={styles.growthText}>+18%</Text></View>
    </View>
    <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
    <Text style={styles.toolsNote}>Your saves and profile visits are increasing. Keep posting cinematic outdoor content.</Text>
  </View>
));

const Highlight = ({item}) => (
  <View style={styles.highlight}>
    <View style={styles.highlightIcon}><Ionicons name={item.icon} size={19} color={colors.brand} /></View>
    <Text style={styles.highlightText}>{item.label}</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {paddingBottom: 112},
  heroCard: {borderRadius: 34, backgroundColor: colors.surface, overflow: 'hidden', marginTop: 14, ...shadow},
  cover: {width: '100%', height: 170, resizeMode: 'cover'},
  coverOverlay: {position: 'absolute', left: 0, right: 0, top: 0, height: 170, backgroundColor: 'rgba(5,8,22,0.28)'},
  settingsButton: {position: 'absolute', right: 16, top: 16, width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center'},
  profileBlock: {alignItems: 'center', paddingHorizontal: 16, paddingBottom: 20, marginTop: -44},
  avatar: {width: 92, height: 92, borderRadius: 46, borderWidth: 4, borderColor: colors.surface},
  name: {color: colors.text, fontSize: 24, fontWeight: '900', letterSpacing: -0.7, marginTop: 9},
  username: {color: colors.muted, fontSize: 13, fontWeight: '800', marginTop: 2},
  bio: {color: colors.text, textAlign: 'center', fontSize: 13.5, lineHeight: 20, fontWeight: '600', marginTop: 10},
  statsRow: {height: 72, borderRadius: 24, backgroundColor: '#F6F7FB', flexDirection: 'row', alignItems: 'center', marginTop: 16, width: '100%'},
  stat: {flex: 1, alignItems: 'center'},
  statValue: {color: colors.text, fontSize: 17, fontWeight: '900'},
  statLabel: {color: colors.muted, fontSize: 11, fontWeight: '800', marginTop: 3},
  actionsRow: {flexDirection: 'row', width: '100%', marginTop: 14},
  primaryAction: {flex: 1, height: 46, borderRadius: 23, backgroundColor: colors.text, alignItems: 'center', justifyContent: 'center'},
  primaryActionText: {color: colors.surface, fontSize: 13, fontWeight: '900'},
  secondaryAction: {width: 46, height: 46, borderRadius: 23, backgroundColor: '#F6F7FB', alignItems: 'center', justifyContent: 'center', marginLeft: 10},
  toolsCard: {borderRadius: 30, backgroundColor: colors.surface, padding: 16, marginTop: 14, ...softShadow},
  toolsHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  toolsEyebrow: {color: colors.brand, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.8},
  toolsTitle: {color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 3},
  growthPill: {height: 32, borderRadius: 16, paddingHorizontal: 11, backgroundColor: '#ECFDF5', flexDirection: 'row', alignItems: 'center'},
  growthText: {color: colors.green, fontSize: 12, fontWeight: '900', marginLeft: 5},
  progressTrack: {height: 10, borderRadius: 5, backgroundColor: '#EEF0F4', marginTop: 16, overflow: 'hidden'},
  progressFill: {height: '100%', width: '74%', backgroundColor: colors.brand, borderRadius: 5},
  toolsNote: {color: colors.muted, fontSize: 12.5, lineHeight: 18, fontWeight: '700', marginTop: 12},
  sectionTitle: {color: colors.text, fontSize: 19, fontWeight: '900', letterSpacing: -0.4, marginTop: 20, marginBottom: 12},
  highlightsRow: {flexDirection: 'row', flexWrap: 'wrap'},
  highlight: {width: '25%', alignItems: 'center', marginBottom: 8},
  highlightIcon: {width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFF1F6', alignItems: 'center', justifyContent: 'center'},
  highlightText: {color: colors.text, fontSize: 11.5, fontWeight: '800', marginTop: 7},
  grid: {flexDirection: 'row', flexWrap: 'wrap'},
  gridItem: {borderRadius: 18, overflow: 'hidden', backgroundColor: colors.soft, marginBottom: 8},
  gridImage: {width: '100%', height: '100%', resizeMode: 'cover'},
});

export default ProfileScreen;
