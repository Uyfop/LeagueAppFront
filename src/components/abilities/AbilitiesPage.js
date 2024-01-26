import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import UnathorizedMessage from "../Auth/UnathorizedMessage.js";
import AbilitiesForm from "./AbilitiesForm.js";
import AbilitiesList from "./AbilitiesList.js";

const AbilitiesPage = () => {
    const { isAuthenticated } = useAuth();
    const [refreshAbilities, setRefreshAbilities] = useState(false);

    useEffect(() => {
    }, [isAuthenticated]);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <AbilitiesForm onAbilityCreated={() => setRefreshAbilities(!refreshAbilities)} />
                    <AbilitiesList refreshAbilities={refreshAbilities} onAbilityDeleted={() => setRefreshAbilities(!refreshAbilities)} />
                </>
            ) : (
                <UnathorizedMessage />
            )}
        </div>
    );
};

export default AbilitiesPage;
