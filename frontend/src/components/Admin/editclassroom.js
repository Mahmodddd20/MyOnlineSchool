import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import api from '../../api';
import {Button} from "react-bootstrap";
import Spinner4 from "../Loading/Spinner4";
import AdminOnly from "../Protect/adminOnly";

export default function Editclassroom(props) {
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState([]);
    const [teacher_id, setTeacher_id] = useState('');
    const [start_date, setStart_date] = useState('');
    const [finish_date, setFinish_date] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.showClassById(props.match.params.id).then(response=>{
            setName(response.data.name)
            setTeacher_id(response.data.teacher_id)
            setStart_date(response.data.start_date)
            setFinish_date(response.data.finish_date)

        }).catch(error=>{
            history.push('/login');
        })

        AdminOnly();
        detailsAllTeacher();
    },[]);


    function handleNameChange (event) {
        setName(event.target.value)
    }

    function handleTeacherIdChange (event) {
        setTeacher_id(event.target.value)
    }


    function handleStart_dateChange (event) {
        setStart_date(event.target.value)
    }

    function handleFinish_dateChange (event) {
        setFinish_date(event.target.value)
    }

    function detailsAllTeacher(){
        api.detailsAllTeachers().then(response => {
            setTeacher(response.data)

        }).catch(error => {
        })
    }

    function AllTeachers(){
        return teacher.map(teach=>{

            return(
                <option key={teach.id} value={teach.id}>{teach.role} {teach.name} </option>

            )})}


    function handleCreateClassroom (event) {
        event.preventDefault();



        const classroom = {
            name: name,
            teacher_id:teacher_id,
            start_date: start_date,
            finish_date: finish_date
        }
        api.editClass(classroom, props.match.params.id)
            .then(response => {

                history.push('/admin')
                window.location.reload();
            }).catch(error => {
                setErrors(error.response.data.errors)
                window.location.reload();

            }
        )
    }


    return (
        <i>{teacher.length>0?
            <div className="container mt-4 text-capitalize">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Class Room
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>
                            <div className="card-body">
                                <form method="POST" onSubmit={handleCreateClassroom} >
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Class Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text"  className={`form-control`} name="name" autoComplete="name" autoFocus
                                                   value={name}
                                                   onChange={handleNameChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Teacher</label>

                                        <div className="col-md-6">
                                            <select id="Id" type="text" className='custom-select text-capitalize' name="teacher_id" aria-label="teacher_id"
                                                    onClick={handleTeacherIdChange}>
                                                <option defaultValue={0}>Select Teacher</option>
                                                {AllTeachers()}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="start_date" className="col-md-4 col-form-label text-md-right">Starting date</label>

                                        <div className="col-md-6">
                                            <input id="start_date" type="date"  className={`form-control`} name="start_date" autoComplete="start_date"
                                                   value={start_date}
                                                   onChange={handleStart_dateChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="finish_date" className="col-md-4 col-form-label text-md-right">Ending date</label>

                                        <div className="col-md-6">
                                            <input id="finish_date" type="date"  className={`form-control`} name="finish_date" autoComplete="finish_date"
                                                   value={finish_date}
                                                   onChange={handleFinish_dateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:<Spinner4 delay="5000"/>}
        </i>
    )
}
