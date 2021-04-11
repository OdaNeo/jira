import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { clearObject } from 'utils'

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return [
    useMemo(() => {
      return keys.reduce((prev: { [key in K]: string }, key: K) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]),
    (param: Partial<{ [key in K]: unknown }>) => {
      // iterator 遍历器
      const o = clearObject({ ...Object.fromEntries(searchParams), ...param }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}
