import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Col, Container, Row, Table} from "react-bootstrap";
import CookieService from "../../CookieService";
import Spinner from "../Loading/Spinner";
import Spinner3 from "../Loading/Spinner3";
import Spinner2 from "../Loading/Spinner2";


export default function MyWeek(props){
    const [material, setMaterial] =useState([]);
    const [homework, setHomework] =useState([]);
    const [weekName, setWeekName] =useState('');



    const history = useHistory();
    useEffect(() => {
        fetchMaterials();
        fetchHomeworks();
        api.myweek(props.match.params.id).then(response=>{
            setWeekName(response.data.name)
        })
    },[]);


    function fetchMaterials(){
        api.mymaterials(props.match.params.id).then(response=>{
            setMaterial(response.data)
        }).catch(error=>{
            history.push('/login');
        })
    }
    function fetchHomeworks(){
        api.myhomeworks(props.match.params.id).then(response=>{
            setHomework(response.data)
        }).catch(error=>{
            history.push('/login');
        })
    }

    function renderMaterials(){
        return( material.map(material=> {
                return(
                    <tr key={material.id}>
                        <th>{material.name}</th>
                        <th>{material.type}</th>
                        <th><Button className='align-self-center' variant="outline-primary" href={'/material/show/'+material.id}>View </Button></th>

                    </tr>
                );
            })
        );
    }
    function renderHomeworks(){
        return( homework.map(homework=> {
                return(
                    <tr key={homework.id}>
                        <th>{homework.name}</th>
                        <th>{homework.type}</th>
                        <th><Button className='align-self-center' variant="outline-primary" href={'/homework/show/'+homework.id}>View</Button></th>

                    </tr>
                );
            })
        );
    }

    function emptyMaterials(){
        return(
            <Spinner2 delay="10000"/>
        )
    }
    function emptyHomeworks(){
        return(
            <Spinner2 delay="10000"/>
        )
    }

    return (
        <Container className='text-capitalize m-2 ml-5'>
            {homework.length>0?<>
                <Row>
                <h1 className='m-2'>
                    <Badge pill variant="success" className='rounded-0 text-wrap'>
                        welcome to {weekName}
                    </Badge>
                </h1>
            </Row>
            <Row>
                <Button variant='outline-dark' className='float-right m-2' onClick={()=>history.goBack()}>Go Back</Button>
            </Row>
            <Row className='mt-2 d-flex flex-row flex-wrap '>
                <Col xs='10' lg="4" className=' ml-1 pl-0 mr-4 '>
                    <Table striped bordered hover size='lg'>
                        <thead>
                        <tr key={props.match.params.id}>
                            <th colSpan="2" className='w-auto'><h4 className=''>Materials</h4>
                            </th>
                            <th className='w-25'>
                                {CookieService.get('role')=='teacher'?
                                    <Button className='' variant="outline-success" href={'/newmaterial/'+props.match.params.id}>Add </Button>
                                    :<Button className='' variant="outline-warning" href={'/materials/all/'+props.match.params.id}>View </Button>
                                }

                            </th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody >
                        {material.length>0 ? renderMaterials() : emptyMaterials()}
                        </tbody>
                    </Table>
                </Col>
                <Col xs='10' lg="4" className=' ml-1 pl-0 mr-4'>
                    <Table striped bordered hover size='lg'>
                        <thead>
                        <tr key={props.match.params.id}>
                            <th colSpan="2" className='w-auto'><h4 className=''>Homeworks</h4>
                            </th>
                            <th className='w-25'>
                                {CookieService.get('role')=='teacher'?
                                    <Button className='' variant="outline-success" href={'/newhomework/'+props.match.params.id}>Add </Button>
                                    :<Button className='' variant="outline-warning" href={'/homeworks/all/'+props.match.params.id}>View </Button>
                                }

                            </th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th></th>

                        </tr>
                        </thead>
                        <tbody >
                        {homework.length>0 ? renderHomeworks() : emptyHomeworks()}
                        </tbody>
                    </Table>
                </Col>

            </Row>
            </>:<Spinner delay="10000"/>}
        </Container>
    )
}



