import React, {memo, useCallback} from 'react';
import {FlatList, Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {colors, softShadow} from './theme';

const ITEM_WIDTH = 90;

const ringStyles = {
  hot: {backgroundColor: colors.brand, borderColor: colors.orange},
  fresh: {backgroundColor: colors.violet, borderColor: colors.cyan},
  calm: {backgroundColor: '#D1D5DB', borderColor: colors.line},
};

const CircleImageList = memo(({data = []}) => {
  const renderCircleImage = useCallback(({item}) => {
    const ring = item.seen ? ringStyles.calm : ringStyles[item.ring || 'hot'];

    return (
      <Pressable
        android_ripple={{color: 'rgba(17, 24, 39, 0.08)', borderless: true}}
        style={({pressed}) => [styles.storyItem, pressed && styles.storyItemPressed]}
        accessibilityRole="button"
        accessibilityLabel={`Open ${item.text} story`}>
        <View style={[styles.storyHalo, !item.seen && styles.storyHaloActive]}>
          <View style={[styles.storyRing, ring]}>
            <View style={styles.avatarShell}>
              <Image source={item.image} style={styles.circleImage} accessibilityIgnoresInvertColors />
            </View>

            {item.isLive ? (
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            ) : null}

            {item.isAdd ? (
              <View style={styles.addBadge}>
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </View>
            ) : null}
          </View>
        </View>

        <Text numberOfLines={1} style={[styles.imageText, item.seen && styles.seenText]}>
          {item.text}
        </Text>
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Stories</Text>
          <Text style={styles.headerHint}>Live creator moments</Text>
        </View>

        <Pressable style={styles.watchAllButton} accessibilityRole="button">
          <Text style={styles.watchAllText}>Watch all</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.brand} />
        </Pressable>
      </View>

      <FlatList
        data={data}
        renderItem={renderCircleImage}
        keyExtractor={(item, index) => item.id || `${item.text}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index})}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    paddingTop: 16,
    paddingBottom: 15,
    ...softShadow,
  },
  headerRow: {
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.35,
  },
  headerHint: {
    color: colors.subtle,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  watchAllButton: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    backgroundColor: '#FFF1F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchAllText: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '900',
    marginRight: 2,
  },
  listContent: {
    paddingHorizontal: 12,
  },
  storyItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  storyItemPressed: {
    transform: [{scale: 0.96}],
    opacity: 0.9,
  },
  storyHalo: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyHaloActive: {
    backgroundColor: '#FFF1F6',
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarShell: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.surface,
    padding: 3,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    resizeMode: 'cover',
  },
  liveBadge: {
    position: 'absolute',
    bottom: -5,
    paddingHorizontal: 7,
    height: 21,
    borderRadius: 11,
    backgroundColor: colors.text,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 4,
  },
  liveText: {
    color: colors.surface,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.35,
  },
  addBadge: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.blue,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    width: 82,
    color: colors.text,
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  seenText: {
    color: colors.muted,
  },
});

export default CircleImageList;
