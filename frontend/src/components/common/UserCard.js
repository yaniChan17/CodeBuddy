import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const UserCard = ({ 
  username, 
  imageUrl, 
  onPress, 
  status = 'offline', // 'online', 'offline'
  isFriend = false,
  onAddFriend,
  showAddButton = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image 
          source={imageUrl ? { uri: imageUrl } : require('../../../assets/lable.jpg')}
          style={styles.avatar}
        />
        <View 
          style={[
            styles.statusDot, 
            { backgroundColor: status === 'online' ? '#4CAF50' : '#9E9E9E' }
          ]} 
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
      </View>
      {showAddButton && onAddFriend && (
        <TouchableOpacity 
          style={[styles.addButton, isFriend && styles.friendButton]}
          onPress={(e) => {
            e.stopPropagation();
            onAddFriend();
          }}
        >
          <Text style={[styles.addButtonText, isFriend && styles.friendButtonText]}>
            {isFriend ? '✓' : '+'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginVertical: 4,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    right: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  friendButton: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButtonText: {
    ...FONTS.bold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  friendButtonText: {
    color: COLORS.primary,
  },
});

export default UserCard;