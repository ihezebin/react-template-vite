import {useEffect, useState} from 'react'
import {useNavigate, useRoutes} from 'react-router-dom'
import {KEY_TOKEN} from '@hezebin/doraemon'
import {message, Spin} from 'antd'

import {unsubscribeStore, useStore} from '../store'
import {handleUnAuthorized} from '../util'
import {api} from '../api'

import {routes} from './routes'

// https://reactrouter.com/en/6.21.1/route/route#index
const Router = () => {
  const navigate = useNavigate()
  const { setUser, clearUser, token, setToken, clearToken } = useStore()
  const [authing, setAuthing] = useState<boolean>(true)

  useEffect(() => {
    // 如果当前地址后面带了 token query 参数，则将 token 写到本地
    if (location.search) {
      const newToken = new URLSearchParams(location.search).get(KEY_TOKEN)
      if (newToken) {
        console.log(newToken)
        setToken(newToken)
        navigate(location.pathname + location.hash)
        return
      }
    }

    if (token) {
      api
        .get('/user/check_token', { token })
        .then(({ code, message: msg, data, status }) => {
          if (status == 401) {
            clearUser()
            message.error(msg).then(() => handleUnAuthorized())
            return
          }
          if (status !== 200 || code !== 0) {
            console.error('Authorization Failed:', msg)
            clearUser()
            clearToken()
            return
          }
          if (code === 0 && data?.user) {
            setUser(data.user)
            setAuthing(false)
          }
        })
        .catch((err) => {
          console.error('Authorization Error:', err)
          handleUnAuthorized(clearUser)
        })
    } else {
      clearUser()
      setAuthing(false)
    }

    return () => {
      unsubscribeStore()
    }
  }, [token])

  const routesElement = useRoutes(routes)

  return (
    <Spin
      style={{ maxHeight: 'initial', height: '100vh' }}
      spinning={authing}
      tip={'加载账号数据...'}
      size={'large'}>
      {!authing && routesElement}
    </Spin>
  )
}
export default Router
