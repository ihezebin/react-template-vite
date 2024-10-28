import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button } from 'antd'

import { useStore } from '../../store'
import { api } from '../../api'

import style from './index.module.scss'

const Test = () => {
  const { user, setUser, clearUser } = useStore()
  useEffect(() => {
    setUser({
      username: 'test_username',
      id: '123',
      password_strength: 5,
      email: 'test_email',
    })

    return () => {
      clearUser()
    }
  }, [])

  const { id } = useParams()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  // const name = searchParams.get('name');
  const paramsObject: { [key: string]: string } = {}
  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value
  }

  return (
    <div className={style.test}>
      <div style={{ display: 'flex' }}>
        <div>全局状态管理存储的用户信息： {user?.username} </div>
        <Button
          onClick={() =>
            setUser({ id: 'xxx', username: 'new_username', password_strength: 5, email: 'xxx' })
          }>
          改变用户名
        </Button>
        <Button onClick={() => clearUser()}>清空用户</Button>
      </div>
      <br />
      <div>使用环境变量：{import.meta.env.VITE_APP_TITLE}</div>
      <br />
      <div>路径中的参数id(/test/:id)：{id}</div>
      <br />
      <div>query参数(/test?a=xxx)：{JSON.stringify(paramsObject)}</div>
      <br />
      <div>
        调用 API 请求：
        <Button
          onClick={() => {
            api
              .get('/hello')
              .then((res) => {
                console.log('resp', res)
              })
              .catch((err) => {
                console.log('err', err)
              })
          }}>
          发送
        </Button>
      </div>
      <div></div>
    </div>
  )
}

export default Test
