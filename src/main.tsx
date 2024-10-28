import {createRoot} from 'react-dom/client'
import Router from "./router";
import {BrowserRouter} from 'react-router-dom'
import {ConfigProvider, message} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './assets/css/global.scss'

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


createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </ConfigProvider>,
)
