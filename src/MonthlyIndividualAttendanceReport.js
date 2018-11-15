import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import registerServiceWorker from './registerServiceWorker';
import MonthlyIndividualAttendanceReportDisplay from './MonthlyIndividualAttendanceReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import MonthlyOrganizationAttendanceReport from './MonthlyOrganizationAttendanceReport';
import MonthlyAttendanceReportDisplay from './MonthlyAttendanceReportDisplay';
import { confirmAlert } from 'react-confirm-alert';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';

var i;

class MonthlyIndividualAttendanceReport extends Component {


  constructor(props) {
    super(props)
    this.state = {
      date: '',
      companyId: '',
      employeeId: '',
      fromDate: '',
      toDate: '',
    }

  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  MonthlyFunc(value) {
    var today = new Date();

    var val1 = value;

    if (value == ("01") || value == ("03") || value == ("05") || value == ("07") || value == ("08") || value == ("10") || value == ("12")) {

      var j = (i - 1);
      if (j == val1) {

        this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();

      } else {


        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '31';

      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
      });

    }
    else if (value == ("04") || value == ("06") || value == ("09") || value == ("11")) {

      var j = (i - 1);
      if (j == val1) {

        this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();

      } else {


        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '30';

      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
      });
    } else if (value == ("02")) {
      if (today.getFullYear() % 100 == 0 && today.getFullYear() % 400 == 0 && today.getFullYear() % 4 == 0) {

        var j = (i - 1);
        if (j == val1) {
          this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
          this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();

        } else {

          this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
          this.state.toDate = today.getFullYear() + '-' + value + '-' + '29';

        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
        });

      }
      else {
        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '28';
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
        });
      }


    }

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    this.setState({
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,
    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        companyId: this.state.companyId,
        employeeId: this.state.employeeId,

      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceMonthlyReport",
      //url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceMonthlyReport",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={() => <MonthlyIndividualAttendanceReportDisplay data={data} />} />

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


  }

  dropdownFunc() {
    $('#1').hide(); $('#2').hide(); $('#3').hide();
    $('#4').hide(); $('#5').hide(); $('#6').hide();
    $('#7').hide(); $('#8').hide(); $('#9').hide();
    $('#10').hide(); $('#11').hide(); $('#12').hide();
    var today = new Date();
    this.state.month = today.getMonth() + 1;
    var displaydate = today.getDate();
    this.setState({
      month: this.state.month,
    });
    for (i = 1; i <= this.state.month; i++) {
      $('#dropdown').show();
      $('#' + i).show();
    }
    this.state.i = i - 1;
    this.setState({
      i: this.state.i,
    });


  }

  MyReport() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />

          <Route path="/" component={() => <MonthlyIndividualAttendanceReport />} />

          <Route path="/" component={FooterText} />
        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }
  OrganizationReport() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "report") {
        flag = 0;//true
      }
    });


    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={EmployeeMenuHeader} />
            <Route path="/" component={() => <MonthlyOrganizationAttendanceReport />} />
            <Route path="/" component={FooterText} />

          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
    } else {
      confirmAlert({
        title: 'Access Deined',                        // Title dialog
        message: 'You are not Allowed to Access this Page',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm

      })
    }
  }
  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={ReportMenuPage} />
          <Route path="/" component={FooterText} />
        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
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
        <h2 style={{ textAlign: "center" }}>Monthly Individual Report</h2>
        {/*    <div id='horMenu'>
          <ul>
            <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={() => this.MyReport()}><span className="glyphicon glyphicon-user">My Report</span></a></li>
            <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={() => this.OrganizationReport()}><span className="glyphicon glyphicon-th-large">Organization Report
  </span></a></li>
          </ul>
        </div> */}

        <div id='horMenunew' >
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6", padding: "10px 0px!important" }}>
            <li><a style={{ padding: "10px 0px" }} className="active" onClick={() => this.MyReport()} ><span class="glyphicon glyphicon-user">My Report</span></a></li>
            <li><a style={{ padding: "10px 0px" }} onClick={() => this.OrganizationReport()}><span class="glyphicon glyphicon-th-large">Organization Report</span> </a></li>
          </ul>

        </div>


        <div class="btn-group" style={{ marginBottom: "50%" }}>
          <button type="button" onClick={() => this.dropdownFunc()} class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Select your Month</button>



          <ul class="dropdown-menu" id="dropdown" style={{ paddingLeft: "37px", MarginBottom: "40%" }} role="menu">
            <li><a href="#" id="1" onClick={(e) => this.MonthlyFunc("01")}>January</a></li>
            <li><a href="#" id="2" onClick={(e) => this.MonthlyFunc("02")}>Feburuary</a></li>
            <li><a href="#" id="3" onClick={(e) => this.MonthlyFunc("03")}>March </a></li>
            <li><a href="#" id="4" onClick={(e) => this.MonthlyFunc("04")}>April </a></li>
            <li><a href="#" id="5" onClick={(e) => this.MonthlyFunc("05")}>May</a></li>
            <li><a href="#" id="6" onClick={(e) => this.MonthlyFunc("06")}>June</a></li>
            <li><a href="#" id="7" onClick={(e) => this.MonthlyFunc("07")}>July</a></li>
            <li><a href="#" id="8" onClick={(e) => this.MonthlyFunc("08")}>August</a></li>
            <li><a href="#" id="9" onClick={(e) => this.MonthlyFunc("09")}>September</a></li>
            <li><a href="#" id="10" onClick={(e) => this.MonthlyFunc("10")}>october</a></li>
            <li><a href="#" id="11" onClick={(e) => this.MonthlyFunc("11")}>November</a></li>
            <li><a href="#" id="12" onClick={(e) => this.MonthlyFunc("12")}>December</a></li>

          </ul>
        </div>

      </div>
    );
  }

}
export default MonthlyIndividualAttendanceReport;



