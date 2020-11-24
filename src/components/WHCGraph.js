import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryStack, VictoryLegend, VictoryLabel } from 'victory';
import prepDataForTable from '../helperFunctions/prepDataForTable';

export default function VBGraph(props) {
    const { tableData } = prepDataForTable(props.data)
    const categories = ["Whc daily"]
    const windowSize = useWindowSize();
    // console.log(tableData)
    // console.log(props.data)
    return (
        <div style={{ height: 500, }}>
            <VictoryChart
                theme={VictoryTheme.material}
                width={windowSize.width - 10}
                scale={{ x: "time", y: "linear" }}
            >
                <VictoryStack animate colorScale={["black", "red"]}>
                    {createStack(categories, tableData)}
                    {/* <AreaVsTime yAxis="Vb max daily" tableData={tableData}/> */}
                    {/* <AreaVsTime yAxis="Vb max daily" tableData={tableData}/>
                    <AreaVsTime yAxis="Vb min daily" tableData={tableData}/> */}
                </VictoryStack>
                <VictoryAxis axisLabelComponent={<VictoryLabel dy={20} />} label="Date" />
                <VictoryAxis axisLabelComponent={<VictoryLabel dy={-20} />} label="Whc Value (unit goes here)" dependentAxis />
            </VictoryChart>
        </div>
    )

}

function createStack(categories, tableData) {
    let result = []
    let total
    for (let cat of categories) {
        let newData = getVsTime(cat, tableData)
        if (!total) {
            total = newData.map(element => element.y)
        } else {
            newData = newData.map((element, index) => {
                element.y = element.y - total[index]
                return element
            });
            total = total.map((element, index) => element + newData[index].y);
        }
        console.log(newData)
        result.push(<VictoryLine data={newData} />)
    }
    return result
}

function getVsTime(yAxis, tableData) {
    return tableData.map(row => ({ x: new Date(row["time (UTC)"]), y: Number(row[yAxis.split(" ").join("_")]) }))
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