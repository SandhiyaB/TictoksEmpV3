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
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import OneDay from './OneDay';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeMenuPage from './EmployeeMenuPage';
import LeaveManagement from './LeaveManagement';
import FooterText from './FooterText';
class MoreThanOneDay extends Component {

    constructor(props) {
        super(props)

        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
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

            noOfDays: '',
            fromDate: '',
            toDate: '',
            reason: '',
            subject: '',
            startdate: '',
            enddate: '',
            day: 'morerthanoneday',
            leaveType: '',
            superiorId: superiorId,
            date: '',
            companyType:companyType,
            appliedDate:today,

        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        var self = this;
        $('#toDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() - 1);
                $("#fromDate").datepicker("option", "maxDate", dt);
                self.setState({
                    toDate: date,
                });
                $("#leavetype").attr("disabled", false);

            },
            dateFormat: 'yy-mm-dd',
            minDate: 'M',
            maxDate: '+3M',
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
                $("#toDate").datepicker("option", "disabled", false);
            },
            dateFormat: 'yy-mm-dd',
            minDate: 'M',
            maxDate: '+3M',
            numberOfMonths: 1
        });

        $("#noofdayslabel").hide();
        self.Validation();
        self.Validation1();
        self.GetLeaveType();
       self.GetCompanyEmployeeLeave();
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            leaveType:'',
            noOfDays:''

        });

    }

    noOfDaysCalculate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,

        });
        this.state.startdate = new Date(this.state.fromDate);
        this.state.enddate = new Date(this.state.toDate);
        this.state.noOfDays = Number(Math.floor((Date.UTC((this.state.enddate).getFullYear(),
            (this.state.enddate).getMonth(), (this.state.enddate).getDate())
            - Date.UTC((this.state.startdate).getFullYear(), (this.state.startdate).getMonth(),
                (this.state.startdate).getDate())) / (1000 * 60 * 60 * 24))) + 1;
        this.setState({
            noOfDays: this.state.noOfDays,
        });


    }

    handleUserInputLeaveType = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.state.leaveType = value;
        this.setState({
            [name]: value,

        });

        this.state.startdate = new Date(this.state.fromDate);
        this.state.enddate = new Date(this.state.toDate);
        this.state.noOfDays = Number(Math.floor((Date.UTC((this.state.enddate).getFullYear(),
            (this.state.enddate).getMonth(), (this.state.enddate).getDate())
            - Date.UTC((this.state.startdate).getFullYear(), (this.state.startdate).getMonth(),
                (this.state.startdate).getDate())) / (1000 * 60 * 60 * 24))) + 1;


        this.setState({
            noOfDays: this.state.noOfDays,
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
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavedays",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                var leaveDays = data.day;
                var noOfDays1 = self.state.noOfDays;
                if (leaveDays < noOfDays1) {
                    confirmAlert({
                        title: 'Applying Leave Request Failed',                        // Title dialog
                        message: 'You Cannot Apply Leave In ' + self.state.leaveType + ' Because It Exceeds Your Leave Limit',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm

                    });

                    self.state.noOfDays = "";
                    self.state.fromDate = "";
                    self.state.toDate = "";
                    self.state.leaveType = "";

                    self.setState({
                        leaveType: self.state.leaveType,
                        noOfDays: self.state.noOfDays,
                    });

                    $('leavetype option[text="Select leave type"]').attr('selected', 'selected');
                    $("#toDate").datepicker("option", "disabled", true);
                    $('#leavetype').attr('disabled', true);
                } else {
                    $("#noofdayslabel").show();
                   
                }

            },
            error: function (data, textStatus, jqXHR) {

            },

        });
    }

    Validation() {

        $("#submitLeaveReq").attr("disabled", "true");
        $("#fromDate,#toDate,#leavetype,#subject,#reason").keyup(function () {
            if ($("#fromDate").val() && $("#toDate").val() && $("#leavetype").val() && $("#subject").val() && $("#reason").val())
                $("#submitLeaveReq").removeAttr("disabled");
        });
    }

    Validation1() {
        $("#toDate").datepicker("option", "disabled", true);
        $("#leavetype").attr("disabled", "true");
        var fromDate = $("#fromDate").datepicker();
        var toDate = $("#toDate").datepicker();



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
          //  url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavetype",
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getleavetype",
          
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
       /*  $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
            }),
            //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getcompanyemployeeleave",
           url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/getcompanyemployeeleave",
          
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

//console.log(data);

        //     var tab='<thead><tr class="headcolor"><th>LeaveType</th><th>Id</th><th>#Days</th></tr></thead>';
 var tab='<tr class="headcolor"><th>LeaveType</th><th>Id</th><th>#Days</th></tr></thead>';

             $.each(data.companyLeaveList, function (i, item) {

                tab += '<tr class="success" id="tabletextcol"><td>' + item.leaveType + '</td><td>' + item.noOfDays + '</td></tr>';

                });
                $("#companyleavetable").append(tab);




var tab1='<tr class="headcolor"><th>LeaveType</th><th>Id</th><th>#Days</th></tr></thead>';


 $.each(data.employeeLeaveList, function (i, item) {

                tab1 += '<tr class="success" id="tabletextcol"><td>' + item.leaveType + '</td><td>' + item.noOfDays + '</td></tr>';

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
if((this.state.fromDate.trim().length>0) && (this.state.toDate.trim().length>0) && (this.state.leaveType.trim().length>0) && (this.state.subject.trim().length>0) && (this.state.reason.trim().length>0)){
        var self = this;
        $('#submit').attr('disabled', true);
        var startDate = new Date(this.state.fromDate); //YYYY-MM-DD
        var endDate = new Date(this.state.toDate); //YYYY-MM-DD

        var getDateArray = function (start, end) {
            var arr = new Array();
            var dt = new Date(start);
            while (dt <= end) {
                var today = new Date(dt);
                today = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

                arr.push(today);
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        }

        var dateArr = getDateArray(startDate, endDate);
        this.state.date = dateArr;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                reason: this.state.reason,
                subject: this.state.subject,
                noOfDays: this.state.noOfDays,
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,

                day: this.state.day,
                leaveType: this.state.leaveType,
                superiorId: this.state.superiorId,
                date:'-',
                appliedDate:this.state.appliedDate,

            }),
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
           
            contentType: "application/json",
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                $('#submit').attr('disabled', false);
                if (data.status == "NOT_ASSIGNED") {

                    confirmAlert({
                        title: 'Applying Leave Request Failed',                        // Title dialog
                        message: 'The '+self.state.companyType + ' Id '+self.state.employeeId + ' Cannot Apply For Leave Because He Has Not Assigned To Any Reporting Manger . Kindly Contact Admin',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })



                }
                else if (data.status == "ALREADY_EXITS") {

                    confirmAlert({
                        title: 'Applying Leave Request Failed',                        // Title dialog
                        message: 'The '+self.state.companyType + ' Id '+self.state.employeeId + ' Has Already Applied Leave On ' + self.state.date,               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })



                } else {

                    confirmAlert({
                        title: 'Applying Leave Request Succeeded',                        // Title dialog
                        message: 'Leave Request Has Been Applied Successfully.',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })



                }
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
            error: function (data, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            }

        });
    }
    else if((this.state.fromDate.trim().length==0) || (this.state.toDate.trim().length==0)){
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Select Date',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
    }else if(this.state.leaveType.trim().length==0){
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

                    <h3>Company Leave:</h3> <br/> 
                    <table class="table" id="companyleavetable">
                    </table>

                    <h3>{this.state.companyType} Leave:</h3> <br/> 
                     <table  class="table" id="employeeleavetable">
                    </table>

                   

                    <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

                        <form id="fromDatelabel" style={{ paddingBottom: '20px', position: 'inline-block' }} >


                            <label htmlFor="fromDate" style={{ paddingRight: '53px' }}> From:</label>
                            <input
                                style={{ width: '50%' }}
                                type="text"
                                value={this.state.fromDate}
                                id="fromDate" name="fromDate"
                                readOnly
                                onChange={this.handleUserInput} />
                        </form>

                        <form id="toDatelabel" style={{ paddingBottom: '20px', position: 'inline-block' }}   >
                            <label
                                htmlFor="toDate"
                                style={{ paddingRight: '70px' }}> To:</label>

                            <input
                                style={{ width: '50%' }}
                                type="text"
                                value={this.state.toDate}
                                id="toDate" name="toDate"
                                readOnly
                                onSelect={this.handleUserInput} />


                        </form >

                        <form id="leavetypelabel" style={{ paddingBottom: '20px', position: 'inline-block' }}   >
                            <label
                                htmlFor="leavetype"
                                style={{ paddingRight: '30px' }}>LeaveType:</label>

                            <select style={{ width: '198px' }} name="leaveType" id="leavetype" onChange={this.handleUserInputLeaveType}
                                value={this.state.leaveType} required>
                                <option value="" disabled selected hidden >Select leave type</option>


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
                                    onClick={this.noOfDaysCalculate} onChange={this.handleUserInput}
                                    name="subject"
                                    id="subject"
                                    maxlength="75"
                                    placeholder="Your Subject.." required style={{ height: '50px', width: '100%' }} ></textarea>
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


                        <button type="button" id="submit" onClick={() => this.AddFunc()} class="btn btn-info">Submit</button>

                    </form>

                </div>
            </div>

        );
    }
}
export default MoreThanOneDay;

