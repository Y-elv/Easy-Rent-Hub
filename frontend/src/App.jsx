
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import AuthVerification from './pages/AuthVerification';
import HomePage from './pages/HomePage';
import CardDetails from './pages/CardDetails';
import SignUp from './pages/Signup';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-verification" element={<AuthVerification />} />
        <Route path="/card/:id" element={<CardDetails />}/>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );

}

export default App
