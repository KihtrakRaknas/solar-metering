import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import prepDataForTable from '../helperFunctions/prepDataForTable';

export default function Table(props) {
    const {key, tableData} = prepDataForTable(props.data, props.fields)
    console.log(props.reverse)
    return (
        <MDBDataTable
            striped
            borderless    
            //responsive
            small
            scrollX
            hover 
            sortable={false}
            data={{
                columns:key,
                rows:props.reverse?tableData:[...tableData].reverse() /* I have no clue why the spread syntax makes it work but it does */
            }}
        />
    )

}