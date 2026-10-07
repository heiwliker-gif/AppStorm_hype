import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { colors } from '../theme/colors';
import { ChatDetailScreen } from '../screens/main/ChatDetailScreen';
import { ChatsScreen } from '../screens/main/ChatsScreen';
import { FeedScreen } from '../screens/main/FeedScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { ChooseCityScreen } from '../screens/auth/ChooseCityScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import { VerifyCodeScreen } from '../screens/auth/VerifyCodeScreen';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs({ route }: NativeStackScreenProps<RootStackParamList, 'MainTabs'>) {
  const city = route.params?.city ?? 'Алматы';

  return (
    <Tabs.Navigator
      initialRouteName="Feed"
      screenOptions={({ route: tabRoute }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
        tabBarStyle: {
          height: 66,
          paddingTop: 7,
          paddingBottom: 7,
          borderTopColor: colors.line,
          backgroundColor: colors.white,
          elevation: 10,
        },
        tabBarIcon: ({ color, size }) => {
          const symbols: Record<keyof MainTabParamList, string> = {
            Feed: '⌂',
            Chats: '▤',
            Profile: '◉',
          };
          return <TextIcon color={color} size={size} symbol={symbols[tabRoute.name]} />;
        },
      })}
    >
      <Tabs.Screen name="Feed" component={FeedScreen} initialParams={{ city }} options={{ title: 'Лента' }} />
      <Tabs.Screen name="Chats" component={ChatsScreen} initialParams={{ city }} options={{ title: 'Чаты' }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} initialParams={{ city }} options={{ title: 'Профиль' }} />
    </Tabs.Navigator>
  );
}

function TextIcon({ color, size, symbol }: { color: string; size: number; symbol: string }) {
  return <Text style={{ color, fontSize: size + 5, fontWeight: '600', lineHeight: size + 9 }}>{symbol}</Text>;
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ChooseCity" component={ChooseCityScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
}
