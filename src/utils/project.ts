import { useCallback, useEffect } from 'react'
import { Project } from 'screen/project-list/list'
import { clearObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp()

  const { run, ...result } = useAsync<Project[]>()

  const fetchProjects = useCallback(() => client('projects', { data: clearObject(param || {}) }), [client, param])

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [fetchProjects, param, run])

  return result
}

export const useEditProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    )
  }

  return {
    mutate,
    ...result
  }
}

export const useAddProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      })
    )
  }

  return {
    mutate,
    ...result
  }
}
