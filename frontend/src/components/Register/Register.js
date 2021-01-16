import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from '../../CookieService';
import AllUsers from "./AllUsers";
import {Alert, Button} from "react-bootstrap";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCpassword] = useState('');
    const [role, setRole] = useState('');
    const [sent, setSent] = useState('');
    const [errors, setErrors] = useState('');
    const [isAdmin, setIsAdmin] = useState(CookieService.get('role'));

    const history = useHistory();

    useEffect(() => {
        protect();


    },[]);
    function protect(){
        {CookieService.get('role')!=="admin"?handleLogout():console.log(CookieService.get('role'))}


    }
    function handleLogout() {
        console.log(CookieService.get('access_token'))
        let token = 'Bearer '+CookieService.get('access_token')

        api.logout(token).then(response=> {
            console.log(response.data)
            CookieService.remove('access_token')
            CookieService.remove('role')
            CookieService.remove('id')

            // history.push('/login');
            window.location.reload();
        }).catch(error=>{
            console.log(error)
            // CookieService.remove('access_token')
            // CookieService.remove('role')
            // CookieService.remove('id')

            // history.push('/login');
            // window.location.reload();
        })}



    function handleNameChange (event) {
        setName(event.target.value)

    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleCPasswordChange (event) {
        setCpassword(event.target.value)
    }
    function handleRoleChange (event) {
        setRole(event.target.value)
    }



    // function hasErrorFor (field) {
    //      return !!errors[field]
    // }
    //
    // function renderErrorFor (field) {
    //     if (hasErrorFor(field)) {
    //         return (
    //             <span className='invalid-feedback'>
    //           <strong>{errors[field][1]}</strong>
    //         </span>
    //         )
    //     }
    // }

    function handleCreateNewUser (event) {
        event.preventDefault();
        const register = {
            name: name,
            email: email,
            password: password,
            c_password: c_password,
            role: role,
            isAdmin: isAdmin,

        }
        const Email = {
            name: name,
            email: email,
            password: password,
            role: role,
        }

        api.register(register, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                sendWelcomeEmail (Email)
            }).catch(error => {
                setErrors('error')
                // history.push('/login');
            // window.location.reload();

        })
    }
    function sendWelcomeEmail(n){

        api.sendWelcomeEmail(n)
            .then(response => {
                setErrors('')
                setSent(<Alert  variant={'success'} closeLabel>
                    Email sent to the user successfully
                </Alert>)
                window.location.reload();

            }).catch(error => {
                setSent('')
                setErrors(<Alert variant={'danger'}>
            There is Error in sending Email to the user
        </Alert>)
            window.location.reload();

        })
    }
        return (
            <i>
            <div className="container mt-4 text-capitalize">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register
                            <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>
        
                        <div className="card-body">
                            {sent}{errors}
                            <form onSubmit={handleCreateNewUser}>
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
        
                                    <div className="col-md-6">
                                        <input id="name" type="text" className='form-control' name="name"
                                         value={name}
                                            onChange={handleNameChange}  />

                                    </div>
                                </div>
        
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>
        
                                    <div className="col-md-6">
                                        <input id="email" type="email" className='form-control' name="email"
                                             value={email}
                                            onChange={handleEmailChange}
                                        />

                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="role" className="col-md-4 col-form-label text-md-right">Role</label>

                                    <div className="col-md-6">
                                        <select id="role" className='custom-select'  name="role"
                                                value={role}
                                                onChange={handleRoleChange} aria-label="Default select example">
                                            <option >Select The Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="student">Student</option>
                                        </select>

                                    </div>
                                </div>


                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
        
                                    <div className="col-md-6">
                                        <input id="password" type="password" className='form-control'  name="password"
                                             value={password}
                        onChange={handlePasswordChange} 
                                        />
                                    </div>
                                    
                                </div>
        
                                <div className="form-group row">
                                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
        
                                    <div className="col-md-6">
                                        <input id="password-confirm" type="password" className='form-control'  name="password"
                                         value={c_password}
                        onChange={handleCPasswordChange} 
                         />
                                    </div>
                                </div>
        
                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <AllUsers/>
                </div>
            </div>
        </div>
        </i>
        )
}

export default Register
