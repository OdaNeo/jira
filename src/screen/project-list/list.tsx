import { Dropdown, Table, TableProps, Menu } from 'antd'
import { ButtonNoPadding } from 'components/libs'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/project'
import { projectListAction } from './project-list.slice'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface Users {
  id: number
  name: string
}

interface ListProps extends TableProps<Project> {
  users: Users[]
  refresh?: () => void
}

export const List = ({ users, ...props }: ListProps): JSX.Element => {
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
  const dispatch = useDispatch()

  return (
    <Table
      pagination={false}
      rowKey={'id'}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>
          }
        },
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
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
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>
                      <ButtonNoPadding onClick={() => dispatch(projectListAction.openProjectModel())} type={'link'}>
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
      {...props}
    ></Table>
  )
}
