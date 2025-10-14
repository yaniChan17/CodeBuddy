import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Header from '../../components/common/Header';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Temporary mock data for testing
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
    title: 'Best practices for Firebase authentication?',
    author: 'techGuru',
    tags: ['Firebase', 'Auth'],
    upvotes: 18,
    comments: 8,
    timestamp: '4h ago',
  },
  // Add more mock posts as needed
];

const PostCard = ({ post, onPress }) => (
  <TouchableOpacity 
    style={styles.postCard}
    onPress={onPress}
  >
    <View style={styles.postHeader}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.authorText}>Posted by @{post.author} • {post.timestamp}</Text>
    </View>
    
    <View style={styles.tagsContainer}>
      {post.tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.postFooter}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>🔺 {post.upvotes}</Text>
        <Text style={styles.statsText}>💬 {post.comments}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Will implement actual refresh logic later
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { post });
  };

  return (
    <View style={styles.container}>
      <Header 
        title="CodeBuddy"
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <Text style={styles.createPostButton}>+</Text>
          </TouchableOpacity>
        }
      />
      
      <FlatList
        data={MOCK_POSTS}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            onPress={() => handlePostPress(item)}
          />
        )}
        keyExtractor={item => item.id}
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
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  createPostButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default HomeScreen;