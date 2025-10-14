import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  loading = false,
  disabled = false,
  variant = 'primary' // 'primary' or 'secondary'
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[
          styles.buttonText,
          variant === 'secondary' && styles.buttonTextSecondary,
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...FONTS.medium,
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: COLORS.primary,
  },
});

export default Button;