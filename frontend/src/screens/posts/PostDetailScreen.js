// src/screens/posts/PostDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Button from '../../components/common/Button';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Temporary mock data
const MOCK_COMMENTS = [
  {
    id: '1',
    author: 'techHelper',
    content: 'You can use useEffect hook to handle this case.',
    timestamp: '1h ago',
    upvotes: 8,
    downvotes: 1,
  },
  {
    id: '2',
    author: 'codeGuru',
    content: 'Make sure to clean up any subscriptions in the useEffect return function.',
    timestamp: '45m ago',
    upvotes: 5,
    downvotes: 0,
  },
];

const Comment = ({ comment }) => {
  const netVotes = comment.upvotes - comment.downvotes;
  
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>@{comment.author}</Text>
        <Text style={styles.commentTime}>{comment.timestamp}</Text>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
      <View style={styles.commentFooter}>
        <View style={styles.voteContainer}>
          <TouchableOpacity style={styles.voteButton}>
            <Text style={styles.upvoteText}>🔺</Text>
          </TouchableOpacity>
          <Text style={styles.voteCount}>{netVotes}</Text>
          <TouchableOpacity style={styles.voteButton}>
            <Text style={styles.downvoteText}>🔻</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostDetailScreen = ({ navigation, route }) => {
  const [newComment, setNewComment] = useState('');
  const post = {
    title: 'How to implement useState in React Native?',
    author: 'johnDoe',
    content: "I'm new to React Native and trying to understand how to properly implement useState. Can someone explain the best practices and common pitfalls to avoid?",
    tags: ['React Native', 'Hooks'],
    upvotes: 25,
    downvotes: 2,
    timestamp: '2h ago',
  };

  const netVotes = post.upvotes - post.downvotes;

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
    }
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
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.authorText}>
            Posted by @{post.author} • {post.timestamp}
          </Text>
          
          <View style={styles.tagsContainer}>
            {post.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          <View style={styles.postStats}>
            <View style={styles.voteContainer}>
              <TouchableOpacity style={styles.voteButton}>
                <Text style={styles.upvoteIcon}>🔺</Text>
              </TouchableOpacity>
              <Text style={styles.voteCount}>{netVotes}</Text>
              <TouchableOpacity style={styles.voteButton}>
                <Text style={styles.downvoteIcon}>🔻</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>
            Comments ({MOCK_COMMENTS.length})
          </Text>
          {MOCK_COMMENTS.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#B0B3B8"
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <Button
          title="Post"
          onPress={handleSubmitComment}
          style={styles.postButton}
        />
      </View>
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
  content: {
    flex: 1,
  },
  postContainer: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.bold,
    fontSize: 22,
    color: COLORS.secondary,
    marginBottom: 10,
    lineHeight: 28,
  },
  authorText: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#65676B',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
  postContent: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.secondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
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
    padding: 8,
  },
  upvoteIcon: {
    fontSize: 20,
  },
  downvoteIcon: {
    fontSize: 20,
  },
  voteCount: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.secondary,
    marginHorizontal: 12,
    minWidth: 35,
    textAlign: 'center',
  },
  commentsSection: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  commentsHeader: {
    ...FONTS.bold,
    fontSize: 17,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  commentContainer: {
    marginBottom: 12,
    padding: 14,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    ...FONTS.medium,
    fontSize: 15,
    color: COLORS.secondary,
  },
  commentTime: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#65676B',
  },
  commentContent: {
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.secondary,
    lineHeight: 21,
    marginBottom: 10,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upvoteText: {
    fontSize: 14,
  },
  downvoteText: {
    fontSize: 14,
  },
  replyText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  commentInputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.secondary,
  },
  postButton: {
    height: 40,
    paddingHorizontal: 20,
  },
});

export default PostDetailScreen;