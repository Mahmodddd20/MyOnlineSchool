import React, {useState, useEffect, useRef} from "react";
import api from "../../api";
import {Link, useHistory} from 'react-router-dom';
import CookieService from "../../CookieService";
import {Alert, Badge, Button, Card, CardColumns, Collapse, Container, Form, ListGroup, Toast} from "react-bootstrap";
import Pusher from 'pusher-js';

export default function Messaging (props) {
    const [contacts, setContacts] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [contact, setContact] = useState([]);
    const [contactId, setContactId] = useState("");
    const [open, setOpen] = useState(false);
    const [newM, setNewM] = useState("");


    const messagesEndRef = useRef(null);
    function scrollToBottom(){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher ('9f9f8bcd4a54b9f80bc9', {
        cluster: 'ap2'
    });

    const channel = pusher.subscribe ('MyOnlineSchool');
    channel.bind('my-event', function(data) {
        // alert(JSON.stringify(data));
        if(CookieService.get('id') ==data.sender_id){
                console.log('sender')
        } else if(CookieService.get('id')==data.receiver_id){
                if(contactId==data.sender_id){
                    fetchMessages();
                }else {
                    // const newContacts = contacts.map((item) => {
                    //     if (item.id === data.sender_id) {
                    //         const updatedItem = '1';
                    //
                    //         return updatedItem;
                    //     }
                    //
                    //     return item;
                    // });
                    //
                    // setContacts(newContacts);
                    alert(data.sender_id)


                }
        }
    });




    const history = useHistory();
    useEffect(() => {
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
        api.allStudentInClass(props.match.params.id).then(response => {
            console.log(response.data)


            setContacts(response.data)


        }).catch(error => {
            // history.push('/login');
        })
    }
    function fetchTeacher () {
        api.teacherInClass(props.match.params.id).then(response => {
            response.data.map(tech=>{
                setTeacher(tech)

            })



        }).catch(error => {
            // history.push('/login');
        })
    }



    function fetchMessages () {
        if(contactId!==''){
        api.messages(contactId).then(response => {
            console.log('messages',response.data)
            setMessages(response.data)
            scrollToBottom();



        }).catch(error => {
            // history.push('/login');
        })}
    }


    function renderContacts () {
            return (contacts.map(mycontact => {
                    return (
                            <ListGroup.Item action
                                            onClick={()=>{setContact(mycontact); setContactId(mycontact.userId);fetchMessages();setOpen(!open)}}
                                            variant="light" className=' text-capitalize text-monospace m-1 '
                                            style={{color:'black'}} key={mycontact.userId}>
                                {mycontact.userName}
                            </ListGroup.Item>

                    );
                })
            );
        }


    function renderMessages() {
        return (messages.map(message => {
                console.log(messages)
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
            <div className="spinner-border m-5 text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>

        )
    }
    function sendMessage (event) {
        event.preventDefault();



        const send = {
            sender_id: CookieService.get('id'),
            receiver_id: contactId,
            message: message,
        }
        api.addmessage(send, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
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
                {CookieService.get('role')!=="teacher"?
                    <ListGroup.Item action
                                    onClick={()=>{setContact(teacher);setContactId(teacher.userId);fetchMessages();setOpen(!open)}}
                                    variant="light" className=' text-capitalize text-monospace' key={teacher.userId}>Teacher: {teacher.userName}</ListGroup.Item>:''
                }
                {renderContacts()}
                </ListGroup></Collapse>

                <Card className='w-100 h-100'>
                    <Card style={{height:'20rem',backgroundColor:'#e6f0f2'}}>
                    <ListGroup variant="flush"  className='pre-scrollable'>
                        {contact==''?'':renderMessages()}
                        <div ref={messagesEndRef} />
                    </ListGroup>
                    </Card>

                    <Form method="POST" onSubmit={sendMessage} className='mb-2'>
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
    function newMessage(id){
        return(
            <Alert key={id} variant='danger'>
                you got new message!! from user {id}
            </Alert>

        )
    }

    return (
        <Container className='m-2 w-100 h-100'>
            <h1 className='m-4'>
                <Badge pill variant="success rounded-0 text-wrap">
                    Welcome To Your Class Messages
                </Badge>{newM}
            </h1>
            <div className='m-4 '>
                {contacts.length>0 ?<Card className='w-100 '>
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
                         {contact== '' ? '' : <div className='w-auto pl-5  '>The messages of <strong>{contact.userName}</strong></div>}
                    </Card.Header>
                </Card>:''}

                    {contacts.length>0 ? allContacts() : emptyContacts()}

            </div>

        </Container>
    )

}

