import { LOWER_TOKEN } from "@utils/const"

const AUTH_TOKEN = LOWER_TOKEN
export function getTokenFromCookies() {
  return localStorage.getItem(AUTH_TOKEN) || ''
}

export function setTokenIntoCookies(token: string) {
  localStorage.setItem(AUTH_TOKEN, token)
}
export function flushTokenFromCookies() {
  localStorage.removeItem(AUTH_TOKEN)
}
export function getAuthorizationHeader() {
  return `Bearer ${getTokenFromCookies()}`
}
