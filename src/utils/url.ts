import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { clearObject } from 'utils'

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  return [
    useMemo(() => {
      return keys.reduce((prev: { [key in K]: string }, key: K) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]),
    (param: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(param)
    }
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (params: { [key in string]: unknown }) => {
    // iterator 遍历器
    const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
    return setSearchParams(o)
  }
}
