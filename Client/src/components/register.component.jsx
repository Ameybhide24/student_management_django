import React, { Component } from "react";
import './../styles/auth.styles.css';
import {Link,Switch} from 'react-router-dom';
import axios from "axios";

export default class SignUp extends Component {
    constructor(props){
        super(props);
        
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            username:'',
            email:'',
            password:'',
            password2:'',
        }
    }
    
    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    onChangeConfirmPassword(e){
        this.setState({
            password2:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const User={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
        }

        console.log(User);
        // let formData = new FormData();
        // formData.append('username',this.state.username);
        // formData.append('email',this.state.email);
        // formData.append('password1',this.state.password1);
        // formData.append('password2',this.state.password2);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        // axios.post('http://localhost:8000/student_management/register',User,config)
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
        axios({
            method: 'POST',
            url: 'http://localhost:8000/student_management/register',
            data: User,
            //headers:{'content-type': 'multipart/form-data'}
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        
        this.setState={
            username:'',
            email:'',
            password:'',
            password2:'',
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
                        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link> */}
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label> Username</label>
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.onChangeUsername} />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="text" className="form-control" placeholder="Enter Email" onChange={this.onChangeEmail}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.onChangePassword} />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Confirm password" onChange={this.onChangeConfirmPassword} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/login">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}






























// import React,{Component} from 'react';
// import axios from 'axios';
// axios.defaults.xsrfCookieName = 'csrfToken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// export default class Register extends Component{
//     constructor(props){
//         super(props);
        
//         this.state={
//             username:'',
//             email:'',
//             password1:'',
//             password2:''
//         }
//     }

//     onChangeUsername(e){
//         this.setState({
//             username:e.target.value
//         })
//     }

//     onChangeMail(e){
//         this.setState({
//             username:e.target.value
//         })
//     }
//     onChangePassword1(e){
//         this.setState({
//             username:e.target.value
//         })
//     }
//     onChangePassword2(e){
//         this.setState({
//             username:e.target.value
//         })
//     }

//     onSubmit(e){
//         e.preventDefault();
//         e.stopPropagation();
//         e.nativeEvent.stopImmediatePropagation();

//         const User={
//             username: this.state.username,
//             email:this.state.email,
//             password1:this.state.password1,
//             password2:this.state.password2
//         }
//         console.log(User);

//         axios.post('http://localhost:8000/student_management/register',User)
//         .then(res=>console.log(res.data));

//         this.setState({
//             username: '',
//             email:'',
//             password1:'',
//             password2:''
//         });

//         window.location='/login';

//     }


//     render(){
//         return(
//             <div>
//             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
//             <h3>Register</h3>
//             <form onSubmit={this.onSubmit}>
//                 <div className='form-group'>

//                     <label>Username:</label>
//                     <input type='text'
//                       required
//                       className='form-control'
//                       value={this.state.username}
//                       onChange={this.onChangeUsername}
//                       />

//                     <label>Email:</label>
//                     <input type='text'
//                       required
//                       className='form-control'
//                       value={this.state.email}
//                       onChange={this.onChangeMail}
//                       />

//                       <label>Password1:</label>
//                       <input type='text'
//                       required
//                       className='form-control'
//                       value={this.state.password1}
//                       onChange={this.onChangePassword1}
//                       />

//                       <label>Confirm Password:</label>
//                       <input type='text'
//                       required
//                       className='form-control'
//                       value={this.state.password2}
//                       onChange={this.onChangePassword2}
//                       />
//                 </div>
//                 <div className='form-group'>
//                     <input type='submit' value='Create Student' className='btn btn-primary' />
//                 </div>
//             </form>
//         </div>  
//         );
//     }
// }