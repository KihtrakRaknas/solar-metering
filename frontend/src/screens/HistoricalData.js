import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import NoData from '../components/NoData';
import { MDBBtn } from 'mdbreact';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import firebase from "firebase";


/** This page will contain all table data */
export default function HistoricalData({ year, setYear }) {
    const [documents, setDocuments] = useState([]);
    const [downloadLinks, setDownloadLinks] = useState({});

    useEffect(()=>{
        const db = firebase.firestore();
        let documentsLocal = []
        const unsubscribe = db.collection("logData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id)
                documentsLocal.push(doc)
            });
        });
        setDocuments(documentsLocal)
        return unsubscribe
    },[])

    
    return (
        <div className="App">
            <br/>
            <div className="title_component">
                <header className="App-header">
                    <h1 className="App-title" style={{textAlign:"center"}}>Historical Data</h1>
                </header>
            </div>
            <br/>
            <div style={{ padding: 15, overflowX: "auto" }}>
                <h2>Currently loaded data for {year}</h2>
                <p>The site will be populated with data from {year}.</p>
                {documents.length > 0?<>
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="primary">
                            Load year
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            {([...documents]).map(el=><MDBDropdownItem onClick={()=>setYear(el.id)}>{el.id}</MDBDropdownItem>)}
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    <br/><br/><br/>
                    <h2>Download links:</h2>
                    {([...documents]).map(el=>{
                        if(downloadLinks[el.id] == null){
                            (async () => {
                                const JSONdata = el.data()
                                const blob = new Blob([JSON.stringify(JSONdata)], {type:'application/json'})
                                const fileDownloadUrl = URL.createObjectURL(blob)
                                console.log(fileDownloadUrl)
                                setDownloadLinks({...downloadLinks, [el.id]: fileDownloadUrl })
                            })()
                        }
                        return (<MDBBtn disabled={downloadLinks[el.id] == null} download={el.id+".json"} href={downloadLinks[el.id]}>{downloadLinks[el.id] == null?"loading...":el.id}</MDBBtn>)
                    })}
                </>:<NoData/>}
            </div>
        </div>
    );
}