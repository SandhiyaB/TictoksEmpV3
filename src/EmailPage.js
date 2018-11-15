import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import RoleAddRemove from './RoleAddRemove';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import ConfigurationPage from './ConfigurationPage';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmailPage from './EmailPage';
import SmsTextPage from './SmsTextPage';
import FooterText from './FooterText';
var testarray = [];
var inputarray = [];
var emailArrary = [];
class EmergencyAlert extends Component {


    constructor() {

        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var sms = CryptoJS.AES.decrypt(localStorage.getItem('SMS'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 
      
        this.state = {
            department: '',
            TotalNoShift: '',
            shift: '',
            count: '',
            role: '',
            valid: false,
            companyId: '',
            superiorId: '',
            employeeId: [],
            message: '',
            answer: '',
            copy: '',

            superiorId: superiorId,
            sms:sms,
            authPassword:'',

        };
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    handleUserInputRole = (e) => {
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var count;
        const name = e.target.name;
        const value = e.target.value;
        this.state.role = value;
        this.state.companyId = companyId;
        this.setState({
            companyId: this.state.companyId,
            role: this.state.role,
            department: this.state.department,
            shift: this.state.shift,
        })

        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                role: this.state.role,
                department: this.state.department,
                shift: this.state.shift,


            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/selectempidnewone ",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.length != 0) {
                    var tab;

                    $("#MasterSelectBox").empty();
                    $.each(data, function (i, item) {
                        var flag = "false";
                        var j = testarray.length;
                      //  alert("j" + j);
                        while (j--) {
                            if (item.employeeId == testarray[j]) {
                                flag = "true";
                             //   alert("already exit")
                            }

                        }
                        if (flag == "false") {
                            tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.emailId + '</option>';

                        } else {
                            flag = "false";
                        }
                    });
                    $("#MasterSelectBox").append(tab);

                } else {
                    $("#MasterSelectBox").empty();
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

    handleUserInputDept = (e) => {
        var count;
        const name = e.target.name;
        const value = e.target.value;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state.department = value;
        this.state.companyId = companyId;
        this.setState({
            companyId: this.state.companyId,
            role: this.state.role,
            department: this.state.department,
            shift: this.state.shift,

        })


        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                department: this.state.department,
                role: this.state.role,
                shift: this.state.shift,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/selectempidnewone",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.length != 0) {
                    var tab;


                    $("#MasterSelectBox").empty();
                    $.each(data, function (i, item) {
                        var flag = "false";
                        var j = testarray.length;

                        while (j--) {
                          //  alert("j" + j);
                            if (item.employeeId == testarray[j]) {
                                flag = "true";
                             //   alert("already exit")
                            }

                        }
                        if (flag == "false") {

                            /* var feed=JSON.stringify({
                            empId: item.employeeId,
                            emailId:item.emailId});
                            inputarray.push(feed);
                            console.log("afetr add",inputarray)
                            */
                            tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.emailId + '</option>';
                            //tab += '<option value= "{ \'empId\': \'' + item.employeeId + ' \' , \'emailId\' : \'' + item.emailId + '\'}">' + item.employeeId + " " + item.employeeName + " " + item.emailId + '</option>';

                        } else {
                            flag = "false";
                        }
                    });
                    $("#MasterSelectBox").append(tab);

                } else {
                    $("#MasterSelectBox").empty();
                }

            },

        });


    }


