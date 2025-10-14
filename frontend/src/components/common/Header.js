import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

const Header = ({ 
  title, 
  leftIcon, 
  rightIcon, 
  onLeftPress, 
  onRightPress,
  showBack = false,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={onLeftPress}
        >
          {leftIcon}
        </TouchableOpacity>
        
        <Text style={styles.title}>{title}</Text>
        
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={onRightPress}
        >
          {rightIcon}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...FONTS.medium,
    fontSize: 18,
    color: COLORS.secondary,
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;