import React, { Component } from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import NoAttendanceRequest from './NoAttendanceRequest';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import FooterText from './FooterText';
import { isFunction } from 'util';
import Switch from 'react-toggle-switch';

class EditDevicePage extends Component {

    constructor() {
        super()
        var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);



        this.state = {
            deviceId: '',
            organizationName: '',

            BioDeviceVal: '',
            SmsDeviceVal: '',
            RFIDDeviceVal: '',

            NewBioDeviceVal: '',
            NewSmsDeviceVal: '',
            NewRFIDDeviceVal: '',

        };
    }

    Request() {

        var self = this;
        $.ajax({
            type: 'POST',

             url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/ListAllDevice",
           // url: "http://localhost:8080/EmployeeAttendenceAPI/device/ListAllDevice",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>DeviceId</th><th>CompanyId</th><th>Org Name</th><th>Biometric</th><th>SMS</th><th>RFID</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';
                    var bio;
                    var sms;
                    var rfid;


                    $.each(data, function (i, item) {

                        if (item.biometric == 0) {
                            bio = "Disabled";
                        } else {
                            bio = "Enabled";
                        }
                        if (item.sms == 0) {
                            sms = "Disabled";
                        } else {
                            sms = "Enabled";
                        }
                        if (item.rfid == 0) {
                            rfid = "Disabled";
                        } else {

                            rfid = "Enabled";
                        }
                        tab += '<tr class="success" ><td>' + item.deviceId + '</td><td>' + item.companyId + '</td><td>' + item.organizationName + '</td><td >' + bio + '</td><td>' + sms + '</td><td>' + rfid + '</td> <td><button  class="updatedevice" id="updatedevice" > Update</button></td><td><button   class="RemoveDevice"> Remove</button></td></tr>';

                    });

                    $("#tableHeadings").append(tab);

                } else {
                    $("#tableHeadings").append('<h3 align="center">No Devices</h3>');
                }

            }
        });
    }


    componentDidMount() {
        $("#DeviceStatus").hide();


        this.Request();
        window.scrollTo(0, 0);
        var self = this;
        var Currentbioval;
        var Smsbioval;
        var RFIDbioval;
        var deviceIdval;

        $(document).ready(function () {

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.updatedevice', function () {

                $("#DeviceStatus").show();
                // get the current row
                var currentRow = $(this).closest("tr");

                /* 
                                self.state.employeeId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                                self.state.checkInTime = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                              */
                deviceIdval = currentRow.find("td:eq(0)").text();
                self.state.deviceId = deviceIdval;
                self.state.companyId=currentRow.find("td:eq(1)").text();

                self.state.organizationName = currentRow.find("td:eq(2)").text();

                Currentbioval = currentRow.find("td:eq(3)").text();
                if (Currentbioval == "Enabled") {
                    self.state.BioDeviceVal = 1
                    self.state.NewBioDeviceVal = 1
                } else {
                    self.state.BioDeviceVal = 0
                    self.state.NewBioDeviceVal = 0
                }

                Smsbioval = currentRow.find("td:eq(4)").text();
                if (Smsbioval == "Enabled") {
                    self.state.SmsDeviceVal = 1
                    self.state.NewSmsDeviceVal = 1

                } else {
                    self.state.SmsDeviceVal = 0
                    self.state.NewSmsDeviceVal = 0
                }

                RFIDbioval = currentRow.find("td:eq(5)").text();
                if (RFIDbioval == "Enabled") {
                    self.state.RFIDDeviceVal = 1
                    self.state.NewRFIDDeviceVal = 1
                } else {
                    self.state.RFIDDeviceVal = 0
                    self.state.NewRFIDDeviceVal = 0
                }



                self.setState({
                    deviceId: self.state.deviceId,
                    companyId: self.state.companyId,
                    BioDeviceVal: self.state.BioDeviceVal,
                    SmsDeviceVal: self.state.SmsDeviceVal,
                    RFIDDeviceVal: self.state.RFIDDeviceVal,
                   NewBioDeviceVal: self.state.NewBioDeviceVal,
                    NewSmsDeviceVal: self.state.NewSmsDeviceVal,
                    NewRFIDDeviceVal: self.state.NewRFIDDeviceVal,

                })



            });
        });
        // code to read selected table row cell data (values).
        $("#tableHeadings").on('click', '.RemoveDevice', function () {
 // get the current row
            var currentRow = $(this).closest("tr");
            deviceIdval = currentRow.find("td:eq(0)").text();
            self.state.deviceId = deviceIdval;

            self.state.companyId = currentRow.find("td:eq(1)").text();

           confirmAlert({
                title: ' Remove Device ',                        // Title dialog
                message: 'Are You Sure Do You Want To Remove ' + deviceIdval+ " ? " ,               // Message dialog
                confirmLabel: 'Confirm',                           // Text button confirm
                cancelLabel: 'Cancel',                             // Text button cancel
                onConfirm: () => { self.RemoveDeviceConf() },    // Action after Confirm
                onCancel: () => { self.NoAction() },      // Action after Cancel
            })
        });

    }

    NoAction() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={EmployeeMenuHeader} />

                    <Route path="/" component={EditDevicePage} />
                    <Route path="/" component={FooterText} />


                </div>
            </Router>, document.getElementById('root'));

    }
    Submit() {

         var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('TempEmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        this.state.superiorId = superiorId;
        this.setState({
             superiorId: superiorId,
        });
        var self = this;

        if ((this.state.BioDeviceVal != this.state.NewBioDeviceVal) || (this.state.SmsDeviceVal != this.state.NewSmsDeviceVal) || (this.state.RFIDDeviceVal != this.state.NewRFIDDeviceVal)) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                  
                deviceId: this.state.deviceId,
                biometric: this.state.NewBioDeviceVal,
                sms: this.state.NewSmsDeviceVal,
                rfid: this.state.NewRFIDDeviceVal,
                companyId: this.state.companyId,
                superiorId: this.state.superiorId,
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/UpdateDeviceBioSmsRfid",
               // url: "http://localhost:8080/EmployeeAttendenceAPI/device/UpdateDeviceBioSmsRfid",

                contentType: "application/json",
                dataType: 'json',
                async: false,

                success: function (data, textStatus, jqXHR) {
                    $("#tableHeadings").empty();

                    confirmAlert({
                        title: 'Success',                        // Title dialog
                        message: 'Changes saved Successfully',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                    $("#DeviceStatus").hide();


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
        else {
            confirmAlert({
                title: 'Already Eixts',                        // Title dialog
                message: 'Already Eixts',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });

        }

        this.Request();



    }

    RemoveDeviceConf(){
       var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('TempEmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

       this.state.superiorId = superiorId;
        this.setState({
             superiorId: superiorId,
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                deviceId: this.state.deviceId,
                companyId: this.state.companyId,
                superiorId: this.state.superiorId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/DeactivateDevice",
           // url: "http://localhost:8080/EmployeeAttendenceAPI/device/DeactivateDevice",

            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                $("#tableHeadings").empty();

                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Successfully Removed '+self.state.deviceId +' Device',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
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
        this.Request();
    }




    CancelUpdate() {

        $("#DeviceStatus").hide();

    }

    toggleBioMode = () => {

        if (this.state.NewBioDeviceVal == 0) {
            this.state.NewBioDeviceVal = 1;


            this.setState({
                NewBioDeviceVal: 1,

            })
        } else {
            this.state.NewBioDeviceVal = 0;

            this.setState({
                NewBioDeviceVal: 0,
            })
        }
    };

    toggleRFIDMode = () => {

        if (this.state.NewRFIDDeviceVal == 0) {
            this.state.NewRFIDDeviceVal = 1;

            this.setState({
                NewRFIDDeviceVal: 1,
            })
        } else {
            this.state.NewRFIDDeviceVal = 0;

            this.setState({
                NewRFIDDeviceVal: 0,
            })
        }
    };

    toggleSMSMode = () => {

        if (this.state.NewSmsDeviceVal == 0) {
            this.state.NewSmsDeviceVal = 1;

            this.setState({
                NewSmsDeviceVal: 1,
            })
        } else {
            this.state.NewSmsDeviceVal = 0;

            this.setState({
                NewSmsDeviceVal: 0,
            })
        }
    };

    render() {
        return (


            <div className="container">


                <div id="DeviceStatus">
                    <div class="jumbotron" style={{ marginTop: "-40px" }}  >
                        <h2> {this.state.organizationName} Device Status</h2>
                        <table class="table">
                            <tbody>


                                <tr>
                                    <td>BIO</td>
                                    <td><Switch id="BioDeviceVal" onClick={() => this.toggleBioMode()} on={this.state.NewBioDeviceVal} /> </td>
                                </tr>

                                <tr>

                                    <td> SMS</td>
                                    <td> <Switch id="SmsDeviceVal" onClick={() => this.toggleSMSMode()} on={this.state.NewSmsDeviceVal} /> </td>
                                </tr>
                                <tr>
                                    <td>RFID</td>
                                    <td> <Switch id="RFIDDeviceVal" onClick={() => this.toggleRFIDMode()} on={this.state.NewRFIDDeviceVal} /> </td>
                                </tr>
                                <tr>
                                <button onClick={() => this.Submit()} style={{marginLeft:"5px"}} id="submit">Submit</button>
                                <button onClick={() => this.CancelUpdate()} style={{marginLeft:"5px"}}  id="CancelUpdate">Cancel</button>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <h3 className="centerAlign" style={{ textAlign: "center" }}>Device List</h3>
                <div id="tableOverflow">
                    <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
                    </table>

                </div>
            </div>


        );
    }

}
export default EditDevicePage;