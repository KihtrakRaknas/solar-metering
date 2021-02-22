import React, { useState, useEffect } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavItem, MDBNavLink } from 'mdbreact';

export default function NavBar(props) {
    return (
        <nav>
            <MDBNavbar color="gray" expand="md">
                <MDBNavbarBrand>
                    <strong className="black-text">Solor Metering</strong>
                </MDBNavbarBrand>
                <MDBNavLink to="/home">Graphs</MDBNavLink>
                <MDBNavLink to="/full-table">Full Table</MDBNavLink>
            </MDBNavbar>
        </nav>
    )

}