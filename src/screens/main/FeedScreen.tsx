import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import type { MainTabScreenProps } from '../../types/navigation';

type Category = 'Все' | 'Новости' | 'События';
type Post = { category: Exclude<Category, 'Все'>; title: string; body: string; time: string; symbol: string; color: string; background: string };

const posts: Post[] = [
  { category: 'Новости', title: 'Новая велодорожка на Абая', body: 'Городские службы открыли обновлённый участок маршрута. Делимся картой и расписанием.', time: '12 минут назад', symbol: '↗', color: '#377C6B', background: '#E4F3ED' },
  { category: 'События', title: 'Встречаемся в парке в субботу', body: 'Соседи собираются на прогулку и небольшой пикник. Приходите всей семьёй.', time: 'Сегодня, 10:24', symbol: '✦', color: '#B2672D', background: '#FFF0E1' },
  { category: 'Новости', title: 'Плановые работы у дома', body: 'В четверг с 10:00 до 13:00 возможны перебои с водой. Подробности в чате района.', time: 'Вчера', symbol: '⌂', color: colors.purpleDark, background: colors.purpleSoft },
];

const categories: Category[] = ['Все', 'Новости', 'События'];

export function FeedScreen({ navigation, route }: MainTabScreenProps<'Feed'>) {
  const [category, setCategory] = useState<Category>('Все');
  const city = route.params?.city ?? 'Алматы';
  const visiblePosts = useMemo(() => category === 'Все' ? posts : posts.filter((post) => post.category === category), [category]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>Город рядом</Text>
            <View style={styles.locationRow}><Text style={styles.pin}>⌖</Text><Text style={styles.location}>{city}</Text><Text style={styles.chevron}>⌄</Text></View>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Уведомления" style={styles.notification}>
            <Text style={styles.notificationIcon}>♧</Text>
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>ВАШ ГОРОД</Text>
            <Text style={styles.heroTitle}>Будьте ближе к соседям</Text>
            <Text style={styles.heroSubtitle}>Новости, полезные чаты и события рядом.</Text>
            <Pressable onPress={() => navigation.navigate('Chats')} style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Открыть чаты</Text><Text style={styles.heroArrow}>→</Text>
            </Pressable>
          </View>
          <View style={styles.heroArt}><Text style={styles.heroArtText}>✦</Text><View style={styles.heroArtDot} /></View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Что происходит</Text>
          <Pressable onPress={() => setCategory('Все')}><Text style={styles.seeAll}>Все новости</Text></Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {categories.map((item) => (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.filter, category === item && styles.filterActive]}>
              <Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.postList}>
          {visiblePosts.map((post) => (
            <Pressable key={post.title} style={styles.postCard} onPress={() => navigation.navigate('Chats')}>
              <View style={[styles.postArtwork, { backgroundColor: post.background }]}><Text style={[styles.postArtworkSymbol, { color: post.color }]}>{post.symbol}</Text></View>
              <View style={styles.postCopy}>
                <View style={styles.postMeta}><Text style={[styles.postCategory, { color: post.color }]}>{post.category}</Text><Text style={styles.postTime}>{post.time}</Text></View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text numberOfLines={2} style={styles.postBody}>{post.body}</Text>
                <Text style={styles.postLink}>Обсудить в чате <Text style={styles.postLinkArrow}>→</Text></Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  brand: { color: colors.text, fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 4 },
  pin: { color: colors.purple, fontSize: 14 },
  location: { color: colors.mutedDark, fontSize: 13, fontWeight: '500' },
  chevron: { color: colors.muted, fontSize: 15, marginLeft: 1 },
  notification: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  notificationIcon: { color: colors.text, fontSize: 22 },
  notificationDot: { position: 'absolute', width: 7, height: 7, borderRadius: 4, right: 11, top: 10, backgroundColor: colors.purple },
  hero: { minHeight: 200, borderRadius: 24, backgroundColor: colors.purple, padding: 20, overflow: 'hidden', flexDirection: 'row', marginBottom: 27 },
  heroCopy: { width: '72%', zIndex: 1 },
  heroEyebrow: { color: '#EBD0F2', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 7 },
  heroTitle: { color: colors.white, fontSize: 23, lineHeight: 27, fontWeight: '800' },
  heroSubtitle: { color: '#F3E5F8', fontSize: 13, lineHeight: 18, marginTop: 6, maxWidth: 210 },
  heroButton: { minHeight: 36, alignSelf: 'flex-start', backgroundColor: colors.white, borderRadius: 12, marginTop: 14, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroButtonText: { color: colors.purpleDark, fontSize: 12, fontWeight: '700' },
  heroArrow: { color: colors.purpleDark, fontSize: 16, fontWeight: '700' },
  heroArt: { width: 82, height: 82, borderRadius: 28, position: 'absolute', right: -8, bottom: 17, backgroundColor: '#C63AE0', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '14deg' }] },
  heroArtText: { color: '#FCEBFF', fontSize: 50, fontWeight: '300' },
  heroArtDot: { width: 18, height: 18, borderRadius: 9, position: 'absolute', top: -7, left: -3, backgroundColor: '#F1BFFB' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  seeAll: { color: colors.purple, fontSize: 12, fontWeight: '700' },
  filters: { gap: 8, paddingBottom: 14 },
  filter: { paddingHorizontal: 15, minHeight: 34, borderRadius: 12, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  filterActive: { backgroundColor: colors.purpleSoft },
  filterText: { color: colors.mutedDark, fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: colors.purpleDark },
  postList: { gap: 12 },
  postCard: { borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 13, flexDirection: 'row', gap: 12, backgroundColor: colors.white },
  postArtwork: { width: 63, height: 72, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  postArtworkSymbol: { fontSize: 32, fontWeight: '500' },
  postCopy: { flex: 1 },
  postMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  postCategory: { fontSize: 10, fontWeight: '800' },
  postTime: { color: colors.muted, fontSize: 10 },
  postTitle: { color: colors.text, fontSize: 14, lineHeight: 18, fontWeight: '700' },
  postBody: { color: colors.mutedDark, fontSize: 11, lineHeight: 15, marginTop: 3 },
  postLink: { color: colors.purple, fontSize: 11, fontWeight: '700', marginTop: 8 },
  postLinkArrow: { fontSize: 14 },
});
