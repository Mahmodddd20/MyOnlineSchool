import React, {useState,useEffect} from "react";
import api from "../../api";
import { useHistory} from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Col, Container, Modal, Row} from "react-bootstrap";
import '../../index.css';
import Spinner from "../Loading/Spinner";
import Sidebar from "../Sidebar/sidebar";
import AdminOnly from "../Protect/adminOnly";



export default function Admin(){
    const [classroom, setClassroom] =useState([]);

    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();

    useEffect(() => {
        AdminOnly();
        fetchClasses();

    },[]);

    function handleShow (id)
    {
        setShow(true);
        setDel(id);
    }

    function fetchClasses(){
        api.allClassesAdmin().then(response=>{
            setClassroom(response.data)


        }).catch(error=>{
                     })
    }
    function deleteclass(id){
        api.deleteClass(id).then(response=>{
            fetchClasses();
        })
    }


    function renderClasses(){
        return( classroom.map(classroom=> {
                return(
                    <Card key={classroom.id} className='mt-2 mb-2'>
                        <Card.Header as="h5" className='text-wrap p-4 flex-column align-middle '>{classroom.name}
                                     <Button variant="danger" className='float-right ml-1'  onClick={()=>{{handleShow(classroom.id)}}}>Delete</Button>
                                     <Button variant="warning" className='float-right mr-1' href={'/class/edit/' + classroom.id}>Edit</Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title >From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                            Teacher Name: {classroom.teacher_name}<br/>
                            Teacher Email: {classroom.teacher_email}
                            <Button className='mr-0 mb-2 float-right' variant="primary" href={"/weeks/show/"+classroom.id}>View More ...</Button>
                        </Card.Body>
                    </Card>
                );
            })
        );
    }
    function emptyClasses(){
        return(
            <Spinner delay="5000"/>
        )
    }

    function allClasses(){
        return(
            <div>
                {renderClasses()}
            </div>
        );
    }
    return (
        <Container fluid className=' text-capitalize m-2 ml-5 '>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className=' m-2'>
                    <Badge pill variant="success" className='rounded-0 text-wrap'>
                        welcome to Control Page
                    </Badge>
                </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>

            </Row>
            <Row>
                    <Button className='m-2' variant="info" href={'/newclassroom'}>create new class</Button>
                    <Button className='m-2' variant="outline-primary" href={'/register'}>register users</Button>
                <Button variant='outline-dark' className='float-right m-2' onClick={()=>history.goBack()}>Back</Button>
            </Row>
            <Row className='w-75 h-100'>
                <CardColumns className='m-2 d-flex flex-wrap'>

                    {classroom.length>0 ? allClasses() : emptyClasses()}
                </CardColumns>
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
                        Are you sure you want to Delete the class.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={()=>{deleteclass(del) ;handleClose()}}>Yes Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>

        </Container>
    )
}



