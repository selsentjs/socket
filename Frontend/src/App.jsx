import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          {/* Check if the user is logged in (authUser is truthy)
                 If logged in, render the Home component
                   If not logged in, redirect to the login page 
          */}
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
