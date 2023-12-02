import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import authActions from "../../../utils/actions/authActions";
import { AuthContext } from "../../../context/AuthContext";

export default function SignupPanel({}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 

    const [passwordMismatch, setPasswordMismatch] = useState();

    const navigate = useNavigate();
    const userContext = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
        } else {
            const newUser = {
                firstName,
                lastName,
                userName,
                email,
                password
            };
            authActions.register(newUser).then((user) => {
                userContext.setUser(user);
            })
        }
    }

    return (
        <>
            <section>
                <form className="signupForm">
                    <div className="signupLogo__container">
                        <img className="signupLogo" src="/logo.png"/>
                    </div>
                    <div className="name__container">
                        <fieldset className="formGroup firstName">
                            <label className="formSubhead" htmlFor="firstName"><b>First Name</b></label>

                            <div className="inputWrapper">

                                <Input 
                                    required
                                    className="inputForm"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                            </div>
                        </fieldset>

                        <fieldset className="formGroup">
                            <label className="formSubhead" htmlFor="lastName"><b>Last Name</b></label>
                            <div className="inputWrapper">

                                <Input 
                                    required
                                    className="inputForm"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </div>
                        </fieldset>
                    </div>

                    <fieldset className="formGroup">
                        <label className="formSubhead" htmlFor="userName"><b>Username</b></label>
                        <div className="inputWrapper">

                            <Input
                                required
                                className="inputForm"
                                name="userName"
                                placeholder="Enter Username"
                                type="text"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="formGroup">
                        <label className="formSubhead" htmlFor="email"><b>Email</b></label>
                        <div className="inputWrapper">

                            <Input 
                                required
                                className="inputForm"
                                name="email"
                                placeholder="Enter Email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="formGroup">
                        <label className="formSubhead" htmlFor="password"><b>Password</b></label>
                        <div className="inputWrapper">

                            <Input
                                required
                                className="inputForm"
                                name="password"
                                placeholder="Enter Password"
                                type="password"
                                value={password}
                                invalid={passwordMismatch}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="formGroup">
                        <label className="formSubhead" htmlFor="confirm"><b>Confirm Password</b></label>
                        <div className="inputWrapper">

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
                </form>
                <section className="signupDisclaimer__container">
                    <span className="signupDisclaimer">
                        By clicking Sign Up, you agree to our <a className="formLink">Terms of Service</a>, <a className="formLink">Privacy Policy</a>, and <a className="formLink">Cookies Policy</a>.
                    </span>
                </section>
                <div className="button__container">
                    <button className="formSignupButton" type="submit" disabled={passwordMismatch} onClick={handleSubmit}>
                        SIGN UP
                    </button>
                </div>
                <div className="link__container">
                    <span className="loginLink">
                        Already signed up? Log in <Link className="formLink" to="/login">here</Link>
                    </span>
                </div>
            </section>
        </>
    )
}