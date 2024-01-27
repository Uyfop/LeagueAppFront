import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import ItemsService from "../../services/ItemsService.js";
import UpdateItemsForm from "./UpdateItemsForm.js";

const ItemsList = ({ refreshItems, onItemDeleted}) => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useAuth();
    const itemsPerPage = 3;
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    useEffect(() => {
        loadItems(currentPage);
    }, [refreshItems, currentPage, token]);

    const loadItems = (page) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        ItemsService.getAllItemsWithPagination(page, itemsPerPage, headers)
            .then((response) => {
                console.log(response.data.content);
                setItems(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => console.error('Error fetching Items:', error));
    };

    const handleDelete = (itemName) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        ItemsService.deleteItem(itemName, headers)
            .then(() => {
                console.log('Item deleted:', itemName);
                onItemDeleted();
            })
            .catch((error) => console.error('Error deleting Item:', error));
    };


    const handleUpdateItem = (itemName, updatedItem) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        ItemsService.updateItem(itemName, updatedItem, headers)
            .then(() => {
                console.log('Item updated:', itemName);
                setSelectedItem(null);
                onItemDeleted();
                toggleUpdateForm();
            })
            .catch((error) => console.error('Error updating Item:', error));
    };
    const handlePageChange = (newPage) => {
        if(newPage >= 0)
            setCurrentPage(newPage);
    };

    const handleUpdate = (itemName) => {
        setSelectedItem(items.find((items) => items.itemName === itemName));
    };
    const handleCancelUpdate = () => {
        setSelectedItem(null);
    };

    const toggleUpdateForm = () => {
        setIsUpdateFormVisible(!isUpdateFormVisible);
    };

    return (
        <div>
            <h1>Champion List</h1>
            <div className="champion-container">

                <div className="champion-info">
                    <table>
                        <thead>
                        <tr>
                            <tr></tr>
                            <th>Item Name</th>
                            <th>first-stat</th>
                            <th>second-stat</th>
                            <th>third-stat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((items) => (
                            <tr key={items.itemName}>
                                <td className="item-portraits">
                                    <div>
                                        <img src={`/images/${items.itemName.toLowerCase()}.jpg`}
                                             alt={items.itemName}/>
                                    </div>
                                </td>
                                <td>
                                    {items.itemName}
                                </td>
                                <td>
                                    {items.itemFirstStat}
                                </td>
                                <td>
                                    {items.itemSecondStat}
                                </td>
                                <td>
                                    {items.itemThirdStat}
                                </td>
                                <td>
                                    {!isUpdateFormVisible && (
                                        <>
                                            <button onClick={() => handleDelete(items.itemName)}>
                                                Delete
                                            </button>
                                            <button onClick={() => {
                                                handleUpdate(items.itemName);
                                                toggleUpdateForm();
                                            }}>
                                                Update
                                            </button>
                                        </>
                                    )}
                                    {isUpdateFormVisible && selectedItem && selectedItem.itemName === items.itemName && (
                                        <UpdateItemsForm
                                            items={selectedItem}
                                            onUpdate={handleUpdateItem}
                                            onCancel={() => {
                                                toggleUpdateForm();
                                                handleCancelUpdate();
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <span>Page: {currentPage + 1}</span>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <button onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ItemsList;
