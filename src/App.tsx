import { AnimatePresence, MotionConfig } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { ProjectDetailsPage } from './pages/ProjectDetails'

function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}

export default App
