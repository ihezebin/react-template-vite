import { LockOutlined, QrcodeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AmbientBg } from '../../components/AmbientBg'
import { appConfig } from '../../config'
import { useStore } from '../../store'

import styles from './index.module.scss'

type LoginForm = {
  username: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useStore((s) => s.login)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'password' | 'quick'>('password')
  const brandMark = appConfig.title.toUpperCase()

  const from =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from?: string }).from !== '/login'
      ? (location.state as { from: string }).from
      : '/'

  const onFinish = (values: LoginForm) => {
    setLoading(true)
    window.setTimeout(() => {
      const username = values.username.trim()
      login(username)
      notification.success({
        message: '登录成功',
        description: `欢迎回来，${username}`,
      })
      setLoading(false)
      navigate(from, { replace: true })
    }, 420)
  }

  const quickLogin = () => {
    setLoading(true)
    window.setTimeout(() => {
      login('示例用户')
      notification.success({ message: '登录成功', description: '已通过示例快捷登录进入控制台' })
      setLoading(false)
      navigate(from, { replace: true })
    }, 420)
  }

  return (
    <div className={styles.loginPage}>
      <AmbientBg variant="page" />

      <div className={styles.stageDecor} aria-hidden>
        <span className={classNames(styles.ring, styles.ringA)} />
        <span className={classNames(styles.ring, styles.ringB)} />
        <span className={classNames(styles.ring, styles.ringC)} />
        <span className={classNames(styles.beam, styles.beamA)} />
        <span className={classNames(styles.beam, styles.beamB)} />
        <span className={styles.aurora} />
        <span className={classNames(styles.floatDot, styles.dot1)} />
        <span className={classNames(styles.floatDot, styles.dot2)} />
        <span className={classNames(styles.floatDot, styles.dot3)} />
        <span className={classNames(styles.floatDot, styles.dot4)} />
        <span className={classNames(styles.floatDot, styles.dot5)} />
        <span className={classNames(styles.floatDot, styles.dot6)} />
        <span className={classNames(styles.sparkle, styles.sparkle1)} />
        <span className={classNames(styles.sparkle, styles.sparkle2)} />
        <span className={classNames(styles.sparkle, styles.sparkle3)} />
        <span className={classNames(styles.sparkle, styles.sparkle4)} />
      </div>

      <div className={styles.loginPanel}>
        <div className={styles.panelDecor} aria-hidden>
          <span className={styles.panelCornerTL} />
          <span className={styles.panelCornerBR} />
          <span className={styles.panelSheen} />
          <span className={styles.panelOrbA} />
          <span className={styles.panelOrbB} />
        </div>

        <div className={styles.loginBrand}>
          <div className={styles.loginLogoWrap}>
            <span className={styles.logoOrbit} aria-hidden />
            <span className={styles.logoOrbitDot} aria-hidden />
            <img className={styles.loginLogo} src="/logo.svg" alt="" />
          </div>
          <p className={styles.loginBrandMark} aria-label={brandMark}>
            {Array.from(brandMark).map((ch, i) => (
              <span
                key={`${i}-${ch}`}
                className={styles.brandChar}
                style={{ animationDelay: `${0.35 + i * 0.05}s` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </p>
          <h1 className={styles.loginTitle}>欢迎回来</h1>
          <p className={styles.loginSubtitle}>
            {mode === 'password'
              ? '输入任意账号密码即可登录（演示）'
              : '无需扫码，点击按钮即可完成示例登录'}
          </p>
        </div>

        {mode === 'password' ? (
          <Form
            className={styles.loginForm}
            name="login"
            size="large"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              className={styles.fieldEnter}
              style={{ animationDelay: '0.45s' }}
              name="username"
              rules={[
                { required: true, message: '请输入账号' },
                { whitespace: true, message: '请输入账号' },
              ]}
            >
              <Input
                prefix={<UserOutlined className={styles.loginInputIcon} />}
                placeholder="账号"
                allowClear
              />
            </Form.Item>
            <Form.Item
              className={styles.fieldEnter}
              style={{ animationDelay: '0.58s' }}
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { whitespace: true, message: '请输入密码' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.loginInputIcon} />}
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item
              className={classNames(styles.loginSubmitItem, styles.fieldEnter)}
              style={{ animationDelay: '0.72s' }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className={classNames(styles.primaryBtn, styles.loginSubmit)}
                block
                loading={loading}
              >
                <span className={styles.submitShine} aria-hidden />
                登录
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className={styles.qrBlock}>
            <div className={styles.qrFrame}>
              <QrcodeOutlined style={{ fontSize: 96, color: 'var(--app-accent)' }} />
            </div>
            <p className={styles.hint}>二维码登录仅作为模板交互示例，不连接真实扫码服务。</p>
            <Button type="primary" size="large" block loading={loading} onClick={quickLogin}>
              点击模拟扫码成功
            </Button>
          </div>
        )}

        <Button
          type="link"
          block
          className={styles.backQrLink}
          onClick={() => setMode(mode === 'password' ? 'quick' : 'password')}
        >
          {mode === 'password' ? '使用二维码登录' : '返回账号密码登录'}
        </Button>
        <p className={styles.loginHint}>演示模式：不会向服务器发送任何凭据</p>
      </div>
    </div>
  )
}

export default Login
