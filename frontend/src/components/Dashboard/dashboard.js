import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Col, Container, Row} from "react-bootstrap";
import CookieService from "../../CookieService";
import Spinner from "../Loading/Spinner";
import Sidebar from "../Sidebar/sidebar";


export default function AllMyClasses(){
    const [classroom, setClassroom] =useState([]);
    const history = useHistory();
    useEffect(() => {
        fetchClasses();
    },[]);





    function fetchClasses(){
        if(CookieService.get('role')=="teacher"){
        api.myClassesTeacher().then(response=>{
            console.log(response.data)

            setClassroom(response.data)


        }).catch(error=>{
            // history.push('/login');
        })
    }else if(CookieService.get('role')=="student"){
            api.myClassesStudent().then(response=>{
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
                        <Card key={classroom.id} className='ml-0 mr-2 mt-2 mb-2'>
                            <Card.Header as="h5">{classroom.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                                <Card.Text>
                                    Teacher Name:<br/> {classroom.teacher_name}<br/>
                                    Teacher Email:<br/> {classroom.teacher_email}
                                </Card.Text>
                                <Button variant="primary" href={"/weeks/show/"+classroom.id}>View More ...</Button>
                            </Card.Body>
                        </Card>
                );
            })
        );}else if(CookieService.get('role')=="student"){
            return( classroom.map(classroom=> {
                return(
                    <Card key={classroom.classId} className='ml-0 mr-2 mt-2 mb-2'>
                        <Card.Header as="h5">{classroom.className}</Card.Header>
                        <Card.Body>
                            <Card.Title>From {classroom.start_date} To {classroom.finish_date}</Card.Title>
                            <Card.Text>
                                Teacher Name: {classroom.teacherName}<br/>
                                Teacher Email: {classroom.teacherEmail}
                            </Card.Text>
                            <Button variant="primary" href={"/weeks/show/"+classroom.classId}>View More ...</Button>
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
            <div className='ml-0'>
                {renderClasses()}
            </div>
        );
    }
    return (
        <div className='m-2 ml-4'>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className='m-4'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    Welcome To Your Classes
                </Badge>
            </h1>
                </Col>
                <Col xs md lg="1" >
                    <Sidebar/>
                </Col>

            </Row>

            <CardColumns className='w-75 ml-2'>

            {classroom.length>0 ? allClasses() : emptyClasses()}
                </CardColumns>

        </div>
        )
}



