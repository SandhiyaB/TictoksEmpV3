import React,{Component} from 'react';
import ReactDOM from 'react-dom';


import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader'


class RemoveEmployee extends Component{

	constructor() {
        super()
        this.state = {

            emailId: '',
            password: '',

			formErrors: {emailId: '', password: ''},
			                     emailIdValid: false,
			                     passwordValid: false
			        };
			    }

				handleUserInput = (e) => {
			    const name = e.target.name;
			    const value = e.target.value;
			    this.setState({[name]: value},
			                  () => { this.validateField(name, value) });
			}


			     validateField(fieldName, value) {
			    let fieldValidationErrors = this.state.formErrors;
			    let emailIdValid = this.state.emailIdValid;
			    let passwordValid = this.state.passwordValid;

			    switch(fieldName) {

			      case 'emailId':
			        emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			        fieldValidationErrors.emailId = emailIdValid ? '' : ' is invalid';
			        break;
			      case 'password':
			        passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
			        fieldValidationErrors.password = passwordValid ? '': ' is too short';
			        break;
			      default:
			        break;
			    }
			    this.setState({formErrors: fieldValidationErrors,
			                    emailIdValid: emailIdValid,
			                    passwordValid: passwordValid
								}, this.validateForm);
			  }

			  validateForm() {
			    this.setState({formValid: this.state.emailIdValid && this.state.passwordValid});
			}

			errorClass(error) {
			    return(error.length === 0 ? '' : 'has-error');
			}


render(){
		return(
			

			
	<div class="container">
	<div className="jumbotron">
	<h3>Remove Employee</h3>
  <div className="form-group">
		 <label htmlFor="vendorIdid">Employee ID:</label>
					  <input
						type="text"
						value={this.state.vendorCode}
						maxLength="9"
						onChange={(e) =>this.handleChangeCODE(e.target.value)}
						className="form-control"
						id="vendorIdid"
						placeholder="Enter Employee ID"/>
					</div>
</div>
	</div>
				
			
		);
	}

}


export default RemoveEmployee;
