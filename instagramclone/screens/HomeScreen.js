import React, {memo, useCallback, useMemo, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import CircleImageList from '../CircleImageList';
import PostView from '../PostView';
import {posts, stories} from '../data';
import {colors, getAdaptiveLayout, shadow, softShadow} from '../theme';

const filters = [
  {id: 'All', label: 'For You', icon: 'sparkles-outline'},
  {id: 'Nature', label: 'Nature', icon: 'leaf-outline'},
  {id: 'Travel', label: 'Travel', icon: 'airplane-outline'},
  {id: 'Design', label: 'Design', icon: 'color-palette-outline'},
];

const HomeScreen = ({onOpenChat}) => {
  const {width} = useWindowDimensions();
  const layout = getAdaptiveLayout(width);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredPosts = useMemo(() => {
    if (selectedFilter === 'All') {
      return posts;
    }
    return posts.filter(post => post.category === selectedFilter);
  }, [selectedFilter]);

  const renderPost = useCallback(({item}) => <PostView post={item} />, []);

  const header = useMemo(() => (
    <View style={[styles.headerWrap, {maxWidth: layout.maxContentWidth, paddingHorizontal: layout.pagePadding}]}> 
      <Toolbar onOpenChat={onOpenChat} />
      <HeroPanel compact={layout.isCompact} />
      <FilterRail selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
      <CircleImageList data={stories} />
    </View>
  ), [layout.isCompact, layout.maxContentWidth, layout.pagePadding, onOpenChat, selectedFilter]);

  return (
    <FlatList
      data={filteredPosts}
      renderItem={renderPost}
      keyExtractor={item => item.id}
      ListHeaderComponent={header}
      contentContainerStyle={[styles.content, {paddingHorizontal: layout.pagePadding}]}
      showsVerticalScrollIndicator={false}
      initialNumToRender={3}
      maxToRenderPerBatch={4}
      windowSize={7}
      removeClippedSubviews
    />
  );
};

const Toolbar = memo(({onOpenChat}) => (
  <View style={styles.toolbar}>
    <View>
      <Text style={styles.appName}>CreatorOS</Text>
      <Text style={styles.appSubTitle}>Beyond social feed</Text>
    </View>

    <View style={styles.toolbarActions}>
      <TouchableOpacity activeOpacity={0.75} style={styles.toolbarButton} accessibilityRole="button" accessibilityLabel="Search posts">
        <Ionicons name="search-outline" size={22} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} style={styles.toolbarButton} accessibilityRole="button" accessibilityLabel="Open messages" onPress={onOpenChat}>
        <Ionicons name="paper-plane-outline" size={22} color={colors.text} />
        <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
      </TouchableOpacity>
    </View>
  </View>
));

const HeroPanel = memo(({compact}) => (
  <View style={styles.heroCard}>
    <View style={styles.heroOrbOne} />
    <View style={styles.heroOrbTwo} />
    <View style={styles.heroHeader}>
      <View style={styles.heroTextBlock}>
        <Text style={styles.heroEyebrow}>Today’s spotlight</Text>
        <Text style={[styles.heroTitle, compact && styles.heroTitleCompact]}>A premium creator network experience</Text>
      </View>
      <View style={styles.heroIconBubble}><Ionicons name="sparkles" size={21} color="#FFFFFF" /></View>
    </View>
    <Text style={styles.heroDescription}>A different social UI concept with curated posts, insights, chats, reels, explore, and a creator profile dashboard.</Text>
    <View style={styles.heroStatsRow}>
      <HeroStat value="38K" label="Likes" />
      <View style={styles.heroStatDivider} />
      <HeroStat value="1.8K" label="Comments" />
      <View style={styles.heroStatDivider} />
      <HeroStat value="4.4K" label="Saves" />
    </View>
  </View>
));

const HeroStat = ({value, label}) => (
  <View style={styles.heroStat}><Text style={styles.heroStatValue}>{value}</Text><Text style={styles.heroStatLabel}>{label}</Text></View>
);

const FilterRail = memo(({selectedFilter, onSelectFilter}) => (
  <FlatList
    data={filters}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.filterContent}
    renderItem={({item}) => {
      const active = selectedFilter === item.id;
      return (
        <TouchableOpacity activeOpacity={0.82} style={[styles.filterChip, active && styles.filterChipActive]} accessibilityRole="button" accessibilityLabel={`Show ${item.label} posts`} onPress={() => onSelectFilter(item.id)}>
          <Ionicons name={item.icon} size={17} color={active ? '#FFFFFF' : colors.muted} />
          <Text style={[styles.filterText, active && styles.filterTextActive]}>{item.label}</Text>
        </TouchableOpacity>
      );
    }}
  />
));

const styles = StyleSheet.create({
  content: {paddingBottom: 112},
  headerWrap: {width: '100%', alignSelf: 'center'},
  toolbar: {minHeight: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, paddingBottom: 8},
  appName: {color: colors.text, fontSize: 29, lineHeight: 34, fontWeight: '900', letterSpacing: -1.1},
  appSubTitle: {color: colors.subtle, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.1, marginTop: 1},
  toolbarActions: {flexDirection: 'row', alignItems: 'center'},
  toolbarButton: {width: 43, height: 43, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', position: 'relative', marginLeft: 12, ...softShadow},
  badge: {position: 'absolute', top: 4, right: 2, minWidth: 18, height: 18, borderRadius: 10, backgroundColor: colors.brand, borderWidth: 1.5, borderColor: colors.surface, alignItems: 'center', justifyContent: 'center'},
  badgeText: {color: colors.surface, fontSize: 10, fontWeight: '900'},
  heroCard: {marginTop: 4, marginBottom: 14, borderRadius: 30, backgroundColor: colors.text, padding: 18, overflow: 'hidden', ...shadow},
  heroOrbOne: {position: 'absolute', width: 170, height: 170, borderRadius: 85, backgroundColor: 'rgba(225, 48, 108, 0.55)', right: -54, top: -60},
  heroOrbTwo: {position: 'absolute', width: 130, height: 130, borderRadius: 65, backgroundColor: 'rgba(37, 99, 235, 0.42)', left: -38, bottom: -56},
  heroHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'},
  heroTextBlock: {flex: 1, paddingRight: 10},
  heroEyebrow: {color: '#F9A8D4', fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.9},
  heroTitle: {color: colors.surface, fontSize: 25, lineHeight: 31, fontWeight: '900', letterSpacing: -0.8, marginTop: 5},
  heroTitleCompact: {fontSize: 22, lineHeight: 28},
  heroIconBubble: {width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center'},
  heroDescription: {color: '#D1D5DB', fontSize: 13.5, lineHeight: 20, fontWeight: '600', marginTop: 12},
  heroStatsRow: {height: 68, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.12)', marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'},
  heroStat: {flex: 1, alignItems: 'center'},
  heroStatValue: {color: colors.surface, fontSize: 17, fontWeight: '900', letterSpacing: -0.3},
  heroStatLabel: {color: '#D1D5DB', fontSize: 11, fontWeight: '800', marginTop: 3},
  heroStatDivider: {width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.16)'},
  filterContent: {paddingBottom: 14},
  filterChip: {height: 40, paddingHorizontal: 14, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', marginRight: 10},
  filterChipActive: {backgroundColor: colors.text, borderColor: colors.text},
  filterText: {color: colors.muted, fontSize: 13, fontWeight: '900', marginLeft: 7},
  filterTextActive: {color: colors.surface},
});

export default HomeScreen;
