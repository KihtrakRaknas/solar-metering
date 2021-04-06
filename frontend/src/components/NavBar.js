import React, { useState, useEffect } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavItem, MDBNavLink } from 'mdbreact';

export default function NavBar({}) {
    const [lastWrite, setLastWrite] = useState(null);

    const checkLastWrite = ()=>{
        fetch('http://localhost:4001/last-write').then(res=>res.json()).then(data=>{
            console.log(`Last Write: ${data.lastWrite}`)
            setLastWrite(data.lastWrite)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        checkLastWrite()
        setInterval(checkLastWrite, 1000*60*5) // Update last write every 5 minutes
    }, [true])

    const calcDiffInTime = (timestamp) =>{
        const diff = (new Date()) - timestamp
        const diffInHrs = diff/(1000*60*60)
        return {hours: Math.floor(diffInHrs % 24), days: Math.floor(diffInHrs/24), recent: diffInHrs<1}
    }

    let timeObj = calcDiffInTime(lastWrite)
    
    return (
        <>
            <nav>
                <MDBNavbar color="gray" expand="md" fixed="top" scrolling style={{backgroundColor:"white"}}>
                    <MDBNavbarBrand>
                        <strong className="black-text">Solor Metering</strong>
                    </MDBNavbarBrand>
                    <MDBNavLink to="/home">Graphs</MDBNavLink>
                    <MDBNavLink to="/full-table">Full Table</MDBNavLink>
                    <div className="ml-auto">
                        {lastWrite != null? 
                            lastWrite == -1? 
                                `No uploads have happened yet`
                            :
                                timeObj.recent?
                                    `An upload recently took place`
                                :
                                    `Last upload was ${timeObj.hours} hours and ${timeObj.days} days ago`
                        :
                            "View Only"}
                    </div>
                </MDBNavbar>
            </nav>
            <br/>
            <br/>
            <br/>
        </>
    )

}