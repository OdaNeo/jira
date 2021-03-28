import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from '../../utils/index'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/users'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = (): JSX.Element => {
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  // 当param 是基本类型的时候，不会出现循环渲染，
  // 当param 是引用类型的时候，由于地址不同，会重复渲染

  const [param, setParam] = useUrlQueryParam(keys)

  const debouncedParam = useDebounce(param, 200)

  const { isLoading, error, data: list } = useProject(debouncedParam)

  const { data: users } = useUsers()

  useDocumentTitle('任务列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

// 页面重复渲染问题
ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
