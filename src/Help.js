import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './LoginPage.css';
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
//import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import EmployeeMenuPage from './EmployeeMenuPage';
import './AttendanceRegulation.css';
import FooterText from './FooterText';


class Help extends Component {


    constructor(props) {
        super(props)
        this.state = {
            date: '',
            checkInTime: '',
            checkOutTime: '',
            employeeId: '',
        }

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

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
        
        <div className="container " id="containerbody" style={{
        marginBottom: "20%",
        
        }}>
        
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
        <div className="jumbotron" id="containerbodyjumbo">
        
        <h2>Modules Of TicToks</h2>
        <div class="panel-group" id="accordion" style={{ backgroundColor: "rgb(125, 171, 126)" ,marginBottom:"20%"}}>
        
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Attendance</a>
        </h4>
        </div>
        <div id="collapse1" class="panel-collapse collapse ">
        <div class="panel-body" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
       <dl><dd>
       
       
        <div>Attendance can be recorded for the registered users in the received Biometric device.</div>
        <p></p>
        <dl>
        <dt><strong>Check-In:</strong></dt>
        <dd><div>In order to mark your in time, enter employee id and click on 'Check In' button.</div></dd>
        <p></p>
        <dt><strong>Check-out:</strong></dt>
        <dd><div> In order to mark your Out time, enter employee id and click on 'Checkout' button.</div>
        </dd>
        </dl>
        <dl><dt><strong>To mark attendance, follow the steps below:</strong></dt>
       <dd><div> 1. Login to TicToks</div>
        <div>2. Click on Attendance icon</div>
        <div>3. Enter EmployeeId</div>
        <div>4. Click on CheckIn/Checkout button to mark attendance</div>
        </dd>
        </dl>
        <p></p>
        <p><strong>Note:</strong>The User who has given permission to access attendance page will be alone can access this page. </p>
        </dd>
       </dl>
       
        </div>
        </div>
        </div>
        
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}
        >
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#charts">Charts</a>
        </h4>
        </div>
        <div id="charts" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <dl>
        <dd>
        <div>View the pictorial data of Total Number of Employees present in the office premises, the user needs to click on the chart button.</div>
        <p></p>
        <div>In this screen, the user will be able to view the pictorial representation of attendance data of the entire site</div>
        <p></p>
        <dl><dt><strong>To view Chart information, follow the steps below:</strong></dt>
       <dd><div>1. Login to TicToks</div>
        <div>2. Click on Chart icon</div>
        <div>3. View the pictorial representation of attendance data</div>
        
        </dd>
        </dl>
        
        <p><strong>Note:</strong> User who has given permission to access attendance page will be alone can access this page. </p>
        </dd>
        </dl>
        </div>
        
        </div>
        </div>
        
        <div class="panel panel-default">
        <div class="panel-heading " style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Maintenance</a>
        </h4>
        </div>
        <div id="collapse3" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        
       
        <dl>
        
        <dd>
        <p></p>
        
        <dl>
        <dt><h4><strong> Role Page</strong></h4></dt>
        <dd>
        <div>User should have clearly defined roles and responsibilities within the organization. Think of the position description as your guide or map, for both the management and the employee to know the direction that they will be taking in their attempt to attain the goals of the organization.</div>
        <p></p>
        <dl>
        <dt><strong>Create Role</strong></dt>
        <dd>
        <dl><dt><strong>For creating a role, log in to TICTOKS using 'Admin' credentials.</strong></dt><dd>
            <div>1.Click on Maintenance Icon</div>
        <div>2.Enter Role Name, Click on ADD to add a new role</div>
        <div>3. New Role added message will be displayed</div></dd></dl>
        <p><strong>Note:</strong> If a user tried to enter existing Role name,"Role name Already Exist" message will be displayed.</p>
        
        
        </dd>
        <dt><strong>Remove Role</strong></dt>
        <dd>
        <dl><dt><strong>To Remove Unwanted Roles, follow the steps below:</strong></dt>
        <dd>
        <div>1. Select the Role to be removed from the Role name list</div>
       <div>2. Click on 'Remove' button</div></dd></dl>
       <p><strong>Note:</strong> If an Employee is already associated with a Role, that Role cannot be removed. 
       </p>
       </dd>
        </dl>
       
