import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import { Button, Modal} from "react-bootstrap";
import UploadService from "../Upload/FileUploadServiceProfile";
import Logged from "../Protect/Logged";

function Profile(props) {
    const [picture, setPicture] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCpassword] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    const history = useHistory();

    useEffect(() => {
        Logged();
        details();
    },[]);

    function details(){
        api.detailsTheLoggedUser().then(response => {
            setName(response.data.name)
            setEmail(response.data.email)
            setRole(response.data.role)
            setId(response.data.id)
            if(response.data.picture!==''){
                setPicture(response.data.picture)
            }
        }).catch(error => {
        })
    }


    function handleNameChange (event) {
        setName(event.target.value)
    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleCPasswordChange (event) {
        setCpassword(event.target.value)
    }


    function handleUpdateUser (event) {
        event.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password,
            c_password: c_password,
            role: role,
            picture:picture,

        }

        api.updateTheUser(user, id ,{headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                window.location.reload();

            }).catch(error => {
            setErrors('error')
                         // window.location.reload();

        })
    }
    const UploadFiles = () => {
        const [currentFile, setCurrentFile] = useState(undefined);
        const [selectedFiles, setSelectedFiles] = useState(undefined);
        const [fileInfos, setFileInfos] = useState('');
        const selectFile = (event) => {
            setSelectedFiles(event.target.files);
        };
        const upload = () => {
            let currentFile = selectedFiles[0];
            setCurrentFile(currentFile);
            UploadService.upload(currentFile, (event) => {
            })
                .then((response) => {
                    let img= response.data.file
                    setPicture(img)
                })
                .catch(() => {
                    setMessage("This Type Of Files Not Allowed!");
                    setShow(true);

                });
            setSelectedFiles(undefined);
        };
        return (
            <div className='row g-3'>
                <label className="btn btn-default col-auto mr-5 w-50">
                    <input type="file" onChange={selectFile} />
                </label>
                <button
                    className="btn btn-success align-self-center btn-sm col-auto ml-5 h-50"
                    disabled={!selectedFiles}
                    onClick={upload}
                >
                    Upload
                </button>
            </div>
        );
    };

    return (
        <i>
            <div className="container mt-4 mb-5 text-capitalize">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Profile
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></div>

                            <div className="card-body">
                                <form onSubmit={handleUpdateUser}>
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right align-self-center">Profile Picture</label>

                                        <div className="col-md-6 overflow-hidden h-75">
                                            <img className='rounded-circle img-thumbnail'  src={picture} alt='No Picture'/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text" className='form-control' name="name"
                                                   value={name}
                                                   onChange={handleNameChange}  />

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className='form-control' name="email"
                                                   value={email}
                                                   onChange={handleEmailChange}
                                            />

                                        </div>
                                    </div>

                                    <fieldset disabled>
                                    <div className="form-group row">
                                        <label htmlFor="role" className="col-md-4 col-form-label text-md-right">Role</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className='form-control' name="email"
                                                    value={role}
                                                />
                                        </div>
                                    </div>
                                    </fieldset>


                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className='form-control'  name="password"
                                                   value={password}
                                                   onChange={handlePasswordChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" className='form-control'  name="password"
                                                   value={c_password}
                                                   onChange={handleCPasswordChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="picture" className="col-md-4 col-form-label text-md-right">Upload Your Profile Picture</label>
                                        <div className="col-md-6">
                                            <UploadFiles />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
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
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header className='w-100' closeButton>
                        <Modal.Title>{message}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='h-100'>
                        <p className='bg-warning'>
                            Allowed files is jpg, jpeg, png, bmp, tiff
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </i>
    )
}

export default Profile
