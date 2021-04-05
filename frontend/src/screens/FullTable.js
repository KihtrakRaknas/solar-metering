import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import NoData from '../components/NoData';
import { MDBBtn } from 'mdbreact';

/** This page will contain all table data */
export default function FullTable({ data }) {
    const [reverse, setReverse] = useState(false);
    return (
        <div className="App">
            <br/>
            <div className="title_component">
                <header className="App-header">
                    <h1 className="App-title" style={{textAlign:"center"}}>Complete Solar Data from MSView</h1>
                </header>
            </div>
            <br/>
            <div style={{ padding: 15, overflowX: "auto" }}>
                {data.length > 0 ? <><Table data={data} reverse={reverse}/></> : <NoData />}
                <div style={{textAlign:"center"}}>
                    <MDBBtn gradient={reverse?"peach":"purple"} onClick={()=>setReverse(!reverse)}>Reverse Order</MDBBtn>
                </div>
            </div>
        </div>
    );
}