import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onPress} style={styles.button}>
      <Text style={styles.arrow}>←</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start', marginBottom: 24 },
  arrow: { color: colors.text, fontSize: 32, fontWeight: '300', lineHeight: 36 },
});
