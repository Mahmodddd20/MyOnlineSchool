import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import api from "../../api";
import CookieService from "../../CookieService";
import Sidebar from "../Sidebar/sidebar";


export default function Material(props){
    const [material, setMaterial] = useState([])
    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();
    useEffect(()=>{
        fetchMaterial();
    },[]);
    function handleShow (id)
    {
        setShow(true);
        setDel(id);
    }
    function deleteMaterial(id){
        console.log('click')
        api.deletematerial(id).then(response=>{
            history.goBack()


        })}


    function fetchMaterial(){
        api.showmaterialbyid(props.match.params.id)
            .then(response=>{
                setMaterial(response.data);
            }).catch(error=>{
            history.push('/login')
        })

    }
        return(
        <Container className='mt-4 justify-content-center '>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
            <Button variant='outline-dark' className='ml-0 mb-2 mt-2 ' onClick={()=>history.goBack()}>Go Back</Button>
            {CookieService.get('role')=='teacher'?<Button variant="danger" className=' ml-2' onClick={()=>{{handleShow(material.id)}}}>Delete</Button>:''}
            <Card className='w-50 text-center text-capitalize'>
                <Card.Header>{material.name}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{material.type}</Card.Subtitle>
                    <Card.Text dangerouslySetInnerHTML={{__html: material.description}}/>
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
                        Are you sure you want to Delete the material.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={()=>{deleteMaterial(del) ;handleClose()}}>Yes Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>


        </Container>
)
}