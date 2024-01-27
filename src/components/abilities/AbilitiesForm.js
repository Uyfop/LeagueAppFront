import React, { useState } from 'react';
import AbilitiesService from '../../services/AbilitiesService.js';
import { useAuth } from '../../services/AuthProvider.js';
import ChampionService from "../../services/ChampionService.js";
import ChampionSelector from "../Builds/ChampionSelector.js";

const AbilitiesForm = ({onAbilityCreated}) => {
    const [ability, setAbility] = useState({
        abilityName: "",
        abilityCost: 0,
        abilityCD: 0,
        abilityDescription: ""
    });
    const [championName, setChampionName] = useState('');
    const [errors, setErrors] = useState([]);
    const { token } = useAuth();
    const errorMessages = {
        abilityCD: 'Cooldown cannot be lower than 0.',
        abilityCost: 'Mana Cost cannot be lower than 0.',
        abilityName: 'The Ability name cannot be empty',
        duplicateAbilityName: 'Ability with this name already exists for the champion.',
        championNotFound: 'Champion not found.',
    };
    const handleSubmit = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const Errors = {};
        if (ability.abilityCD < 0) {
            Errors.abilityCD = true;
        }

        if (ability.abilityCost < 0) {
            Errors.abilityCost = true;
        }

        if (!ability.abilityName.trim()) {
            Errors.abilityName = true;
        }
        try {
            await ChampionService.getChampionById(championName, headers);

            const allAbilitiesResponse = await AbilitiesService.getAbilitiesByChampion(
                championName,
                headers
            );
            const abilities = allAbilitiesResponse.data.content;
            console.log(abilities);
            const duplicateAbility = abilities.find(existingAbility => existingAbility.abilityName === ability.abilityName);

            if (duplicateAbility) {
                Errors.duplicateAbilityName = true;
            }
        } catch (error) {
            console.error('Error checking duplicate ability name:', error);
        }
        if (Object.keys(Errors).length > 0) {
            setErrors(Errors);
            return;
        } else {
            setErrors({});
        }
        await AbilitiesService.createAbility(ability, championName, headers)
            .then(response => {
                console.log('Ability created:', response.data)
                onAbilityCreated(response.data);
                setAbility({
                    abilityName: "",
                    abilityCost: 0,
                    abilityCD: 0,
                    abilityDescription: ""
                });
            })
            .catch(error => console.error('Error creating ability:', error));
    };

    const handleChange = e => {
        setAbility({ ...ability, [e.target.name]: e.target.value });
    };

    const handleChampionSelect = (champion) => {
       setChampionName(champion);
    };

    return (
        <div>
            <h1>Create Ability</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <ChampionSelector onSelect={handleChampionSelect} />
                </label>
                <label>
                    Ability Name:
                    <input
                        type="text"
                        name="abilityName"
                        value={ability.abilityName}
                        onChange={handleChange}
                    />
                    {errors.abilityName && (
                        <div style={{ color: 'red' }}>
                            {errorMessages.abilityName}
                        </div>
                    )}
                    {errors.duplicateAbilityName && (
                        <div style={{ color: 'red' }}>
                            {errorMessages.duplicateAbilityName}
                        </div>
                    )}
                </label>
                <br />
                <label>
                    Ability Cost:
                    <input
                        type="number"
                        name="abilityCost"
                        value={ability.abilityCost}
                        onChange={handleChange}
                    />
                    {errors.abilityCost && (
                        <div style={{ color: 'red' }}>
                            {errorMessages.abilityCost}
                        </div>
                    )}
                </label>

                <br />
                <label>
                    Ability Cooldown:
                    <input
                        type="number"
                        name="abilityCD"
                        value={ability.abilityCD}
                        onChange={handleChange}
                    />
                    {errors.abilityCD && (
                        <div style={{ color: 'red' }}>
                            {errorMessages.abilityCD}
                        </div>
                    )}
                </label>
                <br />
                <label>
                    Ability Description:
                    <textarea
                        name="abilityDescription"
                        value={ability.abilityDescription}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Create Ability</button>
            </form>
        </div>
    );
};


export default AbilitiesForm;