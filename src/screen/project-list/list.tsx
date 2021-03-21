import { Table } from 'antd'
import dayjs from 'dayjs'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface Users {
  id: string
  name: string
}

interface ListProps {
  list: Project[]
  users: Users[]
}

export const List = ({ users, list }: ListProps): JSX.Element => {
  return (
    <Table
      pagination={false}
      rowKey={'id'}
      columns={[
        { title: '名称', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: '部门', dataIndex: 'organization' },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users.find((user: Users) => user.id === project.personId)?.name || '未知'}</span>
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
          }
        }
      ]}
      dataSource={list}
    ></Table>
  )
}
