import { useState } from "react";
import ProductionList from "./ProductionList";
import ProductionDetails from "./ProductionDetails";

export default function Productions({ setProduction }) {
    const [detailsProductionId, setProductionDetailsId] = useState(null);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <ProductionList setProductionDetailsId={setProductionDetailsId} setProduction={setProduction}/>
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