import CookieService from "../../CookieService";
import LogOut from "./logout";


export default function AdminOnly(){


    if(CookieService.get('role')=='admin'){
    }else {

        LogOut()
    }
}