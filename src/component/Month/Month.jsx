import React from "react";
import Day from '../Day/Day.jsx';

const Month = (props) => {
    return(
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {props.month.map((row, index) => (
                <React.Fragment key={index}>
                    {row.map((day, idx) => (
                        <Day key={idx} day={day} rowIdx={index} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};


export default Month;