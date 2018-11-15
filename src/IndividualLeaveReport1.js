import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import DailyOrganizationAttendanceReport from './DailyOrganizationAttendanceReport';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';
import './LeaveTypeCss.css';
import testLeaveReport from './testLeaveReport';
import IndividualLeaveHistory1 from './IndividualLeaveHistory1';
import OrganizationLeaveHistory from './OrganizationLeaveHistory';
import LeaveReport1 from './LeaveReport1';


class IndividualLeaveReport1 extends Component {

  constructor() {
    super()

    var today = new Date();
    //today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var year=today.getFullYear() ;
    this.state = {

      date: today,
      companyId: '',
      year:year,

    };
  }



BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
                     <Route path="/" component={ReportMenuPage}/>
                     <Route path="/" component={FooterText} />

                             </div>
                                  </Router>,
                                            document.getElementById('root'));
                                            registerServiceWorker();
                                        }   



LeaveReport(){
  ReactDOM.render(
    <Router>
      <div>

        <Route path="/" component={EmployeeMenuHeader} />
        <Route path="/" component={LeaveReport1} />
        <Route path="/" component={FooterText} />

      </div>
    </Router>,
    document.getElementById('root'));
  registerServiceWorker();


}
LeaveHistory(){
  ReactDOM.render(
    <Router>
      <div>

        <Route path="/" component={EmployeeMenuHeader} />
        <Route path="/" component={IndividualLeaveHistory1} />
        <Route path="/" component={FooterText} />

      </div>
    </Router>,
    document.getElementById('root'));
  registerServiceWorker();


}


  render() {
    return (
      <div className="container" id="menucol" style={{ paddingTop: "5%", marginBottom: "10%" }}>
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


        <div className="col-sm-12 col-xs-12 col-lg-12" style={{ marginBottom: "10%" }}>


 
 <div id='horMenunew' >
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6", padding: "10px 0px!important" }}>
          <li><a style={{ padding: "10px 0px" }} className="active" onClick={() => this.LeaveReport()} ><span class="glyphicon glyphicon-th-large"> Leave_Report</span></a></li>
            <li><a style={{ padding: "10px 0px" }}  onClick={() => this.LeaveHistory()} ><span class="glyphicon glyphicon-th-large"> Leave_History</span></a></li>
                 </ul>

        </div>
    
 
 


  <div id="tableOverflow">
          <table style={{ margin: "auto" }} className="table" id="tableHeadings">
          </table>

        </div>




      </div>
      </div>

    );
  }

}
export default IndividualLeaveReport1;


