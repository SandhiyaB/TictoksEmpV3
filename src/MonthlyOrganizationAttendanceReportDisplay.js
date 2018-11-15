import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import MonthlyOrganizationAttendanceReport from './MonthlyOrganizationAttendanceReport';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FooterText from './FooterText';
import './EmployeeMenuPage.css';
var month;

class MonthlyOrganizationAttendanceReportDisplay extends Component {


  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      date: today,
      month: data.month,


    };
  }
  componentDidMount() {

    if (this.state.month == '01') {
      this.state.month = "January";
    } else if (this.state.month == '02') {
      this.state.month = "Feburary";
    } else if (this.state.month == '03') {
      this.state.month = "March";
    } else if (this.state.month == '04') {
      this.state.month = "April";
    } else if (this.state.month == '05') {
      this.state.month = "May";
    } else if (this.state.month == '06') {
      this.state.month = "June";
    } else if (this.state.month == '07') {
      this.state.month = "July";
    } else if (this.state.month == '08') {
      this.state.month = "August";
    } else if (this.state.month == '09') {
      this.state.month = "September";
    } else if (this.state.month == '10') {
      this.state.month = "October";
    } else if (this.state.month == '11') {
      this.state.month = "Novemeer";
    } else if (this.state.month == '12') {
      this.state.month = "December";
    }




    window.scrollTo(0, 0);
    var Presentcount = 0;
    var Leavecount = 0;
    var Absentcount = 0;
    var employeeId = null;
    var employeeName;
    var totalWorkHour = "00:00:00";
    var status;
    var color;
    console.log("log",this.props.data.employeeRetrievelist);
    if (this.props.data.employeeRetrievelist.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>Date</th><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>CheckOut </th><th>Duration</th><th>Status</th><th>Type</th></tr></thead>';

      var summaryIn = '<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>#Present</th><th>#Absent</th><th>#Hour</th></tr></thead>';
      $("#summary").append(summaryIn);
          
      $.each(this.props.data.employeeRetrievelist, function (i, item) {

        if (employeeId == null) {
          employeeId = item.employeeId;

        }

        if (employeeId == item.employeeId) {
          //count block

          employeeName = item.name;


          if (item.status == "P") {
            Presentcount++;
            status = "Present";
            color = "#5cb85cad";
          } else if (item.status == "A") {
            Absentcount++;
            status = "Absent";
            color = "#ff000087";
          } else if (item.status == "L") {
            Leavecount++;
            status = "Leave";
            color = "#e8e92ab3";

          } else {
            status = "Holiday";
            color = "#428bcab3";
          }
        //  tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
        if ((item.checkInOutTimings != null) &&(item.checkInOutTimings !="-")) {
           tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';


          var str_array = item.checkInOutTimings.split(',');
          var inOut = '';

          for (var i = 0; i < str_array.length; i += 2) {


            if (str_array[i + 1]) {

              inOut += str_array[i] + '&nbsp - &nbsp' + str_array[i + 1] + '&nbsp&nbsp,&nbsp&nbsp';
            } else {

              inOut += str_array[i] + '&nbsp - &nbsp&nbsp -';

            }
          }
          tab += '<tr class="DetailReport" style="background-color:gray;"><td>' + item.employeeId + '</td><td colspan"2" style="text-align:center;"><font color="#fff">Check In/Out Details</font></td><td colspan="9" style="text-align:left;"><font color="#fff">' + inOut + '</font></td></tr>';


        } else {
          tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';


        }
          if (item.totalWorkHour != "-") {
            var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
            totalWorkHour = start;

          }

        } else {

          var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + employeeId + '</td><td>' + employeeName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + totalWorkHour + '</td></tr></tbody>';
          $("#summary").append(summary);
          employeeId = item.employeeId;
          employeeName = item.name;
          //initalize count to 0
          Presentcount = 0;
          Leavecount = 0;
          Absentcount = 0;
          totalWorkHour = "00:00:00";

          if (item.status == "P") {
            Presentcount++;
            status = "Present";
            color = "#5cb85cad";

          } else if (item.status == "A") {
            Absentcount++;
            status = "Absent";
            color = "#ff000087";
          } else if (item.status == "L") {
            Leavecount++;
            status = "Leave";
            color = "#e8e92ab3";

          } else {
            status = "Holiday";
            color = "#428bcab3";
          }
          
          //   tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
          if ((item.checkInOutTimings != null) &&(item.checkInOutTimings !="-")) {
            tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';


            var str_array = item.checkInOutTimings.split(',');
            var inOut = '';

            for (var i = 0; i < str_array.length; i += 2) {


              if (str_array[i + 1]) {

                inOut += str_array[i] + '&nbsp - &nbsp' + str_array[i + 1] + '&nbsp&nbsp,&nbsp&nbsp';
              } else {

                inOut += str_array[i] + '&nbsp - &nbsp&nbsp -';

              }
            }
            tab += '<tr class="DetailReport" style="background-color:gray;"><td>' + item.employeeId + '</td><td colspan"2" style="text-align:center;"><font color="#fff">Check In/Out Details</font></td><td colspan="9" style="text-align:left;"><font color="#fff">' + inOut + '</font></td></tr>';


          } else {
            tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';


          }
          if (item.totalWorkHour != "-") {
            var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
            totalWorkHour = start;


          }

        }
      });

      $("#tableHeadings").append(tab);
      $(".DetailReport").hide();
      var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + employeeId + '</td><td>' + employeeName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + totalWorkHour + '</td></tr></tbody>';

      // $("#summary").append(summary);
      $("#summary").append(summary);
    } else {
      $("#tableHeadings").append('<h3 align="center">No Data</h3>');
    }
    function zeroPad(num) {
      var str = String(num);
      if (str.length < 2) {
        return '0' + str;
      }
      return str;
    }

    // assuming your time strings will always be (H*:)(m{0,2}:)s{0,2} and never negative
    function totalTimeString(timeStrings) {
      var totals = timeStrings.reduce(function (a, timeString) {
        var parts = timeString.split(':');
        var temp;
        if (parts.length > 0) {
          temp = Number(parts.pop()) + a.seconds;
          a.seconds = temp % 60;
          if (parts.length > 0) {
            temp = (Number(parts.pop()) + a.minutes) + ((temp - a.seconds) / 60);
            a.minutes = temp % 60;
            a.hours = a.hours + ((temp - a.minutes) / 60);
            if (parts.length > 0) {
              a.hours += Number(parts.pop());
            }
          }
        }

        return a;
      }, {
          hours: 0,
          minutes: 0,
          seconds: 0
        });

      // returned string will be HH(H+):mm:ss
      return [
        zeroPad(totals.hours),
        zeroPad(totals.minutes),
        zeroPad(totals.seconds)
      ].join(':');
    }
    //search button func
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }


  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={MonthlyOrganizationAttendanceReport} />
          <Route path="/" component={FooterText} />
        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }


  DetailReport() {
    $(".DetailReport").show();
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


        <h2 className="centerAlign" style={{ textAlign: "center" }}>Monthly Organization Attendance Report</h2>
        <h3 className="centerAlign" style={{ textAlign: "center" }}>{this.state.month} </h3>
        <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

        <div style={{ display: "grid" }}>
          <div >
            <ReactHTMLTableToExcel

              id="test-table-xls-button"
              className="download-table-xls-button"
              table="summary"
              filename="Monthly_Report"
              sheet="tablexls"
              buttonText="Download Summary Report" />
          </div>
          {/* <button onclick="saveFile()">Save XLSX file</button>
 */}

          <div id="tableOverflow">
            <h3 className="centerAlign" style={{ textAlign: "center" }}>Summary</h3>


            <table class="table" id="summary" style={{ marginBottom: "2%" }}>

            </table>
          </div>
        </div>



        <div id="tableOverflow">
          <h3 className="centerAlign" style={{ textAlign: "center" }}>Detailed Report List</h3>

          <div style={{ paddingBottom: "4%" }}>
            <button style={{ float: "right" }} onClick={() => this.DetailReport()} class="DetailReportSelect">Detailed Report</button>
          </div>
          <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
          </table>




        </div>




      </div>
    );
  }

}

export default MonthlyOrganizationAttendanceReportDisplay;
