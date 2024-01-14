import React, { useState } from 'react';
import ChampionList from './components/ChampionList.js';
import ChampionForm from './components/ChampionForm.js';

const App = () => {
    const [refreshChampions, setRefreshChampions] = useState(false);

    const handleChampionRefresh = () => {
        setRefreshChampions(!refreshChampions);
    };

    return (
        <div>
            <ChampionForm onChampionCreated={handleChampionRefresh} />
            <ChampionList refreshChampions={refreshChampions} onChampionDeleted={handleChampionRefresh} />
        </div>
    );
};

export default App;
