import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const UserCard = ({ 
  username, 
  imageUrl, 
  onPress, 
  status = 'offline' // 'online', 'offline'
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
      <Text style={styles.username}>{username}</Text>
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
  username: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
  },
});

export default UserCard;