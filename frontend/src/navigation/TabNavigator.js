import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function Placeholder({ title }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{title}</Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF6F00',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feed') iconName = 'home';
          else if (route.name === 'Create') iconName = 'add-circle';
          else if (route.name === 'Messages') iconName = 'chatbubble-ellipses';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Create" children={() => <Placeholder title="Create Post" />} />
      <Tab.Screen name="Messages" children={() => <Placeholder title="Messages" />} />
    </Tab.Navigator>
  );
}
