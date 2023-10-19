import { useState } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { updateProduction } from "../../../managers/productionManager";
import { useNavigate } from "react-router-dom";

export default function EditProduction({ loggedInUser, production, setProduction }) {
    const [title, setTitle] = useState(production.title);
    const [description, setDescription] = useState(production.description);
    const [PicturePath, setPicturePath] = useState(null);
    const [hasBudget, setHasBudget] = useState(false);
    const [budget, setBudget] = useState(null);

    const [invalid, setInvalid] = useState(false);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedProduction = {
            id: production.id,
            title,
            description,
            PicturePath,
            budget
        };

        updateProduction(updatedProduction).then(setProduction);
    }
    
    return (
        <div className="container" style={{ maxWidth: "700px " }}>
            <h4>Edit Production</h4>
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
                            defaultValue={production.title}
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
                            defaultValue={production.description}
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
                    Have a budget?
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
                                handleUpdate(e);
                            }}
                        >
                            Update
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}