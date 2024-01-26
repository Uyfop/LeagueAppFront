import React, { useState, useEffect } from 'react';
import ChampionService from '../services/ChampionService.js';
import '../styles/ChampionList.css';

const ChampionList = ({ refreshChampions, onChampionDeleted }) => {
    const [champions, setChampions] = useState([]);
    const [selectedChampion, setSelectedChampion] = useState(null);
    const [newChampType, setNewChampType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    useEffect(() => {
        loadChampions(currentPage);
    }, [refreshChampions, currentPage]);

    const loadChampions = (page) => {
        ChampionService.getAllChampionsWithPagination(page, 2)
            .then((response) => {
                setChampions(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => console.error('Error fetching champions:', error));
    };

    const handleDelete = (championName) => {
        ChampionService.deleteChampion(championName)
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

        ChampionService.updateChampion(selectedChampion.champName, {
            champName: selectedChampion.champName,
            champType: newChampType,
        })
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
            <span>Current Page: {currentPage}       </span>
            <button onClick={() => handlePageChange(currentPage - 1)}>-</button>
            <button onClick={() => handlePageChange(currentPage + 1)}>+</button>
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

                </div>

            </div>
        </div>
    );
};


export default ChampionList;
