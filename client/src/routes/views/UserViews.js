import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import ViewParamRouter from "../routers/ViewParamRouter";

export default function UserViews({}) {

    return (
        <Routes>
            <Route 
                index
                element={
                    <>
                        <Home />
                    </>
                }
            />
            <Route path=":param">
                <Route 
                    index
                    element={
                        <ViewParamRouter />
                    }
                />
            </Route>
        </Routes>
    )
}