import { useContext } from 'react';
import { GlobalContext } from '../../context/contextWrapper';
import plus from '../../assets/plus.png';

const CreateEventButton = () => {
    const { setShowEventModal } = useContext(GlobalContext);
    return(
        <button
            onClick={() => setShowEventModal(true)}
            className="border py-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
        >
            <img src={plus} alt="create_event" className='w-7 h-7 ml-2' />
            <span className='pl-3 pr-7' >Create</span>
        </button>
    );
};

export default CreateEventButton;