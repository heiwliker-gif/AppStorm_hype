import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../components/BackButton';
import { colors } from '../../theme/colors';
import type { RootScreenProps } from '../../types/navigation';

type Message = { id: number; text: string; mine: boolean; time: string };

export function ChatDetailScreen({ navigation, route }: RootScreenProps<'ChatDetail'>) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Доброе утро! Кто-нибудь знает, во сколько отключат воду?', mine: false, time: '10:32' },
    { id: 2, text: 'Обещали после 12:00. Написала в управляющую компанию.', mine: true, time: '10:35' },
    { id: 3, text: 'Спасибо за информацию!', mine: false, time: '10:42' },
  ]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { id: Date.now(), text, mine: true, time: 'Сейчас' }]);
    setDraft('');
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={[styles.avatar, { backgroundColor: colors.purpleSoft }]}><Text style={styles.avatarText}>{route.params.initials}</Text></View>
          <View style={styles.headerCopy}><Text numberOfLines={1} style={styles.headerTitle}>{route.params.title}</Text><Text style={styles.online}>участники рядом</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Дополнительно" style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
          <Text style={styles.dateLabel}>СЕГОДНЯ</Text>
          {messages.map((message) => (
            <View key={message.id} style={[styles.messageRow, message.mine ? styles.mineRow : styles.theirRow]}>
              <View style={[styles.bubble, message.mine ? styles.mineBubble : styles.theirBubble]}>
                <Text style={[styles.messageText, message.mine && styles.mineText]}>{message.text}</Text>
                <Text style={[styles.messageTime, message.mine && styles.mineTime]}>{message.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.composer}>
          <Pressable accessibilityRole="button" accessibilityLabel="Прикрепить файл" style={styles.attach}><Text style={styles.attachText}>＋</Text></Pressable>
          <TextInput
            onChangeText={setDraft}
            onSubmitEditing={sendMessage}
            placeholder="Сообщение"
            placeholderTextColor={colors.muted}
            returnKeyType="send"
            style={styles.input}
            value={draft}
          />
          <Pressable accessibilityRole="button" accessibilityLabel="Отправить сообщение" onPress={sendMessage} style={styles.send}><Text style={styles.sendText}>↑</Text></Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: { minHeight: 72, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1 },
  avatar: { width: 40, height: 40, borderRadius: 15, marginLeft: 3, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.purpleDark, fontSize: 15, fontWeight: '800' },
  headerCopy: { flex: 1, marginLeft: 10 },
  headerTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  online: { color: colors.green, fontSize: 11, marginTop: 3 },
  more: { width: 34, height: 40, alignItems: 'center', justifyContent: 'center' },
  moreText: { color: colors.mutedDark, fontSize: 16, letterSpacing: 1 },
  messages: { flexGrow: 1, justifyContent: 'flex-end', paddingHorizontal: 16, paddingVertical: 20, gap: 11 },
  dateLabel: { color: colors.muted, fontSize: 10, fontWeight: '700', letterSpacing: 1, textAlign: 'center', marginBottom: 7 },
  messageRow: { flexDirection: 'row' },
  mineRow: { justifyContent: 'flex-end' },
  theirRow: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '82%', borderRadius: 17, paddingHorizontal: 13, paddingTop: 10, paddingBottom: 7 },
  mineBubble: { backgroundColor: colors.purple, borderBottomRightRadius: 5 },
  theirBubble: { backgroundColor: colors.surface, borderBottomLeftRadius: 5 },
  messageText: { color: colors.text, fontSize: 14, lineHeight: 20 },
  mineText: { color: colors.white },
  messageTime: { color: colors.muted, fontSize: 9, textAlign: 'right', marginTop: 4 },
  mineTime: { color: '#EBD4F2' },
  composer: { minHeight: 62, paddingHorizontal: 14, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 8, borderTopColor: colors.line, borderTopWidth: 1 },
  attach: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  attachText: { color: colors.purple, fontSize: 23, lineHeight: 26 },
  input: { minHeight: 43, flex: 1, borderRadius: 14, backgroundColor: colors.surface, color: colors.text, paddingHorizontal: 14, fontSize: 14, paddingVertical: 0 },
  send: { width: 39, height: 39, borderRadius: 14, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: colors.white, fontSize: 23, fontWeight: '700', lineHeight: 25 },
});
