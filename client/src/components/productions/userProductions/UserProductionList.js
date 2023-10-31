import { useEffect, useState } from "react";
import { fetchProductionsByUserId } from "../../../managers/productionManager";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Input } from "reactstrap";
import UserProductionCard from "./UserProductionCard";

export default function UserProductionList({ setProductionDetailsId, loggedInUser }) {
    const [productions, setProductions] = useState([]);
    const [input, setInput] = useState("");

    const handleSearch = (e) => {

    }
    
    const getUserProductions = () => {
        fetchProductionsByUserId(loggedInUser.id).then(setProductions);
    };

    useEffect(() => {
        getUserProductions();
    }, []);

    return (
        <>
            <div className="userProductionsSearch">
                <Input
                    className="userProductionsSearchInput"
                    name="search"
                    type="search"
                    placeholder="Find a Production..."
                    value={input}
                    onChange={handleSearch}
                />
                <button className="userProductionsSearchSort" >Sort <ArrowDropDownIcon style={{marginLeft: "-6px" }}/></button>
            </div>
            <div className="userProductionList">
                {productions.map((p) => (
                    <UserProductionCard
                        productionObject={p}
                        key={`production-${p.id}`}
                    />
                ))}
            </div>
        </>
    )
}