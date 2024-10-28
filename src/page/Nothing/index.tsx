import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

import style from './index.module.scss'

const Nothing = () => {
  const navigate = useNavigate()

  return (
    <div className={style.nothing}>
      <Result
        status="404"
        title="Nothing"
        // subTitle="Sorry, the page you visited does not exist."
        subTitle="抱歉，您所访问的页面不存在！"
        extra={<Button onClick={() => navigate(-1)}>返 回</Button>}
      />
    </div>
  )
}

export default Nothing
