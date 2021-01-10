import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Container, Modal} from "react-bootstrap";
import CookieService from "../../CookieService";



export default function Admin(){
    const [classroom, setClassroom] =useState([]);

    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();
    useEffect(() => {
        protect();
        fetchClasses();

    },[]);
    function protect(){
        {CookieService.get('role')!=="admin"?handleLogout():console.log(CookieService.get('role'))}

    }
    function handleShow (id)
    {
        setShow(true);
        setDel(id);
    }

    function handleLogout() {
        api.logout().then((response) => {
            CookieService.remove('access_token')
            history.push('/login');
            window.location.reload();
        }).catch(error=>{
            history.push('/login');
            window.location.reload();
    })}


    function details(id){
        api.detailsOne(id).then(response => {
            console.log(response.data[0].name)
            return (response.data[0].name)
        }).catch(error => {
        })
    }


    function fetchClasses(){
        api.allmyclasses().then(response=>{
            setClassroom(response.data)
            console.log('response',response.data)
            console.log('classroom',classroom)


        }).catch(error=>{
            history.push('/login');
        })
    }
    function deleteclass(id){
        api.deleteclass(id).then(response=>{
            fetchClasses();
            // window.location.reload();
        })
    }


    function renderClasses(){
        console.log('classroomafter',classroom)
        return( classroom.map(classroom=> {
                return(

                    <Card key={classroom.id} className='mt-4 mb-4 ml-0 mr-4'>
                        <Card.Header as="h5" className='text-wrap p-4 flex-column align-middle h-100'>{classroom.name}
                            <div className='d-block  float-right align-middle '>
                                <Button variant="danger" className='float-right ml-1'  onClick={()=>{{handleShow(classroom.id)}}}>Delete</Button>
                                <Button variant="warning" className='float-right mr-1' href={'/class/edit/' + classroom.id}>Edit</Button>
                            </div>

                        </Card.Header>
                        <Card.Body>
                            <Card.Title >From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                            Teacher Name: {classroom.teacher_name}<br/>
                            Teacher Email: {classroom.teacher_email}
                            <Button className='m-2' variant="primary" href={"/weeks/show/"+classroom.id}>Enter {classroom.name}</Button>
                        </Card.Body>
                    </Card>
                );
            })
        );
    }
    function emptyClasses(){
        return(

            <div className='d-flex'>
                <h1 className='text-monospace text-uppercase mt-5 m-2 p-2'>no classes Yet
                <div className="spinner-border ml-2 mb-0 mt-0 text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </h1>
            </div>

        )
    }
    function allClasses(){
        return(
            <div className='ml-1'>
                {renderClasses()}
            </div>
        );
    }
    return (
        <Container className='m-lg-5 text-capitalize text-wrap w-auto'>
            <h1 className='m-4'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    welcome to admin Page
                </Badge>
            </h1>
            <Container>
                <Button className='m-2' variant="info" href={'/newclassroom'}>create new class</Button>
                <Button className='m-2' variant="outline-primary" href={'/register'}>register users</Button>

                <CardColumns className='d-inline ml-1'>

                {classroom.length>0 ? allClasses() : emptyClasses()}
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



