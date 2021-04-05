import React, { useState, useEffect } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavItem, MDBNavLink } from 'mdbreact';

export default function NavBar({isMaster}) {
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
                        {isMaster?"Master Device":isMaster==null?"Loading...":"View Only"}
                    </div>
                </MDBNavbar>
            </nav>
            <br/>
            <br/>
            <br/>
        </>
    )

}