import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const friendsData = [
  {
    id: '1',
    name: 'Alice Johnson',
    profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
    status: 'online',
  },
  {
    id: '2',
    name: 'Bob Smith',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    status: 'offline',
  },
  {
    id: '3',
    name: 'Catherine Lee',
    profilePic: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'online',
  },
  {
    id: '4',
    name: 'Daniel Kim',
    profilePic: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'offline',
  },
];

const FriendItem = ({ name, profilePic, status }) => (
  <View style={styles.friendItem}>
    <View style={styles.profileWrapper}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
      <View
        style={[
          styles.statusDot,
          { backgroundColor: status === 'online' ? '#4CAF50' : '#B0BEC5' },
        ]}
      />
    </View>
    <View>
      <Text style={styles.friendName}>{name}</Text>
      <Text style={styles.friendStatus}>{status === 'online' ? 'Online' : 'Offline'}</Text>
    </View>
  </View>
);

const FriendsList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      <FlatList
        data={friendsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            profilePic={item.profilePic}
            status={item.status}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f96b05ff',
    padding: 50,
    margin: 0,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  friendStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
});

export default FriendsListScreen;