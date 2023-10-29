import "./home.css"
import HomeFeed from "./HomeFeed"
import HomeLeftBar from "./HomeLeftBar"
import HomeRightBar from "./HomeRightBar"

export const Home = ({ loggedInUser }) => {

    return (
        <div className="homeContainer">
            <div className="sideNavContainer">
                <HomeLeftBar loggedInUser={loggedInUser}/>
            </div>
            <div className="homeFeedContainer">
                <HomeFeed />
            </div>
            <div className="sideRightContainer">
                <HomeRightBar loggedInUser={loggedInUser}/>
            </div>
        </div>
    )
}