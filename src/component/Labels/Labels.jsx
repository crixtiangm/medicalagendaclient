import { useContext } from "react";
import { GlobalContext } from "../../context/contextWrapper";

const Labels = () => {
    const { labels, updateLabel } = useContext(GlobalContext);
    return(
        <div className="text-justify">
            <p className="text-gray-500 font-bold mt-10" >Label</p>
            {labels.map(({label:lbl, checked}, idx) => (
                <label key={idx} className="items-center t-3 block">
                    <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={() => updateLabel({label:lbl, checked: !checked})}
                        className={`h5 w-5 accent-${lbl}-200 rounded focus:ring-0 cursor-pointer`}
                    />
                    <span className="ml-2 text-gray-700 capitalize" >{lbl}</span>
                </label>
            ))}
        </div>
    );
};

export default Labels;