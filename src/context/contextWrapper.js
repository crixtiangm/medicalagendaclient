import { useState, createContext, useEffect, useReducer, useMemo } from "react";
import dayjs from "dayjs";

const GlobalContext = createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({type, payload}) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    setLabels: () => {},
    labels: [],
    updateLabel: () => {},
    filteredEvents: []
});

const savedEventsReducer = (state, {type, payload}) => {
    switch(type){
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map(evt => evt.id === payload.id ? payload : evt);
        case 'delete':
            return state.filter(evt => evt.id !== payload.id);
        default:
            throw new Error();
    };
};

const initEvents = () => {
    const storageEvents = localStorage.getItem('savedEvents');
    const parseEvents = storageEvents ?  JSON.parse(storageEvents) : [];
    console.log('que es parseEvents', parseEvents)
    return parseEvents;
}

const ContextWrapper = (props) => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
            labels
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
        );
    }, [savedEvents, labels]);

    const updateLabel = (label) => {
        setLabels(labels.map((lbl)=> lbl.label === label.label ? label : lbl))
    }

    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(()=> {
        setLabels((prevLabels) => {
            return [...new Set( savedEvents.map(evt => evt.label))].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true
                }
            })
        })
    },[savedEvents])

    useEffect(()=>{
        if(smallCalendarMonth !== null){
            setMonthIndex(smallCalendarMonth);
        };
    },[smallCalendarMonth]);

    useEffect(() => {
        if(!showEventModal){
            setSelectedEvent(null);
        }
    }, [showEventModal]);
    
    return(
        <GlobalContext.Provider value={{
            monthIndex, 
            setMonthIndex, 
            smallCalendarMonth, 
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            selectedEvent,
            setSelectedEvent,
            savedEvents,
            setLabels,
            labels,
            updateLabel,
            filteredEvents
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export {
    GlobalContext,
    ContextWrapper
}