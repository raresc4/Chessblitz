import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Chessboard2  from './Components/Chessboard2.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import LoginPage from './Components/LoginPage.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chessboard2 />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter >   
  );
}
