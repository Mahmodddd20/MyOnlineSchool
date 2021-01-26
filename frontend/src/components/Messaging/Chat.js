import React, {useEffect, useRef, useState} from 'react';
import CookieService from "../../CookieService";
import api from "../../api";
import {
    Badge,
    Button,
    Card, Col,
    Collapse,
    Container, Form,
    ListGroup,
    Row,
} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Spinner from "../Loading/Spinner";
import Logged from "../Logged";


export default function Chat() {
    const [classroom,setClassroom]=useState([]);
    const [gClassroom,setGClassroom]=useState([]);

    const [classId,setClassId]=useState('');
    const [privateChat,setPrivateChat]=useState(false);
    const [pMessages, setPMessages] = useState([]);
    const [gMessages, setGMessages] = useState([]);

    const [message, setMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [contact, setContact] = useState([]);
    const [contactId, setContactId] = useState("");
    const [open, setOpen] = useState(false);

    const group=() =>setPrivateChat(!privateChat);

    const messagesEndRef = useRef(null);
    function scrollToBottom(){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    //
    // const pusher = new Pusher ('9f9f8bcd4a54b9f80bc9', {
    //     cluster: 'ap2'
    // });
    //
    // const channel = pusher.subscribe ('MyOnlineSchool');
    // channel.bind('my-event', function(data) {
    //     // alert(JSON.stringify(data));
    //     if(CookieService.get('id') ==data.sender_id){
    //     } else if(CookieService.get('id')==data.receiver_id) {
    //     }if(contactId==data.sender_id){
    //         fetchPrivateMessages()
    //     }else if(classroom.id==data.class_id){
    //         fetchGroupMessages()
    //     }
    // });

    const history = useHistory();

    useEffect(() => {
        Logged();
        fetchClasses();
        fetchContacts();
        fetchTeacher();
    }, []);


    useEffect(() => {
        fetchContacts();
        fetchTeacher();
    },[privateChat]);
    useEffect(() => {
        fetchPrivateMessages()
    }, [contactId]);
    useEffect(() => {
        fetchGroupMessages()
        fetchGroupClassroom()
        fetchContacts();
        fetchTeacher();
    }, [classId]);




    function fetchGroupClassroom () {
        api.showClassById(classId).then(response => {
            setGClassroom(response.data)


        }).catch(error => {
                     })
    }

    function fetchContacts () {
        api.allStudentsInClass(classId).then(response => {
            setContacts(response.data)
        }).catch(error => {
                     })
    }



    function fetchTeacher () {
        api.teacherInClass(classId).then(response => {
            response.data.map(tech=>{
                setTeacher(tech)
            })

        }).catch(error => {
                     })
    }
    function fetchPrivateMessages () {
            api.messages(contactId).then(response => {
                setPMessages(response.data)
                scrollToBottom();

            }).catch(error => {
             })

        }

    function fetchGroupMessages () {
            api.groupMessages(classId).then(response => {
                setGMessages(response.data)
                scrollToBottom();
            }).catch(error => {
             })

        }



    function renderContacts () {
        return (contacts.map(mycontact => {
                return (
                    <ListGroup.Item action
                                    onClick={()=>{setContact(mycontact); setContactId(mycontact.userId);fetchPrivateMessages();setOpen(!open)}}
                                    variant="light" className=' text-capitalize text-monospace m-1 '
                                    style={{color:'black'}} key={mycontact.userId}>
                        <img className='rounded-circle mr-1'
                             style={{width:'50px'}}
                             src={mycontact.userPicture}/>
                        {mycontact.userName}
                    </ListGroup.Item>

                );
            })
        );
    }
    function renderPrivateMessages() {
        return (pMessages.map(message => {
                return (
                    <div className='w-auto '>
                        {message.sender_id==CookieService.get('id')?
                            <ListGroup.Item  style={{opacity: 0.9}}
                                             variant="light"
                                             className='ml-2 mr-5 m-1 pb-0 float-left rounded' key={message.id}>
                                <p style={{color:'black',opacity: 1}} className='text-left text-monospace'><strong>{message.name}:</strong> {message.message}</p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item> :
                            <ListGroup.Item style={{backgroundColor:'#c0f5ae',opacity: 0.9}}
                                            variant="primary "
                                            className='mr-2 ml-5 m-1 pb-0 float-right rounded' key={message.id} >
                                <p style={{color:'black',opacity: 1}} className='text-left  text-monospace'><strong>{message.name}:</strong> {message.message} </p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item>}
                    </div>

                );
            })
        )
    }

    function renderGroupMessages() {
        return (gMessages.map(message => {
                return (
                    <div className='w-auto '>
                        {message.sender_id==CookieService.get('id')?
                            <ListGroup.Item  style={{opacity: 0.9}}
                                             variant="light"
                                             className='ml-2 mr-5 m-1 pb-0 float-left rounded' key={message.id}>
                                <p style={{color:'black',opacity: 1}} className='text-left text-monospace'><strong>{message.sender_name}:</strong> {message.message}</p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item> :
                            <ListGroup.Item style={{backgroundColor:'#c0f5ae',opacity: 0.9}}
                                            variant="primary "
                                            className='mr-2 ml-5 m-1 pb-0 float-right rounded' key={message.id} >
                                <p style={{color:'black',opacity: 1}} className='text-left  text-monospace'><strong>{message.sender_name}:</strong> {message.message} </p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item>}
                    </div>

                );
            })
        )
    }



    function emptyContacts(){
        return(
            <Spinner delay="5000"/>

        )
    }
    function sendPrivateMessage (event) {
        event.preventDefault();
        const send = {
            sender_id: CookieService.get('id'),
            receiver_id: contactId,
            message: message,
        }
        api.addMessage(send, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                fetchPrivateMessages();
                scrollToBottom();
                event.target.reset();
                scrollToBottom();

                // window.location.reload();
            }).catch(error => {


        })
    }

    function sendGroupMessage (event) {
        event.preventDefault();
            const send = {
                sender_id: CookieService.get('id'),
                class_id: classId,
                message: message,
            }
            api.addGroupMessage(send, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
                .then(response => {
                    fetchGroupMessages();
                    scrollToBottom();
                    event.target.reset();
                    scrollToBottom();
                    // window.location.reload();
                }).catch(error => {


            })
        }


    function handelMassegeChange (event) {
        setMessage(event.target.value)
        scrollToBottom();

    }

    function GroupChat(){
        return(
            <div className='d-flex w-75'>
                <Card className='w-100 mr-2'>
                    <Card.Header style={{backgroundColor:'#76b7f5'}}
                                 className='text-light text-capitalize text-monospace
                       d-flex align-items-center justify-content-center '>
                         {gClassroom.name}</Card.Header>
                    <Card style={{height:'20rem',backgroundColor:'#e6f0f2'}}>
                        <ListGroup variant="flush"  className='pre-scrollable'>
                            {renderGroupMessages()}
                            <div ref={messagesEndRef} />
                        </ListGroup>
                    </Card>

                    <Form method="POST" onSubmit={sendGroupMessage} className='mb-2'>
                        <Form.Group className='mb-0 mt-2 ml-2 mr-2  d-flex flex-row align-items-center' controlId="formBasicMessage">
                            <Form.Control type="text" placeholder="Enter your message" onChange={handelMassegeChange}/>
                            <Button style={{backgroundColor:'#76b7f5'}} className='m-1 ml-2 p-1 pt-2 ' variant="primary" type="submit">
                                Send
                            </Button>

                        </Form.Group>
                    </Form>

                </Card>

            </div>
        );
    }




    function allContacts(){
        return(
            <div className='d-flex flex-row align-items-start h-100' >
                <Collapse in={open}>
                    <ListGroup style={{height:'100%'}} id="example-collapse-text" className='w-50 pre-scrollable '>
                        {CookieService.get('role')!=="admin"?
                            <ListGroup.Item action
                                            onClick={()=>{setContact('Admin');setContactId(1);fetchPrivateMessages();setOpen(!open)}}
                                            variant="light" className=' text-capitalize text-monospace m-1'
                                            style={{color:'black'}} key={1}>
                                Admin</ListGroup.Item>:''
                        }

                        {CookieService.get('role')!=="teacher"?
                            <ListGroup.Item action
                                            onClick={()=>{setContact(teacher);setContactId(teacher.userId);fetchPrivateMessages();setOpen(!open)}}
                                            variant="light" className=' text-capitalize text-monospace m-1'
                                            style={{color:'black'}} key={teacher.userId}>
                                <img className='rounded-circle mr-1'
                                     style={{width:'50px'}}
                                     src={teacher.userPicture}/>
                                     {teacher.userName}</ListGroup.Item>:''
                        }
                        {renderContacts()}
                    </ListGroup></Collapse>

                <Card className='w-100 pb-2'>
                    <Card style={{height:'20rem',backgroundColor:'#e6f0f2'}}>
                        <ListGroup variant="flush"  className='pre-scrollable'>
                            {contact==''?'':renderPrivateMessages()}
                            <div ref={messagesEndRef} />
                        </ListGroup>
                    </Card>

                    <Form method="POST" onSubmit={sendPrivateMessage} className='mb-0'>
                        <Form.Group className='mb-0 mt-2 ml-2 mr-2  d-flex flex-row  align-items-center' controlId="formBasicMessage">
                            <Form.Control type="text" placeholder="Enter your message" onChange={handelMassegeChange}/>
                            <Button style={{backgroundColor:'#76b7f5'}} className='m-1 ml-2 p-1 pt-2 ' variant="primary" type="submit">
                                Send
                            </Button>

                        </Form.Group>
                    </Form>

                </Card>
            </div>
        );
    }

    function PrivateChat(){
        return(
            <Container style={{height:'100%'}} className='ml-0 pl-0  w-75'>
                    {contacts.length>0 ?<Card>
                        <Card.Header style={{backgroundColor:'#76b7f5'}}
                                     className='text-light text-capitalize text-monospace
                       d-flex align-items-center justify-content-between '>
                            <Button
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                className='btn-outline-light bg-transparent '

                            >
                                USERS
                            </Button>
                            {contact== '' ? '' : <div className='w-auto'>
                                <img className='rounded-circle mr-1'
                                     style={{width:'50px'}}
                                     src={contact.userPicture}/>
                                {contact.userName}</div>}
                        </Card.Header>
                    </Card>:''}

                    {contacts.length>0 ? allContacts() : emptyContacts()}

                </Container>


        )
    }




    function fetchClasses(){
        if(CookieService.get('role')=="teacher"){
            api.myClassesTeacher().then(response=>{

                setClassroom(response.data)


            }).catch(error=>{
             })
        }else if(CookieService.get('role')=="student"){
            api.myClassesStudent().then(response=>{

                setClassroom(response.data)

            }).catch(error=>{
             })

        }else {
            api.allClassesAdmin().then(response=>{

                setClassroom(response.data)

            }).catch(error=>{
             })
        }
    }

    function renderClasses(){
        if(CookieService.get('role')=="teacher"){
            return( classroom.map(classroom=> {
                    return(
                        <Button className='m-2' variant='outline-warning' onClick={()=>{setClassId(classroom.id)}}>{classroom.name}</Button>
                    );
                })
            );}else if(CookieService.get('role')=="student"){
            return( classroom.map(classroom=> {
                return(
                    <Button className='m-2' variant='outline-warning' onClick={()=>{setClassId(classroom.classId)}}>{classroom.className}</Button>
                );
            }));

        }else {
            return( classroom.map(classroom=> {
                    return(
                        <Button className='m-2' variant='outline-warning' onClick={()=>{setClassId(classroom.id)}}>{classroom.name}</Button>
                    );
                })
            );

        }

    }
    function emptyClasses(){
        return(
            <div className='d-flex align-self-center'>
            <Spinner delay="10000"/>
            </div>
        )
    }
    return (
        <Container fluid className='text-capitalize m-2 ml-5 '>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className='m-2'>
                    <Badge pill variant="success" className='text-wrap rounded-0'>
                        Chat
                    </Badge>
                </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>

            </Row>
            <Row>
                    <Button className='m-2' variant='outline-dark' onClick={group}>
                        {privateChat===true?'Private':'Group'}</Button>
                    {classroom.length>0 ? renderClasses() : emptyClasses()}
            </Row>
            <Row>
                <Col lg='10' className='pl-0 ml-1'>
                {privateChat===true?
                    classId!==''?PrivateChat(classId):''
                    :classId!==''?GroupChat(classId):''}
                </Col>
            </Row>

        </Container>
    )
}
