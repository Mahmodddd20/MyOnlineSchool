import CookieService from "../../CookieService";
import LogOut from "./logout";


export default function TeacherAndStudentOnly(){


    if(CookieService.get('role')=='teacher'||CookieService.get('role')=='student'){
    }else {
        LogOut()
    }
}