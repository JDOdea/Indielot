import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Feed from "./components/Feed";

export default function Home({}) {
    const [loading, setLoading] = useState(true);

    const userContext = useContext(AuthContext);

    setTimeout(() => {
        setLoading(false);
    }, 2000);
 
    return (
        <div className="homeContainer">
            <Feed loading={loading} />
        </div>
    )
}