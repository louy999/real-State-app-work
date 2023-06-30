import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Login from './components/login/login'
import Projects from './components/projects/projects'
import SpProjects from './components/projects/sp.projects'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Navigate to='/projects' />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:projectId' element={<SpProjects />} />
      </Routes>
    </div>
  )
}

export default App
