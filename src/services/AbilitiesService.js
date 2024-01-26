import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/abilities';

const AbilitiesService = {
    createAbility: (ability, championName, headers) => axios.post(API_BASE_URL +`/${championName}`, ability, { headers: headers }),
    getAbilitiesByChampion: (championName, headers) => axios.get(`${API_BASE_URL}/${championName}`, { headers: headers }),
    getAllAbilitiesWithPagination: (page, size, headers) => {
        return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`, {
            headers: headers,
        });
    }

};

export default AbilitiesService;
