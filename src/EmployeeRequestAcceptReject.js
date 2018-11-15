
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulation from './AttendanceRegulation';
import AttendanceDisplay from './AttendanceDisplay';
import EmployeeMenuPage from './EmployeeMenuPage';
import AttendanceRegulationSupervisor from './AttendanceRegulationSupervisor';
import './Maintenance.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';
import CryptoJS from 'crypto-js';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';
import FooterText from './FooterText';

class EmployeeRequestAcceptReject extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    AttendanceRequest() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeRequestAcceptReject} />
                    <Route path="/" component={EmployeeAttendanceRequest} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }



    LeaveRequest() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeRequestAcceptReject} />
                    <Route path="/" component={EmployeeLeaveRequest} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }
    componentDidMount() {
        this.AttendanceRequest();
        window.scrollTo(0, 0);

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

                <div id='horMenu'>
                    <ul  id='horMenunew'>
                        <li><a className="active" onClick={() => this.AttendanceRequest()}><span style={{display:"inline-grid"}} class="glyphicon glyphicon-envelope">Attendance Regularization Request</span></a></li>
                        <li><a onClick={() => this.LeaveRequest()}><span style={{display:"inline-grid"}} class="glyphicon glyphicon-envelope"> Leave Request</span></a></li>

                    </ul>

                </div>
              


            </div>




        );
    }

}


export default EmployeeRequestAcceptReject;
