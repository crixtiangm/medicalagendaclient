import { CalendarHeader, EventModal, Month, Navbar, Sidebar } from "../../component";
import React, { useContext, useEffect, useState } from 'react';
import { getMonth } from "../../util";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { GlobalContext } from "../../context/contextWrapper";


const Home = () => {

    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);
    const { isLogged, user } = useContext(AuthContext);

    useEffect(()=>{
        if(!isLogged){
            navigate('/login');
        }
    });

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return(
        <React.Fragment>
            <Navbar {...user}/>
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );
};


export default Home;