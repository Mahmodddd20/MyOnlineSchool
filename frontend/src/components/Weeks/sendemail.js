import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import api from '../../api';
import JoditEditor from "jodit-react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import AdminAndTeacher from "../Protect/AdminAndTeacher";

export default function Neweek(props) {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        AdminAndTeacher();
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
            }
        )
    }
    return (
            <Container className="mt-4" >
                <Row className=" justify-content-center">
                    <Col md='auto' >
                        <Card >
                            <Card.Header>Email
                                <Button variant='outline-dark' className='float-right' onClick={()=>history.goBack()}>Back</Button></Card.Header>
                            <Card.Body>
                                <Form method="POST" onSubmit={handleSendEmail} >
                                    <Form.Group className="row">
                                        <Form.Label htmlFor="subject" className="col-md-4 col-form-label text-md-right">Subject</Form.Label>

                                        <div className="col-md-6">
                                            <input id="subject" type="text"  className={`form-control`} name="subject" autoComplete="subject" autoFocus
                                                   value={subject}
                                                   onChange={handleSubjectChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <div className="form-group row " >
                                        <div className="col-md-12 ">
                                            <JoditEditor
                                                config={config}
                                                onChange={handleTextAreaChange}
                                                onBlur={handleBlurAreaChange}
                                                value={textAreaValue}/>
                                        </div>
                                    </div>
                                    <Form.Group className=" row mb-0 justify-content-center">
                                            <Button variant='outline-primary' type="submit" className="btn mr-3 ml-3 w-100" onClick={handleDescriptionChange}>
                                                Send
                                            </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}
