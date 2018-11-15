import React, { Component } from 'react';
import {
    FormErrors
} from './FormErrors';
import logo from './logo.svg';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import './datepicker.css';
import CryptoJS from 'crypto-js';
import EmployeeMenuPage from './EmployeeMenuPage';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import FooterText from './FooterText';

class OneDay extends Component {

    constructor(props) {
        super(props)
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var today = new Date();
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
        if(companyType=="Office"){
            companyType="Employee";
        }
        else{
            companyType="Student/Staff";
        }

        this.state = {

            noOfDays: '0',
            reason: '',
            subject: '',
            day: 'oneday',
            date: '',
            employeeId: '',
            reportingManagerId: '',
            companyId: '',
            leaveType: '',
            session: '',
            companyType:companyType,
            appliedDate:today,
        }
    }

    componentDidMount() {
        var self = this;
        $('#datepicker').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                self.setState({
                    date: date,
                    dateValid: true,
                });

            },

            dateFormat: 'yy-mm-dd',
            minDate: 'M',
            maxDate: '+3M',
            numberOfMonths: 1
        });

        self.Validation()

        self.GetLeaveType();

        self.GetCompanyEmployeeLeave();

        

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,

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

    onChange = date1 => this.setState({ date1 })

    oneDayDuration = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,

        });
        if (value != "full day") {
            this.setState({
                noOfDays: '0.5',
                session: value,
            });
        } else {
            this.setState({
                noOfDays: '1',
                session: '1 Day',
            });
        }
        $('#leavetype').attr('disabled', false);
    }
    handleUserInputLeaveType = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.state.leaveType = value;
        this.setState({
            [name]: value,

        });

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state.companyId = companyId;
        this.state.employeeId = employeeId;

        this.setState({
            companyId: this.state.companyId,
            employeeId: this.state.employeeId,
            leaveType: this.state.leaveType,

        });

        var self = this;
        $.ajax({

            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
                leaveType: this.state.leaveType,
            }),

            //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavedays",
 url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavedays",

            //CHANGE THE ABOVE URL TO BELOW URL
            // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavedays",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                var leaveDays = data.day;
                var noOfDays1 = self.state.noOfDays;

                if (leaveDays < noOfDays1) {
                   
 if (leaveDays < noOfDays1) {
                   
 if (leaveDays < noOfDays1) {
    confirmAlert({
        title: 'Applying Leave Request Failed',                        // Title dialog
        message: 'You Cannot Apply Leave In ' + self.state.leaveType + ' Because It Exceeds Your Leave Limit',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm

    });


                    self.state.noOfDays = "";
                    self.state.leaveType = "";
                    self.setState({
                        leaveType: self.state.leaveType,
                    });

                    $("#duration").prepend("<option value='' disabled selected hidden selected='selected'>Select leave duration </option>");
                    $('leavetype option[text="Select leave type"]').attr('selected', 'selected');
                    $('#leavetype').attr('disabled', true);
                }
            }
        }
    },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          

            },

        });
    }
    Validation() {

        $("#submitLeaveReq").attr("disabled", "true");
        $("#datepicker, #duration, #leavetype,#subject,#reason").keyup(function () {
            if ($("#datepicker").val() && $("#duration").val() && $("#leavetype").val() && $("#subject").val() && $("#reason").val())
                $("#submitLeaveReq").removeAttr("disabled");
        });
    }

    GetLeaveType() {
        var leaveDropdown;
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
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
            }),
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavetype",
              url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavetype",
           
            //CHANGE THE ABOVE URL TO BELOW URL
            // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                $.each(data.leaveTypeList, function (i, item) {

                    leaveDropdown += '<option>' + item.leaveType + '</option>';

                });
                $("#leavetype").append(leaveDropdown);

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          

            },
        });


    }


