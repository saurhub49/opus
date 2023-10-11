import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Login from "../components/features/login/components/Login";


const OpusRoutes: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default OpusRoutes;