import React, {useEffect, useRef, useState} from "react";
import api from "../../api";
import {useHistory} from 'react-router-dom';
import CookieService from "../../CookieService";
import { Badge, Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import Pusher from 'pusher-js';
import Sidebar from "../Sidebar/sidebar";
import Logged from "../Protect/Logged";

export default function GroupMessaging (props) {
    const [classroom, setClassroom] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');


    const messagesEndRef = useRef(null);
    function scrollToBottom(){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    const pusher = new Pusher ('9f9f8bcd4a54b9f80bc9', {
        cluster: 'ap2'
    });
    const channel = pusher.subscribe ('MyOnlineSchool');
    channel.bind('group', function(data) {
        if(CookieService.get('id') == data.sender_id){
        } else if(classroom.id==data.class_id){
                fetchMessages();
            }
    });
// you can use this section if Pusher didn't work for you
    // useEffect(() => {
    //     const interval=setInterval(()=>{
    //         api.messages(contactId).then(response => {
    //             setMessages(response.data)
    //             scrollToBottom();
    //         })
    //     },10000)
    //     return()=>clearInterval(interval)
    // });

    const history = useHistory();
    useEffect(() => {
        Logged();
        fetchClassroom();
        fetchMessages();
    }, []);
    function fetchClassroom () {
        api.showClassById(props.match.params.id).then(response => {
            setClassroom(response.data)
        }).catch(error => {
                     })
    }
    function fetchMessages () {
        api.groupMessages(props.match.params.id).then(response => {
            setMessages(response.data)
            scrollToBottom();
        }).catch(error => {
                     })
    }
    function renderMessages() {
        return (messages.map(message => {
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

    function sendMessage (event) {
        event.preventDefault();
        const send = {
            sender_id: CookieService.get('id'),
            class_id: props.match.params.id,
            message: message,
        }
        api.addGroupMessage(send, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                fetchMessages();
                scrollToBottom();
                event.target.reset();
                scrollToBottom();
                // window.location.reload();
            }).catch(error => {
        })}
    function handleMassageChange (event) {
        setMessage(event.target.value)
        scrollToBottom();
    }
    function Group(){
        return(
            <div className='d-flex w-75'>
                <Card className='w-100 mr-2'>
                    <Card.Header style={{backgroundColor:'#76b7f5'}}
                                 className='text-light text-capitalize text-monospace
                       d-flex align-items-center justify-content-center '>
                        {classroom.name}</Card.Header>
                    <Card style={{height:'20rem',backgroundColor:'#e6f0f2'}}>
                        <ListGroup variant="flush"  className='pre-scrollable'>
                            {renderMessages()}
                            <div ref={messagesEndRef} />
                        </ListGroup>
                    </Card>
                    <Form method="POST" onSubmit={sendMessage} className='mb-2'>
                        <Form.Group className='mb-0 mt-2 ml-2 mr-2  d-flex flex-row align-items-center' controlId="formBasicMessage">
                            <Form.Control type="text" placeholder="Enter your message" onChange={handleMassageChange}/>
                            <Button style={{backgroundColor:'#76b7f5'}} className='m-1 ml-2 p-1 pt-2 ' variant="primary" type="submit">
                                Send
                            </Button>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        );
    }
    return (
        <div className='m-2 ml-4'>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className='mt-4 ml-4 mb-0'>
                <Badge pill variant="success rounded-0" className='text-wrap'>
                    Welcome To Your Group Messages
                </Badge>
            </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>
            </Row>
            <Button variant='outline-dark' className=' m-2' onClick={()=>history.goBack()}>Back</Button>
            <div className='ml-2 mt-2 w-75' >
                {Group()}
            </div>
        </div>
    )

}

