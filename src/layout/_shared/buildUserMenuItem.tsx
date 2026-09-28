import type { ReactNode } from 'react'

export type UserMenuAction = {
  key: string
  icon: ReactNode
  title: string
  hint?: string
  badge?: number
  danger?: boolean
  onClick?: () => void
}

/** 账号下拉快捷操作项（自绘按钮，不走 antd Menu） */
export function buildUserMenuItem(opts: UserMenuAction): UserMenuAction {
  return {
    ...opts,
    badge: opts.badge && opts.badge > 0 ? opts.badge : undefined,
  }
}
