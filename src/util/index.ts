import { HEZEBIN_DOMAIN_HEZEBIN_SSO_LOGIN, KEY_TOKEN, setLocalItem } from '@hezebin/doraemon'

const TITLE_KEY = 'title'
export const setDocumentTitle = (subtitle?: string) => {
  const title = subtitle ? `${subtitle} - 河泽冰` : '河泽冰'
  document.title = title
  setLocalItem(TITLE_KEY, title)
}

export const getDocumentTitle = (): string => {
  return localStorage.getItem(TITLE_KEY) || '河泽冰'
}

export const handleUnAuthorized = (fn?: () => void) => {
  fn && fn()
  setLocalItem(KEY_TOKEN)
  document.location.href =
    'https://' + HEZEBIN_DOMAIN_HEZEBIN_SSO_LOGIN + '?callback=' + document.location.href
}
