import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import prepDataForTable from '../helperFunctions/prepDataForTable';

export default function Table(props) {
    const {key, tableData} = prepDataForTable(props.data)
    // console.log(tableData)
    // console.log(props.data)
    return (
        <MDBDataTable
            striped
            borderless    
            //responsive
            small
            //scrollX
            
            data={{
                columns:key.map(name=>({label: name, field:name})),
                rows:tableData
            }}
        />
    )

}