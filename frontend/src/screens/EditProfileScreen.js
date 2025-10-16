// src/screens/EditProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import Button from '../components/common/Button';
import { COLORS, FONTS } from '../styles/globalStyles';

const EditProfileScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    displayName: 'John Doe',
    username: 'johnDoe',
    bio: 'Full-stack developer | React Native enthusiast | Always learning',
  });

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Profile updated:', formData);
    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleChangePhoto = () => {
    console.log('Change photo pressed');
    Alert.alert(
      'Change Photo',
      'Photo upload functionality coming soon!'
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <Image
              source={require('../../assets/lable.jpg')}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your display name"
              placeholderTextColor="#B0B3B8"
              value={formData.displayName}
              onChangeText={(text) => updateFormData('displayName', text)}
            />
            <Text style={styles.helperText}>
              This is how your name will appear to others
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#B0B3B8"
              value={formData.username}
              onChangeText={(text) => updateFormData('username', text)}
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Your unique username (@{formData.username})
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Tell us about yourself..."
              placeholderTextColor="#B0B3B8"
              value={formData.bio}
              onChangeText={(text) => updateFormData('bio', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={200}
            />
            <Text style={styles.charCount}>{formData.bio.length}/200</Text>
          </View>

          <Button 
            title="Save Changes" 
            onPress={handleSave} 
            style={styles.saveButton}
          />
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
  content: {
    flex: 1,
  },
  form: {
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  changePhotoText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.secondary,
  },
  bioInput: {
    height: 120,
    paddingTop: 12,
  },
  helperText: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#65676B',
    marginTop: 4,
  },
  charCount: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#65676B',
    textAlign: 'right',
    marginTop: 4,
  },
  saveButton: {
    marginTop: 24,
  },
});

export default EditProfileScreen;