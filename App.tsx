import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';

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
  ring?: 'hot' | 'fresh' | 'calm';
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
  shares?: number;
  saves?: number;
  caption: string;
  timeAgo: string;
  category: 'Nature' | 'Travel' | 'Design';
  mood: string;
  featured?: boolean;
};

type FilterItem = {
  id: 'All' | 'Nature' | 'Travel' | 'Design';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const stories: StoryItem[] = [
  {
    id: 'your-story',
    image: require('./assets/images/image8.jpg'),
    text: 'Your story',
    isAdd: true,
    ring: 'fresh',
  },
  {
    id: 'sonalii',
    image: require('./assets/images/image5.jpg'),
    text: 'itss_sonalii',
    isLive: true,
    ring: 'hot',
  },
  {
    id: 'rohit',
    image: require('./assets/images/image6.jpg'),
    text: 'rohit30619',
    ring: 'fresh',
  },
  {
    id: 'android',
    image: require('./assets/images/image7.jpg'),
    text: 'android',
    seen: true,
    ring: 'calm',
  },
  {
    id: 'marvel',
    image: require('./assets/images/image8.jpg'),
    text: 'marvelstudios',
    ring: 'hot',
  },
  {
    id: 'google',
    image: require('./assets/images/image9.jpg'),
    text: 'google',
    seen: true,
    ring: 'calm',
  },
  {
    id: 'off-track',
    image: require('./assets/images/image10.jpg'),
    text: '_off_track___',
    ring: 'fresh',
  },
];

const filters: FilterItem[] = [
  {id: 'All', label: 'For You', icon: 'sparkles-outline'},
  {id: 'Nature', label: 'Nature', icon: 'leaf-outline'},
  {id: 'Travel', label: 'Travel', icon: 'airplane-outline'},
  {id: 'Design', label: 'Design', icon: 'color-palette-outline'},
];

const posts: FeedPost[] = [
  {
    id: 'post-nature-01',
    username: 'lovethenature95',
    fullName: 'Love The Nature',
    location: 'Western Ghats, India',
    verified: true,
    featured: true,
    category: 'Nature',
    mood: 'Calm view',
    userAvatar: require('./assets/images/lovethenature95.jpg'),
    userPostImage: require('./assets/post/post01.jpg'),
    likes: 12894,
    comments: 347,
    shares: 86,
    saves: 1400,
    caption:
      'A quiet frame from the mountains. Clean air, soft light, and a reminder to slow down.',
    timeAgo: '18 minutes ago',
  },
  {
    id: 'post-nature-02',
    username: 'nature_beauty511',
    fullName: 'Nature Beauty',
    location: 'Morning trails',
    category: 'Travel',
    mood: 'Golden hour',
    userAvatar: require('./assets/images/nature_beauty511.jpg'),
    userPostImage: require('./assets/post/post02.jpg'),
    likes: 8540,
    comments: 129,
    shares: 44,
    saves: 920,
    caption:
      'Some views do not need filters. They just need a little patience and the right moment.',
    timeAgo: '1 hour ago',
  },
  {
    id: 'post-design-03',
    username: 'travel.frames',
    fullName: 'Travel Frames',
    location: 'Creative outdoors',
    verified: true,
    category: 'Design',
    mood: 'Creator pick',
    userAvatar: require('./assets/images/image5.jpg'),
    userPostImage: require('./assets/post/post01.jpg'),
    likes: 17620,
    comments: 512,
    shares: 132,
    saves: 2100,
    caption:
      'Composition, depth, and light can turn a simple moment into a cinematic story.',
    timeAgo: '2 hours ago',
  },
];

function App(): React.JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState<FilterItem['id']>('All');

  const filteredPosts = useMemo(() => {
    if (selectedFilter === 'All') {
      return posts;
    }

    return posts.filter(post => post.category === selectedFilter);
  }, [selectedFilter]);

  const renderPost = useCallback(({item}: {item: FeedPost}) => {
    return <PostView post={item} />;
  }, []);

  const header = useMemo(() => {
    return (
      <FeedHeader
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />
    );
  }, [selectedFilter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <StatusBar backgroundColor="#F6F7FB" barStyle="dark-content" />

        <FlatList
          data={filteredPosts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          ListHeaderComponent={header}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={4}
          windowSize={7}
          removeClippedSubviews
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const FeedHeader = React.memo(
  ({
    selectedFilter,
    onSelectFilter,
  }: {
    selectedFilter: FilterItem['id'];
    onSelectFilter: (value: FilterItem['id']) => void;
  }) => {
    return (
      <>
        <Toolbar />
        <HeroPanel />
        <FilterRail selectedFilter={selectedFilter} onSelectFilter={onSelectFilter} />
        <CircleImageList data={stories} />
        <View style={styles.sectionDivider} />
      </>
    );
  },
);

const Toolbar = React.memo(() => {
  return (
    <View style={styles.toolbar}>
      <View style={styles.logoBlock}>
        <Image
          source={require('./assets/icons/instagram_logo_text.png')}
          style={styles.toolbarLogo}
          accessibilityIgnoresInvertColors
        />
        <Text style={styles.toolbarSubtitle}>Creator Feed</Text>
      </View>

      <View style={styles.toolbarButtons}>
        <TouchableOpacity
          activeOpacity={0.75}
          hitSlop={styles.hitSlop}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Search posts"
          onPress={() => console.log('Search pressed...')}>
          <Ionicons name="search-outline" size={22} color="#111827" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          hitSlop={styles.hitSlop}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Open messages"
          onPress={() => console.log('Messaging button pressed...')}>
          <Ionicons name="paper-plane-outline" size={22} color="#111827" />
          <View style={styles.messageBadge}>
            <Text style={styles.messageBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const HeroPanel = React.memo(() => {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroOrbOne} />
      <View style={styles.heroOrbTwo} />

      <View style={styles.heroHeader}>
        <View>
          <Text style={styles.heroEyebrow}>Today’s spotlight</Text>
          <Text style={styles.heroTitle}>Discover cinematic moments</Text>
        </View>

        <View style={styles.heroIconBubble}>
          <Ionicons name="sparkles" size={21} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.heroDescription}>
        Curated nature, travel, and creative frames from the community.
      </Text>

      <View style={styles.heroStatsRow}>
        <View style={styles.heroStat}>
          <Text style={styles.heroStatValue}>38K</Text>
          <Text style={styles.heroStatLabel}>Likes</Text>
        </View>
        <View style={styles.heroStatDivider} />
        <View style={styles.heroStat}>
          <Text style={styles.heroStatValue}>1.8K</Text>
          <Text style={styles.heroStatLabel}>Comments</Text>
        </View>
        <View style={styles.heroStatDivider} />
        <View style={styles.heroStat}>
          <Text style={styles.heroStatValue}>4.4K</Text>
          <Text style={styles.heroStatLabel}>Saves</Text>
        </View>
      </View>
    </View>
  );
});

const FilterRail = React.memo(
  ({
    selectedFilter,
    onSelectFilter,
  }: {
    selectedFilter: FilterItem['id'];
    onSelectFilter: (value: FilterItem['id']) => void;
  }) => {
    return (
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.filterContent}
        renderItem={({item}) => {
          const active = selectedFilter === item.id;

          return (
            <TouchableOpacity
              activeOpacity={0.82}
              style={[styles.filterChip, active && styles.filterChipActive]}
              accessibilityRole="button"
              accessibilityLabel={`Show ${item.label} posts`}
              onPress={() => onSelectFilter(item.id)}>
              <Ionicons
                name={item.icon}
                size={17}
                color={active ? '#FFFFFF' : '#6B7280'}
              />
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  },
);

export default App;
