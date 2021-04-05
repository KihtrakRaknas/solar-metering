import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';

export default function Meta(props) {
    return (
        <div className="App">
            <br/>
            <div className="title_component">
                <header className="App-header">
                    <h1 className="App-title" style={{textAlign:"center"}}>Site information</h1>
                </header>
            </div>
            <br/>
            <div style={{ padding: 15, overflowX: "auto" }}>
                <div style={{textAlign:"center"}}>
                    <MDBBtn>Manual Master Auth</MDBBtn>
                </div>
            </div>
        </div>
    );
}