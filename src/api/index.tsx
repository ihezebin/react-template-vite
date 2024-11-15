import { getLocalItem, KEY_TOKEN, newApi, setLocalItem } from '@hezebin/doraemon'
import { message, notification } from 'antd'

const baseURL = '/api'
const timeout = import.meta.env.PROD ? 10000 : 0

export const api = newApi({
  baseURL: baseURL,
  timeout: timeout,
  withToken: () => {
    return getLocalItem(KEY_TOKEN)
  },
  onResponse: (res) => {
    if (res?.code !== 0 && res?.code !== 11) {
      message.error(res?.message).then()
    }
    return res
  },
  onError: (res) => {
    console.log('onError')
    if (res.status === 401) {
      setLocalItem(KEY_TOKEN)
    } else {
      message.error(res?.message).then()
    }
    return res
  },
  onAbnormal: (err, code, message) => {
    console.error('onAbnormal')
    // 无响应错误处理
    notification.error({
      message: message,
      description: <span style={{ color: 'gray', fontSize: '13px' }}>{`错误码: ${code}`}</span>,
    })
    return err
  },
})
