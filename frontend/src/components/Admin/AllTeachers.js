import React, {useEffect, useState} from "react";
import api from "../../api";
import {Button, Table} from "react-bootstrap";
import Spinner2 from "../Loading/Spinner2";
import AdminOnly from "../Protect/adminOnly";


export default function AllTeachersTable() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        AdminOnly();
        fetchAllTeachers();
    },[]);

    function fetchAllTeachers () {
        api.detailsAllTeachers().then(response => {


            setTeachers(response.data)
            renderTeachers();


        }).catch(error => {
                     })
    }

    function renderTeachers(){
        return( teachers.map(teacher=> {
                return(

                                <tr key={teacher.id}>
                                    <td>{teacher.id}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.role}</td>
                                    <td><Button className='w-100' variant='warning' href={'/edituser/'+teacher.id}>Edit</Button></td>
                                </tr>




        );
            })
        );
    }
    return (
        <i>{teachers.length>0?
            <div  className='mt-4 mb-4 h-50 pre-scrollable text-capitalize w-auto'>
            <Table striped bordered hover size='md'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>


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