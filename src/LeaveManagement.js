
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
import EmployeeMenuHeader from './EmployeeMenuHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import OneDay from './OneDay';
import MoreThanOneDay from './MoreThanOneDay';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import FooterText from './FooterText';

class LeaveManagement extends Component {


    constructor(props) {
        super(props)

        this.state = {
            date: '',
            noOfDays: '',
            fromDate: '',
            toDate: '',


        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,

        });

        if (value == "oneday") {
            ReactDOM.render(
                <Router >
                    <div>
                        <Route path="/" component={EmployeeMenuHeader} />
                        <Route path="/" component={AttendanceRegulationMenuPage} />

                        <Route path="/" component={OneDay} />
                        <Route path="/" component={FooterText} />
                    </div>
                </Router>, document.getElementById('root'));
            registerServiceWorker();
        } else {
            ReactDOM.render(
                <Router >
                    <div>
                        <Route path="/" component={EmployeeMenuHeader} />
                        <Route path="/" component={AttendanceRegulationMenuPage} />

                        <Route path="/" component={MoreThanOneDay} />
                        <Route path="/" component={FooterText} />
                    </div>
                </Router>, document.getElementById('root'));

        }

    }
    Submit(){
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Select One Or More Than One Day',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
    }
    render() {

        return (


            <div className="container" style={{ marginBottom: '30%' }}>
                <div class="jumbotron">
                    <h3   style={{ marginTop: '-65px' }}>Leave Form</h3>

                    <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

                        <form id="mainform" >
                            <label for="radiobutton" >
                                Days Of Leave To Be Opted:
</label>
                            <br />
                            <input type="radio" id="radio1" name="dayselection" value="oneday" onChange={this.handleUserInput} />1 Day
                          <input style={{ marginLeft: '10%' }} type="radio" id="radio2" name="dayselection" value="morethanoneday" onChange={this.handleUserInput} />More Than OneDay
            </form>
                        <form id="subjectlabel" >

                            <label for="subject" >
                                Subject:
</label>
                            <div >
                                <textarea id="address"
                                    name="subject"
                                    id="subject"
                                    maxlength="175"
                                    placeholder="Your Subject.." required style={{ height: '50px', width: '100%' }} />                             </div>
                        </form>
                        <form id="reasonlabel" >

                            <label for="reason" >
                                Reason:
        </label>

                            <div >
                                <textarea id="address"
                                    name="reason"
                                    id="reason"
                                    maxlength="550"
                                    placeholder="Your reason.." required style={{ height: '150px', width: '100%' }}></textarea>
                            </div>

                        </form>
                        <button type="button" id="submitAttendanceReg"  onClick={() => this.Submit()} class="btn btn-info">Submit</button>

                    </form>
                </div>
            </div>
        );
    }
}
export default LeaveManagement;
