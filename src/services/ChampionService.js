import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/champions';

const ChampionService = {
    getAllChampions: () => axios.get(API_BASE_URL + '/all'),
    createChampion: champion => axios.post(API_BASE_URL, champion),
    deleteChampion: (championName) => axios.delete(API_BASE_URL + `/${championName}`),
    updateChampion: (championName, updatedChampion) => axios.put(`${API_BASE_URL}/${championName}`, updatedChampion),
    getAllChampionsWithPagination: (page, size) => axios.get(`${API_BASE_URL}?page=${page}&size=${size}`),
};

export default ChampionService;
