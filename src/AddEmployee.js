import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu';
import FooterText from './FooterText';
import { CaptureFinger, PrepareScanner, VerifyFinger, getFalseRes, PostMFS100Client, quality, timeout } from './Mantra.js';
class AddEmployee extends Component {

    constructor() {
        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var mangId;
        var staff;
        var staffName;
        var staffRole;
        if(companyType=="Office"){
            companyType="Employee";
            mangId="Reporting Manager ID";
            staff= "Employee";
            staffName="Reporting Manager Name.. ";
            staffRole="Reporting Manager Role.. "
        }
        else{
            companyType="Student/Staff";
            mangId="Reporting Staff ID";
            staff= "Staff";
            staffName="Reporting Staff Name.. ";
            staffRole="Reporting Staff Role.. "


        }
        this.state = {
            companyType:companyType,
            mangId:mangId,
            staff:staff,
            staffName:staffName,
            staffRole:staffRole,
            firstName: '',
            lastName: '',
            proofType: '',
            proofNo: '',
            dob: '',
            emailId: '',
            mobileNo: '',
            address: '',
            employeeType: '',
            role: '',
            department: '',
            companyId: '',
            reportingManagerId: '',
            reportingManagerRole: '',
            superiorId: superiorId,
            biometric: biometric,
            formErrors: {
                firstName: '',
                lastName: '',
                proofType: '',
                proofNo: '',
                dob: '',
                emailId: '',
                mobileNo: '',
                address: '',
                employeeType: '',
                role: '',
                department: '',
            },

            firstNameValid: false,
            lastNameValid: false,
            proofTypeValid: false,
            proofNoValid: false,
            dobValid: false,
            emailIdValid: false,
            mobileNoValid: false,
            addressValid: false,
            employeeTypeValid: false,
            roleValid: false,
            departmentValid: false,
        };

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    handleReportingManager = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ reportingManagerId: value },
            () => { this.validateField(name, value) });

        this.state.reportingManagerId = value;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.reportingManagerId,
                companyId: this.state.companyId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/ReportingManagerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                self.state.reportingManagerName = data.employeeName;
                self.state.reportingManagerRole = data.role;
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
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let proofNoValid = this.state.proofNoValid;
        let emailIdValid = this.state.emailIdValid;
        let mobileNoValid = this.state.mobileNoValid;
        let addressValid = this.state.addressValid;

        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.firstName = firstNameValid ? '' : ' is InCorrect';
                break;
            case 'lastName':
                lastNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.lastName = lastNameValid ? '' : ' is InCorrect';
                break;
            case 'proofNo':
                proofNoValid = value.length >= 5;
                fieldValidationErrors.proofNo = proofNoValid ? '' : ' is InValid';
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
                addressValid = value.length >= 5;
                fieldValidationErrors.address = addressValid ? '' : ' is too short';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            proofNoValid: proofNoValid,
            emailIdValid: emailIdValid,
            mobileNoValid: mobileNoValid,
            addressValid: addressValid

        }, this.validateForm);
    }

    validateForm() {

        this.setState({
            formValid:
                this.state.proofType
                && this.state.employeeType
                && this.state.firstName
                && this.state.role
                && this.state.department
                && this.state.lastNameValid
                && this.state.proofNoValid
                && this.state.emailIdValid
                && this.state.mobileNoValid
                && this.state.addressValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }


    AddEmployeeFunc() {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
if(this.state.address.trim().length>10){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                proofType: this.state.proofType,
                proofNo: this.state.proofNo,
                dob: this.state.dob,
                emailId: this.state.emailId,
                mobileNo: this.state.mobileNo,
                address: this.state.address,
                employeeType: this.state.employeeType,
                role: this.state.role,
                department: this.state.department,
                companyId: this.state.companyId,
                reportingManagerId: this.state.reportingManagerId,
                reportingManagerRole: this.state.reportingManagerRole,
                superiorId: this.state.superiorId,
                fingerPrint: this.state.fingerPrint,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addemployee",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.employeeId == "EMAIL") {
                    confirmAlert({
                        title: 'Cant Add Employee',                        // Title dialog
                        message: 'The Email Id '+data.emailId + ' Already Exits',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                } else if (data.employeeId == "MOBILE") {
                    confirmAlert({
                        title: 'Cant Add Employee',                        // Title dialog
                        message: 'The Mobile Number '+data.mobileNo  + ' Already Exits',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });


                } else {

                    var emp = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                    emp.push({ employeeId: data.employeeId });
												localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(emp), "shinchanbaby"));



                                                confirmAlert({
                                                    title: 'Success',                        // Title dialog
                                                    message: 'Successfully Added Employee And The Employee Id is ' + data.employeeId,               // Message dialog
                                                    confirmLabel: 'Ok',                           // Text button confirm
                            
                            
                                                });
                            
                    self.state.firstName = "";
                    self.state.lastName = "";
                    self.state.proofType = "";
                    self.state.proofNo = "";
                    self.state.dob = "";
                    self.state.emailId = "";
                    self.state.mobileNo = "";
                    self.state.address = "";
                    self.state.role = "";
                    self.state.department = "";
                    self.state.companyId = "";
                    self.state.employeeType = "";
                    self.state.reportingManagerId = '';
                    self.state.reportingManagerName = '';
                    self.state.reportingManagerRole = '';

                    $('[name=proofType]').val('');
                    $('[name=role]').val('');
                    $('[name=department]').val('');
                    $('[name=reportingManagerId]').val('');
                    $('[name=employeeType]').val('');
                    self.setState({

                        firstName: '',
                        lastName: '',
                        proofType: '',
                        proofNo: '',
                        dob: '',
                        emailId: '',
                        mobileNo: '',
                        address: '',
                        employeeType: '',
                        role: '',
                        department: '',
                        companyId: '',
                        reportingManagerId: '',
                        reportingManagerRole: '',
                        reportingManagerName: '',
                        fingerPrint: ''
                    });
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={EmployeeMenuHeader} />

                                <Route path="/" component={EmployeeAddRemUpdMenu} />
                                <Route path="/" component={AddEmployee} />
                                <Route path="/" component={FooterText} />


                            </div>
                        </Router>, document.getElementById('root'));
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
    }else{
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Address Should Contain Atleast 10 Character',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
  
    }
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        var dept;
        dept += '<option value="" disabled selected hidden>Select a department</option>';
        $.each(department, function (i, item) {

            dept += '<option value="' + item.department + '">' + item.department + '</option>'

        });
        $("#department").append(dept);

        var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        var role;
        role += '<option value="" disabled selected hidden >Select a role</option>';
        $.each(Role, function (i, item) {

            role += '<option value="' + item.role + '">' + item.role + '</option>'

        });
        $("#role").append(role);

        var emp = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ReportingManagerList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

        var employeeId = '';
      


        employeeId += '<option value="" disabled selected hidden >Select a '+this.state.staff+' Id</option>';
        $.each(emp, function (i, item) {

            employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'
           
        });
        $("#reportingManagerId").append(employeeId);


        var bio = document.getElementById("biocapture");


        if (this.state.biometric == '1') {
            bio.style.display = "block";

        }
        else {

            bio.style.display = "none";
        }

    }

    Capture() {
        try {
            var res = CaptureFinger(quality, timeout);
            if (res.httpStaus) {

                if (res.data.ErrorCode == "0") {

                    document.getElementById('imgFinger').src = "data:image/bmp;base64," + res.data.BitmapData;
                    this.state.fingerPrint = res.data.IsoTemplate;
                    this.setState({
                        fingerPrint: res.data.IsoTemplate,
                    })
                } else {

                    confirmAlert({
                        title: 'DEVICE ERROR', // Title dialog
                        message: 'Check your biometric device ',// Message dialog
                        confirmLabel: 'ok', // Text button confirm


                    })
                }
            }
            else {
                confirmAlert({
                    title: 'DEVICE ERROR', // Title dialog
                    message: 'Check your biometric device ',// Message dialog
                    confirmLabel: 'ok', // Text button confirm


                })
            }
        }
        catch (e) {
            confirmAlert({
                title: 'DEVICE ERROR', // Title dialog
                message: 'Check your biometric device ',// Message dialog
                confirmLabel: 'ok', // Text button confirm


            })
        }
        return false;
    }



    render() {
        return (

            <div class="container" style={{ marginBottom: "30%" }}>

                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <form >

                    <label for="firstName">
                        First Name*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
                        <input type="text"
                            onChange={this.handleUserInput}
                            id="firstName"
                            name="firstName"
                            placeholder="Your name.."
                            value={this.state.firstName}
                            required />
                    </div>

                    <label for="lastName">
                        Last Name*
		    		</label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}>

                        <input type="text"
                            onChange={this.handleUserInput}
                            id="lastName"
                            name="lastName"
                            placeholder="Your last name.."
                            value={this.state.lastName}
                            required />
                    </div>

                    <label for="proofType">
                        {this.state.companyType} Proof*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.proofType)}`}>
                        <select name="proofType"
                            id="proofType"
                            onChange={this.handleUserInput}
                            required>
                            <option value="" disabled selected hidden>Select your particular proof</option>
                            <option value="VoterID">VoterID</option>
                            <option value="License">LicenceNo</option>
                            <option value="PanCard">PancardNo</option>
                            <option value="Aadhar">AadharNo</option>
                            <option value="Passport">PassportNo</option>
                            <option value="RationCard">RationCardNo</option>
                        </select>
                        <input type="text"
                            onChange={this.handleUserInput}
                            id="proofNo"
                            name="proofNo"
                            placeholder="Your Proof No.."
                            value={this.state.proofNo}
                            required />


                    </div>

                    <label for="dob">
                        DOB*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.dob)}`}>
                        <input type="date"
                            onChange={this.handleUserInput}
                            id="dob"
                            name="dob"
                            placeholder="Your DOB.."
                            value={this.state.dob}
                            required />
                        <br />

                    </div>

                    <label for="emailId">
                        Email ID*
    		</label><div className={`form-group ${this.errorClass(this.state.formErrors.emailId)}`}>

                        <input type="email"
                            onChange={this.handleUserInput}
                            id="emailId"
                            name="emailId"
                            maxlength="50"
                            value={this.state.emailId}
                            placeholder="Your EmailID.." required />

                    </div>

                    <label for="mobileNo">
                        Mobile No*
    		</label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.mobileNo)}`}>

                        <input type="number"
                            onChange={this.handleUserInput}
                            id="mobileNo"
                            name="mobileNo"
                            maxlength="10"
                            value={this.state.mobileNo}
                            placeholder="Your Mobile No.."
                            required />
                    </div>
                    <label for="address">
                        Address*
    		</label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                        <textarea id="address"
                            onChange={this.handleUserInput}
                            name="address"
                            maxlength="250"
                            placeholder="Your address.."
                            value={this.state.address}
                            required style={{ height: '200px' }}> </textarea>
                    </div>
                    <label for="employeeType">
                        {this.state.companyType} Type*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.employeeType)}`}>
                        <select name="employeeType"
                            id="employeeType"
                            onChange={this.handleUserInput}
                            required>
                            <option value="" disabled selected hidden>Select your Type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <label for="role">
                        Role*
   			</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.role)}`}>
                        <select
                            name="role"
                            id="role"
                            value={this.state.role}
                            onChange={this.handleUserInput}
                            required>
                        </select>
                    </div>

                    <label for="department">
                        Department*
   			</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.department)}`}>
                        <select
                            name="department"
                            id="department"
                            onChange={this.handleUserInput}
                            value={this.state.department}
                            required>

                        </select>
                    </div>
                    <label for="department">
                       {this.state.mangId}*
   			</label>
                    <div >


                        <select
                            name="reportingManagerId"
                            id="reportingManagerId"
                            value={this.state.reportingManagerId}
                            onChange={this.handleReportingManager}
                            required>

                        </select>
                        <input type="text"
                            value={this.state.reportingManagerName}
                            id="reportingManagerName"
                            name="reportingManagerName"
                            maxlength="50"
                            readOnly
                            value={this.state.reportingManagerName}
                            placeholder={this.state.staffName} required />

                        <input type="text"
                            value={this.state.reportingManagerRole}
                            id="reportingManagerRole"
                            name="reportingManagerRole"
                            maxlength="50"
                            readOnly
                            value={this.state.reportingManagerRole}
                            placeholder={this.state.staffRole} required />

                    </div>
                    <div id="biocapture" >
                        <input type="button" id="btnCapture" value="Capture" class="btn btn-primary btn-100" onClick={() => this.Capture()} />



                        <td width="150px" height="190px" align="center" class="img">
                            <img id="imgFinger" width="145px" height="188px" alt="Finger Image" />
                        </td>
                    </div>
                    <button type="button" disabled={!this.state.formValid} onClick={() => this.AddEmployeeFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Add</button>
                </form>



            </div>



        );
    }

}


export default AddEmployee;
