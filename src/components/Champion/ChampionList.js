import React, { useState, useEffect } from 'react';
import ChampionService from '../../services/ChampionService.js';
import '../../styles/ChampionList.css';
import { useAuth } from '../../services/AuthProvider.js';

const ChampionList = ({ refreshChampions, onChampionDeleted }) => {
    const [champions, setChampions] = useState([]);
    const [selectedChampion, setSelectedChampion] = useState(null);
    const [newChampType, setNewChampType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth();


    useEffect(() => {
        loadChampions(currentPage);
    }, [refreshChampions, currentPage, token]);

    const loadChampions = (page) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        ChampionService.getAllChampionsWithPagination(page, 2, headers)
            .then((response) => {
                setChampions(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => console.error('Error fetching champions:', error));
    };

    const handleDelete = (championName) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        ChampionService.deleteChampion(championName, headers)
            .then(() => {
                console.log('Champion deleted:', championName);
                onChampionDeleted();
            })
            .catch((error) => console.error('Error deleting champion:', error));
    };

    const handleChampionClick = (champion) => {
        setSelectedChampion((prevChampion) =>
            prevChampion && prevChampion.champName === champion.champName ? null : champion
        );
    };

    const handleUpdateChampion = async () => {
        if (!selectedChampion) {
            console.error('No champion selected');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        ChampionService.updateChampion(selectedChampion.champName, {
            champName: selectedChampion.champName,
            champType: newChampType,
        }, headers)
            .then(() => {
                console.log('Champion updated:');
                onChampionDeleted();
            })
            .catch((error) =>  console.error('Error updating champion:', error));
    };

    const handlePageChange = (newPage) => {
        if(newPage >= 0)
            setCurrentPage(newPage);
    };

    const PrintPage = () => {
        console.log(currentPage);
    };
    return (
        <div>
            <h1>Champion List</h1>
            <div className="champion-container">

                <div className="champion-info">
                    <table>
                        <thead>
                        <tr>
                            <tr></tr>
                            <th>Champion Name</th>
                            <th>Champion Type</th>
                            <th>Buttons</th>
                        </tr>
                        </thead>
                        <tbody>
                        {champions.map((champion) => (
                            <tr key={champion.champName}>
                                <td className="champion-portraits">
                                    <div onClick={() => handleChampionClick(champion)} key={champion.champName}>
                                        <img src={`/images/${champion.champName.toLowerCase()}.jpg`}
                                             alt={champion.champName}/>
                                    </div>
                                </td>
                                <td>
                                    {champion.champName}
                                </td>
                                <td>
                                    {champion.champType}
                                </td>
                                <td>
                                    {selectedChampion && selectedChampion.champName === champion.champName && (
                                        <div>
                                            <button onClick={() => handleDelete(champion.champName)}>Delete</button>
                                            <div>
                                                <label>New ChampType:</label>
                                                <input
                                                    type="text"
                                                    value={newChampType}
                                                    onChange={(e) => setNewChampType(e.target.value)}
                                                />
                                                <button onClick={handleUpdateChampion}>Update ChampType</button>
                                            </div>
                                        </div>
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


export default ChampionList;
