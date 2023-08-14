import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN__STORAGE } from '@storage/storageConfig';

export async function storageAuthTokeSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN__STORAGE, token);
}

export async function storageAuthTokeGet() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN__STORAGE);

  return token;
}
