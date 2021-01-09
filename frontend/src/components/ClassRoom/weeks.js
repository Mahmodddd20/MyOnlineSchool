import React, {useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import api from '../../api';
import {Badge, Button, Card, CardColumns, Container, Modal} from "react-bootstrap";
import CookieService from '../../CookieService';


export default function AllClassWeeks(props){
    const [className, setClassName] = useState('');
    const [week, setWeek] = useState([]);

    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();

    useEffect(()=>{
        fetchClass()
        fetchWeeks()
    },[]);

    function deleteWeek(id){
        console.log('click')
        api.deleteweek(id).then(response=>{
            fetchWeeks()
            // window.location.reload();

        })}
    function handleShow (id)
        {
            setShow(true);
            setDel(id);
        }


    function fetchWeeks(){
        api.myweeks(props.match.params.id).then(response=>{
            setWeek(response.data)
        }).catch(error=>{
            history.push('/login')
        })

    }
    function fetchClass(){
        api.myclass(props.match.params.id).then(
            response => {
                setClassName(response.data.name);
            }).catch(error=>{
            history.push('/login')
        })

    }



    function emptyWeeks(){
        return(
            <div>
            <div className="spinner-border m-5 text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
                <h1 className='text-monospace  text-danger  text-uppercase'>No Weeks Yet</h1>
            </div>
        );
    }


    function allWeek(){
        return week.map(week=>{
            return(
                <Card key={week.id} className='m-4 '>
                    <Card.Header as="h5" className='text-wrap p-4 flex-column align-middle h-100'>
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
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button className='m-2' variant="primary" href={"/materials/all/"+week.id}>Enter The Week Materials</Button>
                        <Button className='m-2' variant="primary" href={"/homeworks/all/"+week.id}>Enter The Week Homeworks</Button>
                        <Button className='m-2' variant="primary" href={"/week/show/"+week.id}>Enter {week.name}</Button>

                    </Card.Body>
                </Card>
            );
        })
    }



    return(
        <Container className='m-lg-5' >
            <h1 className='m-4'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    {className==''?
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        :className}
                </Badge>
            </h1>
            <Container>
                {CookieService.get('role')=='teacher'?<Button className='m-2' variant="outline-primary" href={'/neweek/'+props.match.params.id}>create new week</Button>:''}
                {CookieService.get('role')=='teacher'?<Button className='m-2' variant="outline-info" href={'/sendemail/'+props.match.params.id}>Send Email To Students</Button>:''}

                {CookieService.get('role')=='admin'?<Button className='m-2' variant="info" href={'/addstudenttoclass/'+props.match.params.id}>add students to the class</Button>:''}
                {CookieService.get('role')=='admin'?<Button className='m-2' variant="outline-primary" href={'/sendemail/'+props.match.params.id}>Send Email To Students</Button>:''}



                <CardColumns className='d-inline'>

                {week.length >0 ? allWeek() : emptyWeeks() }
            </CardColumns>
            </Container>

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