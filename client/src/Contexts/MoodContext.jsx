import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAxiosInstance } from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const MoodContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

export const MoodProvider = ({ children }) => {
    const axiosInstance = useAxiosInstance();

    const [moods, setMoods] = useState([]);
    const [error, setError] = useState(null);
    const { accessToken, loading } = useAuth();

    const fetchMoods = async () => {
        try {
            setError(null);
            // const token = localStorage.getItem("accessToken");
            // const res = await axios.get(`${apiUrl}/api/moods`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            const res = await axiosInstance.get(`/api/moods`);
            setMoods(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Unauthorized. Please log in again.");
            } else {
                setError("Failed to fetch mood history.");
            }
        }
    };

    useEffect(() => {
        if (!loading && accessToken) {
            fetchMoods();
        }
        // fetchMoods();
    }, [loading, accessToken]);


    return (
        <MoodContext.Provider value={{ moods, refetch: fetchMoods, error }}>
            {children}
        </MoodContext.Provider>
    );

}

export const useMood = () => useContext(MoodContext);
