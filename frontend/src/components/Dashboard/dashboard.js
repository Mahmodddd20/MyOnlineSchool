import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Container} from "react-bootstrap";
import CookieService from "../../CookieService";
import Spinner from "../Loading/Spinner";


export default function AllMyClasses(){
    const [classroom, setClassroom] =useState([]);
    const history = useHistory();
    useEffect(() => {
        fetchClasses();
    },[]);





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
            history.push('/')
        }
    }


    function renderClasses(){
        if(CookieService.get('role')=="teacher"){
            return( classroom.map(classroom=> {
                    return(
                        <Card key={classroom.id} className='m-4'>
                            <Card.Header as="h5">{classroom.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                                <Card.Text>
                                    Teacher Name: {classroom.teacher_name}<br/>
                                    Teacher Email: {classroom.teacher_email}
                                </Card.Text>
                                <Button variant="primary" href={"/weeks/show/"+classroom.id}>Enter {classroom.name}</Button>
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
                            <Button variant="primary" href={"/weeks/show/"+classroom.classId}>Enter {classroom.className}</Button>
                        </Card.Body>
                    </Card>
                );
            }));

        }

    }
    function emptyClasses(){
        return(
            <Spinner delay="5000"/>        )
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
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    welcome to your classes
                </Badge>
            </h1>
            <CardColumns>

            {classroom.length>0 ? allClasses() : emptyClasses()}
                </CardColumns>

        </Container>
        )
}



