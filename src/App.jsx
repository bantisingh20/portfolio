import { useEffect } from 'react'
import './App.css'
import { motion, useScroll, useSpring } from 'framer-motion'
import Contact from './Pages/Contact'
import NavBar from './Pages/NavBar'
import Hero from './Pages/Hero'
import Experience from './Pages/Experience'
import Skill from './Pages/Skill'
import Project from './Pages/Project'
import { initGA, trackPageView } from './utils/analytics'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    initGA()
    trackPageView()
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <NavBar />
      <Hero />
      <Skill />
      <Experience />
      <Project />
      <Contact />
      <footer>
        Built by Banti Singh &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; 2026
      </footer>
    </>
  )
}

export default App
