import UserProvider from "./providers/AuthContext.js"
import { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/views/ApplicationViews";
import NavBar from "./components/nav/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import Footer from "./components/footer/Footer";
import Landing from "./pages/landing/layouts";
import Routes from "./routes/Routes.js";
import Context from "./providers/Context.js";


export default function Indielot() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user is null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);
  
  // hold render until definite logged-in state is fetched
  if (loggedInUser === undefined) {
    return <Spinner />;
  }
  
  /* return (
    <Routes>
      <Route path="/">
        <Route index element={<Landing />}/>
        <Route path="login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        <Route path="register" element={<Register />}/>
      </Route>

      <Route path="*" element={
        <AuthorizedRoute loggedInUser={loggedInUser}>
          <>
            <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <ApplicationViews loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <Footer/>
          </>
        </AuthorizedRoute>
      }/>
    </Routes>
  ) */

  return (
    <Context>
      <Routes />
    </Context>
  )
}
