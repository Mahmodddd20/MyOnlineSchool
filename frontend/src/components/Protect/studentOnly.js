import CookieService from "../../CookieService";
import LogOut from "./logout";


export default function StudentOnly(){


    if(CookieService.get('role')=='student'){
    }else {
        LogOut()
    }
}