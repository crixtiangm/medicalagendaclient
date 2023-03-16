import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/contextWrapper"; 
import { getMonth } from "../../util";

const SmallCalendar = () => {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    const { 
        monthIndex, 
        setSmallCalendarMonth, 
        setDaySelected, 
        daySelected 
    } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx))
    }, [currentMonthIdx]);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex)
    }, [monthIndex]);

    const handlePrevMonth = () => {
        setCurrentMonthIdx(currentMonthIdx - 1);
    };

    const handleNextMonth = () => {
        setCurrentMonthIdx(currentMonthIdx + 1);
    };

    const getCurrentDay = (day) => {
        const format = 'DD-MM-YY';
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if(nowDay === currDay){
            return 'bg-blue-500 rounded-full text-white';
        }else if(currDay === slcDay){
            return 'bg-blue-100 rounded-full text-blue-600 font-bold';
        }else{
            return '';
        };
    };

    return(
        <div className="mt-9">
            <header className="flex justify-between">
                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
                </p>
                <div>
                    <button onClick={handlePrevMonth}>
                        <span className="material-icons cursor-pointer text-gray-600 mx-2">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth}>
                        <span className="material-icons cursor-pointer text-gray-600 mx-2">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-7 grid-row-6">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 text-center">
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button key={idx} onClick={ () => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                }} className={`py-1 w-full ${getCurrentDay(day)}`}
                            >
                                <span className="text-sm" >{day.format('D')}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};


export default SmallCalendar;