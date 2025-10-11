import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const postsData = [
  {
    id: '1',
    subreddit: 'r/serbia',
    user: 'u/KaiserLoli',
    title: 'Squidward',
    image:
      'https://static.wikia.nocookie.net/spongebob/images/4/4c/Squidward_Tentacles.svg',
    upvotes: 23,
    comments: 23,
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Trending');

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.headerRow}>
        <Image
          source={{ uri: 'https://www.redditinc.com/assets/images/site/reddit-logo.png' }}
          style={styles.profileImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.subreddit}>{item.subreddit}</Text>
          <Text style={styles.username}>Posted by {item.user}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={18} color="#888" />
      </View>

      {/* Post Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Post Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-up-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.upvotes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {['Popular', 'Trending', 'Latest'].map((tab) => (
        <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Tabs */}
      {renderTabs()}

      {/* Posts */}
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.feedList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6F00',
    fontWeight: '700',
  },
  feedList: {
    padding: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  subreddit: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  username: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
});


/*import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to CodeBuddy 🧑‍💻</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});*/