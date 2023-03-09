import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Auth, ForgotPass, Home, LogoutPage } from './pages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/' element={<Home />} />
        <Route path='/logout' element={<LogoutPage />} />

        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
