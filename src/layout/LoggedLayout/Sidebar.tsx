import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MoonOutlined,
  RightOutlined,
  SunOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Typography } from 'antd'
import type { MenuProps } from 'antd'
import classNames from 'classnames'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AmbientBg } from '../../components/AmbientBg'
import { appConfig } from '../../config'
import { useStore } from '../../store'

import { menuConfig, type LayoutMenuItem } from './menu.config'
import styles from './styles.module.scss'

const { Text } = Typography

function BrandBar() {
  const navigate = useNavigate()
  const setSidebarCollapsed = useStore((s) => s.setSidebarCollapsed)

  return (
    <div className={styles.sidebarBrand}>
      <button
        type="button"
        className={styles.sidebarBrandLeft}
        aria-label="返回首页"
        title="返回首页"
        onClick={() => navigate('/')}>
        <img className={styles.sidebarLogo} src="/logo.svg" alt="" />
        <span className={styles.sidebarBrandName}>{appConfig.title}</span>
      </button>
      <Button
        className={styles.sidebarCollapseBtn}
        type="default"
        shape="circle"
        size="small"
        icon={<MenuFoldOutlined />}
        aria-label="收起侧边栏"
        title="收起侧边栏"
        onClick={() => setSidebarCollapsed(true)}
      />
    </div>
  )
}

function buildPath(parentKeys: string[], key: string) {
  return ('/' + [...parentKeys, key].join('/')).replace(/\/+/g, '/')
}

function isPathActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(path + '/')
}

function MenuLeaf({
  item,
  path,
  active,
  onNavigate,
}: {
  item: LayoutMenuItem
  path: string
  active: boolean
  onNavigate: (path: string) => void
}) {
  return (
    <button
      type="button"
      className={classNames(styles.settingsNavItem, active && styles.active)}
      onClick={() => onNavigate(path)}>
      {item.icon ? <span className={styles.settingsNavIcon}>{item.icon}</span> : null}
      <span className={styles.settingsNavLabel}>{item.label}</span>
    </button>
  )
}

function MenuGroup({
  item,
  parentKeys,
  pathname,
  onNavigate,
}: {
  item: LayoutMenuItem
  parentKeys: string[]
  pathname: string
  onNavigate: (path: string) => void
}) {
  const childActive = (item.children ?? []).some((child) =>
    isPathActive(pathname, buildPath([...parentKeys, item.key], child.key)),
  )
  const [open, setOpen] = useState(childActive)

  useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  return (
    <div className={styles.sidebarMenuGroup}>
      <button
        type="button"
        className={classNames(
          styles.settingsNavItem,
          styles.sidebarMenuGroupTrigger,
          childActive && styles.isActiveGroup,
        )}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}>
        {item.icon ? <span className={styles.settingsNavIcon}>{item.icon}</span> : null}
        <span className={styles.settingsNavLabel}>{item.label}</span>
        <span className={styles.sidebarMenuGroupArrow}>
          {open ? <DownOutlined /> : <RightOutlined />}
        </span>
      </button>
      {open ? (
        <div className={styles.sidebarMenuGroupChildren}>
          {(item.children ?? []).map((child) => {
            const path = buildPath([...parentKeys, item.key], child.key)
            return (
              <button
                key={child.key}
                type="button"
                className={classNames(
                  styles.projectItem,
                  isPathActive(pathname, path) && styles.active,
                )}
                onClick={() => onNavigate(path)}>
                <span className={styles.projectItemName} title={child.label}>
                  {child.label}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function renderMenuItems(
  items: LayoutMenuItem[],
  parentKeys: string[],
  pathname: string,
  onNavigate: (path: string) => void,
): ReactNode {
  return items.map((item) => {
    if (item.children?.length) {
      return (
        <MenuGroup
          key={item.key}
          item={item}
          parentKeys={parentKeys}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      )
    }
    const path = buildPath(parentKeys, item.key)
    return (
      <MenuLeaf
        key={item.key}
        item={item}
        path={path}
        active={isPathActive(pathname, path)}
        onNavigate={onNavigate}
      />
    )
  })
}

function UserFooter() {
  const navigate = useNavigate()
  const user = useStore((s) => s.user)
  const logout = useStore((s) => s.logout)
  const themeDark = useStore((s) => s.themeDark)
  const setThemeDark = useStore((s) => s.setThemeDark)
  const name = user?.username || '访客'
  const initial = name.slice(0, 1).toUpperCase()

  const items: MenuProps['items'] = [
    {
      key: 'theme',
      icon: themeDark ? <SunOutlined /> : <MoonOutlined />,
      label: themeDark ? '切换明亮主题' : '切换暗黑主题',
      onClick: () => setThemeDark(!themeDark),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
      onClick: () => {
        logout()
        navigate('/login', { replace: true })
      },
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="topRight">
      <button type="button" className={styles.sidebarUserBtn} title="账号菜单">
        <Avatar className={styles.sidebarUserAvatar} size={36} src={user?.avatar}>
          {initial}
        </Avatar>
        <span className={styles.sidebarUserMeta}>
          <Text className={styles.sidebarUserName} ellipsis>
            {name}
          </Text>
          <Text className={styles.sidebarUserHint} type="secondary">
            已登录
          </Text>
        </span>
        <DownOutlined className={styles.sidebarUserCaret} />
      </button>
    </Dropdown>
  )
}

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const items = useMemo(() => menuConfig, [])

  return (
    <aside className={styles.sidebar}>
      <AmbientBg variant="sidebar" />
      <div className={classNames(styles.sidebarHeader, styles.sidebarHeaderStack)}>
        <BrandBar />
      </div>
      <div className={styles.sidebarBody}>
        {renderMenuItems(items, [], location.pathname, navigate)}
      </div>
      <div className={styles.sidebarFooter}>
        <UserFooter />
      </div>
    </aside>
  )
}
