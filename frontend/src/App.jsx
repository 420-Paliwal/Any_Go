import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import { UserContext } from './context/UserContext1.jsx'
// import UserProfile from './pages/UserProfile'
const App = () => {

  useContext(UserContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/userLogin" element={<UserLogin/> } />
        <Route path="/CaptainLogin" element={<CaptainLogin/> } />
        <Route path="/UserSignup" element={<UserSignup/>} />
        <Route path="/CaptainSignup" element={<CaptainSignup/>} />
      </Routes>
    </div>
  )
}

export default App