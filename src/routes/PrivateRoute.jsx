import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../services/auth";

export default function PrivateRoute({ children, requiredRole }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const tokenRef = useRef(localStorage.getItem("token"));

    useEffect(() => {
        const validate = async () => {
            const token = tokenRef.current;
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await validateToken(token);

                if (res.data?.valid) {
                    setUser(res.data.user);
                    localStorage.setItem("dataUser", JSON.stringify({ user: res.data.user }));
                } else {
                    localStorage.clear();
                    tokenRef.current = null;
                }
            } catch (err) {
                localStorage.clear();
                tokenRef.current = null;
            }
            setLoading(false);
        };

        validate();
    }, []);

    if (loading) {
        return null;
    }

    const token = tokenRef.current;
    const role = user?.role;

    if (!token) return <Navigate to="/" replace />;
    if (requiredRole && role !== requiredRole) return <Navigate to="/not-authorized" replace />;
    
    return children;
}