    handleUserInputShift = (e) => {
        var count;
        const name = e.target.name;
        const value = e.target.value;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        if (value == "all") {
            $('[name=shift]').val('all');
            $('[name=role]').val('');
            $('[name=department]').val('');
            this.state.role = "";
            this.state.department = "";
            this.state.shift = "";
            this.setState({
                role: this.state.role,
                department: this.state.department,
                shift: this.state.shift,
            });

            this.SelectAll();

        } else {
            this.state.shift = value;
            this.state.companyId = companyId;
            this.setState({
                companyId: this.state.companyId,
                role: this.state.role,
                department: this.state.department,
                shift: this.state.shift,

            })

            var self = this;
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId: this.state.companyId,
                    shift: this.state.shift,
                    role: this.state.role,
                    department: this.state.department,

                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/selectempidnewone",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    if (data.length != 0) {
                        var tab;

                        $("#MasterSelectBox").empty();
                        $.each(data, function (i, item) {
                            var flag = "false";
                            var j = testarray.length;
                            while (j--) {
                              //  alert("j" + j);
                                if (item.employeeId == testarray[j]) {
                                    flag = "true";
                               //     alert("already exit")
                                }

                            }
                            if (flag == "false") {
                                /* var feed=JSON.stringify({
                                empId: item.employeeId,
                                emailId:item.emailId});
                                inputarray.push(feed);
                                console.log("afetr add",inputarray)
                                
                                */

                                tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.emailId + '</option>';

                            } else {
                                flag = "false";
                            }
                            // tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.emailId + '</option>';
                        });
                        $("#MasterSelectBox").append(tab);

                    } else {
                        $("#MasterSelectBox").empty();
                    }

                },



            });

        }

    }

    handleUserInputNewShift = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });


    }

    SelectAll() {
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,


            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/SelectAllEmployee",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.length != 0) {
                    var tab;


                    $("#MasterSelectBox").empty();
                    $.each(data, function (i, item) {
                        var feed = JSON.stringify({
                            empId: item.employeeId,
                            emailId: item.emailId
                        });
                        inputarray.push(feed);
                        //console.log("afetr add",inputarray)
                        tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.emailId + '</option>';
                    });
                    $("#MasterSelectBox").append(tab);

                } else {
                    $("#MasterSelectBox").empty();
                }

            },

        });



    }
    myFunction() {
        var x = document.getElementById("authPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    componentDidMount() {



        testarray = [];
        emailArrary = [];

        inputarray = [];
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        this.state.companyId = companyId;
        this.setState({
            companyId: this.state.companyId,

        })
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/selectTotalNoShift",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.totalShift == '1') {

                    confirmAlert({
                        title: 'Shift Config', // Title dialog
                        message: 'Only one shift only', // Message dialog
                        confirmLabel: 'Ok',
                        // Text button confirm

                    });

                   


                } else {


                    var shift = data.totalShift;
                    var option = '<option value="" disabled selected hidden>' + "Select a Shift" + '</option>'
                    for (var i = 1; i <= shift; i++) {
                        option += '<option value="' + i + '">' + "shift" + i + '</option>'
                    }
                    var ault = "none";
                    var option1 = option;
                    option += '<option value="all" >' + "All" + '</option>'

                    $("#shift").append(option);
                    $("#shiftChange").append(option1);
                }
            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
            }


        }),
            $('[name=shift]').val('all');
        this.SelectAll();

        $('#btnAdd').click(function (e) {
            var selectedOpts = $('#MasterSelectBox option:selected');
            var i = testarray.length;

            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len=  $('#MasterSelectBox').children('option').length;
                if(len==0){
                     confirmAlert({
                         title: ' Error',                        // Title dialog
                         message: 'No Recipients to Add',               // Message dialog
                         confirmLabel: 'Ok',                           // Text button confirm
                     });
                }else{
                
                 confirmAlert({
                     title: ' Error',                        // Title dialog
                     message: 'Please Select Recipients to Add',               // Message dialog
                     confirmLabel: 'Ok',                           // Text button confirm
                 });
                }
            }

            $('#PairedSelectBox').append($(selectedOpts).clone())

            var selectedData = "";
            var flag = "false";
            $('#MasterSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                testarray.push(selectedData);


                for (var k = 0; k < inputarray.length; k++) {
                    // console.log("inp",inputarray);
                    var temp = JSON.parse(inputarray[k]);
                    // console.log("inpy",temp.empId);
                    if (temp.empId == selectedData) {
                        emailArrary.push(temp.emailId);
                      /*   console.log("emailArray" + emailArrary);
                        console.log("empIdArray" + testarray);
 */
                    }
                }

                /* while (i--) {
                if (selectedData == testarray[i]) {
                flag="true";
                alert("ft"+selectedData.emailId+" "+selectedData.empId);
                }
                
                }
                if(flag=="false"){
                testarray.push(selectedData);
                $('#PairedSelectBox').append($(selectedOpts).clone())
               
                }else{
                flag="false";
                } */

                /* console.log("da",selectedData.empId,"strin",JSON.parse(selectedData));
                //alert("arr"+JSON.parse(selectedData));
                selectedData=JSON.stringify(selectedData);
                selectedData=JSON.parse(selectedData);
                
                alert("arr"+selectedData.emailId);
                
                alert("ft"+selectedData.emailId+" "+selectedData.empId);
                */
            });


            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnRemove').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len=  $('#PairedSelectBox').children('option').length;
                if(len==0){
                     confirmAlert({
                         title: ' Error',                        // Title dialog
                         message: 'No Recipients to Remove',               // Message dialog
                         confirmLabel: 'Ok',                           // Text button confirm
                     });
                }else{
                 confirmAlert({
                     title: ' Error',                        // Title dialog
                     message: 'Please Select Recipients to Remove',               // Message dialog
                     confirmLabel: 'Ok',                           // Text button confirm
                 });
             }
            }

            $('#MasterSelectBox').append($(selectedOpts).clone());


            var selectedData = "";
            $('#PairedSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                for (var i = testarray.length - 1; i >= 0; i--) {
                    if (testarray[i] === selectedData) {
                        testarray.splice(i, 1);
                        emailArrary.splice(i, 1);
                       /*  console.log("emailArray" + emailArrary);
                        console.log("empIdArray" + testarray);
 */
                    }
                }
            });


            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnAddAll').click(function (e) {

            var selectedOpts = $('#MasterSelectBox option');


            if (selectedOpts.length == 0) {
                e.preventDefault();
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'No Recipients to Add',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }

            $('#PairedSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
        //    console.log("bef", testarray);
            $('#MasterSelectBox option').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                testarray.push(selectedData);
                // console.log("aft",testarray);
               // alert("hi" + testarray);
                for (var k = 0; k < inputarray.length; k++) {
                   // console.log("inp", inputarray);
                    var temp = JSON.parse(inputarray[k]);
                    //console.log("inpy",temp.empId);
                    if (temp.empId == selectedData) {
                        emailArrary.push(temp.emailId);
                      //  console.log("emailArray" + emailArrary);
                      //  console.log("empIdArray" + testarray);

                    }
                }
            });
            $("#seperateddata").append(selectedData);

            $(selectedOpts).remove();
            e.preventDefault();


        });


        $('#btnRemoveAll').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'No Recipients to Remove',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }
            inputarray = [];
            $('#MasterSelectBox').append($(selectedOpts).clone());
            var selectedData = "";
            testarray.splice(0, testarray.length);
            emailArrary.splice(0, emailArrary.length);
           // console.log("emailArray" + emailArrary);
          //  console.log("empIdArray" + testarray);

            $(selectedOpts).remove();
            e.preventDefault();
        });

        var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        var role;
        role += '<option disabled selected hidden >Select a role</option>';
        $.each(Role, function (i, item) {

            role += '<option value="' + item.role + '">' + item.role + '</option>'

        });
        role += '<option value="">' + "--None--" + '</option>'

        $("#role").append(role);


        var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        var dept;
        dept += '<option value="" disabled selected hidden>Select a department</option>';
        $.each(department, function (i, item) {

            dept += '<option value="' + item.department + '">' + item.department + '</option>'

        });
        dept += '<option value="">' + "--None--" + '</option>'
        $("#department").append(dept);
        window.scrollTo(0, 0);

    }


    Submit() {
        var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        if(password==this.state.authPassword){
               
        var self = this;
       // console.log("da", testarray.length)
        if (testarray.length != 0) {
            if (this.state.message != "") {
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                this.state.companyId = companyId;
                this.state.employeeId = testarray.toString();
                this.state.mailIdList = emailArrary.toString();
                this.setState({
                    companyId: this.state.companyId,
                    employeeId: this.state.employeeId.toString(),
                    mailIdList: this.state.mailIdList,
                });

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        companyId: this.state.companyId,
                        sendTo: this.state.mailIdList,
                        employeeId: this.state.employeeId.toString(),
                        superiorId: this.state.superiorId,
                        message: this.state.message,

                    }),
                    url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/MessageCenter/SendMail",
                    // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/MessageCenter/SendSms",
                    contentType: "application/json",
                    dataType: 'json',
                    async: false,

                    success: function (data, textStatus, jqXHR) {
                        $("#PairedSelectBox").empty();
                        testarray = [];
                        emailArrary = [];

                        inputarray = [];
                        self.state.message = "";
                        self.SelectAll();

                        confirmAlert({
                            title: 'Success', // Title dialog
                            message: 'Message Sent Succerssfully. ', // Message dialog
                            confirmLabel: 'Ok', // Text button confirm


                        });

                    },
                    error: function (data) {
                        confirmAlert({
                            title: 'No Internet',                        // Title dialog
                            message: 'Network Connection Problem',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                          });
                    }

                });

            } else {
                confirmAlert({
                    title: ' Error', // Title dialog
                    message: 'Please Enter your message', // Message dialog
                    confirmLabel: 'Ok', // Text button confirm


                });
            }
        } else {
            confirmAlert({
                title: ' Error', // Title dialog
                message: 'Recipients is not Selected', // Message dialog
                confirmLabel: 'Ok', // Text button confirm

            });
            
        }
    }else{
        confirmAlert({
            title: 'Authentication Failed', // Title dialog
            message: 'Password Incorrect Try Again ', // Message dialog
            confirmLabel: 'Ok', // Text button confirm


        });

    }



    }


    BackbtnFunc() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeMenuPage} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }
    EmailAlert() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmailPage} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }
    MessageAlert() {
        if(this.state.sms==1){
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={EmployeeMenuHeader} />
                        <Route path="/" component={SmsTextPage} />
                        <Route path="/" component={FooterText} />
    
                    </div>
                </Router>,
                document.getElementById('root'));
            registerServiceWorker();
            }else{
                confirmAlert({
                    title: ' Permission Deined', // Title dialog
                    message: 'You Dont have Subscribed SMS.', // Message dialog
                    confirmLabel: 'Ok', // Text button confirm
    
    
                });
            }
    }


    render() {


        return (

            <div class="container" style={{ marginBottom: "30%" }}>

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


                <h3 className="centerAlign" style={{ textAlign: "center" }}>Email Message</h3>

                <div id='horMenunew' >
             {/*    <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>
                */}     <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active" onClick={() => this.EmailAlert()} ><span class="glyphicon glyphicon-envelope">Email</span></a></li>
                        <li><a onClick={() => this.MessageAlert()}><span class="fa fa-comments">SMS </span> </a></li>
                    </ul>

                </div>

                {/*                 <div id='horMenu'>
                    <ul>
                        <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={() => this.EmailAlert()}><span className="glyphicon glyphicon-envelope">Email</span></a></li>
                        <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={() => this.MessageAlert()}><span className="glyphicon glyphicon-th-large">SMS
 </span></a></li>
                    </ul>
                </div> */}

                <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

                    <div class="row">
                        <div class="col-sm-4" >
                            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginBottom: "10px" }} >
                                <label>
                                    Role
 <select
                                        id="role"
                                        className="form-control role"
                                        onChange={this.handleUserInputRole}

                                        name="role"
                                        style={{ marginBottom: "0px" }}
                                    >
                                        <option value="" disabled selected hidden>Select your role</option>
                                    </select>
                                </label>

                            </div>


                        </div>

                        <div class="col-sm-4" style={{ marginBottom: "10px" }}>
                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <label>
                                    Department
 <select
                                        id="department"
                                        className="form-control dept"

                                        onChange={this.handleUserInputDept}

                                        name="department"
                                        style={{ marginBottom: "0px" }}
                                    >
                                    </select>
                                </label>


                            </div></div>

                        <div class="col-sm-4">
                            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginBottom: "10px" }}>
                                <label>
                                    Shift
 <select
                                        id="shift"
                                        className="form-control shift"

                                        onChange={this.handleUserInputShift}

                                        name="shift"
                                        style={{ marginBottom: "0px" }}
                                    >
                                    </select>
                                </label>


                            </div>
                        </div>


                    </div>


                    {/* <div id="divResult"></div>
 <label for="MasterSelectBox">Employee Details:</label>
 <div class="row">

 <div >
 <select style={{ height: "100px" }} id="MasterSelectBox" multiple>
 </select>
 </div>



 </div> */} <div id="divResult"></div>

                    <div class="row">
                        <div class="col-sm-5">
                            <select style={{ height: "100px" }} id="MasterSelectBox" multiple >
                            </select>
                        </div>

                        <div class="col-sm-2" style={{ marginTop: "5px", textAlign: "center" }}>
                            <button id="btnAdd" style={{ width: "95px" , marginBottom: "10px"}} value=">">Add</button><br />
                            <button id="btnAddAll" style={{ width: "95px" , marginBottom: "10px" }} value="<">Add All</button><br />
                            <button id="btnRemoveAll" style={{ width: "95px"  , marginBottom: "10px"}} value="<">RemoveAll</button><br />
                            <button id="btnRemove" style={{ width: "95px" , marginBottom: "10px" }} value="<">Remove</button>
                        </div>


                        <div class="col-sm-5" id="object">
                            <select style={{ height: "100px", marginLeft: "0px" }} id="PairedSelectBox" multiple>
                            </select>
                        </div>
                    </div>
                    <br />


                    <label for="comment">Message Content:</label>
                    <textarea
                        onChange={this.handleUserInput}
                        name="message"
                        placeholder="Your message.."
                        value={this.state.message}
                        required style={{ height: '200px' }}
                        class="form-control"
                        rows="5" id="message"
                    ></textarea>

                    <br />
                    <br />
                   {/*  <button type="button"
                        onClick={() => this.Submit()}
                        className="btn btn-primary"
                        style={{
                            marginLeft: "20px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "45px",
                            marginTop: "20px",
                            display: "block"
                        }}>
                        Submit</button>
 */}

            <button type="button"
                     class="btn btn-primary"
                     style={{
                        marginLeft: "20px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "45px",
                        marginTop: "20px",
                        display: "block"
                    }} 
                    data-toggle="modal" data-target="#myModal">
            Submit
            </button>
            <div class="modal fade" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Authentication</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>

                  <div class="modal-body" style={{display: "grid"}}>

                    <label for="firstName">
                      Enter Password*
        </label>
                   
                      {/*  <div>
                           <input type="text"
                            onChange={this.handleUserInput}
                            id="firstName"
                            name="firstName"
                            placeholder="*************"
                            value={this.state.firstName}
                            required /><span  class="glyphicon glyphicon-eye-close" ></span>
                           
                    </div> */}

                      {/*            <input id="password-field" placeholder="*************" type="password" class="form-control" name="password"  value="{this.state.password}" />
              <span style={divStyle} toggle="#password-field" class="glyphicon glyphicon-eye-close toggle-password"></span>
         */}
        <input type="password"
              onChange={this.handleUserInput}
              value={this.state.authPassword}
              id="authPassword"
              name="authPassword"
              placeholder="Enter the Password.." required />
        
                    
                      <input type="checkbox"  onClick={() => this.myFunction()}  />Show Password
        
        </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-info"  onClick={() => this.Submit()}
                        data-dismiss="modal">Submit</button>

                      <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button>
                    </div>

                  </div>
                </div>
              </div>
  
                    {/* 
                    <div class="row">
                         <div class="col-sm-4">

                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <button
                                    type="button"
                                   

                                    class="btn btn-success">Submit</button>

                            </div>
                        </div>

                    </div> */}
                </form>
               

            </div>





        );
    }

}
export default EmergencyAlert;







