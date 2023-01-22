import { Route, Routes } from "react-router-dom";
import AddMeet from "../AddMeet/AddMeet";
import Main from "../Main/Main";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/add" element={<AddMeet/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
