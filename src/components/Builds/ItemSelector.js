import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import ItemsService from '../../services/ItemsService.js';

const ItemSelector = ({ onSelect }) => {
    const [items, setItems] = useState([]);
    const { token } = useAuth();
    const [chosenItem, setChosenItem] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };
                const response = await ItemsService.getAllItems(headers);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };
        fetchItems();
    }, [token]);

    const handleItemSelect = (itemName) => {
        setChosenItem(itemName);
        onSelect(itemName);
    };

    return (
        <div>
            <select
                value={chosenItem}
                onChange={(e) => handleItemSelect(e.target.value)}
            >
                <option value="">Select an Item</option>
                {items.map((item) => (
                    <option key={item.itemName} value={item.itemName}>
                        {item.itemName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemSelector;
