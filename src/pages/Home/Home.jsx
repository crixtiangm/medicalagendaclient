import { Navbar } from "../../component";
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';


const Home = () => {

    const navigate = useNavigate();

    const { isLogged, user } = useContext(AuthContext);

    useEffect(()=>{
        if(!isLogged){
            navigate('/login');
        }
    });

    return(
        <>
            <Navbar {...user}/>
        </>
    );
};


export default Home;