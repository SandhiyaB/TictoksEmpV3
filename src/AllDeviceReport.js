
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

class AllDeviceReport extends Component {

    constructor() {
        super()

        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state = {
            
        };
    }

    Request() {

        var self = this;
        $.ajax({
            type: 'POST',
           // url:"http://localhost:8080/EmployeeAttendenceAPI/device/AllDeviceReport",
            url:"https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/AllDeviceReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
              //  console.log("data",data);
                if (data.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>DeviceId</th><th>CompanyId</th><th>Org Name</th><th>Device Key Status</th><th>Device Status</th><th>LastOnlineTime</th><th>LastOfflineTime</th><th>Device State</th><th>DeActived Time</th></tr></thead>';
                    var bio;
                    var sms;
                    var rfid;

                    $.each(data, function (i, item) {
                       
                        if(item.keyStatus=="Not Using" ){
                            item.onlineTime="-";
                            item.offlineTime="-";
                        }
                        if(item.activeStatus=="Active"){
                            item.deactivatedTime='-';
                            
                        }
                        tab += '<tr class="success" ><td>' + item.deviceId + '</td><td>' + item.companyId + '</td><td>' + item.organizationName + '</td><td>' + item.keyStatus + '</td><td>' + item.deviceStatus + '</td><td>' + item.onlineTime + '</td><td>' + item.offlineTime + '</td><td>' + item.activeStatus + '</td><td>' + item.deactivatedTime + '</td></tr>';
                    });
                    $("#tableHeadings").append(tab);
                   
                } else {
                    $("#tableHeadings").append('<h3 align="center">No Devices</h3>');
                }

            }
        });
    }

    componentDidMount() {
        this.Request();
        window.scrollTo(0, 0);
        

    }

   



    render() {
        return (


            <div className="container">

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Device Report</h3>
                <div id="tableOverflow">
                <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
                </table>
                </div>
            </div>


        );
    }

}
export default AllDeviceReport;