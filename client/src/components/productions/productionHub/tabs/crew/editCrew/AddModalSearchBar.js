import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../../../../../managers/userManager";
import { Input } from "reactstrap";

export default function AddModalSearchBar({ selectedUser, setSelectedUser }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [inputText, setInputText] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setInputText(query);

        const filteredResults = users.filter((u) => {
            if (!inputText) {
                return [];
            } else {
                return u.name.toLowerCase().includes(e.target.value.toLowerCase());
            }
        })

        setFilteredUsers(filteredResults);
    }

    const clearInput = () => {
        setFilteredUsers([]);
        setInputText("");
    }

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        clearInput();
    }

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    if (!users) return;
    return (
        <div>
            <div className='searchInputs'>
                <input
                    type='text'
                    placeholder='Search Users'
                    value={inputText}
                    onChange={handleSearch}
                />
                <div className="searchIcon">
                        {inputText === "" ? (
                            <SearchIcon />
                        ) : (
                            <CloseIcon className='clearBtn' onClick={clearInput} />
                        )}
                </div>
            </div>
            {inputText !== "" && filteredUsers.length !== 0 && (
                <div className='dataResult'>
                    {filteredUsers.map((u) => (
                        <li className='dataItem' key={`${u.name}-search`} onClick={() => handleUserSelect(u)}>
                            {u.name}
                        </li>
                    ))}
                </div>
            )}
        </div>
    )
}