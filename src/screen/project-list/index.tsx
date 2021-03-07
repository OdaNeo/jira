import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState, useEffect } from 'react'
import * as qs from 'qs'
import { clearObject } from '../../utils/index'

export const ProjectListScreen = (): JSX.Element => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([] as Array<{ id: number; name: string }>)

  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects?${qs.stringify(clearObject(param))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  )
}
