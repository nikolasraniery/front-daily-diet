import { AUTH_TOKEN } from "../storageConfig";

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN);
}
