import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screen/project-list/index'
import { Row } from 'components/libs'
import { Dropdown, Menu, Button } from 'antd'
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ProjectScreen } from 'screen/project/index'
import { resetRoute } from 'utils'
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />}></Route>
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
            <Navigate to={'/projects'} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { user, logout } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={'link'} onClick={resetRoute}>
          <h2>Logo</h2>
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type={'link'} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={'link'}>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
