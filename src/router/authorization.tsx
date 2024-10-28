import { ReactElement, useEffect, useState } from 'react'
import { message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useStore } from '../store'
import { handleUnAuthorized } from '../util'

interface IProps {
  children: ReactElement
}

export const RequireAuth = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { user, clearUser, token } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      handleUnAuthorized(clearUser)
      return
    }

    if (token && !user) {
      return
    }

    if (user?.username !== 'hezebin') {
      message.error(`当前登录账号[${user?.username}]无权限`).then(() => navigate('/forbidden'))
      return
    }

    setLoading(false)
  }, [user])

  return (
    <Spin
      style={{ maxHeight: 'initial', height: '100vh' }}
      size={'large'}
      tip={'认证中...'}
      spinning={loading}>
      {children}
    </Spin>
  )
}
