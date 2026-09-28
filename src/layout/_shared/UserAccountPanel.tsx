import { Avatar } from 'antd'
import classNames from 'classnames'
import { useSyncExternalStore } from 'react'

import {
  APP_FONT_OPTIONS,
  clearUserAppFont,
  getAppFontKey,
  getSystemAppFont,
  getUserAppFontPref,
  setUserAppFont,
  subscribeAppFont,
  type AppFontKey,
} from '../../fonts/appFont'
import type { IUser } from '../../model'

import type { UserMenuAction } from './buildUserMenuItem'
import styles from './userMenu.module.scss'

function useFontMenuState() {
  const effective = useSyncExternalStore(subscribeAppFont, getAppFontKey, getAppFontKey)
  const userPref = useSyncExternalStore(subscribeAppFont, getUserAppFontPref, getUserAppFontPref)
  const system = useSyncExternalStore(subscribeAppFont, getSystemAppFont, getSystemAppFont)
  return { effective, userPref, system }
}

export function UserAccountPanel({
  user,
  guestMode,
  actions,
  onAction,
}: {
  user: IUser | null
  guestMode?: boolean
  actions: UserMenuAction[]
  /** 点击某项后关闭下拉 */
  onAction?: () => void
}) {
  const name = user?.nickname || user?.username || (guestMode ? '游客' : '访客')
  const initial = name.slice(0, 1).toUpperCase()
  const cover = user?.background_url?.trim() || ''
  const { effective, userPref, system } = useFontMenuState()

  const onPickFont = (key: AppFontKey) => {
    void setUserAppFont(key)
  }

  const onResetFont = () => {
    void clearUserAppFont()
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelGlow} aria-hidden />

      <div className={styles.profile}>
        <div
          className={styles.cover}
          style={cover ? { backgroundImage: `url(${cover})` } : undefined}
          aria-hidden
        >
          <div className={styles.coverShade} />
          <div className={styles.coverMesh} />
        </div>

        <div className={styles.profileMain}>
          <div className={styles.avatarWrap}>
            <Avatar className={styles.profileAvatar} size={64} src={user?.avatar_url}>
              {initial}
            </Avatar>
            <span className={styles.avatarRing} aria-hidden />
          </div>

          <div className={styles.profileText}>
            <div className={styles.nameRow}>
              <h4 className={styles.profileName}>{name}</h4>
              {guestMode ? <span className={styles.pillGuest}>游客</span> : null}
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaChip}>ID {user?.display_id || user?.id || '—'}</span>
            </div>

            {user?.created_at ? (
              <div className={styles.joined}>
                加入于 {new Date(user.created_at).toLocaleString('zh-CN')}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.sectionLabel}>界面字体</div>
      <div className={styles.fontPicker} role="group" aria-label="选择界面字体">
        {APP_FONT_OPTIONS.map((opt) => {
          const active = effective === opt.key
          const isSystem = system === opt.key
          return (
            <button
              key={opt.key}
              type="button"
              className={classNames(styles.fontChip, active && styles.fontChipActive)}
              style={{ fontFamily: opt.family }}
              aria-pressed={active}
              title={isSystem ? `${opt.description}（系统默认）` : opt.description}
              onClick={() => onPickFont(opt.key)}
            >
              <span className={styles.fontChipLabel}>{opt.label}</span>
              {isSystem ? <span className={styles.fontChipTag}>默认</span> : null}
            </button>
          )
        })}
      </div>
      {userPref ? (
        <button type="button" className={styles.fontReset} onClick={onResetFont}>
          恢复系统默认字体
        </button>
      ) : (
        <div className={styles.fontHint}>当前跟随系统默认，可点选覆盖</div>
      )}

      <div className={styles.sectionLabel}>快捷操作</div>
      <div className={styles.menuList} role="menu">
        {actions.map((action) => {
          const badge = action.badge && action.badge > 0 ? action.badge : 0
          return (
            <button
              key={action.key}
              type="button"
              role="menuitem"
              className={classNames(styles.menuItem, action.danger && styles.menuItemDanger)}
              onClick={() => {
                onAction?.()
                action.onClick?.()
              }}
            >
              <span className={styles.itemIcon} aria-hidden>
                {action.icon}
              </span>
              <span className={styles.itemBody}>
                <span className={styles.itemTitleRow}>
                  <span className={styles.itemTitle}>{action.title}</span>
                  {badge > 0 ? (
                    <span className={styles.itemBadge}>{badge > 99 ? '99+' : badge}</span>
                  ) : null}
                </span>
                {action.hint ? <span className={styles.itemHint}>{action.hint}</span> : null}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
