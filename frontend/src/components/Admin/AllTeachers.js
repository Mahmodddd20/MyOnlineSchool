import React, {useEffect, useState} from "react";
import api from "../../api";
import {Button, Table} from "react-bootstrap";
import Spinner from "../Loading/Spinner";
import Spinner2 from "../Loading/Spinner2";


export default function AllTeachersTable() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchAllTeachers();
    },[]);

    function fetchAllTeachers () {
        api.detailsAllTeacher().then(response => {
            console.log('all',response.data)


            setTeachers(response.data)
            renderTeachers();


        }).catch(error => {
            // history.push('/login');
        })
    }

    function renderTeachers(){
        return( teachers.map(teacher=> {
                return(

                                <tr key={teacher.id}>
                                    <th>{teacher.id}</th>
                                    <th>{teacher.name}</th>
                                    <th>{teacher.email}</th>
                                    <th>{teacher.role}</th>
                                    <th><Button variant='warning'>Edit</Button></th>
                                    <th><Button variant='danger'>Delete</Button></th>
                                </tr>




        );
            })
        );
    }
    return (
        <i>{teachers.length>0?
            <div  className='mt-4 mb-4 h-50 pre-scrollable text-capitalize w-auto'>
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
                <tbody className='text-truncate'>

                {renderTeachers ()}
                </tbody>
            </Table>

        </div>:<Spinner2 delay="5000"/>}
        </i>

    )



}