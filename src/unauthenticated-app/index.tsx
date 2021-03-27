import { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import { Card, Divider, Button, Typography } from 'antd'
import styled from '@emotion/styled'

export const UnauthenticatedApp = (): JSX.Element => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  return (
    <Container>
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Button type={'text'} onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? '登录' : '注册'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  text-align: center;
`
