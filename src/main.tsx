import { createRoot } from 'react-dom/client'
import { ConfigProvider, notification, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import './assets/css/global.scss'
import { appConfig } from './config'
import { applyEffectiveFont, getAppFontFamily } from './fonts/appFont'
import LazyRouter from './router'
import { useStore } from './store'

void applyEffectiveFont()

document.title = appConfig.title

const content = `
 _                      _     _
| |                    | |   (_)
| | _   ____ _____ ____| | _  _ ____
| || \\ / _  |___  ) _  ) || \\| |  _ \\
| | | ( (/ / / __( (/ /| |_) ) | | | |
|_| |_|\\____|_____)____)____/|_|_| |_|
        `
console.log(content)

notification.config({
  placement: 'topRight',
  duration: 3,
  maxCount: 3,
})

function AppRoot() {
  const themeDark = useStore((s) => s.themeDark)
  const fontFamily = getAppFontFamily()

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: themeDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily,
          fontFamilyCode: fontFamily,
          colorPrimary: themeDark ? '#5b9dff' : '#1677ff',
        },
      }}
    >
      <LazyRouter />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(<AppRoot />)
