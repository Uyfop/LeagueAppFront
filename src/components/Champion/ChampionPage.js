import React, {useEffect, useState} from 'react';
import ChampionForm from "./ChampionForm.js";
import ChampionList from "./ChampionList.js";
import { useAuth } from '../../services/AuthProvider.js';
import UnathorizedMessage from "../Auth/UnathorizedMessage.js";

const ChampionPage = () => {
    const [refreshChampions, setRefreshChampions] = useState(false);
    const { isAuthenticated } = useAuth();
    const handleChampionRefresh = () => {
        setRefreshChampions(!refreshChampions);
    };
    useEffect(() => {
        console.log('isAuthenticated changed:', isAuthenticated);
    }, [isAuthenticated]);
    return (
        <div>
            {isAuthenticated ? (
                <>
                    <ChampionForm onChampionCreated={handleChampionRefresh}/>
                    <ChampionList refreshChampions={refreshChampions} onChampionDeleted={handleChampionRefresh}/>
                </>
            ) : (
                <UnathorizedMessage />
            )}
        </div>
    );

};

export default ChampionPage;
