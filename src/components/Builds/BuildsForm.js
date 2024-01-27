import React, { useState} from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import BuildService from '../../services/BuildsService.js';
import ChampionSelector from './ChampionSelector.js';
import ItemSelector from './ItemSelector.js';

const BuildsForm = ({ onBuildCreated }) => {
    const { token } = useAuth();
    const [selectedChampion, setSelectedChampion] = useState('');
    const [selectedItems, setSelectedItems] = useState(['', '', '']);

    const handleChampionSelect = (champion) => {
        setSelectedChampion(champion);
    };

    const handleItemSelect = (item, index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = item;
        setSelectedItems(newSelectedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const build = {
            champion: {
                champName: selectedChampion,
            },
            items: selectedItems.filter(item => item !== '').map(item => ({ itemName: item })),
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        BuildService.createBuild(build, headers)
            .then(() => {
                onBuildCreated();
                console.log(build);
            })
            .catch((error) => console.error('Error creating build:', error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex'}}>
                    <ChampionSelector onSelect={handleChampionSelect} />
                    {[0, 1, 2].map((index) => (
                        <ItemSelector
                            key={index}
                            onSelect={(item) => handleItemSelect(item, index)}
                        />
                    ))}
                </div>
                <button type="submit">Create Build</button>
            </form>
        </div>
    );
};

export default BuildsForm;
