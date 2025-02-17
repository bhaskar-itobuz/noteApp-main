import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", 
});


const refreshAccessToken = async () => {
    try {

        const storedUserData = localStorage.getItem("user");
        const userData = JSON.parse(storedUserData);
        const refreshToken = userData.refreshToken;

        if (!refreshToken) {
            console.error("No refresh token available.");
            return null;
        }


        const response = await axios.get("http://localhost:3000/user/createToken", {
            headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const newAccessToken = response.data.newAccesstoken;
        const newUserData = {...userData, token: newAccessToken};
        console.log("new user=",newUserData);
        
        localStorage.setItem("user", JSON.stringify(newUserData));

        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
};


axiosInstance.interceptors.request.use(
    (config) => {
        const storedUserData = localStorage.getItem("user");
        const userData = JSON.parse(storedUserData);
        const token = userData.token;
        console.log(token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(

    (response) => {

        console.log("instance created", response.data)
        return response
    }, 
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 498 && !originalRequest._retry) {
            console.log(498);
            originalRequest._retry = true;

            const newToken = await refreshAccessToken();

            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
