import { useNavigate, useLocation, useRoutes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { KEY_TOKEN } from '@hezebin/doraemon'
import { message, Spin } from 'antd'

import { useStore } from '../store'
import { api } from '../api'
import { handleUnAuthorized } from '../util'

import { routeConfig } from './config'

// https://reactrouter.com/en/6.21.1/route/route#index
const Router = () => {
  const { user, clearUser, token, setToken, clearToken, setUser } = useStore()
  const [isParsingSearch, setIsParsingSearch] = useState<boolean>(true)
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true)
  const navigate = useNavigate()
  const location = useLocation()

  // 如果当前地址后面带了 token query 参数，则将 token 写到本地
  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search)
      const newToken = searchParams.get(KEY_TOKEN)
      if (newToken) {
        console.log(newToken)
        setToken(newToken)
        // 保留其他 query 参数，仅去除 token
        searchParams.delete(KEY_TOKEN)
        const newSearch = searchParams.toString()
        navigate(location.pathname + (newSearch ? '?' + newSearch : '') + location.hash)
        return
      } else {
        setIsParsingSearch(false)
      }
    } else {
      setIsParsingSearch(false)
      console.log('isParsingSearch false')
    }
  }, [location, navigate, setToken, setIsParsingSearch])

  // 不管是否需要认证，只要有 token，则检查 token 是否有效
  useEffect(() => {
    if (isParsingSearch) {
      return
    }
    if (token) {
      api
        .get('/user/check_token', { token })
        .then(({ code, message: msg, data, status }) => {
          if (status == 401) {
            handleUnAuthorized([clearUser, clearToken])
            return
          }
          if (code !== 0 && msg) {
            message.error(msg)
            return
          }
          if (code === 0 && data?.user) {
            setUser(data.user)
          }
        })
        .catch((err) => {
          console.error('Authorization Error:', err)
          handleUnAuthorized([clearUser, clearToken])
        })
        .finally(() => {
          setIsCheckingToken(false)
        })
    } else {
      setIsCheckingToken(false)
    }
  }, [token, clearUser, clearToken, setUser, isParsingSearch, setIsCheckingToken])

  console.log(isCheckingToken, isParsingSearch)

  return (
    <Spin
      style={{ maxHeight: 'initial', height: '100vh' }}
      size={'large'}
      // tip={'认证中...'}
      spinning={isCheckingToken || isParsingSearch}>
      {useRoutes(routeConfig)}
    </Spin>
  )
}
export default Router
