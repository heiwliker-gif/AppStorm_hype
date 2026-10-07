import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { BackButton } from '../../components/BackButton';
import { FormField } from '../../components/FormField';
import { InlineMessage } from '../../components/InlineMessage';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

export function LoginScreen({ navigation }: RootScreenProps<'Login'>) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const signIn = () => {
    if (!phone.trim() || !password.trim()) {
      setError('Введите номер телефона и пароль.');
      return;
    }
    setError('');
    navigation.replace('MainTabs', { city: 'Алматы' });
  };

  return (
    <AuthLayout>
      <BackButton onPress={() => navigation.canGoBack() && navigation.goBack()} />
      <Text style={styles.title}>Привет, с возвращением!</Text>
      <Text style={styles.subtitle}>Войдите в свой аккаунт.</Text>

      <FormField
        icon="☎"
        keyboardType="phone-pad"
        onChangeText={setPhone}
        placeholder="Номер телефона"
        value={phone}
      />
      <FormField
        icon="▣"
        onChangeText={setPassword}
        placeholder="Пароль"
        secureTextEntry={!passwordVisible}
        trailing={(
          <Pressable accessibilityRole="button" accessibilityLabel="Показать пароль" onPress={() => setPasswordVisible(!passwordVisible)} hitSlop={10}>
            <Text style={styles.eye}>{passwordVisible ? '◉' : '◌'}</Text>
          </Pressable>
        )}
        value={password}
      />
      <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotLink}>
        <Text style={styles.link}>Забыли пароль?</Text>
      </Pressable>
      <InlineMessage>{error}</InlineMessage>
      <PrimaryButton onPress={signIn} title="Войти" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>У вас нет аккаунта?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Зарегистрироваться</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 27, lineHeight: 34, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 16, marginTop: 3, marginBottom: 27 },
  eye: { color: colors.purple, fontSize: 19, paddingHorizontal: 2 },
  forgotLink: { alignSelf: 'flex-end', marginTop: 1, marginBottom: 19, paddingVertical: 3 },
  link: { color: colors.purple, fontSize: 14, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 23, gap: 5 },
  footerText: { color: colors.muted, fontSize: 14 },
});
