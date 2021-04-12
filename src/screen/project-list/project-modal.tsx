import { Button, Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { projectListAction, selectProjectModalOpen } from './project-list.slice'

export const ProjectModal = () => {
  const dispatch = useDispatch()

  const projectModelOpen = useSelector(selectProjectModalOpen)

  return (
    <Drawer onClose={() => dispatch(projectListAction.closeProjectModel())} visible={projectModelOpen} width={'100%'}>
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListAction.closeProjectModel())}>关闭</Button>
    </Drawer>
  )
}
