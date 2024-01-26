import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/champions';

const ChampionService = {
    getAllChampions: (headers) => axios.get(API_BASE_URL + '/all', { headers: headers }),
    createChampion: (champion, headers) => axios.post(API_BASE_URL, champion, { headers: headers }),
    deleteChampion: (championName, headers) => axios.delete(API_BASE_URL + `/${championName}`, { headers: headers }),
    updateChampion: (championName, updatedChampion, headers) => axios.put(`${API_BASE_URL}/${championName}`, updatedChampion, {headers: headers }),
    getAllChampionsWithPagination: (page, size, headers) => {
        return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`, {
            headers: headers,
        });
    },
    getChampionById: (championName, headers) => axios.get(`${API_BASE_URL}/${championName}`, { headers: headers}),
};

export default ChampionService;
