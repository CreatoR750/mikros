import React from "react";
import close from "../assets/close.png";

const FiltersInfo = ({ filters }) => {
    const appliedFilters = [];
    const getFilters = () => {
        const entries = Object.entries(filters);
        entries.map((entry) => {
            if (typeof entry[1] === "string") {
                return;
            } else
                return entry[1].map((item) => {
                    if (entry[0] === "size") return appliedFilters.push(`${item} см`);
                    if (entry[0] === "price") return;
                    else return appliedFilters.push(item);
                });
        });
    };

    const showFilters = () => {
        getFilters();
        return appliedFilters.map((filter) => (
            <div className="filter-grid" key={filter}>
                {filter}
                {"     "}
                <img style={{ marginLeft: "3px" }} alt="icon" src={close}></img>
            </div>
        ));
    };

    return <div className="filters-list">{filters ? showFilters() : <></>}</div>;
};

export default FiltersInfo;
