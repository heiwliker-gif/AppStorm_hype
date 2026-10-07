import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export function InlineMessage({ children }: { children: string }) {
  if (!children) return null;
  return <Text style={styles.message}>{children}</Text>;
}

const styles = StyleSheet.create({
  message: { color: colors.danger, fontSize: 13, marginTop: 2, marginBottom: 12 },
});
