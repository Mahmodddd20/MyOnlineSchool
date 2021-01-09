import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import JoditEditor from "jodit-react";

export default function Neweek(props) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
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


    useEffect(() => {
    },[]);



    function handleNameChange (event) {
        setName(event.target.value)
    }



    function handleTypeChange (event) {
        setType(event.target.value)
    }

    function handleDescriptionChange (event) {
        setDescription(textAreaValue)
        console.log(description)
    }

    function handleLinkChange (event) {
        setLink(event.target.value)
    }





    function handleCreateHomework (event) {
        event.preventDefault();



        const homework = {
            name: name,
            type: type,
            description: description,
            link: link,
            week_id:props.match.params.id
        }
        api.createhomework(homework, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

                history.push("/week/show/"+props.match.params.id)
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
                    <div className="col-md-auto">
                        <div className="card">
                            <div className="card-header">New Homework</div>
                            <div className="card-body">
                                <form method="POST" onSubmit={handleCreateHomework} >
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Homework Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text"  className={`form-control`} name="name" autoComplete="name" autoFocus
                                                   value={name}
                                                   onChange={handleNameChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="type" className="col-md-4 col-form-label text-md-right">type</label>

                                        <div className="col-md-6">
                                            <input id="type" type="text"  className={`form-control`} name="type" autoComplete="type"
                                                   value={type}
                                                   onChange={handleTypeChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row ">
                                        <label htmlFor="description" className="col-md-4 col-form-label text-md-right">description</label>

                                        <div className="col-md-12 ">
                                            <JoditEditor
                                                config={config}
                                                onChange={handleTextAreaChange}
                                                onBlur={handleBlurAreaChange}
                                                value={textAreaValue}/>

                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="link" className="col-md-4 col-form-label text-md-right">link</label>

                                        <div className="col-md-6">
                                            <input id="link" type="link"  className={`form-control`} name="link" autoComplete="link"
                                                   value={link}
                                                   onChange={handleLinkChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary" onClick={handleDescriptionChange}>
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
