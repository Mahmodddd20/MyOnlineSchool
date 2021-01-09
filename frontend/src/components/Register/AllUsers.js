import React, {useEffect, useState} from "react";
import api from "../../api";
import {Button, Table} from "react-bootstrap";


export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    },[]);

    function fetchAllUsers () {
        api.detailsAllUsers().then(response => {
            console.log('all',response.data)


            setUsers(response.data)
            renderUsers();


        }).catch(error => {
            // history.push('/login');
        })
    }

    function renderUsers(){
        return( users.map(user=> {
                return(

                                <tr key={user.id}>
                                    <th>{user.id}</th>
                                    <th>{user.name}</th>
                                    <th>{user.email}</th>
                                    <th>{user.role}</th>
                                    <th><Button variant='warning'>Edit</Button></th>
                                    <th><Button variant='danger'>Delete</Button></th>
                                </tr>




        );
            })
        );
    }
    return (
        <div  className='mt-4 mb-4 h-50 pre-scrollable text-capitalize'>
            <Table striped bordered hover>
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
        </div>

    )



}