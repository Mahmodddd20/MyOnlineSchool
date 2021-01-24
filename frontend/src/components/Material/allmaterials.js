import React, {useState,useEffect} from "react";
import api from "../../api";
import { Link ,useHistory } from 'react-router-dom';
import {Badge, Button, Card, CardColumns, CardGroup, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
import Sidebar from "../Sidebar/sidebar";


export default function MyWeek(props){
    const [material, setMaterial] =useState([]);
    const [key, setKey] = useState('');




    const history = useHistory();
    useEffect(() => {
        fetchMaterials();
    },[]);




    function fetchMaterials(){
        api.materialsOfWeek(props.match.params.id).then(response=>{
            setMaterial(response.data)
        }).catch(error=>{
            history.push('/login');
        })
    }

    function renderMaterials(){
        return( material.map(material=> {
                return(
                    <Tab tabClassName='ml-0 mt-2 text-capitalize  text-monospace btn-outline-primary mr-2' eventKey={material.id} title={material.name}>
                <Card key={material.id} className='ml-0 mt-2  align-items-center w-75 mb-5'>
                        <Card.Body className='ml-0 text-wrap'>
                            <Card.Text className=' text-wrap' dangerouslySetInnerHTML={{__html: material.description}}>
                            </Card.Text>
                            <Button className='m-2 w-100' variant="outline-info" href={"/material/show/"+material.id}>
                                Enter {material.name}</Button>

                        </Card.Body>
                    </Card>
                    </Tab>

                );
            })
        );
    }

    function emptyMaterials(){
        return(
            <Spinner delay="5000"/>
        )
    }


    return (
        <div className='ml-5 mt-4 m-2  text-capitalize  w-100'>

            {material.length>0?<>
            <Row>
                <Col xs='auto' md='auto' lg="10" className='ml-0 pl-0'>
                <h1 className='ml-3 m-2'>
                <Badge pill variant="success" className='rounded-0 text-wrap'>
                    welcome to your materials
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
            <Tabs
                id="controlled-tab-example"
                className="w-75 mw-100 justify-content-between"
                activeKey={key}
                onSelect={(k) => setKey(k)}>
                {material.length>0 ? renderMaterials() : emptyMaterials()}
            </Tabs>
        </>:emptyMaterials()}
        </div>
    )
}



