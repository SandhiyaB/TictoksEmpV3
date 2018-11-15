import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LoginPage from './LoginPage';
import CryptoJS from 'crypto-js';
import SiteRegister from './SiteRegister';


class OTPSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            orgName: '',
            emailId: '',
            mobileNo: '',
            password: '',
            firstName: '',
            lastName: '',
            companyType:'',
        };
    }


    handleChangeotp(value) {
        this.setState({
            otp: value
        });

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    BackbtnFunc() {
        ReactDOM.render(<SiteRegister />, document.getElementById("root"));
    }

    OTPverify() {

        var OTP = CryptoJS.AES.decrypt(localStorage.getItem('OTP'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        if (this.state.otp == OTP) {

            var siteName = CryptoJS.AES.decrypt(localStorage.getItem('SiteName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var emailId = CryptoJS.AES.decrypt(localStorage.getItem('EmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var mobileNo = CryptoJS.AES.decrypt(localStorage.getItem('MobileNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var address = CryptoJS.AES.decrypt(localStorage.getItem('Address'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var city = CryptoJS.AES.decrypt(localStorage.getItem('City'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var state = CryptoJS.AES.decrypt(localStorage.getItem('State'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var country = CryptoJS.AES.decrypt(localStorage.getItem('Country'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var pinCode = CryptoJS.AES.decrypt(localStorage.getItem('PinCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var firstName = CryptoJS.AES.decrypt(localStorage.getItem('FirstName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var lastName = CryptoJS.AES.decrypt(localStorage.getItem('LastName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var planName = CryptoJS.AES.decrypt(localStorage.getItem('planName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var permission = CryptoJS.AES.decrypt(localStorage.getItem('permission'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                this.state.siteName = siteName;
                this.state.password = password;
                this.state.emailId = emailId;
                this.state.mobileNo = mobileNo;
                this.state.address = address,
                this.state.city = city,
                this.state.country = country,
                this.state.pinCode = pinCode,
                this.state.state = state,
                this.state.firstName = firstName,
                this.state.lastName = lastName,
                this.state.companyType = companyType,
                this.state.planName=planName,
                this.state.permission = permission,


                this.setState({
                    siteName: this.state.siteName,
                    password: this.state.password,
                    emailId: this.state.emailId,
                    mobileNo: this.state.mobileNo,
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    pinCode: this.state.pinCode,
                    state: this.state.state,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    companyType: this.state.companyType,
                    planName:this.state.planName,
                    permission:this.state.permission,

                })


            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    siteName: this.state.siteName,
                    password: this.state.password,
                    emailId: this.state.emailId,
                    mobileNo: this.state.mobileNo,
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    pinCode: this.state.pinCode,
                    state: this.state.state,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    companyType: this.state.companyType,
                    planName:this.state.planName,
                    permission:this.state.permission,
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/SitRegistration/InsertSite",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    confirmAlert({
                        title: 'Registration Successful',                        // Title dialog
                        message: 'Registered Your Organization Successfully',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });
                    localStorage.clear();
               
                    ReactDOM.render(<LoginPage />, document.getElementById("root"));

                  },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                },
            });


        } else {

            confirmAlert({
                title: "OTP Error",                        // Title dialog
                message: "OTP You Have Entered Is Wrong Kindly Re-Enter The Correct OTP",               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm


            });
        }

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
                <div className="jumbotron ">
                    <div className="form-group">
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" id="OTP" value={this.state.otp} onChange={(e) => this.handleChangeotp(e.target.value)} className="form-control" placeholder="Enter OTP" />
                    </div>
                    <br />
                    <button type="button" onClick={() => this.OTPverify()} class="btn btn-primary">Submit</button>

                </div>
            </div>
        );
    }

}
export default OTPSignUp;