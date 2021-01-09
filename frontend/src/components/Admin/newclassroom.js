import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import CookieService from "../../CookieService";
import AllTeachersTable from "./AllTeachers";

export default function Newclassroom() {
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState([]);
    const [teacher_id, setTeacher_id] = useState('');
    const [start_date, setStart_date] = useState('');
    const [finish_date, setFinish_date] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        protect();
        detailsAllTeacher();
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



    function handleNameChange (event) {
        setName(event.target.value)
    }

    function handleTeacherIdChange (event) {
        setTeacher_id(event.target.value)
        console.log(teacher_id)
    }


    function handleStart_dateChange (event) {
        setStart_date(event.target.value)
    }

    function handleFinish_dateChange (event) {
        setFinish_date(event.target.value)
    }

    function detailsAllTeacher(){
        api.detailsAllTeacher().then(response => {
            console.log(response.data)
                setTeacher(response.data)

        }).catch(error => {
        })
    }

    function AllTeachers(){
        return teacher.map(teach=>{

            return(
             <option  key={teach.id} value={teach.id}> {teach.name} -> {teach.email} </option>

        )})}


    function handleCreateClassroom (event) {
        event.preventDefault();



        const classroom = {
            name: name,
            teacher_id:teacher_id,
            start_date: start_date,
            finish_date: finish_date
        }
        api.createclass(classroom, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

                history.push('/admin')
                window.location.reload();
            }).catch(error => {
            setErrors(error.response.data.errors)
            console.log(errors)
            window.location.reload();

            }
        )
    }


    return (
        <i>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">New Class Room</div>
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

                                        <div className="col-md-6 text-wrap">
                                            <select id="Id" type="text" data-live-search="true" className=' custom-select text-wrap pre-scrollable' name="teacher_id" aria-label="teacher_id"
                                                   onClick={handleTeacherIdChange}>
                                                <option defaultValue={0}>Select Teacher</option>
                                                {AllTeachers()}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="start_date" className="col-md-4 col-form-label text-md-right">Start date</label>

                                        <div className="col-md-6">
                                            <input id="start_date" type="date"  className={`form-control`} name="start_date" autoComplete="start_date"
                                                   value={start_date}
                                                   onChange={handleStart_dateChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="finish_date" className="col-md-4 col-form-label text-md-right">Finish_date</label>

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
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <AllTeachersTable/>
            </div>
        </i>
    )
}
