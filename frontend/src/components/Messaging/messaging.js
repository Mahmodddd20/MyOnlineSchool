import React, {useState, useEffect, useRef} from "react";
import api from "../../api";
import { useHistory} from 'react-router-dom';
import CookieService from "../../CookieService";
import {Alert, Badge, Button, Card, Col, Collapse, Container, Form, ListGroup, Row, Toast} from "react-bootstrap";
import Pusher from 'pusher-js';
import Sidebar from "../Sidebar/sidebar";
import Spinner from "../Loading/Spinner";
import Logged from "../Logged";

export default function Messaging (props) {
    const [contacts, setContacts] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [contact, setContact] = useState([]);
    const [contactId, setContactId] = useState("");
    const [open, setOpen] = useState(false);
    const [newM, setNewM] = useState("");
    const [rn, setRn] = useState("");
    const [ri, setRi] = useState("");
    const [si, setSi] = useState("");






    const messagesEndRef = useRef(null);
    function scrollToBottom(){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    const pusher = new Pusher ('9f9f8bcd4a54b9f80bc9', {
        cluster: 'ap2'
    });

    const channel = pusher.subscribe ('MyOnlineSchool');
    channel.bind('my-event', function(data) {
        // alert(JSON.stringify(data));
        if(CookieService.get('id') ==data.sender_id){



        } else if(CookieService.get('id')==data.receiver_id) {
        }if(contactId==data.sender_id){
                    fetchMessages();
                    setRn(data.sender_name[0].name)
                    setRi(data.receiver_id)
                    setSi(data.sender_id)

            renderNew()
                }
        // else {
        //     let sname=data.sender_name[0].name
        //         setNewM(<Alert className='mt-2' variant='info'>
        //                 You Get Message From {sname}.
        //             </Alert>)
        //     setTimeout(() => {
        //         setNewM('');
        //     }, 20000);
        //
        //
        // }



    });
   function renderNew(){
        if(ri==CookieService.get('id')){
            if (contactId!==si){
                        setNewM(<Alert className='mt-2' variant='info'>
                                You Get Message From {rn}.
                            </Alert>)
                    setTimeout(() => {
                        setNewM('');
                    }, 20000);
            }
            else {
                fetchMessages();
            }
        }else {
            fetchMessages();
        }
    }


    const history = useHistory();
    useEffect(() => {
        Logged();
        fetchContacts();
        fetchTeacher();

    }, []);
    useEffect(() => {
    fetchMessages()
    }, [contactId]);


    // useEffect(() => {
    //     const interval=setInterval(()=>{
    //         api.messages(contactId).then(response => {
    //             setMessages(response.data)
    //             scrollToBottom();
    //
    //
    //         })
    //     },10000)
    //     return()=>clearInterval(interval)
    //
    // });

    function fetchContacts () {
        api.allStudentsInClass(props.match.params.id).then(response => {


            setContacts(response.data)


        }).catch(error => {
                     })
    }
    function fetchTeacher () {
        api.teacherInClass(props.match.params.id).then(response => {
            response.data.map(tech=>{
                setTeacher(tech)

            })



        }).catch(error => {
                     })
    }



    function fetchMessages () {
        // if(contactId!==''){
        api.messages(contactId).then(response => {
            setMessages(response.data)
            scrollToBottom();



        }).catch(error => {
                     })
    }


    function renderContacts () {
            return (contacts.map(mycontact => {
                    return (
                        <ListGroup.Item action
                                        onClick={()=>{setContact(mycontact); setContactId(mycontact.userId);fetchMessages();setOpen(!open)}}
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


    function renderMessages() {
        return (messages.map(message => {
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

    function emptyContacts(){
        return(
            <Spinner delay="5000"/>

        )
    }
    function sendMessage (event) {
        event.preventDefault();



        const send = {
            sender_id: CookieService.get('id'),
            receiver_id: contactId,
            message: message,
        }
        api.addMessage(send, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                fetchMessages();
                scrollToBottom();
                event.target.reset();
                scrollToBottom();


                // window.location.reload();
            }).catch(error => {


    })}
    function handelMassegeChange (event) {
        setMessage(event.target.value)
        scrollToBottom();

    }



    function allContacts(){
        return(
            <div className='d-flex flex-row align-items-start h-100' >
                <Collapse in={open}>
                    <ListGroup style={{height:'100%'}} id="example-collapse-text" className='w-50 pre-scrollable '>
                        {CookieService.get('role')!=="admin"?
                            <ListGroup.Item action
                                            onClick={()=>{setContact('Admin');setContactId(1);fetchMessages();setOpen(!open)}}
                                            variant="light" className=' text-capitalize text-monospace m-1'
                                            style={{color:'black'}} key={1}>
                                Admin</ListGroup.Item>:''
                        }

                        {CookieService.get('role')!=="teacher"?
                            <ListGroup.Item action
                                            onClick={()=>{setContact(teacher);setContactId(teacher.userId);fetchMessages();setOpen(!open)}}
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
                            {contact==''?'':renderMessages()}
                            <div ref={messagesEndRef} />
                        </ListGroup>
                    </Card>

                    <Form method="POST" onSubmit={sendMessage} className='mb-0'>
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
    function newMessage(id){
        return(
            <Alert key={id} variant='danger'>
                you got new message!! from user {id}
            </Alert>

        )
    }

    return (
        <div className='m-2 ml-4'>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>

                <h1 className='mt-4 ml-4 mb-0'>
                <Badge pill variant="success rounded-0" className='text-wrap'>
                    private Chat {}
                </Badge>{newM}
            </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>

            </Row>
            <Button variant='outline-dark' className=' m-2 mt-2' onClick={()=>history.goBack()}>Back</Button>
            <div className='ml-2 mt-2 w-75'>
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

            </div>

        </div>
    )

}

