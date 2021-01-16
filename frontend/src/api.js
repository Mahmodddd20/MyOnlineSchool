import axios from 'axios';
import CookieService from './CookieService';

const BASE_URL = 'http://localhost:8000/api'

const cookie = CookieService.get('access_token');

const token = {
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+ cookie
    },   
}


export default{

    checkLogin: (login) =>
    axios.post(`${BASE_URL}/login`,login),

    register: (register) =>
    axios.post(`${BASE_URL}/register`,register, token),

    details: () =>
    axios.get(`${BASE_URL}/details`, token),

    detailsOne: (id) =>
        axios.get(`${BASE_URL}/details/${id}`, token),

    updatetheuser: (user,id) =>
        axios.post(`${BASE_URL}/update/user/${id}`,user, token),

    deleteTheUser: (id) =>
        axios.post(`${BASE_URL}/delete/user/${id}`, token),

    detailsAllTeacher: () =>
        axios.get(`${BASE_URL}/details/teacher/all`, token),

    detailsAllStudent: () =>
        axios.get(`${BASE_URL}/details/student/all`, token),

    detailsAllUsers: () =>
        axios.get(`${BASE_URL}/details/users/all`, token),


    addStudentToClass: (Add) =>
        axios.post(`${BASE_URL}/classtudent/create`,Add ,token),

    deletestudentfromclass: (del) =>
        axios.post(`${BASE_URL}/classtudent/delete`,del ,token),

    allStudentInClass: (id) =>
        axios.get(`${BASE_URL}/classtudent/${id}` ,token),

    teacherInClass: (id) =>
        axios.get(`${BASE_URL}/classroom/teacher/${id}` ,token),


    sendEmailToAllClassStudents: (id) =>
        axios.post(`${BASE_URL}/email/class/all/${id}` ,token),

    sendEmailCustomToAllClassStudents: (email,id) =>
        axios.post(`${BASE_URL}/sendemail/class/all/${id}` ,email,token),

    sendWelcomeEmail: (email) =>
        axios.post(`${BASE_URL}/welcomeEmail` ,email,token),


    logout: (token1) =>
    axios.post(`${BASE_URL}/logout`,token1, token),

    myclassesT: () =>
        axios.get(`${BASE_URL}/classroom/teacher`, token),

    myclassesS: () =>
        axios.get(`${BASE_URL}/classroom/student`, token),


    allmyclasses: () =>
        axios.get(`${BASE_URL}/classroom/all`, token),


    createclass: (classroom) =>
        axios.post(`${BASE_URL}/classroom/create`,classroom ,token),

    myclass: (id) =>
        axios.get(`${BASE_URL}/classroom/show/${id}`, token),

    deleteclass: (id) =>
        axios.delete(`${BASE_URL}/classroom/delete/${id}`, token),

    editclass: (classroom,id) =>
        axios.post(`${BASE_URL}/classroom/edit/${id}`,classroom, token),

    myweeks: (id) =>
        axios.get(`${BASE_URL}/show/class_weeks/${id}`, token),

    myweek: (id) =>
        axios.get(`${BASE_URL}/week/show/${id}`, token),


    createweek: (week) =>
        axios.post(`${BASE_URL}/week/create`,week ,token),

    deleteweek: (id) =>
        axios.delete(`${BASE_URL}/week/delete/${id}` ,token),

    editweek: (week,id) =>
        axios.post(`${BASE_URL}/week/edit/${id}` ,week,token),

    mymaterials: (id) =>
        axios.get(`${BASE_URL}/show/classes_week_materials/${id}`, token),

    creatematerial: (material) =>
        axios.post(`${BASE_URL}/material/create`,material ,token),

    editmaterial: (material) =>
        axios.post(`${BASE_URL}/material/edit`,material ,token),


    deletematerial: (id) =>
        axios.delete(`${BASE_URL}/material/delete/${id}` ,token),

    myhomeworks: (id) =>
        axios.get(`${BASE_URL}/show/classes_week_homeworks/${id}`, token),

    createhomework: (homework) =>
        axios.post(`${BASE_URL}/homework/create`,homework ,token),

    edithomework: (homework) =>
        axios.post(`${BASE_URL}/homework/edit`,homework ,token),

    deletehomework: (id) =>
        axios.delete(`${BASE_URL}/homework/delete/${id}` ,token),

    showmaterialbyid: (id) =>
        axios.get(`${BASE_URL}/material/show/${id}`, token),

    showhomeworkbyid: (id) =>
        axios.get(`${BASE_URL}/homework/show/${id}`, token),

    createanswer:(answer) =>
        axios.post(`${BASE_URL}/answer/create`,answer ,token),

    finished:(id) =>
        axios.get(`${BASE_URL}/answer/finished/${id}` ,token),

    allanswers:(id) =>
        axios.get(`${BASE_URL}/answer/show/all/${id}` ,token),

    messages: (id) =>
        axios.get(`${BASE_URL}/messages/${id}`, token),

    addmessage: (message) =>
        axios.post(`${BASE_URL}/messages`,message, token),

    groupmessages: (id) =>
        axios.get(`${BASE_URL}/groupmessages/${id}`, token),

    addgroupmessage: (message) =>
        axios.post(`${BASE_URL}/groupmessages`,message, token),

    myupload: (file) =>
        axios.post(`${BASE_URL}/upload`,file, token),









}