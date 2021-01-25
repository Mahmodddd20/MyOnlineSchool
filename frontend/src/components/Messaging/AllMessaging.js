import React, {useEffect, useState} from 'react';
import CookieService from "../../CookieService";
import api from "../../api";
import {Badge, Button, Card, CardColumns, Col, Container, Row} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
import Sidebar from "../Sidebar/sidebar";
import {useHistory} from "react-router-dom";
import Logged from "../Logged";



export default function AllMessaging() {
    const [classroom,setClassroom]=useState([]);
    const history = useHistory();


    useEffect(() => {
        Logged();

        fetchClasses();
    },[]);

    function details(id){
        api.detailsById(id).then(response => {
            return (response.data[0].name)
        }).catch(error => {
        })
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
        if(CookieService.get('role')!=="student"){
            return( classroom.map(classroom=> {
                    return(
                        <Card key={classroom.id} className=' m-2 ml-0'>
                            <Card.Header as="h5">{classroom.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                                <Card.Text>
                                    Teacher Name: {classroom.teacher_name}<br/>
                                    Teacher Email: {classroom.teacher_email}
                                </Card.Text>
                                <Button variant="primary" href={"/messaging/"+classroom.id}>Send private message </Button><br/>
                                <Button variant="secondary" className='mt-2' href={"/groupmessaging/"+classroom.id}>Send group message </Button>

                            </Card.Body>
                        </Card>
                    );
                })
            );}else if(CookieService.get('role')=="student"){
            return( classroom.map(classroom=> {
                return(
                    <Card key={classroom.classId} className='m-2 ml-0'>
                        <Card.Header as="h5">{classroom.classId}- {classroom.className}</Card.Header>
                        <Card.Body>
                            <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                            <Card.Text>
                                Teacher Name: {classroom.teacherName}<br/>
                                Teacher Email: {classroom.teacherEmail}
                            </Card.Text>
                            <Button variant="primary" href={"/messaging/"+classroom.classId}>Enter the private messaging </Button><br/>
                            <Button variant="secondary" className='mt-2' href={"/groupmessaging/"+classroom.classId}>Enter the group messaging </Button>

                        </Card.Body>
                    </Card>
                );
            }));

        }

    }
    function emptyClasses(){
        return(
            <Spinner delay="5000"/>
        )
    }
    function allClasses(){
        return(
            <div className='ml-0'>
                {renderClasses()}
            </div>
        );
    }
    return (
        <div className='m-2 ml-5'>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className='m-4 mb-0 '>
                <Badge pill variant="success" className='text-wrap rounded-0'>
                    Chat
                </Badge>
            </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>

            </Row>
            <Button variant='outline-dark' className='mt-0 ml-2' onClick={()=>history.goBack()}>Back</Button>
            <CardColumns className='mt-2 pl-0 ml-0'>

                {classroom.length>0 ? allClasses() : emptyClasses()}
            </CardColumns>

        </div>
    )
}
