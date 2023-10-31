import { useState } from "react";
import { Input } from "reactstrap";

export default function NavSearchBar({}) {
    const [input, setInput] = useState("");

    const handleSearch = (e) => {

    }

    return (
        <div className="navSearch">
            <Input
                className="navSearchInput"
                name="search"
                type="search"
                placeholder="Search..."
                value={input}
                onChange={handleSearch}
            />
        </div>
    )
}