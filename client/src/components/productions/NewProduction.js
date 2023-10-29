import { useState } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { postProduction } from "../../managers/productionManager";
import { useNavigate } from "react-router-dom";

export default function NewProduction({ loggedInUser }) {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(null);
    const [hasBudget, setHasBudget] = useState(false);
    const [budget, setBudget] = useState(null);

    const [invalid, setInvalid] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduction = {
            title,
            description,
            productionLeadId: loggedInUser.id,
            budget
        }

        postProduction(newProduction).then(() => {
            navigate("/");
        })
    }


    return (
        <div className="container" style={{ maxWidth: "700px" }}>
            <h3>Create a Production</h3>
            <Form>
                <FormGroup row>
                    <Label 
                        for="title"
                        sm={2}
                    >
                        Title:
                    </Label>
                    <Col sm={10}>
                        <Input 
                            name="title"
                            placeholder="Enter your production's title..."
                            type="text"
                            invalid={invalid}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <FormFeedback>
                            Title cannot be empty.
                        </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="description"
                        sm={2}
                    >
                        Description:
                    </Label>
                    <Col sm={10}>
                        <Input 
                            name="description"
                            placeholder="Enter a description here..."
                            type="textarea"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label 
                        for="picture"
                        sm={2}
                    >
                        Poster:
                    </Label>
                    <Input 
                        name="picture"
                        type="file"
                    />
                </FormGroup>
                <FormGroup check>
                    <Input 
                        type="checkbox" 
                        onClick={() => {
                            setHasBudget(!hasBudget);
                        }}
                    />
                    <Label check>
                        Have a budget?
                    </Label>
                </FormGroup>
                {
                    hasBudget
                    ?
                    <FormGroup>
                        <Label
                            for="budget"
                        >
                            Amount:
                        </Label>
                        <InputGroup>
                            <InputGroupText>
                                $
                            </InputGroupText>
                            <Input 
                                name="budget"
                                type="number"
                            />
                        </InputGroup>
                    </FormGroup>
                    :
                    ""
                }
                <FormGroup
                    check
                    row
                >
                    <Col
                        sm={{
                            offset: 2,
                            size: 10
                        }}
                    >
                        <Button
                            onClick={(e) => {
                                if (!title) {
                                    setInvalid(true);
                                } else {
                                    handleSubmit(e);
                                }
                        }}>
                            Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )

}