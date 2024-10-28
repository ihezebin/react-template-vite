import {Outlet, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

import {useStore} from '../store'

// const { AnimateCss } = Animate
const GlobalLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const navigate = useNavigate()
  const { themeDark, setThemeDark } = useStore()

  useEffect(() => {
  }, [])

  const handleMenuClick = (keys: string[]) => {
    const path = ('/' + keys.reverse().join('/')).replace('//', '/')
    navigate(path)
  }

  return (
      <Outlet />
  )
}

export default GlobalLayout
