import { useState } from "react";
import { Input } from "reactstrap";
import "./SearchBar.css";

export default function SearchBar({ placeholder }) {
    const [input, setInput] = useState("");

    const handleSearch = (e) => {
        
    };

    return (
        <div className="searchBar">
            <Input
                className="searchBarInput"
                name="search"
                type="search"
                placeholder={placeholder}
                value={input}
                onChange={handleSearch}
            />
        </div>
    )
}