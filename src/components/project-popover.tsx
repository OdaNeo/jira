import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from 'components/libs'
import { useProjectModal } from 'screen/project-list/util'

export const ProjectPopover = () => {
  const { data: projects, refetch } = useProjects()
  const pinnedProject = projects?.filter(project => project.pin)
  const { open } = useProjectModal()

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
      <ButtonNoPadding onClick={open} type={'link'}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
