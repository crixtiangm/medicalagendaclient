import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {

    const { logOutUser } = useContext(AuthContext);

    useEffect(()=>{
        logOutUser();
    })

    return <Navigate to={'/login'} />
}

export default LogoutPage;