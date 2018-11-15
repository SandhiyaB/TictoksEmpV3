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
import DeviceMenuPage from './DeviceMenuPage';

class AdminLoginPage extends Component {

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
        this.setState({
            emailId: this.state.emailId,
            password: this.state.password,


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

            contentType: "application/json",
            dataType: 'json',
            async: false,
            crossDomain: true,

            success: function (data, textStatus, jqXHR) {
                if (data.employeeId == "PASSWORD_INCORRECT") {
					confirmAlert({
						title: 'Login Failed',                        // Title dialog
						message: 'Password You Have Entered Is Incorrect . Kindly  Enter Correct Password',               // Message dialog
						confirmLabel: 'Ok',
						                        // Text button confirm
                    })
                    
                }else if (data.companyId == "001") {
                    var permission = data.employeePermisionlist;
                   
                    var flag = 1;//false
                    var i = permission.length;
                    $.each(permission, function (i, item) {
            
                        if (item.permission == "supervisorAuthority") {
                            flag = 0;//true
                            
                        }
                    });
            
                    if (flag == 0) {
                        
                        localStorage.setItem('TempEmployeeId', CryptoJS.AES.encrypt(data.employeeId, "shinchanbaby"));
				
                        ReactDOM.render(
                            <Router>
                                <div>
                                    <Route path="/" component={EmployeeMenuHeader} />
                                    <Route path="/" component={DeviceMenuPage} />
                                 
                                    <Route path="/" component={FooterText} />
                                </div>
                            </Router>,
                            document.getElementById('root'));
                        registerServiceWorker();
                        
                }else {
                   // console.log("el1");
                    confirmAlert({
                        title: 'Access Deined',                        // Title dialog
                        message: 'You are not Allowed to Access this Page',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
            
                    })
                }
            }else {
                 confirmAlert({
                    title: 'Access Deined',                        // Title dialog
                    message: 'You are not Allowed to Access this Page',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
        
                })
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

   

    render() {
        return (

            <div className="loginpage responsive" id="loginpagebg"
                style={{ position: "absolute" }}>
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

                                <div id="loginSubmitButton1" style={{"paddingTop": "20%"}}>
                                    <button type="button" id="loginSubmitButton" disabled={!this.state.formValid} style={{ backgroundColor: "rgb(226, 39, 45)" }} onClick={() => this.login()} className="btn btn-md" >Login</button>
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


export default AdminLoginPage;

