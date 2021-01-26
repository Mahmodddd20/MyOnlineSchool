import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import api from '../../api';
import JoditEditor from "jodit-react";
import {Button, Form} from "react-bootstrap";
import FileUpload from "../Upload/FileUpload";
import CookieService from "../../CookieService";
import StudentOnly from "../Protect/studentOnly";

export default function Answer(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [finished, setFinished] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const [config, setConfig] = useState({
        readonly: false,
        toolbar: true,
        width:'50vw',
        height:'50vh',
        spellcheck: true,
        toolbarAdaptive:false,
    })
    const [textAreaValue, setTextAreaValue] = useState('')
    const handleBlurAreaChange = () => {
    };

    const handleTextAreaChange = newTextAreaValue => {
        return (
            setTextAreaValue(() => newTextAreaValue)
        )
    }
    useEffect(() => {
        StudentOnly();
        isfinished()
    },[]);


    function isfinished(){
        api.finished(props.match.params.id).then(response=>{
            setFinished(response.data)
        })
    }

    function handleTitleChange (event) {
        setTitle(event.target.value)
    }

    function handleDescriptionChange (event) {
        setDescription(textAreaValue)
    }

    function handleSubmitAnswer (event) {
        event.preventDefault();

        const answer = {
            title: title,
            description: description,
            homework_id: props.match.params.id,
            student_id: CookieService.get('id')
        }
        api.createAnswer(answer, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

    history.push("/homework/show/"+props.match.params.id)
                window.location.reload();
            }).catch(error => {
                setErrors(error.response.data.errors)

            }
        )
    }


    return (
        <i>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-auto">
                        <div className="card">
                            <div className="card-header">Your Answer
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>
                            {finished!==0?<div className='text-danger text-monospace text-capitalize '>You Already submitted your answer</div>:

                                <div className="card-body">
                                <form method="POST" onSubmit={handleSubmitAnswer} >
                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Title</label>

                                        <div className="col-md-6">
                                            <input id="title" type="text"  className={`form-control`} name="title" autoComplete="title" autoFocus
                                                   value={title}
                                                   onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row ">
                                        <div className="col-md-12 ">
                                            <JoditEditor
                                                config={config}
                                                onChange={handleTextAreaChange}
                                                onBlur={handleBlurAreaChange}
                                                value={textAreaValue}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6 ">
                                            <FileUpload />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0 justify-content-center">
                                        <Button variant='outline-primary' type="submit" className="btn mr-3 ml-3 w-100" onClick={handleDescriptionChange}>
                                            Create
                                        </Button>
                                    </div>
                                </form>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </i>
    )
}
