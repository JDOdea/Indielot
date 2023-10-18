import React, { useEffect, useState } from "react";
import { fetchProductionById } from "../../managers/productionManager";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

export default function ProductionDetails({ detailsProductionId }) {
    const [production, setProduction] = useState(null);

    const getProductionDetails = (id) => {
        fetchProductionById(id).then(setProduction);
    };

    useEffect(() => {
        if (detailsProductionId) {
            getProductionDetails(detailsProductionId);
        }
    }, [detailsProductionId])

    if (!production) {
        return (
            <>
                <h2>Production Details</h2>
                <p>Please choose a production...</p>
            </>
        )
    }
    return (
        <>
            <h2>Production Details</h2>
            <Card color="dark" inverse>
                <CardBody>
                    <CardTitle tag="h4">{production.title}</CardTitle>
                    <p><u>Production Lead: {production.productionLead}</u></p>
                    <p>Description: {production.description}</p>
                    { 
                        production.completed
                        ?
                        <p>Production Wrapped</p>
                        :
                        <p>In Production</p>
                    }
                </CardBody>
            </Card>
            <h4>Production Crew</h4>
            {production.crew.map((c) => (
                <Card
                    outline
                    color="warning"
                    key={`${production.title}-${c.name}`}
                    style={{ marginBottom: "4px" }}
                >
                    <CardBody>
                        <CardTitle tag="h5">{c.name}</CardTitle>
                        <CardText>
                            <b>Roles:</b> <br />
                            {c.roles.map((r) => (
                                <React.Fragment key={`${c.name}-${r}`}>
                                    {r}<br />
                                </React.Fragment>
                            ))}
                        </CardText>
                    </CardBody>
                </Card>
            ))}
        </>
    )
}