import { BrowserRouter } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'

import Loading from '../assets/images/loading.png'
import { unsubscribeStore } from '../store'

const LazyComponent = lazy(() => import('./Router'))

const LazyRouter = () => {
  useEffect(() => {
    return () => {
      unsubscribeStore()
    }
  }, [])

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div id={'loading'}>
            <img src={Loading} alt="loading" />
          </div>
        }>
        <LazyComponent />
      </Suspense>
    </BrowserRouter>
  )
}
export default LazyRouter
