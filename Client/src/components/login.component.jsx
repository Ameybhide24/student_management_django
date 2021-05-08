import React, { Component } from "react";
import './../styles/auth.styles.css';
import {Link,Switch} from 'react-router-dom';
import Axios from "axios";
import {Redirect} from 'react-router-dom';

export default class Login extends Component {

    constructor(props){
        super(props);


        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            username:'',
            password:'',
        }
    }
    

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const User={
            username:this.state.username,
            password:this.state.password,
        }

        console.log(User);
        
        Axios.post('http://localhost:8000/student_management/login',User)
        .then(res=>{
            if(res.status==200){
                this.props.history.push('/')
            }
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))

        this.setState={
            email:'',
            password1:'',
        }
    }


    render() {
        return (
            <div className='auth-wrapper'>
                <div className='auth-inner'>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={"/"}>Student Management</Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                                </li>
                                </ul>
                                </div>
                            </div>
                    </nav>
                <form onSubmit={this.onSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter Username" onChange={this.onChangeUsername}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.onChangePassword}/>
                    </div>

                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
                </div>
            </div>
        );
    }
}