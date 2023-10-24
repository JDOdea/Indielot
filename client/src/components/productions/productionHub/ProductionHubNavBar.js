import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ProductionHubCard from "./ProductionHubCard";
import { useState } from "react";
import classnames from 'classnames'; 
import ProductionCrewCard from "./tabs/crew/ProductionCrewCard";
import ProductionAssetCard from "./tabs/assets/ProductionAssetCard";


export default function ProductionHubNavBar({ loggedInUser }) {
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    const toggle = (tab) => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }

    return (
        <>
            <div style={{
                display: 'block', width: 700, paddingLeft: 30, paddingRight: 30
            }}>
                <Nav tabs justified>
                    <NavItem>
                        <NavLink
                            className={classnames({ 
                                active: 
                                    currentActiveTab === '1'
                            })} 
                            onClick={() => { toggle('1')}}
                        >
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ 
                                active: 
                                    currentActiveTab === '2'
                            })} 
                            onClick={() => { toggle('2')}}
                        >
                            Cast & Crew
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ 
                                active: 
                                    currentActiveTab === '3'
                            })} 
                            onClick={() => { toggle('3')}}
                        >
                            Schedule
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ 
                                active: 
                                    currentActiveTab === '4'
                            })} 
                            onClick={() => { toggle('4')}}
                        >
                            Assets
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
                <TabContent activeTab={currentActiveTab}>
                    <TabPane tabId="1">
                        <ProductionHubCard loggedInUser={loggedInUser}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <ProductionCrewCard loggedInUser={loggedInUser}/>
                    </TabPane>
                    <TabPane tabId="3">

                    </TabPane>
                    <TabPane tabId="4">
                        <ProductionAssetCard loggedInUser={loggedInUser}/>
                    </TabPane>
                </TabContent>
        </>
        
    )
}