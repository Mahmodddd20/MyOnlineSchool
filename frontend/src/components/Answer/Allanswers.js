import React, {useState,useEffect} from "react";
import api from "../../api";
import {useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
import Sidebar from "../Sidebar/sidebar";
import TeacherOnly from "../Protect/teacherOnly";


export default function AllAnswers(props){
    const [answer, setAnswer] =useState([]);
    const [key, setKey] = useState('');


    const history = useHistory();
    useEffect(() => {
        TeacherOnly();
        fetchAnswers();
    },[]);


    function fetchAnswers(){
        api.allAnswers(props.match.params.id).then(response=>{
            setAnswer(response.data)
        }).catch(error=>{

        })
    }

    function renderAnswers(){
        return( answer.map(answer=> {
                return(
                    <Tab tabClassName='ml-0 mt-2 btn-outline-primary mr-2 '
                         eventKey={answer.id} title={answer.userName}>
                        <Card key={answer.id} className='ml-0 mt-2 align-items-center w-75 mb-5'>
                            <Card.Header className='w-100 text-center'>{answer.userEmail}</Card.Header>
                            <Card.Body className='ml-0'>
                                <Card.Title>{answer.title}</Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{__html: answer.description}}>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted w-100 text-center">{answer.created_at}</Card.Footer>
                        </Card>
                    </Tab>
                );
            })
        );
    }

    function emptyAnswers(){
        return(
            <Spinner delay="5000"/>

        )
    }

    return (
        <Container className='ml-5 m-2   '>
                <Row>
                    <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                        <h1 className='ml-3 m-2'>
                            <Badge pill variant="success" className='rounded-0 text-wrap text-capitalize'>
                                welcome to your answers
                            </Badge>
                        </h1>
                    </Col>
                    <Col xs md lg="1" >
                        <Sidebar/>
                    </Col>

                </Row>
                <Row>
                    <Button variant='outline-dark' className='ml-3 m-2' onClick={()=>history.goBack()}>Back</Button>
                </Row>
            {answer.length>0?
            <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}>
                    {answer.length>0 ? renderAnswers() : emptyAnswers()}
                </Tabs>
            :emptyAnswers()}
        </Container>
    )
}



