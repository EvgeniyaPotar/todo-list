import { useEffect, useState, useMemo } from 'react'
import AuthContext from '../context/AuthContext.jsx'

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function getTokenFromLocaleStorage() {
        const savedToken = localStorage.getItem('token')

        if(savedToken) {
            setToken(savedToken)
            return savedToken
        }
        return null
    }

    const login = (tokenFromApi) => {
        localStorage.setItem('token', tokenFromApi)
        setToken(tokenFromApi);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    useEffect(() => {
        getTokenFromLocaleStorage()
        setIsLoading(false);
    }, [])

    const value = useMemo(() => ({
        token,
        isAuth: !!token,
        isLoading,
        login,
        logout
    }), [token, isLoading])

    return (
        <AuthContext value={value} >
            {children}
        </AuthContext>
    )
}

export default AuthProvider