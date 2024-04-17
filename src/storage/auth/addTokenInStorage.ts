import { AUTH_TOKEN } from "../storageConfig";

export async function addTokenInStorage(token: string) {
  localStorage.setItem(AUTH_TOKEN, token);
}
