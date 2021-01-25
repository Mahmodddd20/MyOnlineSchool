import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import TeacherOnly from "../teacherOnly";

export default function Editweek(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [classid, setClassid] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        TeacherOnly();
        api.weekById(props.match.params.id).then(response=>{
            setName(response.data.name)
            setDescription(response.data.description)
            setStart_date(response.data.start_date)
            setEnd_date(response.data.end_date)
            setClassid(response.data.class_id)
        }).catch(error=>{
            history.push('/login')
        })

    },[]);



    function handleNameChange (event) {
        setName(event.target.value)
    }

    function handleDescriptionChange (event) {
        setDescription(event.target.value)
    }

    function handleStart_dateChange (event) {
        setStart_date(event.target.value)
    }

    function handleEnd_dateChange (event) {
        setEnd_date(event.target.value)
    }




    function handleCreateWeek (event) {
        event.preventDefault();



        const week = {
            name: name,
            description:description,
            start_date: start_date,
            end_date: end_date,
        }
        api.editWeek(week, props.match.params.id)
            .then(response => {

                history.push("/weeks/show/"+classid)
                window.location.reload();
            }).catch(error => {
                setErrors(error.response.data.errors)
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
                            <div className="card-header">Edit Week</div>
                            <div className="card-body">
                                <form method="POST" onSubmit={handleCreateWeek} >
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Week Name</label>
                                        <div className="col-md-6">
                                            <input id="name" type="text"  className={`form-control`} name="name" autoComplete="name" autoFocus
                                                   value={name}
                                                   onChange={handleNameChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-md-4 col-form-label text-md-right">description</label>

                                        <div className="col-md-6">
                                            <textarea id="name" type="text"  className={`form-control`} name="description" autoComplete="description"
                                                      value={description}
                                                      onChange={handleDescriptionChange}
                                            />
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
                                        <label htmlFor="end_date" className="col-md-4 col-form-label text-md-right">Ending date</label>

                                        <div className="col-md-6">
                                            <input id="end_date" type="date"  className={`form-control`} name="end_date" autoComplete="end_date"
                                                   value={end_date}
                                                   onChange={handleEnd_dateChange}
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
            </div>
        </i>
    )
}
