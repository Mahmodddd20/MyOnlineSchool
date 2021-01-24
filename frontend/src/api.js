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

    logout: (token1) =>
        axios.post(`${BASE_URL}/logout`,token1, token),


    detailsTheLoggedUser: () =>
    axios.get(`${BASE_URL}/details`, token),

    detailsById: (id) =>
        axios.get(`${BASE_URL}/details/${id}`, token),

    detailsAllTeachers: () =>
        axios.get(`${BASE_URL}/details/teacher/all`, token),

    detailsAllStudents: () =>
        axios.get(`${BASE_URL}/details/student/all`, token),

    detailsAllUsers: () =>
        axios.get(`${BASE_URL}/details/users/all`, token),


    updateTheUser: (user, id) =>
        axios.post(`${BASE_URL}/update/user/${id}`,user, token),

    deleteTheUser: (id) =>
        axios.post(`${BASE_URL}/delete/user/${id}`, token),


    myClassesTeacher: () =>
        axios.get(`${BASE_URL}/classroom/teacher`, token),

    myClassesStudent: () =>
        axios.get(`${BASE_URL}/classroom/student`, token),

    allClassesAdmin: () =>
        axios.get(`${BASE_URL}/classroom/all`, token),

    createClass: (classroom) =>
        axios.post(`${BASE_URL}/classroom/create`,classroom ,token),

    showClassById: (id) =>
        axios.get(`${BASE_URL}/classroom/show/${id}`, token),

    deleteClass: (id) =>
        axios.delete(`${BASE_URL}/classroom/delete/${id}`, token),

    editClass: (classroom, id) =>
        axios.post(`${BASE_URL}/classroom/edit/${id}`,classroom, token),

    teacherInClass: (id) =>
        axios.get(`${BASE_URL}/classroom/teacher/${id}` ,token),


    addStudentToClass: (Add) =>
        axios.post(`${BASE_URL}/classtudent/create`,Add ,token),

    deleteStudentFromClass: (del) =>
        axios.post(`${BASE_URL}/classtudent/delete`,del ,token),

    allStudentsInClass: (id) =>
        axios.get(`${BASE_URL}/classtudent/${id}` ,token),


    sendEmailCustomToAllClassStudents: (email,id) =>
        axios.post(`${BASE_URL}/sendemail/class/all/${id}` ,email,token),

    sendWelcomeEmail: (email) =>
        axios.post(`${BASE_URL}/welcomeEmail` ,email,token),


    weeksOfClass: (id) =>
        axios.get(`${BASE_URL}/show/class_weeks/${id}`, token),

    weekById: (id) =>
        axios.get(`${BASE_URL}/week/show/${id}`, token),


    createNewWeek: (week) =>
        axios.post(`${BASE_URL}/week/create`,week ,token),

    deleteWeekById: (id) =>
        axios.delete(`${BASE_URL}/week/delete/${id}` ,token),

    editWeek: (week, id) =>
        axios.post(`${BASE_URL}/week/edit/${id}` ,week,token),

    materialsOfWeek: (id) =>
        axios.get(`${BASE_URL}/show/classes_week_materials/${id}`, token),

    createMaterial: (material) =>
        axios.post(`${BASE_URL}/material/create`,material ,token),

    editMaterial: (material) =>
        axios.post(`${BASE_URL}/material/edit`,material ,token),


    deleteMaterial: (id) =>
        axios.delete(`${BASE_URL}/material/delete/${id}` ,token),

    homeworksOfWeek: (id) =>
        axios.get(`${BASE_URL}/show/classes_week_homeworks/${id}`, token),

    createHomework: (homework) =>
        axios.post(`${BASE_URL}/homework/create`,homework ,token),

    editHomework: (homework) =>
        axios.post(`${BASE_URL}/homework/edit`,homework ,token),

    deleteHomework: (id) =>
        axios.delete(`${BASE_URL}/homework/delete/${id}` ,token),

    showMaterialbyid: (id) =>
        axios.get(`${BASE_URL}/material/show/${id}`, token),

    showHomeworkById: (id) =>
        axios.get(`${BASE_URL}/homework/show/${id}`, token),

    createAnswer:(answer) =>
        axios.post(`${BASE_URL}/answer/create`,answer ,token),

    finished:(id) =>
        axios.get(`${BASE_URL}/answer/finished/${id}` ,token),

    allAnswers:(id) =>
        axios.get(`${BASE_URL}/answer/show/all/${id}` ,token),

    messages: (id) =>
        axios.get(`${BASE_URL}/messages/${id}`, token),

    addMessage: (message) =>
        axios.post(`${BASE_URL}/messages`,message, token),

    groupMessages: (id) =>
        axios.get(`${BASE_URL}/groupmessages/${id}`, token),

    addGroupMessage: (message) =>
        axios.post(`${BASE_URL}/groupmessages`,message, token),

    profilePictureUpload: (file) =>
        axios.post(`${BASE_URL}/upload`,file, token),

    fileUpload: (file) =>
        axios.post(`${BASE_URL}/upload/file`,file, token),










}