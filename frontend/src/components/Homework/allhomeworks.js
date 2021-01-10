import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Container} from "react-bootstrap";


export default function AllHomeworks(props){
    const [homework, setHomework] =useState([]);

    const history = useHistory();
    useEffect(() => {
        fetchHomeworks();
    },[]);


    function fetchHomeworks(){
        api.myhomeworks(props.match.params.id).then(response=>{
            setHomework(response.data)
        }).catch(error=>{
            history.push('/login');
        })
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

    function emptyHomeworks(){
        return(
            <div className='d-flex mt-0 ml-2'>
                <h1 className='text-monospace text-uppercase mt-0 m-2 p-2'>no homeworks yet
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
        <Container className='m-lg-5 text-capitalize text-wrap w-auto '>
            <h1 className='m-4'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    welcome to your homeworks
                </Badge>
            </h1>
            <div className='w-50'>
                <h1 className='m-4'>
                    <Badge pill variant="light" className='text-wrap'>
                        The Homeworks
                    </Badge>
                </h1>
            </div>
            <CardColumns className='m-0 d-inline'>
                <CardGroup>
                    {homework.length>0 ? allHomeworks() : emptyHomeworks()}
                </CardGroup>
            </CardColumns>


        </Container>
    )
}



