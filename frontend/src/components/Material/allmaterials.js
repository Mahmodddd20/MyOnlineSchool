import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Container} from "react-bootstrap";


export default function MyWeek(props){
    const [material, setMaterial] =useState([]);

    const history = useHistory();
    useEffect(() => {
        fetchMaterials();
    },[]);


    function fetchMaterials(){
        api.mymaterials(props.match.params.id).then(response=>{
            setMaterial(response.data)
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
                            <Card.Text dangerouslySetInnerHTML={{__html: material.description}}>
                            </Card.Text>
                            <Button className='m-2' variant="primary" href={"/material/show/"+material.id}>
                                Enter {material.name}</Button>

                        </Card.Body>
                    </Card>
                );
            })
        );
    }

    function emptyMaterials(){
        return(
            <div className='d-flex mt-0 ml-2'>
                <h1 className='text-monospace text-uppercase mt-0 m-2 p-2'>no materials yet
                    <div className="spinner-border ml-2 mb-0 mt-0 text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </h1>
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

    return (
        <Container className='m-lg-5 text-capitalize text-wrap w-auto '>
            <h1 className='m-4'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    welcome to your materials
                </Badge>
            </h1>
            <div className='w-50'>
                <h1 className='m-4'>
                    <Badge pill variant="light" className='text-wrap'>
                        The Materials
                    </Badge>
                </h1>
            </div>
            <CardColumns className='m-0 d-inline'>
                <CardGroup className='text-center'>
                    {material.length>0 ? allMaterials() : emptyMaterials()}
                </CardGroup>
            </CardColumns>
        </Container>
    )
}



