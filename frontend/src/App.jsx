
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import AuthVerification from './pages/AuthVerification';
import HomePage from './pages/HomePage';
import CardDetails from './pages/CardDetails';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-verification" element={<AuthVerification />} />
        <Route path="/card/:id" element={<CardDetails />}/>
      </Routes>
    </div>
  );

}

export default App
