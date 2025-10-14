import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Button from '../../components/common/Button';
import { COLORS, FONTS } from '../../styles/globalStyles';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = () => {
    // Will implement Firebase registration later
    console.log('Register pressed:', formData);
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CodeBuddy and start coding together!</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={formData.username}
            onChangeText={(text) => updateFormData('username', text)}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => updateFormData('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => updateFormData('password', text)}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateFormData('confirmPassword', text)}
            secureTextEntry
          />

          <Button 
            title="Create Account" 
            onPress={handleRegister} 
            style={styles.registerButton}
          />

          <Button 
            title="Already have an account? Login" 
            onPress={() => navigation.navigate('Login')}
            variant="secondary"
            style={styles.loginButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    ...FONTS.bold,
    fontSize: 28,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: 16,
    color: '#666',
  },
  form: {
    marginTop: 32,
  },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  registerButton: {
    marginTop: 16,
  },
  loginButton: {
    marginTop: 12,
  },
});

export default RegisterScreen;