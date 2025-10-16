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
  StatusBar,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
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
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

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
      'This action cannot be undone. Are you sure you want to permanently delete your account?',
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView>
        {/* Account Settings */}
        <SettingsSection title="ACCOUNT SETTINGS">
          <SettingItem
            title="Edit Profile"
            subtitle="Change your display name, username, and bio"
            onPress={() => navigation.navigate('EditProfile')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <SettingItem
            title="Account"
            subtitle="Manage email and password"
            onPress={() => navigation.navigate('Account')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <SettingItem
            title="Privacy"
            subtitle="Control who can see your profile"
            onPress={() => console.log('Privacy settings')}
            rightElement={<Text style={styles.arrow}>›</Text>}
          />
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </SettingsSection>

        {/* Preferences */}
        <SettingsSection title="PREFERENCES">
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
            subtitle={isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
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
        <SettingsSection title="SUPPORT">
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

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    ...FONTS.bold,
    fontSize: 28,
    color: COLORS.primary,
  },
  headerTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.secondary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    ...FONTS.medium,
    fontSize: 13,
    color: '#65676B',
    marginLeft: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    color: '#65676B',
  },
  settingRight: {
    marginLeft: 16,
  },
  arrow: {
    ...FONTS.regular,
    fontSize: 24,
    color: '#ccc',
  },
  deleteButton: {
    padding: 16,
    borderBottomWidth: 0,
  },
  deleteButtonText: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.error,
  },
  logoutSection: {
    marginTop: 24,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  logoutButton: {
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
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
});

export default SettingsScreen;