        </dd>
        
        <dt><h4><strong>Department Page </strong></h4></dt>
        <dd><div>For a business owner to manage his company, one needs to create a department to work on specifically relevant things to grow the business. </div>
        <div>TICTOKS allows Administrator to create different departments like Manager, Supervisor, UI Developer, Back-end developer etc.. </div>
        <p></p>
        <dl>
        <dt><strong>Add Department</strong></dt>
        
        <dd>
        <dl><dt><strong>For creating a Department, login to TICTOKS using 'Admin' credentials.</strong></dt>
        <dd>
        <div>1. Click on Maintenance Icon.</div>
        <div>2. Click on Department</div>
        <div>3. Enter Department Name</div>
        <div>4. Click on ADD to add a new Department</div>
        <div>5. New Department added message will be displayed</div></dd></dl>
        <p><strong>Note:</strong> If a user tried to enter existing department name, "department name Already Exist" message will be displayed.</p>
        </dd>
        <dt><strong>Remove Department</strong></dt>
        <dd>
        <dl><dt><strong>To Remove Unwanted Department, follow the steps below:</strong></dt>
        <dd><div>1. Select the Department to be removed from the Department name list</div>
        <div>2. Click on 'Remove' button </div></dd></dl>
        <p><strong>Note:</strong> If an Employee is already associated with a Department, that department cannot be removed. 
       </p></dd></dl>
        
        
        
        </dd>
       
        <dt><h4><strong>Employee Page</strong></h4></dt>
        <div>Employee page helps the User to Add New Employee details, to Remove and Edit existing employee details.</div>
        <dl><dt><strong>Add Employee</strong></dt>
        <dd>
        <div>In TICTOKS Employees can be added through excel import or manually through maintenance screen.</div>
        
        <dl><dt><strong>There are 2 ways to add employees on TicToks: </strong></dt>
        <dd>
        <dl>
        <dt><strong>Method 1:</strong></dt>
        <dd><div>Excel Import.</div></dd>
        <p></p>
        <dt><strong>Method 2: </strong></dt>
        <dd><div>Maintenance screen:</div></dd></dl>
        </dd>
        </dl>
        <dt><strong>In Maintenance Screen,Add Employee Page has the following fields: </strong></dt>
        <dd>
        <div>FirstName,LastName,EmployeeProof,DOB,EmailID,MobileNo,Address, EmployeeType,EmployeeRole and Department.</div>
        <br></br>
        
        <strong>After entering these values, the user should click on Submit to add the new employee data in the system. </strong>
        </dd></dd></dl>
        <p></p>
        <dt><strong>Remove Employee</strong></dt>
        <dd>
        <dl><dt><strong> In case, if you want to deactivate/remove an account from your organization’s account, please exit the employee as described below.</strong></dt>
        <dd> <div> 1. Login to TicToks</div>
        <div>2. Click on Maintenance screen </div>
        <div>3. Click on Employee</div>
        <div>4. Click on Remove</div>
        <div>5. Select an Employee from the list box</div>
        <div>6. Click on Remove Button</div>
        <div>7. Employee Removed message will be displayed </div></dd></dl>
        </dd>
        <p></p>
        <dt><strong>Update Employee</strong></dt>
        
        <dd>
        <div>Maintenance of latest employee details is absolutely necessary for any company. 
       If the Employee has changed address or phone number the data needs to be updated in the official registry in order to contact the employee during an emergency. 
       </div>
       <br></br>
       
       <div>So TICTOKS allows employees to update the existing user details using the maintenance screen</div>
       
