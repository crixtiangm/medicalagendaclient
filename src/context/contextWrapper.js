import { useState, createContext, useEffect, useReducer, useMemo } from "react";
import { addPatientEp, listPatientEp, editPatientEp, deletePatientEp } from '../services/schedule.services.js';
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

const addScheduledPatient = async (data) => {
    try {
        await addPatientEp(data);
    } catch (error) {
        console.log('Error addScheduled', error);
    };
};

const updateScheduledPatient = async (data) => {
    try {
        await editPatientEp(data);
    } catch (error) {
        console.log('Error updateScheduled', error);
    };
};

const deleteScheduledPatient = async (eventId) => {
    try {
        await deletePatientEp(eventId);
    } catch (error) {
        console.log('Error deleteScheduled', error);
    }
}

const listPatientScheluded = async () => {
    try {
        const listPatients = await listPatientEp();
        return listPatients.data;
    } catch (error) {
        console.log('Error', error);
    };
};

const savedEventsReducer = async (state, {type, payload}) => {
    switch(type){
        case 'create':
            addScheduledPatient(payload);
            state = await listPatientScheluded();
            return [...state, payload];
        case 'update':
            updateScheduledPatient(payload);
            state = await listPatientScheluded();
            return state.map(evt => evt._id === payload._id ? payload : evt);
        case 'delete':
            deleteScheduledPatient(payload._id);
            state = await listPatientScheluded();
            return state.filter(evt => evt._id !== payload._id);
        default:
            throw new Error();
    };
};

const initEvents = async () => { 
    const listPat = await listPatientScheluded();
    const listStorageEvents = listPat ? listPat: [];
    return listStorageEvents;
};

const ContextWrapper = (props) => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

    const filteredEvents = useMemo (() => {
        const svdEvt = async () => {
            const savedEvts = await savedEvents;

            return savedEvts.filter((evt) =>
                labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label)
            );
        }
        return svdEvt()
                    .catch(console.error);
    }, [savedEvents, labels]);

    const updateLabel = (label) => {
        setLabels(labels.map((lbl)=> lbl.label === label.label ? label : lbl))
    }

    useEffect( () => {
        const svdEvt = async () => {
            const savedEvts = await savedEvents;
            setLabels((prevLabels) => {
                return [...new Set( savedEvts.map(evt => evt.label))].map(label => {
                    const currentLabel = prevLabels.find(lbl => lbl.label === label);
                    return {
                        label,
                        checked: currentLabel ? currentLabel.checked : true
                    };
                });
            });
        };

        svdEvt()
            .catch(console.error);
    },[savedEvents]);

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