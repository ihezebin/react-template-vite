import classNames from 'classnames'

import styles from './index.module.scss'

type DiscLoadingProps = {
  className?: string
  cover?: boolean
  tip?: string
}

/** 黑胶唱盘加载动画（歌单 / 路由懒加载等共用） */
export function DiscLoading({ className, cover = true, tip = '正在加载…' }: DiscLoadingProps) {
  return (
    <div
      className={classNames(styles.loading, cover && styles.loadingCover, className)}
      aria-live="polite"
      aria-busy
      role="status"
    >
      <div className={styles.loadingStage} aria-hidden>
        <span className={styles.loadingOrbA} />
        <span className={styles.loadingOrbB} />
        <div className={styles.loadingDisc}>
          <span className={styles.loadingDiscRing} />
          <span className={styles.loadingDiscRingB} />
          <span className={styles.loadingDiscHub}>APP</span>
        </div>
        <div className={styles.loadingTonearm}>
          <span className={styles.loadingTonearmPivot} />
          <span className={styles.loadingTonearmShaft} />
        </div>
        <div className={styles.loadingBars}>
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      {tip ? <p className={styles.loadingTip}>{tip}</p> : null}
    </div>
  )
}

export default DiscLoading
