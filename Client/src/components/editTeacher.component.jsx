import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class EditTeacher extends Component{
    constructor(props){
        super(props);

        this.onChangeTeacherName=this.onChangeTeacherName.bind(this);
        this.onChangeTeacherCourse=this.onChangeTeacherCourse.bind(this);
        this.onChangeTeacherEducation=this.onChangeTeacherEducation.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            teacher_id:'',
            teacher_name:'',
            teacher_course: '',
            teacher_education:''

        }
    }

    componentDidMount(){
        // axios.get('http://localhost:8000/Student_management/Update'+this.props.match.params.id)
        // .then(response=>{
        //     this.setState({
        //         student_name:response.data.student_name,
        //         student_mail:response.data.student_mail,
        //         student_address:response.data.student_address,
        //         student_mobile:response.data.student_mobile,
        //         student_gender:response.data.student_gender,
        //     })
        // })
        // .catch(err=>console.log(err))

        axios.get('http://localhost:8000/student_management/Teacher/'+this.props.match.params.id,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(response=>{
            this.setState({
                teacher_id: response.data.teacher_id,
                teacher_name: response.data.teacher_name,
                teacher_course: response.data.teacher_course,
                teacher_education: response.data.teacher_education,        
            })
           console.log(this.state)
        })
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

        axios.put('http://localhost:8000/student_management/Teacher/'+this.props.match.params.id,Teacher,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>console.log(res.data));

       // window.location='/';
    }
    
    render(){
        return(
          <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
            <h3 className='label header'>Edit Student</h3>
            <form className='form form-group' onSubmit={this.onSubmit}>
                <div className="form-group form ">
                        <label>Teacher Name: </label>
                         {
                        <input  type="text"
                        required
                        className="form-control"
                        value={this.state.teacher_name}
                        onChange={this.onChangeTeacherName}
                        />}
                </div>
                <div className="form-group">
                    <label>Teacher Course</label>
                    {
                        <input  type="text"
                        required
                        className="form-control"
                        value={this.state.teacher_course}
                        onChange={this.onChangeTeacherCourse}
                        />}
                </div>
                <div className="form-group">
                    <label>Teacher Education :</label>
                    <input type='text'
                            required
                            className='form-control'
                            value={this.state.teacher_education}
                            onChange={this.onChangeTeacherEducation}
                        />
                </div>
                
                <div className='form-group'>
                    <input type='submit' value='Edit Teacher' className='btn btn-primary' />
                </div>
            </form>
          </div>  
        );
    }
}