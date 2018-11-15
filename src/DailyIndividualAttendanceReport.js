import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import DailyOrganizationAttendanceReport from './DailyOrganizationAttendanceReport';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';
import Modal from 'react-modal';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
/* Modal.setAppElement('#yourAppElement') */

class DailyIndividualAttendanceReport extends Component {

  constructor(data) {
    super(data)
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      modalIsOpen: false,
      date: today1,
      employeeId: '',
      companyId: '',
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }


  componentDidMount() {
    

    var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var dept;
    dept += '<option value="" disabled selected hidden>Select a department</option>';
    $.each(department, function (i, item) {

      dept += '<option value="' + item.department + '">' + item.department + '</option>'

    });
    dept += '<option selected="selected" value="' + 'all' + '" id=" ' + 'deptall' + ' ">' + 'All' + '</option>'

    $("#department").append(dept);


    //  $("input[value='" + 'all '+ "').prop('disabled', false);  
    var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var role;
    role += '<option value="" disabled selected hidden >Select a role</option>';
    $.each(Role, function (i, item) {

      role += '<option value="' + item.role + '">' + item.role + '</option>'

    });
    role += '<option selected="selected" value="' + 'all' + '">' + 'All' + '</option>'
    $("#role").append(role);



    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    //this.state.date="2018-12-31";

    this.setState({
      date: this.state.today1,
      //date:this.state.date,
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,

    });
   
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceDailyReport",

      //url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceDailyReport",

      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

       // console.log(data);
        var status;
        var Presentcount;
        var Absentcount;
        var Leavecount;
        var color;
        if (data.employeeRetrievelist.length != 0) {
          var tab = '<thead><tr className="headcolor" class="headcolor" style="color: white; background-color: #486885;"><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>Location</th><th>CheckOut</th><th>Location</th><th>#WorkHour</th><th>Status</th><th>AuthorizedBy</th><th>Type</th><th></th></tr></thead>';
          $.each(data.employeeRetrievelist, function (i, item) {
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
         
          
  
        }
        else {
          $("#tableHeadings").append('<h3 align="center">No Data</h3>');
          
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

            <Route path="/" component={() => <DailyOrganizationAttendanceReport/>} />
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
  DetailReport(){
    $(".DetailReport").show();
  }


  render() {

    return (

      <div className="container" id="containerbody">

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
  
     {/*    <div id='horMenunew'>
          <ul>
            <li><a className="active col-sm-6 col-xs-6 col-lg-6" onClick={() => this.MyReport()}><span className="glyphicon glyphicon-user">My Report</span></a></li>
            <li><a className="col-sm-6 col-xs-6 col-lg-6" onClick={() => this.OrganizationReport()}><span className="glyphicon glyphicon-th-large">Organization Report </span></a></li>
          </ul>
        </div> */}
        <div id='horMenunew' >
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6" ,padding: "10px 0px!important" }}>
            <li><a style={{ padding: "10px 0px"}} className="active"   onClick={() => this.MyReport()} ><span class="glyphicon glyphicon-user">My Report</span></a></li>
            <li><a  style={{ padding: "10px 0px"}}  onClick={() => this.OrganizationReport()}><span class="glyphicon glyphicon-th-large">Organization Report</span> </a></li>
             </ul>
            
        
        </div>
        <div style={{paddingBottom:"6%",margin: "12px"}}>
        <button  style={{float:"right"}}  onClick={() => this.DetailReport()} class="DetailReportSelect">Detailed Report</button>
      </div>
        <div id="tableOverflow" >
          <table style={{ margin: "auto" }} className="table" id="tableHeadings">
          </table>

        </div>

        <div id="tableOverflow">
          <table className="table" id="summary" style={{ marginBottom: "30%" }}>

          </table>
        </div>


        </div>
     
    
  
     
    );
  }

}

export default DailyIndividualAttendanceReport;

