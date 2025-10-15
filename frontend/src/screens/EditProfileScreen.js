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
} from 'react-native';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { COLORS, FONTS } from '../styles/globalStyles';

const EditProfileScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: 'johnDoe',
    email: 'john@example.com',
    bio: 'Full-stack developer | React Native enthusiast | Always learning',
  });

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Will implement Firebase update later
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
    // Photo upload functionality will be implemented in the future
    console.log('Change photo pressed');
    Alert.alert(
      'Change Photo',
      'Photo upload functionality coming soon!'
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />

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
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={(text) => updateFormData('username', text)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChangeText={(text) => updateFormData('bio', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
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
    borderWidth: 1,
    borderColor: COLORS.primary,
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
  },
  bioInput: {
    height: 120,
    paddingTop: 12,
  },
  charCount: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  saveButton: {
    marginTop: 24,
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default EditProfileScreen;
