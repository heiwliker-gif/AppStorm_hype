import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  VerifyCode: { purpose: 'reset' | 'register'; phone: string };
  ResetPassword: undefined;
  Register: undefined;
  ChooseCity: undefined;
  MainTabs: { city?: string } | undefined;
  ChatDetail: { title: string; initials: string; preview: string };
};

export type MainTabParamList = {
  Feed: { city?: string } | undefined;
  Chats: { city?: string } | undefined;
  Profile: { city?: string } | undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
