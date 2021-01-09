import {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {Card, Container} from "react-bootstrap";
import api from "../../api";


export default function Homework(props){
    const [homework, setHomework] = useState([])
    const history = useHistory();
    useEffect(()=>{
        fetchHomework();
    },[]);
    function fetchHomework(){
        api.showhomeworkbyid(props.match.params.id)
            .then(response=>{
                setHomework(response.data);
            }).catch(error=>{
            history.push('/login')
        })

    }

    return(
        <Container className='mt-4'>

        <Card >
            <Card.Body>
                <Card.Title>{homework.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{homework.type}</Card.Subtitle>
                <Card.Text dangerouslySetInnerHTML={{__html: homework.description}}/>
                <Card.Link href="#">{homework.link}</Card.Link>
            </Card.Body>
        </Card>
        </Container>

    )
}