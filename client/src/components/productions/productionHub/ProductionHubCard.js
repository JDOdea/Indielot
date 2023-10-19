import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText } from "reactstrap";
import { ReactComponent as EmptyPoster } from "../../../svgs/emptyPoster.svg"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductionContext } from "../../ApplicationViews";
import DeleteProductionModal from "./DeleteProductionModal";

export default function ProductionHubCard({ loggedInUser }) {
    const navigate = useNavigate();

    const { production, setProduction } = useContext(ProductionContext);


    if (!production) return;
    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                <div style={{ display: "flex" }}>
                    <EmptyPoster style={{ width: "100px", height: "100px"}}/>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {production.description}
                    </CardSubtitle>
                </div>
                    {
                        production.productionLead === loggedInUser.fullName &&
                        <Button
                            size="sm"
                            onClick={() => {
                                navigate(`/${production.title}/edit`);
                            }}
                        >
                            Edit
                        </Button>
                    }
                <CardText>
                    <b>Director</b><br/>
                    <b>Writer</b>
                </CardText>
            </CardBody>
            <CardFooter>
                {
                    production.productionLead === loggedInUser.fullName &&
                    <DeleteProductionModal />
                }
            </CardFooter>
        </Card>
    )
}