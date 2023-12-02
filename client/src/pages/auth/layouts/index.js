import LoginPanel from "../components/loginPanel";
import SignupPanel from "../components/signupPanel";
import "../styles/login.css";

export function Login({}) {
    
    return (
        <main className="loginPage">
            <div className="background__container"></div>
            <div className="login__container">
                <LoginPanel />
            </div>
        </main>
    )
}

export function Signup({}) {

    return (
        <main className="signupPage">
            <div className="background__container"></div>
            <div className="signup__container">
                <SignupPanel />
            </div>
        </main>
    )
}