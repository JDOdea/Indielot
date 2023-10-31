import { useState } from "react";
import "./productions.css"
import ProductionList from "./ProductionList";
import ProductionDetails from "./ProductionDetails";

export default function Productions({}) {
    const [detailsProductionId, setProductionDetailsId] = useState(null);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <ProductionList setProductionDetailsId={setProductionDetailsId}/>
                </div>
                <div>
                    <div className="col-sm-4">
                        <ProductionDetails detailsProductionId={detailsProductionId} />
                    </div>
                </div>
            </div>
        </div>
    )
}