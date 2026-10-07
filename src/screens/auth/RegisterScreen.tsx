import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { BackButton } from '../../components/BackButton';
import { FormField } from '../../components/FormField';
import { InlineMessage } from '../../components/InlineMessage';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

export function RegisterScreen({ navigation }: RootScreenProps<'Register'>) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const register = () => {
    if (!name.trim() || phone.trim().length < 6 || password.length < 6) {
      setError('Заполните имя, номер телефона и пароль от 6 символов.');
      return;
    }
    if (!accepted) {
      setError('Подтвердите согласие с условиями использования.');
      return;
    }
    navigation.navigate('VerifyCode', { purpose: 'register', phone });
  };

  return (
    <AuthLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.subtitle}>Создайте учётную запись, чтобы продолжить.</Text>
      <FormField autoCapitalize="words" icon="♙" onChangeText={setName} placeholder="Ваше имя" value={name} />
      <FormField icon="☎" keyboardType="phone-pad" onChangeText={setPhone} placeholder="Номер телефона" value={phone} />
      <FormField icon="▣" onChangeText={setPassword} placeholder="Пароль" secureTextEntry value={password} />

      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: accepted }} onPress={() => setAccepted(!accepted)} style={styles.termsRow}>
        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
          {accepted && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.termsText}>Соглашаюсь с условиями использования и политикой конфиденциальности</Text>
      </Pressable>
      <InlineMessage>{error}</InlineMessage>
      <PrimaryButton onPress={register} title="Зарегистрироваться" style={styles.button} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Уже есть аккаунт?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Войти</Text></Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 26, lineHeight: 33, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 4, marginBottom: 24 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 3, marginBottom: 14, gap: 10 },
  checkbox: { width: 19, height: 19, borderRadius: 5, borderWidth: 1, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxChecked: { backgroundColor: colors.purple, borderColor: colors.purple },
  checkmark: { color: colors.white, fontSize: 13, lineHeight: 16, fontWeight: '700' },
  termsText: { flex: 1, color: colors.mutedDark, fontSize: 12, lineHeight: 18 },
  button: { marginTop: 3 },
  footer: { alignItems: 'center', marginTop: 20, gap: 4 },
  footerText: { color: colors.muted, fontSize: 14 },
  link: { color: colors.purple, fontWeight: '600', fontSize: 14 },
});
