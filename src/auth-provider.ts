import { User } from 'screen/project-list/search-panel'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handelUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response: Response) => {
    if (response.ok) {
      return handelUserResponse(await response.json())
    } else {
      return Promise.reject(response)
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response: Response) => {
    if (response.ok) {
      return handelUserResponse(await response.json())
    } else {
      return Promise.reject(response)
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)
