import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Container, Row, Table} from "react-bootstrap";
import CookieService from "../../CookieService";
import Spinner from "../Loading/Spinner";


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
                        <th><Button className='m-2' variant="primary" href={"/material/show/"+material.id}>Enter {material.name}</Button></th>
                    </tr>
                );
            })
        );
    }
    function renderHomeworks(){
        return( homework.map(homework=> {
                return(
                    <Card key={homework.id} className='m-4'>
                        <Card.Header as="h5">{homework.name}</Card.Header>
                        <Card.Body>
                            {/*<Card.Img variant="top" src={homework.link} />*/}
                            <Card.Title>{homework.type}</Card.Title>
                            <Card.Text dangerouslySetInnerHTML={{ __html: homework.description }}>
                            </Card.Text>
                            <Button className='m-2' variant="primary" href={"/homework/show/"+homework.id}>
                                Enter {homework.name}</Button>

                        </Card.Body>
                    </Card>
                );
            })
        );
    }

    function emptyMaterials(){
        return(
            <div className='d-flex ml-2'>
                <h1 className='text-monospace text-uppercase mt-5 m-2 p-2'>no materials yet
                    <div className="spinner-border ml-2 mb-0 mt-0 text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </h1>
            </div>
        )
    }
    function emptyHomeworks(){
        return(
            <div className='d-flex ml-2'>
                <h1 className='text-monospace text-uppercase mt-5 m-2 p-2'>no homeworks yet
                    <div className="spinner-border ml-2 mb-0 mt-0 text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </h1>
            </div>
        )
    }

    function allHomeworks(){
        return(
            <div>
                {renderHomeworks()}
            </div>
        );
    }

    return (
        <Container className='text-capitalize m-2 ml-5'>
            {/*{weekName!==''?*/}
                <div>
            <Row>
                <h1 className='m-2'>
                    <Badge pill variant="success" className='rounded-0 text-wrap'>
                        welcome to {weekName}
                    </Badge>
                </h1>
            </Row>
        <div className=''>
            <Row>
                <div  className=' text-capitalize'>
                    <Table striped bordered hover>
                        <thead>
                        <tr key={props.match.params.id}>
                            <td colSpan="2"><h4 className='m-0 w-50'>Materials</h4>
                                {CookieService.get('role')=='teacher'?
                                    <Button className='' variant="outline-success" href={'/newmaterial/'+props.match.params.id}>Add Materials</Button>:''}
                            </td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                        </tr>
                        </thead>
                        <tbody >
                        {material.length>0 ? renderMaterials() : emptyMaterials()}
                        </tbody>
                    </Table>
                </div>
            </Row>
            </div>

                <div className='w-50'>
            <div>
                <h1 className='m-4'>
                    <Badge pill variant="light" className='text-wrap'>
                        The Homeworks
                        {CookieService.get('role')=='teacher'?
                            <Button className='m-2' variant="outline-success" href={'/newhomework/'+props.match.params.id}>Add Homeworks</Button>:''}

                    </Badge>
                </h1>
                </div>
            <CardColumns className='mt-0 m-4 d-inline '>
                <CardGroup className='text-center'>
                    {homework.length>0 ? allHomeworks() : emptyHomeworks()}
                </CardGroup>
            </CardColumns>
            </div>

            </div>
            {/*:<Spinner delay="8000"/>}*/}
        </Container>
    )
}



