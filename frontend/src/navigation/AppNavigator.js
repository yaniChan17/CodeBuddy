// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import TabNavigator from './TabNavigator';
import PostDetailScreen from '../screens/posts/PostDetailScreen';
import CreatePostScreen from '../screens/posts/CreatePostScreen';
import ChatScreen from '../screens/social/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/social/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // For testing, you can change this to true/false
  // In real app, this would come from AuthContext
  const isLoggedIn = false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isLoggedIn ? 'Main' : 'Login'}
    >
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App (Bottom Tabs) */}
      <Stack.Screen name="Main" component={TabNavigator} />

      {/* Post Screens */}
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />

      {/* Social Screens */}
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ProfileTab" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;