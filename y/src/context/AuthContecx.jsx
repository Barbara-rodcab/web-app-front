import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { getAccessToken, setAccessToken } from "../stores/AccessTokenStore"
import { getCurrentUser as getCurrentUsersService } from "../services/UserServices"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
    const natigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)
    const [isAuthLoaded, setIsAuthLoaded] = useState(false)

    const getCurrentUser = useCallback((callback) => {
        getCurrentUsersService()
            .then(user => {
                setCurrentUser(user)
                setIsAuthLoaded(true)
                callback && callback()
            })
    }, [])

    const login = useCallback((token) => {
        const navigateToProfile = () => {
            natigate("/profile")
        }
        setAccessToken(token)
        getCurrentUser(navigateToProfile)
    }, [getCurrentUser])

    useEffect(() => {
        if (getAccessToken()) {
            getCurrentUser()
        } else {
            setIsAuthLoaded(true)
        }
    })

    const value = useMemo(() => {
        return {
            currentUser,
            isAuthLoaded,
            login
        }
    }, [currentUser, isAuthLoaded, login])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
