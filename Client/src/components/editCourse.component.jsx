import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class EditCourse extends Component{
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

        axios.get('http://localhost:8000/student_management/Course/'+this.props.match.params.id,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(response=>{
            this.setState({
                course_id: response.data.course_id,
                course_name: response.data.course_name,
                course_duration: response.data.course_duration,
                course_fees: response.data.course_fees, 
                teacher_id:response.data.teacher_id    
            })
           console.log(this.state)
        })
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

        axios.put('http://localhost:8000/student_management/Course/Edit/'+this.props.match.params.id,Course,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(res=>console.log(res.data));

       // window.location='/';
    }
    
    render(){
        return(
          <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
            <h3 className='label header'>Edit Course</h3>
            <form className='form form-group' onSubmit={this.onSubmit}>
                <div className="form-group form ">
                        <label>Course Name: </label>
                         {
                        <input  type="text"
                        required
                        className="form-control"
                        value={this.state.course_name}
                        onChange={this.onChangeCourseName}
                        />}
                </div>
                <div className="form-group">
                    <label>Course Fees:</label>
                    {
                        <input  type="text"
                        required
                        className="form-control"
                        value={this.state.course_fees}
                        onChange={this.onChangeCourseFees}
                        />}
                </div>
                <div className="form-group">
                    <label>Course Duration :</label>
                    <input type='text'
                            required
                            className='form-control'
                            value={this.state.course_duration}
                            onChange={this.onChangeCourseDuration}
                        />
                </div>
                <div className="form-group">
                    <label>Teacher ID :</label>
                    <input type='text'
                            required
                            className='form-control'
                            value={this.state.teacher_id}
                            onChange={this.onChangeCourseTeacher}
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