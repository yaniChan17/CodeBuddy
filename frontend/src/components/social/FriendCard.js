// src/components/social/FriendCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const FriendCard = ({ friend, onPress, onMessage }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={friend.avatar || require('../../../assets/lable.jpg')}
            style={styles.avatar}
          />
          {friend.online && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.info}>
          <Text style={styles.username}>@{friend.username}</Text>
          <Text style={styles.status}>
            {friend.online ? 'Online' : `Last seen ${friend.lastSeen}`}
          </Text>
          {friend.mutualFriends && (
            <Text style={styles.mutualFriends}>
              {friend.mutualFriends} mutual friends
            </Text>
          )}
        </View>
      </View>

      {onMessage && (
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => onMessage(friend)}
        >
          <Text style={styles.messageButtonText}>💬</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  info: {
    flex: 1,
  },
  username: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 2,
  },
  status: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  mutualFriends: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#999',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 20,
  },
});

export default FriendCard;