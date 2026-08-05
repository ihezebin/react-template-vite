import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import LoggedLayout from '../layout/LoggedLayout'
import Test from '../page/Test'
import EmptyHome from '../page/EmptyHome'
import BuildAnimation from '../page/BuildAnimation'
import Forbidden from '../page/Forbidden'
import Nothing from '../page/Nothing'
import Login from '../page/Login'
import PageLoading from '../components/PageLoading'

import { GuestOnly, RequireAuth } from './AuthGate'

export const routeConfig: RouteObject[] = [
  {
    path: 'login',
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
  },
  {
    element: (
      <RequireAuth>
        <LoggedLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to={'example/home_animation'} replace /> },
      { path: 'example/home_animation', element: <EmptyHome /> },
      { path: 'example/build_animation', element: <BuildAnimation /> },
      { path: 'example/page_loading', element: <PageLoading /> },
      { path: 'need_auth', element: <Test /> },
      { path: 'test/:id', element: <Test /> },
      { path: 'nothing', element: <Nothing /> },
      { path: 'forbidden', element: <Forbidden /> },
      { path: '*', element: <Navigate to={'nothing'} replace /> },
    ],
  },
]
