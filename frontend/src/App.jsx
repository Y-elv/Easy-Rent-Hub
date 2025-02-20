
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import AuthVerification from './pages/AuthVerification';
import HomePage from './pages/HomePage';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-verification" element={<AuthVerification />} />
      </Routes>
    </div>
  );

}

export default App
