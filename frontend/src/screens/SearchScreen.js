// src/screens/SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/common/Header';
import PostCard from '../components/posts/PostCard';
import UserCard from '../components/common/UserCard';
import { COLORS, FONTS } from '../styles/globalStyles';

// Mock search data
const MOCK_POSTS = [
  {
    id: '1',
    title: 'How to implement useState in React Native?',
    author: 'johnDoe',
    tags: ['React Native', 'Hooks'],
    upvotes: 25,
    comments: 12,
    timestamp: '2h ago',
  },
  {
    id: '2',
    title: 'Firebase authentication best practices',
    author: 'techGuru',
    tags: ['Firebase', 'Auth'],
    upvotes: 18,
    comments: 8,
    timestamp: '4h ago',
  },
];

const MOCK_USERS = [
  { 
    id: '1', 
    username: 'johnDoe', 
    imageUrl: null, 
    status: 'online',
    isFriend: false,
    email: 'john@example.com',
    bio: 'Full-stack developer',
  },
  { 
    id: '2', 
    username: 'reactMaster', 
    imageUrl: null, 
    status: 'online',
    isFriend: false,
    email: 'react@example.com',
    bio: 'React Native expert',
  },
  { 
    id: '3', 
    username: 'codeGuru', 
    imageUrl: null, 
    status: 'offline',
    isFriend: true,
    email: 'guru@example.com',
    bio: 'Coding enthusiast',
  },
];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'users'
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState(MOCK_USERS);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      // Mock search - in real app, this would call Firebase
      if (activeTab === 'posts') {
        const filtered = MOCK_POSTS.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase())
            )
        );
        setSearchResults(filtered);
      } else {
        const filtered = users.filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { post });
  };

  const handleUserPress = (user) => {
    navigation.navigate('UserProfile', { user });
  };

  const handleAddFriend = (userId) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isFriend: !user.isFriend }
          : user
      )
    );
    // Update search results if active
    if (searchQuery.trim()) {
      setSearchResults(prevResults =>
        prevResults.map(user =>
          user.id === userId
            ? { ...user, isFriend: !user.isFriend }
            : user
        )
      );
    }
    const user = users.find(u => u.id === userId);
    console.log(user?.isFriend ? 'Removed friend:' : 'Added friend:', user?.username);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Search"
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts, users, or tags..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => handleTabChange('posts')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'posts' && styles.activeTabText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => handleTabChange('users')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'users' && styles.activeTabText,
            ]}
          >
            Users
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchQuery.trim() === '' ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🔍</Text>
          <Text style={styles.emptyTitle}>Start Searching</Text>
          <Text style={styles.emptySubtext}>
            Find posts, users, or topics you're interested in
          </Text>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>😞</Text>
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtext}>
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) =>
            activeTab === 'posts' ? (
              <PostCard post={item} onPress={() => handlePostPress(item)} />
            ) : (
              <UserCard
                username={item.username}
                imageUrl={item.imageUrl}
                status={item.status}
                isFriend={item.isFriend}
                showAddButton={true}
                onPress={() => handleUserPress(item)}
                onAddFriend={() => handleAddFriend(item.id)}
              />
            )
          }
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    ...FONTS.regular,
    fontSize: 16,
  },
  clearButton: {
    fontSize: 18,
    color: '#999',
    marginLeft: 8,
    paddingHorizontal: 8,
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
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  resultsList: {
    padding: 16,
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
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default SearchScreen;