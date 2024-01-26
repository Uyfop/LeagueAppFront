import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import UnathorizedMessage from "../Auth/UnathorizedMessage.js";
import ItemsList from "./ItemsList.js";
import ItemsForm from "./ItemsForm.js";


const ItemsPage = () => {
    const { isAuthenticated } = useAuth();
    const [refreshItems, setRefreshItems] = useState(false);

    useEffect(() => {
    }, [isAuthenticated]);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <ItemsForm onItemCreated={() => setRefreshItems(!refreshItems)} />
                    <ItemsList refreshItems={refreshItems} onItemDeleted={() => setRefreshItems(!refreshItems)} />
                </>
            ) : (
                <UnathorizedMessage />
            )}
        </div>
    );
};

export default ItemsPage;
