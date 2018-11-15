import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import EmployeeMenuPage from './EmployeeMenuPage';

class NoAttendanceRequest extends Component{
    BackbtnFunc(){
        ReactDOM.render(
                <Router>
                  <div>           
                         <Route path="/" component={EmployeeMenuHeader}/>
                         <Route path="/" component={EmployeeMenuPage}/>
                         
                                 </div>
                                      </Router>,
                                                document.getElementById('root'));
                                                registerServiceWorker();
                                            }   
  
render(){
        return(
            

            
            <div className="container">
           <h3 className="centerAlign" style={{textAlign:"center",marginBottom:"20%"}}> No Attendance Regularization Request</h3>   
 </div>

    
                
            
        );
    }

}


export default NoAttendanceRequest;
