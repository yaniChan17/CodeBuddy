// src/screens/NotificationsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Header from '../components/common/Header';
import { COLORS, FONTS } from '../styles/globalStyles';

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'upvote',
    user: 'techGuru',
    avatar: null,
    message: 'upvoted your post',
    postTitle: 'How to implement useState in React Native?',
    timestamp: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: 'reactMaster',
    avatar: null,
    message: 'commented on your post',
    postTitle: 'Firebase authentication best practices',
    timestamp: '15m ago',
    read: false,
  },
  {
    id: '3',
    type: 'downvote',
    user: 'codeNinja',
    avatar: null,
    message: 'downvoted your comment',
    postTitle: 'Best practices for Firebase authentication?',
    timestamp: '1h ago',
    read: true,
  },
  {
    id: '4',
    type: 'upvote',
    user: 'pythonPro',
    avatar: null,
    message: 'upvoted your comment',
    postTitle: 'How to implement useState in React Native?',
    timestamp: '2h ago',
    read: true,
  },
  {
    id: '5',
    type: 'comment',
    user: 'jsDev',
    avatar: null,
    message: 'replied to your comment',
    postTitle: 'React Native navigation tips',
    timestamp: '5h ago',
    read: true,
  },
];

const NotificationItem = ({ notification, onPress }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'upvote':
        return '🔺';
      case 'downvote':
        return '🔻';
      case 'comment':
        return '💬';
      default:
        return '📢';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={onPress}
    >
      <Image
        source={notification.avatar || require('../../assets/lable.jpg')}
        style={styles.avatar}
      />

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.iconEmoji}>{getIcon(notification.type)}</Text>
          <Text style={styles.notificationText}>
            <Text style={styles.username}>@{notification.user}</Text>{' '}
            {notification.message}
          </Text>
        </View>
        <Text style={styles.postTitle} numberOfLines={1}>
          "{notification.postTitle}"
        </Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>

      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const NotificationsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredNotifications =
    filter === 'unread'
      ? MOCK_NOTIFICATIONS.filter((n) => !n.read)
      : MOCK_NOTIFICATIONS;

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:', notification);
    // Navigate to the related post
    navigation.navigate('PostDetail', { postId: notification.postTitle });
  };

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <Header title="Notifications" />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === 'unread' && styles.activeFilter,
          ]}
          onPress={() => setFilter('unread')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'unread' && styles.activeFilterText,
            ]}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() => handleNotificationPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>No Notifications</Text>
          <Text style={styles.emptySubtext}>
            You're all caught up! Check back later.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: COLORS.primary,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  unreadNotification: {
    backgroundColor: '#FFF5F0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  iconEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  notificationText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.secondary,
    flex: 1,
  },
  username: {
    ...FONTS.medium,
    color: COLORS.secondary,
  },
  postTitle: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  timestamp: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default NotificationsScreen;