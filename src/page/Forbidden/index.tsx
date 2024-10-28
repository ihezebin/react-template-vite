import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

import style from './index.module.scss'

const Forbidden = () => {
  const navigate = useNavigate()

  return (
    <div className={style.forbidden}>
      <Result
        status="403"
        title="Forbidden"
        // subTitle="Sorry, you are not authorized to access this page."
        subTitle="抱歉，您没有权限访问该页面！"
        extra={<Button onClick={() => navigate(-1)}>返回</Button>}
      />
    </div>
  )
}

export default Forbidden
