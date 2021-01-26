import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import JoditEditor from "jodit-react";
import {Button} from "react-bootstrap";
import FileUpload from "../Upload/FileUpload";
import TeacherOnly from "../Protect/teacherOnly";
import Logged from "../Protect/Logged";

export default function Neweek(props) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        Logged();
        TeacherOnly();
    },[]);


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


    function handleNameChange (event) {
        setName(event.target.value)
    }



    function handleTypeChange (event) {
        setType(event.target.value)
    }

    function handleDescriptionChange (event) {
        setDescription(textAreaValue)
    }

    function handleCreateMaterial (event) {
        event.preventDefault();

        const material = {
            name: name,
            type: type,
            description: description,
            week_id:props.match.params.id
        }
        api.createMaterial(material, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

                history.push("/week/show/"+props.match.params.id)
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
                            <div className="card-header">New Material
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>
                            <div className="card-body">
                                <form method="POST" onSubmit={handleCreateMaterial} >
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Material Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text"  className={`form-control`} name="name" autoComplete="name" autoFocus
                                                   value={name}
                                                   onChange={handleNameChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="type" className="col-md-4 col-form-label text-md-right">Type</label>

                                        <div className="col-md-6">
                                            <select id="type" type="text"  className='custom-select' name="type" autoComplete="type"
                                                   value={type}
                                                   onChange={handleTypeChange}>
                                                <option >Select The Type</option>
                                                <option value="article">Article</option>
                                                <option value="essay">Essay</option>
                                                <option value="file">File</option>
                                                <option value="photo">Photo</option>
                                                <option value="video">Video</option>
                                                <option value="live-video">Live Video</option>
                                            </select>
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
                                        <div className="col-md-12 ">
                                                <FileUpload />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0 justify-content-center">
                                        <Button variant='outline-primary' type="submit" className="btn mr-3 ml-3 w-100" onClick={handleDescriptionChange}>
                                            Create
                                        </Button>
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
