import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './contexts/App'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'
import LogoutPage from './pages/Logout'

function App() {
  
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/logout' element={<LogoutPage/>}/>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
