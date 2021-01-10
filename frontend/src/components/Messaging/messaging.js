import React, {useState, useEffect, useRef} from "react";
import api from "../../api";
import {Link, useHistory} from 'react-router-dom';
import CookieService from "../../CookieService";
import {Alert, Badge, Button, Card, CardColumns, Container, Form, ListGroup, Toast} from "react-bootstrap";
import Pusher from 'pusher-js';

export default function Messaging (props) {
    const [contacts, setContacts] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [contact, setContact] = useState([]);
    const [contactId, setContactId] = useState("");
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
        api.messages(contactId).then(response => {
            console.log('messages',response.data)
            setMessages(response.data)
            scrollToBottom();



        }).catch(error => {
            // history.push('/login');
        })
    }


    function renderContacts () {
            return (contacts.map(mycontact => {
                    return (
                            <ListGroup.Item action
                                            onClick={()=>{setContact(mycontact); setContactId(mycontact.userId);fetchMessages()}}
                                            variant="dark" className='text-primary text-capitalize text-monospace' key={mycontact.userId}>
                                {mycontact.userName}<span id={mycontact.userId}></span>
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
                            <ListGroup.Item  variant="info" className='m-1 pb-0 float-left' key={message.id}>
                                <p className='text-left  text-monospace'><strong>{message.name}:</strong> {message.message}</p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item> :''}
                        {message.receiver_id==CookieService.get('id')?
                            <ListGroup.Item  variant="primary" className='m-1 pb-0 float-right ' key={message.id} >
                                <p className='text-left  text-monospace'><strong>{message.name}:</strong> {message.message} </p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item>:''}
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
            <div className='d-flex '>
            <ListGroup style={{ width: '18rem' }} className='pre-scrollable '>
                {CookieService.get('role')!=="teacher"?
                    <ListGroup.Item action
                                    onClick={()=>{setContact(teacher);setContactId(teacher.userId);fetchMessages()}}
                                    variant="dark" className='text-primary text-capitalize text-monospace' key={teacher.userId}>Teacher: {teacher.userName}</ListGroup.Item>:''
                }
                {renderContacts()}
            </ListGroup>
                {contact==''?'':
                <Card style={{ maxWidth: '35rem', minWidth: '18rem' ,width:'25rem'}}>
                    <Card.Header className='text-capitalize'>The messages of <strong>{contact.userName}</strong></Card.Header>
                    <ListGroup variant="flush" className='pre-scrollable w-100'>
                        {renderMessages()}
                        <div ref={messagesEndRef} />
                    </ListGroup>

                    <Form method="POST" onSubmit={sendMessage}>
                        <Form.Group controlId="formBasicMessage">
                            {/*<Form.Label>Enter your message</Form.Label>*/}
                            <Form.Control type="text" placeholder="Enter your message" onChange={handelMassegeChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>

                </Card>}
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
        <Container className='m-2 '>
            <h1 className='m-4'>
                <Badge pill variant="success rounded-0 text-wrap">
                    Welcome To Your Class Messages
                </Badge>{newM}
            </h1>
            <div>
                {contacts.length>0 ?<Card style={{ width: '18rem' }}>
                    <Card.Header>USERS</Card.Header>
                </Card>:''}

                    {contacts.length>0 ? allContacts() : emptyContacts()}

            </div>

        </Container>
    )

}

