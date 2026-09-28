/** 站点字体：管理台系统默认可被用户 localStorage 偏好覆盖；按所选动态加载 webfont。 */

export type AppFontKey = 'zhuque_fangsong' | 'lxgw_wenkai' | 'xiaolai'

export const DEFAULT_APP_FONT: AppFontKey = 'xiaolai'

/** 用户个人覆盖（有值则优先于系统默认） */
const STORAGE_USER_KEY = 'app_font_user'
/** 缓存的系统默认（来自管理台 / public/ui） */
const STORAGE_SYSTEM_KEY = 'app_font_system'
/** 旧版单一缓存键，仅作迁移读取 */
const STORAGE_LEGACY_KEY = 'app_font'

export type AppFontOption = {
  key: AppFontKey
  label: string
  description: string
  /** CSS font-family 栈 */
  family: string
  load: () => Promise<unknown>
}

export const APP_FONT_OPTIONS: AppFontOption[] = [
  {
    key: 'zhuque_fangsong',
    label: '朱雀仿宋',
    description: '璇玑造字开源仿宋，书卷气正文',
    family:
      '"Zhuque Fangsong", "STFangsong", "FangSong", "宋体", "Songti SC", "PingFang SC", serif',
    load: () => import('@free-fonts/zhuque-fangsong/zhuque-fangsong.css'),
  },
  {
    key: 'lxgw_wenkai',
    label: '霞鹜文楷',
    description: '基于 Klee One 的开源楷体',
    family: '"LXGW WenKai", "Kaiti SC", "KaiTi", "楷体", "Songti SC", "PingFang SC", serif',
    load: () =>
      Promise.all([
        import('@hanzi.pro/webfonts-lxgw-wenkai/swap/400.css'),
        import('@hanzi.pro/webfonts-lxgw-wenkai/swap/500.css'),
      ]),
  },
  {
    key: 'xiaolai',
    label: '小赖字体',
    description: '衍生于濑户字体的手写风简体',
    family: '"Xiaolai SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    load: () => import('@chinese-fonts/xiaolai/dist/Xiaolai/result.css'),
  },
]

const optionByKey = Object.fromEntries(APP_FONT_OPTIONS.map((o) => [o.key, o])) as Record<
  AppFontKey,
  AppFontOption
>

const loaded = new Set<AppFontKey>()
const listeners = new Set<() => void>()

let systemKey: AppFontKey = readStoredKey(STORAGE_SYSTEM_KEY) ?? DEFAULT_APP_FONT
let userKey: AppFontKey | null = readStoredKey(STORAGE_USER_KEY)
let currentKey: AppFontKey = resolveEffective()

migrateLegacyIfNeeded()

function readStoredKey(storageKey: string): AppFontKey | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw && raw in optionByKey) return raw as AppFontKey
  } catch {
    /* ignore */
  }
  return null
}

function writeStoredKey(storageKey: string, key: AppFontKey | null) {
  try {
    if (key == null) localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, key)
  } catch {
    /* ignore */
  }
}

/** 旧版把系统/本地混在 app_font：有 user 键则忽略；否则当作系统缓存 */
function migrateLegacyIfNeeded() {
  if (readStoredKey(STORAGE_USER_KEY) != null) {
    try {
      localStorage.removeItem(STORAGE_LEGACY_KEY)
    } catch {
      /* ignore */
    }
    return
  }
  const legacy = readStoredKey(STORAGE_LEGACY_KEY)
  if (!legacy) return
  if (readStoredKey(STORAGE_SYSTEM_KEY) == null) {
    systemKey = legacy
    writeStoredKey(STORAGE_SYSTEM_KEY, legacy)
  }
  try {
    localStorage.removeItem(STORAGE_LEGACY_KEY)
  } catch {
    /* ignore */
  }
  currentKey = resolveEffective()
}

function resolveEffective(): AppFontKey {
  return userKey ?? systemKey ?? DEFAULT_APP_FONT
}

function notify() {
  listeners.forEach((fn) => fn())
}

/** 唯一字体 CSS 变量；各处统一读 var(--app-font-family)。 */
function applyCssVars(family: string) {
  document.documentElement.style.setProperty('--app-font-family', family)
}

async function loadFontCss(key: AppFontKey) {
  if (loaded.has(key)) return
  await optionByKey[key].load()
  loaded.add(key)
}

/** 仅应用当前生效字体的 CSS 变量与 webfont，不改偏好存储。 */
export async function applyEffectiveFont(): Promise<AppFontKey> {
  const key = resolveEffective()
  currentKey = key
  applyCssVars(optionByKey[key].family)
  notify()
  await loadFontCss(key)
  return key
}

export function normalizeAppFontKey(raw?: string | null): AppFontKey {
  const k = String(raw || '').trim()
  if (k in optionByKey) return k as AppFontKey
  return DEFAULT_APP_FONT
}

export function getAppFontKey(): AppFontKey {
  return currentKey
}

export function getSystemAppFont(): AppFontKey {
  return systemKey
}

/** 用户个人覆盖；null 表示跟随系统默认 */
export function getUserAppFontPref(): AppFontKey | null {
  return userKey
}

export function getAppFontFamily(key: AppFontKey = currentKey): string {
  return optionByKey[key].family
}

export function getAppFontOption(key: AppFontKey = currentKey): AppFontOption {
  return optionByKey[key]
}

export function subscribeAppFont(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

/** 管理台保存 / 拉取 public/ui：更新系统默认；无用户覆盖时立即生效。 */
export async function setSystemAppFont(raw: string): Promise<AppFontKey> {
  systemKey = normalizeAppFontKey(raw)
  writeStoredKey(STORAGE_SYSTEM_KEY, systemKey)
  return applyEffectiveFont()
}

/** 用户下拉：写入本地偏好并覆盖系统默认。 */
export async function setUserAppFont(raw: string): Promise<AppFontKey> {
  userKey = normalizeAppFontKey(raw)
  writeStoredKey(STORAGE_USER_KEY, userKey)
  return applyEffectiveFont()
}

/** 清除用户覆盖，恢复跟随系统默认。 */
export async function clearUserAppFont(): Promise<AppFontKey> {
  userKey = null
  writeStoredKey(STORAGE_USER_KEY, null)
  return applyEffectiveFont()
}

/**
 * @deprecated 兼容旧调用：视为设置用户偏好（管理台请改用 setSystemAppFont / previewAppFont）
 */
export async function applyAppFont(raw: string): Promise<AppFontKey> {
  return setUserAppFont(raw)
}

/** 管理台表单预览：只改画面，不写入用户偏好。 */
export async function previewAppFont(raw: string): Promise<AppFontKey> {
  const key = normalizeAppFontKey(raw)
  currentKey = key
  applyCssVars(optionByKey[key].family)
  notify()
  await loadFontCss(key)
  return key
}

/**
 * 启动：本地缓存先上屏（避免等网络空白），同时并行拉 /public/ui。
 * 无用户覆盖时，远程系统默认一到就覆盖本地缓存并立即换字体；
 * 有用户覆盖时只刷新 system 缓存（「默认」标签），画面仍跟用户偏好。
 */
export async function bootstrapAppFont(fetchFont: () => Promise<string | undefined>) {
  const remotePromise = fetchFont()
    .then((raw) => (raw != null && String(raw).trim() !== '' ? normalizeAppFontKey(raw) : null))
    .catch(() => null)

  // 与远程请求并行：先按 localStorage 上屏，不阻塞 public/ui
  const localTask = applyEffectiveFont()

  const remote = await remotePromise
  if (remote != null) {
    await setSystemAppFont(remote)
    return
  }
  await localTask
}
