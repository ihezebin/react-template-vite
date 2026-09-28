import { DiscLoading } from '../DiscLoading'

type ContentLoadingProps = {
  /** 全屏铺满父容器（默认 true） */
  cover?: boolean
  className?: string
  /** 提示文案；默认「正在加载…」 */
  title?: string
  /** @deprecated */
  description?: string
}

/** 内容区数据加载：黑胶唱盘动画 */
export function ContentLoading({
  cover = true,
  className,
  title = '正在加载…',
}: ContentLoadingProps) {
  return <DiscLoading cover={cover} className={className} tip={title} />
}

export default ContentLoading
