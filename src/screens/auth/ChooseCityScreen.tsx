import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { BackButton } from '../../components/BackButton';
import { FormField } from '../../components/FormField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

const cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз'];

export function ChooseCityScreen({ navigation }: RootScreenProps<'ChooseCity'>) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('Алматы');
  const filteredCities = useMemo(
    () => cities.filter((city) => city.toLowerCase().includes(search.trim().toLowerCase())),
    [search],
  );

  return (
    <AuthLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Выберите город</Text>
      <Text style={styles.subtitle}>Здесь будут показываться новости, чаты и события вашего города.</Text>
      <FormField icon="⌕" onChangeText={setSearch} placeholder="Найти город" value={search} />
      <View style={styles.list}>
        {filteredCities.map((city) => (
          <Pressable key={city} onPress={() => setSelected(city)} style={styles.cityRow}>
            <View style={[styles.radio, selected === city && styles.radioSelected]}>
              {selected === city && <View style={styles.radioDot} />}
            </View>
            <Text style={[styles.cityName, selected === city && styles.cityNameSelected]}>{city}</Text>
            <Text style={styles.cityMark}>›</Text>
          </Pressable>
        ))}
        {filteredCities.length === 0 && <Text style={styles.empty}>Город не найден. Попробуйте другой запрос.</Text>}
      </View>
      <PrimaryButton
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { city: selected } }] })}
        title="Продолжить"
        style={styles.button}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 26, lineHeight: 33, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 5, marginBottom: 23 },
  list: { marginTop: 5 },
  cityRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  radioSelected: { borderColor: colors.purple },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.purple },
  cityName: { flex: 1, color: colors.text, fontSize: 15 },
  cityNameSelected: { fontWeight: '700' },
  cityMark: { color: colors.muted, fontSize: 24, marginRight: 5 },
  empty: { color: colors.muted, fontSize: 14, paddingVertical: 20 },
  button: { marginTop: 24 },
});
