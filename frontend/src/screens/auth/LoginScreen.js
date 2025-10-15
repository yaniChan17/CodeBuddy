import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Button from '../../components/common/Button';
import { COLORS, FONTS } from '../../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sample credentials for testing
  // Email: demo@codebuddy.com
  // Password: demo123

  const handleLogin = () => {
    // Temporary login check with sample credentials
    if (email === 'demo@codebuddy.com' && password === 'demo123') {
      console.log('Login successful');
      navigation.navigate('Main');
    } else {
      console.log('Invalid credentials');
      alert('Invalid credentials. Use:\nEmail: demo@codebuddy.com\nPassword: demo123');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue using CodeBuddy</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.sampleCredentials}>
            <Text style={styles.sampleTitle}>Sample Login Credentials:</Text>
            <Text style={styles.sampleText}>Email: demo@codebuddy.com</Text>
            <Text style={styles.sampleText}>Password: demo123</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button 
            title="Login" 
            onPress={handleLogin} 
            style={styles.loginButton}
          />

          <TouchableOpacity 
            onPress={() => navigation.navigate('Register')}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.registerHighlight}>Register</Text>
            </Text>
          </TouchableOpacity>
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
  loginButton: {
    marginTop: 16,
  },
  registerLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  registerText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
  },
  registerHighlight: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  sampleCredentials: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sampleTitle: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  sampleText: {
    ...FONTS.regular,
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
});

export default LoginScreen;