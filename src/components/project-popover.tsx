import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useProject } from 'utils/project'
import { ButtonNoPadding } from 'components/libs'
import { useDispatch } from 'react-redux'
import { projectListAction } from 'screen/project-list/project-list.slice'
export const ProjectPopover = () => {
  const dispatch = useDispatch()

  const { data: projects } = useProject()
  const pinnedProject = projects?.filter(project => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={() => dispatch(projectListAction.openProjectModel())} type={'link'}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
