import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Input } from "reactstrap";
import { BiEnvelope, BiLock } from "react-icons/bi";
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { register } from "../../services/Managers/AuthManager";

export default function Signup({}) {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState();

    const navigate = useNavigate();
    const userContext = useContext(AuthContext);

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formValues.password !== confirmPassword) {
            setPasswordMismatch(true);
        } else {
            const newUser = {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                userName: formValues.username,
                email: formValues.email,
                password: formValues.password
            };

            register(newUser).then((user) => {
                userContext.setUser(user);
                navigate("/");
            })
        }
    };

    return (
        <main className="signupPage">
            <div className="backgroundContainer"></div>
            <section className="signupContainer">
                <form className="signupForm">
                    <div className="signupLogoContainer">
                        <img className="signupLogo" src="/logo.png" alt="logo"/>
                    </div>
                    <div className="signupInputWrapper">
                        <fieldset className="formGroup leftInput">
                            <label className="formSubhead" htmlFor="firstName"><b>First Name</b></label>
                            <div className="inputWrapper">
                                <CreateIcon className="inputIcon"/>
                                <Input 
                                    required
                                    className="inputForm"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    type="text"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="formGroup">
                            <label className="formSubhead" htmlFor="lastName"><b>Last Name</b></label>
                            <div className="inputWrapper">
                                <CreateIcon className="inputIcon"/>
                                <Input
                                    required
                                    className="inputForm"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    type="text"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div className="signupInputWrapper">
                        <fieldset className="formGroup leftInput">
                            <label className="formSubhead" htmlFor="username"><b>Username</b></label>
                            <div className="inputWrapper">
                                <PersonIcon className="inputIcon"/>
                                <Input 
                                    required
                                    className="inputForm"
                                    name="username"
                                    placeholder="Enter Username"
                                    type="text"
                                    value={formValues.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="formGroup">
                            <label className="formSubhead" htmlFor="email"><b>Email</b></label>
                            <div className="inputWrapper">
                                <BiEnvelope className="inputIcon"/>
                                <Input
                                    required
                                    className="inputForm"
                                    name="email"
                                    placeholder="Enter Email"
                                    type="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div className="signupInputWrapper">
                        <fieldset className="formGroup leftInput">
                            <label className="formSubhead" htmlFor="password"><b>Password</b></label>
                            <div className="inputWrapper">
                                <BiLock className="inputIcon"/>
                                <Input
                                    required
                                    className="inputForm"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="formGroup">
                            <label className="formSubhead" htmlFor="confirm"><b>Confirm Password</b></label>
                            <div className="inputWrapper">
                                <BiLock className="inputIcon"/>
                                <Input 
                                    required
                                    className="inputForm"
                                    name="confirm"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    invalid={passwordMismatch}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                            </div>
                        </fieldset>
                    </div>
                </form>
                <section className="signupDisclaimerContainer">
                    <span className="signupDisclaimer">
                        By clicking Sign Up, you agree to our <a className="formLink">Terms of Service</a>, <a className="formLink">Privacy Policy</a>, and <a className="formLink">Cookies Policy</a>.
                    </span>
                </section>
                <div className="buttonContainer">
                    <button className="formSignupButton" type="submit" disabled={passwordMismatch} onClick={handleSubmit}>
                        SIGN UP
                    </button>
                </div>
                <div className="linkContainer">
                    <span className="loginLink">
                        Already signed up? Log in <Link className="formLink" to="/login">here</Link>
                    </span>
                </div>
            </section>
        </main>
    )
}