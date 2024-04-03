import "./App.css";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
// Navigate
// import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";

import { useSelector } from "react-redux";
import Signup from "./Pages/SignUp/Signup";

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
          path="/signup"
          element={
            <PublicRoute user={user}>
              <Signup />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
