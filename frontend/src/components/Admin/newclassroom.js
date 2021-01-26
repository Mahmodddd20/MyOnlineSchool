import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from "../../CookieService";
import AllTeachersTable from "./AllTeachers";
import {Alert, Button, Col, Row} from "react-bootstrap";
import Sidebar from "../Sidebar/sidebar";
import Spinner4 from "../Loading/Spinner4";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../index.css'
import AdminOnly from "../Protect/adminOnly";



export default function Newclassroom() {
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState([]);
    const [teacher_id, setTeacher_id] = useState('');
    const [start_date, setStart_date] = useState('');
    const [finish_date, setFinish_date] = useState('');
    const [errors, setErrors] = useState([]);
    const [dateError, setDateError] = useState([]);
    const [nameError, setNameError] = useState('');
    const [start_dateError, setStart_dateError] = useState('');
    const [finish_dateError, setFinish_dateError] = useState('');


    const history = useHistory();

    useEffect(() => {
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
             <option  key={teach.id} className='text-capitalize text-justify' value={teach.id}>{teach.name} </option>

        )})}


    function handleCreateClassroom (event) {
        event.preventDefault();
        if(name==''){
            setNameError(<Alert className='mt-2'  variant='danger'>
                The Name Field is Required.
            </Alert>)
            setTimeout(() => {
                setNameError('');
            }, 5000);

        }if (start_date==''){
            setStart_dateError(<Alert className='mt-2'  variant='danger'>
                The Starting Date Field is Required.
            </Alert>)
            setTimeout(() => {
                setStart_dateError('');
            }, 5000);

        }if (finish_date==''){
            setFinish_dateError(<Alert className='mt-2'  variant='danger'>
                The Ending Date Field is Required.
            </Alert>)
            setTimeout(() => {
                setFinish_dateError('');
            }, 5000);

        }



        const classroom = {
            name: name,
            teacher_id:teacher_id,
            start_date: start_date,
            finish_date: finish_date
        }
        api.createClass(classroom, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

                history.push('/admin')

            }).catch(error => {
            setErrors(error.response.data.errors)

            }
        )
    }


    return (
        <i>
            <Row>
            <Col xs='auto' md='auto' lg="11" >
            {teacher.length>0?
            <div className="container mt-4 text-capitalize">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">New Class
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
                                            {nameError}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Teacher</label>

                                        <div className="col-md-6 text-wrap text-capitalize">
                                            <select id="Id" type="text" data-live-search="true" className=' custom-select text-wrap pre-scrollable' name="teacher_id" aria-label="teacher_id"
                                                   onClick={handleTeacherIdChange}>
                                                <option defaultValue={0}>Select Teacher</option>
                                                {AllTeachers()}
                                            </select>
                                        </div>

                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="start_date" className="col-md-4 col-form-label text-md-right">Starting date</label>

                                        <div className="col-md-6 w-100">
                                            <input  id="start_date" type="date"  className={`form-control`} name="start_date" autoComplete="start_date"
                                                   value={start_date}
                                                   onChange={handleStart_dateChange}
                                            />
                                            {start_dateError}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="finish_date" className="col-md-4 col-form-label text-md-right">Ending date</label>

                                        <div className="col-md-6">
                                            <input id="finish_date" type="date"  className={`form-control`} name="finish_date" autoComplete="finish_date"
                                                   value={finish_date}
                                                   onChange={handleFinish_dateChange}
                                            />
                                            {dateError}
                                            {finish_dateError}
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <AllTeachersTable/>

                    </div>
                </div>
            </div>:<Spinner4 delay="5000"/>}
            </Col>
            <Col xs md lg="1" >
                <Sidebar/>
            </Col>
        </Row>
</i>
    )
}