       <dl><dt><strong>Steps to perform employee update: </strong></dt>
       <dd><div>1. Login to TicToks</div>
       <div>2. Click on Maintenance screen </div>
       <div>3. Click on Employee</div>
       <div>4. Click on Update</div>
       <div>5. Select an Employee from the list box</div>
       <div>6. Click on edit</div></dd></dl>
       <div>Change any value and click on next button and click ok on the information message.</div>
       </dd>
        </dl>
        </dd>
        
        
        
        
        </dl>
        
        
        
        
        </div>
        </div>
        </div>
        
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Reports</a>
        </h4>
        </div>
        <div id="collapse4" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <div>Report page gives the detailed description about the employee's attendance performance on daily,monthly and period basis.</div>
        <p></p><dl>
        <dd>
        <dt><strong>Daily Report:</strong></dt>
        <dd>
        <div>Daily report helps the user to view the Employee's Attendance status on daily basis. This helps ensure accurate attendance practices on a daily basis, thus enabling sites to correct erroneous actions before the end of the month.
       </div>
       <div>If a user tries to login using "Admin" credentials he can view the Organization Attendance Status, else he can view only his Attendance status for that particular day. </div>
        <br></br> <div> Daily Report displays the information about an employee Attendance status on daily basis like EmployeeID, EmployeeName,</div>
        <div>EmployeeType, Department, Status as (Present/Absent)
        </div>
        <dl><dt><strong>Steps to view the Daily Report: </strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Report Icon</div>
       <div>3. Click on Daily report</div></dd></dl>
        </dd>
        <p></p>
       
        <dt><strong>Monthly Report:</strong></dt>
        <dd><div>Monthly Report will be useful to view the Employee Attendance details for the particular month selected by the user. </div>
       <div>
       Monthly Attendance Report for the Organization will be viewed by the User who has the "Admin" Credentials and Employee who does not have the "Admin" credentials can get his Attendance details alone for the selected particular Month.
       </div><br></br>
       <div>
       From the Monthly Report User can get the information like CheckInTime, CheckOut Time, TotalWorkHour, Attendance Status for each Employee on particular Month.
       </div><div>
       Monthly Attendance Summary Report provides various filtering and grouping options for the data in Monthly Attendance Report.
        </div> 
        <dl><dt><strong>Steps to view the Monthly Report: </strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Report Icon</div>
       <div>3. Click on the Monthly report</div>
       <div>Select the particular Month to view the Attendance status of all Employees.</div></dd></dl> </dd>
        <p></p>
        <dt><strong>Period Report:</strong></dt>
        <dd>
        <div>Knowing the Performance of an employee over a period of time is not going to be a paper pen work because that operation could be easily done by using the option called Period Report where user will select the period by mentioning from and to date and it displays the information like EmployeeID, EmployeeName,
       EmployeeType,Department and Status as (Present/Absent) for Each Employee.</div>
       <dl><dt><strong>Steps to view the Period Report: </strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Report Icon</div>
       <div>3. Click on the Period report</div>
       <div>4. Select the date interval to view the Attendance status of all Employees</div>
        </dd></dl>
       
       
        </dd>
        <dt><strong>Audit Report:</strong></dt>
        <dd><div>Monitoring the changes done for an organization is quite a big deal when each and every employee of an organization has a login account , But now we could easily monitor the changes that is being done by whom by using the feature called Audit Report which lets you know the details like what are the changes done by whom and to whom .</div>
        <dl><dt><strong>Steps to view the Audit Report: </strong></dt><dd>
        <div>1. Login to TicToks</div>
       <div>2. Click on Report Icon</div>
       <div>3. Click on a Audit report</div>
       <div>4. Select the date interval to view the AuditReport</div></dd></dl></dd>
        <dt><strong>Employee Maintenance report:</strong></dt>
        
        <dd>
        <div>Retrieving or Knowing the Entire Details of Employees in an organization is not a tedious job from now on, This requirement could be achieved easily by using Maintenance Report which provides the entire detail about an employee with the status like he is an active employee or not. 
        </div>
        <div>Employee Maintenance Report gives the complete information about the employees in the company like EmployeeID, EmployeeName, phoneNo, EmployeeType, Department, Role.
       </div>
       <dl><dt><strong>Steps to view the Maintenance Report:</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Report Icon</div>
       <div>3. Click on Maintenance report
       </div></dd></dl>
        </dd></dd>
        </dl>
        </div>
        </div>
        </div>
        
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">Employee Request</a>
        </h4>
        </div>
        <div id="collapse5" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <dl><dd>
        <dl><dt><strong>Attendance</strong></dt>
        <dd>
        <div>Verifying the information of the employees checked in by their supervisors is no more a tedious job because you can use Attendance feature in Employee Request to check out whether the information are correct where it provides information like employeeid, employee name,check-in and check out time and attendance status.</div>
        <div> Attendance authorization information for each user is created and updated.</div>
        <div> A User has been given the authority to Authorize Employee Attendance status.</div>
        
