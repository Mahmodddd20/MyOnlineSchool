import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import {Alert, Button} from "react-bootstrap";

export default function Neweek(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState('');
    const [dateError, setDateError] = useState([]);


    const history = useHistory();

    useEffect(() => {
    },[]);



    function handleNameChange (event) {
        setName(event.target.value)
    }

    function handleDescriptionChange (event) {
        setDescription(event.target.value)
    }

    function handleStart_dateChange (event) {
        setStart_date(event.target.value)
        let start= event.target.value.split('-');
        let finish= end_date.split('-');
        console.log(start,finish)
        let latest = false;
        if (parseInt(start[0]) < parseInt(finish[0])) {
            latest = true;
        } else if (parseInt(start[0]) == parseInt(finish[0])) {
            if (parseInt(start[1]) < parseInt(finish[1])) {
                latest = true;
            } else if (parseInt(start[1]) == parseInt(finish[1])) {
                if (parseInt(start[2]) < parseInt(finish[2])) {
                    latest = true;
                }
            }
            if(latest!==true){
                setEnd_date('');
                setDateError(  <Alert className='mt-2' variant='danger'>
                        The Ending Date Must Be After The Starting Date.
                    </Alert>
                );
                setTimeout(() => {
                    setDateError('');
                }, 5000);

            }

    }}

    function handleEnd_dateChange (event) {
        setEnd_date(event.target.value)
        let start= start_date.split('-');
        let finish= event.target.value.split('-');
        console.log(start,finish)
        let latest = false;
        if (parseInt(start[0]) < parseInt(finish[0])) {
            latest = true;
        } else if (parseInt(start[0]) == parseInt(finish[0])) {
            if (parseInt(start[1]) < parseInt(finish[1])) {
                latest = true;
            } else if (parseInt(start[1]) == parseInt(finish[1])) {
                if (parseInt(start[2]) < parseInt(finish[2])) {
                    latest = true;
                }
            }
        }
        if(latest!==true){
            setEnd_date('');
            setDateError(  <Alert className='mt-2' variant='danger'>
                    The Ending Date Must Be After The Starting Date.
                </Alert>
            );
            setTimeout(() => {
                setDateError('');
            }, 5000);

        }

    }




    function handleCreateWeek (event) {
        event.preventDefault();



        const week = {
            name: name,
            description:description,
            start_date: start_date,
            end_date: end_date,
            class_id:props.match.params.id
        }
        api.createweek(week, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                event.target.reset();
                setErrors(' ')
                setSuccess(<Alert variant={'success'}>
                    Week added successfully
                </Alert>);
                setEmail(<Alert variant={'info'}>
                    Email sent to students successfully
                </Alert>);

                api.sendEmailToAllClassStudents(props.match.params.id).then(response=>{
                    history.push("/weeks/show/"+props.match.params.id)


                    console.log('The email sent successfully')
                })

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


    return (
        <i>
            <div className="container mt-4 text-capitalize">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {success}{errors}{email}
                            <div className="card-header">New Week
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>
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
                                            {dateError}
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
            </div>
        </i>
    )
}
