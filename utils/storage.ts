import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export function removeItem(name: string) {
  storage.delete(name);
}

export function getItem(name: string) {
  const value = storage.getString(name);
  return value ? JSON.parse(value) : null;
}

export function setItem(name: string, value: any) {
  storage.set(name, JSON.stringify(value));
}
