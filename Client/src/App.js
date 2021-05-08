import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Link,Switch} from 'react-router-dom';
import Navbar from './components/navbar.components';
import studentsList from './components/studentsList.components';
import editStudent from './components/editStudent.component';
import teachersList from './components/getTeachers.component';
import addTeacher from './components/addTeacher.component';
import editTeacher from './components/editTeacher.component';
import getCourses from './components/getCourses.component';
import addCourse from './components/addCourse.component';
import editCourse from './components/editCourse.component';
import enrollledStudents from './components/enrolledStudents.component';
import HomePage from './components/homepage.component';
import addStudent from './components/addStudent.component';
import Register from './components/register.component';
import Login from './components/login.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Switch>
        <Route path='/register' exact component={Register}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/' exact component={studentsList}/>
        <Route path='/Edit/:id' exact component={editStudent}/>
        <Route path='/Create' exact component={addStudent}/>
        <Route path='/teachers' exact component={teachersList}/>
        <Route path='/teachers/Edit/:id' exact component={editTeacher}/>
        <Route path='/teachers/add' exact component={addTeacher}/>
        <Route path='/courses' exact component={getCourses}/>
        <Route path='/courses/add' exact component={addCourse}/>
        <Route path='/courses/Edit/:id' exact component={editCourse}/>
        <Route path='/enrolledStudents/:id' exact component={enrollledStudents}/>
        </Switch>
       
        {/* <Route path='/user' component={CreateUser}/> */}
      </div>   
    </Router>
  );
}

export default App;
