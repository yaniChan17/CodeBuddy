// src/screens/posts/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Temporary mock data for testing
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
    title: 'Best practices for Firebase authentication?',
    author: 'techGuru',
    tags: ['Firebase', 'Auth'],
    upvotes: 18,
    downvotes: 1,
    comments: 8,
    timestamp: '4h ago',
  },
  {
    id: '3',
    title: 'React Navigation vs React Native Navigation?',
    author: 'reactMaster',
    tags: ['React Native', 'Navigation'],
    upvotes: 42,
    downvotes: 5,
    comments: 23,
    timestamp: '6h ago',
  },
];

const PostCard = ({ post, onPress }) => (
  <TouchableOpacity style={styles.postCard} onPress={onPress}>
    <View style={styles.postHeader}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.authorText}>
        Posted by @{post.author} • {post.timestamp}
      </Text>
    </View>

    <View style={styles.tagsContainer}>
      {post.tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>

    <View style={styles.postFooter}>
      <View style={styles.voteContainer}>
        <TouchableOpacity style={styles.voteButton}>
          <Text style={styles.upvoteText}>🔺</Text>
        </TouchableOpacity>
        <Text style={styles.voteCount}>{post.upvotes - post.downvotes}</Text>
        <TouchableOpacity style={styles.voteButton}>
          <Text style={styles.downvoteText}>🔻</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.statsText}>💬 {post.comments}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { post });
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileTab');
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <Image
            source={require('../../../assets/lable.jpg')}
            style={styles.profileAvatar}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CodeBuddy</Text>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPress}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_POSTS}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => handlePostPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
    backgroundColor: COLORS.background,
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
    paddingTop: 30,
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  headerTitle: {
    ...FONTS.bold,
    fontSize: 20,
    color: COLORS.primary,
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  listContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  postHeader: {
    marginBottom: 12,
  },
  postTitle: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  authorText: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.secondary,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    padding: 4,
  },
  upvoteText: {
    fontSize: 16,
  },
  downvoteText: {
    fontSize: 16,
  },
  voteCount: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
    marginHorizontal: 8,
    minWidth: 30,
    textAlign: 'center',
  },
  statsText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;