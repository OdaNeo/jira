/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const clearObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj }
  Object.keys(result).forEach(key => {
    const value = obj[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

// useDebounce
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return debounceValue
}

// react-helmet
export const useDocumentTitle = (title: string, keepOnUnMount = true) => {
  // 页面加载： _oldTitle==='Jira任务管理系统'
  // 页面加载后：_oldTitle=== '新 title'
  const _oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  // 组件被卸载的时候调用
  useEffect(() => {
    return () => {
      if (!keepOnUnMount) {
        // 闭包，读到了旧的title
        document.title = _oldTitle
      }
    }
  }, [title])
}

// reset router
export const resetRoute = () => {
  window.location.href = window.location.origin
}

// 返回组件挂载状态
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
