import { useContext, useState } from "react";
import "./Login.css";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { FormFeedback, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Managers/AuthManager";
import { AuthContext } from "../../context/AuthContext";

export default function Login({}) {
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const [failedLogin, setFailedLogin] = useState(false);

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    // Function to handle input changes
    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    // Function to login
    const handleSubmit = (e) => {
        e.preventDefault();

        login(formValues.email, formValues.password).then((user) => {
            if (!user) { // If user doesn't exist
                setFailedLogin(true);
            } else {
                authContext.setUser(user.profile);
                authContext.setToken(user.token);
                authContext.setAuthenticated(true);
                navigate("/");
            }
        })
    };

    return (
        <main className="loginPage">
            <div className="backgroundContainer"></div>
            <section className="loginContainer">
                <form className="loginForm">
                    <div className="loginLogoContainer">
                        <img className="loginLogo" src="/logo.png" />
                    </div>
                    <section className="formInputs">
                        <fieldset className="formGroup">
                            <label className="formSubhead" htmlFor="email"><b>Email</b></label>
                            <div className="inputWrapper">
                                <BiEnvelope className="inputIcon"/>
                                <Input
                                    required
                                    className="inputForm"
                                    name="email"
                                    placeholder="Enter Email"
                                    invalid={failedLogin}
                                    type="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="formGroup">
                            <label className="formSubhead" htmlFor="password"><b>Password</b></label>
                            <div className="inputWrapper">
                                <BiLock className="inputIcon"/>
                                <Input
                                    required
                                    className="inputForm"
                                    placeholder="Enter Password"
                                    name="password"
                                    invalid={failedLogin}
                                    type="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormFeedback>Login failed.</FormFeedback>
                        </fieldset>
                        <fieldset>
                            <button className="formButton" type="submit" onClick={handleSubmit}>
                                LOGIN
                            </button>
                        </fieldset>
                        <section className="formLinkContainer">
                            Not a member? <Link className="formLink" to="/register">JOIN NOW</Link>
                        </section>
                    </section>
                </form>
            </section>
        </main>
    )
}