import { useContext, useState } from "react";
import { GlobalContext } from "../../context/contextWrapper";

const labelsColors = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = () => {

    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent
    } = useContext(GlobalContext);

    const [patient, setPatient] = useState(
        selectedEvent ? selectedEvent.patient : ''
    );

    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description: ''  
    );

    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent 
        ? labelsColors.find((lbl) => lbl === selectedEvent.label) 
        : labelsColors[0]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const calendarEvent = {
            patient,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        };

        if (selectedEvent) {
            dispatchCalEvent({type: 'update', payload: calendarEvent});
        } else {
            dispatchCalEvent({type: 'push', payload: calendarEvent});
        }
        setShowEventModal(false);
    };

    return(
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4" >
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center" >
                    <span className="material-icons text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="material-icons text-gray-400" >
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">

                        <div></div>
                        <input 
                            type="text" 
                            name="patient"
                            placeholder="Add name patient"
                            value={patient}
                            required
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setPatient(e.target.value)}
                        />

                        <span className="material-icons text-gray-400">
                            schedule
                        </span>
                        <p className="text-justify">{daySelected.format('dddd, MMMM DD')}</p>

                        <span className="material-icons text-gray-400">
                            segment
                        </span>
                        <input 
                            type="text" 
                            name="description"
                            placeholder="Description"
                            value={description}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <span className="material-icons text-gray-400">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2" >
                            {labelsColors.map((lblColor, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedLabel(lblColor)}
                                    className={`bg-${lblColor}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lblColor &&
                                        <span className="material-icons text-white text-sm">
                                            check
                                        </span>
                                    }

                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button 
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;