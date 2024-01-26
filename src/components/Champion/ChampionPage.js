import React, { useState } from 'react';
import ChampionForm from "./Champion/ChampionForm.js";
import ChampionList from "./Champion/ChampionList.js";

const ChampionPage = () => {
    const [refreshChampions, setRefreshChampions] = useState(false);

    const handleChampionRefresh = () => {
        setRefreshChampions(!refreshChampions);
    };

    return (
        <div>
            <ChampionForm onChampionCreated={handleChampionRefresh}/>
            <ChampionList refreshChampions={refreshChampions} onChampionDeleted={handleChampionRefresh}/>
        </div>
    );
};

export default ChampionPage;
