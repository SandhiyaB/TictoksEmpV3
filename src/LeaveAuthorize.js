//not in use

import React,{Component} from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css



class LeaveAuthorize extends Component{
	constructor() {
        super()
        this.state = {
			 password: '',
			  emailId:'',
        };
    }



    

		componentDidMount() {
			
        }
    Authorize(){

			 $.ajax({
					type: 'POST',
					data:JSON.stringify({
					emailId:this.state.emailId,
					password:this.state.password,
					}),
					url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updatePassword",
					contentType: "application/json",
					dataType: 'json',
                    success: function(data,textStatus,jqXHR)
							  {
                                confirmAlert({
										title: 'Success',                        // Title dialog
									    message: 'Successfully Changed the Password ',               // Message dialog
										confirmLabel: 'Ok',                           // Text button confirm
											                                
								});
						ReactDOM.render(<LoginPage/>, document.getElementById("root"));
	                                
											
					}



	        });
}
         




   

	render(){
		return(

	        <div className="container">
   
                <button type="button" onClick={()=> this.Authorize()} class="btn btn-primary">Authorize</button>
	            <button type="button" onClick={()=> this.NotAuthorize()} class="btn btn-primary">Not Authorize</button>

			</div>
		

		);
	}

}
export default LeaveAuthorize;