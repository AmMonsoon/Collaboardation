import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx"
import LoginPage from "../pages/LoginPage/LoginPage.jsx"

function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
