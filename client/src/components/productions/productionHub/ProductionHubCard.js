import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText } from "reactstrap";
import { ReactComponent as EmptyPoster } from "../../../svgs/emptyPoster.svg"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductionContext } from "../../views/ApplicationViews";
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
                    <CardSubtitle className="mb-2 text-muted productionDetails" tag="h6">
                        <div className="productionGenres">Thriller, Drama</div>
                        <div className="productionDescription">{production.description}</div>
                    </CardSubtitle>
                </div>
                <CardText className="homeText">
                    <b>Director:</b> Jake Holtzer<br/>
                    <b>Writer:</b> Jake Holtzer
                </CardText>
                    {
                        production.productionLead === loggedInUser.fullName &&
                        <Button
                            className="productionButtons"
                            size="sm"
                            onClick={() => {
                                navigate(`/${production.title}/edit`);
                            }}
                        >
                            Edit
                        </Button>
                    }
            </CardBody>
            {
                production.productionLead === loggedInUser.fullName &&
                <CardFooter>
                    <DeleteProductionModal />
                </CardFooter>
            }
        </Card>
    )
}