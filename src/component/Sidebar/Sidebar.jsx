import CreateEventButton from "../CreateEventButton/CreateEventButton";
import Labels from "../Labels/Labels";
import SmallCalendar from "../SmallCalendar/SmallCalendar";


const Sidebar = () => {
    return(
        <aside className="border p-5 w-64">
            <CreateEventButton />
            <SmallCalendar />
            <Labels />
        </aside>
    );
};


export default Sidebar;