// src/screens/posts/PostDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Temporary mock data for a single post
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
  // In a real app, we'd get this from route.params.post
  const post = {
    title: 'How to implement useState in React Native?',
    author: 'johnDoe',
    content: 'I\'m new to React Native and trying to understand how to properly implement useState. Can someone explain the best practices and common pitfalls to avoid?',
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
      <Header
        title="Post Detail"
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.authorText}>Posted by @{post.author} • {post.timestamp}</Text>
          
          <View style={styles.tagsContainer}>
            {post.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          {/* Photo Placeholder UI */}
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>📷</Text>
            <Text style={styles.photoText}>Photo attachments coming soon</Text>
          </View>
          
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
          <Text style={styles.commentsHeader}>Comments ({MOCK_COMMENTS.length})</Text>
          {MOCK_COMMENTS.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
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
  content: {
    flex: 1,
  },
  postContainer: {
    padding: 16,
  },
  title: {
    ...FONTS.bold,
    fontSize: 20,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  authorText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
    borderTopColor: COLORS.border,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    ...FONTS.medium,
    fontSize: 18,
    color: COLORS.secondary,
    marginHorizontal: 12,
    minWidth: 40,
    textAlign: 'center',
  },
  commentsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  commentsHeader: {
    ...FONTS.medium,
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
  },
  commentTime: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
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
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  postButton: {
    height: 40,
    paddingHorizontal: 16,
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
  photoPlaceholder: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  photoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#999',
  },
});

export default PostDetailScreen;