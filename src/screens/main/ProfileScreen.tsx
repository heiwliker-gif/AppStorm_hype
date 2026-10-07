import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import type { MainTabScreenProps, RootStackNavigation } from '../../types/navigation';

const menuItems = [
  { icon: '⌖', title: 'Мой город', detail: 'Алматы' },
  { icon: '♧', title: 'Мои объявления', detail: 'Управляйте публикациями' },
  { icon: '♡', title: 'Избранное', detail: 'Сохранённые публикации' },
  { icon: '⚙', title: 'Настройки', detail: 'Язык, уведомления и приватность' },
  { icon: '?', title: 'Помощь', detail: 'Ответы на частые вопросы' },
];

export function ProfileScreen({ navigation, route }: MainTabScreenProps<'Profile'>) {
  const [notifications, setNotifications] = useState(true);
  const city = route.params?.city ?? 'Алматы';

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Профиль</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>А</Text></View>
          <View style={styles.profileCopy}><Text style={styles.name}>Пользователь AppStorm</Text><Text style={styles.phone}>+7 (700) 555-77-55</Text><Text style={styles.city}>{city}</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Редактировать профиль" style={styles.edit}><Text style={styles.editText}>✎</Text></Pressable>
        </View>

        <View style={styles.settingsCard}>
          <View style={styles.notificationRow}>
            <View style={[styles.menuIcon, { backgroundColor: colors.orangeSoft }]}><Text style={[styles.menuIconText, { color: colors.orange }]}>♧</Text></View>
            <View style={styles.menuCopy}><Text style={styles.menuTitle}>Уведомления</Text><Text style={styles.menuDetail}>Новости и сообщения</Text></View>
            <Switch
              trackColor={{ false: colors.line, true: '#E8B5F2' }}
              thumbColor={notifications ? colors.purple : '#FFFFFF'}
              onValueChange={setNotifications}
              value={notifications}
            />
          </View>
          {menuItems.map((item, index) => (
            <Pressable key={item.title} onPress={() => {}} style={[styles.menuRow, index === menuItems.length - 1 && styles.lastRow]}>
              <View style={styles.menuIcon}><Text style={styles.menuIconText}>{item.icon}</Text></View>
              <View style={styles.menuCopy}><Text style={styles.menuTitle}>{item.title}</Text><Text style={styles.menuDetail}>{item.title === 'Мой город' ? city : item.detail}</Text></View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={() => navigation.getParent<RootStackNavigation>()?.reset({ index: 0, routes: [{ name: 'Login' }] })} style={styles.signOut}>
          <Text style={styles.signOutText}>Выйти из аккаунта</Text>
        </Pressable>
        <Text style={styles.version}>APPSTORM · ВЕРСИЯ 1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 30 },
  title: { color: colors.text, fontSize: 29, fontWeight: '800', marginBottom: 19 },
  profileCard: { minHeight: 117, borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.purpleSoft, marginBottom: 19 },
  avatar: { width: 58, height: 58, borderRadius: 21, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.purple, fontSize: 24, fontWeight: '800' },
  profileCopy: { flex: 1, marginLeft: 13 },
  name: { color: colors.text, fontSize: 14, fontWeight: '800' },
  phone: { color: colors.mutedDark, fontSize: 12, marginTop: 4 },
  city: { color: colors.purpleDark, fontSize: 11, fontWeight: '700', marginTop: 5 },
  edit: { width: 32, height: 32, borderRadius: 11, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  editText: { color: colors.purple, fontSize: 17 },
  settingsCard: { borderRadius: 20, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 13, backgroundColor: colors.white },
  notificationRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line },
  menuRow: { minHeight: 69, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line },
  lastRow: { borderBottomWidth: 0 },
  menuIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  menuIconText: { color: colors.purple, fontSize: 19 },
  menuCopy: { flex: 1, marginLeft: 11 },
  menuTitle: { color: colors.text, fontSize: 13, fontWeight: '700' },
  menuDetail: { color: colors.muted, fontSize: 11, marginTop: 3 },
  chevron: { color: colors.muted, fontSize: 23, marginHorizontal: 5 },
  signOut: { minHeight: 52, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginTop: 19 },
  signOutText: { color: colors.danger, fontSize: 14, fontWeight: '700' },
  version: { color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.1, textAlign: 'center', marginTop: 20 },
});
