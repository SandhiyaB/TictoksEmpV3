
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import './App.css';
import LoginPage from './LoginPage';
import OTPSignUp from './OTPSignUp';

class SiteRegister extends Component {


    constructor(props) {
        super(props)
        this.state = {

            location: '',
            emailId: '',
            mobileNo: '',
            address: '',
            city: '',
            state: '',
            country: '',
            pinCode: '',
            companyId: '',
            siteNo: '',
            site: 1,
            siteName: '',
            firstName: '',
            lastName: '',
          planName:'',
          permission:'',

            formErrors: {
                siteName: '',
                emailId: '',
                mobileNo: '',
                address: '',

            },

            siteNameValid: false,
            emailIdValid: false,
            mobileNoValid: false,
            addressValid: false,


        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });

    }

    handleUserPackageInput = (e) => {
        
        const name = e.target.name;
        const value = e.target.value;
        if(value=="attendance,chart,maintenance,report")
        {
            this.setState({planName:"Basic"});
        }
        else if(value=="attendance,chart,maintenance,report,attendanceRegulation,taskMapping")
        {
            this.setState({planName:"Premium"});
        }
        else        
         {
            this.setState({planName:"Elite"});
        }
      
        this.setState({ permission: value });

    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let siteNameValid = this.state.siteNameValid;
        let emailIdValid = this.state.emailIdValid;
        let mobileNoValid = this.state.mobileNoValid;
        let addressValid = this.state.addressValid;


        switch (fieldName) {
            case 'siteName':
                siteNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.siteName = siteNameValid ? '' : ' is InCorrect';
                break;

            case 'emailId':
                emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.emailId = emailIdValid ? '' : ' is InCorrect';
                break;

            case 'mobileNo':
                mobileNoValid = value.length <= 10;
                fieldValidationErrors.mobileNo = mobileNoValid ? '' : ' is InCorrect';
                break;

            case 'address':
                addressValid = value.length >= 10;
                fieldValidationErrors.address = addressValid ? '' : ' is too short';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            siteNameValid: siteNameValid,
            emailIdValid: emailIdValid,
            mobileNoValid: mobileNoValid,
            addressValid: addressValid,

        }, this.validateForm);
    }

    validateForm() {

        this.setState({
            formValid:

                this.state.siteName
                && this.state.emailIdValid
                && this.state.mobileNoValid
                && this.state.addressValid

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }



    SiteRegcistrationFun() {

        var key = "shinchanbaby";

        localStorage.setItem('SiteName', CryptoJS.AES.encrypt(this.state.siteName, key));
        localStorage.setItem('EmailId', CryptoJS.AES.encrypt(this.state.emailId, key));
        localStorage.setItem('MobileNo', CryptoJS.AES.encrypt(this.state.mobileNo, key));
        localStorage.setItem('Password', CryptoJS.AES.encrypt(this.state.password, key));
        localStorage.setItem('Address', CryptoJS.AES.encrypt(this.state.address, key));
        localStorage.setItem('City', CryptoJS.AES.encrypt(this.state.city, key));
        localStorage.setItem('State', CryptoJS.AES.encrypt(this.state.state, key));
        localStorage.setItem('Country', CryptoJS.AES.encrypt(this.state.country, key));
        localStorage.setItem('PinCode', CryptoJS.AES.encrypt(this.state.pinCode, key));
        localStorage.setItem('FirstName', CryptoJS.AES.encrypt(this.state.firstName, key));
        localStorage.setItem('planName', CryptoJS.AES.encrypt(this.state.planName, key));
        localStorage.setItem('permission', CryptoJS.AES.encrypt(this.state.permission, key));
        localStorage.setItem('LastName', CryptoJS.AES.encrypt(this.state.lastName, key));
        localStorage.setItem('CompanyType', CryptoJS.AES.encrypt(this.state.companyType, key));
        

        alert(this.state.siteName);
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                siteName: this.state.siteName,
                emailId: this.state.emailId,
                password: this.state.password,
                mobileNo: this.state.mobileNo,


            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/SitRegistration/RegisterSite",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.employeeId == "EMAILID") {

                    confirmAlert({
                        title: 'Registration Failed',                        // Title dialog
                        message: "The Email Id You Have Entered Is Already Registered For An Organization ",               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });


                    ReactDOM.render(<LoginPage />, document.getElementById("root"));

                } else if (data.employeeId == "MOBILE") {

                    confirmAlert({
                        title: "Registration Failed",                        // Title dialog
                        message: "The Mobile No You Have Entered Is Already Registered For An Organization",               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });


                    ReactDOM.render(<LoginPage />, document.getElementById("root"));

                } else if (data.response != "Mailed_Otp") {

                    confirmAlert({
                        title: "Registration Failed",                        // Title dialog
                        message: "Error Occured While Mailing OTP , Kindly Try Registering Again ",               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });

                    ReactDOM.render(<LoginPage />, document.getElementById("root"));

                } else {

                    confirmAlert({
                        title: "Registration On Process",                        // Title dialog
                        message: "Mailed OTP To Your Registered EmailId",               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });

                    //localStorage.setItem('otp1',data.otp);
                    localStorage.setItem('OTP', CryptoJS.AES.encrypt(JSON.stringify(data.otp), key));
                    ReactDOM.render(<OTPSignUp />, document.getElementById("root"));
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
    cancelFunc() {
       
        ReactDOM.render(<LoginPage />, document.getElementById("root"));
    }


    render() {
        return (

            <div class="container" style={{ backgroundColor: "#f2f2f200", color: "black" }}>
                <div className="panel panel-default" style={{ borderColor: " #f10f0f", textTransform: "capitalize", color: "black" }}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>


                <fieldset form="form1">
                    <legend style={{ color: "black", textAlign: "center" }}>Administrative Centre of an Organization Details </legend>


                    <label for="firstName">
                        First Name
        </label>
                    <div id="textcolor">
                        <input type="text"
                            onChange={this.handleUserInput}
                            value={this.state.firstName}
                            id="firstName"
                            name="firstName"
                            placeholder="Your name.."
                            required />
                    </div>

                    <label for="lastName">
                        Last Name
            </label>
                    <div id="
                    ">
                        <input type="text"
                            onChange={this.handleUserInput}
                            value={this.state.lastName}
                            id="lastName"
                            name="lastName"
                            placeholder="Your last name.."
                            required />
                    </div>

                    <label for="organizationType">
                        Organization Type :
            </label>

                    <div>
                        <select name="organizationType"
                            id="organizationType"
                            onChange={this.handleUserInput}
                            required>
                            <option value="" disabled selected hidden>Select your Type</option>
                            <option value="Educational">Educational Institution</option>
                            <option value="Office">Office/Business Area</option>

                        </select>
                    </div>

                    <label for="location">
                        Site Name*
            </label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.siteName)}`}>
                        <input type="text"

                            value={this.state.siteName}
                            style={{ textTransform: "capitalize", color: "black" }}
                            onChange={this.handleUserInput}
                            id="siteName"
                            name="siteName"
                            placeholder="Your Location..(eg.company name location)"
                            required />
                    </div>


                    <label for="emailId">
                        Email ID*
            </label><div className={`form-group ${this.errorClass(this.state.formErrors.emailId)}`}>

                        <input type="email"
                            value={this.state.emailId}
                            style={{ color: "black" }}
                            onChange={this.handleUserInput}
                            id="emailId"
                            name="emailId"
                            maxlength="50"
                            placeholder="Your EmailID.." required />

                    </div>

                    <label for="mobileNo">
                        Mobile No*
            </label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.mobileNo)}`}>

                        <input type="number"
                            style={{ color: "black" }}
                            value={this.state.mobileNo}

                            onChange={this.handleUserInput}
                            id="mobileNo"
                            name="mobileNo"
                            maxlength="10"

                            placeholder="Your Mobile No.."
                            required />
                    </div>
                    <fieldset style={{ border: 'none', marginLeft: "-10px" }} form="form1">
                        <legend style={{ color: "black" }} >Address:</legend>


                        <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`} style={{ color: "black" }}>
                            <input type="text"
                                value={this.state.address}

                                onChange={this.handleUserInput}
                                id="address"
                                name="address"
                                placeholder="House no, Street Name.."
                                required />
                        </div>



                        <input
                            style={{ color: "black" }}
                            type="text"
                            value={this.state.city}

                            onChange={this.handleUserInput}
                            id="city"
                            name="city"
                            placeholder="city"
                            required />

                        <input
                            style={{ color: "black" }}
                            type="text"
                            value={this.state.statename}

                            onChange={this.handleUserInput}
                            id="statename"
                            name="statename"
                            placeholder="state.."
                            required />




                        <input style={{ color: "black" }}
                            type="text"
                            value={this.state.country}

                            onChange={this.handleUserInput}
                            id="country"
                            name="country"
                            placeholder="country.."
                            required />

                        <input
                            style={{ color: "black" }} type="number"
                            value={this.state.zipcode}

                            onChange={this.handleUserInput}
                            id="pinCode"
                            name="pinCode"
                            placeholder="zipcode.."
                            required />

                    </fieldset >

                      <label for="organizationType">
                        Plan Type :
            </label>

                    <div>
                        <select name="packagetype"
                            id="packagetype"
                            onChange={this.handleUserPackageInput}
                            required>
                            <option value="" disabled selected hidden>Select your Plan</option>
                            <option value="attendance,chart,maintenance,report">Basic</option>
                            <option value="attendance,chart,maintenance,report,attendanceRegulation,taskMapping">Premium</option>
                            <option value="attendance,chart,maintenance,report,attendanceRegulation,taskMapping,supervisorAuthority,avoidAttendanceTracking">Elite</option>

                        </select>
                    </div>
                    <div class="btn-group" style={{ textAlign: "center" }}>
                        <button type="button" disabled={!this.state.formValid} onClick={() => this.SiteRegcistrationFun()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "inline-block" }}>Submit</button>
                        <button type="button" onClick={() => this.cancelFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "inline-block" }}>Cancel</button>
                    </div>
                </fieldset>

            </div>

        );
    }

}


export default SiteRegister;

