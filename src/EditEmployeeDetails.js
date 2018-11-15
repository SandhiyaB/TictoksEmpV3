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
import UpdateEmployee from './UpdateEmployee';
import FooterText from './FooterText';
import { CaptureFinger, PrepareScanner, VerifyFinger, getFalseRes, PostMFS100Client, quality, timeout } from './Mantra.js';
class EditEmployeeDetails extends Component {
  constructor(props) {
    super(props)
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var mangId;
    var staff;
    var staffName;
    var staffRole;
    if (companyType == "Office") {
      companyType = "Employee";
      mangId = "Reporting Manager ID";
      staff = "Employee";
      staffName = "Reporting Manager Name.. ";
      staffRole = "Reporting Manager Role.. "
    }
    else {
      companyType = "Student/Staff";
      mangId = "Reporting Staff ID";
      staff = "Staff";
      staffName = "Reporting Staff Name.. ";
      staffRole = "Reporting Staff Role.. "


    }
    this.state = {
      companyType: companyType,
      mangId: mangId,
      staff: staff,
      staffName: staffName,
      staffRole: staffRole,

      valid: false,

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
      employeeId: '',
      companyId: '',
      biometric: biometric,
      fingerPrint: '',
      reportingManagerId: '',
      reportingManagerName: '',
      reportingManagerRole: '',
      superiorId: superiorId,


      oldfirstName: '',
      oldlastName: '',
      oldproofType: '',
      oldproofNo: '',
      olddob: '',
      oldemailId: '',
      oldmobileNo: '',
      oldaddress: '',
      oldemployeeType: '',
      oldrole: '',
      olddepartment: '',
      oldemployeeId: '',
      oldcompanyId: '',
      oldreportingManagerId: '',
      oldreportingManagerName: '',
      oldreportingManagerRole: '',

    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
      valid: true,
    },
      () => { this.validateField(name, value) });
  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailIdValid = this.state.emailIdValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {

      case 'emailId1':
        emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
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


  SaveBtn() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
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
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,

        fingerPrint: this.state.fingerPrint,
        reportingManagerId: this.state.reportingManagerId,
        reportingManagerName: this.state.reportingManagerName,
        reportingManagerRole: this.state.reportingManagerRole,
        superiorId: this.state.superiorId,

      }),

      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updateemployee",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'Update Success',                        // Title dialog
          message: 'The Employee Id' + data.employeeId + ' Is Updated  Suceessfully ',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        })

        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={Maintenance} />
              <Route path="/" component={FooterText} />

            </div>
          </Router>, document.getElementById('root'));


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

  Nextbefaft() {
    $("#summary").empty();
    var tab = '<thead ><tr class="headcolor" color:"black"> <th>Description</th><th>Before</th><th>After</th></tr></thead>';
    $("#summary").append(tab);
    var summary;

    if (this.state.firstName != this.state.oldfirstName) {
      summary += '<tr class="success" id="tabletextcol"> <td>FirstName :</td> <td>' + this.state.oldfirstName + '</td> <td>' + this.state.firstName + '</td> </tr>';

    }

    if (this.state.lastName != this.state.oldlastName) {
      summary += '<tr class="success" id="tabletextcol"> <td>LastName :</td> <td>' + this.state.oldlastName + '</td> <td>' + this.state.lastName + '</td> </tr>';


    }

    if (this.state.proofType != this.state.oldproofType) {
      summary += '<tr class="success" id="tabletextcol"> <td>proofType :</td> <td>' + this.state.oldproofType + '</td> <td>' + this.state.proofType + '</td> </tr>';


    }

    if (this.state.proofNo != this.state.oldproofNo) {
      summary += '<tr class="success" id="tabletextcol"> <td>proofNo :</td> <td>' + this.state.oldproofNo + '</td> <td>' + this.state.proofNo + '</td> </tr>';


    }

    if (this.state.dob != this.state.olddob) {
      summary += '<tr class="success" id="tabletextcol"> <td>DOB :</td> <td>' + this.state.olddob + '</td> <td>' + this.state.dob + '</td> </tr>';

    }
    if (this.state.emailId != this.state.oldemailId) {
      summary += '<tr class="success" id="tabletextcol"> <td>emailId :</td> <td>' + this.state.oldemailId + '</td> <td>' + this.state.emailId + '</td> </tr>';


    }
    if (this.state.mobileNo != this.state.oldmobileNo) {
      summary += '<tr class="success" id="tabletextcol"> <td>mobileNo :</td> <td>' + this.state.oldmobileNo + '</td> <td>' + this.state.mobileNo + '</td> </tr>';


    }
    if (this.state.address != this.state.oldaddress) {
      summary += '<tr class="success" id="tabletextcol"> <td>Address :</td> <td>' + this.state.oldaddress + '</td> <td>' + this.state.address + '</td> </tr>';


    }
    if (this.state.employeeType != this.state.oldemployeeType) {
      summary += '<tr class="success" id="tabletextcol"> <td>Employee Type :</td> <td>' + this.state.oldemployeeType + '</td> <td>' + this.state.employeeType + '</td> </tr>';


    }
    if (this.state.role != this.state.oldrole) {
      summary += '<tr class="success" id="tabletextcol"> <td>Role :</td> <td>' + this.state.oldrole + '</td> <td>' + this.state.role + '</td> </tr>';


    }
    if (this.state.department != this.state.olddepartment) {
      summary += '<tr class="success" id="tabletextcol"> <td>Department :</td> <td>' + this.state.olddepartment + '</td> <td>' + this.state.department + '</td> </tr>';

    }
    if (this.state.reportingManagerId != this.state.oldreportingManagerId) {
      summary += '<tr class="success" id="tabletextcol"> <td>Reporting Manager Id:</td> <td>' + this.state.oldreportingManagerId + '</td> <td>' + this.state.reportingManagerId + '</td> </tr>';

    }
    if (this.state.reportingManagerName != this.state.oldreportingManagerName) {
      summary += '<tr class="success" id="tabletextcol"> <td>Reporting Manager Name:</td> <td>' + this.state.oldreportingManagerName + '</td> <td>' + this.state.reportingManagerName + '</td> </tr>';

    }
    if (this.state.reportingManagerRole != this.state.oldreportingManagerRole) {
      summary += '<tr class="success" id="tabletextcol"> <td>Reporting Manager Role:</td> <td>' + this.state.oldreportingManagerRole + '</td> <td>' + this.state.reportingManagerRole + '</td> </tr>';

    }
    $("#summary").append(summary);


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
    /*alert(JSON.stringify(this.state);*/
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
        //   console.log(data);
        self.state.reportingManagerName = data.employeeName;
        self.state.reportingManagerRole = data.role;
        self.state.valid = true;
      },
      error: function (data) {
                     /*console.log('#####################error:################################'+data);
                     */ confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      },
    });
  }




  componentDidMount() {



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
    /*console.log(emp);
    */
    var employeeId = '';
    // console.log("report", emp);



    employeeId += '<option value="" disabled selected hidden >Select a ' + this.state.staff + ' Id</option>';
    $.each(emp, function (i, item) {

      employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'
      //  console.log(employeeId);
    });
    $("#reportingManagerId").append(employeeId);



    this.state.fingerPrint = this.props.data.fingerPrint;
    this.setState(
      {
        firstName: this.props.data.firstName,
        lastName: this.props.data.lastName,
        dob: this.props.data.dob,
        department: this.props.data.department,
        emailId: this.props.data.emailId,
        employeeType: this.props.data.employeeType,
        mobileNo: this.props.data.mobileNo,
        proofNo: this.props.data.proofNo,
        role: this.props.data.role,
        address: this.props.data.address,
        employeeId: this.props.data.employeeId,
        proofType: this.props.data.proofType,
        fingerPrint: this.props.data.fingerPrint,
        reportingManagerId: this.props.data.reportingManagerId,
        reportingManagerName: this.props.data.reportingManagerName,
        reportingManagerRole: this.props.data.reportingManagerRole,
        //old

        oldfirstName: this.props.data.firstName,
        oldlastName: this.props.data.lastName,
        olddob: this.props.data.dob,
        olddepartment: this.props.data.department,
        oldemailId: this.props.data.emailId,
        oldemployeeType: this.props.data.employeeType,
        oldmobileNo: this.props.data.mobileNo,
        oldproofNo: this.props.data.proofNo,
        oldrole: this.props.data.role,
        oldaddress: this.props.data.address,
        oldemployeeId: this.props.data.employeeId,
        oldproofType: this.props.data.proofType,
        oldreportingManagerId: this.props.data.reportingManagerId,
        oldreportingManagerName: this.props.data.reportingManagerName,
        oldreportingManagerRole: this.props.data.reportingManagerRole,

      });
    //display finger
    document.getElementById('imgFinger').src = "data:image/bmp;base64," + this.state.fingerPrint;

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function (e) {


      modal.style.display = "block";
      e.preventDefault();

    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      ReactDOM.render(
        <Router >
          <div>
            <Route path="/" component={EmployeeMenuHeader} />

            <Route path="/" component={EmployeeAddRemUpdMenu} />

            <Route path="/" component={UpdateEmployee} />
            <Route path="/" component={FooterText} />


          </div>
        </Router>, document.getElementById('root'));


      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={EmployeeAddRemUpdMenu} />

              <Route path="/" component={UpdateEmployee} />
              <Route path="/" component={FooterText} />


            </div>
          </Router>, document.getElementById('root'));
      }
    }

    var bio = document.getElementById("biocapture");
    // var biometric =1;  

    if (this.state.biometric == '1') {
      bio.style.display = "block";
    }
    else {
      bio.style.display = "none";
    }
    window.scrollTo(0, 0);

  }


  //Capturing and Storing The Finger Print

  Capture() {
    try {
      var res = CaptureFinger(quality, timeout);
      if (res.httpStaus) {

        if (res.data.ErrorCode == "0") {

          document.getElementById('imgFinger').src = "data:image/bmp;base64," + res.data.BitmapData;
          //this.store(res.data.IsoTemplate);
          // alert("res" + res.data.IsoTemplate);

          this.state.fingerPrint = res.data.IsoTemplate;
          //this.store(res.data.IsoTemplate);
          // alert("st" + this.state.fingerPrint);
          this.setState({
            fingerPrint: this.state.fingerPrint,
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
  //Storing Finger Print (need this to add in add employee)
  /*  store(iso) {
     var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
     this.state.companyId = companyId;
     this.setState({
       companyId: companyId,
     });
 
     $.ajax({
       type: "POST",
       async: false,
       crossDomain: true,
       url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/fingerprint/store",
       data: JSON.stringify({
         employeeId: this.state.employeeId,
         companyId: this.state.companyId,
         fingerPrint: iso
       }),
       dataType: 'json',
       contentType: "application/json; charset=utf-8",
       processData: false,
       success: function (data) {
 
       },
       error: function (jqXHR, ajaxOptions, thrownError) {
 
         confirmAlert({
           title: 'Server Error',                        // Title dialog
           message: 'Server Error Try Again Later',               // Message dialog
           confirmLabel: 'Ok',                           // Text button confirm
         });
       },
     });
 
 
   }
  */

  render() {
    return (

      <div class="container"
        style={{
          marginBottom: "30%",
          color: "#192b3b",
          backgroundColor: "#f2f2f2"
        }}>
        <div style={{ display: "inline-block" }}>
          <label for="firstName">
            <h2>{this.state.companyType} Id :</h2>
          </label>
          <div id="textcolor">
            <input type="text"
              onChange={this.handleUserInput}
              value={this.state.employeeId}
              id="employeeId"
              disabled
              name="employeeId"
              required />

          </div>
        </div>

        <form >

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
            <span id="errFN"></span>
          </div>

          <label for="lastName">
            Last Name
            </label>
          <div id="textcolor">
            <input type="text"
              onChange={this.handleUserInput}
              value={this.state.lastName}
              id="lastName"
              name="lastName"
              placeholder="Your last name.."
              required />
          </div>

          <label for="proofType">
            {this.state.companyType} Proof
                                    </label>
          <div id="textcolor">
            <select name="proofType"
              id="proofType"
              onChange={this.handleUserInput}
              value={this.state.proofType}
              required>
              <option value="" disabled selected hidden>Select your particular proof</option>
              <option value="VoterID">VoterID</option>
              <option value="License">LicenceNo</option>
              <option value="PanCard">PancardNo</option>
              <option value="Aadhar">AadharNo</option>
              <option value="Passport">PassportNo</option>
              <option value="RationCard">RationCardNo</option>
            </select>
          </div>
          <div id="textcolor">
            <input type="text"
              onChange={this.handleUserInput}
              value={this.state.proofNo}
              id="proofNo"
              name="proofNo"
              placeholder="Your Proof No.."
              required />
          </div>

          <label for="dob">
            DOB
        </label>

          <div id="textcolor">
            <input type="date"
              onChange={this.handleUserInput}
              value={this.state.dob}
              id="dob"
              name="dob"
              placeholder="Your DOB.."
              required />
            <br />
          </div>

          <label for="emailId">
            Email ID
        </label>

          <div id="textcolor">
            <input type="email"
              onChange={this.handleUserInput}
              value={this.state.emailId}
              id="emailId"
              name="emailId"
              maxlength="50"
              placeholder="Your EmailID.." required />
          </div>


          <label for="mobileNo">
            Mobile No
              </label>

          <div id="textcolor">
            <input type="number"
              onChange={this.handleUserInput}
              value={this.state.mobileNo}
              id="mobileNo"
              name="mobileNo"
              maxlength="10"
              pattern="^[0]?[789]\d{9}"
              placeholder="Your Mobile No.." required />
          </div>
          <label for="address">
            Address
        </label>
          <div id="textcolor">
            <textarea id="address"
              onChange={this.handleUserInput}
              value={this.state.address}
              name="address"
              maxlength="250"
              placeholder="Your address.." required style={{ height: '200px' }}> </textarea>
          </div>

          <label for="employeeType">
            {this.state.companyType} Type
        </label>
          <div id="textcolor">
            <select name="employeeType"
              id="employeeType"
              onChange={this.handleUserInput}
              value={this.state.employeeType}
              required>
              <option value="" disabled selected hidden>Select your Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <label for="role">
            Role
                  </label>
          <div id="textcolor">
            <select name="role"
              id="role"
              onChange={this.handleUserInput}
              value={this.state.role}
              required>

            </select>
          </div>

          <label for="department">
            Department
        </label>

          <div id="textcolor">
            <select name="department"
              id="department"
              onChange={this.handleUserInput}
              value={this.state.department}
              required>

            </select>
          </div>

          <label for="reportingManagerId">
            {this.state.mangId}*
   			</label>

          <select
            name="reportingManagerId"
            id="reportingManagerId"
            style={{ color: "black" }}
            onChange={this.handleReportingManager}
            value={this.state.reportingManagerId}
            required>

          </select>
          <input type="text"
            style={{ color: "black" }}
            value={this.state.reportingManagerName}
            id="reportingManagerName"
            name="reportingManagerName"
            maxlength="50"
            readOnly
            placeholder={this.state.staffName} required />
          <input type="text"
            style={{ color: "black" }}
            value={this.state.reportingManagerRole}
            id="reportingManagerRole"
            name="reportingManagerRole"
            maxlength="50"
            readOnly
            placeholder={this.state.staffRole} required />

          <div id="biocapture" >
            <input id="btnCapture" value="Capture" class="btn btn-primary btn-100" onClick={() => this.Capture()} />
            <td width="150px" height="190px" align="center" class="img">
              <img id="imgFinger" width="145px" height="188px" alt="Finger Image" />
            </td>
          </div>
          <button id="myBtn" disabled={!this.state.valid} className="btn btn-primary" onClick={() => this.Nextbefaft()}>Next</button>
          <div id="hide">
            <div id="myModal" class="modal">


              <div class="modal-content">
                <div class="modal-header" style={{ color: "white" }}>
                  <span class="close" style={{ fontSize: "8vw" }} >&times;</span>
                  <h2>{this.state.companyType} Info Change Form</h2>

                </div>


                <div id="tableOverflow">
                  <table class="table" id="summary" style={{ marginBottom: "2%" }}>
                  </table>

                </div>
                <input type="submit" className="btn btn-info" onClick={() => this.SaveBtn()} style={{ marginBottom: '30px', marginTop: "30px" }} value="SAVE" />
              </div>

            </div>
          </div>

        </form>

      </div>
    );
  }

}


export default EditEmployeeDetails;

/* 


if(!this.state.oldfirstName.length /* &&!this.state.lastName.length&&!this.state.proofType.length */
  /*  &&!this.state.proofNo.length&&!this.state.dob.length&&!this.state.emailId.length
   &&!this.state.mobileNo.length&&!this.state.address.length
   &&!this.state.employeeType.length&&!this.state.role.length&&!this.state.department.length
   &&!this.state.reportingManagerId.length&&!this.state.reportingManagerName.length&&!this.state.reportingManagerRole.length */
