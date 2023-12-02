import { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import Routes from "./routes/Routes.js";
import Context from "./context/Context.js";
/* import { Route, Routes } from "react-router-dom"; */


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
  
 /*  return (
    <Routes>
      {!loggedInUser && (
        <Route path="/">
          <Route index element={<Landing />}/>
          <Route path="login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
          <Route path="register" element={<Register />}/>
        </Route>
      )}

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
