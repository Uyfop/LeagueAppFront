import React, { useEffect, useState } from 'react';
import ChampionService from '../../services/ChampionService.js';
import { useAuth } from '../../services/AuthProvider.js';

const ChampionSelector = ({ onSelect }) => {
    const [champions, setChampions] = useState([]);
    const { token } = useAuth();
    const [chosenChampion, setChosenChampion] = useState(null);

    useEffect(() => {
        const fetchChampions = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };
                const response = await ChampionService.getAllChampions(headers);

                setChampions(response.data);
            } catch (error) {
                console.error('Error fetching champions', error);
            }
        };
        fetchChampions();
    }, [token]);

    const handleChampionSelect = (championName) => {
        setChosenChampion(championName);
        onSelect(championName);
    };

    return (
        <div>

            <select
                value={chosenChampion}
                onChange={(e) => handleChampionSelect(e.target.value)}
            >
                <option value="">Select a Champion</option>
                {champions.map((champion) => (
                    <option key={champion.champName} value={champion.champName}>
                        {champion.champName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChampionSelector;