       <dl><dt><strong>To authorize Attendance status, follow the steps below:</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Employee Request Icon</div>
       <div>3. Click on "Authorize" button to authorize Employee's Attendance Status</div></dd></dl>
        </dd>
        <dt><strong>Attendance Regularization</strong></dt>
        <dd><div>Regularizing the Days without a proper check-in and checkout is no more a big deal. You could Correct your incorrect data regarding check-in and checkout using Attendance regularization feature in Employee Request whose changes will be implemented on being authorized by the Employee's manager id</div>
        <dl><dt><strong>Requesting Attendance Regularization, follow the steps below:</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Employee Request Icon</div>
       <div>3. Click on "Attendance Regularization" Tab</div>
       <div>4. Select the date, for Requesting Attendance Regularization</div>
       <div>5. Select EmployeeID</div>
       <div>6. Select CheckInTime and CheckOut Time</div>
       <div>7. Click Submit to send an "Attendance Regularization Request"</div>
       </dd></dl>
        </dd>
        <dt><strong>Leave Request</strong></dt>
        <dd><div>Applying leave in an organization is a no more tedious job and no individual record need to be maintained for monitoring leave of an employee. You could use the Leave Request feature where the requested leave could be sanctioned or rejected by the Employee's manager </div>
        <dl><dt><strong>For Requesting Leave, follow the steps below:</strong></dt>
        <dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on Employee Request Icon</div>
       <div>3. Click on "Leave Request" Tab</div>
       <div>4.Select No.of days to apply for leave</div>
       <div>5.Enter Subject and Reason for Leave</div>
       <div>6.Click submit to send a Leave Request</div>
       
       </dd></dl>
        </dd>
       
        </dl>
        </dd>
        </dl>
        </div>
        </div>
        </div>
        
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">Task Mapping</a>
        </h4>
        </div>
        <div id="collapse6" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <dl><dd>
        <dl><dt><strong>Setting Permission</strong></dt>
        <dd><div>Restricting the Employee to access specific page based on his role in the organization is no more a tedious job, This could be easily be done by using permission facility in Task Mapping feature.</div>
        <dl><dt><strong>To Assign permission based on Role, follow the steps below.</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on TaskMapping screen </div>
       <div>3. Click on Permission tab</div>
       <div>4. Select the Role</div>
       <div>5. Select the Modules to assign permission for the selected Role</div>
       </dd></dl></dd>
       <dt><strong>Block/Unblock</strong></dt>
       <dd><div>The Employee who is being removed or one who has misused his permission can be blocked by the user with the Blocking authority without any difficulty using the Block/Unblock feature.</div>
        <div>The Employee Whose Account is Blocked can be unblocked by the authorized employee using the Block/Unblock feature.</div>
        <dl><dt><strong>To perform Block/Unblock Operation, follow the steps below: </strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on TaskMapping screen </div>
       <div>3. Click on Block/Unblock tab</div>
       <div>4. Select the EmployeeId for Block/Unblock Operation</div>
       <div>5. Click Submit to save the changes</div></dd></dl>
        </dd>
        <dt><strong>Unlock</strong></dt>
        <dd><div>The Employee Whose Id is locked due to incorrect entry of his password for 3 or more than 3 times can be easily unlocked by an authorized employee using the Unlock feature.
       </div>
       <dl><dt><strong>To perform Unlock Operation, follow the steps below:</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on TaskMapping screen</div>
       <div>3. Click on Unlock tab</div>
       <div>4. Select the EmployeeId for Unlock Operation</div>
       </dd></dl>
        </dd>
        </dl></dd></dl>
        </div>
        </div>
        </div>
        
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse7">Configuration</a>
        </h4>
        </div>
        <div id="collapse7" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <dl><dd>
        <dl><dt><strong>Minimum Working Hours</strong></dt>
        <dd><div>Minimum working hours refers to the minimum working hours of an employee. It refers to the legislation to limit the working hours per day.</div>
        <div>In TICTOKS Minimum Working Hours can be specified manually through the Configuration screen.
       </div>
       <div>If Employee's TotalWorkHour does not reach the Specified "Minimum Working Hour" duration, his Attendance status will be marked as "Absent".
       </div>
        <dl><dt><strong>Steps to update Minimum working hour:</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on the Configuration screen </div>
       <div>3. Click on Edit</div>
       <div>4. Select the Minimum working Hour duration</div>
       <div>5. Click Save button to save the changes</div>
       </dd></dl></dd>
       <dt><strong>Strict Mode</strong></dt>
       <dd><div>Strict Mode option enables the user to specify the time duration for each and every shift, which is applicable before and after the shift within which the employee should check-in.The employee on trying to check-in after or before the limited duration time his attendance marking is denied.
       </div>
        
