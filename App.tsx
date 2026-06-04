import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './resource/styles';
import CircleImageList from './instagramclone/CircleImageList';
import PostView from './instagramclone/PostView';

type StoryItem = {
  id: string;
  image: ImageSourcePropType;
  text: string;
  seen?: boolean;
  isLive?: boolean;
  isAdd?: boolean;
};

type FeedPost = {
  id: string;
  username: string;
  fullName?: string;
  location?: string;
  verified?: boolean;
  following?: boolean;
  userAvatar: ImageSourcePropType;
  userPostImage: ImageSourcePropType;
  likes: number;
  comments: number;
  caption: string;
  timeAgo: string;
};

const stories: StoryItem[] = [
  {
    id: 'your-story',
    image: require('./assets/images/image8.jpg'),
    text: 'Your story',
    isAdd: true,
  },
  {
    id: 'sonalii',
    image: require('./assets/images/image5.jpg'),
    text: 'itss_sonalii',
    isLive: true,
  },
  {
    id: 'rohit',
    image: require('./assets/images/image6.jpg'),
    text: 'rohit30619',
  },
  {
    id: 'android',
    image: require('./assets/images/image7.jpg'),
    text: 'android',
    seen: true,
  },
  {
    id: 'marvel',
    image: require('./assets/images/image8.jpg'),
    text: 'marvelstudios',
  },
  {
    id: 'google',
    image: require('./assets/images/image9.jpg'),
    text: 'google',
    seen: true,
  },
  {
    id: 'off-track',
    image: require('./assets/images/image10.jpg'),
    text: '_off_track___',
  },
];

const posts: FeedPost[] = [
  {
    id: 'post-nature-01',
    username: 'lovethenature95',
    fullName: 'Love The Nature',
    location: 'Western Ghats, India',
    verified: true,
    userAvatar: require('./assets/images/lovethenature95.jpg'),
    userPostImage: require('./assets/post/post01.jpg'),
    likes: 12894,
    comments: 347,
    caption:
      'A quiet frame from the mountains. Clean air, soft light, and a reminder to slow down.',
    timeAgo: '18 minutes ago',
  },
  {
    id: 'post-nature-02',
    username: 'nature_beauty511',
    fullName: 'Nature Beauty',
    location: 'Morning trails',
    userAvatar: require('./assets/images/nature_beauty511.jpg'),
    userPostImage: require('./assets/post/post02.jpg'),
    likes: 8540,
    comments: 129,
    caption:
      'Some views do not need filters. They just need a little patience and the right moment.',
    timeAgo: '1 hour ago',
  },
];

function App(): React.JSX.Element {
  const renderPost = useCallback(({item}: {item: FeedPost}) => {
    return <PostView post={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={<FeedHeader />}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        windowSize={7}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}

const FeedHeader = React.memo(() => {
  return (
    <>
      <Toolbar />
      <CircleImageList data={stories} />
      <View style={styles.sectionDivider} />
    </>
  );
});

const Toolbar = React.memo(() => {
  return (
    <View style={styles.toolbar}>
      <Image
        source={require('./assets/icons/instagram_logo_text.png')}
        style={styles.toolbarLogo}
        accessibilityIgnoresInvertColors
      />

      <View style={styles.toolbarButtons}>
        <TouchableOpacity
          activeOpacity={0.75}
          hitSlop={styles.hitSlop}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Open activity"
          onPress={() => console.log('Activity button pressed...')}>
          <Image
            source={require('./assets/icons/ic_activity_button.png')}
            style={styles.toolbarIcon}
          />
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          hitSlop={styles.hitSlop}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Open messages"
          onPress={() => console.log('Messaging button pressed...')}>
          <Image
            source={require('./assets/icons/ic_messaging_button.png')}
            style={styles.toolbarIcon}
          />
          <View style={styles.messageBadge}>
            <Text style={styles.messageBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default App;
