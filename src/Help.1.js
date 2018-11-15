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
                <div class="panel-group" id="accordion" style={{ backgroundColor: "rgb(199, 39, 141)" ,marginBottom:"20%"}}>
  
                    <div class="panel panel-default">
                        <div class="panel-heading"  style={{ backgroundColor: "#2f014cf5", color:"white" }}>
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Attendance</a>
                            </h4>
                        </div>
                        <div id="collapse1" class="panel-collapse collapse ">
                            <div class="panel-body" style={{ backgroundColor: "#480473" }}>
                                <div>Attendance page helps the user to log his attendance in TICTOKS,</div>
                                <p></p>
                                <div>Once the user clicks on checkin button his check in time will be recorded.</div>
                                <p></p>
                                <div>In Attendance screen once employee checks in the following details will be displayed </div>
                                <p></p>
                                <div>Emp Name, Status, Check in  time, Check out Time[Null], Mobile number. </div>
                                <p></p>
                                <div>When employee clicks on check out, check out time will be recorded in the system and his status will be marked as Present. </div>
                                <p></p>

                                <p><strong>Note:</strong> User's who has access to Attendance task will be able to access the page. </p>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading"  style={{ backgroundColor: "#2f014cf5", color:"white" }}
                        >
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#charts">Charts</a>
                            </h4>
                        </div>
                        <div id="charts" class="panel-collapse collapse" style={{ backgroundColor: "#480473" }}>
                            <div class="panel-body">
                                <div>Charts helps the supervisors and company owners to get a pictorial view of entire attendance data.
Currently there are 2 types of charts, </div>
                                <p></p>

                                <dl>
                                    <dt><strong>Summary Chart:</strong></dt>
                                    <dd><div>Summary chart is a bar chart which displays the Total count of employees in the site, Total count of employees present in the site, Total count of employees absent in the site for the particular day.</div></dd>
                                    <p></p>
                                    <dt>Detailed Chart:</dt>
                                    <dd><div>Detailed chart displays attendance details using employee types. </div>
                                        <div>
                                            <div>The chart fields are </div>
                                            <div>Total number of employees in the site</div>
                                            <div>Total number of Permanant employees in the site</div>
                                            <div>Total number of Temporary employees in the site</div>
                                            <div>Total number of Permanant employees Present in the site</div>
                                            <div>Total number of Temporary employees Present in the site</div>
                                            <div>Total number of Permanant employees Absent in the site</div>
                                            <div>Total number of Temporary employees Absent in the site</div>
                                        </div></dd>

                                </dl>
                                <p><strong>Note:</strong>User's who has access to Chart's task will be able to access the page. </p>
                            </div>

                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading "  style={{ backgroundColor: "#2f014cf5", color:"white" }}>
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Maintenance</a>
                            </h4>
                        </div>
                        <div id="collapse3" class="panel-collapse collapse" style={{ backgroundColor: "#480473" }}>
                            <div class="panel-body">
                                <div>Maintenance page helps the User to make changes in the system.</div>
                                <p></p>
                                <dl>
                                    <dt><h4><strong>Employee Page</strong></h4></dt>
                                    <dd><div>Employee page helps the User to Add New Employee details, to Remove a particular employee details and to Update employee details.</div>
                                        <p></p>

                                        <dl>
                                            <dt><strong>Add Employee</strong></dt>
                                            <dd>
                                                <div>Add Employee Page has the following fields: </div>
                                                <div>FirstName,LastName,EmployeeProof,</div>
                                                <div>DOB,EmployeeID,MobileNo,Address,</div>
                                                <div> EmployeeTYpe,EmployeeRole AND Department </div>

                                                <div>After entering these values, user should click on Submit to add the new employee data in the system. </div>
                                            </dd>
                                            <p></p>
                                            <dt><strong>Remove Employee</strong></dt>
                                            <dd>
                                                <div>Remove Employee Page has EmployeeID field, </div>
                                                <div>user should enter the employeeID,</div>
                                                <div>After entering EmployeeID,user should click on remove button to remove a particular employee details from the system.
</div></dd>
                                            <p></p>
                                            <dt><strong>Update Employee</strong></dt>

                                            <dd>
                                                <div>Update Employee Page has EmployeeID field,</div>
                                                <div>user should enter the employeeID,</div>
                                                <div>After entering EmployeeID,user should click on Edit button to Update a particular employee details to the system.
