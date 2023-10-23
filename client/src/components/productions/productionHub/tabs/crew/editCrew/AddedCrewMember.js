import { useEffect, useState } from "react";
import { fetchRoles } from "../../../../../../managers/crewManager";
import { Input, Label } from "reactstrap";

export default function AddedCrewMember({ selectedUser, setSelectedUser, selectedRole, setSelectedRole }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles().then(setRoles);
    }, []);

    useEffect(() => {
        setUser(selectedUser);
    }, [selectedUser]);

    if (!user) return;
    return (
        <div>
            <p>{user.name}</p>
            <Label htmlFor="roleSelect">Role:</Label>
            <Input
                type="select"
                onChange={(e) => {
                    setSelectedRole(e.target.value);
                }}
            >
                <option value={0} hidden>Select a Role</option>
                {roles.map((r) => (
                    <option
                        key={`role--${r}`}
                        value={r}
                    >{r}</option>
                ))}
            </Input>
        </div>
    )
}