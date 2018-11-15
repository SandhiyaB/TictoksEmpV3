import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import Charts from './Charts';
import ReportMenuPage from './ReportMenuPage';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import TaskMapping from './TaskMapping';
import LeaveManagement from './LeaveManagement';
import t1 from './image/t1.png';
import t2 from './image/t99.png';
import t3 from './image/t3.png';
import t4 from './image/t4.png';
import t5 from './image/t55.png';
import t6 from './image/t6.png';
import t7 from './image/t71.png';
import t8 from './image/t88.png';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import ConfigurationPage from './ConfigurationPage';
import FooterText from './FooterText';
import EmailPage from './EmailPage';
class EmployeeMenuPage extends Component {

	constructor() {
		super()
		this.state = {
			date: '',
			companyId: '',
		};
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value },
		);
	}



	AttendanceFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			ReactDOM.render(
				<Router>
					<div>

						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={Attendence} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}



	MessageFunc() {
    
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
			  {/* <Route path="/" component={MessageMenuPage} /> */}
			  <Route path="/" component={EmailPage} />
	
			  <Route path="/" component={FooterText} />
	
	
			</div>
		  </Router>,
		  document.getElementById('root'));
		registerServiceWorker();
		}
		else {
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

	MaintenanceFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "maintenance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			ReactDOM.render(
				<Router>
					<div>

						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={Maintenance} />
						<Route path="/" component={FooterText} />



					</div>
				</Router>,
				document.getElementById('root'));

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			})
		}

	}



	ReportFunc() {

		/* var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
 */
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
			/*
				}
 else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}
 */
	}

	AttendanceRegulationsFunc() {
		/* var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendanceRegulation") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
		 */	ReactDOM.render(
				<Router>
					<div>
						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={AttendanceRegulationMenuPage} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));
			registerServiceWorker();

	/* 	}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm
			})
		}
 */


	}

	TaskMappingFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "taskMapping") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={TaskMapping} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));
			registerServiceWorker();

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	LeaveManagementFunc() {

		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={LeaveManagement} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();
	}

	ConfigurationFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={ConfigurationPage} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();
	}
	else {
		confirmAlert({
			title: 'Access Deined',                        // Title dialog
			message: 'You are not Allowed to Access this Page',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm

		})
	}
	}


	EmployeeRequestFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={EmployeeRequestAcceptReject} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));
			registerServiceWorker();


		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}


	}

	componentDidMount()
	{
		
		var planName =CryptoJS.AES.decrypt(localStorage.getItem('PlanName'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
	{/*	if(planName=="Basic")
		{
			$("#messagecenter").hide();
			$("#request").hide();
			$("#taskmapping").hide();
			$("#configuration").hide();
			$("#approval").hide();
	}
	else if(planName=="Premium")
	{

			$("#messagecenter").hide();
			$("#configuration").hide();
			$("#approval").hide();
	}
*/}
if(planName=="Basic")
		{
			$("#Premium").hide();
			$("#Elite").hide();
			
	}
	else if(planName=="Premium")
	{

			$("#Basic").hide();
			$("#Elite").hide();
			
	}
	else{
		$("#Basic").hide();
			$("#Premium").hide();
	}

	}
	render() {
		return (

			<div className="container" id="menucol" style={{

				backgroundColor: 'white', marginBottom: "0%",
			}}>
<div id="Elite">
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6 " id="imgwidth">

						<a to="/" onClick={() => this.AttendanceFunc()} id="attendance" className="">
							<img src={t1} alt="Logo" id="menuiconimage" className="img-responsive" /></a>
					</div>
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="messagecenter" onClick={() => this.MessageFunc()} >
							<img src={t2} alt="Logo" id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" onClick={() => this.MaintenanceFunc()} id="maintenance" className="">
							<img src={t3} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
					<div className="col-sm-6  col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="report" onClick={() => this.ReportFunc()} >
							<img src={t4} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" onClick={() => this.AttendanceRegulationsFunc()} id="request" className="">
							<img src={t5} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="taskmapping" onClick={() => this.TaskMappingFunc()} >
							<img src={t6} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" onClick={() => this.ConfigurationFunc()} id="configuration" className="">
							<img src={t7} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="approval" onClick={() => this.EmployeeRequestFunc()} >
							<img src={t8} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
</div>

<div id="Premium">
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6 " id="imgwidth">

						<a to="/" onClick={() => this.AttendanceFunc()} id="attendance" className="">
							<img src={t1} alt="Logo" id="menuiconimage" className="img-responsive" /></a>
					</div>
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="taskmapping" onClick={() => this.TaskMappingFunc()} >
							<img src={t6} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" onClick={() => this.MaintenanceFunc()} id="maintenance" className="">
							<img src={t3} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
					<div className="col-sm-6  col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="report" onClick={() => this.ReportFunc()} >
							<img src={t4} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" onClick={() => this.AttendanceRegulationsFunc()} id="request" className="">
							<img src={t5} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
					
				</div>
				
</div>

<div id="Basic">
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6 " id="imgwidth">

						<a to="/" onClick={() => this.AttendanceFunc()} id="attendance" className="">
							<img src={t1} alt="Logo" id="menuiconimage" className="img-responsive" /></a>
					</div>
					<div className="col-sm-6  col-md-6 col-xs-6" id="imgwidth">
						<a to="/" id="report" onClick={() => this.ReportFunc()} >
							<img src={t4} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
				</div>
				<div className="row" id="checkInOut">
					<div className="col-sm-6 col-md-6 col-xs-6" id="imgwidth">
						<a to="/" onClick={() => this.MaintenanceFunc()} id="maintenance" className="">
							<img src={t3} alt="Logo"id="menuiconimage"  className="img-responsive" /></a>
					</div>
					
				</div>
				
				
</div>


			</div>
		);
	}

}


export default EmployeeMenuPage;

