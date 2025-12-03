import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx"
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import RequireAuth from "../components/RequireAuth.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
            } />
            
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />}/>
      </Routes>
    </>
  );
}

export default App;
