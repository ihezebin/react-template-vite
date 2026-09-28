import classNames from 'classnames'
import type { ReactNode } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import styles from './index.module.scss'

type NiceEmptyProps = {
  title?: string
  description?: string
  action?: ReactNode
  className?: string
  /** 紧凑模式（表格内） */
  compact?: boolean
}

/** 空状态：玻璃面板 + 图标外虚线轨道旋转 */
export function NiceEmpty({
  title = '暂无数据',
  description = '这里还什么都没有，稍后再来看看吧',
  action,
  className,
  compact,
}: NiceEmptyProps) {
  return (
    <div className={classNames(styles.root, compact && styles.compact, className)}>
      <div className={styles.panel} aria-hidden>
        <span className={styles.aurora} />
        <span className={styles.mesh} />
        <span className={styles.cornerTL} />
        <span className={styles.cornerBR} />
      </div>

      <div className={styles.stage}>
        <div className={styles.visual} aria-hidden>
          <span className={styles.halo} />
          <span className={styles.orbit} />
          <span className={styles.orbitInner} />
          <div className={styles.iconPlate}>
            <InboxOutlined className={styles.icon} />
          </div>
        </div>
        <div className={styles.badge}>EMPTY</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </div>
  )
}

export function NiceEmptyShopAction({ onClick }: { onClick?: () => void }) {
  return (
    <Button type="primary" className={styles.cta} onClick={onClick}>
      去商城购买
    </Button>
  )
}

export default NiceEmpty
