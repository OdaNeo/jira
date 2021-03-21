import { UnauthenticatedApp } from './unauthenticated-app/index'
import { AuthenticatedApp } from './authenticated-app'
import { useAuth } from 'context/auth-context'
import './App.css'

function App(): JSX.Element {
  const { user } = useAuth()
  return <div className="App">{!user ? <UnauthenticatedApp /> : <AuthenticatedApp />}</div>
}

export default App
