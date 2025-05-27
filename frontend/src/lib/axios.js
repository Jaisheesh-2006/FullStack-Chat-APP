import axios from "axios"

//* create an instance of axios
export const api=axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true //? sends cookeis with each request
})