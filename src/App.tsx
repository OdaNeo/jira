import { UnauthenticatedApp } from './unauthenticated-app/index'
import { AuthenticatedApp } from './authenticated-app'
import { useAuth } from 'context/auth-context'
import './App.css'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/libs'

function App(): JSX.Element {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* 错误边界捕捉 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {!user ? <UnauthenticatedApp /> : <AuthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
