import CookieService from "../../CookieService";
import LogOut from "./logout";


export default function TeacherOnly(){


    if(CookieService.get('role')=='teacher') {
    }else {
        LogOut()
    }
}