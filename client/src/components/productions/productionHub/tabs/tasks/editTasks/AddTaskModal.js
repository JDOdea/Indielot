import { ReactComponent as PlusIcon } from "../../../../../../svgs/plusIcon.svg"
import React, { useContext, useEffect, useState } from 'react';
import { ProductionContext } from '../../../../../ApplicationViews';
import { createTask, fetchTaskStatuses } from '../../../../../../managers/taskManager';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchCrewMembersByProductionId } from "../../../../../../managers/crewManager";
import { fetchProductionById } from "../../../../../../managers/productionManager";

export default function AddTaskModal({}) {
    const [modal, setModal] = useState(false);
    const [crew, setCrew] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const [invalidTitle, setInvalidTitle] = useState(false);

    const toggle = () => {
        setModal(!modal);
        setInvalidTitle(false);
    };

    const { production, setProduction } = useContext(ProductionContext);

    const handleTaskCreation = () => {
        const task = {
            productionId: production.id,
            title: selectedTitle,
            description: selectedDescription,
            assignedCrewId: selectedUserId,
            dueDate,
            taskStatusName: selectedStatus
        }

        createTask(task).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            });

            toggle();
        })
    }

    useEffect(() => {
        fetchCrewMembersByProductionId(production.id).then(setCrew);
        fetchTaskStatuses().then(setStatuses);
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <PlusIcon 
                style={{ width: "35px", height: "35px", cursor: "pointer" }}
                onClick={toggle}
            />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add '{production.title}' Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="title" hidden/>
                            <Input 
                             name="title"
                             type="text"
                             placeholder="Enter Task Title..."
                             invalid={invalidTitle}
                             onChange={(e) => {
                                setSelectedTitle(e.target.value);
                             }}/>
                             <FormText>Required</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description" hidden/>
                            <Input 
                                name="description"
                                type="textarea"
                                placeholder="Enter Task Description..."
                                onChange={(e) => {
                                    setSelectedDescription(e.target.value);
                                }}/>
                        </FormGroup>
                        <div style={{ display: "flex", justifyContent: "space-around"}}>
                            <FormGroup>
                                <Label htmlFor="crew">Assign To:</Label>
                                <Input 
                                    name="crew"
                                    type="select"
                                    onChange={(e) => {
                                        setSelectedUserId(e.target.value);
                                    }}>
                                    <option value={1} hidden>Select a Crew Member...</option>
                                    {crew.map((c) => (
                                        <option
                                            key={c.name}
                                            value={c.id}
                                        >{c.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="dueDate">Due By:</Label>
                                <Input 
                                    name="dueDate"
                                    type="date"
                                    min={new Date().toJSON().slice(0,10).toString()}
                                    onChange={(e) => {
                                        setDueDate(e.target.value);
                                    }}/>
                            </FormGroup>
                        </div>
                        <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                            <Label>Status:</Label>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                {statuses.map((s) => (
                                    <div
                                        key={s}
                                        style={{ display: "flex" }}>
                                        <Label 
                                            htmlFor="status"
                                            style={{ marginRight: "8px" }}>{s.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                        <Input 
                                            name="status"
                                            type="radio"
                                            value={s}
                                            onChange={(e) => {
                                                setSelectedStatus(e.target.value);
                                            }}
                                            />
                                    </div>
                                ))}
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        if (!selectedTitle) {
                            setInvalidTitle(true);
                        } else {
                            handleTaskCreation();
                        }
                    }}>
                        Add Task
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}