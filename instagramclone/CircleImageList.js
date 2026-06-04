import React, {memo, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ITEM_WIDTH = 84;

const CircleImageList = memo(({data = []}) => {
  const renderCircleImage = useCallback(({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        style={styles.storyItem}
        accessibilityRole="button"
        accessibilityLabel={`Open ${item.text} story`}>
        <View style={[styles.storyRing, item.seen && styles.seenStoryRing]}>
          <View style={styles.avatarShell}>
            <Image
              source={item.image}
              style={styles.circleImage}
              accessibilityIgnoresInvertColors
            />
          </View>

          {item.isLive ? (
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          ) : null}

          {item.isAdd ? (
            <View style={styles.addBadge}>
              <Text style={styles.addText}>+</Text>
            </View>
          ) : null}
        </View>

        <Text
          numberOfLines={1}
          style={[styles.imageText, item.seen && styles.seenText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Stories</Text>
        <Text style={styles.subtitle}>Fresh updates</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderCircleImage}
        keyExtractor={(item, index) => item.id || `${item.text}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    paddingTop: 14,
    paddingBottom: 12,
  },
  headerRow: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  listContent: {
    paddingHorizontal: 12,
  },
  storyItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    backgroundColor: '#E1306C',
    borderWidth: 2,
    borderColor: '#F77737',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seenStoryRing: {
    backgroundColor: '#D1D5DB',
    borderColor: '#E5E7EB',
  },
  avatarShell: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
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
    bottom: -3,
    paddingHorizontal: 7,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E1306C',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  addBadge: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 19,
    fontWeight: '800',
  },
  imageText: {
    width: 76,
    color: '#111827',
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  seenText: {
    color: '#6B7280',
  },
});

export default CircleImageList;
