import React, {useEffect, useRef, useState} from "react";
import api from "../../api";
import {useHistory} from 'react-router-dom';
import CookieService from "../../CookieService";
import {Alert, Badge, Button, Card, Container, Form, ListGroup} from "react-bootstrap";
import Pusher from 'pusher-js';
import {render} from "@testing-library/react";

export default function GroupMessaging (props) {
    const [classroom, setClassroom] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
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
        if(CookieService.get('id') == data.sender_id){
            console.log('sender')
        } else if(classroom.id==data.class_id){
                fetchMessages();
            }

    });


    const history = useHistory();
    useEffect(() => {
        fetchClassroom();
        fetchMessages();


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

    function fetchClassroom () {
        api.myclass(props.match.params.id).then(response => {
            console.log(response.data)
            setClassroom(response.data)
            console.log('classroom',classroom)


        }).catch(error => {
            // history.push('/login');
        })
    }



    function fetchMessages () {
        api.groupmessages(props.match.params.id).then(response => {
            console.log('messages',response.data)
            setMessages(response.data)
            scrollToBottom();
        }).catch(error => {
            // history.push('/login');
        })
    }

    function renderMessages() {
        return (messages.map(message => {
                console.log(messages)
                return (
                    <div className='w-auto '>
                        {message.sender_id==CookieService.get('id')?
                            <ListGroup.Item  variant="info" className='m-1 pb-0 float-left' key={message.id}>
                                <p className='text-left  text-monospace'><strong>Me:</strong> {message.message}</p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item> :
                            <ListGroup.Item  variant="primary" className='m-1 pb-0 float-right ' key={message.id} >
                                <p className='text-left  text-monospace'><strong>{message.sender_name}:</strong> {message.message} </p>
                                <p className='text-muted text-center text-monospace'>{message.created_at}</p>
                            </ListGroup.Item>}
                    </div>

                );
            })
        )
    }

    function sendMessage (event) {
        event.preventDefault();



        const send = {
            sender_id: CookieService.get('id'),
            class_id: props.match.params.id,
            message: message,
        }
        api.addgroupmessage(send, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
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

    function Group(){
        return(
            <div className='d-flex h-auto'>
                    <Card style={{ maxWidth: '35rem', minWidth: '18rem' ,width:'25rem'}}>
                        <Card.Header className='text-primary text-capitalize text-monospace'>class: <strong>{classroom.name}</strong></Card.Header>
                        <ListGroup variant="flush" className='pre-scrollable '>
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
        <Container className='m-2 '>
            <h1 className='m-4'>
                <Badge pill variant="success rounded-0" className='text-wrap'>
                    Welcome To Your Group Messages
                </Badge>
            </h1>
            <div>
                {Group()}

            </div>

        </Container>
    )

}

