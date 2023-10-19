import { useContext } from "react";
import { ProductionContext } from "../../../../ApplicationViews";

export default function ProductionCrewHeader({}) {
    
    const { production, setProduction } = useContext(ProductionContext);

    if (!production) return;
    return (
        <>
            <ul>
                <li style={{ listStyle: "none", borderBottomWidth: "1px", borderBottomStyle: "solid"  }}>
                    <span><b>Director</b></span>
                </li>
                <li style={{ listStyle: "none", borderBottomWidth: "1px", borderBottomStyle: "solid"  }}>
                    <span><b>Writer</b></span>
                </li>
            </ul>
        </>
    )
}