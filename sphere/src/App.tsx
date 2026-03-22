import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { BlogFolderPage } from '@/pages/BlogFolderPage'
import { BlogPage } from '@/pages/BlogPage'
import { ComponentDemoPage } from '@/pages/ComponentDemoPage'
import { ExplorePage } from '@/pages/ExplorePage'
import { HangoutsPage } from '@/pages/HangoutsPage'
import { LanderPage } from '@/pages/LanderPage'
import { PersonalProfilePage } from '@/pages/PersonalProfilePage'
import { SocialCirclePage } from '@/pages/SocialCirclePage'
import { SphereTitleCard } from '@/pages/SphereTitleCard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<LanderPage />} />
          <Route
            path="/outersphere"
            element={<SphereTitleCard title="Innersphere" nextTo="/social" />}
          />
          <Route path="/social" element={<SocialCirclePage />} />
          <Route path="/profile/view/:userId" element={<PersonalProfilePage />} />
          <Route path="/profile" element={<PersonalProfilePage isOwnProfile />} />
          <Route
            path="/innersphere"
            element={<SphereTitleCard title="Outersphere" nextTo="/hangouts" />}
          />
          <Route path="/hangouts" element={<HangoutsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/folder/:folderId" element={<BlogFolderPage />} />
          <Route path="/dev/components" element={<ComponentDemoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
