// src/screens/social/FriendsListScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Header from '../../components/common/Header';
import FriendCard from '../../components/social/FriendCard';
import { COLORS, FONTS } from '../../styles/globalStyles';

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

const FriendsListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'online'

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredFriends = activeTab === 'online' 
    ? MOCK_FRIENDS.filter(friend => friend.online)
    : MOCK_FRIENDS;

  const handleFriendPress = (friend) => {
    console.log('Friend pressed:', friend);
    // Navigate to friend profile
  };

  const handleMessage = (friend) => {
    navigation.navigate('Chat', { 
      chatId: friend.id, 
      username: friend.username 
    });
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Friends"
        rightIcon={
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        }
      />

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All Friends ({MOCK_FRIENDS.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'online' && styles.activeTab]}
          onPress={() => setActiveTab('online')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'online' && styles.activeTabText,
            ]}
          >
            Online ({MOCK_FRIENDS.filter(f => f.online).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      {filteredFriends.length > 0 ? (
        <FlatList
          data={filteredFriends}
          renderItem={({ item }) => (
            <FriendCard
              friend={item}
              onPress={() => handleFriendPress(item)}
              onMessage={handleMessage}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>😔</Text>
          <Text style={styles.emptyTitle}>
            {activeTab === 'online' 
              ? 'No Friends Online' 
              : 'No Friends Yet'}
          </Text>
          <Text style={styles.emptySubtext}>
            {activeTab === 'online'
              ? 'Check back later when friends are online'
              : 'Start connecting with other developers!'}
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
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

export default FriendsListScreen;