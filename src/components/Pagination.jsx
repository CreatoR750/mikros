import React from "react";
import Button from "@mui/material/Button";
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) pageNumbers.push(i);
    return (
        <div className="pages-list">
            <ul>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <Button key={number} variant="contained" onClick={() => paginate(number)}>
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
