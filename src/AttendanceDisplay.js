import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import registerServiceWorker from './registerServiceWorker';
import FooterText from './FooterText';



class AttendanceDisplay extends Component {

  constructor(data) {
    super(data)
    var today = new Date();
    var displayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
    if(companyType=="Office"){
        companyType="EMP";
    }
    else{
        companyType="ST";
    }
    this.state = {
      displayDate: displayDate,
      date: date,
      companyId: '',
      companyType:companyType
    };
  }
  componentDidMount() {
    var self=this;
    window.scrollTo(0, 0);
    var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;"><th>'+self.state.companyType+'ID</th><th>'+self.state.companyType+' NAME</th><th>CHECK IN</th><th>CHECK OUT </th><th>STATUS </th><th>MOBIILE NO</th></tr></thead>';
    $.each(this.props.data, function (i, item) {
      tab += '<tr class="success" id="tabletextcol" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.checkIn + '</td><td>' + item.checkOut + '</td><td>' + item.status + '</td><td>' + item.mobileNo + '</td></tr>';
    });
    $("#tableHeadings").append(tab);

  }
  AuthorizeFunc() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state.employeeId = employeeId;
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
      employeeId: employeeId,
    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        companyId: this.state.companyId,
        employeeId: this.state.employeeId,
      }
      ),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/supervisorAuthorization",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data == 0) {
          confirmAlert({
            title: 'SuperVisor Authorization',                        // Title dialog
            message: 'You have Successfully Authorized Attendence',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })
        } else {

          confirmAlert({
            title: 'SuperVisor Authorization',                        // Title dialog
            message: 'You have not Authorized Attendence',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })
        }


        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={AttendanceRegulationMenuPage} />
              <Route path="/" component={FooterText} />

            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();


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
			title: 'Access Deined',                        // Title dialog
			message: 'You are not Allowed to Authorize Attendance',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm

		})
	}



  }

  render() {

    return (

      <div className="container" id="containerbody">

        <h3   className="centerAlign" style={{ textAlign: "center",marginTop: '-30px'  }}>Attendance</h3>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>{this.state.displayDate}</h4>

        <div id="tableOverflow">
          <table class="table" id="tableHeadings">

          </table>
        </div>
        <div class="input-group-btn">

          <button type="button" class="btn btn-danger" onClick={() => this.AuthorizeFunc()} style={{ marginLeft: "20px", marginBottom: "70px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", display: "table-row" }}>Authorize </button>
        </div>

      </div>
    );
  }

}

export default AttendanceDisplay;
