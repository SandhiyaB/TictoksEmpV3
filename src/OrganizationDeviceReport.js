
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
import ReportMenuPage from './ReportMenuPage';


class OrganisationDeviceReport extends Component {

    constructor() {
        super()

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state = {
            companyId:companyId,
        };
    }

    Request() {

        var self = this;
        $.ajax({
            type: 'POST',
            data:JSON.stringify({
                companyId:this.state.companyId,
            }),
            // url:"http://localhost:8080/EmployeeAttendenceAPI/device/DeviceReportIndividual",
            url:"https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/DeviceReportIndividual",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
              //  console.log("data",data);
                if (data.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>DeviceId</th><th>Device Status</th><th>Date</th></tr></thead>';
                    
                    $.each(data, function (i, item) {
                       
                        
                        tab += '<tr class="success" ><td>' + item.deviceId + '</td><td>' + item.deviceStatus + '</td><td>' + item.date + '</td></tr>';
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
                <h3 className="centerAlign" style={{ textAlign: "center" }}>Device Report</h3>
                <div id="tableOverflow">
                <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
                </table>
                </div>
            </div>


        );
    }

}
export default OrganisationDeviceReport;