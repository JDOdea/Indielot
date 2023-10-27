import { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/ApplicationViews";
import NavBar from "./components/nav/NavBar";

function App() {
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
  
  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <ApplicationViews 
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  );
}

export default App;
