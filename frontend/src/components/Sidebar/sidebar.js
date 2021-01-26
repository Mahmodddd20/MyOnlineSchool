import React, {useEffect, useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as SiIcons from 'react-icons/si';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './sidebar.css';
import { IconContext } from 'react-icons';
import api from "../../api";
import CookieService from "../../CookieService";
import Logged from "../Protect/Logged";






export default function Sidebar() {
    const [sidebar, setSidebar] = useState(true);
    const [classroom, setClassroom] = useState([]);
    const showSidebar = () => setSidebar(!sidebar);
    useEffect(() => {
        Logged();
        fetchClasses();

    },[]);

    function fetchClasses(){
        if(CookieService.get('role')=='admin'){
        api.allClassesAdmin().then(response=>{
            setClassroom(response.data)
        })}else if(CookieService.get('role')=='teacher'){
            api.myClassesTeacher().then(response=>{
                setClassroom(response.data)
            })}else  if (CookieService.get('role')=='student'){
            api.myClassesStudent().then(response=>{
                setClassroom(response.data)

            })}
    }
    function renderClasses(){
        return(classroom.map(classroom => {
                    return (
                        <>
                            {CookieService.get('role')=='student'?
                                <li key={'c'+classroom.id} className=' nav-text'>
                                    <a href={"/weeks/show/"+classroom.classId}>
                                        <FaIcons.FaGraduationCap/>
                                        <span className=' m-1'>{classroom.className}</span>
                                    </a>
                                </li>:
                                <li key={'c'+classroom.id} className='nav-text'>
                                    <a href={"/weeks/show/"+classroom.id}>
                                        <FaIcons.FaGraduationCap/>
                                        <span className=' m-1'>{classroom.name}</span>
                                    </a>
                                </li>}
                        </>
                    );
                })
        )
    }
    return (
        <>
            <IconContext.Provider value={{ color: '#c2c2c2' }}>
                <div className='navbara'>
                    <Link to='#' className='menu-bars1' >
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items ' >
                        <li key={9999991} className='navbar-toggle' style={{width:0,height:0}}>
                            <Link to='#' className='menu-bars2' onClick={showSidebar}>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <a href={item.path}>
                                        {item.icon}
                                        <span className=' m-1'>{item.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                        <li key={99999} className='nav-text'>
                            {CookieService.get('role')!=='admin'?
                                <a href='/dashboard'>
                                <SiIcons.SiGoogleclassroom/>
                                <span className=' m-1'>Classrooms</span>
                            </a>:<a href='/admin'>
                                    <SiIcons.SiGoogleclassroom/>
                                    <span className=' m-1'>Classrooms</span>
                                </a>}
                        </li>
                        <ul key={9999992} className='pre-scrollable h-25'>
                        {CookieService.get('role')!==' '?renderClasses():''}
                        </ul>
                    </ul>

                </nav>

            </IconContext.Provider>

        </>
    );
}


