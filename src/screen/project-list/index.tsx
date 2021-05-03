import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from '../../utils/index'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/users'
import { useProjectModal, useProjectsSearchParams } from './util'
import { Row } from 'components/libs'
import { ButtonNoPadding } from 'components/libs'
import { ErrorBox } from 'components/libs'
export const ProjectListScreen = (): JSX.Element => {
  useDocumentTitle('任务列表', false)

  // 当param 是基本类型的时候，不会出现循环渲染，
  // 当param 是引用类型的时候，由于地址不同，会重复渲染
  const [param, setParam] = useProjectsSearchParams()
  const { open } = useProjectModal()

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))

  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

// 页面重复渲染问题
ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`
