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
  StatusBar,
} from 'react-native';
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
    isNew: true,
  },
  {
    id: '2',
    type: 'comment',
    user: 'reactMaster',
    avatar: null,
    message: 'commented on your post',
    postTitle: 'Firebase authentication best practices',
    timestamp: '15m ago',
    isNew: true,
  },
  {
    id: '3',
    type: 'downvote',
    user: 'codeNinja',
    avatar: null,
    message: 'downvoted your comment',
    postTitle: 'Best practices for Firebase authentication?',
    timestamp: '1h ago',
    isNew: false,
  },
  {
    id: '4',
    type: 'upvote',
    user: 'pythonPro',
    avatar: null,
    message: 'upvoted your comment',
    postTitle: 'How to implement useState in React Native?',
    timestamp: '2h ago',
    isNew: false,
  },
  {
    id: '5',
    type: 'comment',
    user: 'jsDev',
    avatar: null,
    message: 'replied to your comment',
    postTitle: 'React Native navigation tips',
    timestamp: '5h ago',
    isNew: false,
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
        notification.isNew && styles.newNotification,
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

      {notification.isNew && <View style={styles.newDot} />}
    </TouchableOpacity>
  );
};

const NotificationsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('new'); // 'new' or 'earlier'

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const newNotifications = MOCK_NOTIFICATIONS.filter((n) => n.isNew);
  const earlierNotifications = MOCK_NOTIFICATIONS.filter((n) => !n.isNew);

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:', notification);
    navigation.navigate('PostDetail', { postId: notification.postTitle });
  };

  const renderNotifications = () => {
    if (filter === 'new') {
      return newNotifications.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>New</Text>
          {newNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={() => handleNotificationPress(notification)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>No New Notifications</Text>
          <Text style={styles.emptySubtext}>
            You're all caught up! Check back later.
          </Text>
        </View>
      );
    } else {
      return earlierNotifications.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Earlier</Text>
          {earlierNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={() => handleNotificationPress(notification)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No Earlier Notifications</Text>
          <Text style={styles.emptySubtext}>
            All your old notifications will appear here.
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Facebook-style Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'new' && styles.activeFilter]}
          onPress={() => setFilter('new')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'new' && styles.activeFilterText,
            ]}
          >
            New
          </Text>
          {newNotifications.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{newNotifications.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === 'earlier' && styles.activeFilter,
          ]}
          onPress={() => setFilter('earlier')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'earlier' && styles.activeFilterText,
            ]}
          >
            Earlier
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => renderNotifications()}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
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
  headerTitle: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.secondary,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  activeFilter: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.medium,
    fontSize: 15,
    color: '#65676B',
  },
  activeFilterText: {
    color: COLORS.primary,
  },
  countBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    ...FONTS.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 17,
    color: COLORS.secondary,
    padding: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.lightGray,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  newNotification: {
    backgroundColor: '#FFF5F0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginRight: 6,
    marginTop: 2,
  },
  notificationText: {
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.secondary,
    flex: 1,
    lineHeight: 20,
  },
  username: {
    ...FONTS.medium,
    color: COLORS.secondary,
  },
  postTitle: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#65676B',
    fontStyle: 'italic',
    marginBottom: 4,
    marginLeft: 22,
  },
  timestamp: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#B0B3B8',
    marginLeft: 22,
  },
  newDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
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
    color: '#65676B',
    textAlign: 'center',
  },
});

export default NotificationsScreen;