import { useState } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { KeyboardTypeOptions, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  trailing?: ReactNode;
  maxLength?: number;
};

export function FormField({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  trailing,
  maxLength,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focused]}>
      <Text style={styles.icon}>{icon}</Text>
      <TextInput
        accessibilityLabel={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onBlur={() => setFocused(false)}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
      />
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 17,
    marginBottom: 12,
  },
  focused: { borderColor: colors.purple, backgroundColor: colors.white },
  icon: { fontSize: 18, color: colors.muted, width: 25, marginRight: 9, textAlign: 'center' },
  input: { flex: 1, height: 56, color: colors.text, fontSize: 16, paddingVertical: 0 },
});
