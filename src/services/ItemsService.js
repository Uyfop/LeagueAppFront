import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/item';


const ItemsService = {
    createItem: (item, headers) =>
        axios.post(API_BASE_URL, item, { headers: headers }),
    deleteItem: (itemName, headers) =>
        axios.delete(API_BASE_URL + `/${itemName}`, { headers: headers }),
    updateItem: (itemName, updatedItem, headers) =>
        axios.put(API_BASE_URL + `/${itemName}`, updatedItem, { headers: headers }),
    getAllItems: (headers) =>
        axios.get(API_BASE_URL + '/all', { headers: headers }),
    getAllItemsWithPagination: (page, size, headers) => {
        return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`, {
            headers: headers,
        });
    },

};

export default ItemsService;
