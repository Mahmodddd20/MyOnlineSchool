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
    const [picture, setPicture] = useState('');
    const [check, setCheck] = useState(false);

    // const hasMount = useRef(false)

    useEffect(() => {
        details();
    },[]);

    function details(){
        api.details().then(response => {
            let fname=response.data.name
            let index = fname.indexOf(" ");
            let sname = fname.substr(0, index);
            console.log(sname)
            setName(sname)
            setRole(response.data.role)
            setId(response.data.id)
            setPicture(response.data.picture)
            setCheck(true)
        }).catch(error => {
            setCheck(false);

        })
    }
    function guest(){
        return(
            <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-0">

                    <Nav.Link href="/login" >Log in</Nav.Link>
                <Nav.Link href="/login" >About us</Nav.Link>
                <Nav.Link href="/login" >Contact us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </>
        )
    }

    function auth(){
        return(
            <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-0">
                        {role!=='admin'?<Nav.Link href="/dashboard">Dashboard</Nav.Link>:
                            <Nav.Link href="/admin">Dashboard</Nav.Link>}

                        <NavDropdown className='text-capitalize mr-2' title={ name+' ('+role+')'} id="basic-nav-dropdown">
                            <NavDropdown.Item href={"/profile/"+id}>Profile</NavDropdown.Item>
                            {role=='admin'?<NavDropdown.Item href="/register">register new users</NavDropdown.Item>:''}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick= {() => handleLogout()}>Logout</NavDropdown.Item>


                        </NavDropdown>
                        <Nav.Link href={"/profile/"+id}>
                            <img className='bg-white rounded-circle'
                                 style={{width:'50px',position:'absolute',top:'2px',right:'8px'}} src={picture}/></Nav.Link>

                            </Nav>
                </Navbar.Collapse>
                </>
        )
    }

    function handleLogout() {
        api.logout().then((response) => {
            console.log(response.data)
            CookieService.remove('access_token')
            CookieService.remove('role')
            CookieService.remove('id')

            // history.push('/login');
            // window.location.reload();
        }).catch(error=>{
            console.log(error)
            // CookieService.remove('access_token')
            // CookieService.remove('role')
            // CookieService.remove('id')

            // history.push('/login');
            // window.location.reload();
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
        <Navbar bg="" expand="lg" style={{float: 'right',marginRight: 0,fontSize:18,backgroundColor:'whitesmoke'}}>

                { check==true ? auth() : guest() }
            </Navbar>
            </div>
        </div>


    )
}