GetCompanyEmployeeLeave(){

 
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state.companyId = companyId;
        this.state.employeeId = employeeId;
        this.setState({
            companyId: this.state.companyId,
            employeeId: this.state.employeeId,
        });
        /* $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
            }),
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavetype",
           //url: "http://localhost:8080/EmployeeAttendenceAPI/employeeleaverequest/getcompanyemployeeleave",
          url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getcompanyemployeeleave",
          
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

//console.log(data);

        //     var tab='<thead><tr class="headcolor"><th>LeaveType</th><th>Id</th><th>#Days</th></tr></thead>';
 var tab='<tr class="success"><th>LeaveType</th><th> #Days</th></tr></thead>';

             $.each(data.companyLeaveList, function (i, item) {

                tab += '<tr class="success" id="tabletextcol"><td>' + item.leaveType + '</td> '+ " " +' <td>'  + item.noOfDays + '</td></tr>';

                });
                $("#companyleavetable").append(tab);




var tab1='<tr class="headcolor"><th>LeaveType</th><th>#Days</th></tr></thead>';


 $.each(data.employeeLeaveList, function (i, item) {

                tab1 += '<tr class="success" id="tabletextcol"><td>' + item.leaveType + '</td><td>'   + item.noOfDays + '</td></tr>';

                });
                $("#employeeleavetable").append(tab1);

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
            title: 'No Internet',                        // Title dialog
            message: 'Network Connection Problem',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
  
            },
        });



 */

$.ajax({
    type: 'POST',
    data: JSON.stringify({
      companyId:this.state.companyId,
      employeeId:this.state.employeeId,
    }),
   // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceDailyReport",

     url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/individualLeaveReport",
   
    contentType: "application/json",
    dataType: 'json',
    async: false,

    success: function (data, textStatus, jqXHR) {

     
      if (data.length != 0) {
       
        var tab = '<thead><tr className="headcolor" class="headcolor" style="color: white; background-color: #486885;"><th>Leave Type</th><th>#Days Given</th><th>#Days Available</th></tr></thead>';
       
        $.each(data, function (i, item) {
          
          tab += '<tr ><td>' + item.companyLeaveType + '</td><td>' + item.companyLeaveDays + '</td><td>' + item.employeeLeaveDays+ '</td></tr>';
        });
        
        $("#companyleavetable").append(tab);
      }
      else {
        confirmAlert({
            title: 'No Leave',                        // Title dialog
            message: 'Leave is not Assigned for you.',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
          ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={AttendanceRegulationMenuPage} />


                    <Route path="/" component={LeaveManagement} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
     //   $("#companyleavetable").append('<h3 align="center">No Data</h3>');
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
 
}




    AddFunc() {
        this.state.employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        if((this.state.date.trim().length>0) && (this.state.noOfDays.trim().length>0) && (this.state.leaveType.trim().length>0) && (this.state.subject.trim().length>0) && (this.state.reason.trim().length>0)){
 
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                reason: this.state.reason,
                subject: this.state.subject,
                noOfDays: this.state.noOfDays,
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
                day: this.state.day,
                date: this.state.date,
                leaveType: this.state.leaveType,
                fromDate:this.state.date,
                toDate:this.state.date,
                appliedDate:this.state.appliedDate,

            }),
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
            
             url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
           contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'Applying Leave Request Succeeded',                        // Title dialog
                    message: 'Leave Request Has Been Applied Successfully.',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                })



                $('#Duration').val("");
                $('#noOfDays').val("");
                $('#subject').val("");
                $('#reason').val("");

                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EmployeeMenuHeader} />
                            <Route path="/" component={AttendanceRegulationMenuPage} />

                            <Route path="/" component={LeaveManagement} />
                            <Route path="/" component={FooterText} />
                        </div>
                    </Router>,
                    document.getElementById('root'));
                registerServiceWorker();

            },

            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            },

        });
    }
    else if((this.state.noOfDays==0)){
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Select Duration',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
    }else if((this.state.date.trim().length==0)){
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Select Date',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });
        }
       else if(this.state.leaveType.trim().length==0){
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Leave Type',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });
        }else if(this.state.subject.trim().length==0){
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Enter Subject',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });
        }else{
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Enter Reason',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });
        }

    }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={AttendanceRegulationMenuPage} />


                    <Route path="/" component={LeaveManagement} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }

    render() {
        return (

            <div className="container" style={{ marginBottom: '30%',backgroundColor:" #26425c5e" }}>
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


                <div class="jumbotron">
                    <h3 style={{marginTop: "-25px"}}>Leave Form</h3>
                 <form id="oneday" style={{ paddingBottom: '20px', position: 'inline-block' }}>
<div class="row"><div className="col-lg-6">
                   <h3>Available Leave:</h3> <br/>
                    <table class="table" id="companyleavetable">
                    </table>
</div>{/* <div className="col-lg-6">
                     <h3>{this.state.companyType} Leave:</h3> <br/> 
                     <table class="table" id="employeeleavetable">
                    </table></div>
 */}
 </div>
<br />
<br />
                        <form id="dateformat">
                            <label
                                htmlFor="datepicker"
                                style={{ paddingRight: '50px' }}>Date:</label>

                            <input
                                style={{ width: '50%' }}
                                type="text"
                                value={this.state.date}
                                id="datepicker"
                                name="date"
                                readOnly
                                onChange={this.handleUserInputDate} />

                        </form>
                        <form id="durationlabel" style={{ paddingBottom: '20px', position: 'inline-block' }}   >
                            <label
                                htmlFor="duration"
                                style={{ paddingRight: '30px' }}>Duration:</label>

                            <select style={{ width: '198px' }} name="duration" id="Duration" onChange={this.oneDayDuration}
                                value={this.state.constraint} required>
                                <option value="" disabled selected hidden>Select leave duration</option>
                                <option value="first half">First Half</option>
                                <option value="second half">Second Half</option>
                                <option value="full day">full day</option>

                            </select>


                        </form >
                        <form id="leavetypelabel" style={{ paddingBottom: '20px', position: 'inline-block' }}   >
                            <label
                                htmlFor="leavetype"
                                style={{ paddingRight: '30px' }}>LeaveType:</label>

                            <select style={{ width: '198px' }} name="leaveType" id="leavetype" disabled onChange={this.handleUserInputLeaveType}
                                value={this.state.leaveType} required>
                                <option value="" disabled selected hidden>Select leave type</option>


                            </select>


                        </form >

                        <form id="noofdayslabel" value="noofdays" style={{ paddingBottom: '20px', position: 'inline-block' }}>
                            <label for="noOfDays" style={{ paddingRight: '20px' }}>
                                No of days:
            </label>


                            <input type=""
                                style={{ width: '20%' }}
                                value={this.state.noOfDays}
                                id="noOfDays"
                                name="noOfDays" readonly="readonly"
                            />

                        </form>

                        <form id="subjectlabel" >

                            <label for="subject" >
                                Subject:
</label>
                            <div >
                                <textarea
                                    onChange={this.handleUserInput}
                                    name="subject"
                                    id="subject"
                                    maxlength="75"
                                    placeholder="Your Subject.." style={{ height: '50px', width: '100%' }} ></textarea>
                            </div>
                        </form>

                        <form id="reasonlabel" >

                            <label for="reason" >
                                Reason:
        </label>

                            <div >
                                <textarea
                                    onChange={this.handleUserInput}
                                    name="reason"
                                    id="reason"
                                    maxlength="550"
                                    placeholder="Your reason.." required style={{ height: '150px', width: '100%' }}></textarea>

                            </div>

                        </form>

                        <button type="button" id="submitAttendanceReg" onClick={() => this.AddFunc()} class="btn btn-info">Submit</button>

                    </form>

                </div>
            </div>

        );
    }
}
export default OneDay;

