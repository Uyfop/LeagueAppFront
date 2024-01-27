import React, { useState } from 'react';

const UpdateItemForm = ({ items, onUpdate, onCancel }) => {
    const [updatedItemName, setUpdatedItemName] = useState(items.itemName);
    const [updatedItemFirstStat, setUpdatedItemFirstStat] = useState(items.itemFirstStat);
    const [updatedItemSecondStat, setUpdatedItemSecondStat] = useState(items.itemSecondStat);
    const [updatedItemThirdStat, setUpdatedItemThirdStat] = useState(items.itemThirdStat);

    const handleItemSecondStatChange = (e) => {
        setUpdatedItemSecondStat(e.target.value);
    };
    const handleItemThirdStatChange = (e) => {
        setUpdatedItemThirdStat(e.target.value);
    };
    const handleItemNameChange = (e) => {
        setUpdatedItemName(e.target.value);
    };

    const handleItemFirstStatChange = (e) => {
        setUpdatedItemFirstStat(e.target.value);
    };

    const handleUpdateItem = () => {
        const updatedItem = {
            itemName: updatedItemName,
            itemFirstStat: updatedItemFirstStat,
            itemSecondStat: updatedItemSecondStat,
            itemThirdStat: updatedItemThirdStat,
        };

        onUpdate(items.itemName, updatedItem);
    };

    return (
        <div>
            <label>Updated Item Name:</label>
            <input
                type="text"
                value={updatedItemName}
                onChange={handleItemNameChange}
            />
            <br/>
            <label>Updated Item First Stat:</label>
            <input
                type="text"
                value={updatedItemFirstStat}
                onChange={handleItemFirstStatChange}
            />
            <br/>
            <label>Updated Item Second Stat:</label>
            <input
                type="text"
                value={updatedItemSecondStat}
                onChange={handleItemSecondStatChange}
            />
            <br/>
            <label>Updated Item Third Stat:</label>
            <input
                type="text"
                value={updatedItemThirdStat}
                onChange={handleItemThirdStatChange}
            />
            <br/>
            <button onClick={handleUpdateItem}>Update Item</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default UpdateItemForm;
