import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from "../../CookieService";
import {Alert, Button, CardColumns, Container, Table} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
export default function Addstudenttoclass(props) {
    const [classroom, setClass] = useState([]);
    const [student, setStudent] = useState([]);
    const [student_id, setStudent_id] =useState('');
    const [class_id, setClass_id] =useState(props.match.params.id);
    const [classStudents, setClassStudents] = useState([]);
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory();

    useEffect(() => {
        protect();
        detailsAllClasses();
        detailsAllStudent();
        fetchClassStudents();

    },[]);
    function protect(){
        {CookieService.get('role')!=="admin"?handleLogout():console.log(CookieService.get('role'))}

    }
    function handleLogout() {
        api.logout().then((response) => {
            CookieService.remove('access_token')
            history.push('/login');
            window.location.reload();
        }).catch(error=>{
            history.push('/login');
            window.location.reload();
        })}




    function handleStudentIdChange (event) {
        setStudent_id(event.target.value)
    }

    function detailsAllClasses(){
        api.myclass(props.match.params.id).then(response => {
            console.log('class',response.data)
            setClass(response.data)

        }).catch(error => {
        })
    }
    function fetchClassStudents () {
        api.allStudentInClass(props.match.params.id).then(response => {
            console.log('all',response.data)


            setClassStudents(response.data)
            renderStudents();


        }).catch(error => {
            // history.push('/login');
        })
    }

    function detailsAllStudent(){
        api.detailsAllStudent().then(response => {
            console.log(response.data)
            setStudent(response.data)

        }).catch(error => {
        })
    }

    function AllStudents(){
        return student.map(stu=>{

            return(
                <option className='text-capitalize text-center' key={stu.id} value={stu.id}> {stu.name} </option>

            )})}


    function handleAddStudentToClass (event) {
        event.preventDefault();

        const Add = {
            student_id:student_id,
            class_id:class_id
        }
        api.addStudentToClass(Add, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                setErrors(' ')
                 setSuccess(<Alert  variant={'success'} closeLabel>
                    Student added successfully
                </Alert>);
                AllStudents();
                fetchClassStudents();
                // history.push('/admin')
                // window.location.reload();
            }).catch(error => {
                setSuccess(' ')
                setErrors(<Alert variant={'danger'}>
                    The Student already in the Class
                </Alert>)
                console.log(errors)
                // window.location.reload();

            }
        )
    }

    function renderStudents(){
        console.log('studentsafter',classStudents)
        return( classStudents.map(students=> {
                return(
                        <tr key={students.userId}>
                            <th>{students.userId}</th>
                            <th>{students.userName}</th>
                            <th>{students.userEmail}</th>
                            <th>{students.userRole}</th>
                            <th><Button variant='warning'>Edit</Button></th>
                            <th><Button variant='danger'>Delete</Button></th>
                        </tr>


                );
            })
        );
    }

    function emptyStudents(){
        return(
            <tr>
                <th colSpan="4">no students yet</th>
            </tr>
        )
    }

    function allClassStudents(){
        return(
            <div className='mt-4 mb-4 h-50 pre-scrollable'>
                <Table striped bordered hover>
                <thead >
                <tr key={classroom.id}>
                    <td colSpan="6">Class Name {classroom.name}</td>
                </tr>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {renderStudents()}

                </tbody>

            </Table>

            </div>
        );
    }

    return (
        <i>{classStudents.length>0?
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {success}{errors}
                            <div className="card-header">Add students to {classroom.name}
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Go Back</Button></div>
                            <div className="card-body">
                                <form method="POST" onSubmit={handleAddStudentToClass} >
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Students</label>
                                        <div className="col-md-6">
                                            <select id="Id" type="text" className='custom-select' name="teacher_id" aria-label="teacher_id"
                                                    onClick={handleStudentIdChange}>
                                                <option defaultValue={0}>Select Student</option>
                                                {AllStudents()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {classStudents.length==0?'':allClassStudents()}
                    </div>
                </div>
            </div>:<Spinner delay="10000"/>}
        </i>
    )
}
