import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';



export default class Teachers extends Component{
    constructor(props){
        super(props);
        this.deleteTeacher=this.deleteTeacher.bind(this);
        this.TeachersList=this.TeachersList.bind(this);
        this.state={Teachers:[]}
    }


    componentDidMount(){
        axios.get('http://localhost:8000/student_management/Teacher',{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>{
            console.log(res.data);
            this.setState({
                Teachers:res.data
            });
        })  
        .catch(err=>{
            console.log(err);
        })
    }

    deleteTeacher(pk){
        //console.log('deleting' + pk)
        axios.delete('http://127.0.0.1:8000/student_management/Teacher/'+pk,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>{
            console.log('deleted  successfully');
        });
        this.setState({
            Teachers: this.state.Teachers.filter(el=>el.pk !== pk)
        })
    }

    TeachersList(){
        console.log(this.state)
        return this.state.Teachers.map(currTeacher=>{
            return <Teacher Teacher={currTeacher} deleteTeacher={this.deleteTeacher} key={currTeacher.pk}/>;
        });
    }

    render(){
        return(
          <div>
               
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
              <h3>Teachers</h3>
              <table className='table'>
                  <thead className='thead-light table'>
                      <tr>
                          <th>Teacher ID</th>
                          <th>Teacher Name</th>
                          <th>Teacher Course</th>
                          <th>Teacher Education</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.TeachersList()}
                  </tbody>
              </table>
          </div>  
        );
    }
}

const Teacher=props=>(
    <tr>
        <td>{props.Teacher.pk}</td>
        <td>{props.Teacher.fields.teacher_name}</td>
        <td>{props.Teacher.fields.teacher_course}</td>
        <td>{props.Teacher.fields.teacher_education}</td>
        <td>
            <Link to={'teachers/edit/'+props.Teacher.pk}>Edit</Link> | <a href='' onClick={()=>{props.deleteTeacher(props.Teacher.pk)}}>Delete</a>
        </td>
        
    </tr>
)