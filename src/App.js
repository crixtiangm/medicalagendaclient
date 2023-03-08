import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Auth, ForgotPass, Home } from './pages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
