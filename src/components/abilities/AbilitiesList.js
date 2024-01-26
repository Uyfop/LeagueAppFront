import React, { useState, useEffect } from 'react';
import AbilitiesService from '../../services/AbilitiesService.js';
import { useAuth } from '../../services/AuthProvider.js';
import UpdateAbilityForm from "./UpdateAbilityForm.js";

const AbilitiesList = ({ refreshAbilities, onAbilityDeleted }) => {
    const [selectedAbility, setSelectedAbility] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const { token } = useAuth();
    const itemsPerPage = 3;

    useEffect(() => {
        loadAbilities(currentPage);
    }, [currentPage, refreshAbilities, token]);

    const loadAbilities = (page) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        AbilitiesService.getAllAbilitiesWithPagination(page, itemsPerPage, headers)
            .then((response) => {
                setAbilities(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => console.error('Error fetching abilities:', error))
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleDelete = (abilityName) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        AbilitiesService.deleteAbilities(abilityName, headers)
            .then(() => {
                console.log('Ability deleted:', abilityName);
                onAbilityDeleted();
            })
            .catch((error) => console.error('Error deleting ability:', error));
    };

    const handleUpdate = (abilityName) => {
        setSelectedAbility(abilities.find((ability) => ability.abilityName === abilityName));
    };
    const handleUpdateAbility = (abilityName, updatedAbility) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        AbilitiesService.updateAbility(abilityName, updatedAbility, headers)
            .then(() => {
                console.log('Ability updated:', abilityName);
                setSelectedAbility(null);
                onAbilityDeleted();
                toggleUpdateForm();
            })
            .catch((error) => console.error('Error updating ability:', error));
    };

    const handleCancelUpdate = () => {
        setSelectedAbility(null);
    };

    const toggleUpdateForm = () => {
        setIsUpdateFormVisible(!isUpdateFormVisible);
    };

    return (
        <div>
            <h1>Abilities List</h1>
            <div className="abilities-container">
                <div className="ability-info">
                    <table>
                        <thead>
                        <tr>
                            <tr></tr>
                            <th>Ability Name</th>
                            <th>Ability Cost</th>
                            <th>Ability Cooldown</th>
                            <th>Champion Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {abilities.map((ability) => (
                            <tr key={ability.abilityName}>
                                <td className="ability-portraits">
                                    <div>
                                        <img src={`/images/${ability.abilityName.toLowerCase()}.jpg`}
                                             alt={ability.abilityName}/>
                                    </div>
                                </td>
                                <td>{ability.abilityName}</td>
                                <td>{ability.abilityCost}</td>
                                <td>{ability.abilityCD}</td>
                                <td>{ability.championName.champName}</td>
                                <td>
                                    {!isUpdateFormVisible && (
                                        <>
                                            <button onClick={() => handleDelete(ability.abilityName)}>
                                                Delete
                                            </button>
                                            <button onClick={() => {
                                                handleUpdate(ability.abilityName);
                                                toggleUpdateForm();
                                            }}>
                                                Update
                                            </button>
                                        </>
                                    )}
                                    {isUpdateFormVisible && selectedAbility && selectedAbility.abilityName === ability.abilityName && (
                                        <UpdateAbilityForm
                                            ability={selectedAbility}
                                            onUpdate={handleUpdateAbility}
                                            onCancel={() => {
                                                toggleUpdateForm();
                                                handleCancelUpdate();
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <span>Page: {currentPage + 1}</span>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <button onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbilitiesList;
