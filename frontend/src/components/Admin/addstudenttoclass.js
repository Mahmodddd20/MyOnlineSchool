import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from "../../CookieService";
import {Alert, Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
import AdminOnly from "../adminOnly";
export default function AddStudentToClass(props) {
    const [classroom, setClass] = useState([]);
    const [student, setStudent] = useState([]);
    const [student_id, setStudent_id] =useState('');
    const [class_id, setClass_id] =useState(props.match.params.id);
    const [classStudents, setClassStudents] = useState([]);
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory();

    useEffect(() => {

        AdminOnly()
        detailsClass();
        detailsAllStudent();
        fetchClassStudents();

    },[]);


    function handleStudentIdChange (event) {
        setStudent_id(event.target.value)
    }

    function detailsClass(){
        api.showClassById(props.match.params.id).then(response => {
            setClass(response.data)

        }).catch(error => {
        })
    }
    function fetchClassStudents () {
        api.allStudentsInClass(props.match.params.id).then(response => {


            setClassStudents(response.data)
            renderStudents();


        }).catch(error => {
        })
    }

    function detailsAllStudent(){
        api.detailsAllStudents().then(response => {
            setStudent(response.data)

        }).catch(error => {
        })
    }

    function AllStudents(){
        return student.map(stu=>{

            return(
                <option className='text-capitalize text-center' key={stu.id} value={stu.id}> {stu.name} </option>

            )})}
        function handleDeleteFromClass(id){

            const del = {
                student_id:id,
                class_id:class_id
            }
            api.deleteStudentFromClass(del).then(response=>{
                fetchClassStudents();
                })
            }


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
                setTimeout(() => {
                    setSuccess('');
                }, 5000);

                AllStudents();
                fetchClassStudents();
            }).catch(error => {
                setSuccess(' ')
                setErrors(<Alert variant={'danger'}>
                    The Student already in the Class
                </Alert>)
                setTimeout(() => {
                    setErrors('');
                }, 5000);


            }
        )
    }

    function renderStudents(){
        return( classStudents.map(students=> {
                return(
                        <tr key={students.userId}>
                            <td>{students.userId}</td>
                            <td>{students.userName}</td>
                            <td>{students.userEmail}</td>
                            <td>{students.userRole}</td>
                            <td><Button className='w-100' variant='warning' href={'/edituser/'+students.userId}>Edit</Button></td>
                            <td><OverlayTrigger
                                key={students.userId}
                                placement={'right'}
                                overlay={
                                    <Tooltip id={students.userId}>Just From This Class.</Tooltip>}>
                                <Button className='w-100' variant='danger' onClick={()=>handleDeleteFromClass(students.userId)}>Delete</Button>
                            </OverlayTrigger>
                            </td>
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
                <Table striped bordered hover size='md'>
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
        <i>{student.length>0?
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {success}{errors}
                            <div className="card-header">Add students to {classroom.name}
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>
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
