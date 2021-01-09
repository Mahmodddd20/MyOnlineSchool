import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Container} from "react-bootstrap";
import CookieService from "../../CookieService";


export default function MyWeek(props){
    const [material, setMaterial] =useState([]);
    const [homework, setHomework] =useState([]);


    const history = useHistory();
    useEffect(() => {
        fetchMaterials();
        fetchHomeworks();
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
                    <Card key={material.id} className='m-4'>
                        <Card.Header as="h5">{material.name}</Card.Header>
                        <Card.Body>
                            {/*<Card.Img variant="top" src={material.link} />*/}
                            <Card.Text  dangerouslySetInnerHTML={{ __html: material.description }}>
                            </Card.Text>
                            <Button className='m-2' variant="primary" href={"/material/show/"+material.id}>
                                Enter {material.name}</Button>

                        </Card.Body>
                    </Card>
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
            <div>
                <h4 className='text-monospace text-wrap  text-danger  text-uppercase ml-5'>no material yet</h4>
                <div className="spinner-border  text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>


        )
    }
    function emptyHomeworks(){
        return(
            <div>
                <h4 className='text-monospace text-wrap  text-danger  text-uppercase ml-5'>no homework yet</h4>
                <div className="spinner-border  text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>


        )
    }

    function allMaterials(){
        return(
            <div>
                {renderMaterials()}
            </div>
        );
    }
    function allHomeworks(){
        return(
            <div>
                {renderHomeworks()}
            </div>
        );
    }

    return (
        <Container className='m-2 float-left'>
            <h1 className='m-4'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    welcome to your week
                </Badge>
            </h1>
            <div className='w-50'>
            <div >
                <h1 className='m-4'>
                    <Badge pill variant="light" className='text-wrap'>
                        The Materials
                        {CookieService.get('role')=='teacher'?
                            <Button className='m-2' variant="outline-success" href={'/newmaterial/'+props.match.params.id}>Add Materials</Button>:''}
                    </Badge>
                </h1>
                </div>
            <CardColumns className='m-4 d-inline'>
                <CardGroup className='text-center'>
                    {material.length>0 ? allMaterials() : emptyMaterials()}
                </CardGroup>
            </CardColumns>
            </div>
            <div>
                <h1 className='m-4'>
                    <Badge pill variant="light" className='text-wrap'>
                        The Homeworks
                        {CookieService.get('role')=='teacher'?
                            <Button className='m-2' variant="outline-success" href={'/newhomework/'+props.match.params.id}>Add Homeworks</Button>:''}

                    </Badge>
                </h1>
                </div>
            <CardColumns className='m-4 d-inline'>
                <CardGroup className='text-center'>
                    {homework.length>0 ? allHomeworks() : emptyHomeworks()}
                </CardGroup>
            </CardColumns>


        </Container>
    )
}



