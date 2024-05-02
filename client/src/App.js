import "./App.css";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";

// Navigate
// import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";
import Updatenamejob from "./Pages/Updatejobname/Updatenamejob";
import { useSelector } from "react-redux";
import Signup from "./Pages/SignUp/Signup";
import Listuser from "./Pages/List user/Listuser";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Listjob from "./Pages/ListJobName/ListJob";
import Addjobname from "./Pages/Addjobnamelist/Addjobname";
import Listproject from "./Pages/Listproject/Listproject";
import Updateproject from "./Pages/Updateproject/Updateproject";
import Addproject from "./Pages/Addprojet/Addprojet";
import Profilhandmade from "./Pages/Profilhandmade/Profilhandmade";
import Listdemandehandmade from "./Pages/Listdemandehandmade/Listdemandehandmade";
import Listuserhandmade from "./Pages/Listuserhandmade/Listuserhandmade";

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
          path="/listuser"
          element={
            <PublicRoute user={user}>
              <Listuser />
            </PublicRoute>
          }
        />
        <Route
          path="/listjobname"
          element={
            <PublicRoute user={user}>
              <Listjob />
            </PublicRoute>
          }
        />
        <Route
          path="/Updatenamejob"
          element={
            <PublicRoute user={user}>
              <Updatenamejob />
            </PublicRoute>
          }
        />
        <Route
          path="/Addjobname"
          element={
            <PublicRoute user={user}>
              <Addjobname />
            </PublicRoute>
          }
        />
        <Route
          path="/Listproject"
          element={
            <PublicRoute user={user}>
              <Listproject />
            </PublicRoute>
          }
        />
        <Route
          path="/Updateproject"
          element={
            <PublicRoute user={user}>
              <Updateproject />
            </PublicRoute>
          }
        />
        <Route
          path="/Addproject"
          element={
            <PublicRoute user={user}>
              <Addproject />
            </PublicRoute>
          }
        />
        <Route
          path="/Profilhandmade"
          element={
            <PublicRoute user={user}>
              <Profilhandmade />
            </PublicRoute>
          }
        />
        <Route
          path="/Listdemandehandmade"
          element={
            <PublicRoute user={user}>
              <Listdemandehandmade />
            </PublicRoute>
          }
        />

        <Route
          path="/Listuserhandmade"
          element={
            <PublicRoute user={user}>
              <Listuserhandmade />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
