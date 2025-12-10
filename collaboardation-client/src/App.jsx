import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx"
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import RequireAuth from "../components/RequireAuth.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import AppLayout from "../components/AppLayout/AppLayout.jsx";
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />}/>

          <Route path="/" element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
            } 
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:id" element={<ProjectPage />}/>
          </Route> 
      </Routes>
    </>
  );
}

export default App;
