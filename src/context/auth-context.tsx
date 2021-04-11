import React, { ReactNode, useContext } from 'react'

import * as auth from 'auth-provider'
import { User } from 'screen/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils/index'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/libs'

interface AuthForm {
  username: string
  password: string
}

interface contextType {
  user: User | null
  login: (form: AuthForm) => Promise<void>
  register: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}
// refresh
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// createContext
const AuthContext = React.createContext<contextType | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { run, isLoading, isIdle, isError, setData: setUser, data: user, error } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

// 自定义hook
export const useAuth = (): contextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth必须在AuthProvider中使用`)
  }

  return context
}
