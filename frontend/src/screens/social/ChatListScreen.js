// src/screens/social/ChatListScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Mock data for testing
const MOCK_CHATS = [
  {
    id: '1',
    username: 'johnDoe',
    lastMessage: 'Thanks for helping with the React hooks!',
    timestamp: '2m ago',
    unread: 2,
    avatar: null,
    online: true,
  },
  {
    id: '2',
    username: 'reactMaster',
    lastMessage: 'Check this solution for your Firebase issue',
    timestamp: '1h ago',
    unread: 0,
    avatar: null,
    online: true,
  },
  {
    id: '3',
    username: 'codeGuru',
    lastMessage: 'The bug was in the async function',
    timestamp: '2h ago',
    unread: 0,
    avatar: null,
    online: false,
  },
];

const ChatListItem = ({ chat, onPress }) => (
  <TouchableOpacity style={styles.chatItem} onPress={onPress}>
    <View style={styles.avatarContainer}>
      <Image
        source={chat.avatar || require('../../../assets/lable.jpg')}
        style={styles.avatar}
      />
      {chat.online && <View style={styles.onlineIndicator} />}
    </View>

    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.username}>@{chat.username}</Text>
        <Text style={styles.timestamp}>{chat.timestamp}</Text>
      </View>
      <View style={styles.messageRow}>
        <Text
          style={[
            styles.lastMessage,
            chat.unread > 0 && styles.unreadMessage,
          ]}
          numberOfLines={1}
        >
          {chat.lastMessage}
        </Text>
        {chat.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{chat.unread}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const ChatListScreen = ({ navigation }) => {
  const handleChatPress = (chat) => {
    navigation.navigate('Chat', { chatId: chat.id, username: chat.username });
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Facebook-style Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {MOCK_CHATS.length > 0 ? (
        <FlatList
          data={MOCK_CHATS}
          renderItem={({ item }) => (
            <ChatListItem chat={item} onPress={() => handleChatPress(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyText}>No messages yet</Text>
          <Text style={styles.emptySubtext}>
            Start chatting with other developers!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.secondary,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#31A24C',
    borderWidth: 2,
    borderColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
  },
  timestamp: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#65676B',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#65676B',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    ...FONTS.medium,
    color: COLORS.secondary,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    ...FONTS.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#65676B',
    textAlign: 'center',
  },
});

export default ChatListScreen;