        <dl><dt><strong>To set a Strict Mode, follow the steps below: </strong></dt>
        <dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on the Configuration screen </div>
       <div>3. Enable the Strict Mode</div>
       <div>4. Select the Time duration</div>
       </dd></dl>
        </dd>
        <dt><strong>Shift Configuration</strong></dt>
        <dd><div>Shift Configuration helps the user to ADD/DELETE/UPDATE the Shift details for an Organization.</div>
       <dl><dt><strong>Steps to perform Shift Configuration</strong></dt>
       <dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on the Configuration screen</div>
       <div>3. Click on shift details </div>
       <div>4. Add the new shift by clicking Add button</div>
       <dd><div> 4.1.Select Shift</div>
       <div>4.2.Enter Start Time of a Shift</div>
        <div> 4.3.Enter End Time of a Shift</div>
        <div>4.4.Click Submit button to add a new Shift</div></dd>
        <div>5. Delete the Existing Shift by Clicking Delete button</div>
       <div>6. Update Existing shift by clicking an update button</div>
       <dd><div>6.1. Edit the shift details like Start time, End time and Shift </div>
       <div>6.2. Click the Update button to save the Changes</div>
        </dd>
       </dd></dl>
        </dd>
        <dt><strong>Shift Migration</strong></dt>
        <dd><div>Shift Migration helps the user to migrate the Employee among the shift available in the Organization.</div>
        <dl><dt><strong>Steps to perform Shift Migration</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on the Configuration screen</div>
       <div>3. Click on Migrate Shift</div>
       <div>4. Select the Employee Based on Role/Department/Shift</div>
       <dd><div> 4.1. The User can extract employees based on Particular selected Role or on Particular Department or Particular Shift</div>
       <div>4.2. Employees can be extracted by selecting both Role and Department or Role and Shift or Department and shift</div>
        <div> 4.3. Employees come under the Selected Role, Department and Shift will be displayed for Shift Migration</div>
        </dd>
        <div>5.Select the Shift to which Employees should be migrated</div>
       <div>6. Click the Submit button to save the changes</div>
       
       </dd></dl></dd>
       <dt><strong>Holiday Configuration</strong></dt>
        <dd><div>An employee can have various leaves assigned to him when working in an organization. The number of leaves that can be encashed depends on User and can differ from organization to organization.
       </div>
        <dl><dt><strong>To set a Holiday List, follow the steps below:</strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on the Configuration screen</div>
       <div>3. Click on Holiday details</div>
       <div>4. Click on Weekend Tab</div>
       <dd><div> 4.1.Select the shift to which we have to assign weekend Holidays for every week</div>
       <div>4.2. Click the edit button</div>
        <div>4.3.Select the day of the week for assigning Holiday, for example, OddSaturday/EvenSaturday/All</div>
        <div> 4.4. Click the save button to save the changes</div>
        </dd>
        <div>5. Click on GeneralHoliday tab</div>
        <dd><div> 5.1.Select the shift to which we have to assign General Holidays for each Employee</div>
       <div>5.2.Select the date</div>
        <div> 5.3.Enter the Holiday Description</div>
        <div> 5.4. Click the Add button to save the changes</div>
        <dd><div>5.4.1.Click Update button to edit the existing holiday details</div>
       <div>5.4.2. Click Delete button to cancel the assigned Holiday for a particular day</div>
        </dd>
        </dd>
       
       <div>6. To setup leave encashment policy for your employees, click on General Leave tab and follow the steps below:</div>
       <dd><div>6.1.Select the Leave Type</div>
       <div> 6.2.Enter the number of days for each Leave Type</div>
       <div> 6.3. Click the Add button to add a leave for all employees in an Organization</div>
       <dd><div> 6.3.1.Click the Update button to edit the existing Leave Type</div>
       <div> 6.3.2.Click Delete button to delete the assigned leave</div>
        </dd>
       
