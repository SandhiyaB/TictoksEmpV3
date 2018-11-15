
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  FormErrors
} from './FormErrors';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import './EmployeeMenuPage.css';
import timepicker from 'timepicker/jquery.timepicker';
import FooterText from './FooterText';


class AttendanceRegulationSupervisor extends Component {

  constructor(props) {
    super(props)
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
    if(companyType=="Office"){
        companyType="Employee";
    }
    else{
        companyType="Student/Staff";
    }
    this.state = {
      date: '',
      checkInTime: '',
      checkOutTime: '',
      employeeId: '',
      companyId: '',
      dateValid: false,
      checkInTimeValid: false,
      checkOutTimeValid: false,
      employeeIdValid: false,
      superiorId: superiorId,
      companyType:companyType

    }
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      employeeIdValid: true
    });

  }

  handleUserInputDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      dateValid: true
    });

  }

  handleCheckIn = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      checkInTimeValid: true
    });
    $("#checkOutTime").timepicker('option', 'minTime', value);
  }
  handleCheckOut = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      checkOutTimeValid: true
    });

    //$("#checkInTime").timepicker('option', 'maxTime', value);
  }
  handleEmployeeId = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.employeeId = value;
    this.setState({
      [name]: value,
      employeeIdValid: true

    });
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeedetails",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        self.state.employeeName = data.employeeName;
        self.state.role = data.role;
        self.state.department = data.department;

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
  Submit() {

    if(this.state.checkInTime.trim().length>0 && this.state.checkOutTime.trim().length>0){
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        checkInTime: this.state.checkInTime,
        checkOutTime: this.state.checkOutTime,
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/mail/AttendanceRegularizationMail",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        if (data.status == "NOT_ASSIGNED") {

          confirmAlert({
            title: 'Attendance Regulation Request Failed',                        // Title dialog
            message:'The '+self.state.companyType+ ' Id   '+self.state.employeeId+ '  Is Not Assigned With A Reporting Manger , Kindly Contact Admin',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
                })


        } else if (data.status == "ALREADY_EXITS") {
          confirmAlert({
            title: 'Attendance Regulation Request Failed',                        // Title dialog
            message:'The '+self.state.companyType+ ' Id  '+self.state.employeeId+ '   Has Already Sent Attendance Regularization Request for the Date '+self.state.date,               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
                })
   
   

        }
        else {

          confirmAlert({
            title: 'Attendance Regulation Request Sucess',                        // Title dialog
            message: 'Attendance Regularization Request For '+self.state.companyType+ ' Id  '+self.state.employeeId+ '   On '+self.state.date+' Is Sent Successfully',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
                })



          ReactDOM.render(
            <Router>
              <div>

                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={AttendanceRegulationMenuPage} />
                <Route path="/" component={AttendanceRegulationSupervisor} />
                <Route path="/" component={FooterText} />

              </div>
            </Router>,
            document.getElementById('root'));
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
    $('[name=employeeId]').val('');
    self.state.employeeId = "";
    self.setState({
      employeeName: '',
      role: '',
      department: '',

    });
    this.setState({
      date: '',
      checkInTime: '',
      checkOutTime: '',
      employeeId: '',
      companyId: '',
      dateValid: false,
      checkInTimeValid: false,
      checkOutTimeValid: false,
      employeeIdValid: false,

    });
  }else if(this.state.checkInTime.trim().length==0){
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Check In Time.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Check Out Time.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }

  componentDidMount() {
    var self = this;
    window.scrollTo(0, 0);
    $('#date').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        self.setState({
          date: date,
          dateValid: true,
        });

      },
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: '-1D',
      numberOfMonths: 1
    });
    $('#checkInTime').timepicker({
      onSelect: function (time) {
        $("#checkOutTime").timepicker('option', 'minTime', time);
        self.state.checkInTime = time;
        self.setState({
          checkInTime: time,
        });
      },

      timeFormat: 'H:i:s',
    });

    $('#checkOutTime').timepicker({
      onSelect: function (time) {
        $("#checkInTime").timepicker('option', 'maxTime', time);
        self.state.checkOutTime = time;
        self.setState({
          checkOutTime: time,
        });
      },

      timeFormat: 'H:i:s',

    });

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;

    this.setState({
      companyId: companyId,
      employeeId: employeeId,
    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/ReportingManagerEmpList",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        var employeeId;
        employeeId += '<option  value="" disabled selected hidden >Select a '+self.state.companyType+ ' Id</option>';
        employeeId += '<option value="'+self.state.employeeId+ '">'+self.state.employeeId+ '</option>'
        $.each(data, function (i, item) {

          employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

        });
        $("#employeeId").append(employeeId);

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });



      }
    });

  }

  render() {

    return (

      <div className="container" style={{ marginBottom: '30%' }}>
        <div class="jumbotron">
          <h3    style={{ marginTop: '-60px' }}>Attendance Regularization </h3>

          <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <label htmlFor="fromDate"
                style={{ paddingRight: '20px', marginBottom: '14px' }}>
                Date:
            </label>
              <input
                style={{ width: '50%' }}
                type="text"
                readOnly
                value={this.state.date}
                id="date"
                name="date"
                onChange={this.handleUserInputDate} />
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
              <label>
              {this.state.companyType} Id *
   <select
                  id="employeeId"
                  className="form-control"
                  onChange={this.handleEmployeeId}

                  name="employeeId"
                  style={{ marginBottom: "15px" }}
                >
                </select>

              </label>
            </div>
            <div className="row" style={{ display: "inline!important" }}>

              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" style={{ display: "inline!important" }}>
                <input type="text"

                  value={this.state.employeeName}
                  id="employeeName"
                  name="employeeName"
                  maxlength="50"
                  readOnly
                  placeholder="Name.." required />
              </div>

              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <input type="text"
                  className="col-xs-4"
                  value={this.state.role}
                  id="role"
                  name="role"
                  maxlength="50"
                  readOnly
                  placeholder=" Role.." required />
              </div>

              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">

                <input type="text"
                  className="col-xs-4"
                  value={this.state.department}
                  id="department"
                  name="department"
                  maxlength="50"
                  readOnly
                  placeholder="Department.." required />
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div class="form-group" >
                <div className="col-xs-12 col-sm-12 col-lg-12" >
                  <label style={{ marginBottom: '25px!important' }} >
                    Check-In Time*
      <input
                      // class="form-control"
                      type="text"
                      data-step="5"
                      value={this.state.checkInTime}
                      required
                      name="checkInTime"
                      onSelect={this.handleCheckIn}
                      className="form-control"
                      id="checkInTime"
                      placeholder="Enter Check In"

                    />
                  </label>

                </div>

                <div className="col-xs-12 col-sm-12 col-lg-12">
                  <label>
                    Check-Out Time*
      <input
                      //class="form-control"
                      type="text"
                      data-step="5"

                      value={this.state.checkOutTime}
                      required
                      name="checkOutTime"
                      onSelect={this.handleCheckOut}
                      className="form-control"
                      id="checkOutTime"
                      placeholder="Enter checkOut"
                    />
                  </label>
                </div>

          {/*       <button type="button"
                  /*   id="submitAttendanceReg" 
                  disabled={!(this.state.employeeIdValid && this.state.dateValid && this.state.checkInTimeValid && this.state.checkOutTimeValid)}
                  style={{ marginBottom: "10px", marginLeft: "auto", marginRight: "auto", marginTop: "175px" }}
                  onClick={() => this.Submit()} class="btn btn-info">Submit</button>
               */}
                <button
                  disabled={!(this.state.employeeIdValid && this.state.dateValid && this.state.checkInTimeValid && this.state.checkOutTimeValid)}

                  type="button"

                  style={{
                    marginLeft: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    marginBottom: "25px",
                    display: "block"
                  }}

                  onClick={() => this.Submit()} class="btn btn-info">Submit</button>


              </div>
            </div>


          </form>

        </div>

      </div>

    );
  }

}
export default AttendanceRegulationSupervisor;
