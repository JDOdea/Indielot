import { useNavigate } from "react-router-dom";
import { 
    Button, 
    Card, 
    CardBody, 
    CardSubtitle, 
    CardText,
    CardTitle } from "reactstrap";

export default function ProductionCard({ production, setProductionDetailsId, setProduction }) {
    const navigate = useNavigate();

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody
                className="prod-card"
                onClick={() => {
                    setProduction(production);
                    navigate(`${production.title}`);
                }}
            >
                <CardTitle tag="h5">{production.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {production.description}
                </CardSubtitle>
                <CardText>Lead by: {production.productionLead}</CardText>
            </CardBody>
                <Button
                    color="dark"
                    onClick={() => {
                        setProductionDetailsId(production.id);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        })
                    }}
                >
                    Show Details
                </Button>
        </Card>
    )
}