import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;

// // Custom hook wrapper so interceptors can use auth context
// export const useAxiosInstance = () => {
//     const { accessToken, logout, login, refreshAccessToken } = useAuth();
//     const navigate = useNavigate();

//     // Create Axios instance
//     const axiosInstance = axios.create({
//         baseURL: apiUrl,
//         withCredentials: true, // Needed for refresh/logout cookies
//     });

//     // Request Interceptor → Attach Access Token
//     axiosInstance.interceptors.request.use(
//         (config) => {
//             if (accessToken) {
//                 config.headers.Authorization = `Bearer ${accessToken}`;
//             }
//             return config;
//         },
//         (error) => Promise.reject(error)
//     );

//     // Response Interceptor → Handle 401/403 (Expired Token)
//     axiosInstance.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             const originalRequest = error.config;

//             // Avoid infinite loop for refresh endpoint
//             if (originalRequest.url.includes("/users/refresh")) {
//                 logout();
//                 toast.error("Session expired, please login again.");
//                 navigate("/login");
//                 return Promise.reject(error);
//             }

//             // If token expired and we haven’t retried yet
//             if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
//                 originalRequest._retry = true;

//                 try {
//                     // Call refresh endpoint
//                     const res = await axios.post(`${apiUrl}/api/users/refresh`, {}, { withCredentials: true });

//                     const newToken = res.data.accessToken;

//                     // Save new token via login (decodes + updates context)
//                     login({ data: { accessToken: newToken } });

//                     // Retry original request with new token
//                     originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                     return axiosInstance(originalRequest);
//                 } catch (refreshError) {
//                     // Refresh failed → logout user
//                     console.log(refreshError)
//                     logout();
//                     toast.error("Session expired, please login again.");
//                     navigate("/login");

//                     return Promise.reject(refreshError);
//                 }
//             }

//             return Promise.reject(error);
//         }
//     );

//     return axiosInstance;
// };

const isTokenExpired = (token) => {
    if(!token)
        return true;

    const { exp } = jwtDecode(token);
    return Date.now() >= exp*1000;
}

export const useAxiosInstance = () => {

    const { accessToken, refreshAccessToken } = useAuth();
    // const navigate = useNavigate();


    const axiosInstance = axios.create({ baseURL : apiUrl });

    axiosInstance.interceptors.request.use(async (config) => {
        let token = accessToken;

        if(!token || isTokenExpired(token))
        {
            token = await refreshAccessToken();
        }

        if(token)
        {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    });

    return axiosInstance;

}

