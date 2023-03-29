const JWT_TOKEN_KEY = "accessToken" // esto se tiene que llamar igual que en el back( contante y key)

let _accessToken = localStorage.getItem(JWT_TOKEN_KEY) || "" // _ es una buena practica cuando es personal

export const setAccessToken = (token) => { // seteamos el token que queremo
    localStorage.setItem(JWT_TOKEN_KEY, token) // recibe clave - valor
    _accessToken = token // me guardo el tokeb

}

export const getAccessToken = () => {  // recogojo información del token del localStorage
    return _accessToken
}

export const logout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY)  // destruyo el token antes de expirar por su cuenta
    window.location.assign("/login");
}