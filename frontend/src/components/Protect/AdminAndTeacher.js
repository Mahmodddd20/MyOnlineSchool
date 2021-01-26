import CookieService from "../../CookieService";
import LogOut from "./logout";


export default function AdminAndTeacher(){


    if(CookieService.get('role')=='admin'||CookieService.get('role')=='teacher'){
    }else {
        LogOut()
    }
}