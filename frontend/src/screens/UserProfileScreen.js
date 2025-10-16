// src/screens/UserProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import PostCard from '../components/posts/PostCard';
import { COLORS, FONTS } from '../styles/globalStyles';

const MOCK_USER_POSTS = [
  {
    id: '1',
    title: 'Getting started with React Hooks',
    author: 'user',
    tags: ['React Native', 'Hooks'],
    upvotes: 15,
    downvotes: 2,
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={user.imageUrl ? { uri: user.imageUrl } : require('../../assets/lable.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.displayName}>
            {user.displayName || user.username}
          </Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>
            {user.bio || 'Coding enthusiast | Always learning'}
          </Text>
          
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusDot, 
                { backgroundColor: user.status === 'online' ? '#31A24C' : '#9E9E9E' }
              ]} 
            />
            <Text style={styles.statusText}>
              {user.status === 'online' ? 'Active now' : 'Offline'}
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
              <Text style={styles.emptyIcon}>📭</Text>
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
    fontSize: 18,
    color: COLORS.secondary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  displayName: {
    ...FONTS.bold,
    fontSize: 22,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  username: {
    ...FONTS.regular,
    fontSize: 15,
    color: '#65676B',
    marginBottom: 12,
  },
  bio: {
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    lineHeight: 21,
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
    color: '#65676B',
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
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    color: '#65676B',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  postsSection: {
    padding: 16,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 17,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  emptyPosts: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyText: {
    ...FONTS.regular,
    fontSize: 15,
    color: '#65676B',
  },
});

export default UserProfileScreen;