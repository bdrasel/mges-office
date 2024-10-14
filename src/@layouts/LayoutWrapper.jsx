'use client'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'
import PrivateRoute from '@/components/PrivateRoute'
import useAuthCheck from '@/hooks/useAuthCheck'

const LayoutWrapper = props => {
  // Props
  const { systemMode, verticalLayout, horizontalLayout } = props

  // Hooks
  const { settings } = useSettings()

  useLayoutInit(systemMode)

  const authChecked = useAuthCheck()

  return !authChecked ? (
    <div>Checking Authentication...</div>
  ) : (
    <PrivateRoute>
      <div className='flex flex-col flex-auto' data-skin={settings.skin}>
        {settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}
      </div>
    </PrivateRoute>
  )
}

export default LayoutWrapper
