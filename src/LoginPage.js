import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LoginPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import AttendanceDisplay from './AttendanceDisplay';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import ReportMenuPage from './ReportMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ForgotPassword from './ForgotPassword';
import 'bootstrap/dist/css/bootstrap.css';
import t4 from './image/lbg1.png';
import tictockwbg1 from './image/tictokn1.png';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import SiteRegister from './SiteRegister';
import FooterText from './FooterText';

class LoginPage extends Component {

	constructor() {
		super()
		this.state = {

			emailId: '',
			password: '',
			date: '',
			formErrors: { emailId: '', password: '' },
			emailIdValid: false,
			passwordValid: false
		};
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value },
			() => { this.validateField(name, value) });
	}



	login() {
		var today = new Date();
		today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state.date = today;

		this.setState({
			emailId: this.state.emailId,
			password: this.state.password,
			mobileNo: this.state.mobileNo,
			date: today,
		});
		var key = "shinchanbaby";

		localStorage.setItem('EmailId', CryptoJS.AES.encrypt(this.state.emailId, key));
		localStorage.setItem('Password', CryptoJS.AES.encrypt(this.state.password, key));

		var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				emailId: this.state.emailId,
				password: this.state.password,

			}),
			//ACTUAL URL
		url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeeLogin",
			//url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeLogin",
			
			contentType: "application/json",
			dataType: 'json',
			async: false,
			crossDomain: true,

			success: function (data, textStatus, jqXHR) {
console.log("data",data);
window.scrollTo(0, 0);
				if (data.employeeId == "NOT_REGISTERED") {
					confirmAlert({
						title: 'Login Failed',                        // Title dialog
						message: 'You Haven’t Registered Yet . Please Register',               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm
						
					})

				//	ReactDOM.render(<LoginPage />, document.getElementById("root"));
				ReactDOM.render(
					<Router>
						<div>

							<Route path="/" component={LoginPage} />
							<Route path="/" component={FooterText} />

							</div>
						</Router>, document.getElementById('root'));
					registerServiceWorker();



				} else if (data.employeeId == "PASSWORD_INCORRECT") {
					confirmAlert({
						title: 'Login Failed',                        // Title dialog
						message: 'Password You Have Entered Is Incorrect . Kindly  Enter Correct Password',               // Message dialog
						confirmLabel: 'Ok',
						                        // Text button confirm
					})


				//	ReactDOM.render(<LoginPage />, document.getElementById("root"));
				ReactDOM.render(
					<Router>
						<div>

							<Route path="/" component={LoginPage} />
							</div>
						</Router>, document.getElementById('root'));
					registerServiceWorker();


				} else if (data.employeeId == "LOCKED") {

					confirmAlert({
						title: 'Login Failed',                        // Title dialog
						message: 'You Cannot Login . Your ID Has Been Locked',               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm
					
					})

					//ReactDOM.render(<LoginPage />, document.getElementById("root"));

					ReactDOM.render(
						<Router>
							<div>
	
								<Route path="/" component={LoginPage} />
								</div>
							</Router>, document.getElementById('root'));
						registerServiceWorker();
	
				} else if (data.employeeId == "BLOCKED") {
					confirmAlert({
						title: 'Login Failed',                        // Title dialog
						message: 'You Cannot Login . Your ID Has Been Blocked  . Kindly Contact Administration',               // Message dialog
						confirmLabel: 'Ok', 
						                         // Text button confirm
					})


					//ReactDOM.render(<LoginPage />, document.getElementById("root"));

					ReactDOM.render(
						<Router>
							<div>
	
								<Route path="/" component={LoginPage} />
								</div>
							</Router>, document.getElementById('root'));
						registerServiceWorker();
	
				} else {
					if(navigator.onLine){
          
						if (navigator.geolocation) {
						  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
					  } else{
						alert("Geolocation is Not supported by this Browser");
					  }
					}
					//Get the latitude and the longitude;
					function successFunction(position) {
						var lat = position.coords.latitude;
						var lng = position.coords.longitude;
						//console.log("succ",position)
						codeLatLng(lat, lng)
					}
					
					function errorFunction(){
						alert("Geocoder failed");
					}
					
					  function codeLatLng(lat, lng) {
					
						$.ajax({
						type: "GET",
						url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng +"&sensor=true",
						success: function(data) {
					//	  console.log("full",data,"status",data.status)
					localStorage.setItem('Location', '-');
						  if(data.status=="OK"){ 
							//console.log("full address",data.results[0].formatted_address);
							//console.log("main Address",data.results[0].address_components[1].long_name,",",data.results[0].address_components[2].long_name);
							
							var loca=data.results[0].address_components[1].long_name +","+ data.results[0].address_components[2].long_name;
						localStorage.setItem('Location', loca);
						  }
						}
					});
					  }
					var key = "shinchanbaby";
				//	console.log("permission"+JSON.stringify(data))
					localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));
				
					localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(data.employeeDepartmentlist), key));
					localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
					localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
					localStorage.setItem('Role', CryptoJS.AES.encrypt(data.role, key));
					localStorage.setItem('EmployeeId', CryptoJS.AES.encrypt(data.employeeId, key));
					localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
					localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(data.lockList), key));

					localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
					localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
					localStorage.setItem('EmployeeName', CryptoJS.AES.encrypt(data.employeeName, key));

					localStorage.setItem('Department', CryptoJS.AES.encrypt(data.Department, key));
					localStorage.setItem('ReportingManagerList', CryptoJS.AES.encrypt(JSON.stringify(data.reportingManagerList), key));
					localStorage.setItem('BiometricValue', CryptoJS.AES.encrypt(data.biometricValue.toString(), key));
					localStorage.setItem('ShiftMode', CryptoJS.AES.encrypt(data.shiftMode.toString(), key));
					localStorage.setItem('CompanyType', CryptoJS.AES.encrypt(data.companyType, key));
					localStorage.setItem('SMS', CryptoJS.AES.encrypt(data.sms.toString(), key));
					localStorage.setItem('PlanName', CryptoJS.AES.encrypt(data.planName, key));

				
					ReactDOM.render(
						<Router>
							<div >

								<Route path="/" component={EmployeeMenuHeader} />
								<Route exact path="/" component={EmployeeMenuPage} />
								<Route exact path="/Attendence" component={Attendence} />
								<Route exact path="/Charts" component={Charts} />
								<Route exact path="/AttendanceDisplay" component={AttendanceDisplay} />

								<Route exact path="/Maintenance" component={Maintenance} />
								<Route exact path="/AddEmployee" component={AddEmployee} />
								<Route exact path="/RemoveEmployee" component={RemoveEmployee} />
								<Route exact path="/SearchEmployee" component={SearchEmployee} />
								<Route exact path="/UpdateEmployee" component={UpdateEmployee} />
								<Route exact path="/EmployeeAttendanceRequest*" component={EmployeeRequestAcceptReject} />
								<Route exact path="/EmployeeLeaveRequest*" component={EmployeeRequestAcceptReject} />
								<Route path="/" component={FooterText} />


							</div>
						</Router>, document.getElementById('root'));
					registerServiceWorker();
				}
			},


			error: function (data) {

				confirmAlert({
					title: 'No Internet',                        // Title dialog
					message: 'Network Connection Problem',               // Message dialog
					confirmLabel: 'Ok',                           // Text button confirm
				  });
		  

			},
		});

	}

	
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailIdValid = this.state.emailIdValid;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {

			case 'emailId':
				emailIdValid = value.length >= 10;
				{ /*  emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);*/ }
				fieldValidationErrors.emailId = emailIdValid ? '' : ' is invalid';
				break;
			case 'password':
				passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
				fieldValidationErrors.password = passwordValid ? '' : ' is too short';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			emailIdValid: emailIdValid,
			passwordValid: passwordValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({ formValid: this.state.emailIdValid && this.state.passwordValid });
	}

	errorClass(error) {
		return (error.length === 0 ? '' : 'has-error');
	}
	Fpassword() {
		ReactDOM.render(< ForgotPassword />, document.getElementById('root'));

	}

	componentDidMount() {

		var uri = window.location.toString();
		if (uri.indexOf("?") > 0) {
			var clean_uri = uri.substring(0, uri.indexOf("?"));
			window.history.replaceState({}, document.title, clean_uri);
		}


	}
	SignUpFunc() {


		ReactDOM.render(< SiteRegister />, document.getElementById('root'));

	}


	render() {
		return (

			<div className="loginpage responsive" id="loginpagebg"
				style={{position: "absolute"}}>
				<div className="login-container"
				/* style={{boxShadow: "10px 10px 5px grey"}} */>
					<div className="container" id="logbg" >
						<div class="imgcontainer" id="imgtic">
							<img src={tictockwbg1} alt="Avatar" class="avatar" id="imgcont" />
						</div>
						<div className="containerlogin" id="loginpage">

							<div className="form-signin-heading text-muted" id="loginname">
								<h2>LogIn</h2>
							</div>


							<form className="form-signin">


								<input type="text" value={this.state.emailId} onChange={this.handleUserInput}
									name="emailId" id="emailId" className="form-control" required="" autoFocus="" placeholder="email-ID / Mobile No" />

								<input type="password" value={this.state.password} onChange={this.handleUserInput} name="password" id="password" className="form-control" required="" placeholder="Password" />

								<div className="checkbox">
									<button type="button" id="forgetpwdID" onClick={() => this.Fpassword()} className="btn btn-link">Forgot Password ?</button>
									<button type="button" id="forgetpwdID" onClick={() => this.SignUpFunc()} className="btn btn-link" >Sign Up</button>

								</div>
								<div id="loginSubmitButton1">
								<button type="submit" id="loginSubmitButton" disabled={!this.state.formValid} style={{ backgroundColor: "rgb(226, 39, 45)" }} onClick={() => this.login()} className="btn btn-md" >Login</button>
								</div>
							</form>

							{/* <button type="submit" style={{ backgroundColor: "rgb(252, 0, 35)" }} onClick={() => this.SignUpFunc()} className="btn btn-lg btn-primary btn-block" >Sign Up</button>
 */}
						</div>
					</div>
					
				</div>

			</div>

		);
	}

}


export default LoginPage;

