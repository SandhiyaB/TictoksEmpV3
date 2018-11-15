// not used
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './LoginPage.css';
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
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import PeriodIndividualAttendanceReport from './PeriodIndividualAttendanceReport';

import FooterText from './FooterText';
class PeriodAttendanceReport extends Component {


  constructor(props) {
    super(props)
    this.state = {
      fromDate: '',
      toDate: '',
      companyId: '',
    }

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });

  }
  Submit() {
if(this.state.fromDate.trim().length>0 && this.state.toDate.trim().length>0){
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeeAttendancePeriodReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        ReactDOM.render(
          <Router>
            <div>

              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={() => <PeriodIndividualAttendanceReport data={data} />} />
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
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Dates',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }

  }

  componentDidMount() {
    var self = this;
    window.scrollTo(0, 0);

    $('#toDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#fromDate").datepicker("option", "maxDate", dt);
        self.setState({
          toDate: date,
        });

      },
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    $('#fromDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        $("#toDate").datepicker("option", "minDate", dt);
        self.setState({
          fromDate: date,
        });
      },
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });

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

      <div className="container" id="containerbody" >
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
        <div class="jumbotron" id="containerbodyjumbo" >
          <h2>Period Report</h2>

          <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
            <label htmlFor="fromDate" style={{ paddingRight: '50px', color: "white" }}> From:</label>
            <input
              style={{
                width: '46%',
                color: "black!important"
              }}
              type="text"
              value={this.state.fromDate}
              id="fromDate" name="fromDate"
              onChange={this.handleUserInput} />

          </form>

          <form style={{ paddingRight: '50px', color: "black" }}   >
            <label
              htmlFor="toDate"
              style={{ marginRight: '70px', color: "white" }}> To:</label>

            <input
              style={{
                width: '50%',
                color: "black!important"
              }}
              type="text"
              value={this.state.toDate}
              id="toDate" name="toDate"
              onChange={this.handleUserInput} />

          </form>



        </div>

        <button
          type="button"
          onClick={() => this.Submit()}
          className="btn btn-primary"
          style={{
            marginLeft: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "60px",

            display: "block"
          }}>Submit</button>

        <table id="records_table" style={{ width: '80%' }}>

        </table>

      </div>
    );
  }

}
export default PeriodAttendanceReport;

/* <a to="/" onClick={()=>this.Submit()}>Submit</a>*/