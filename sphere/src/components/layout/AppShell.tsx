import { Outlet, useLocation } from 'react-router-dom'
import { Background } from '@/components/layout/Background'
import { Navbar } from '@/components/layout/Navbar'
import { SphereAmbientMusic } from '@/components/layout/SphereAmbientMusic'

export function AppShell() {
  const { pathname } = useLocation()
  const hideNav = pathname === '/'

  return (
    <Background>
      <SphereAmbientMusic />
      <Outlet />
      {!hideNav && <Navbar />}
    </Background>
  )
}
