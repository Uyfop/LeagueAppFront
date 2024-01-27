import React, { useState, useEffect } from 'react';
import BuildService from '../../services/BuildsService.js';
import ItemSelector from './ItemSelector.js';
import { useAuth } from '../../services/AuthProvider.js';

const UpdateBuildForm = ({ buildId, onBuildUpdated , onCancel}) => {
    const { token } = useAuth();
    const [selectedChampion, setSelectedChampion] = useState(null);
    const [selectedItems, setSelectedItems] = useState([null, null, null]);

    useEffect(() => {
        const fetchBuildData = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            BuildService.getBuildById(buildId, headers)
                .then((response) =>{
                const buildData = response.data;
                console.log(buildData);
                setSelectedChampion(buildData.champion);
                setSelectedItems(buildData.items);
                 })
                .catch((error) => console.error('Error fetching Builds:', error))
        };
        fetchBuildData();
    }, [buildId, token]);

    useEffect(() => {
        console.log(selectedChampion);
        console.log(selectedItems);
    }, [selectedChampion, selectedItems]);

    const handleItemSelect = (item, index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = {
            itemName: item,
        };
        setSelectedItems(newSelectedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBuild = {
            champion: selectedChampion,
            items: selectedItems,
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        BuildService.updateBuild(buildId, updatedBuild, headers)
            .then(() => {
                onBuildUpdated();
            })
            .catch((error) => console.error('Error updating build:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            {[0, 1, 2].map((index) => (
                <ItemSelector key={index} onSelect={(item) => handleItemSelect(item, index)}/>
            ))}
            <button type="submit">Update Build</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default UpdateBuildForm;
