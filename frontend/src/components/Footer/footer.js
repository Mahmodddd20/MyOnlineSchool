import React, { Component } from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from './logo.png';
export default function Footer() {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" sticky='bottom' style={{width:'100%',float: 'right',marginTop:'20px'}}>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                School
            </Navbar.Brand >

        </Navbar>

)
}









