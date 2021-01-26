import React from "react";
import Clock from "./clock";
import {Container} from "react-bootstrap";
import './sidebar.css'
export default function NewClock() {
    return (
        <Container className=' my-clock1'>
            <Clock className="my-clock2"/>
        </Container>

    );
}

