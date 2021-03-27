/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Project } from 'screen/project-list/list'
import { clearObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './useAsync'

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp()

  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', { data: clearObject(param || {}) }))
  }, [param])

  return result
}