</div></dd>
                                        </dl>
                                    </dd>


                                    <dt><h4><strong>Department Page </strong></h4></dt>
                                    <dd><div>Department Page helps the user to add a new department to the system or to remove a particular existing department from the system.</div>
                                        <p></p>
                                        <dl>
                                            <dt><strong>Add Department</strong></dt>

                                            <dd>
                                                <div>Add Department page has DepartmentName field,</div>
                                                <div>user should enter the new DepartmentName,</div>
                                                <div>After entering DepartmentName,user should click on Add button to add a new department to the system.</div></dd>
                                            <dt><strong>Remove Department</strong></dt>
                                            <dd>
                                                <div>Remove Department page has DepartmentName field,</div>
                                                <div>user should enter the existing DepartmentName,</div>
                                                <div>After entering DepartmentName,user should click on Remove button to remove a particular department from the system.</div>
                                            </dd></dl></dd>


                                    <dt><h4><strong> Role Page</strong></h4></dt>
                                    <dd>
                                        <div>Role page helps the user to assign a new role to employee in the particular department, or to remove a particular existing role of an employee from the system.
</div>
                                        <p></p>
                                        <dl>
                                            <dt><strong>Add Role</strong></dt>
                                            <dd>
                                                <div>user should select the department from the optionList,and should enter the New Role Name</div>
                                                <div>After entering these values,user should click on Add button to add a new Role to the system.</div>
                                            </dd>
                                            <dt><strong>Remove Role</strong></dt>
                                            <dd>
                                                <div>Remove Role page has Role Name field,</div>
                                                <div>user should enter the existing RoleName,</div>
                                                <div>After entering the RoleName,user should click on Remove button to remove a particular Role from the system.</div>
                                            </dd></dl>
                                    </dd>


                                </dl>
                                <p><strong>Note:</strong> User's who has access to Maintenance task will be able to access the page. </p>




                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading"  style={{ backgroundColor: "#2f014cf5", color:"white" }}>
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Reports</a>
                            </h4>
                        </div>
                        <div id="collapse4" class="panel-collapse collapse"  style={{ backgroundColor: "#480473" }}>
                            <div class="panel-body">
                                <div>Report page gives the detailed description about the employees attendance performance on daily,monthly and period basis.</div>
                                <p></p><dl>
                                    <dt><strong>Daily Report:</strong></dt>
                                    <dd><div>
                                        Daily Report displays the information about an employee Attendance status on daily basis with information like EmployeeID,EmployeeName,</div>
                                        <div>EmployeeType,Department and Status as (Present/Absent)
</div></dd>
                                    <p></p>
                                    <dt><strong>Monthly Report:</strong></dt>
                                    <dd><div> Monthly Report displays the information about an employee Attendance status on Monthly basis with information like EmployeeID,EmployeeName,</div>
                                    <div>EmployeeType,Department and Status as (Present/Absent) </div></dd>
                                    <p></p>
                                    <dt><strong>Period Report:</strong></dt>
                                    <dd><div> Monthly Report displays the information about an employee Attendance status on over a period of time with information like EmployeeID,EmployeeName,</div>
                                    <div>EmployeeType,Department and Status as (Present/Absent) </div></dd>
                                    <p></p>
                                    <dt><strong>Employee Maintenance report:</strong></dt>

                                    <dd>
                                        <div> Employee Maintenance Report gives the complete information about the employees in the company like EmployeeID,EmployeeName,phoneNo, EmployeeType,Department and Role </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>


                    <div class="panel panel-default">
                        <div class="panel-heading"  style={{ backgroundColor: "#2f014cf5", color:"white" }}>
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">Attendance Regularization</a>
                            </h4>
                        </div>
                        <div id="collapse5" class="panel-collapse collapse"   style={{ backgroundColor: "#480473" }}>
                            <div class="panel-body">
                                <div>When an employee is unable to mark his check out time or when a employee forgets to mark his attendance. </div>
                                <p></p>
                                <div>Employee can request the suervisor to regularize his Check in and Check out time. since the system will capture the actual value. </div>
                                <p></p>
                                <div>Attendance regularization has the following fields: </div>
                                <div>Employee ID, Check in time and Check out time. </div>
                                <p></p>
                                <div>After entering these values, user should click on Submit to check in the new data in the system. </div>
                            </div>
                        </div>
                    </div>


                    <div class="panel panel-default">
                        <div class="panel-heading"  style={{ backgroundColor: "#2f014cf5", color:"white" }}>
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">Task Mapping</a>
                            </h4>
                        </div>
                        <div id="collapse6" class="panel-collapse collapse"   style={{ backgroundColor: "#480473" }}>
                            <div class="panel-body">
                                <div>This Feature helps the Site Admin to control users from accessing all the screens</div>
                                <p></p><div>The following are the tasks which can be allocated Role wise. </div><p></p>
                                <div>Proprietor/Supervisor will be having access to all the screen.</div><p></p>
                                <div>Auditor will have access only to reports</div>


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