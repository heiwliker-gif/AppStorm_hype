import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import type { MainTabScreenProps } from '../../types/navigation';

const chatItems = [
  { title: 'Соседи · Самал-2', initials: 'С', preview: 'Айгерим: Спасибо за информацию!', time: '10:42', unread: 2, tone: '#F1E4FA' },
  { title: 'Объявления Алматы', initials: 'А', preview: 'Сегодня перекроют улицу Абая…', time: '09:18', unread: 1, tone: '#E3F3EC' },
  { title: 'События рядом', initials: 'Р', preview: 'В субботу встречаемся у фонтана', time: 'Вчера', unread: 0, tone: '#FFF0E0' },
  { title: 'Данияр', initials: 'Д', preview: 'Отправил фото двора', time: 'Вт', unread: 0, tone: '#E7ECFA' },
  { title: 'Помощь AppStorm', initials: '✦', preview: 'Здравствуйте! Чем можем помочь?', time: 'Пн', unread: 0, tone: '#F7E9FB' },
];

export function ChatsScreen({ navigation, route }: MainTabScreenProps<'Chats'>) {
  const [query, setQuery] = useState('');
  const city = route.params?.city ?? 'Алматы';
  const visibleChats = useMemo(() => chatItems.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase())), [query]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.headingRow}>
          <View><Text style={styles.eyebrow}>{city.toUpperCase()}</Text><Text style={styles.title}>Чаты</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Создать чат" style={styles.addButton}><Text style={styles.addSymbol}>＋</Text></Pressable>
        </View>
        <View style={styles.search}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput onChangeText={setQuery} placeholder="Поиск по чатам" placeholderTextColor={colors.muted} style={styles.searchInput} value={query} />
        </View>
        <View style={styles.filters}><Text style={styles.filterActive}>Все</Text><Text style={styles.filter}>Непрочитанные</Text><Text style={styles.filter}>Личные</Text></View>
        <View style={styles.chatList}>
          {visibleChats.map((chat) => (
            <Pressable
              key={chat.title}
              onPress={() => navigation.navigate('ChatDetail', { title: chat.title, initials: chat.initials, preview: chat.preview })}
              style={styles.chatRow}
            >
              <View style={[styles.avatar, { backgroundColor: chat.tone }]}><Text style={styles.avatarText}>{chat.initials}</Text></View>
              <View style={styles.chatCopy}>
                <View style={styles.chatTopLine}><Text numberOfLines={1} style={styles.chatTitle}>{chat.title}</Text><Text style={styles.chatTime}>{chat.time}</Text></View>
                <View style={styles.chatBottomLine}><Text numberOfLines={1} style={styles.preview}>{chat.preview}</Text>{chat.unread > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{chat.unread}</Text></View>}</View>
              </View>
            </Pressable>
          ))}
          {visibleChats.length === 0 && <Text style={styles.empty}>Чатов по запросу не найдено.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 26 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17 },
  eyebrow: { color: colors.purple, fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 29, fontWeight: '800', marginTop: 2 },
  addButton: { width: 43, height: 43, backgroundColor: colors.purpleSoft, alignItems: 'center', justifyContent: 'center', borderRadius: 15 },
  addSymbol: { color: colors.purple, fontSize: 26, lineHeight: 30 },
  search: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surface, borderRadius: 15, paddingHorizontal: 14 },
  searchIcon: { color: colors.muted, fontSize: 22 },
  searchInput: { flex: 1, color: colors.text, fontSize: 14, paddingVertical: 0 },
  filters: { flexDirection: 'row', gap: 18, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.line },
  filter: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  filterActive: { color: colors.purple, fontSize: 13, fontWeight: '700' },
  chatList: { paddingTop: 3 },
  chatRow: { minHeight: 76, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.text, fontSize: 17, fontWeight: '800' },
  chatCopy: { flex: 1 },
  chatTopLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  chatTitle: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '700' },
  chatTime: { color: colors.muted, fontSize: 10 },
  chatBottomLine: { flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 8 },
  preview: { flex: 1, color: colors.mutedDark, fontSize: 12 },
  badge: { minWidth: 20, height: 20, paddingHorizontal: 5, borderRadius: 10, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  empty: { color: colors.muted, fontSize: 14, textAlign: 'center', paddingVertical: 28 },
});
