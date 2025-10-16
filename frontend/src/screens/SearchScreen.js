// src/screens/SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
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
    downvotes: 2,
    comments: 12,
    timestamp: '2h ago',
  },
  {
    id: '2',
    title: 'Firebase authentication best practices',
    author: 'techGuru',
    tags: ['Firebase', 'Auth'],
    upvotes: 18,
    downvotes: 1,
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
  const [activeTab, setActiveTab] = useState('posts');
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState(MOCK_USERS);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Facebook-style Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts, users, or tags..."
            placeholderTextColor="#B0B3B8"
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
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Start Searching</Text>
          <Text style={styles.emptySubtext}>
            Find posts, users, or topics you're interested in
          </Text>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>😞</Text>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    ...FONTS.bold,
    fontSize: 28,
    color: COLORS.primary,
  },
  headerTitle: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.secondary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.secondary,
  },
  clearButton: {
    fontSize: 18,
    color: '#65676B',
    paddingHorizontal: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.medium,
    fontSize: 15,
    color: '#65676B',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  resultsList: {
    padding: 8,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
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
    color: '#65676B',
    textAlign: 'center',
  },
});

export default SearchScreen;