        </dd>
       </dd></dl></dd>
       <dt><strong>Bio-Metric Enable/Disable</strong></dt>
        <dd><div>This Module allows the User to enable/disable the Biometric Mode.</div>
        <div>If a user enables the Bio-metric, it captures the Employee's unique biological/physical feature such as fingerprint as a record for identity verification and allows to perform the CheckIn/CheckOut operation else Employee can perform Attendance Operation by entering his Employee Id.</div>
        <div>Biometrics Mode read each employee's unique fingerprint that ensures employees are unable to clock in for one another, preventing cases of employee time theft.</div>
        <dl><dt><strong>Steps to Enable/disable Bio-Metric Mode: </strong></dt><dd>
       <div>1. Login to TicToks</div>
       <div>2. Click on the Configuration screen</div>
       <div>3. Click on Bio-metric button to Enable/Disable Bio-metric feature</div>
       </dd></dl></dd>
       </dl>
       </dd></dl>
        </div>
        </div>
        </div> 
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse8">Request Approval</a>
        </h4>
        </div>
        <div id="collapse8" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <dl><dd>
        <dl><dt><strong>Attendance Regularization Request</strong></dt>
        <dd>
        <div>Accepting the Attendance Regularization request is no more a tedious job , The applied Attendance request can be accepted or rejected by the Employee's Reporting Manager Instantly and The action taken upon the request will be intimated to the employee via Email.</div>
        <dl><dt><strong>To Accept/Reject Attendance Regularization Request, follow the steps below:</strong></dt><dd>
        <div>1. Login to TicToks</div>
       <div>2. Click on Request Approval Icon</div>
       <div>3. Click on Reject/Accept button to reject/accept Attendance Regularization request</div></dd></dl>
        </dd>
        <dt><strong>Leave Request Approval</strong></dt>
        <dd><div>Accepting the leave request is no more a tedious job, The applied leave request can be accepted or rejected by the Employee's Reporting Manager Instantly and The action taken upon the request will be intimated to the employee via Email.
       </div>
       <dl><dt><strong>To Accept/Reject Leave Request, follow the steps below:</strong></dt><dd>
        <div>1. Login to TicToks</div>
       <div>2. Click on Request Approval Icon</div>
       <div>3. Click on Reject/Accept button to reject/accept Leave request</div></dd></dl>
        
        </dd>
        
       
        </dl>
        </dd></dl>
        </div>
        </div>
        </div>
        <div class="panel panel-default">
        <div class="panel-heading" style={{ backgroundColor: "rgb(71, 97, 121)", color:"white" }}>
        <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse9">Message Center</a>
        </h4>
        </div>
        <div id="collapse9" class="panel-collapse collapse" style={{ backgroundColor: "rgb(251, 251, 248)" }}>
        <div class="panel-body">
        <dl><dd>
        <dl>
        <dd>
        <div>Sending an Emergency information to  bulk of people in an organization is no more a tedious or one by one manual process.  The information can be passed to the bulk of people in an organization either by message or by email with the help of a fruitful feature called Message Center.</div>
<div>The information to be conveyed to the people in an organization can be filtered based upon 3 categories like role, department, shift and  the combos of these categories are also allowed for further more filtration.
            </div>
        <dl><dt><strong>To send Email/SMS, follow the steps below:</strong></dt><dd>
        <div>1. Login to TicToks</div>
       <div>2. Click on Message Center Icon</div>
       <div>3. Select the Employee Based on Role/Department/Shift</div>
       <dd><div> 3.1. The User can extract employees based on Particular selected Role or on Particular Department or Particular Shift</div>
       <div>3.2. Employees can be extracted by selecting both Role and Department or Role and Shift or Department and shift</div>
        <div> 3.3. Employees come under the Selected Role, Department and Shift will be displayed for sending Email/SMS</div>
        </dd>
       <div>4. Click on Submit button to send Email/SMS.</div></dd></dl>
        </dd>       
        </dl>
        </dd></dl>
        </div>
        </div>
        </div>
       
       
       
       
       
        
        
        
        </div>
        </div>
        
        </div>
        
        );
        
        
        }

}
export default Help;