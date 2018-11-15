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
import FooterText from './FooterText';
var testarray = [];
var companyType;
class ShiftUpdatePage extends Component {


    constructor() {

        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
         companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
         if(companyType=="Office"){
            companyType="Employee";
        }
        else{
            companyType="Student/Staff";
        }
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
            textarea: '',
            answer: '',
            copy: '',
            newShift: '',
            superiorId: superiorId,

        };
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
                        var flag="false";
                        var j=testarray.length;
                        while (j--) {
                         //   alert("j"+j);
                            if ( item.employeeId  == testarray[j]) {
                                flag="true";
                           //    alert("already exit")
                            }
                    
                          }
                          if(flag=="false"){
                            tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + '</option>';
                  
                          }else{
                            flag="false";
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


                    var flag="false";
                        var j=testarray.length;
                        while (j--) {
                           // alert("j"+j);
                            if ( item.employeeId  == testarray[j]) {
                                flag="true";
                           //    alert("already exit")
                            }
                    
                          }
                          if(flag=="false"){
                            tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + '</option>';
                  
                          }else{
                            flag="false";
                          }  });
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
                            var flag="false";
                            var j=testarray.length;
                            while (j--) {
                               // alert("j"+j);
                                if ( item.employeeId  == testarray[j]) {
                                    flag="true";
                                 //  alert("already exit")
                                }
                        
                              }
                              if(flag=="false"){
                                tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + '</option>';
                      
                              }else{
                                flag="false";
                              }
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
                        var flag="false";
                        var j=testarray.length;
                        while (j--) {
                            //alert("j"+j);
                            if ( item.employeeId  == testarray[j]) {
                                flag="true";
                           //    alert("already exit")
                            }
                    
                          }
                          if(flag=="false"){
                            tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + '</option>';
                  
                          }else{
                            flag="false";
                          }
                           });
                    $("#MasterSelectBox").append(tab);

                } else {
                    $("#MasterSelectBox").empty();
                }

            },

        });



    }


    componentDidMount() {

        testarray = [];
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
                        title: 'Shift Updation Failed',                        // Title dialog
                        message: 'The Employee’s Cannot Be Moved From One Shift To Another Because Your Organization Has Only One Shift Being Configured',               // Message dialog
                        confirmLabel: 'Ok',
                        // Text button confirm

                    });


                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route path="/" component={EmployeeMenuHeader} />
                                <Route path="/" component={ConfigurationPage} />
                                <Route path="/" component={FooterText} />

                            </div>
                        </Router>,
                        document.getElementById('root'));



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
            if (selectedOpts.length == 0) {
                e.preventDefault();
               var len=  $('#MasterSelectBox').children('option').length;
               if(len==0){
                    confirmAlert({
                        title: ' Error',                        // Title dialog
                        message: 'No '+companyType+' to Add',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
               }else{
               
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'Please Select '+companyType+' to Add',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }
            }

            

            $('#PairedSelectBox').append($(selectedOpts).clone())

            var selectedData = "";
            $('#MasterSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                testarray.push(selectedData);
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
                        message: 'No '+companyType+' to Remove',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
               }else{
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'Please Select '+companyType+' to Remove',               // Message dialog
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
                    message: 'No '+companyType+' to Add',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }

            $('#PairedSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
            $('#MasterSelectBox option').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                testarray.push(selectedData);
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
                    message: 'No '+companyType+' to Remove',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }
            $('#MasterSelectBox').append($(selectedOpts).clone());
            var selectedData = "";
            testarray.splice(0, testarray.length);

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
        dept += '<option  value="" disabled selected hidden>Select a department</option>';
        $.each(department, function (i, item) {

            dept += '<option value="' + item.department + '">' + item.department + '</option>'

        });
        dept += '<option value="">' + "--None--" + '</option>'
        $("#department").append(dept);
        window.scrollTo(0, 0);

    }


    Submit() {
        var self = this;
        
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.state.employeeId = testarray.toString();
       if((this.state.employeeId.length!=0) &&(this.state.newShift!=0)){
        
        this.setState({
            companyId: this.state.companyId,
            employeeId: this.state.employeeId.toString(),
            newShift: this.state.newShift,
        });



        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
                newShift: this.state.newShift,
                superiorId: this.state.superiorId,


            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/shiftmanagement",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                $("#PairedSelectBox").empty();
                self.SelectAll();
                confirmAlert({
                    title: 'Saved', // Title dialog
                    message: 'Successfully updated ', // Message dialog
                    confirmLabel: 'Ok', // Text button confirm
          
          
                  })

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            }

        });
    }else if(this.state.employeeId.length==0){

        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Select '+companyType +'.',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });

    }else{

        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Select Shift .',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
    }

    }


    BackbtnFunc() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={ConfigurationPage} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
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

                <h2>Update Shift Configuration</h2>

                <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

                    <div class="row">
                        <div class="col-sm-4">
                            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
                                <label>
                                    Role
      <select
                                        id="role"
                                        className="form-control role"
                                        onChange={this.handleUserInputRole}

                                        name="role"
                                        style={{ marginBottom: "15px" }}
                                    >
                                        <option value="" disabled selected hidden>Select your role</option>
                                    </select>
                                </label>

                            </div>


                        </div>

                        <div class="col-sm-4" style={{ marginTop: "10px" }}>
                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <label>
                                    Department
 <select
                                        id="department"
                                        className="form-control dept"

                                        onChange={this.handleUserInputDept}

                                        name="department"
                                        style={{ marginBottom: "15px" }}
                                    >
                                    </select>
                                </label>


                            </div></div>

                        <div class="col-sm-4">
                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <label>
                                    Shift
 <select
                                        id="shift"
                                        className="form-control shift"

                                        onChange={this.handleUserInputShift}

                                        name="shift"
                                        style={{ marginBottom: "15px" }}
                                    >
                                    </select>
                                </label>


                            </div>
                        </div>


                    </div>


                    <div id="divResult"></div>

                    <div class="row">
                        <div class="col-sm-5">
                            <select style={{ height: "100px" }} id="MasterSelectBox" multiple>
                            </select>
                        </div>

                        <div class="col-sm-2" style={{ marginTop: "05px" }}>
                            <button id="btnAdd" style={{ width: "95px" }} value=">">Add</button><br />
                            <button id="btnAddAll" style={{ width: "95px" }} value="<">Add All</button><br />
                            <button id="btnRemoveAll" style={{ width: "95px" }} value="<">RemoveAll</button><br />
                            <button id="btnRemove" style={{ width: "95px" }} value="<">Remove</button>
                        </div>


                        <div class="col-sm-5" id="object">
                            <select style={{ height: "100px", marginLeft: "0px" }} id="PairedSelectBox" multiple>
                            </select>
                        </div>
                    </div>
                    <br />
                    <br />

                    <div class="row">
                        <div class="col-sm-8">
                            <div></div>
                        </div>

                        <div class="col-sm-4">

                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <label>
                                    New Shift
 <select
                                        id="shiftChange"
                                        className="form-control shift"

                                        onChange={this.handleUserInputNewShift}

                                        name="newShift"
                                        style={{ marginBottom: "15px" }}
                                    >
                                    </select>
                                </label>


                            </div>
                        </div>

                    </div>


                    <div class="row">
                        <div class="col-sm-8">
                            <div></div>
                        </div>

                        <div class="col-sm-4">

                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <button
                                    type="button"
                                    onClick={() => this.Submit()}

                                    class="btn btn-success">Submit</button>

                            </div>
                        </div>

                    </div>


                </form>
            </div>

        );
    }

}
export default ShiftUpdatePage;


