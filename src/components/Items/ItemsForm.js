import React, {useState} from "react";
import {useAuth} from "../../services/AuthProvider.js";
import ItemsService from "../../services/ItemsService.js";

const ItemsForm = ({onItemCreated}) => {
    const [item, setItem] = useState({
        itemName: "",
        itemFirstStat: "",
        itemSecondStat: "",
        itemThirdStat: ""
    });
    const { token } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        ItemsService.createItem(item, headers)
            .then(response => {
                console.log('Item created:', response.data)
                onItemCreated(response.data);
                setItem({
                    itemName: "",
                    itemFirstStat: "",
                    itemSecondStat: "",
                    itemThirdStat: ""
                });
            })
            .catch(error => console.error('Error creating Item:', error));
    };

    const handleChange = e => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <h1>Create Item</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Item Name:
                    <input type="text" name="itemName" value={item.itemName} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Items first stat:
                    <input type="text" name="itemFirstStat" value={item.itemFirstStat} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Items second stat:
                    <input type="text" name="itemSecondStat" value={item.itemSecondStat} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Items third stat:
                    <input type="text" name="itemThirdStat" value={item.itemThirdStat} onChange={handleChange}/>
                </label>
                <br/>
                <button type="submit">Create Item</button>
            </form>
        </div>
    );
};

export default ItemsForm;