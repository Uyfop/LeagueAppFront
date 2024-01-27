import React, { useState } from 'react';

const UpdateAbilityForm = ({ ability, onUpdate, onCancel }) => {
    const [updatedAbilityCost, setUpdatedAbilityCost] = useState(ability.abilityCost);
    const [updatedAbilityCD, setUpdatedAbilityCD] = useState(ability.abilityCD);
    const [updatedAbilityName, setUpdatedAbilityName] = useState(ability.abilityName);
    const [updatedAbilityDesc, setUpdatedAbilityDesc] = useState(ability.abilityDescription);

    const handleAbilityNameChange = (e) => {
        setUpdatedAbilityName(e.target.value);
    };
    const handleAbilityDescChange = (e) => {
        setUpdatedAbilityDesc(e.target.value);
    };
    const handleAbilityCostChange = (e) => {
        setUpdatedAbilityCost(e.target.value);
    };

    const handleAbilityCDChange = (e) => {
        setUpdatedAbilityCD(e.target.value);
    };

    const handleUpdateAbility = () => {
        const updatedAbility = {
            abilityCost: updatedAbilityCost,
            abilityCD: updatedAbilityCD,
            abilityName: updatedAbilityName,
            abilityDescription: updatedAbilityDesc,
        };

        onUpdate(ability.abilityName, updatedAbility);
    };

    return (
        <div>
            <label>Updated Ability Name:</label>
            <input
                type="text"
                value={updatedAbilityName}
                onChange={handleAbilityNameChange}
            />
            <br/>
            <label>Updated Ability Cost:</label>
            <input
                type="text"
                value={updatedAbilityCost}
                onChange={handleAbilityCostChange}
            />
            <br/>
            <label>Updated Ability Cooldown:</label>
            <input
                type="text"
                value={updatedAbilityCD}
                onChange={handleAbilityCDChange}
            />
            <br/>
            <label>Updated Ability Desc:</label>
            <input
                type="text"
                value={updatedAbilityDesc}
                onChange={handleAbilityDescChange}
            />
            <br/>
            <button onClick={handleUpdateAbility}>Update Ability</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default UpdateAbilityForm;
