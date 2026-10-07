import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { BackButton } from '../../components/BackButton';
import { FormField } from '../../components/FormField';
import { InlineMessage } from '../../components/InlineMessage';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

export function ResetPasswordScreen({ navigation }: RootScreenProps<'ResetPassword'>) {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const updatePassword = () => {
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов.');
      return;
    }
    if (password !== repeat) {
      setError('Пароли не совпадают. Проверьте введённые данные.');
      return;
    }
    navigation.popToTop();
  };

  return (
    <AuthLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Сброс пароля</Text>
      <Text style={styles.subtitle}>Не менее 8 символов, с прописными и строчными буквами</Text>
      <FormField
        icon="▣"
        onChangeText={setPassword}
        placeholder="Пароль"
        secureTextEntry={!visible}
        trailing={<PasswordToggle visible={visible} onPress={() => setVisible(!visible)} />}
        value={password}
      />
      <FormField
        icon="▣"
        onChangeText={setRepeat}
        placeholder="Повторить пароль"
        secureTextEntry={!visible}
        trailing={<PasswordToggle visible={visible} onPress={() => setVisible(!visible)} />}
        value={repeat}
      />
      <InlineMessage>{error}</InlineMessage>
      <PrimaryButton onPress={updatePassword} title="Продолжить" style={styles.button} />
    </AuthLayout>
  );
}

function PasswordToggle({ visible, onPress }: { visible: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Показать пароль" hitSlop={10} onPress={onPress}>
      <Text style={styles.eye}>{visible ? '◉' : '◌'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 25, lineHeight: 32, fontWeight: '700', textAlign: 'center', marginTop: 69 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 5, marginBottom: 25 },
  eye: { color: colors.purple, fontSize: 19, paddingHorizontal: 2 },
  button: { marginTop: 7 },
});
