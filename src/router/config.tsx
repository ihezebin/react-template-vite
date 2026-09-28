/* eslint-disable react-refresh/only-export-components -- route module intentionally owns lazy page declarations */
import { lazy, Suspense, type ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import PageLoading from '../components/PageLoading'

import { GuestOnly, RequireAuth } from './AuthGate'

const Landing = lazy(() => import('../page/Landing'))
const Login = lazy(() => import('../page/Login'))
const LoggedLayout = lazy(() => import('../layout/LoggedLayout'))
const BuildAnimation = lazy(() => import('../page/BuildAnimation'))
const EmptyHome = lazy(() => import('../page/EmptyHome'))
const Forbidden = lazy(() => import('../page/Forbidden'))
const Nothing = lazy(() => import('../page/Nothing'))
const Test = lazy(() => import('../page/Test'))
const ContentLoading = lazy(() => import('../components/ContentLoading'))
const NiceEmpty = lazy(() => import('../components/NiceEmpty'))

const withPageLoading = (node: ReactNode, fullscreen = false) => (
  <Suspense fallback={<PageLoading fullscreen={fullscreen} />}>{node}</Suspense>
)

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: withPageLoading(<Landing />, true),
  },
  {
    path: 'login',
    element: withPageLoading(
      <GuestOnly>
        <Login />
      </GuestOnly>,
      true,
    ),
  },
  {
    path: 'console',
    element: withPageLoading(
      <RequireAuth>
        <LoggedLayout />
      </RequireAuth>,
    ),
    children: [
      { index: true, element: <Navigate to={'example/home_animation'} replace /> },
      { path: 'example/home_animation', element: <EmptyHome /> },
      { path: 'example/build_animation', element: <BuildAnimation /> },
      { path: 'example/page_loading', element: <PageLoading /> },
      { path: 'example/content_loading', element: <ContentLoading /> },
      { path: 'example/empty', element: <NiceEmpty /> },
      { path: 'need_auth', element: <Test /> },
      { path: 'test/:id', element: <Test /> },
      { path: 'nothing', element: <Nothing /> },
      { path: 'forbidden', element: <Forbidden /> },
      { path: '*', element: <Navigate to={'nothing'} replace /> },
    ],
  },
  {
    path: '*',
    element: withPageLoading(<Nothing fullscreen />, true),
  },
]
