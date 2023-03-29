import { createHttp } from "./BaseServices";

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)
export const getCurrentUser = () => {
    authenticatedHttp.get("/users/me")
}