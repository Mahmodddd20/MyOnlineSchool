import React, { useRef, useEffect, useState } from 'react'
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from '../../CookieService';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import '../../index.css';
import logo from './logo.png';

export default function Header() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [check, setCheck] = useState('');

    const hasMount = useRef(false)

    useEffect(() => {
        details();
    },[]);

    function details(){
        api.details().then(response => {
            setName(response.data.name)
            setRole(response.data.role)
            setId(response.data.id)
            setCheck(true)
        }).catch(error => {
            setCheck(false);
        })
    }
    function guest(){
        return(
            <>
                <Navbar.Brand href="/login" >Log in</Navbar.Brand>
                <Navbar.Brand href="/login" >About us</Navbar.Brand>
                <Navbar.Brand href="/login" >Contact us</Navbar.Brand>

            </>
        )
    }

    function auth(){
        return(
            <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {role!=='admin'?<Navbar.Brand className='pr-4 ' href="/dashboard">Dashboard
                    </Navbar.Brand>:''}
                    <Nav className="mr-auto">
                        <NavDropdown className='font-weight-bold text-capitalize' title={ role+' '+name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick= {() => handleLogout()}>Logout</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                            {role=='admin'?<NavDropdown.Item href="/register">register new users</NavDropdown.Item>:''}
                        </NavDropdown>
                        {role=='admin'?<Nav.Link href="/admin">Admin Page</Nav.Link>:''}

                        <Nav.Link href={"/allmessaging/"}>Messaging</Nav.Link>

                        <Nav.Link href="/">Home</Nav.Link>


                    </Nav>
                </Navbar.Collapse>
                </>
        )
    }

    function handleLogout() {
        api.logout().then((response) => {
            CookieService.remove('access_token')
            CookieService.remove('role')
            CookieService.remove('id')

            history.push('/login');
            window.location.reload();
        }).catch(error=>{
            // history.push('/login');
            window.location.reload();
    })}

    return (
        <div style={{display:'flex',
            backgroundColor:'whitesmoke',
            padding:10,
            position: 'sticky',
            zIndex:1000,
            }}>
            <img
                alt=""
                src={logo}
                width="70"
                height="70"
                className="d-inline-block align-top"
            />{' '}
        <div style={{width:'100%'}}>

        <span  className="font-weight-bolder pl-2 " style={{fontSize:50,color:'darkolivegreen'}}>
            My Online School</span>
        <Navbar bg="" expand="lg" style={{float: 'right',marginRight: 30,fontSize:18,backgroundColor:'whitesmoke'}}>

                { check==true ? auth() : guest() }
            </Navbar>
            </div>
        </div>


    )
}









