import './App.css'
import Contact from './Pages/Contact'
import NavBar from './Pages/NavBar'
import Hero from './Pages/Hero'
import Experience from './Pages/Experience'
import Skill from './Pages/Skill'
import Project from './Pages/Project'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // cleanup
  }, []);

  return (
    <>
      <NavBar />
      <Hero />
      <Skill />
      <Experience />
      <Project />
      <Contact />
      <footer>
        Built by Banti Singh &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; 2025
      </footer>
    </>
  )
}

export default App
