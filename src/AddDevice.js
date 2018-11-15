

import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import './LoginPage.css';
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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';

import Switch from 'react-toggle-switch';
var bio;
var sms;
var rfid;
var inputarray = [];
class AddDevice extends Component {


    constructor(props) {

        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('TempEmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        super(props)
        this.state = {
            biometric: true,
            sms: true,
            rfid: false,
            superiorId: superiorId,
        }
    }
    handleOrganization = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
        $("#menu").show();

    }

    ToggleSwitchBio = () => {
        this.setState(prevState => {
            return {
                biometric: !prevState.biometric
            };
        });


    };
    ToggleSwitchSMS = () => {
        this.setState(prevState => {
            return {
                sms: !prevState.sms
            };
        });


    };
    ToggleSwitchRFID = () => {
        this.setState(prevState => {
            return {
                rfid: !prevState.rfid
            };
        });


    };

    GetList() {
        $.ajax({
            type: 'POST',
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/OrganizationName",
            //url: "http://localhost:8080/EmployeeAttendenceAPI/device/OrganizationName",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                var tab;
                $.each(data, function (i, item) {

                    var feed = JSON.stringify({
                        compId: item.companyId,
                        orgname: item.organizationName
                    });
                    inputarray.push(feed);
                    tab += '<option value= "' + item.companyId + '">' + item.companyId + " " + item.organizationName + '</option>';
                });
                $("#companyId").append(tab);
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

    AddDeviceFunc() {

        if (this.state.companyId.length > 0) {
            if (this.state.biometric == false) {
                bio = 0;
            } else {
                bio = 1;
            }

            if (this.state.sms == false) {
                sms = 0;
            } else {
                sms = 1;
            }

            if (this.state.rfid == false) {
                rfid = 0;
            } else {
                rfid = 1;
            }
            for (var k = 0; k < inputarray.length; k++) {
                var temp = JSON.parse(inputarray[k]);
                if (temp.compId == this.state.companyId) {
                    this.state.organizationName = temp.orgname;
                    this.setState({
                        organizationName: temp.orgname

                    })
                    break;
                }
            }
            var self = this;
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    superiorId: this.state.superiorId,
                    biometric: bio,
                    sms: sms,
                    rfid: rfid,
                    companyId: this.state.companyId,
                    organizationName: this.state.organizationName,
                }),
                 url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/DeviceMail/AddDevice",
               // url: "http://localhost:8080/EmployeeAttendenceAPI/DeviceMail/AddDevice",

                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    confirmAlert({
                        title: 'Success',                        // Title dialog
                        message: 'Successfully Send Verification code to the Mail For the Device ' + data.deviceId,               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });

                    $('[name=companyId]').val('');
                    self.state.companyId = "";
                    self.state.biometric = true;
                    self.state.sms = true;
                    self.state.rfid = false;
                    $("#menu").hide();


                },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                },
            });
        } else {
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Select Organisation ',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });

        }

    }


    componentDidMount() {

        window.scrollTo(0, 0);

        var self = this;
        this.GetList();
        $("#menu").hide();

    }

    render() {


        return (
            <div className="container"
                style={{ backgroundColor: "#edf5e1" }}>

                <div class="jumbotron"  >
                    <h2 style={{ textAlign: "center" }}>Add Device</h2>
                    <div class="form-group" style={{ width: "fit-content" }}>

                        <label for="companyId"> Organization Name *</label>

                        <select id="companyId" className="form-control dept"
                            value={this.state.companyId} onChange={this.handleOrganization} name="companyId">
                            <option value="" disabled selected hidden >Select an Organization Name</option>
                        </select><br />

                        <div id="menu">
                            <h3 > {this.state.organizationName} Device Status</h3>
                            <table class="table">
                                <tbody>


                                    <tr>
                                        <td>BIO</td>
                                        <td>  <Switch name="biometric" onClick={this.ToggleSwitchBio} on={this.state.biometric} />
                                        </td>
                                    </tr>

                                    <tr>

                                        <td> SMS</td>
                                        <td>  <Switch name="sms" onClick={this.ToggleSwitchSMS} on={this.state.sms} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>RFID</td>
                                        <td>   <Switch name="rfid" onClick={this.ToggleSwitchRFID} on={this.state.rfid} />
                                        </td>
                                    </tr>

                                    <button type="button" onClick={() => this.AddDeviceFunc()} className="btn btn-primary" style={{ marginBottom: "45px" }}>Add Device</button><br />

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>

        );
    }

}
export default AddDevice;
