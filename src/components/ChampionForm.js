import React, { useState } from 'react';
import ChampionService from '../services/ChampionService.js';

const ChampionForm = ({ onChampionCreated }) => {
    const [champion, setChampion] = useState({ champName: '', champType: '' });

    const handleSubmit = e => {
        e.preventDefault();
        ChampionService.createChampion(champion)
            .then(response => {
                console.log('Champion created:', response.data)
                onChampionCreated(response.data);
                setChampion({ champName: '', champType: '' });
            })
            .catch(error => console.error('Error creating champion:', error));
    };

    const handleChange = e => {
        setChampion({ ...champion, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Create Champion</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Champion Name:
                    <input type="text" name="champName" value={champion.champName} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Champion Type:
                    <input type="text" name="champType" value={champion.champType} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Create Champion</button>
            </form>
        </div>
    );
};

export default ChampionForm;
