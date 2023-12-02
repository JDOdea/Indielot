import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormFeedback, Input } from 'reactstrap';
import authActions from '../../../utils/actions/authActions';
import { AuthContext } from '../../../context/AuthContext';

export default function LoginPanel({}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);

    const navigate = useNavigate();
    const userContext = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        authActions.logIn(email, password).then((user) => {
            if (!user) {
                setFailedLogin(true);
            } else {
                userContext.setUser(user.profile);
                userContext.setToken(user.token);
                userContext.setAuthenticated(true);
                navigate("/");
            }
        })
    }
    
    return (
        <>
            <section>
                <form className="loginForm">
                    <img className="loginLogo" src="/logo.png"/>
                    <fieldset className="formGroup">
                        <label className="formSubhead" htmlFor="email"><b>Email</b></label>

                        <div className="inputWrapper">
                            <EmailIcon className='inputIcon' />
                            <Input 
                                required
                                className="inputForm"
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

                    <fieldset className="formGroup">
                        <label className="formSubhead" htmlFor="password"><b>Password</b></label>
                        <div className="inputWrapper">
                            <LockIcon className="inputIcon" />
                            <Input 
                                required
                                className="inputForm"
                                placeholder="Enter Password"
                                name="Password"
                                invalid={failedLogin}
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setFailedLogin(false);
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>

                        <FormFeedback>Login information not found.</FormFeedback>
                        
                    </fieldset>
                    
                    <fieldset>

                        <button className="formButton" type="submit" onClick={handleSubmit}>
                            LOGIN
                        </button>

                    </fieldset>
                </form>
                <section className="disclaimer__container">
                    <span className="loginDisclaimer">
                        Learn about how Indielot collects, uses, shares, and protects your personal data in our <a className="formLink">Privacy Policy</a>. By using our services, you agree to our <a className="formLink">Terms of User</a>.
                    </span>
                </section>
            </section>
            <section className="formLink__container">
                New Here? <Link className="formLink registerLink" to="/register">Join Now</Link>
            </section>
        </>
    )
}