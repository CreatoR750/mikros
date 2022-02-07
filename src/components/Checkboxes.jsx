import { useState } from "react";
import "../App.css";
import Checkbox from "@mui/material/Checkbox";
const Checkboxes = (props) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };
    return (
        <div>
            {props.checkboxValues.map((size) => {
                return (
                    <li key={size.id}>
                        <Checkbox type="checkbox" checked={checked.indexOf(size.value) === -1 ? false : true} value={size.value} onChange={() => handleToggle(size.value)}></Checkbox>
                        <label>{size.value}</label>
                    </li>
                );
            })}
        </div>
    );
};

export default Checkboxes;
