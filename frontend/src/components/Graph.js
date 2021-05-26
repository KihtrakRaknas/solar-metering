import React, { useState, useEffect } from 'react';
import prepDataForTable from '../helperFunctions/prepDataForTable';
import Plot from 'react-plotly.js';
import { fileNames } from '../helperFunctions/globals'

export default function Graph(props) {
    const windowSize = useWindowSize();
    const traces = []
    for(let filename of fileNames){
        const { tableData } = prepDataForTable(props.data[filename])
        for (let category of props.categories) {
            const { x, y } = getVsTime(category, tableData)
            traces.push({
                x,
                y,
                name: `${filename} - ${category}`,
                type: 'scatter',
                mode: 'lines+markers',
                //marker: { color: category.includes("max") ? 'red' : 'black' },
            })
        }
    }
    return (
        <Plot
            data={traces}
            layout={{
                width: windowSize.width - 20, height: 500, title: props.title, xaxis: { title: 'Time' }, yaxis: { title: props.yTitle }
            }}
            config={{ responsive: true }}
        />
    )

}

function getVsTime(yAxis, tableData) {
    return { x: tableData.map(row => new Date(row["time (UTC)"])), y: tableData.map(row => Number(row[yAxis/*.split(" ").join("_")*/])) }
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}