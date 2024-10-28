import { createFromIconfontCN } from '@ant-design/icons'
import React from 'react'

/**
 * Example: <IconFont type="http" />
 */
interface IProps extends React.ComponentProps<any> {
  type: string
}

const IconFont = ({ type, ...restProps }: IProps) => {
  const typePrefix = 'icon-blog'

  const IconFont = createFromIconfontCN({
    scriptUrl: '/iconfont.js',
  })

  return <IconFont type={`${typePrefix}-${type}`} {...restProps} />
}

export default IconFont
