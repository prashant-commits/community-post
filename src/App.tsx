import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import AppProvider from './contexts/App'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
