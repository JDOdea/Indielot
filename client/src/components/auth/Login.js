import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import "./Login.css";
import { BiEnvelope, BiLock } from "react-icons/bi"
import { UserContext } from "../../providers/AuthContext";
import userActions from "../../utils/userActions";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const userContext = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        /* setLoggedInUser(user); */
        userActions.fetchUser()
          .then((res) => {
            userContext.setUser(res.profile);
            userContext.setToken(res.token);
            userContext.setAuthenticated(res !== null);
          })
        navigate("/");
      }
    });
  };

  return (
    <main className="loginPage">
      <div className="background__container"></div>
      <div className="login__container">
        <section>
          <form className="login__form">
            <img className="login__logo" src="/logo.png"/>
            <fieldset className="form__group">
              
              <label className="form__subhead" htmlFor="email"><b>Email</b></label>
              
              <div className="input__wrapper">
                <BiEnvelope className="input__icon"/>
                <Input 
                  required
                  className="input__form"
                  name="email"
                  placeholder="Enter Email"
                  invalid={failedLogin}
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setFailedLogin(false);
                    setEmail(e.target.value);
                  }}
                />
              </div>

            </fieldset>
            
            <fieldset className="form__group">

              <label className="form__subhead" htmlFor="password"><b>Password</b></label>

              <div className="input__wrapper">
                <BiLock className="input__icon"/>
                <Input
                  required
                  className="input__form"
                  placeholder="Enter Password"
                  name="password"
                  invalid={failedLogin}
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setFailedLogin(false);
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <FormFeedback>Login failed.</FormFeedback>
            
            </fieldset>

            <fieldset>
              
              <button className="form__button" type="submit" onClick={handleSubmit}>
                LOGIN
              </button>

            </fieldset>
          </form>
        </section>
        <section className="form_linkContainer">
          <Link className="form__link" to="/register">Join Now</Link>
        </section>
      </div>
    </main>
  )
}
