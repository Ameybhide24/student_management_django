import React,{Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import EnrolledStudents from './enrolledStudents.component';


export default class Courses extends Component{
    constructor(props){
        super(props);
        this.deleteCourse=this.deleteCourse.bind(this);
        this.CourseesList=this.CoursesList.bind(this);
        this.state={
            Courses:[],
            Students:[],
        }
    }


    componentDidMount(){
        axios.get('http://localhost:8000/student_management/Course',{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>{
            console.log(res.data);
            this.setState({
                Courses:res.data
            });
        })  
        .catch(err=>{
            console.log(err);
        })
    }

    deleteCourse(pk){
        //console.log('deleting' + pk)
        axios.delete('http://127.0.0.1:8000/student_management/Course/Delete/'+pk,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>{
            console.log('deleted  successfully');
        });
        this.setState({
            Courses: this.state.Courses.filter(el=>el.pk !== pk)
        })
    }

    CoursesList(){
        console.log(this.state)
        return this.state.Courses.map(currCourse=>{
            return <Course Course={currCourse} deleteCourse={this.deleteCourse} key={currCourse.pk} EnrolledStudents={this.EnrolledStudents}/>;
        });
    }
    

    render(){
        return(
          <div>   
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
              <h3>Courses</h3>
              <table className='table'>
                  <thead className='thead-light table'>
                      <tr>
                          <th>Course ID</th>
                          <th>Course Name</th>
                          <th>Course Fees</th>
                          <th>Course Duration</th>
                          <th> Teacher ID </th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.CoursesList()}
                  </tbody>
              </table>
          </div>  
        );
    }
}

const Course=props=>(
    <tr>
        <td>{props.Course.pk}</td>
        <td>{props.Course.fields.course_name}</td>
        <td>{props.Course.fields.course_fees}</td>
        <td>{props.Course.fields.course_duration}</td>
        <td>{props.Course.fields.teacher_id}</td>
        <td>
            <Link to={'courses/edit/'+props.Course.pk}>Edit</Link> | <a href='' onClick={()=>{props.deleteCourse(props.Course.pk)}}>Delete</a>
        </td>
        <td>
           <Link to={'enrolledStudents/'+ props.Course.pk} >Enrolled Students </Link>
            {/* <button className='btn btn-secondary' onClick={()=>{props.EnrolledStudents(props.Course.pk)}}>Enrolled Students</button> */}
        </td>
        
    </tr>
)