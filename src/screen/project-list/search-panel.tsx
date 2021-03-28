/** @jsxImportSource @emotion/react */

import { Input, Select, Form } from 'antd'
import { ChangeEvent } from 'react'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps): JSX.Element => {
  return (
    <Form layout={'inline'} css={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          value={param.name}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
          type="text"
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user: User) => (
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
