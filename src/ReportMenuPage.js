import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import DailyAttendanceReport from './DailyAttendanceReport';
import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import PeriodAttendanceReport from './PeriodAttendanceReport';
import EmployeeMaintenanceReport from './EmployeeMaintenanceReport';
import CryptoJS from 'crypto-js';
import EmployeeMenuPage from './EmployeeMenuPage';
import r1 from './image/r11.png';
import r2 from './image/r22.png';
import r3 from './image/r33.png';
import r4 from './image/r44.png';
import r5 from './image/r55.png';
import r6 from './image/r66.png';
import r7 from './image/r77.png';
import r8 from './image/r881.png';
import r9 from './image/r9911.png';

import AuditReport from './AuditReport';
import DailyIndividualAttendanceReport from './DailyIndividualAttendanceReport';
import PeriodIndividualAttendanceReport from './PeriodIndividualAttendanceReport';
import MonthlyIndividualAttendanceReport from './MonthlyIndividualAttendanceReport';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import AuditReportMenu from './AuditReportMenu';
import FooterText from './FooterText';
import MessageCenterReport from './MessageCenterReport';
import IndividualLeaveReport1 from './IndividualLeaveReport1';
import testLeaveReport from './testLeaveReport';
import Charts from './Charts';
import OrganisationDeviceReport from './OrganizationDeviceReport';

class ReportMenuPage extends Component {

	constructor() {
		super()

		var today = new Date();
		today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state = {

			date: today,
			companyId: '',

		};
	}


	componentDidMount() {
		window.scrollTo(0, 0);

	}
	DailyAttendanceFunc() {

		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={() => <DailyIndividualAttendanceReport />} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();
	}

	MaintenanceReportFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
			this.state.companyId = companyId;

			this.setState({
				companyId: companyId,
			});

			$.ajax({
				type: 'POST',
				data: JSON.stringify({

					companyId: this.state.companyId,
				}),
				url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeeMaintenance",
				contentType: "application/json",
				dataType: 'json',
				async: false,

				success: function (data, textStatus, jqXHR) {


					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={EmployeeMenuHeader} />
								<Route path="/" component={() => <EmployeeMaintenanceReport data={data} />} />

								<Route path="/" component={FooterText} />
							</div>
						</Router>,
						document.getElementById('root'));
					registerServiceWorker();
				}

			});
		} else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}


	}


	ChartFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {
			if (item.permission == "chart") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			var today = new Date();
			today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			this.state.date = today;
			this.setState(
				{
					date: today,
				});
			var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
			this.state.companyId = companyId;
			this.setState({
				companyId: companyId,
			});

			$.ajax({
				type: 'POST',
				data: JSON.stringify(this.state),
				url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
				//url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",

				contentType: "application/json",
				dataType: 'json',
				async: false,
				success: function (data, textStatus, jqXHR) {
					//console.log("chart"+data.employeeRetrievelist);
					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={EmployeeMenuHeader} />
								<Route path="/" component={() => <Charts data={data} />} />
								<Route path="/" component={FooterText} />

							</div>
						</Router>,
						document.getElementById('root'));
					registerServiceWorker();

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
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}



	PeriodAttendanceFunc() {
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={PeriodIndividualAttendanceReport} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();

	}
	MonthlyAttendanceFunc() {
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={MonthlyIndividualAttendanceReport} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();

	}


	MonthlyAttendanceFunc() {
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={MonthlyIndividualAttendanceReport} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();

	}
	MessageReportFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "messageCenter") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>

						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={MessageCenterReport} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));
			registerServiceWorker();
		} else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

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
	AuditReportFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			ReactDOM.render(
				<Router>
					<div>

						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={AuditReportMenu} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));
			registerServiceWorker();
		} else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}
	}


	LeaveReports() {


		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={IndividualLeaveReport1} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();



	}
	DeviceReport(){
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={OrganisationDeviceReport} />
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

					<div className="row" id="checkInOut" style={{}}>


						<div className="col-xs-6 " id="imgwidth" >
							<a to="/Chart" onClick={() => this.ChartFunc()} id=""  >
								<img src={r1} alt="Logo" className="img-responsive" /></a>
						</div>
						<div className="col-xs-6" id="imgwidth">
							<a to="/Attendance" onClick={() => this.DailyAttendanceFunc()} id="" className="" >
								<img src={r2} alt="Logo" className="img-responsive" /></a>
						</div>


					</div>
					<div className="row" id="checkInOut" style={{}}>

						<div className="col-xs-6 " id="imgwidth" >
							<a to="/Chart" onClick={() => this.MonthlyAttendanceFunc()} id=""  >
								<img src={r3} alt="Logo" className="img-responsive" /></a>
						</div>

						<div className="col-xs-6 " id="imgwidth" >
							<a to="/MaintenanceVoid" onClick={() => this.PeriodAttendanceFunc()} id="">
								<img src={r4} alt="Logo" className="img-responsive" /></a>
						</div>

					</div>

					<div className="row" id="checkInOut" style={{}}>
						<div className="col-xs-6 " id="imgwidth" >
							<a to="/MaintenanceVoid" onClick={() => this.MaintenanceReportFunc()} id="">
								<img src={r5} alt="Logo" className="img-responsive" /></a>
						</div>

						<div className="col-xs-6 " id="imgwidth" >

							<a to="/MaintenanceVoid" onClick={() => this.AuditReportFunc()} id="">
								<img src={r6} alt="Logo" className="img-responsive" /></a>
						</div>

					</div>
					<div className="row" id="checkInOut" style={{}}>
						<div className="col-xs-6 " id="imgwidth" >
							<a to="/MaintenanceVoid" onClick={() => this.MessageReportFunc()} id="">
								<img src={r7} alt="Logo" className="img-responsive" />
							</a>
						</div>

						<div className="col-xs-6 " id="imgwidth" >
							<a to="/MaintenanceVoid" onClick={() => this.LeaveReports()} id="">
								<img src={r8} alt="Logo" className="img-responsive" /> </a>
						</div>
					</div>
					<div className="row" id="checkInOut" style={{}}>
						<div className="col-xs-6 " id="imgwidth" >
							<a to="/MaintenanceVoid" onClick={() => this.DeviceReport()} id="">
								<img src={r9} alt="Logo" className="img-responsive" />
							</a>
						</div>

						
					</div>
					
				</div>
			</div>

		);
	}

}
export default ReportMenuPage;
