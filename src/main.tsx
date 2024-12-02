import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import './assets/css/global.scss'
import Loading from './assets/images/loading.png'

const content = `
 _                      _     _
| |                    | |   (_)
| | _   ____ _____ ____| | _  _ ____
| || \\ / _  |___  ) _  ) || \\| |  _ \\
| | | ( (/ / / __( (/ /| |_) ) | | | |
|_| |_|\\____|_____)____)____/|_|_| |_|
        `
console.log(content)

message.config({
  maxCount: 1,
})

const LazyComponent = lazy(() => import('./router'))

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <Suspense
        fallback={
          <div id={'loading'}>
            <img src={Loading} alt="loading" />
          </div>
        }>
        <LazyComponent />
      </Suspense>
    </BrowserRouter>
  </ConfigProvider>,
)
