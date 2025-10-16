// src/screens/ProfileScreen.js
import React from 'react';
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

const MOCK_USER = {
  displayName: 'John Doe',
  username: 'johnDoe',
  avatar: null,
  bio: 'Full-stack developer | React Native enthusiast | Always learning',
  joinedDate: 'Jan 2024',
  stats: {
    posts: 24,
    answers: 56,
    upvotes: 142,
  },
};

const MOCK_USER_POSTS = [
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
    author: 'johnDoe',
    tags: ['Firebase', 'Auth'],
    upvotes: 18,
    downvotes: 1,
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
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={MOCK_USER.avatar || require('../../assets/lable.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.displayName}>{MOCK_USER.displayName}</Text>
          <Text style={styles.username}>@{MOCK_USER.username}</Text>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 18,
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
    marginBottom: 8,
    paddingHorizontal: 16,
    lineHeight: 21,
  },
  joinedDate: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#B0B3B8',
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
    fontSize: 15,
    color: '#FFFFFF',
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
});

export default ProfileScreen;