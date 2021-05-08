import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class EditExercises extends Component{
    constructor(props){
        super(props);

        this.onChangeStudentName=this.onChangeStudentName.bind(this);
        this.onChangeStudentAddress=this.onChangeStudentAddress.bind(this);
        this.onChangeStudentMobile=this.onChangeStudentMobile.bind(this);
        this.onChangeStudentMail=this.onChangeStudentMail.bind(this);
        this.onChangeStudentGender=this.onChangeStudentGender.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            student_name:'',
            student_mail:'',
            student_address:'',
            student_mobile:'',
            student_gender:''

        }
    }
//request.dums.request.data
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

        axios.get('http://localhost:8000/student_management/Edit/'+this.props.match.params.id,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
        .then(response=>{
            this.setState({
                student_name: response.data.student_name,
                student_mail: response.data.student_mail,
                student_address: response.data.student_address,
                student_mobile: response.data.student_mobile,
                student_gender: response.data.student_gender,
                
            })
           console.log(this.state)
        })
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
            student_gender:this.state.student_gender
        }

        console.log(Student);

        axios.post('http://localhost:8000/student_management/Update/'+this.props.match.params.id,Student,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}})
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
                        <label>Student Name: </label>
                         {
                        <input  type="text"
                        required
                        className="form-control"
                        value={this.state.student_name}
                        onChange={this.onChangeStudentMail}
                        />}
                </div>
                <div className="form-group">
                    <label>Student Mail</label>
                    {
                        <input  type="text"
                        required
                        className="form-control"
                        value={this.state.student_mail}
                        onChange={this.onChangeStudentMail}
                        />}
                </div>
                <div className="form-group">
                    <label>Student Address :</label>
                    <input type='text'
                            required
                            className='form-control'
                            value={this.state.student_address}
                            onChange={this.onChangeStudentAddress}
                        />
                </div>
                <div className="form-group">
                    <label>Student Mobile :</label>
                    <input type='text'
                            required
                            className='form-control'
                            value={this.state.student_mobile}
                            onChange={this.onChangeStudentMobile}
                        />
                </div>
                <div className="form-group">
                    <label>Student Gender :</label>
                    <input type='text'
                            required
                            className='form-control'
                            value={this.state.student_gender}
                            onChange={this.onChangeStudentGender}
                        />
                </div>
                
                <div className='form-group'>
                    <input type='submit' value='Edit Student' className='btn btn-primary' />
                </div>
            </form>
          </div>  
        );
    }
}