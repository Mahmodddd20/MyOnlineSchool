import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
import Sidebar from "../Sidebar/sidebar";


export default function AllHomeworks(props){
    const [homework, setHomework] =useState([]);
    const [key, setKey] = useState('');


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
                    <Tab tabClassName='ml-0 mt-2 text-capitalize text-monospace btn-outline-primary mr-2 ' eventKey={homework.id} title={homework.name}>
                        <Card key={homework.id} className='ml-0 mt-2 align-items-center w-75 mb-5'>
                            <Card.Body className='ml-0'>
                                <Card.Text dangerouslySetInnerHTML={{__html: homework.description}}>
                                </Card.Text>
                                <Button className='m-2 w-100' variant="outline-info" href={"/homework/show/"+homework.id}>
                                    Enter {homework.name}</Button>

                            </Card.Body>
                        </Card>
                    </Tab>
                );
            })
        );
    }

    function emptyHomeworks(){
        return(
               <Spinner delay="5000"/>

        )
    }

    return (
        <Container className='ml-5 m-2 text-capitalize  '>
            {homework.length>0?<>
                <Row>
                    <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                    <h1 className='ml-3 m-2'>
                        <Badge pill variant="success" className='rounded-0 text-wrap'>
                            welcome to your homeworks
                        </Badge>
                    </h1>
                    </Col>
                    <Col xs md lg="1" >
                        <Sidebar/>
                    </Col>

                </Row>
                <Row>
                    <Button variant='outline-dark' className='ml-3 m-2' onClick={()=>history.goBack()}>Go Back</Button>
                </Row>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}>
                    {homework.length>0 ? renderHomeworks() : emptyHomeworks()}
                </Tabs>
            </>:emptyHomeworks()}
        </Container>
    )
}



