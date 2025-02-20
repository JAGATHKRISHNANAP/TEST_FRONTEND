import React, { useState } from 'react';

const FilterPage = () => {
    const [sortedCategories, setSortedCategories] = useState([]);
    const [sortedValues, setSortedValues] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    const handleTop10 = () => {
        const sortedData = [...sortedValues].map((value, index) => ({
            category: sortedCategories[index],
            value
        }));
        sortedData.sort((a, b) => b.value - a.value); // Sort descending
        const top10 = sortedData.slice(0, 10); // Get top 10
        setSortedCategories(top10.map(item => item.category));
        setSortedValues(top10.map(item => item.value));

        setIsFiltered(true); // Mark as filtered
    };

    const handleBottom10 = () => {
        const sortedData = [...sortedValues].map((value, index) => ({
            category: sortedCategories[index],
            value
        }));
        sortedData.sort((a, b) => a.value - b.value); // Sort ascending
        const bottom10 = sortedData.slice(0, 10); // Get bottom 10
        setSortedCategories(bottom10.map(item => item.category));
        setSortedValues(bottom10.map(item => item.value));
        setIsFiltered(true); // Mark as filtered
    };

    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor((360 / numColors) * i);
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    return (
        <div style={{ padding: '20px' }}>
            
            <h2>Filtered Data</h2>
            <div>
                <button onClick={handleTop10}>Top 10</button>
                <button onClick={handleBottom10}>Bottom 10</button>
            </div>

            <div>
                {isFiltered && (
                    <>
                        <h3>Sorted Categories:</h3>
                        <ul>
                            {sortedCategories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>
                        <h3>Sorted Values:</h3>
                        <ul>
                            {sortedValues.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default FilterPage;
