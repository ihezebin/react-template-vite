import {
  ArrowRightOutlined,
  CloudServerOutlined,
  CustomerServiceOutlined,
  FieldTimeOutlined,
  MoonOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SunOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'

import { AmbientBg } from '../../components/AmbientBg'
import { appConfig } from '../../config'
import { useStore } from '../../store'

import styles from './index.module.scss'

const SUPPORTED = [
  { label: '示例服务 Alpha', char: 'A', charBg: '#ec4141' },
  { label: '示例服务 Beta', char: 'B', charBg: '#c62828' },
  { label: '示例服务 Gamma', char: 'C', charBg: '#0ea5e9' },
  { label: '示例服务 Delta', char: 'D', charBg: '#3b82f6' },
  { label: '示例服务 Epsilon', char: 'E', charBg: '#ec4141' },
  { label: '示例服务 Zeta', char: 'F', charBg: '#0ea5e9' },
  { label: '示例服务 Eta', char: 'G', charBg: '#c62828' },
  { label: '示例服务 Theta', char: 'H', charBg: '#64748b' },
]

const FEATURES = [
  {
    icon: <PictureOutlined />,
    accent: '#ec4141',
    accentSoft: 'rgba(236, 65, 65, 0.16)',
    index: '01',
    title: '示例功能一',
    desc: '这里展示第一项产品能力的示例说明，可按实际项目自由替换。',
    tags: ['示例标签', '灵活配置', '快速开始'],
    visual: 'cover' as const,
  },
  {
    icon: <FieldTimeOutlined />,
    accent: '#0ea5e9',
    accentSoft: 'rgba(14, 165, 233, 0.16)',
    index: '02',
    title: '示例功能二',
    desc: '使用清晰的结构介绍产品能力、适用场景以及带给用户的价值。',
    tags: ['清晰结构', '自由扩展', '组件复用'],
    visual: 'align' as const,
  },
  {
    icon: <PlaySquareOutlined />,
    accent: '#0ea5e9',
    accentSoft: 'rgba(14, 165, 233, 0.16)',
    index: '03',
    title: '示例功能三',
    desc: '页面、主题和交互动效都已经准备好，可以直接开始业务开发。',
    tags: ['开箱即用', '交互完整', '响应迅速'],
    visual: 'video' as const,
  },
  {
    icon: <CustomerServiceOutlined />,
    accent: '#c62828',
    accentSoft: 'rgba(245, 158, 11, 0.16)',
    index: '04',
    title: '示例功能四',
    desc: '此处全部为模板占位内容，不包含来源项目的真实业务说明。',
    tags: ['安全示例', '主题适配', '持续演进'],
    visual: 'audio' as const,
  },
]

const FLOW_STEPS = [
  {
    icon: <ThunderboltOutlined />,
    accent: '#ec4141',
    title: '选择功能',
    desc: '从模板提供的示例入口中选择需要体验的功能',
    hint: '一键直达',
  },
  {
    icon: <CloudServerOutlined />,
    accent: '#0ea5e9',
    title: '完成配置',
    desc: '按页面提示填写示例信息并查看实时状态',
    hint: '自动跑完',
  },
  {
    icon: <SafetyCertificateOutlined />,
    accent: '#c62828',
    title: '开始使用',
    desc: '替换示例内容并接入自己的实际业务逻辑',
    hint: '即下即用',
  },
]

const FINALE_CHIPS = [
  '示例一',
  '示例二',
  '示例三',
  '示例四',
  '示例五',
  '示例六',
  '示例七',
  '示例八',
]

const Landing = () => {
  const navigate = useNavigate()
  const token = useStore((s) => s.token)
  const themeDark = useStore((s) => s.themeDark)
  const setThemeDark = useStore((s) => s.setThemeDark)

  const goConsole = () => {
    navigate(token ? '/console' : '/login', token ? undefined : { state: { from: '/console' } })
  }

  const scrollToFinale = () => {
    document
      .getElementById('landing-finale')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className={classNames(styles.page, themeDark && styles.dark)}>
      <AmbientBg variant="page" className={styles.ambient} />
      <div className={styles.aurora} aria-hidden>
        <span className={styles.orbA} />
        <span className={styles.orbB} />
        <span className={styles.orbC} />
      </div>

      <header className={styles.header}>
        <div className={styles.logoWrap}>
          <img src="/logo.svg" alt="" className={styles.logo} />
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="切换主题"
            onClick={() => setThemeDark(!themeDark)}
          >
            {themeDark ? <SunOutlined /> : <MoonOutlined />}
          </button>
          <Button className={styles.consoleBtn} type="primary" onClick={goConsole}>
            控制台 <ArrowRightOutlined style={{ transform: 'rotate(-45deg)' }} />
          </Button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>
            <CloudServerOutlined /> 示例产品模板
          </p>
          <h1 className={styles.title} aria-label={appConfig.title}>
            {Array.from(appConfig.title).map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className={styles.titleChar}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>
          <p className={styles.subtitle}>
            这是一段用于展示排版效果的示例文字，可替换为产品定位、核心能力与价值说明。
          </p>
          <div className={styles.ctaRow}>
            <Button type="primary" size="large" className={styles.cta} onClick={scrollToFinale}>
              立即体验 <ArrowRightOutlined />
            </Button>
            <span className={styles.ctaHint}>自助操作 · 云端执行 · 稳定高效</span>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualRing} aria-hidden />
          <div className={styles.visualRingSlow} aria-hidden />
          <div className={styles.promoStack} aria-hidden>
            <div className={styles.promoBack}>
              <span className={styles.templatePreviewTitle}>EXAMPLE</span>
              <span className={styles.templatePreviewLine} />
              <span className={styles.templatePreviewLine} />
            </div>
            <div className={styles.promoFront}>
              <img src="/logo.svg" alt="" />
              <strong>Template Preview</strong>
              <span className={styles.templatePreviewLine} />
              <span className={styles.templatePreviewLine} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        {FEATURES.map((f, i) => (
          <article
            key={f.title}
            className={styles.feature}
            style={
              {
                '--feat-accent': f.accent,
                '--feat-soft': f.accentSoft,
                animationDelay: `${0.12 + i * 0.08}s`,
              } as CSSProperties
            }
          >
            <div className={styles.featureGlow} aria-hidden />
            <div className={styles.featureTop}>
              <span className={styles.featureIndex}>{f.index}</span>
              <div className={styles.featureIcon}>{f.icon}</div>
            </div>
            <div className={styles.featureViz} aria-hidden data-viz={f.visual}>
              {f.visual === 'cover' && (
                <>
                  <span className={styles.vizDisc} />
                  <span className={styles.vizCover} />
                  <span className={styles.vizLyric} />
                  <span className={styles.vizLyric} data-short />
                  <span className={styles.vizLyric} data-mid />
                </>
              )}
              {f.visual === 'align' && (
                <>
                  <span className={styles.vizAlignRail} />
                  <span className={styles.vizAlignTick} data-i="1" />
                  <span className={styles.vizAlignTick} data-i="2" />
                  <span className={styles.vizAlignTick} data-i="3" />
                  <span className={styles.vizAlignTick} data-i="4" />
                  <span className={styles.vizAlignLine} data-i="1" />
                  <span className={styles.vizAlignLine} data-i="2" />
                  <span className={styles.vizAlignLine} data-i="3" />
                  <span className={styles.vizAlignPlay} />
                </>
              )}
              {f.visual === 'video' && (
                <>
                  <span className={styles.vizScreen} />
                  <span className={styles.vizPlay} />
                  <span className={styles.vizBar} />
                  <span className={styles.vizBar} data-mid />
                  <span className={styles.vizBar} data-tall />
                </>
              )}
              {f.visual === 'audio' && (
                <>
                  <span className={styles.vizWave} data-i="1" />
                  <span className={styles.vizWave} data-i="2" />
                  <span className={styles.vizWave} data-i="3" />
                  <span className={styles.vizWave} data-i="4" />
                  <span className={styles.vizWave} data-i="5" />
                  <span className={styles.vizWave} data-i="6" />
                  <span className={styles.vizWave} data-i="7" />
                  <span className={styles.vizMic} />
                </>
              )}
            </div>
            <div className={styles.featureBody}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className={styles.featureTags}>
                {f.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.supported}>
        <div className={styles.supportedHead}>
          <h2>已支持的服务</h2>
          <p>用于演示模板布局、组件和交互效果的示例服务</p>
        </div>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[...SUPPORTED, ...SUPPORTED].map((s, i) => (
              <span
                key={`${s.label}-${i}`}
                className={styles.supportedCard}
                style={{ '--chip': s.charBg } as CSSProperties}
              >
                <span className={styles.supportedGlow} aria-hidden />
                <span className={styles.supportedChar}>{s.char}</span>
                <span className={styles.supportedMeta}>
                  <strong>{s.label}</strong>
                  <em>
                    <i />
                    已支持
                  </em>
                </span>
                <span className={styles.supportedShine} aria-hidden />
              </span>
            ))}
          </div>
        </div>
        <div className={styles.marquee} data-reverse>
          <div className={styles.marqueeTrack}>
            {[...SUPPORTED.slice().reverse(), ...SUPPORTED.slice().reverse()].map((s, i) => (
              <span
                key={`${s.label}-r-${i}`}
                className={styles.supportedCard}
                style={{ '--chip': s.charBg } as CSSProperties}
              >
                <span className={styles.supportedGlow} aria-hidden />
                <span className={styles.supportedChar}>{s.char}</span>
                <span className={styles.supportedMeta}>
                  <strong>{s.label}</strong>
                  <em>
                    <i />
                    已支持
                  </em>
                </span>
                <span className={styles.supportedShine} aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.flow}>
        <div className={styles.flowAura} aria-hidden />
        <div className={styles.flowHead}>
          <span className={styles.flowKicker}>How it works</span>
          <h2>三步上手，全程云端跑完</h2>
          <p>从选择能力到拿到结果，少等待、少折腾</p>
        </div>
        <div className={styles.flowRail} aria-hidden>
          <span className={styles.flowRailFill} />
        </div>
        <div className={styles.flowTrack}>
          {FLOW_STEPS.map((step, i) => (
            <div
              key={step.title}
              className={styles.flowStep}
              style={
                {
                  '--flow-accent': step.accent,
                  animationDelay: `${0.08 + i * 0.1}s`,
                } as CSSProperties
              }
            >
              <div className={styles.flowNode}>
                <span className={styles.flowNodePulse} />
                <span className={styles.flowNodeCore}>{step.icon}</span>
              </div>
              <div className={styles.flowCard}>
                <span className={styles.flowNum}>0{i + 1}</span>
                <span className={styles.flowHint}>{step.hint}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className={styles.flowViz} aria-hidden data-step={i}>
                  {i === 0 && (
                    <>
                      <span />
                      <span />
                      <span />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <i />
                      <i />
                      <i />
                      <i />
                    </>
                  )}
                  {i === 2 && <b />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="landing-finale" className={styles.finale}>
        <div className={styles.finaleSheen} aria-hidden />
        <div className={styles.finaleGlow} aria-hidden />
        <div className={styles.finaleGrid} aria-hidden />
        <div className={styles.finaleOrbits} aria-hidden>
          {FINALE_CHIPS.map((chip, i) => (
            <span
              key={chip}
              className={styles.finaleOrbitChip}
              style={{ '--i': i, '--n': FINALE_CHIPS.length } as CSSProperties}
            >
              {chip}
            </span>
          ))}
        </div>
        <div className={styles.finaleInner}>
          <div className={styles.finaleBadgeWrap}>
            <RocketOutlined className={styles.finaleBadge} />
          </div>
          <h2>
            现在就开始
            <em>打造你的产品工作流</em>
          </h2>
          <p>登录后即可体验模板内置的布局、组件、主题与交互能力</p>
          <div className={styles.finaleActions}>
            <Button type="primary" size="large" className={styles.finaleCta} onClick={goConsole}>
              立即进入控制台 <ArrowRightOutlined />
            </Button>
            <span className={styles.finaleNote}>自助操作 · 云端执行 · 稳定高效</span>
          </div>
        </div>
      </section>

      <section className={styles.posterEntry}>
        <Link to="/login" className={styles.posterLink}>
          <div className={styles.posterBg} aria-hidden>
            <span className={styles.posterGlow} />
            <span className={styles.posterGrid} />
            <span className={styles.posterSheen} />
          </div>
          <div className={styles.posterVisual} aria-hidden>
            <div className={styles.posterFrame} data-back />
            <div className={styles.posterFrame} data-mid />
            <div className={styles.posterFrame} data-front>
              <span className={styles.posterFrameBar} />
              <span className={styles.posterFrameBar} data-short />
              <span className={styles.posterFrameDot} />
              <span className={styles.posterFrameWave} />
            </div>
          </div>
          <div className={styles.posterCopy}>
            <span className={styles.posterKicker}>Template Overview</span>
            <h2>
              示例入口
              <em>一屏了解模板能力</em>
            </h2>
            <p>布局 · 主题 · 字体 · 动效 · 登录，均可作为项目开发起点</p>
            <span className={styles.posterCta}>
              打开登录页 <ArrowRightOutlined />
            </span>
          </div>
        </Link>
      </section>

      <footer className={styles.footer}>© 2026 Example Template. 示例版权文字。</footer>
    </div>
  )
}

export default Landing
