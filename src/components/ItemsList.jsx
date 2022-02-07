import React from "react";
import ItemCard from "./ItemCard";

const ItemsList = ({ filteredItems }) => {
    const displayItems = () => {
        return filteredItems.map((item) => {
            return <ItemCard key={item._id} item={item} />;
        });
    };

    return (
        <div className="item-list-wrapper">
            {filteredItems ? displayItems() : <></>}
            {filteredItems.length === 0 ? (
                <div className="error">
                    <h1>Товары не найдены!</h1>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ItemsList;
