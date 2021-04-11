import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screen/project-list/index'
import { Row } from 'components/libs'
import { Dropdown, Menu, Button } from 'antd'
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ProjectScreen } from 'screen/project/index'
import { ProjectModal } from 'screen/project-list/project-modal'
import { resetRoute } from 'utils'
import { useState } from 'react'
import { ProjectPopover } from 'components/project-popover'
import { ButtonNoPadding } from 'components/libs'

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path={'/projects'}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            ></Route>
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
            <Navigate to={'/projects'} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}></ProjectModal>
    </Container>
  )
}

const PageHeader = (prop: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <h2>Logo</h2>
        </ButtonNoPadding>
        <ProjectPopover {...prop} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()

  return (
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
