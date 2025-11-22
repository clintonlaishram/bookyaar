import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Toaster } from 'sonner'
import Layout from './Layout'
import Home from './pages/Home'
import TeacherRegister from './pages/TeacherRegister'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout> <Home /> </Layout>}/>
          <Route path="/tutor-register" element={<Layout> <TeacherRegister /></Layout>}/>
        </Routes>
      </Router>

      <Toaster />
    </>
  )
}

export default App
