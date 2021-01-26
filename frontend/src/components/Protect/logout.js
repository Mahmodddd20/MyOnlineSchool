import React from "react";
import CookieService from "../../CookieService";
import api from "../../api";


export default function LogOut(){
    let token = 'Bearer '+CookieService.get('access_token')
    api.logout(token).then(response=> {
        CookieService.remove('access_token')
        CookieService.remove('role')
        CookieService.remove('id')
        window.location.href = '/login';
    }).catch(error=>{
        window.location.href = '/';

    })
}