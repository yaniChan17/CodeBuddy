// src/screens/ProfileScreen.js
import React from 'react';
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

// Mock user data
const MOCK_USER = {
  username: 'johnDoe',
  email: 'john@example.com',
  avatar: null,
  bio: 'Full-stack developer | React Native enthusiast | Always learning',
  joinedDate: 'Jan 2024',
  stats: {
    posts: 24,
    answers: 56,
    upvotes: 142,
  },
};

// Mock user posts
const MOCK_USER_POSTS = [
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
    author: 'johnDoe',
    tags: ['Firebase', 'Auth'],
    upvotes: 18,
    comments: 8,
    timestamp: '1d ago',
  },
];

const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
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
        rightIcon={
          <TouchableOpacity onPress={handleSettings}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={MOCK_USER.avatar || require('../../assets/lable.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.username}>@{MOCK_USER.username}</Text>
          <Text style={styles.email}>{MOCK_USER.email}</Text>
          <Text style={styles.bio}>{MOCK_USER.bio}</Text>
          <Text style={styles.joinedDate}>Joined {MOCK_USER.joinedDate}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_USER.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_USER.stats.answers}</Text>
            <Text style={styles.statLabel}>Answers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_USER.stats.upvotes}</Text>
            <Text style={styles.statLabel}>Upvotes</Text>
          </View>
        </View>

        {/* User Posts */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>My Posts</Text>
          {MOCK_USER_POSTS.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => handlePostPress(post)}
            />
          ))}
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
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  joinedDate: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#FFFFFF',
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
  settingsIcon: {
    fontSize: 20,
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default ProfileScreen;