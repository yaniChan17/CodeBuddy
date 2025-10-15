// src/screens/social/SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Header from '../../components/common/Header';
import { COLORS, FONTS } from '../../styles/globalStyles';

const SettingItem = ({ title, subtitle, onPress, rightElement }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement && <View style={styles.settingRight}>{rightElement}</View>}
  </TouchableOpacity>
);

const SettingsSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Account deletion requested'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Settings"
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView>
        {/* Account Settings */}
        <SettingsSection title="Account">
          <SettingItem
            title="Edit Profile"
            subtitle="Change your name, bio, and avatar"
            onPress={() => navigation.navigate('EditProfile')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <SettingItem
            title="Change Password"
            subtitle="Update your password"
            onPress={() => console.log('Change password')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <SettingItem
            title="Privacy"
            subtitle="Control who can see your profile"
            onPress={() => console.log('Privacy settings')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
        </SettingsSection>

        {/* Preferences */}
        <SettingsSection title="Preferences">
          <SettingItem
            title="Notifications"
            subtitle="Push notifications for messages and replies"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#ccc', true: COLORS.primary }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            title="Dark Mode"
            subtitle="Switch between light and dark theme"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#ccc', true: COLORS.primary }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            title="Show Online Status"
            subtitle="Let friends see when you're online"
            rightElement={
              <Switch
                value={showOnlineStatus}
                onValueChange={setShowOnlineStatus}
                trackColor={{ false: '#ccc', true: COLORS.primary }}
                thumbColor="#fff"
              />
            }
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingItem
            title="Help Center"
            onPress={() => console.log('Help center')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <SettingItem
            title="Report a Problem"
            onPress={() => console.log('Report problem')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <SettingItem
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => console.log('About')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection title="Danger Zone">
          <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
            <Text style={styles.dangerButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dangerButton, styles.deleteButton]}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.footerText}>CodeBuddy © 2024</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for developers</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#999',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 2,
  },
  settingSubtitle: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#666',
  },
  settingRight: {
    marginLeft: 16,
  },
  arrow: {
    ...FONTS.regular,
    fontSize: 24,
    color: '#ccc',
  },
  dangerButton: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  deleteButton: {
    borderBottomWidth: 0,
  },
  dangerButtonText: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.error,
  },
  footer: {
    alignItems: 'center',
    padding: 32,
  },
  footerText: {
    ...FONTS.medium,
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  footerSubtext: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#ccc',
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default SettingsScreen;