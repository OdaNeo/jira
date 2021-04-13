import { ReactNode, useCallback } from 'react'

import * as auth from 'auth-provider'
import { User } from 'screen/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils/index'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/libs'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { bootstrap, selectUser } from 'store/auth.slice'

export interface AuthForm {
  username: string
  password: string
}

// interface contextType {
//   user: User | null
//   login: (form: AuthForm) => Promise<void>
//   register: (form: AuthForm) => Promise<void>
//   logout: () => Promise<void>
// }
// refresh
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// createContext
// const AuthContext = React.createContext<contextType | undefined>(undefined)
// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isLoading, isIdle, isError, error } = useAsync<User | null>()

  // const login = (form: AuthForm) => auth.login(form).then(setUser)
  // const register = (form: AuthForm) => auth.register(form).then(setUser)
  // const logout = () => auth.logout().then(() => setUser(null))
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  useMount(() => {
    run(dispatch(bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  // return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
  return <div>{children}</div>
}

// 自定义hook
export const useAuth = () => {
  // 显示声明dispatch 返回类型
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

  return {
    user,
    login,
    register,
    logout
  }
}
