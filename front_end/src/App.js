import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import {BrowserRouter as Router, Route, Switch, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
