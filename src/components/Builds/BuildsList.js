import React, {useEffect, useState} from 'react';
import BuildService from '../../services/BuildsService.js';
import {useAuth} from "../../services/AuthProvider.js";
import UpdateBuildForm from './UpdateBuildsForm.js';

const BuildsList = ({ refreshBuilds, onBuildDeleted }) => {
    const [builds, setBuilds] = useState([]);
    const [selectedBuildId, setSelectedBuildId] = useState(null);
    const { token } = useAuth();
    const buildsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    useEffect(() => {
        LoadBuild(currentPage);
    }, [currentPage, refreshBuilds, token]);

    const LoadBuild = (currentPage) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        BuildService.getAllBuilds(currentPage, buildsPerPage, headers)
            .then((response) =>{
                setBuilds(response.data.content);
                setTotalPages(response.data.totalPages);
                setSelectedBuildId(null);
            })
            .catch((error) => console.error('Error fetching Builds:', error))
    };

    const HandleBuildDelete =(build_id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        BuildService.deleteBuild(build_id,headers)
            .then(() => {
                console.log("build deleted");
                onBuildDeleted();
            })
            .catch((error) => console.error('Error deleting builds',error))
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };
    const handleUpdateClick = (buildId) => {
        setSelectedBuildId(buildId);
        setIsUpdateFormVisible(true);
    };
    const toggleUpdateForm = () => {
        setIsUpdateFormVisible(!isUpdateFormVisible);
    };

    const handleCancelUpdate = () => {
        setSelectedBuildId(null);
        toggleUpdateForm();
    };

    return (
        <div>
            <h1>Builds List</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>ChampName</th>
                        <th>First Item</th>
                        <th>Second Item</th>
                        <th>Third Item</th>
                    </tr>
                    </thead>
                    <tbody>
                    {builds.map((build) => (
                        <tr key={build.id}>
                            <td>{build.id}</td>
                            <td>{build.champion.champName}</td>
                            <td>{build.items && build.items.length > 0 ? build.items[0].itemName : ''}</td>
                            <td>{build.items && build.items.length > 1 ? build.items[1].itemName : ''}</td>
                            <td>{build.items && build.items.length > 2 ? build.items[2].itemName : ''}</td>
                            <td>
                                {(isUpdateFormVisible && selectedBuildId === build.id) ? (
                                    <UpdateBuildForm
                                        buildId={selectedBuildId}
                                        onBuildUpdated={() => {
                                            LoadBuild(currentPage);
                                            toggleUpdateForm();
                                        }}
                                        onCancel={() => {
                                            handleCancelUpdate();
                                        }}
                                    />
                                ) : (
                                    <>
                                        <button onClick={() => HandleBuildDelete(build.id)}>Delete</button>
                                        <button onClick={() => handleUpdateClick(build.id)}>Update</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <span>Page: {currentPage + 1}</span>
                <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>

        </div>
    );
};
export default BuildsList;
