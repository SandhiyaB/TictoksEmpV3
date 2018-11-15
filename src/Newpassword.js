import React, { Component } from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import ForgotpasswordLog from './ForgotpasswordLog';

class Newpassword extends Component {
	constructor() {
		super()
	var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

		this.state = {
			password: '',
			emailId: '',
			superiorId: superiorId,
			formErrors: { passwordValid: '', },
			passwordValid: false
		};
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value },
			() => { this.validateField(name, value) });
	}
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {
			case 'password':
				passwordValid = value.length >= 5 && value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
				fieldValidationErrors.password = passwordValid ? '' : ' is too short';
				break;

			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			passwordValid: passwordValid,
		}, this.validateForm);
	}

	validateForm() {
		this.setState({ formValid: this.state.passwordValid });
	}

	handleChangepassword(value) {
		this.setState({
			password: value

		});
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		var emailIdProps = this.props.emailId;
		this.setState({
			emailId: emailIdProps
		});
	}
	Passwordverify() {

		var password = document.getElementById("password");
		var confirmpassword = document.getElementById("confirmpassword");
		if (password.value == confirmpassword.value) {
			this.setState({
				password: this.state.password,
				emailId: this.state.emailId,
			});
			$.ajax({
				type: 'POST',
				data: JSON.stringify({
					emailId: this.state.emailId,
					password: this.state.password,
					superiorId: this.state.superiorId,

				}),
				url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updatePassword",
				contentType: "application/json",
				dataType: 'json',


				success: function (data, textStatus, jqXHR) {

					confirmAlert({
						title: 'New Password Updated ',                        // Title dialog
						message: 'You Have Successfully Changed The Password ',               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm


					});

					ReactDOM.render(<LoginPage />, document.getElementById("root"));


				}

			});
		}
		else {

			confirmAlert({
				title: 'New Password Updation Failed',                        // Title dialog
				message: 'Changing New Password Failed Because Passwords Are Not  Same',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			});



			ReactDOM.render(<Newpassword />, document.getElementById("root"));
		}
	}


	BackbtnFunc() {
		ReactDOM.render(<LoginPage />, document.getElementById("root"));
	}

	render() {
		return (

			<div className="container">
	           <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>
	<div className="jumbotron">

					<div className="panel panel-default">
						<FormErrors formErrors={this.state.formErrors} />
					</div>
					<div className={`form-group ${(this.state.formErrors.password)}`} >
						<label className="control-label col-sm-2" htmlFor="password">NewPassword:</label>

						<input type="password" value={this.state.password}
							onChange={this.handleUserInput}
							name="password"
							id="password"
							className="form-control"
							required=""
							placeholder="Enter password" />
					</div>
					<div className="form-group">
						<label htmlFor="confirmpassword">Confirm Password:</label>
						<input type="password"
							id="confirmpassword"
							className="form-control"

							placeholder="Confirm Password " />

					</div>

					<button type="button" onClick={() => this.Passwordverify()} class="btn btn-primary">Reset Password</button>

				</div>
			</div>


		);
	}

}
export default Newpassword;