import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from './index'
import { useAsync } from 'utils/useAsync'

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }): JSX.Element => {
  // 登录/注册
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async (values: { username: string; password: string }) => {
    run(login(values)).catch(e => {
      onError(e)
    })
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" id={'username'} placeholder={'用户名'} allowClear />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'password'} placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
