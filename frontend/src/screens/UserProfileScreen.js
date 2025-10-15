// src/screens/UserProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/common/Header';
import PostCard from '../components/posts/PostCard';
import { COLORS, FONTS } from '../styles/globalStyles';

// Mock user posts
const MOCK_USER_POSTS = [
  {
    id: '1',
    title: 'Getting started with React Hooks',
    author: 'user',
    tags: ['React Native', 'Hooks'],
    upvotes: 15,
    comments: 7,
    timestamp: '3h ago',
  },
];

const UserProfileScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [isFriend, setIsFriend] = useState(user.isFriend || false);

  const handleAddFriend = () => {
    setIsFriend(!isFriend);
    console.log(isFriend ? 'Removed friend:' : 'Added friend:', user.username);
  };

  const handleMessage = () => {
    navigation.navigate('Chat', { 
      chatId: user.id, 
      username: user.username 
    });
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { post });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={user.imageUrl ? { uri: user.imageUrl } : require('../../assets/lable.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.email}>{user.email || 'user@example.com'}</Text>
          <Text style={styles.bio}>{user.bio || 'Coding enthusiast | Always learning'}</Text>
          
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusDot, 
                { backgroundColor: user.status === 'online' ? '#4CAF50' : '#9E9E9E' }
              ]} 
            />
            <Text style={styles.statusText}>
              {user.status === 'online' ? 'Online' : 'Offline'}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, isFriend && styles.friendButton]}
              onPress={handleAddFriend}
            >
              <Text style={[styles.actionButtonText, isFriend && styles.friendButtonText]}>
                {isFriend ? '✓ Friends' : '+ Add Friend'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.messageButton}
              onPress={handleMessage}
            >
              <Text style={styles.messageButtonText}>💬 Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats?.posts || 12}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats?.answers || 24}</Text>
            <Text style={styles.statLabel}>Answers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats?.upvotes || 56}</Text>
            <Text style={styles.statLabel}>Upvotes</Text>
          </View>
        </View>

        {/* User Posts */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {MOCK_USER_POSTS.length > 0 ? (
            MOCK_USER_POSTS.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post)}
              />
            ))
          ) : (
            <View style={styles.emptyPosts}>
              <Text style={styles.emptyText}>No posts yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  username: {
    ...FONTS.bold,
    fontSize: 22,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  email: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  friendButton: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  friendButtonText: {
    color: COLORS.secondary,
  },
  messageButton: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  messageButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  postsSection: {
    padding: 16,
  },
  sectionTitle: {
    ...FONTS.medium,
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  emptyPosts: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default UserProfileScreen;
