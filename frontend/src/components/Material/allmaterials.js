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
                            {/*<Card.Title>{material.link}</Card.Title>*/}
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
            <div>

                <h1>no material</h1>
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
        <Container className='m-2 '>
            <h1 className='m-4'>
                <Badge pill variant="success">
                    welcome to your material
                </Badge>
            </h1>
            <CardColumns>
                <h1 className='m-4'>
                    <Badge pill variant="light">
                        The Materials
                    </Badge>
                </h1>
            </CardColumns>
            <CardColumns className='d-inline'>
                <CardGroup>
                    {material.length>0 ? allMaterials() : emptyMaterials()}
                </CardGroup>
            </CardColumns>
        </Container>
    )
}



