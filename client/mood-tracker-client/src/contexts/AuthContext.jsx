import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(() => {
    //     try {
    //         const storedUser = localStorage.getItem("user");
    //         return storedUser ? JSON.parse(storedUser) : null;
    //     } catch (err) {
    //         console.error("Failed to parse user from localStorage", err);
    //         return null;
    //     }
    // });

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const decodeAndSetUser = (token) => {
        const decoded = jwtDecode(token);
        setUser(decoded.user);
    };

    const login = (res) => {

        const token = res.data.accessToken;
        const refreshToken = res.data.refreshToken;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);

        const decoded = jwtDecode(token);
        const userData = decoded.user;
        // setUser(userData);
        // localStorage.setItem("user", JSON.stringify(userData));
        setAccessToken(token);
        decodeAndSetUser(token);
    };

    const logout = async () => {

        try {
            await axios.post(`${apiUrl}/api/users/logout`, {}, { withCredentials: true }); // Clear cookie
        } catch (err) {
            console.error("Logout error", err);
        }

        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
    };

    const refreshAccessToken = async () => {

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken)
            return null;

        try {
            const res = await axios.post(`${apiUrl}/api/users/refresh`, {}, {
                headers: { Authorization: `Bearer ${refreshToken}` },
                withCredentials: true
            });

            const token = res.data.accessToken;
            setAccessToken(token);
            decodeAndSetUser(token);
            return token;
        } catch (error) {
            toast.error("Session expired. Please login again.");
            navigate("/login");
            logout();
            return null;
        }
    }



    useEffect(() => {
        // const refreshAccessToken = async () => {
        //     try {

        //         const refreshToken = localStorage.getItem("refreshToken");
        //         if (!refreshToken) {
        //             setLoading(false);
        //             return; 
        //         }

        //         const res = await axios.post(`${apiUrl}/api/users/refresh`, {}, {
        //             headers: { Authorization: `Bearer ${refreshToken}` },
        //         });

        //         const token = res.data.accessToken;

        //         const decoded = jwtDecode(token);
        //         const userData = decoded.user;
        //         // setUser(userData);
        //         // localStorage.setItem("accessToken", token);
        //         // localStorage.setItem("user", JSON.stringify(userData));
        //         setAccessToken(token);
        //         decodeAndSetUser(token);
        //     } catch {
        //         setUser(null);
        //         localStorage.removeItem("user");
        //         localStorage.removeItem("accessToken");
        //         localStorage.removeItem("refreshToken");
        //         setAccessToken(null);
        //     } finally {
        //         setLoading(false); // Done checking
        //     }
        // };

        // refreshAccessToken();

        const fetchData = async () => {
            await refreshAccessToken();
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, accessToken, loading, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);