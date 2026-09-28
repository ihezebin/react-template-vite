import { getLocalItem, KEY_TOKEN, setLocalItem } from '@hezebin/doraemon'

import { appConfig } from '../config'

const TITLE_KEY = 'title'
export const setDocumentTitle = (subtitle?: string) => {
  const title = subtitle ? `${subtitle} - ${appConfig.title}` : appConfig.title
  document.title = title
  setLocalItem(TITLE_KEY, title)
}

export const getDocumentTitle = (): string => {
  return getLocalItem(TITLE_KEY) || appConfig.title
}

export const handleUnAuthorized = (fn?: (() => void) | (() => void)[]) => {
  if (fn) {
    if (Array.isArray(fn)) {
      fn.forEach((f) => f())
    } else {
      fn()
    }
  }
  setLocalItem(KEY_TOKEN)
  document.location.href = '/login'
}
