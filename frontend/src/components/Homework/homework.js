import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import api from "../../api";
import CookieService from "../../CookieService";
import Sidebar from "../Sidebar/sidebar";
import Logged from "../Logged";


export default function Homework(props){
    const [homework, setHomework] = useState([])
    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const [finished, setFinished] = useState('');
    const handleClose = () => setShow(false);

    const history = useHistory();
    useEffect(()=>{
        Logged();
        fetchHomework();
        isfinished();
    },[]);
    function handleShow (id)
    {
        setShow(true);
        setDel(id);
    }

    function isfinished(){
        api.finished(props.match.params.id).then(response=>{
            setFinished(response.data)
        })
    }

    function deleteHomework(id){
        api.deleteHomework(id).then(response=>{
            history.goBack()

        })}


    function fetchHomework(){
        api.showHomeworkById(props.match.params.id)
            .then(response=>{
                setHomework(response.data);
            }).catch(error=>{
            // history.push('/login')
        })

    }

    return(
            <Container className='mt-4 justify-content-center'>
                <Row>
                    <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                    <Button variant='outline-dark' className='ml-0 mb-2 mt-2 ' onClick={()=>history.goBack()}>Back</Button>
                    {CookieService.get('role')=='teacher'?<Button variant="danger" className=' ml-2' onClick={()=>{{handleShow(homework.id)}}}>Delete</Button>:''}
                    {CookieService.get('role')=='teacher'?<Button variant="warning" className=' ml-2' href={'/edithomework/'+homework.id}>Edit</Button>:''}
                    {CookieService.get('role')=='teacher'?<Button variant="primary" className=' ml-2' href={'/answer/all/'+homework.id}>Answers</Button>:''}
                    {CookieService.get('role')=='student'?finished!==0?'':<Button variant="outline-success" className=' ml-2' target='_blank' href={'/answer/'+homework.id}>Submit Your Answer</Button>:''}

                        <Card className='w-auto  text-capitalize'>
                    <Card.Header className='text-center' >{homework.name}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-center text-muted">{homework.type}</Card.Subtitle>
                        <Card.Text dangerouslySetInnerHTML={{__html: homework.description}}/>
                    </Card.Body>
                </Card>
                    </Col>

                    <Col xs md lg="1" >
                        <Sidebar/>
                    </Col>
                </Row>

                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='text-capitalize'>
                            Are you sure you want to Delete the homework.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="info" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="danger" onClick={()=>{deleteHomework(del) ;handleClose()}}>Yes Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </>

            </Container>

    )
}