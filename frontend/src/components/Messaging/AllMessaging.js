import React, {useEffect, useState} from 'react';
import CookieService from "../../CookieService";
import api from "../../api";
import {Badge, Button, Card, CardColumns, Container} from "react-bootstrap";
import Spinner from "../Loading/Spinner";



export default function AllMessaging() {
    const [classroom,setClassroom]=useState([]);

    useEffect(() => {
        fetchClasses();
    },[]);

    function details(id){
        api.detailsOne(id).then(response => {
            console.log(response.data[0].name)
            return (response.data[0].name)
        }).catch(error => {
        })
    }


    function fetchClasses(){
        if(CookieService.get('role')=="teacher"){
            api.myclassesT().then(response=>{
                console.log(response.data)

                setClassroom(response.data)


            }).catch(error=>{
                // history.push('/login');
            })
        }else if(CookieService.get('role')=="student"){
            api.myclassesS().then(response=>{
                console.log(response.data)

                setClassroom(response.data)

            }).catch(error=>{
                // history.push('/login');
            })

        }else {
            api.allmyclasses().then(response=>{
                console.log(response.data)

                setClassroom(response.data)

            }).catch(error=>{
                // history.push('/login');
            })
        }
    }

    function renderClasses(){
        if(CookieService.get('role')!=="student"){
            return( classroom.map(classroom=> {
                    return(
                        <Card key={classroom.id} className='m-4'>
                            <Card.Header as="h5">{classroom.id}- {classroom.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                                <Card.Text>
                                    Teacher Name: {classroom.teacher_name}<br/>
                                    Teacher Email: {classroom.teacher_email}
                                </Card.Text>
                                <Button variant="primary" href={"/messaging/"+classroom.id}>Send private message </Button>
                                <Button variant="secondary" className='mt-1' href={"/groupmessaging/"+classroom.id}>Send group message </Button>

                            </Card.Body>
                        </Card>
                    );
                })
            );}else if(CookieService.get('role')=="student"){
            return( classroom.map(classroom=> {
                return(
                    <Card key={classroom.classId} className='m-4'>
                        <Card.Header as="h5">{classroom.classId}- {classroom.className}</Card.Header>
                        <Card.Body>
                            <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                            <Card.Text>
                                Teacher Name: {classroom.teacherName}<br/>
                                Teacher Email: {classroom.teacherEmail}
                            </Card.Text>
                            <Button variant="primary" href={"/messaging/"+classroom.classId}>Enter the private messaging </Button>
                            <Button variant="secondary" className='mt-1' href={"/groupmessaging/"+classroom.classId}>Enter the group messaging </Button>

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
            <div>
                {renderClasses()}
            </div>
        );
    }
    return (
        <Container className='m-2 '>
            <h1 className='m-4'>
                <Badge pill variant="success" className='text-wrap rounded-0'>
                    Chat
                </Badge>
            </h1>
            <CardColumns className=' ml-1'>

                {classroom.length>0 ? allClasses() : emptyClasses()}
            </CardColumns>

        </Container>
    )
}
