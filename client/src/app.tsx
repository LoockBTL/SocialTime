import { FC } from 'react'
import Loggin from './pages/loggin/loggin'
import Wrapper from './components/wrapper/wrapper'
import { Routes, Route } from 'react-router-dom'
import Registration from './pages/registration/registration'
import MainPage from './pages/main/main'
import Post from './components/hoc/postHOC'
import Person from './components/hoc/personHOC'
import Group from './components/hoc/groupHOC'
import SettingsPerson from './components/person/settings/settings-person'
import SettingsGroup from './components/group/groupSettingsHOC'
import Search from './pages/search/search'

const App: FC = () => {
  return (
    <Wrapper>
      <Routes>
        <Route path="/login" element={<Loggin />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/person/:personId/*" element={<Person />} />
        <Route path="/person/:personId/settings" element={<SettingsPerson />} />
        <Route path="/group/:groupId/settings" element={<SettingsGroup />} />
        <Route path="/group/:groupId/*" element={<Group />} />
        <Route path="/search" element={<Search />} />
        <Route index element={<MainPage />} />
      </Routes>
    </Wrapper>
  )
}

export default App
