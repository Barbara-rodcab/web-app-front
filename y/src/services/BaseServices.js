import axios from "axios"
import { getAccessToken, logout } from "../stores/AccessTokenStore"

const INVALID_STATUS_CODES = [
    401
];

export const createHttp = (useAccesToken = false) => { // recibo: el token que recibo de request: lo pongo en false porque primero lo valido antes de enviarlo a al resto de app
    const http = axios.create({ baseURL: "http://localhost:3000" }) // de donde haremos las peticiones- donde esta corriendo la API 


    http.interceptors.request.use((config) => {
        if (useAccesToken && getAccessToken()) {
            config.headers.Authorization = `Bearer ${getAccessToken()}`
        }

        return config
    }, err => Promise.reject(err)
    )

    http.interceptors.response.use((response) => {
        response.data,
            (error) => {
                if (error?.response?.status && INVALID_STATUS_CODES.includes(error.response.status)) {

                    if (getAccessToken()) {
                        logout()
                    }
                }
                return Promise.reject(error)
            }

    }
    )
    return http
}

