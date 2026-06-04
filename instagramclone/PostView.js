import React, {memo, useMemo, useState} from 'react';
import {
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
const imageHeight = Math.min(460, Math.round(screenWidth * 1.05));

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

const PostView = memo(({post}) => {
  const [liked, setLiked] = useState(Boolean(post?.liked));
  const [saved, setSaved] = useState(Boolean(post?.saved));
  const [following, setFollowing] = useState(Boolean(post?.following));

  const likeCount = useMemo(() => {
    const baseLikes = Number(post?.likes || 0);
    return liked && !post?.liked ? baseLikes + 1 : baseLikes;
  }, [liked, post?.liked, post?.likes]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.userProfilePhoto}
          source={post.userAvatar}
          accessibilityIgnoresInvertColors
        />

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
            <Text numberOfLines={1} style={styles.locationText}>
              {post.location}
            </Text>
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

      <View style={styles.imageFrame}>
        <Image
          style={styles.postImage}
          source={post.userPostImage}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </View>

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

        <IconButton
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={29}
          color={saved ? COLORS.black : COLORS.black}
          label={saved ? 'Remove saved post' : 'Save post'}
          onPress={() => setSaved(value => !value)}
        />
      </View>

      <View style={styles.contentBlock}>
        <Text style={styles.likesText}>{formatCount(likeCount)} likes</Text>

        <Text style={styles.captionText}>
          <Text style={styles.captionUser}>{post.username}</Text>
          {` ${post.caption || ''}`}
        </Text>

        {post.comments ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`View all ${post.comments} comments`}>
            <Text style={styles.commentsText}>
              View all {formatCount(post.comments)} comments
            </Text>
          </Pressable>
        ) : null}

        <Text style={styles.timeText}>{post.timeAgo}</Text>
      </View>
    </View>
  );
});

const shadow = Platform.select({
  ios: {
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.08,
    shadowRadius: 22,
  },
  android: {
    elevation: 4,
  },
  default: {},
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginTop: 14,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    ...shadow,
  },

  header: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  userProfilePhoto: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 11,
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
    maxWidth: 150,
    color: COLORS.black,
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.1,
  },

  verifiedBadge: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: COLORS.blue,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
    fontWeight: '500',
  },

  followButton: {
    minWidth: 72,
    height: 34,
    borderRadius: 18,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 8,
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
    fontWeight: '800',
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

  actionRow: {
    height: 58,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftActions: {
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

  contentBlock: {
    paddingHorizontal: 16,
    paddingBottom: 18,
  },

  likesText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 7,
  },

  captionText: {
    color: COLORS.black,
    fontSize: 13.8,
    lineHeight: 20,
  },

  captionUser: {
    fontWeight: '900',
  },

  commentsText: {
    color: '#8A8F98',
    fontSize: 13.5,
    marginTop: 8,
    fontWeight: '600',
  },

  timeText: {
    color: '#A3A8B2',
    fontSize: 11,
    marginTop: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.35,
  },
});

export default PostView;