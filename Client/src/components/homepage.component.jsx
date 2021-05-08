import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import studentsList from './studentsList.components';
export default class HomePage extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link  to='/' className="navbar-brand">Student Management</Link>
                <div className="collapse navbar-collapse">
                <h1>CRUD Operation</h1>
                <h2>Django</h2>
                </div>
                <table>
                 <studentsList/>
                </table>
            </nav>
        );
    }
}