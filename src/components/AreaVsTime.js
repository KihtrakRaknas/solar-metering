import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryTheme, VictoryStack, VictoryLegend } from 'victory';

export default function AreaVsTime(props){
    // console.log(props.yAxis.split(" ").join("_"))
    // console.log(props.tableData)
    const data = props.tableData.map(row=>({x:new Date(row["time (UTC)"]).getTime(), y:Number(row[props.yAxis.split(" ").join("_")])}))
    console.log(data)
    return (<VictoryArea data={data}/>)
}