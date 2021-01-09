import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import JoditEditor from "jodit-react";

export default function Neweek(props) {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const [config, setConfig] = useState({
        readonly: false,
        toolbar: true,
    })
    const [textAreaValue, setTextAreaValue] = useState('')
    const handleBlurAreaChange = () => {
        console.log('Blur')
    };

    const handleTextAreaChange = newTextAreaValue => {
        console.log('handleTextAreaChange', newTextAreaValue)
        return (
            setTextAreaValue(() => newTextAreaValue)
        )
    }

    function handleSubjectChange (event) {
        setSubject(event.target.value)
    }

    function handleDescriptionChange (event) {
        setDescription(textAreaValue)
    }


    function handleSendEmail (event) {
        event.preventDefault();

        const email = {
            subject: subject,
            description: description,
        }
        api.sendEmailCustomToAllClassStudents(email, props.match.params.id)
            .then(response => {

                history.push("/weeks/show/"+props.match.params.id)
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
            <div className="container mt-4" >
                <div className="row justify-content-center">
                    <div className="col-md-auto">
                        <div className="card">
                            <div className="card-header">Email</div>
                            <div className="card-body">
                                <form method="POST" onSubmit={handleSendEmail} >
                                    <div className="form-group row">
                                        <label htmlFor="subject" className="col-md-4 col-form-label text-md-right">Subject</label>

                                        <div className="col-md-6">
                                            <input id="subject" type="text"  className={`form-control`} name="subject" autoComplete="subject" autoFocus
                                                   value={subject}
                                                   onChange={handleSubjectChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row " >
                                        <label htmlFor="subject" className="col-md-4 col-form-label text-md-right"></label>
                                        <div className="col-md-12 ">
                                            <JoditEditor
                                                config={config}
                                                onChange={handleTextAreaChange}
                                                onBlur={handleBlurAreaChange}
                                                value={textAreaValue}/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary" onClick={handleDescriptionChange}>
                                                Send
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
