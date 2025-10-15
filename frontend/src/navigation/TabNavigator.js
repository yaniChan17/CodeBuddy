// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import HomeScreen from '../screens/posts/HomeScreen';
import ChatListScreen from '../screens/social/ChatListScreen';
import FriendsListScreen from '../screens/social/FriendsListScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { COLORS, FONTS } from '../styles/globalStyles';

const Tab = createBottomTabNavigator();

const TabIcon = ({ emoji, focused }) => (
  <Text style={[styles.icon, focused && styles.iconFocused]}>{emoji}</Text>
);

// Custom Create Post Button
const CreateButton = ({ onPress }) => (
  <TouchableOpacity style={styles.createButton} onPress={onPress}>
    <Text style={styles.createButtonText}>✕</Text>
  </TouchableOpacity>
);

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="FriendsTab"
        component={FriendsListScreen}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👥" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreatePost');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.createButtonContainer}>
              <View style={styles.createButton}>
                <Text style={styles.createButtonText}>+</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💬" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifs',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔔" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
  tabBarLabel: {
    ...FONTS.medium,
    fontSize: 11,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  icon: {
    fontSize: 24,
  },
  iconFocused: {
    transform: [{ scale: 1.2 }],
  },
  createButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  createButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  createButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 32,
  },
});

export default TabNavigator;