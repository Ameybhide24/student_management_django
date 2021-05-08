import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//axios.defaults.xsrfCookieName = 'csrfToken'
//axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export default class CreateCourse extends Component{
    constructor(props){
        super(props);

        this.onChangeCourseName=this.onChangeCourseName.bind(this);
        this.onChangeCourseFees=this.onChangeCourseFees.bind(this);
        this.onChangeCourseDuration=this.onChangeCourseDuration.bind(this);    
        this.onChangeCourseTeacher=this.onChangeCourseTeacher.bind(this);


        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            course_name:'',
            course_fees:'',
            course_duration:'',
            teacher_id:''
        }
    }

    onChangeCourseName(e){
        this.setState({
           course_name:e.target.value
        })
    }
    onChangeCourseFees(e){
        this.setState({
            course_fees:e.target.value
        })
    }
    onChangeCourseDuration(e){
        this.setState({
            course_duration:e.target.value
        })
    }
    onChangeCourseTeacher(e){
        this.setState({
            teacher_id:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const Course={
            course_name:this.state.course_name,
            course_fees:this.state.course_fees,
            course_duration:this.state.course_duration,
            teacher_id:this.state.teacher_id,
        }

        console.log(Course);
        
        //const header={'X-CSRFToken':jsCookie.Cookies.get('csrftoken')}
        axios.post('http://localhost:8000/student_management/Course',Course,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>console.log(res.data));

        this.setState({
            course_name:'',
            course_fees:'',
            course_duration:'',
            teacher_id:''
        });

        //window.location='/';
    }

    
    
    render(){
        return(
          <div>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
              <h3>Create New Course</h3>
              <form onSubmit={this.onSubmit}>
                  <div className='form-group'>

                      <label>Course name:</label>
                      <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeCourseName}
                        />

                      <label>Course Fees:</label>
                      <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeCourseFees}
                        />

                        <label>Course Duration:</label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeCourseDuration}
                        />
                         <label>Teacher ID:</label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeCourseTeacher}
                        />

                  </div>
                  <div className='form-group'>
                      <input type='submit' value='Create Course' className='btn btn-primary' />
                  </div>
              </form>
          </div>  
        );
    }
}