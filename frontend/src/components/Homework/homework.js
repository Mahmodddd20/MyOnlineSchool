import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card, Container, Modal} from "react-bootstrap";
import api from "../../api";
import CookieService from "../../CookieService";


export default function Homework(props){
    const [homework, setHomework] = useState([])
    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();
    useEffect(()=>{
        fetchHomework();
    },[]);
    function handleShow (id)
    {
        setShow(true);
        setDel(id);
    }
    function deleteHomework(id){
        console.log('click')
        api.deletehomework(id).then(response=>{
            history.goBack()

        })}


    function fetchHomework(){
        api.showhomeworkbyid(props.match.params.id)
            .then(response=>{
                setHomework(response.data);
            }).catch(error=>{
            history.push('/login')
        })

    }

    return(
            <Container className='mt-4 justify-content-center'>
                <Button variant='outline-dark' className='ml-0 mb-2 mt-2 ' onClick={()=>history.goBack()}>Go Back</Button>
                {CookieService.get('role')=='teacher'?<Button variant="danger" className=' ml-2' onClick={()=>{{handleShow(homework.id)}}}>Delete</Button>:''}
                <Card className='w-50 text-center text-capitalize'>
                    <Card.Header as='h1'>{homework.name}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{homework.type}</Card.Subtitle>
                        <Card.Text as='h3' dangerouslySetInnerHTML={{__html: homework.description}}/>
                    </Card.Body>
                </Card>
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