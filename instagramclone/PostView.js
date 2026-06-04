import React, {memo, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';

const screenWidth = Dimensions.get('window').width;
const imageHeight = Math.min(485, Math.round(screenWidth * 1.08));

const HIT_SLOP = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

const COLORS = {
  black: '#111827',
  muted: '#6B7280',
  soft: '#F3F4F6',
  border: '#E5E7EB',
  white: '#FFFFFF',
  instagram: '#E1306C',
  blue: '#2563EB',
  orange: '#F77737',
  green: '#10B981',
};

const formatCount = value => {
  const count = Number(value || 0);

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace('.0', '')}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace('.0', '')}K`;
  }

  return `${count}`;
};

const IconButton = ({name, size = 27, color = COLORS.black, onPress, label}) => {
  return (
    <Pressable
      hitSlop={HIT_SLOP}
      android_ripple={{color: 'rgba(17, 24, 39, 0.08)', borderless: true}}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [
        styles.iconButton,
        pressed && styles.iconButtonPressed,
      ]}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

const MetricPill = ({icon, value}) => {
  return (
    <View style={styles.metricPill}>
      <Ionicons name={icon} size={13} color="#6B7280" />
      <Text style={styles.metricText}>{formatCount(value)}</Text>
    </View>
  );
};

const PostView = memo(({post}) => {
  const [liked, setLiked] = useState(Boolean(post?.liked));
  const [saved, setSaved] = useState(Boolean(post?.saved));
  const [following, setFollowing] = useState(Boolean(post?.following));
  const [expanded, setExpanded] = useState(false);
  const lastTap = useRef(0);
  const heartScale = useRef(new Animated.Value(0)).current;

  const likeCount = useMemo(() => {
    const baseLikes = Number(post?.likes || 0);
    return liked && !post?.liked ? baseLikes + 1 : baseLikes;
  }, [liked, post?.liked, post?.likes]);

  const triggerHeartBurst = () => {
    heartScale.setValue(0.4);

    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 0,
        duration: 260,
        delay: 360,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleImagePress = () => {
    const now = Date.now();

    if (now - lastTap.current < 280) {
      if (!liked) {
        setLiked(true);
      }
      triggerHeartBurst();
    }

    lastTap.current = now;
  };

  return (
    <View style={styles.card}>
      {post.featured ? (
        <View style={styles.featuredRibbon}>
          <Ionicons name="flash" size={12} color="#FFFFFF" />
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      ) : null}

      <View style={styles.header}>
        <View style={styles.avatarFrame}>
          <Image
            style={styles.userProfilePhoto}
            source={post.userAvatar}
            accessibilityIgnoresInvertColors
          />
        </View>

        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text numberOfLines={1} style={styles.userName}>
              {post.username}
            </Text>

            {post.verified ? (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={10} color={COLORS.white} />
              </View>
            ) : null}
          </View>

          {post.location ? (
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={12} color={COLORS.muted} />
              <Text numberOfLines={1} style={styles.locationText}>
                {post.location}
              </Text>
            </View>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={following ? 'Following user' : 'Follow user'}
          onPress={() => setFollowing(value => !value)}
          style={({pressed}) => [
            styles.followButton,
            following && styles.followingButton,
            pressed && styles.followButtonPressed,
          ]}>
          <Text style={[styles.followText, following && styles.followingText]}>
            {following ? 'Following' : 'Follow'}
          </Text>
        </Pressable>

        <IconButton
          name="ellipsis-horizontal"
          size={25}
          label="Open post menu"
          onPress={() => console.log('Menu button pressed...')}
        />
      </View>

      <Pressable onPress={handleImagePress} style={styles.imageFrame}>
        <Image
          style={styles.postImage}
          source={post.userPostImage}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />

        <View style={styles.imageShade} />

        <View style={styles.moodBadge}>
          <Ionicons name="sparkles" size={14} color="#FFFFFF" />
          <Text style={styles.moodText}>{post.mood || post.category}</Text>
        </View>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.heartBurst,
            {
              opacity: heartScale,
              transform: [{scale: heartScale}],
            },
          ]}>
          <Ionicons name="heart" size={88} color="#FFFFFF" />
        </Animated.View>
      </Pressable>

      <View style={styles.actionRow}>
        <View style={styles.leftActions}>
          <IconButton
            name={liked ? 'heart' : 'heart-outline'}
            size={liked ? 31 : 30}
            color={liked ? COLORS.instagram : COLORS.black}
            label={liked ? 'Unlike post' : 'Like post'}
            onPress={() => setLiked(value => !value)}
          />

          <IconButton
            name="chatbubble-outline"
            size={27}
            label="Comment on post"
            onPress={() => console.log('Comment button pressed...')}
          />

          <IconButton
            name="paper-plane-outline"
            size={27}
            label="Share post"
            onPress={() => console.log('Share button pressed...')}
          />
        </View>

        <View style={styles.rightActions}>
          <MetricPill icon="analytics-outline" value={post.shares || 0} />

          <IconButton
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={29}
            color={saved ? COLORS.black : COLORS.black}
            label={saved ? 'Remove saved post' : 'Save post'}
            onPress={() => setSaved(value => !value)}
          />
        </View>
      </View>

      <View style={styles.contentBlock}>
        <View style={styles.engagementRow}>
          <Text style={styles.likesText}>{formatCount(likeCount)} likes</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.savesText}>{formatCount(post.saves || 0)} saves</Text>
        </View>

        <Text style={styles.captionText} numberOfLines={expanded ? undefined : 2}>
          <Text style={styles.captionUser}>{post.username}</Text>
          {` ${post.caption || ''}`}
        </Text>

        {(post.caption || '').length > 90 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Show less caption' : 'Read more caption'}
            onPress={() => setExpanded(value => !value)}>
            <Text style={styles.readMoreText}>
              {expanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>
        ) : null}

        <View style={styles.commentsRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`View all ${post.comments} comments`}>
            <Text style={styles.commentsText}>
              View all {formatCount(post.comments)} comments
            </Text>
          </Pressable>

          <Text style={styles.timeText}>{post.timeAgo}</Text>
        </View>
      </View>
    </View>
  );
});

const shadow = Platform.select({
  ios: {
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.11,
    shadowRadius: 28,
  },
  android: {
    elevation: 6,
  },
  default: {},
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 14,
    marginTop: 18,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    ...shadow,
  },
  featuredRibbon: {
    position: 'absolute',
    top: 77,
    left: 18,
    zIndex: 10,
    height: 28,
    paddingHorizontal: 11,
    borderRadius: 14,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  header: {
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  avatarFrame: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF1F6',
    padding: 3,
    marginRight: 11,
  },
  userProfilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
    backgroundColor: COLORS.soft,
  },
  userInfo: {
    flex: 1,
    paddingRight: 10,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    maxWidth: 152,
    color: COLORS.black,
    fontSize: 14.7,
    fontWeight: '900',
    letterSpacing: -0.15,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.blue,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  followButton: {
    minWidth: 72,
    height: 34,
    borderRadius: 18,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 7,
  },
  followingButton: {
    backgroundColor: COLORS.soft,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  followButtonPressed: {
    transform: [{scale: 0.96}],
    opacity: 0.85,
  },
  followText: {
    color: COLORS.white,
    fontSize: 12.5,
    fontWeight: '900',
  },
  followingText: {
    color: COLORS.black,
  },
  imageFrame: {
    width: '100%',
    height: imageHeight,
    backgroundColor: COLORS.soft,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  imageShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 96,
    backgroundColor: 'rgba(17, 24, 39, 0.20)',
  },
  moodBadge: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(17, 24, 39, 0.62)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 6,
  },
  categoryBadge: {
    position: 'absolute',
    right: 16,
    top: 16,
    height: 31,
    borderRadius: 16,
    paddingHorizontal: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
  },
  categoryText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: '900',
  },
  heartBurst: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(225, 48, 108, 0.36)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    minHeight: 62,
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    transform: [{scale: 0.88}],
    opacity: 0.65,
  },
  metricPill: {
    height: 31,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#F6F7FB',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  metricText: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 4,
  },
  contentBlock: {
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  likesText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '900',
  },
  dotSeparator: {
    color: '#D1D5DB',
    marginHorizontal: 7,
    fontWeight: '900',
  },
  savesText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '800',
  },
  captionText: {
    color: COLORS.black,
    fontSize: 13.8,
    lineHeight: 20.5,
  },
  captionUser: {
    fontWeight: '900',
  },
  readMoreText: {
    color: COLORS.instagram,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 6,
  },
  commentsRow: {
    marginTop: 11,
  },
  commentsText: {
    color: '#8A8F98',
    fontSize: 13.5,
    fontWeight: '700',
  },
  timeText: {
    color: '#A3A8B2',
    fontSize: 10.8,
    marginTop: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});

export default PostView;
