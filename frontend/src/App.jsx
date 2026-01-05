import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";

const App = () => {

  const {user} = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <LoginPage/>}/>
        <Route path="/register" element={user ? <Navigate to={"/"}/> :  <RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
