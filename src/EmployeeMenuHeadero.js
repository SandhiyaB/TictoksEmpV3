import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import './LoginPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, a } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';
import CryptoJS from 'crypto-js';
import Help from './Help';
import LoginPage from './LoginPage';
import ResetPassword from './ResetPassword';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import AttendanceDisplay from './AttendanceDisplay';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import idb from 'idb';
import ExcelExport from './ExcelExport';

import t4 from './image/tictokn.png';
import t5 from './image/Icon-Small.png';
import FooterText from './FooterText';


//import logo from './image/logo.png';


class EmployeeMenuHeader extends Component {

	constructor() {
		super()
		var emailId = CryptoJS.AES.decrypt(localStorage.getItem('EmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state = {

			emailId: emailId,
			importFileName: companyId + ".xlsx",

		}
	}

	componentDidMount() {

		if (localStorage.getItem('isLoggedIn')) {
			var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
			if (login == "true") {
				this.interval = setInterval(() => this.Refresh(), 200000);
				this.interval = setInterval(() => this.offlineData(), 2000);
			}
		}
	}
	Refresh() {
		var today = new Date();
		today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state.date = today;
		var emailId = CryptoJS.AES.decrypt(localStorage.getItem('EmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
		var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8); var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				emailId: emailId,
				password: password,

			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeeLogin",
			contentType: "application/json",
			dataType: 'json',
			async: false,

			success: function (data, textStatus, jqXHR) {
				if (data.employeeId == "LOCKED") {
					localStorage.clear();
					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />

							</div>
						</Router>, document.getElementById('root'));

				} else if (data.employeeId == "BLOCKED") {
					localStorage.clear();

					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />

							</div>
						</Router>, document.getElementById('root'));

				} else if (data.employeeId == "PASSWORD_INCORRECT") {

					localStorage.clear();
					ReactDOM.render(<LoginPage />, document.getElementById("root"));



				}
				else {
					var key = "shinchanbaby";
					localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));

					localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(data.employeeDepartmentlist), key));
					localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
					localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
					localStorage.setItem('Role', CryptoJS.AES.encrypt(data.role, key));
					localStorage.setItem('EmployeeId', CryptoJS.AES.encrypt(data.employeeId, key));
					localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
					localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
					localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
					localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(data.lockList), key));
					localStorage.setItem('ReportingManagerList', CryptoJS.AES.encrypt(JSON.stringify(data.reportingManagerList), key));
					localStorage.setItem('BiometricValue', CryptoJS.AES.encrypt(data.biometricValue.toString(), key));
					localStorage.setItem('ShiftMode', CryptoJS.AES.encrypt(data.shiftMode.toString(), key));
				}
			},


		});

	}

	offlineData() {

		if (navigator.onLine) {


			var dbPromise = idb.open('Attendance-db');

			dbPromise.then(function (db) {
				if (db.objectStoreNames.contains('checkIn') || db.objectStoreNames.contains('checkOut')) {
					var tx = db.transaction('checkIn', 'readonly');
					var keyValStore = tx.objectStore('checkIn');
					var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
						if (!cursor) return;

						$.ajax({
							type: 'POST',
							data: cursor.value,
							url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckin",
							contentType: "application/json",
							dataType: 'json',
							async: false,

							success: function (data, textStatus, jqXHR) {
								if (data.employeeName == "NOT_VAILD") {
									confirmAlert({
										title: 'Invalid EmployeeId', // Title dialog
										message: 'Enter Valid Employee Id', // Message dialog
										confirmLabel: 'Ok', // Text button confirm

									})
								}
								else if (data.employeeName == "ALREADY_CHECKIN") {
									confirmAlert({
										title: 'Already Checked In', // Title dialog
										message: data.employeeId + ' is already checked in today', // Message dialog
										confirmLabel: 'Ok', // Text button confirm

									})
								}

								else {

									confirmAlert({
										title: 'Checked In', // Title dialog
										message: 'Successfully Checked In ' + data.employeeId, // Message dialog
										confirmLabel: 'Ok', // Text button confirm

									})

								}

							},
							error: function (data) {
								confirmAlert({
									title: 'No Internet',                        // Title dialog
									message: 'Network Connection Problem',               // Message dialog
									confirmLabel: 'Ok',                           // Text button confirm
								});


							},


						});

						dbPromise.then(function (db) {
							var tx = db.transaction('checkIn', 'readwrite');
							var keyValStore = tx.objectStore('checkIn');
							return keyValStore.delete(cursor.key);

						});
						return cursor.continue().then(cursorIterate);
					});

					var dbPromise = idb.open('Attendance-db', 2);

					var tx = db.transaction('checkOut', 'readonly');
					var keyValStore = tx.objectStore('checkOut');
					var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
						if (!cursor) return;
						$.ajax({
							type: 'POST',
							data: cursor.value,
							url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
							contentType: "application/json",
							dataType: 'json',
							async: false,

							success: function (data, textStatus, jqXHR) {
								if (data.employeeName == "NOT_VAILD") {
									confirmAlert({
										title: 'Invalid EmployeeId', // Title dialog
										message: 'Enter Valid Employee Id', // Message dialog
										confirmLabel: 'Ok', // Text button confirm

									})
								}
								else if (data.employeeName == "NOT_CHECKED_IN") {
									confirmAlert({
										title: 'Not Checked In', // Title dialog
										message: data.employeeId + ' is not checked in today', // Message dialog
										confirmLabel: 'Ok', // Text button confirm


									})
								}
								else if (data.employeeName == "ALREADY_CHECKOUT") {
									confirmAlert({
										title: 'Already Checked In', // Title dialog
										message: data.employeeId + ' is already checked out today', // Message dialog
										confirmLabel: 'Ok', // Text button confirm

									})
								}
								else {

									confirmAlert({
										title: 'Checked Out', // Title dialog
										message: 'Successfully Checked Out ' + data.employeeId, // Message dialog
										confirmLabel: 'Ok', // Text button confirm
									})


								}
							},
							error: function (data) {
								confirmAlert({
									title: 'No Internet',                        // Title dialog
									message: 'Network Connection Problem',               // Message dialog
									confirmLabel: 'Ok',                           // Text button confirm
								});


							},

						});





						dbPromise.then(function (db) {
							var tx = db.transaction('checkInOut', 'readwrite');
							var keyValStore = tx.objectStore('checkInOut');
							return keyValStore.delete(cursor.key);

						});
						return cursor.continue().then(cursorIterate);
					});

				}

			});
		}
	}






	LogoutFunc() {
		localStorage.clear();
		ReactDOM.render(<LoginPage />, document.getElementById("root"));
	}

	HelpFunc() {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={Help} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
	}
	navigateConfirm() {
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />
					<Route exact path="/" component={EmployeeMenuPage} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();
	}

	MainPageFunc() {
	//	alert("this.probs.location" + this.props.location);
	//	console.log("props", this.props.location);
		confirmAlert({
			title: 'TicToks', // Title dialog
			message: ' Do you want to Cancel the Process and Move to Home screen ', // Message dialog
			confirmLabel: 'Confirm', // Text button confirm
			cancelLabel: 'Cancel', // Text button cancel
			onConfirm: () => { this.navigateConfirm() }, // Action after Confirm
			// Action after Cancel


		})
	}
	ResetFunc() {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />

					<Route path="/" component={() => <ResetPassword emailId={this.state.emailId} />} />
				</div>
			</Router>,
			document.getElementById('root'));

	}

	ExportFunc() {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />

					<Route path="/" component={ExcelExport} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));

	}

	render() {
		return (
			<div >
				<div class="row" id="logomenurow">
					<div  className="col-sm-2 col-xs-2 align-middle">
						<a to="/" id="" onClick={() => this.ReportFunc()} >
							<img  id="logomenuheader"  src={t4} alt="Logo"  className="img-responsive" /></a>

					</div>
					<div className="col-sm-8 col-xs-8 align-middle"  style={{ color: "white", textTransform:"uppercase", textAlign:"center", fontSize: "4vw"}} >

						<h6 class="align-middle"  style={{ fontSize: "3.5vw"}} >sarooja agro foods pvt ltd</h6>
					</div>
					<div  className="col-sm-2 col-xs-2 align-middle">
						<a  href="#"  class="btn btn-md dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" style={{  float: "right" }}   >
						<img  id="logouticon"  src={t4} alt="Logo"  className="img-responsive" />

							{/* <span class="glyphicon glyphicon-off"></span>
					 */}	</a>

					 <ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
									{/*   /* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} */}
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-hand-right" onClick={() => this.HelpFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>Help</span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-eye-close" onClick={() => this.ResetFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }} >ResetPassword</span></a></li>
									<li className="divider"></li>
									<li><a href="Import.xlsx" download={this.state.importFileName} style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-download" style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>Import</span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-upload" onClick={() => this.ExportFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>Export</span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>LogOut</span></a></li>

								</ul>
					</div>

				</div>

			{/* 	<div class="navbar" >
					<a href="#home">Home</a>
					<div>
						<a href="#news">News</a></div>
					<a href="#contact">Contact</a>
				</div> */}


			{/* 	<nav class="navbar navbar-default" id="bgheader" >
					<div class="container-fluid" id="menuheadercontainerfluid" style={{ display: "grid" }}>
						<div class="navbar-header" id="bgheader1" >
							<div id="logoheader" >
								<a class="navbar-brand" onClick={() => this.MainPageFunc()} href="#">
								</a>
							</div>{/* <img src={logo} alt="Logo" className="img-responsive" /></a>
						
							<p>{CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
							}</p>
						
							<p>sandyamulpriyanka</p>



							<div>
								<button class="btn btn-md dropdown-toggle"type="button" id="menu1" data-toggle="dropdown" 
								style={{ backgroundColor: "rgb(90, 13, 124)" }}>
									<a href="#" class="btn btn-default btn-md" style={{ backgroundColor: "#FF9800", float: "right" }}   >
										<span class="glyphicon glyphicon-off"></span>
									</a>
								</button>
								<ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
									{/*   /* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} 
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-hand-right" onClick={() => this.HelpFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>Help</span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-eye-close" onClick={() => this.ResetFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }} >ResetPassword</span></a></li>
									<li className="divider"></li>
									<li><a href="Import.xlsx" download={this.state.importFileName} style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-download" style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>Import</span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-upload" onClick={() => this.ExportFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>Export</span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "rgb(226, 48, 145)", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "rgb(226, 48, 145)" }}>LogOut</span></a></li>

								</ul>
							</div>
						</div>


					</div>
				</nav> */}

				{/* <nav class="navbar navbar-default" id="bgheader" >
					<div class="container-fluid" id="menuheadercontainerfluid">
						<div class="navbar-header" id="bgheader" >
							<a class="navbar-brand" id="logoheader" onClick={() => this.MainPageFunc()} href="#"></a>
						</div>

						<div class="navbar-right dropdown" style={{ textAlign: "right" }}>
							<button class="btn btn-md dropdown-toggle"
								style={{ backgroundColor: "rgb(90, 13, 124)" }} type="button" id="menu1" data-toggle="dropdown">
								<a href="#" class="btn btn-default btn-md"   style={{backgroundColor:"#FF9800" }}   >
									<span class="glyphicon glyphicon-off"></span>
								</a>
							</button>
							<ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1"
		    /* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} *>
								<li><a href="#"  style={{backgroundColor:"rgb(226, 48, 145)",color:"white"  }}><span class="glyphicon glyphicon-hand-right" onClick={() => this.HelpFunc()} style={{ float: "left" ,backgroundColor:"rgb(226, 48, 145)" }}>Help</span></a></li>
								<li className="divider"></li>
								<li><a href="#"  style={{backgroundColor:"rgb(226, 48, 145)",color:"white"  }}><span class="glyphicon glyphicon-eye-close" onClick={() => this.ResetFunc()} style={{ float: "left",backgroundColor:"rgb(226, 48, 145)" }} >ResetPassword</span></a></li>
								<li className="divider"></li>
								<li><a href="#" style={{backgroundColor:"rgb(226, 48, 145)",color:"white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left",backgroundColor:"rgb(226, 48, 145)" }}>LogOut</span></a></li>
								<li className="divider"></li>
								<li><a href="Import.xlsx"  download={this.state.importFileName}  style={{backgroundColor:"rgb(226, 48, 145)",color:"white" }}><span class="glyphicon glyphicon-download"  style={{ float: "left",backgroundColor:"rgb(226, 48, 145)" }}>Import</span></a></li>
								<li className="divider"></li>
								<li><a href="#"  style={{backgroundColor:"rgb(226, 48, 145)",color:"white" }}><span class="glyphicon glyphicon-upload" onClick={() => this.ExportFunc()} style={{ float: "left",backgroundColor:"rgb(226, 48, 145)" }}>Export</span></a></li>
							</ul>
						</div>
					</div>
				</nav> */}
{/* 
				<div className="container-fluid " style={{ textAlign: "center" }}>
					<div className="jumbotron" style={{

						background: "linear-gradient(to bottom right,#fda119 , #FFEB3B)",
						//background:"linear-gradient(to right bottom, rgb(253, 161, 25), #f44336d1) rgb(179, 229, 252)";
						textAlign: "center", backgroundColor: "#eeeeee14", color: "black",

						backgroundColor: " #b3e5fc",
						borderRadius: "10px 50px",
						boxShadow: "rgba(65, 7, 107, 0.92) 16px 17px 6px -6px"

					}}>
						<h2 id="companyname">{CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
						}</h2>
						<h4>TicToks</h4>
						<h4>powered by ThroughApps</h4>
					</div>
				</div> */}

			</div>

		);
	}

}


export default EmployeeMenuHeader;

