import { ApiOutlined, AppstoreAddOutlined, KeyOutlined } from '@ant-design/icons'
import type { LayoutMenuConfig } from '@hezebin/doraemon'

export const menuConfig: LayoutMenuConfig = [
  { icon: <ApiOutlined />, key: 'api', label: 'API' },
  { icon: <KeyOutlined />, key: 'token', label: 'usingToken' },
  {
    icon: <AppstoreAddOutlined />,
    key: 'component',
    label: '组件',
    children: [
      { key: 'test', label: 'Test' },
      { key: 'captcha_input', label: 'CaptchaInput 验证码' },
      { key: 'icon', label: 'Icon 图标' },
      { key: 'layout', label: 'Layout 布局' },
      { key: 'animate', label: 'Animate 动画效果' },
      { key: 'upload', label: 'Upload 文件上传' },
      // { key: 'code_preview', label: 'CodePreView 代码预览' },
      { key: 'typewriter', label: 'Typewriter 打字机' },
      { key: 'tag_cloud', label: 'TagCloud 标签云' },
    ],
  },
  {
    icon: <AppstoreAddOutlined />,
    key: 'hook',
    label: 'Hook',
    children: [{ key: 'use_obj_state', label: 'useObjState' }],
  },
]
