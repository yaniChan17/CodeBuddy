import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#FF4500',    // Reddit-inspired orange
  secondary: '#1A1A1B',  // Dark gray for text
  background: '#FFFFFF', // White background
  lightGray: '#F6F7F8', // Light gray for inputs
  border: '#DAE0E6',    // Border color
  error: '#FF0000',     // Error messages
};

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.medium,
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    ...FONTS.regular,
    color: COLORS.error,
    fontSize: 14,
    marginBottom: 8,
  },
});