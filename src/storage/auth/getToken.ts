import { AUTH_TOKEN } from "../storageConfig";

export function getToken() {
  const token = localStorage.getItem(AUTH_TOKEN);
  return token;
}
