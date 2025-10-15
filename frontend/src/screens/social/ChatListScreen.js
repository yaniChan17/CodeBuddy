import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Header from '../../components/common/Header';
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
          style={styles.lastMessage} 
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

  return (
    <View style={styles.container}>
      <Header 
        title="Messages" 
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        }
      />

      {MOCK_CHATS.length > 0 ? (
        <FlatList
          data={MOCK_CHATS}
          renderItem={({ item }) => (
            <ChatListItem 
              chat={item} 
              onPress={() => handleChatPress(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.emptyContainer}>
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
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    right: 12,
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
    color: '#666',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    ...FONTS.medium,
    fontSize: 12,
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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
    color: '#666',
    textAlign: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
});

export default ChatListScreen;