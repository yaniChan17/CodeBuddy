// src/components/posts/CommentSection.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const CommentItem = ({ comment }) => (
  <View style={styles.commentContainer}>
    <View style={styles.commentHeader}>
      <Text style={styles.commentAuthor}>@{comment.author}</Text>
      <Text style={styles.commentTime}>{comment.timestamp}</Text>
    </View>
    
    <Text style={styles.commentContent}>{comment.content}</Text>
    
    <View style={styles.commentFooter}>
      <TouchableOpacity style={styles.upvoteButton}>
        <Text style={styles.upvoteText}>🔺 {comment.upvotes}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.replyText}>Reply</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CommentSection = ({ comments }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Comments ({comments.length})
      </Text>
      
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No comments yet</Text>
          <Text style={styles.emptySubtext}>Be the first to comment!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  header: {
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
    lineHeight: 20,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteButton: {
    marginRight: 16,
  },
  upvoteText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#666',
  },
  replyText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#999',
  },
});

export default CommentSection;