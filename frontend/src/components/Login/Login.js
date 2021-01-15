import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from '../../CookieService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(0);
    const [errors, setErrors] = useState([]);
    const history = useHistory();



    function hasErrorFor (field) {
        return !!errors[field]
    }

    function renderErrorFor (field) {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
              // <strong>{errors[field][0]}</strong>
            </span>
            )
        }
    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleRememberChange (event) {
        if(event.target.checked){
            setRemember(1)
        }else{
            setRemember(0)
        }

    }

    function handleLogin (event) {
        event.preventDefault();



        const login = {
            email: email,
            password: password,
            remember_token: remember
        }
        api.checkLogin(login, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

                const options = {Path: "/",Expires: response.data.expires, Secure: true};
                // CookieService.remove('access_token')
                // CookieService.remove('role')
                // CookieService.remove('id')

                CookieService.set('access_token', response.data.access, options);
                CookieService.set('role', response.data.role, options);
                CookieService.set('id', response.data.id, options);


                {response.data.role=='admin'?history.push('/admin'):history.push('/dashboard')}
               window.location.reload();
            }).catch(error => {
                if(email==='' || password===''){
                setErrors(error.response.data.errors)
                }else{
                    alert('incorrect username or password');
                }
            })
    }


        return (
            <i>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
            <div className="card mt-4">
            <div className="card-header">Login</div>
                <div className="card-body">
                    <form method="POST" onSubmit={handleLogin} >
                        <div className="form-group row">
                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email Addres</label>

                            <div className="col-md-6">
                                <input id="email" type="email"  className={`form-control ${hasErrorFor('email') ? 'is-invalid' : ''}`} name="email" autoComplete="email" autoFocus
                                    value={email}
                        onChange={handleEmailChange}
                                />
                            {renderErrorFor('email')}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                            <div className="col-md-6">
                                <input id="password" type="password" className={`form-control ${hasErrorFor('password') ? 'is-invalid' : ''}`} name="password"  autoComplete="current-password"
                                      value={password}
                        onChange={handlePasswordChange}
                                />
                                {renderErrorFor('password')}
                            </div>
                        </div>
                         <div className="form-group row">
                            <div className ="col-md-6 offset-md-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="remember_token" id="remember"
                                         onChange={handleRememberChange}
                                            defaultChecked={false} />

                                    <label className="form-check-label" htmlFor="remember">
                                       Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</i>
        )
}


