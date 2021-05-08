import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';



export default class Students extends Component{
    constructor(props){
        super(props);
        this.deleteStudent=this.deleteStudent.bind(this);
        this.StudentsList=this.StudentsList.bind(this);

        this.state={Students:[]}
        

    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/student_management/enroll/'+this.props.match.params.id)
        .then(res=>{
            console.log(res.data)      
                this.setState({
                    Students:res.data,
                });
                console.log(this.state);        
        })
        .catch(err=>{
            console.log(err)
        });  
       
    }

    deleteStudent(pk){
        //console.log('deleting' + pk)
        axios.post('http://localhost:8000/student_management/Delete/'+pk,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        // .then(res=>{
        //     console.log('deleted  successfully');
        // });
        this.setState({
            Students: this.state.Students.filter(el=>el.pk !== pk)
        })
    }

    StudentsList(){
        console.log(this.state)
        return this.state.Students.map(currStudent=>{
            return <Student Student={currStudent} deleteStudent={this.deleteStudent} key={currStudent.pk}/>;
        });
    }

    render(){
        return(
          <div>            
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
              <h3>Student Enrolled in this Course </h3>
              <table className='table'>
                  <thead className='thead-light table'>
                      <tr>
                          <th>Student ID</th>
                          <th>Student Name</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Mobile no.</th>
                          <th>Gender</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.StudentsList()}
                  </tbody>
              </table>
          </div>  
        );
    }
}

const Student=props=>(
    <tr>
        <td>{props.Student.student_id}</td>
        <td>{props.Student.student_id__student_name}</td>
        <td>{props.Student.student_id__student_mail}</td>
        <td>{props.Student.student_id__student_address}</td>
        <td>{props.Student.student_id__student_mobile}</td>
        <td>{props.Student.student_id__student_gender}</td>
        <td>
            <Link to={'Edit/'+props.Student.pk}>Edit</Link> | <a href='' onClick={()=>{props.deleteStudent(props.Student.pk)}}>Delete</a>
        </td>
        
    </tr>
)