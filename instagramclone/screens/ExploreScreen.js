import React, {memo} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {exploreItems} from '../data';
import {colors, getAdaptiveLayout, shadow} from '../theme';

const ExploreScreen = () => {
  const {width} = useWindowDimensions();
  const layout = getAdaptiveLayout(width);
  const gap = 12;
  const contentWidth = Math.min(width, layout.maxContentWidth) - layout.pagePadding * 2;
  const itemWidth = (contentWidth - gap * (layout.exploreColumns - 1)) / layout.exploreColumns;

  return (
    <FlatList
      key={`explore-${layout.exploreColumns}`}
      data={exploreItems}
      numColumns={layout.exploreColumns}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, {paddingHorizontal: layout.pagePadding, maxWidth: layout.maxContentWidth, alignSelf: 'center'}]}
      ListHeaderComponent={<ExploreHeader />}
      renderItem={({item, index}) => (
        <ExploreCard item={item} width={itemWidth} gap={gap} isLastInRow={(index + 1) % layout.exploreColumns === 0} />
      )}
    />
  );
};

const ExploreHeader = memo(() => (
  <View style={styles.header}>
    <View>
      <Text style={styles.eyebrow}>Explore Studio</Text>
      <Text style={styles.title}>Discover visual trends</Text>
    </View>
    <View style={styles.searchBubble}><Ionicons name="search" size={21} color={colors.text} /></View>
  </View>
));

const ExploreCard = ({item, width, gap, isLastInRow}) => {
  const height = item.tall ? width * 1.38 : width * 1.05;

  return (
    <Pressable style={[styles.card, {width, height, marginRight: isLastInRow ? 0 : gap}]}> 
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.scorePill}><Ionicons name="trending-up" size={12} color="#FFFFFF" /><Text style={styles.scoreText}>{item.score}</Text></View>
      <View style={styles.cardFooter}>
        <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardTag}>{item.tag}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {paddingBottom: 112},
  header: {minHeight: 94, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  eyebrow: {color: colors.brand, fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1},
  title: {color: colors.text, fontSize: 28, fontWeight: '900', letterSpacing: -1, marginTop: 4},
  searchBubble: {width: 46, height: 46, borderRadius: 23, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadow},
  card: {borderRadius: 28, overflow: 'hidden', marginBottom: 12, backgroundColor: colors.soft, ...shadow},
  image: {width: '100%', height: '100%', resizeMode: 'cover'},
  overlay: {position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', backgroundColor: 'rgba(5,8,22,0.26)'},
  scorePill: {position: 'absolute', top: 10, right: 10, height: 28, borderRadius: 14, paddingHorizontal: 9, backgroundColor: 'rgba(17,24,39,0.62)', flexDirection: 'row', alignItems: 'center'},
  scoreText: {color: '#FFFFFF', fontSize: 11, fontWeight: '900', marginLeft: 4},
  cardFooter: {position: 'absolute', left: 12, right: 12, bottom: 12},
  cardTitle: {color: '#FFFFFF', fontSize: 14.5, fontWeight: '900'},
  cardTag: {color: '#E5E7EB', fontSize: 11, fontWeight: '800', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5},
});

export default ExploreScreen;
