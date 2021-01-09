import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';

export default function Editweek(props) {
    const [name, setName] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [classid, setClassid] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        console.log(props.match.params.id)

        api.myweek(props.match.params.id).then(response=>{
            setName(response.data.name)
            setStart_date(response.data.start_date)
            setEnd_date(response.data.end_date)
            setClassid(response.data.class_id)
            console.log(props.match.params.id)
        }).catch(error=>{
            history.push('/login')
        })

    },[]);



    function handleNameChange (event) {
        setName(event.target.value)
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
            start_date: start_date,
            end_date: end_date,
        }
        api.editweek(week, props.match.params.id)
            .then(response => {

                history.push("/weeks/show/"+classid)
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
                                        <label htmlFor="start_date" className="col-md-4 col-form-label text-md-right">Start date</label>

                                        <div className="col-md-6">
                                            <input id="start_date" type="date"  className={`form-control`} name="start_date" autoComplete="start_date"
                                                   value={start_date}
                                                   onChange={handleStart_dateChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="end_date" className="col-md-4 col-form-label text-md-right">End date</label>

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
