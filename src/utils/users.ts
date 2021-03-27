/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { User } from 'screen/project-list/search-panel'
import { useHttp } from './http'
import { useAsync } from './useAsync'
import { clearObject } from 'utils'

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp()

  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client('users', { data: clearObject(params || {}) }))
  }, [params])

  return result
}
