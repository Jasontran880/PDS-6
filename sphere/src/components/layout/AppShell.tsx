import { Outlet, useLocation } from 'react-router-dom'
import { Background } from '@/components/layout/Background'
import { Navbar } from '@/components/layout/Navbar'

export function AppShell() {
  const { pathname } = useLocation()
  const hideNav = pathname === '/'

  return (
    <Background>
      <Outlet />
      {!hideNav && <Navbar />}
    </Background>
  )
}
