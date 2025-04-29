import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/errors/NotFound";
import NotAuthorized from "../pages/errors/NotAuthorized";
import RegisterUser from "../pages/RegisterUser";
// import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
// import NewPasswordReset from "../pages/NewPasswordReset";
import Item01 from "../pages/items/Item01";
import Item02 from "../pages/items/Item02";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/reset-password/:token" element={<NewPasswordReset />} /> */}

                {/* Rota de erro */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />

                {/* Rota protegida */}
                <Route path="/home" element={<Home />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/items/item01" element={<PrivateRoute><Item01 /></PrivateRoute>} />
                <Route path="/items/item02" element={<PrivateRoute requiredRole="manager"><Item02 /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
