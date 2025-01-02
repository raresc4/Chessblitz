import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chessboard2 from "./Pages/Chessboard2.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import HomePage from "./Pages/HomePage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chessboard2 />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
