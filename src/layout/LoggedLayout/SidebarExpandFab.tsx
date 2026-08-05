import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

const FAB_POS_KEY = 'sidebar-expand-fab-pos'
const FAB_SIZE = 44
const FAB_MARGIN = 8
const DRAG_THRESHOLD = 3

type FabPos = { left: number; top: number }

function defaultPos(): FabPos {
  if (typeof window === 'undefined') return { left: 16, top: 16 }
  return {
    left: 16,
    top: Math.max(FAB_MARGIN, window.innerHeight - FAB_SIZE - 16),
  }
}

function clampPos(left: number, top: number): FabPos {
  const maxLeft = Math.max(FAB_MARGIN, window.innerWidth - FAB_SIZE - FAB_MARGIN)
  const maxTop = Math.max(FAB_MARGIN, window.innerHeight - FAB_SIZE - FAB_MARGIN)
  return {
    left: Math.min(maxLeft, Math.max(FAB_MARGIN, left)),
    top: Math.min(maxTop, Math.max(FAB_MARGIN, top)),
  }
}

function loadPos(): FabPos {
  try {
    const raw = localStorage.getItem(FAB_POS_KEY)
    if (!raw) return defaultPos()
    const parsed = JSON.parse(raw) as Partial<FabPos>
    if (typeof parsed.left === 'number' && typeof parsed.top === 'number') {
      return clampPos(parsed.left, parsed.top)
    }
  } catch {
    /* ignore */
  }
  return defaultPos()
}

function savePos(pos: FabPos) {
  try {
    localStorage.setItem(FAB_POS_KEY, JSON.stringify(pos))
  } catch {
    /* ignore */
  }
}

export function SidebarExpandFab({ onExpand }: { onExpand: () => void }) {
  const [pos, setPos] = useState<FabPos>(() => loadPos())
  const rootRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(pos)
  const dragRef = useRef<{
    active: boolean
    moved: boolean
    pointerId: number
    startX: number
    startY: number
    originLeft: number
    originTop: number
  } | null>(null)

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useEffect(() => {
    const applyDomPos = (next: FabPos) => {
      const el = rootRef.current
      if (el) {
        el.style.left = `${next.left}px`
        el.style.top = `${next.top}px`
      }
    }

    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag?.active) return
      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY
      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true
        document.body.classList.add('is-fab-dragging')
      }
      if (!drag.moved) return
      const next = clampPos(drag.originLeft + dx, drag.originTop + dy)
      posRef.current = next
      applyDomPos(next)
    }

    const onUp = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag?.active) return
      if (drag.pointerId !== e.pointerId) return
      drag.active = false
      document.body.classList.remove('is-fab-dragging')
      if (drag.moved) {
        const next = clampPos(posRef.current.left, posRef.current.top)
        posRef.current = next
        setPos(next)
        savePos(next)
        applyDomPos(next)
        return
      }
      onExpand()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.body.classList.remove('is-fab-dragging')
    }
  }, [onExpand])

  useEffect(() => {
    const onResize = () => {
      setPos((p) => {
        const next = clampPos(p.left, p.top)
        savePos(next)
        return next
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div
      ref={rootRef}
      className={styles.sidebarExpandFabWrap}
      style={{ left: pos.left, top: pos.top }}
      onPointerDown={(e) => {
        if (e.button !== 0) return
        e.preventDefault()
        dragRef.current = {
          active: true,
          moved: false,
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          originLeft: posRef.current.left,
          originTop: posRef.current.top,
        }
      }}>
      <Button
        className={styles.sidebarExpandFab}
        type="default"
        shape="circle"
        size="large"
        icon={<MenuUnfoldOutlined />}
        aria-label="展开侧边栏（可拖动调整位置）"
        title="展开侧边栏（可拖动）"
        tabIndex={-1}
      />
    </div>
  )
}
