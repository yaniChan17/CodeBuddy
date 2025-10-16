// src/screens/social/FriendsListScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Mock friend requests
const MOCK_FRIEND_REQUESTS = [
  {
    id: 'req1',
    username: 'newUser123',
    avatar: null,
    mutualFriends: 3,
    timestamp: '2h ago',
  },
  {
    id: 'req2',
    username: 'codingBuddy',
    avatar: null,
    mutualFriends: 7,
    timestamp: '5h ago',
  },
];

// Mock friends data
const MOCK_FRIENDS = [
  {
    id: '1',
    username: 'johnDoe',
    avatar: null,
    online: true,
    lastSeen: '2m ago',
    mutualFriends: 5,
  },
  {
    id: '2',
    username: 'reactMaster',
    avatar: null,
    online: true,
    lastSeen: 'now',
    mutualFriends: 8,
  },
  {
    id: '3',
    username: 'codeGuru',
    avatar: null,
    online: false,
    lastSeen: '2h ago',
    mutualFriends: 3,
  },
  {
    id: '4',
    username: 'techNinja',
    avatar: null,
    online: false,
    lastSeen: '1d ago',
    mutualFriends: 12,
  },
  {
    id: '5',
    username: 'pythonPro',
    avatar: null,
    online: true,
    lastSeen: 'now',
    mutualFriends: 7,
  },
];

const FriendRequestCard = ({ request, onAccept, onDecline }) => (
  <View style={styles.requestCard}>
    <Image
      source={request.avatar || require('../../../assets/lable.jpg')}
      style={styles.requestAvatar}
    />
    <View style={styles.requestInfo}>
      <Text style={styles.requestUsername}>@{request.username}</Text>
      <Text style={styles.mutualFriends}>{request.mutualFriends} mutual friends</Text>
      <Text style={styles.timestamp}>{request.timestamp}</Text>
      
      <View style={styles.requestActions}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept(request.id)}>
          <Text style={styles.acceptButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={() => onDecline(request.id)}>
          <Text style={styles.declineButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const FriendCard = ({ friend, onPress, onMessage, onUnfriend }) => (
  <TouchableOpacity style={styles.friendCard} onPress={onPress}>
    <View style={styles.avatarContainer}>
      <Image
        source={friend.avatar || require('../../../assets/lable.jpg')}
        style={styles.avatar}
      />
      {friend.online && <View style={styles.onlineIndicator} />}
    </View>

    <View style={styles.friendInfo}>
      <Text style={styles.friendUsername}>@{friend.username}</Text>
      <Text style={styles.status}>
        {friend.online ? 'Active now' : `Active ${friend.lastSeen}`}
      </Text>
    </View>

    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={styles.messageIconButton}
        onPress={(e) => {
          e.stopPropagation();
          onMessage(friend);
        }}
      >
        <Text style={styles.actionIcon}>💬</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.unfriendButton}
        onPress={(e) => {
          e.stopPropagation();
          onUnfriend(friend);
        }}
      >
        <Text style={styles.actionIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const FriendsListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [friendRequests, setFriendRequests] = useState(MOCK_FRIEND_REQUESTS);
  const [friends, setFriends] = useState(MOCK_FRIENDS);

  const onlineCount = friends.filter(f => f.online).length;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAcceptRequest = (requestId) => {
    setFriendRequests(friendRequests.filter(req => req.id !== requestId));
    console.log('Accepted request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    setFriendRequests(friendRequests.filter(req => req.id !== requestId));
    console.log('Declined request:', requestId);
  };

  const handleFriendPress = (friend) => {
    navigation.navigate('UserProfile', { user: friend });
  };

  const handleMessage = (friend) => {
    navigation.navigate('Chat', { 
      chatId: friend.id, 
      username: friend.username 
    });
  };

  const handleUnfriend = (friend) => {
    Alert.alert(
      'Unfriend',
      `Are you sure you want to unfriend @${friend.username}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unfriend',
          style: 'destructive',
          onPress: () => {
            setFriends(friends.filter(f => f.id !== friend.id));
            console.log('Unfriended:', friend.username);
          },
        },
      ]
    );
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Facebook-style Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{onlineCount}</Text>
          <Text style={styles.statLabel}>Online</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{friends.length}</Text>
          <Text style={styles.statLabel}>Your Friends</Text>
        </View>
      </View>

      <FlatList
        data={[{ type: 'requests' }, { type: 'friends' }]}
        renderItem={({ item }) => {
          if (item.type === 'requests' && friendRequests.length > 0) {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Friend Requests ({friendRequests.length})
                </Text>
                {friendRequests.map(request => (
                  <FriendRequestCard
                    key={request.id}
                    request={request}
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                  />
                ))}
              </View>
            );
          }
          
          if (item.type === 'friends') {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>All Friends</Text>
                {friends.map(friend => (
                  <FriendCard
                    key={friend.id}
                    friend={friend}
                    onPress={() => handleFriendPress(friend)}
                    onMessage={handleMessage}
                    onUnfriend={handleUnfriend}
                  />
                ))}
              </View>
            );
          }
          
          return null;
        }}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
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
  statsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.bold,
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#65676B',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  section: {
    marginTop: 8,
    backgroundColor: COLORS.background,
    paddingVertical: 12,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 17,
    color: COLORS.secondary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  requestCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  requestAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  requestInfo: {
    flex: 1,
  },
  requestUsername: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  mutualFriends: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#65676B',
    marginBottom: 2,
  },
  timestamp: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#B0B3B8',
    marginBottom: 12,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  acceptButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  declineButton: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  declineButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  friendInfo: {
    flex: 1,
  },
  friendUsername: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 2,
  },
  status: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#65676B',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  messageIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfriendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
});

export default FriendsListScreen;