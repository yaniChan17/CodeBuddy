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
  StatusBar,
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Facebook-style Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CodeBuddy</Text>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <Image
              source={require('../../../assets/lable.jpg')}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>
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
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
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
  listContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    marginBottom: 12,
  },
  postTitle: {
    ...FONTS.medium,
    fontSize: 17,
    color: COLORS.secondary,
    marginBottom: 6,
    lineHeight: 23,
  },
  authorText: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#65676B',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#FFE8DC',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  voteButton: {
    padding: 6,
  },
  upvoteText: {
    fontSize: 18,
  },
  downvoteText: {
    fontSize: 18,
  },
  voteCount: {
    ...FONTS.bold,
    fontSize: 15,
    color: COLORS.secondary,
    marginHorizontal: 8,
    minWidth: 30,
    textAlign: 'center',
  },
  statsText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#65676B',
  },
});

export default HomeScreen;