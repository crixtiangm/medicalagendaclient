import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/contextWrapper";

const Day = ({day, rowIdx}) => {

    const [dayEvents, setDayEvents] = useState([]);

    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent
    } = useContext(GlobalContext);
    
    const getCurretDay = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') 
        ? 'bg-blue-600 text-white rounded-full w-7' 
        : ''
    };

    useEffect(() => {
        const filteredEvt = async () => {
            const fltredEvt = await filteredEvents;
            const events = fltredEvt.filter((evt) => 
            dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'));
            setDayEvents(events);
        }
        filteredEvt()
            .catch(console.error);
    },[filteredEvents, day])

    return(
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
                )}
                <p className={`text-sm p-1 my-1 text-center ${getCurretDay()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div 
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
                className="flex-1 cursor-pointer"
            >
                {dayEvents.map((evt, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}
                        className={`bg-${evt.label}-200 p-1 text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {evt.patient}
                    </div>
                ))}

            </div>
        </div>
    );
};


export default Day;