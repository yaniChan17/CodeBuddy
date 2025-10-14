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

  const handleLogin = () => {
    // Will implement Firebase login later
    console.log('Login pressed:', { email, password });
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
});

export default LoginScreen;