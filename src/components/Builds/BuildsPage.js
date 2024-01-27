import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import UnathorizedMessage from "../Auth/UnathorizedMessage.js";
import BuildsForm from "./BuildsForm.js";
import BuildsList from "./BuildsList.js";

const BuildsPage = () => {
    const { isAuthenticated } = useAuth();
    const [refreshBuilds, setRefreshBuilds] = useState(false);

    useEffect(() => {
    }, [isAuthenticated]);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <BuildsForm onBuildCreated={() => setRefreshBuilds(!refreshBuilds)} />
                    <BuildsList refreshBuilds={refreshBuilds} onBuildDeleted={() => setRefreshBuilds(!refreshBuilds)} />
                </>
            ) : (
                <UnathorizedMessage />
            )}
        </div>
    );
};

export default BuildsPage;
