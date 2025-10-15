// src/components/posts/PostCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const PostCard = ({ post, onPress }) => {
  const netVotes = (post.upvotes || 0) - (post.downvotes || 0);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>
          Posted by @{post.author} • {post.timestamp}
        </Text>
      </View>

      {post.content && (
        <Text style={styles.preview} numberOfLines={2}>
          {post.content}
        </Text>
      )}

      <View style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <TouchableOpacity style={styles.voteButton}>
            <Text style={styles.upvoteText}>🔺</Text>
          </TouchableOpacity>
          <Text style={styles.voteCount}>{netVotes}</Text>
          <TouchableOpacity style={styles.voteButton}>
            <Text style={styles.downvoteText}>🔻</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.statText}>💬 {post.comments}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  author: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#666',
  },
  preview: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
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
  footer: {
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
  statText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#666',
  },
});

export default PostCard;
