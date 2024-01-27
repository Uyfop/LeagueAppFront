import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/builds';

const BuildService = {
    createBuild: (build, headers) =>
        axios.post(API_BASE_URL +`/save`, build, { headers: headers }),
    getAllBuilds: (page, size, headers) =>
        axios.get(API_BASE_URL + `/allpages`, { params: { page, size }, headers: headers }),
    deleteBuild: (build_id, headers) =>
        axios.delete(API_BASE_URL +`/${build_id}`,{headers: headers}),
    updateBuild: (build_id, updatedBuild, headers) =>
        axios.put(API_BASE_URL + `/update/${build_id}`, updatedBuild, { headers: headers }),
    getBuildById: (build_id, headers) =>
        axios.get(API_BASE_URL + `/${build_id}`, {headers: headers}),
};

export default BuildService;
