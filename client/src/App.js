import "./App.css";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
// Navigate
// import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";

import { useSelector } from "react-redux";
import Signup from "./Pages/Signup/Signup";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Footer from "./layouts/Footer/Footer";

function App() {
  const { user } = useSelector((state) => state.LoginReducer);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/Home"
          element={
            <PublicRoute user={user}>
              <Home />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute user={user}>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/About"
          element={
            <PublicRoute user={user}>
              <About />
            </PublicRoute>
          }
        />
        <Route
          path="/footer"
          element={
            <PublicRoute user={user}>
              <Footer />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
