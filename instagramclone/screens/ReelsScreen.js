import React, {memo, useRef, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {reels} from '../data';
import {colors, formatCount, getAdaptiveLayout} from '../theme';

const ReelsScreen = () => {
  const {width, height} = useWindowDimensions();
  const layout = getAdaptiveLayout(width);
  const reelHeight = Math.min(720, Math.max(520, height - 165));

  return (
    <View style={styles.root}>
      <FlatList
        data={reels}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={reelHeight + 16}
        decelerationRate="fast"
        contentContainerStyle={[styles.content, {paddingHorizontal: layout.pagePadding, maxWidth: layout.maxContentWidth, alignSelf: 'center'}]}
        ListHeaderComponent={<ReelsHeader />}
        renderItem={({item}) => <ReelCard item={item} height={reelHeight} />}
      />
    </View>
  );
};

const ReelsHeader = memo(() => (
  <View style={styles.header}>
    <View>
      <Text style={styles.eyebrow}>Reels Lab</Text>
      <Text style={styles.title}>Cinematic vertical stories</Text>
    </View>
    <Ionicons name="camera-outline" size={26} color="#FFFFFF" />
  </View>
));

const ReelCard = ({item, height}) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={[styles.reelCard, {height}]}> 
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.topPill}><Ionicons name="play" size={12} color="#FFFFFF" /><Text style={styles.topPillText}>Creator reel</Text></View>

      <View style={styles.actionRail}>
        <RailButton icon={liked ? 'heart' : 'heart-outline'} value={formatCount(item.likes + (liked ? 1 : 0))} active={liked} onPress={() => setLiked(value => !value)} />
        <RailButton icon="chatbubble-outline" value={formatCount(item.comments)} />
        <RailButton icon="bookmark-outline" value={formatCount(item.saves)} />
        <RailButton icon="share-social-outline" value="Share" />
      </View>

      <View style={styles.footer}>
        <Text style={styles.creator}>@{item.creator}</Text>
        <Text style={styles.reelTitle}>{item.title}</Text>
        <View style={styles.audioRow}>
          <Ionicons name="musical-notes-outline" size={14} color="#FFFFFF" />
          <Text numberOfLines={1} style={styles.audio}>{item.audio}</Text>
        </View>
      </View>
    </View>
  );
};

const RailButton = ({icon, value, active, onPress}) => (
  <Pressable style={styles.railButton} onPress={onPress} accessibilityRole="button">
    <View style={[styles.railIcon, active && styles.railIconActive]}>
      <Ionicons name={icon} size={25} color="#FFFFFF" />
    </View>
    <Text style={styles.railText}>{value}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.dark},
  content: {paddingBottom: 112},
  header: {height: 88, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  eyebrow: {color: '#F9A8D4', fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1},
  title: {color: '#FFFFFF', fontSize: 25, lineHeight: 30, fontWeight: '900', letterSpacing: -0.9, marginTop: 4},
  reelCard: {width: '100%', borderRadius: 34, overflow: 'hidden', marginBottom: 16, backgroundColor: '#111827'},
  image: {width: '100%', height: '100%', resizeMode: 'cover'},
  overlay: {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(5,8,22,0.22)'},
  topPill: {position: 'absolute', left: 16, top: 16, height: 32, borderRadius: 16, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.16)', flexDirection: 'row', alignItems: 'center'},
  topPillText: {color: '#FFFFFF', fontSize: 12, fontWeight: '900', marginLeft: 6},
  actionRail: {position: 'absolute', right: 12, bottom: 108, alignItems: 'center'},
  railButton: {alignItems: 'center', marginTop: 15},
  railIcon: {width: 47, height: 47, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center'},
  railIconActive: {backgroundColor: colors.brand},
  railText: {color: '#FFFFFF', fontSize: 10.5, fontWeight: '900', marginTop: 5},
  footer: {position: 'absolute', left: 18, right: 84, bottom: 22},
  creator: {color: '#FFFFFF', fontSize: 14, fontWeight: '900'},
  reelTitle: {color: '#FFFFFF', fontSize: 25, lineHeight: 31, fontWeight: '900', letterSpacing: -0.7, marginTop: 7},
  audioRow: {marginTop: 12, flexDirection: 'row', alignItems: 'center'},
  audio: {color: '#E5E7EB', fontSize: 12.5, fontWeight: '700', marginLeft: 7, flex: 1},
});

export default ReelsScreen;
