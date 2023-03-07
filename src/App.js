import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Auth, ForgotPass } from './pages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Auth/>} />
        <Route path='/forgot-password' element={<ForgotPass/>} />
      </Routes>
    </div>
  );
}

export default App;
