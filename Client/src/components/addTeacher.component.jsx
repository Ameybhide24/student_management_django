import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//axios.defaults.xsrfCookieName = 'csrfToken'
//axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export default class CreateTeacher extends Component{
    constructor(props){
        super(props);

        this.onChangeTeacherName=this.onChangeTeacherName.bind(this);
        this.onChangeTeacherCourse=this.onChangeTeacherCourse.bind(this);
        this.onChangeTeacherEducation=this.onChangeTeacherEducation.bind(this);


        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            teacher_name:'',
            teacher_course: '',
            teacher_education:''
        }
    }

    onChangeTeacherName(e){
        this.setState({
            teacher_name:e.target.value
        })
    }
    onChangeTeacherCourse(e){
        this.setState({
            teacher_course:e.target.value
        })
    }
    onChangeTeacherEducation(e){
        this.setState({
            teacher_education:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const Teacher={
            teacher_name:this.state.teacher_name,
            teacher_course:this.state.teacher_course,
            teacher_education:this.state.teacher_education,
        }

        console.log(Teacher);
        
        //const header={'X-CSRFToken':jsCookie.Cookies.get('csrftoken')}
        axios.post('http://localhost:8000/student_management/Teacher/Create',Teacher,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>console.log(res.data));

        this.setState({
            teacher_name:'',
            teacher_course: '',
            teacher_education:''
        });

        //window.location='/';
    }

    
    
    render(){
        return(
          <div>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
              <h3>Create New Teacher</h3>
              <form onSubmit={this.onSubmit}>
                  <div className='form-group'>

                      <label>Teacher name:</label>
                      <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeTeacherName}
                        />

                      <label>Teacher Course:</label>
                      <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeTeacherCourse}
                        />

                        <label>Teacher Education:</label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeTeacherEducation}
                        />

                  </div>
                  <div className='form-group'>
                      <input type='submit' value='Create Teacher' className='btn btn-primary' />
                  </div>
              </form>
          </div>  
        );
    }
}