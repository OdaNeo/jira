import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from '../../utils/index'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/users'
import { useProjectsSearchParams } from './util'
import { Row } from 'components/libs'

export const ProjectListScreen = (prop: { projectButton: JSX.Element }): JSX.Element => {
  useDocumentTitle('任务列表', false)

  // 当param 是基本类型的时候，不会出现循环渲染，
  // 当param 是引用类型的时候，由于地址不同，会重复渲染
  const [param, setParam] = useProjectsSearchParams()

  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 200))

  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {prop.projectButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List
        projectButton={prop.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  )
}

// 页面重复渲染问题
ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
