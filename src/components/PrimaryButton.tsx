import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({ title, onPress, disabled = false, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 17,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  disabled: { opacity: 0.48 },
  pressed: { backgroundColor: colors.purpleDark, transform: [{ scale: 0.99 }] },
  title: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
