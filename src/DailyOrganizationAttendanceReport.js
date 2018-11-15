import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import DailyIndividualAttendanceReport from './DailyIndividualAttendanceReport';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FooterText from './FooterText';

var report;
class DailyOrganizationAttendanceReport extends Component {

  constructor(data) {
    super(data)
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
    if(companyType=="Office"){
        companyType="Employee";
    }
    else{
        companyType="Student/Staff";
    }
    this.state = {
      date: today1,
      companyId: '',
      employeeId: '',
      companyName:'',
      companyType:companyType
    };
  }
  componentDidMount() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   var companyName=CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    this.state.companyName=companyName;
    this.setState({
      date: this.state.date,
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,
      companyName:this.state.CompanyName,
    });
report=this.state.CompanyName+"DailyReport"+this.state.date;
var self=this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
      date: this.state.date,
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,
  }),
     //   url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var permanentcountAbsent = 0;
        var temporarycountAbsent = 0;
        var contractcountAbsent = 0;
        var permanentcountPresent = 0;
        var temporarycountPresent = 0;
        var contractcountPresent = 0;
        var permanentcountLeave = 0;
        var temporarycountLeave = 0;
        var contractcountLeave = 0;
        var noOfPermanentEmployee = 0;
        var noOfContractEmployee = 0;
        var noOfTemporaryEmployee = 0;
        var status;
        var color;
       // console.log("data",data);
        if (data.employeeRetrievelist.length != 0) {
          var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885;" ><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>Location</th><th>CheckOut</th><th>Location</th></th><th>#WorkHour</th><th>Status</th><th>AuthorizedBy</th><th>Type</th></tr></thead>';
          $.each(data.employeeRetrievelist, function (i, item) {

            if (item.employeeType == "Permanent") {
              noOfPermanentEmployee++;
              if (item.status == "P") {
                permanentcountPresent++;
                status = "Present";
                color = "#5cb85cad";
              } else if (item.status == "A") {
                permanentcountAbsent++;
                status = "Absent";
                color = "#ff000087";
              } else if (item.status == "L") {
                permanentcountLeave++;
                status = "Leave";
                color = "#e8e92ab3";
              } else {
                status = "Holiday";
                color = "#428bcab3";
              }
            } else if (item.employeeType == "Temporary") {
              noOfTemporaryEmployee++;
              if (item.status == "P") {
                temporarycountPresent++;
                status = "Present";
                color = "#5cb85cad";
              } else if (item.status == "A") {
                temporarycountAbsent++;
                status = "Absent";
                color = "#ff000087";
              } else if (item.status == "L") {
                temporarycountLeave++;
                status = "Leave";
                color = "#e8e92ab3";
              } else {
                status = "Holiday";
                color = "#428bcab3";
              }
            } else if (item.employeeType == "Contract") {
              noOfContractEmployee++;
              if (item.status == "P") {
                contractcountPresent++;
                status = "Present";
                color = "#5cb85cad";
              } else if (item.status == "A") {
                contractcountAbsent++;
                status = "Absent";
                color = "#ff000087";
              } else if (item.status == "L") {
                contractcountLeave++;
                status = "Leave";
                color = "#e8e92ab3";
              } else {
                status = "Holiday";
                color = "#428bcab3";
              }
            }
           // tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.employeeType + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.authorizedBy + '</td></tr></tbody>';
           if(item.checkInOutTimings!=null){
            tab += '<tr style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.authorizedBy + '</td><td>' + item.employeeType + '</td></tr>';
          
            var str_array = item.checkInOutTimings.split(',');
            var inOut='';

        for(var i = 0; i < str_array.length; i+=2) {
        
         
          if(str_array[i+1]){
           
            inOut+=str_array[i]+'&nbsp - &nbsp'+str_array[i+1]+'&nbsp&nbsp,&nbsp&nbsp';
      }else{
     
        inOut+= str_array[i]+'&nbsp - &nbsp&nbsp -';
     
      }
    }
      tab+='<tr class="DetailReport" style="background-color:gray;"><td>'+item.employeeId +'</td><td colspan"2" style="text-align:center;"><font color="#fff">Check In/Out Details</font></td><td colspan="9" style="text-align:left;"><font color="#fff">'+inOut+'</font></td></tr>';
      
        
          }else{
              tab += '<tr  style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.authorizedBy + '</td><td>' + item.employeeType + '</td></tr>';
          
            }
          });
          $("#tableHeadings").append(tab);
          $(".DetailReport").hide();
         
         
          var summary = '<thead ><tr style="color: white; background-color: #486885;"  class="headcolor"><th>Type</th><th>#'+self.state.companyType+'</th><th>Present</th><th>Absent</th><th>Leave</th></tr></thead>';
          summary += '<tr class="success" ><td> Permanent</td><td>' + noOfPermanentEmployee + '</td><td>' + permanentcountPresent + '</td><td>' + permanentcountAbsent + '</td><td>' + permanentcountLeave + '</td></tr>';
          summary += '<tr class="success" ><td> Contract</td><td>' + noOfContractEmployee + '</td><td>' + contractcountPresent + '</td><td>' + contractcountAbsent + '</td><td>' + contractcountLeave + '</td></tr>';
          summary += '<tr class="success" ><td> Temporary</td><td>' + noOfTemporaryEmployee + '</td><td>' + temporarycountPresent + '</td><td>' + temporarycountAbsent + '</td><td>' + temporarycountLeave + '</td></tr>';

          $("#summary").append(summary);
        } else {
          $("#tableHeadings").append('<h3 align="center">No Data</h3>');
           $("#summary").hide();
        }
      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      }

    });
    //search button func
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    window.scrollTo(0, 0);
  }

  MyReport() {

    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={() => <DailyIndividualAttendanceReport />} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
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

            <Route path="/" component={() => <DailyOrganizationAttendanceReport />} />
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

  DetailReport(){
    $(".DetailReport").show();
  }
  render() {

    return (

      <div className="container"id="containerbody" >

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

        <h3 className="centerAlign" style={{ textAlign: "center" }}>Daily Attendance Report</h3>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>{this.state.date}</h4>
  {/*       <div id='horMenu'>
          <ul>
            <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={() => this.MyReport()}><span class="glyphicon glyphicon-user">My Report</span></a></li>
            <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={() => this.OrganizationReport()}><span class="glyphicon glyphicon-th-large">Organization Report
  </span></a></li>
          </ul>
        </div> */}

         <div id='horMenunew' >
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6" ,padding: "10px 0px!important" }}>
            <li><a style={{ padding: "10px 0px"}} className="active"   onClick={() => this.MyReport()} ><span class="glyphicon glyphicon-user">My Report</span></a></li>
            <li><a  style={{ padding: "10px 0px"}}  onClick={() => this.OrganizationReport()}><span class="glyphicon glyphicon-th-large">Organization Report</span> </a></li>
          </ul>

        </div>

        <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
{/*}
        <div id="tableOverflow" >
 <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                   filename="Daily_Report"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>

         

        </div>
      */}
      
        <div id="tableOverflow">
         <h3 className="centerAlign" style={{ textAlign: "center" }}>Summary</h3>

          <table class="table" id="summary" style={{ marginBottom: "2%",color:"black" }}>


          </table>

        </div>
<h3 className="centerAlign" style={{ textAlign: "center" }}>Detailed Report List</h3>
<div  style={{paddingBottom:"6%",margin: "12px"}}>
        <button  style={{float:"right"}}  onClick={() => this.DetailReport()} class="DetailReportSelect">Detailed Report</button>
      </div>
<div id="tableOverflow">
         <table style={{ margin: "auto" ,marginBottom: "10%"}} class="table" id="tableHeadings">

          </table>
      </div>
      </div>
    );
  }

}

export default DailyOrganizationAttendanceReport;
