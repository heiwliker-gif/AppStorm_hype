import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { BackButton } from '../../components/BackButton';
import { FormField } from '../../components/FormField';
import { InlineMessage } from '../../components/InlineMessage';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

export function ForgotPasswordScreen({ navigation }: RootScreenProps<'ForgotPassword'>) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const continueRecovery = () => {
    if (phone.trim().length < 6) {
      setError('Укажите номер телефона для восстановления пароля.');
      return;
    }
    navigation.navigate('VerifyCode', { purpose: 'reset', phone });
  };

  return (
    <AuthLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Восстановление пароля</Text>
      <Text style={styles.subtitle}>Введите свой номер телефона, чтобы восстановить пароль</Text>
      <FormField icon="☎" keyboardType="phone-pad" onChangeText={setPhone} placeholder="Номер телефона" value={phone} />
      <InlineMessage>{error}</InlineMessage>
      <PrimaryButton onPress={continueRecovery} title="Продолжить" style={styles.button} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 25, lineHeight: 32, fontWeight: '700', textAlign: 'center', marginTop: 69 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 5, marginBottom: 26, paddingHorizontal: 8 },
  button: { marginTop: 11 },
});
