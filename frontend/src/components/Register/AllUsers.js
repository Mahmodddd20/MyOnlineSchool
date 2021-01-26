import React, {useEffect, useState} from "react";
import api from "../../api";
import {Button, Modal, Table} from "react-bootstrap";
import Spinner2 from "../Loading/Spinner2";
import AdminOnly from "../Protect/adminOnly";


export default function AllUsers() {
    const [users, setUsers] = useState([]);

    const [del, setDel] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    useEffect(() => {
        AdminOnly();
        fetchAllUsers();
    },[]);

    function handleShow (id)
    {
        setShow(true);
        setDel(id);
    }
    function deleteTheUser(id){
        api.deleteTheUser(id).then(response=>{
            fetchAllUsers();
            // window.location.reload();
        })
    }


    function fetchAllUsers () {
        api.detailsAllUsers().then(response => {


            setUsers(response.data)
            renderUsers();


        }).catch(error => {
                     })
    }

    function renderUsers(){
        return( users.map(user=> {
                return(

                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><Button variant='warning' href={'/edituser/'+user.id}>Edit</Button></td>
                                    <td><Button variant='danger' onClick={()=>{{handleShow(user.id)}}}>Delete</Button></td>
                                </tr>




        );
            })
        );
    }
    return (
        <i>{users.length>0?
        <div  className='mt-4 mb-4 h-50 pre-scrollable text-capitalize'>
            <Table striped bordered hover size='md'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
                </thead>
                <tbody >

                {renderUsers ()}
                </tbody>
            </Table>
        </div>:<Spinner2 delay="5000"/>}
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-capitalize'>
                        Are you sure you want to Delete the user.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={()=>{deleteTheUser(del) ;handleClose()}}>Yes Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>

        </i>

    )



}