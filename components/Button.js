/**
 * Button Component
 * 
 * Purpose: Reusable button component with accessibility support
 * No API calls or navigation logic - pure UI component
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Button component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Button text
 * @param {Function} props.onPress - Press handler function
 * @param {string} props.accessibilityLabel - Accessibility label for screen readers
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.variant - Button style variant ('primary' | 'secondary')
 */
const Button = ({
  title,
  onPress,
  accessibilityLabel,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      activeOpacity={0.7}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 44, // Minimum touch target for accessibility
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
});

export default Button;
