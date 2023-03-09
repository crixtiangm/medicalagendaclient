import { useEffect, createContext, useState } from "react";
import { verifyEp } from '../services/auth.services.js';

const AuthContext = createContext();

const AuthProviderWrapper = (props) => {

    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('_token', token);
    }

    const removeToken = () => {
        localStorage.removeItem('_token');
    }

    const authenticateUser = async () => {
        try {
            
            const storedToken = localStorage.getItem('_token');
            if(storedToken){
                const {data} = await verifyEp();
                setIsLogged(true);
                setIsLoading(false);
                setUser(data);
            }else{
                setIsLogged(false);
                setIsLoading(false);
                setUser(null);
            }
        } catch (error) {
                setIsLogged(false);
                setIsLoading(false);
                setUser(null);
                console.log('Error:', error);
        }
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(()=>{
        authenticateUser();
    },[])

    return(
        <AuthContext.Provider value={{
            isLoading,
            isLogged,
            user,
            storeToken,
            logOutUser,
            authenticateUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};


export {
    AuthContext,
    AuthProviderWrapper
}
