import { createHttp } from "./BaseServices"

const htpp = createHttp(false); // no necesito para el login estar autenticado

export const login = ({ email, password }) => {
    http.post("/login", { email, password })
}