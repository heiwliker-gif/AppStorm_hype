import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { BackButton } from '../../components/BackButton';
import { InlineMessage } from '../../components/InlineMessage';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

export function VerifyCodeScreen({ navigation, route }: RootScreenProps<'VerifyCode'>) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const continueFlow = () => {
    if (code.length !== 4) {
      setError('Введите четырёхзначный код из SMS.');
      return;
    }
    setError('');
    if (route.params.purpose === 'reset') {
      navigation.navigate('ResetPassword');
    } else {
      navigation.navigate('ChooseCity');
    }
  };

  return (
    <AuthLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Подтвердить номер</Text>
      <Text style={styles.subtitle}>Мы только что отправили код на</Text>
      <Text style={styles.phone}>{route.params.phone}</Text>

      <View style={styles.codeRow}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={[styles.digitBox, index === code.length && styles.activeDigit]}>
            <Text style={styles.digit}>{code[index] ?? ''}</Text>
          </View>
        ))}
        <TextInput
          accessibilityLabel="Код подтверждения из SMS"
          autoFocus
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={(value) => { setCode(value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
          selectionColor="transparent"
          style={styles.hiddenInput}
          value={code}
        />
      </View>
      <InlineMessage>{error}</InlineMessage>
      <PrimaryButton onPress={continueFlow} title="Продолжить" style={styles.button} />
      <Pressable onPress={() => { setCode(''); setMessage('Новый код отправлен.'); }} style={styles.resend}>
        <Text style={styles.resendText}>Отправить код еще раз</Text>
      </Pressable>
      {!!message && <Text style={styles.success}>{message}</Text>}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 25, lineHeight: 32, fontWeight: '700', textAlign: 'center', marginTop: 69 },
  subtitle: { color: colors.muted, fontSize: 14, textAlign: 'center', marginTop: 6 },
  phone: { color: colors.text, fontSize: 15, fontWeight: '600', textAlign: 'center', marginTop: 4, marginBottom: 25 },
  codeRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, position: 'relative', marginBottom: 14 },
  digitBox: { width: 56, height: 54, borderRadius: 15, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'transparent' },
  activeDigit: { borderColor: colors.purple },
  digit: { color: colors.text, fontSize: 23, fontWeight: '700' },
  hiddenInput: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, color: 'transparent', backgroundColor: 'transparent', opacity: 0.01 },
  button: { marginTop: 7 },
  resend: { alignSelf: 'center', padding: 12, marginTop: 8 },
  resendText: { color: colors.muted, fontSize: 14, textDecorationLine: 'underline' },
  success: { color: colors.green, fontSize: 13, textAlign: 'center' },
});
