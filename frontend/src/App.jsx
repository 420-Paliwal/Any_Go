import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
// import { UserContext } from './context/UserContext.jsx'
import UserContext from './context/UserContext.jsx'
import Start from './pages/Start.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
// import UserProfile from './pages/UserProfile'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectWrapper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
const App = () => {

  useContext(UserContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/Home" element={<UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>} />
        <Route path="/UserLogin" element={<UserLogin/> } />
        <Route path="/CaptainLogin" element={<CaptainLogin/> } />
        <Route path="/UserSignup" element={<UserSignup/>} />
        <Route path="/CaptainSignup" element={<CaptainSignup/>} />
        <Route path="/captain-home" element={<CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>} />
        <Route path="/UserLogout" element={<UserLogout/>} />
        <Route path="/CaptainLogout" element={<CaptainLogout/>} />
      </Routes>
    </div>
  )
}

export default App