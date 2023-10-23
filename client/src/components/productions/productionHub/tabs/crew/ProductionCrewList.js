import React, { useContext, useEffect, useState } from "react"
import { ProductionContext } from "../../../../ApplicationViews"
import { ListGroup, ListGroupItem, UncontrolledTooltip } from "reactstrap";
import { ReactComponent as RemoveIcon } from "../../../../../svgs/removeCrewMember.svg";
import { deleteCrewMember, fetchCrewMembersByProductionId } from "../../../../../managers/crewManager";

export default function ProductionCrewList({ loggedInUser }) {
    const [productionCrew, setProductionCrew] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);

    const getProductionCrew = () => {
        fetchCrewMembersByProductionId(production.id).then(setProductionCrew);
    }

    const handleCrewRemoval = (crewMember) => {
        deleteCrewMember(crewMember).then(getProductionCrew);
    }

    useEffect(() => {
        getProductionCrew();
    }, []);

    useEffect(() => {
        getProductionCrew();
    }, [production]);

    if (!production || !productionCrew) return;
    return (
        <ListGroup>
            {productionCrew.map((c) => (
                <ListGroupItem
                    style={{ display: "flex", justifyContent: "space-between"}}
                    key={`${c.name}`}
                >
                    <div>
                        {c.name} 
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between"}}>
                        <div style={{ display: "flex"}}>
                            {c.roles.map((r) => (
                                <div
                                    style={{ marginLeft: "25px"}}
                                    key={`${c.name}-${r}`}>
                                    {r} 
                                </div>
                            ))}
                            {
                                production.productionLead === loggedInUser.fullName && (
                                    <>
                                        <RemoveIcon 
                                            title=""
                                            style={{ width: "25px", height: "25px", marginLeft: "40px" }}
                                            className="hov"
                                            id="removeCrew"
                                            onClick={() => {
                                                handleCrewRemoval(c);
                                            }}
                                        />
                                        <UncontrolledTooltip
                                            target="removeCrew"
                                        >
                                            Remove from Crew
                                        </UncontrolledTooltip>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}