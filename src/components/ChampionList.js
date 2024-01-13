import React, { useState, useEffect } from 'react';
import ChampionService from '../services/ChampionService';

const ChampionList = () => {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        ChampionService.getAllChampions()
            .then(response => setChampions(response.data))
            .catch(error => console.error('Error fetching champions:', error));
    }, []);

    return (
        <div>
            <h1>Champion List</h1>
            <ul>
                {champions.map(champion => (
                    <li key={champion.champName}>
                        {champion.champName} - {champion.champType}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChampionList;
