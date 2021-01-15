import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './components/Welcome/welcome';
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import Dashboard from './components/Dashboard/dashboard';
import Weeks from './components/ClassRoom/weeks';
import Week from './components/Week/week';
import Material from './components/Material/material';
import Homework from './components/Homework/homework';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import AllHomeworks from "./components/Homework/allhomeworks";
import AllMaterials from "./components/Material/allmaterials";
import Admin from "./components/Admin/admin";
import NewClass from './components/Admin/newclassroom';
import NeWeek from './components/ClassRoom/neweek';
import NewMaterial from './components/Material/newmaterial';
import NewHomework from './components/Homework/newhomework';
import EditWeek from './components/ClassRoom/editweek';
import EditClass from './components/Admin/editclassroom';
import AddStudentToClass from './components/Admin/addstudenttoclass';
import Messaging from "./components/Messaging/messaging";
import GroupMessaging from "./components/Messaging/GroupMessaging";
import AllMessaging from "./components/Messaging/AllMessaging";
import SendEmail from "./components/ClassRoom/sendemail";
import { Container} from "react-bootstrap";
import Chat from './components/Messaging/Chat';
import App from './App'
import Answer from './components/Answer/Answer'
import AllAnswers from './components/Answer/Allanswers'
import Profile from "./components/Profile/Profile";
import EditUser from "./components/Profile/EditUser";
import EditMaterial from './components/Material/editmaterial'
import EditHomework from './components/Homework/edithomework'




ReactDOM.render(
    <Container fluid className='mb-n5 pb-5 m-0 p-0'>
    {/*<Row>*/}
    {/*    <Col>*/}
        <Header/>
    {/*    </Col>*/}
    {/*</Row>*/}
    {/*<Row>*/}
            <BrowserRouter>
                {/*<Col xs='auto' md='auto' lg="10">*/}
                <Route exact path="/app" component={App} />
                <Route exact path="/" component={Welcome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/newclassroom" component={NewClass} />
                <Route exact path="/class/edit/:id" component={EditClass} />
                <Route exact path="/addstudenttoclass/:id" component={AddStudentToClass} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/messaging/:id" component={Messaging} />
                <Route exact path="/groupmessaging/:id" component={GroupMessaging} />
                <Route exact path="/allmessaging" component={AllMessaging} />
                <Route exact path="/sendemail/:id" component={SendEmail} />
                <Route exact path="/weeks/show/:id" component={Weeks} />
                <Route exact path="/neweek/:id" component={NeWeek} />
                <Route exact path="/week/edit/:id" component={EditWeek} />
                <Route exact path="/week/show/:id" component={Week} />
                <Route exact path="/newmaterial/:id" component={NewMaterial} />
                <Route exact path="/editmaterial/:id" component={EditMaterial} />
                <Route exact path="/newhomework/:id" component={NewHomework} />
                <Route exact path="/edithomework/:id" component={EditHomework} />
                <Route exact path="/material/show/:id" component={Material} />
                <Route exact path="/homework/show/:id" component={Homework} />
                <Route exact path="/answer/:id" component={Answer} />
                <Route exact path="/answer/all/:id" component={AllAnswers} />
                <Route exact path="/materials/all/:id" component={AllMaterials} />
                <Route exact path="/homeworks/all/:id" component={AllHomeworks} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/edituser/:id" component={EditUser} />


                {/*</Col>*/}
                {/*<Col xs md lg="1" >*/}
                    {/*<Sidebar/>*/}
                {/*</Col>*/}

            </BrowserRouter>
        {/*<Row>*/}
        <Footer/>
    {/*    </Row>*/}
    {/*</Row>*/}
    </Container>
    ,
    document.getElementById('root')
);