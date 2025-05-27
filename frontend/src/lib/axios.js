import axios from "axios"

//* create an instance of axios
export const api=axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    withCredentials:true //? sends cookeis with each request
})