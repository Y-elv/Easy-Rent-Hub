
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import AuthVerification from './pages/AuthVerification';
import HomePage from './pages/HomePage';
import CardDetails from './pages/CardDetails';
import SignUp from './pages/Signup';
import { ToastContainer } from "react-toastify";
import VerifyEmail from './pages/VerifyEmail';
import HostPage from './pages/HostPage';
import ProtectedRoute from './components/ProtectedRoute';
import Pending from './pages/Pending';

function App() {
  

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authVerification" element={<AuthVerification />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/hosts" element={<HostPage />} />
          <Route path="/pending" element={<Pending/>} />
        </Route>
      </Routes>
    </div>
  );

}

export default App
