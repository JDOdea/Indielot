import ActiveProductions from "./activeProductions/ActiveProductions";


export default function HomeRightBar({ loggedInUser }) {

    return (
        <div className="homeRight">
            <h6>Productions in Progress</h6>
            <ActiveProductions loggedInUser={loggedInUser}/>
            {/* <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a> */}
        </div>
    )
}