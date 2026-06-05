import React, {memo} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {chats} from '../data';
import {colors, getAdaptiveLayout, shadow, softShadow} from '../theme';

const ChatScreen = () => {
  const {width} = useWindowDimensions();
  const layout = getAdaptiveLayout(width);

  return (
    <FlatList
      data={chats}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, {paddingHorizontal: layout.pagePadding, maxWidth: layout.maxContentWidth, alignSelf: 'center'}]}
      ListHeaderComponent={<ChatHeader />}
      renderItem={({item}) => <ChatCard item={item} />}
    />
  );
};

const ChatHeader = memo(() => (
  <View>
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>Priority Inbox</Text>
        <Text style={styles.title}>Creator conversations</Text>
      </View>
      <View style={styles.composeButton}><Ionicons name="create-outline" size={22} color="#FFFFFF" /></View>
    </View>
    <View style={styles.searchBox}>
      <Ionicons name="search-outline" size={19} color={colors.muted} />
      <Text style={styles.searchText}>Search messages, creators, brands...</Text>
      <View style={styles.aiPill}><Text style={styles.aiPillText}>AI Sort</Text></View>
    </View>
  </View>
));

const ChatCard = ({item}) => (
  <Pressable style={styles.chatCard} accessibilityRole="button">
    <View style={styles.avatarWrap}>
      <Image source={item.avatar} style={styles.avatar} />
      {item.online ? <View style={styles.onlineDot} /> : null}
    </View>
    <View style={styles.chatBody}>
      <View style={styles.nameRow}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text numberOfLines={1} style={styles.username}>@{item.username}</Text>
      <Text numberOfLines={1} style={styles.message}>{item.lastMessage}</Text>
      <View style={styles.metaRow}>
        <View style={styles.priorityPill}><Text style={styles.priorityText}>{item.priority}</Text></View>
        {item.unread ? <View style={styles.unreadPill}><Text style={styles.unreadText}>{item.unread}</Text></View> : null}
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  content: {paddingBottom: 112},
  header: {minHeight: 96, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  eyebrow: {color: colors.blue, fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1},
  title: {color: colors.text, fontSize: 27, lineHeight: 32, fontWeight: '900', letterSpacing: -1, marginTop: 4},
  composeButton: {width: 48, height: 48, borderRadius: 24, backgroundColor: colors.text, alignItems: 'center', justifyContent: 'center', ...shadow},
  searchBox: {height: 54, borderRadius: 27, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 14, ...softShadow},
  searchText: {flex: 1, color: colors.subtle, fontSize: 13, fontWeight: '700', marginLeft: 9},
  aiPill: {height: 28, borderRadius: 14, paddingHorizontal: 10, backgroundColor: '#EEF2FF', justifyContent: 'center'},
  aiPillText: {color: colors.blue, fontSize: 11, fontWeight: '900'},
  chatCard: {borderRadius: 28, backgroundColor: colors.surface, padding: 14, flexDirection: 'row', marginBottom: 12, ...softShadow},
  avatarWrap: {width: 58, height: 58, borderRadius: 29, backgroundColor: '#FFF1F6', padding: 3, position: 'relative'},
  avatar: {width: '100%', height: '100%', borderRadius: 26},
  onlineDot: {position: 'absolute', right: 2, bottom: 5, width: 14, height: 14, borderRadius: 7, backgroundColor: colors.green, borderWidth: 2, borderColor: colors.surface},
  chatBody: {flex: 1, marginLeft: 12},
  nameRow: {flexDirection: 'row', alignItems: 'center'},
  name: {flex: 1, color: colors.text, fontSize: 15.5, fontWeight: '900'},
  time: {color: colors.subtle, fontSize: 11, fontWeight: '800'},
  username: {color: colors.muted, fontSize: 12, fontWeight: '700', marginTop: 2},
  message: {color: colors.text, fontSize: 13.5, fontWeight: '600', marginTop: 7},
  metaRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  priorityPill: {height: 26, borderRadius: 13, paddingHorizontal: 10, backgroundColor: '#F6F7FB', justifyContent: 'center'},
  priorityText: {color: colors.muted, fontSize: 11, fontWeight: '900'},
  unreadPill: {height: 24, minWidth: 24, borderRadius: 12, paddingHorizontal: 7, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', marginLeft: 8},
  unreadText: {color: colors.surface, fontSize: 11, fontWeight: '900'},
});

export default ChatScreen;
