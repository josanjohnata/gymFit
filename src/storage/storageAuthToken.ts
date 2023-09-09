import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN__STORAGE } from '@storage/storageConfig';

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
}

export async function storageAuthTokeSave({ token, refresh_token }: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_TOKEN__STORAGE, JSON.stringify({ token, refresh_token }));
}

export async function storageAuthTokeGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN__STORAGE);

  const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};

  return { token, refresh_token };
}

export async function storageAuthTokeRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN__STORAGE);
}
