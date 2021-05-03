/** @jsxImportSource @emotion/react */

import { Input, Form } from 'antd'
import { UserSelect } from 'components/user-select'
import { ChangeEvent } from 'react'
import { Project } from 'types/project'
import { User } from '../../types/user'

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps): JSX.Element => {
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
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value: number | undefined) =>
            setParam({
              ...param,
              personId: value
            })
          }
        />
      </Form.Item>
    </Form>
  )
}
