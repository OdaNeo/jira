import { useAuth } from 'context/auth-context'
import './App.css'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback, FullPageLoading } from 'components/libs'
import React from 'react'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app/index'))

function App(): JSX.Element {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* 错误边界捕捉 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {!user ? <UnauthenticatedApp /> : <AuthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
