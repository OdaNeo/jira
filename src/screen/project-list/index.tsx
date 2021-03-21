/* eslint-disable react-hooks/exhaustive-deps */
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState, useEffect } from 'react'
import { clearObject, useDebounce } from '../../utils/index'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export const ProjectListScreen = (): JSX.Element => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([] as Array<{ id: string; name: string }>)
  const [list, setList] = useState([])
  const client = useHttp()
  const debouncedParam = useDebounce(param, 200)

  useEffect(() => {
    client('projects', { data: clearObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useEffect(() => {
    client('users').then(setUsers)
  }, [])
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
