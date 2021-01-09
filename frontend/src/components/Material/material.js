import {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {Card, Container} from "react-bootstrap";
import api from "../../api";


export default function Material(props){
    const [material, setMaterial] = useState([])
    const history = useHistory();
    useEffect(()=>{
        fetchMaterial();
    },[]);
    function fetchMaterial(){
        api.showmaterialbyid(props.match.params.id)
            .then(response=>{
                setMaterial(response.data);
            }).catch(error=>{
            history.push('/login')
        })

    }

        return(
            <Container className='mt-4'>
        <Card >
            <Card.Body>
                <Card.Title>{material.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{material.type}</Card.Subtitle>
                <Card.Text dangerouslySetInnerHTML={{__html: material.description}}/>
                <Card.Link href="#">{material.link}</Card.Link>
            </Card.Body>
        </Card>
            </Container>
)
}