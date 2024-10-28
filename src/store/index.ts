import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { ENV_DEV, getLocalItem, KEY_TOKEN, setLocalItem } from '@hezebin/doraemon'

import { IUser } from '../model'

interface IStore {
  themeDark: boolean
  setThemeDark: (dark: boolean) => void
  user: IUser | null
  setUser: (user: IUser) => void
  clearUser: () => void
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

const KEY_USER = 'user'
const KEY_THEME = 'theme'
const THEME_LIGHT = 'light'
const THEME_DARK = 'dark'
const THEME_DEFAULT = THEME_LIGHT

export const useStore = create<IStore>((set) => ({
  themeDark: (() => {
    const theme = getLocalItem(KEY_THEME) || THEME_DEFAULT
    const dark = theme === THEME_DARK
    document.documentElement.setAttribute(KEY_THEME, theme)
    return dark
  })(),
  setThemeDark: (dark: boolean) => {
    set((state) => ({ ...state, themeDark: dark }))
    document.documentElement.setAttribute(KEY_THEME, dark ? THEME_DARK : THEME_LIGHT)
  },
  user: getLocalItem(KEY_USER),
  setUser: (user) => {
    set((state) => ({ ...state, user: { ...state.user, ...user } }))
  },
  clearUser: () => set((state) => ({ ...state, user: null })),
  token: getLocalItem(KEY_TOKEN),
  setToken: (token) => set((state) => ({ ...state, token })),
  clearToken: () => set((state) => ({ ...state, token: null })),
}))

export const unsubscribeStore = useStore.subscribe((state: IStore) => {
  if (!state.user) {
    setLocalItem(KEY_USER)
  } else if (state?.user) {
    setLocalItem(KEY_USER, state.user)
  }

  if (state.themeDark) {
    setLocalItem(KEY_THEME, THEME_DARK)
  } else {
    setLocalItem(KEY_THEME, THEME_LIGHT)
  }

  if (state.token) {
    setLocalItem(KEY_TOKEN, state.token)
  } else {
    setLocalItem(KEY_TOKEN)
  }
})

if (process.env.NODE_ENV === ENV_DEV) {
  mountStoreDevtool('Store', useStore)
}
