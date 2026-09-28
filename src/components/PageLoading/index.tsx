import classNames from 'classnames'

import { DiscLoading } from '../DiscLoading'

import styles from './index.module.scss'

type PageLoadingProps = {
  fullscreen?: boolean
}

/** 路由懒加载：黑胶唱盘动画 */
export function PageLoading({ fullscreen = false }: PageLoadingProps) {
  return (
    <div
      className={classNames(styles.root, fullscreen && styles.fullscreen)}
      aria-live="polite"
      aria-busy>
      <DiscLoading cover tip="正在加载…" />
    </div>
  )
}

export default PageLoading
