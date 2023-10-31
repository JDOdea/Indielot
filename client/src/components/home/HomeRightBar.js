import ActiveProductions from "./activeProductions/ActiveProductions";


export default function HomeRightBar({ loggedInUser }) {

    return (
        <div className="homeRight">
            <h6>Productions in Progress</h6>
            <ActiveProductions loggedInUser={loggedInUser}/>
            <h6 style={{ marginTop: "25px" }}>Completed Productions</h6>
        </div>
    )
}