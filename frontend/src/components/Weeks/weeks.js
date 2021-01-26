import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import {Badge, Button, Card, CardColumns, Col, Container, Modal, Row} from "react-bootstrap";
import CookieService from '../../CookieService';
import '../../index.css';
import Spinner3 from "../Loading/Spinner3";
import Sidebar from "../Sidebar/sidebar";
import Logged from "../Protect/Logged";



export default function AllClassWeeks(props){
    const [className, setClassName] = useState('');
    const [week, setWeek] = useState([]);

    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();

    useEffect(()=>{
        Logged();
        fetchClass()
        fetchWeeks()
    },[]);

    function deleteWeek(id){
        api.deleteWeekById(id).then(response=>{
            fetchWeeks()

        })}
    function handleShow (id)
        {
            setShow(true);
            setDel(id);
        }


    function fetchWeeks(){
        api.weeksOfClass(props.match.params.id).then(response=>{
            setWeek(response.data)
        }).catch(error=>{
            // history.push('/login')
        })

    }
    function fetchClass(){
        api.showClassById(props.match.params.id).then(
            response => {
                setClassName(response.data.name);
            }).catch(error=>{
            // history.push('/login')
        })

    }



    function emptyWeeks(){
        return(
            <Spinner3 delay="5000"/>
            );
    }


    function allWeeks(){
        return week.map(week=>{
            return(
                <Card key={week.id} className='mt-2 mb-2 ml-0 mr-2 w-100'>
                    <Card.Header as="h5" className='overflow-auto p-4 flex-column align-middle h-100'>
                        {week.name}
                        {CookieService.get('role')=='teacher'?
                            <div className='d-block  float-right align-middle '>
                                <Button variant="danger" className='float-right ml-1' onClick={()=>{{handleShow(week.id)}}}>Delete</Button>
                                <Button variant="warning" className='float-right mr-1' href={'/week/edit/' + week.id}>Edit</Button>
                            </div>
                            :''}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>From {week.start_date} To {week.end_date}</Card.Title>
                        <Card.Text>
                            {week.description}.
                        </Card.Text>
                        <Col className='m-0 p-0'>
                            {CookieService.get('role')=='teacher'?
                                <div className='m-0'>
                                <Button className='ml-0 mt-2' variant="outline-success" href={'/newmaterial/'+week.id}>Add Materials</Button><br/>
                                <Button className='ml-0 mt-2' variant="outline-success" href={'/newhomework/'+week.id}>Add Homeworks</Button>
                                </div>:''}
                            {CookieService.get('role')!=='teacher'?
                                <div>
                                    <Button className='ml-0 mt-2' variant="primary" href={"/materials/all/"+week.id}>View Materials</Button><br/>
                                <Button className='ml-0 mt-2' variant="primary" href={"/homeworks/all/"+week.id}>View Homeworks</Button>
                                </div>:''}
                            <Button className='ml-0 mt-2' variant="primary" href={"/week/show/"+week.id}>View {week.name}</Button>
                        </Col>
                    </Card.Body>
                </Card>
            );
        })
    }



    return(
        <Container fluid className='text-capitalize m-2 ml-5' >
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className='m-2'>
                    <Badge pill variant="success" className='rounded-0 text-wrap'>
                    {className==''?
                        <span style={{width:'50%',height:'50%'}} className="spinner-border m-2 spinner-grow align-middle align-self-center" role="status" aria-hidden="true"></span>
                        :className}
                    </Badge>
                </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>

            </Row>
            <Row>
                {CookieService.get('role')=='teacher'?<Button className='m-2' variant="outline-primary" href={'/neweek/'+props.match.params.id}>create new week</Button>:''}
                {CookieService.get('role')=='admin'?<Button className='m-2' variant="info" href={'/addstudenttoclass/'+props.match.params.id}>add students to the class</Button>:''}
                {CookieService.get('role')!=='student'?<Button className='m-2' variant="outline-info" href={'/sendemail/'+props.match.params.id}>Send Email To Students</Button>:''}
                <Button variant='outline-dark' className='float-right m-2' onClick={()=>history.goBack()}>Back</Button>

            </Row>
            <Row className='w-75 overflow-auto mb-5'>
                <CardColumns className=' ml-2'>

                    {week.length >0 ? allWeeks() : emptyWeeks() }
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
                    <Modal.Body>
                        Are you sure you want to Delete the week.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={()=>{deleteWeek(del) ;handleClose()}}>Yes Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>


        </Container>


    )
}