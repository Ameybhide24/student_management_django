import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//axios.defaults.xsrfCookieName = 'csrfToken'
//axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export default class CreateUsers extends Component{
    constructor(props){
        super(props);

        this.onChangeStudentName=this.onChangeStudentName.bind(this);
        this.onChangeStudentMail=this.onChangeStudentMail.bind(this);
        this.onChangeStudentAddress=this.onChangeStudentAddress.bind(this);
        this.onChangeStudentMobile=this.onChangeStudentMobile.bind(this);
        this.onChangeStudentGender=this.onChangeStudentGender.bind(this);


        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            student_name:'',
            student_mail: '',
            student_address: '',
            student_mobile:'',
            student_gender:''
        }
    }

    onChangeStudentName(e){
        this.setState({
            student_name:e.target.value
        })
    }
    onChangeStudentMail(e){
        this.setState({
            student_mail:e.target.value
        })
    }
    onChangeStudentAddress(e){
        this.setState({
            student_address:e.target.value
        })
    }
    onChangeStudentMobile(e){
        this.setState({
            student_mobile:e.target.value
        })
    }
    onChangeStudentGender(e){
        this.setState({
            student_gender:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const Student={
            student_name:this.state.student_name,
            student_mail:this.state.student_mail,
            student_address:this.state.student_address,
            student_mobile:this.state.student_mobile,
            student_gender:this.state.student_gender,
        }

        console.log(Student);
        
        //const header={'X-CSRFToken':jsCookie.Cookies.get('csrftoken')}
        axios.post('http://localhost:8000/student_management/Create',Student,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>console.log(res.data));

        this.setState({
            student_name:'',
            student_mail:'',
            student_address:'',
            student_mobile:'',
            student_gender:'',
        });

        //window.location='/';
    }

    
    
    render(){
        return(
          <div>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
              <h3>Create New Student</h3>
              <form onSubmit={this.onSubmit}>
                  <div className='form-group'>

                      <label>Student name:</label>
                      <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeStudentName}
                        />

                      <label>Student mail:</label>
                      <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeStudentMail}
                        />

                        <label>Student address:</label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeStudentAddress}
                        />

                        <label>Student mobile:</label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeStudentMobile}
                        />

                        <label>Student gender:</label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeStudentGender}
                        />
                  </div>
                  <div className='form-group'>
                      <input type='submit' value='Create Student' className='btn btn-primary' />
                  </div>
              </form>
          </div>  
        );
    }
}