import {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext()

export function AuthContextProvider( {children} ) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }
    async function isAuth(){
        try {
          const response = await fetch(
            '/getUser'
          );
          const json = await response.json()
          setIsAuthenticated(json)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
        isAuth()
    }, [])

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;