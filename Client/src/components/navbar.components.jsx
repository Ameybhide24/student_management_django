import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{



    render(){
        return(
            <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link  to='/' className="navbar-brand">Student Management</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Students</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/courses" className="nav-link">Courses</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/teachers" className="nav-link">Teachers</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/Create" className="nav-link">Add Student</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/teachers/add" className="nav-link">Add Course</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/courses/add" className="nav-link">Add Teacher</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={"/"}>Student Management</Link>
           
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <li className="nav-item ml-auto">
                            <Link to="/Create" className="nav-link">Add Student</Link>
                        </li>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Logout</Link>
                </li>
               
                {/* <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li> 
                </ul>
            </div>
            </div>
        </nav> */}
        </div>
        );
    }
}