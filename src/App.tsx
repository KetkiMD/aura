import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import MyAesthetic from './pages/MyAesthetic'
import Explore from './pages/Explore'
import MySpace from './pages/MySpace'
import Match from './pages/Match'
import Login from './pages/Login'
import Music from './pages/Music'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="me" element={<MyAesthetic />} />
        <Route path="explore" element={<Explore />} />
        <Route path="space" element={<MySpace />} />
        <Route path="music" element={<Music />} />
        <Route path="match" element={<Match />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
