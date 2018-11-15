import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
//import './LoginPage.css';
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

import t4 from './image/I48.png';

import t5 from './image/power1.png';
import FooterText from './FooterText';
import AdminLoginPage from './AdminLoginPage';


//import logo from './image4/logo.png';


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
		/**
			* http://www.openjs.com/scripts/events/keyboard_shortcuts/
			* Version : 2.01.B
			* By Binny V A
			* License : BSD
			*/
		var shortcut = {
			'all_shortcuts': {},//All the shortcuts are stored in this array
			'add': function (shortcut_combination, callback, opt) {
				//Provide a set of default options
				var default_options = {
					'type': 'keydown',
					'propagate': false,
					'disable_in_input': false,
					'target': document,
					'keycode': false
				}
				if (!opt) opt = default_options;
				else {
					for (var dfo in default_options) {
						if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
					}
				}

				var ele = opt.target;
				if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
				var ths = this;
				shortcut_combination = shortcut_combination.toLowerCase();

				//The function to be called at keypress
				var func = function (e) {
					e = e || window.event;

					if (opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
						var element;
						if (e.target) element = e.target;
						else if (e.srcElement) element = e.srcElement;
						if (element.nodeType == 3) element = element.parentNode;

						if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
					}
					var code;
					var k;
					//Find Which key is pressed
					if (e.keyCode) code = e.keyCode;
					else if (e.which) code = e.which;
					var character = String.fromCharCode(code).toLowerCase();

					if (code == 188) character = ","; //If the user presses , when the type is onkeydown
					if (code == 190) character = "."; //If the user presses , when the type is onkeydown

					var keys = shortcut_combination.split("+");
					//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
					var kp = 0;

					//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
					var shift_nums = {
						"`": "~",
						"1": "!",
						"2": "@",
						"3": "#",
						"4": "$",
						"5": "%",
						"6": "^",
						"7": "&",
						"8": "*",
						"9": "(",
						"0": ")",
						"-": "_",
						"=": "+",
						";": ":",
						"'": "\"",
						",": "<",
						".": ">",
						"/": "?",
						"\\": "|"
					}
					//Special Keys - and their codes
					var special_keys = {
						'esc': 27,
						'escape': 27,
						'tab': 9,
						'space': 32,
						'return': 13,
						'enter': 13,
						'backspace': 8,

						'scrolllock': 145,
						'scroll_lock': 145,
						'scroll': 145,
						'capslock': 20,
						'caps_lock': 20,
						'caps': 20,
						'numlock': 144,
						'num_lock': 144,
						'num': 144,

						'pause': 19,
						'break': 19,

						'insert': 45,
						'home': 36,
						'delete': 46,
						'end': 35,

						'pageup': 33,
						'page_up': 33,
						'pu': 33,

						'pagedown': 34,
						'page_down': 34,
						'pd': 34,

						'left': 37,
						'up': 38,
						'right': 39,
						'down': 40,

						'f1': 112,
						'f2': 113,
						'f3': 114,
						'f4': 115,
						'f5': 116,
						'f6': 117,
						'f7': 118,
						'f8': 119,
						'f9': 120,
						'f10': 121,
						'f11': 122,
						'f12': 123
					}

					var modifiers = {
						shift: { wanted: false, pressed: false },
						ctrl: { wanted: false, pressed: false },
						alt: { wanted: false, pressed: false },
						meta: { wanted: false, pressed: false }   //Meta is Mac specific
					};

					if (e.ctrlKey) modifiers.ctrl.pressed = true;
					if (e.shiftKey) modifiers.shift.pressed = true;
					if (e.altKey) modifiers.alt.pressed = true;
					if (e.metaKey) modifiers.meta.pressed = true;

					for (var i = 0; k = keys[i], i < keys.length; i++) {
						//Modifiers
						if (k == 'ctrl' || k == 'control') {
							kp++;
							modifiers.ctrl.wanted = true;

						} else if (k == 'shift') {
							kp++;
							modifiers.shift.wanted = true;

						} else if (k == 'alt') {
							kp++;
							modifiers.alt.wanted = true;
						} else if (k == 'meta') {
							kp++;
							modifiers.meta.wanted = true;
						} else if (k.length > 1) { //If it is a special key
							if (special_keys[k] == code) kp++;

						} else if (opt['keycode']) {
							if (opt['keycode'] == code) kp++;

						} else { //The special keys did not match
							if (character == k) kp++;
							else {
								if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
									character = shift_nums[character];
									if (character == k) kp++;
								}
							}
						}
					}

					if (kp == keys.length &&
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
						callback(e);

						if (!opt['propagate']) { //Stop the event
							//e.cancelBubble is supported by IE - this will kill the bubbling process.
							e.cancelBubble = true;
							e.returnValue = false;

							//e.stopPropagation works in Firefox.
							if (e.stopPropagation) {
								e.stopPropagation();
								e.preventDefault();
							}
							return false;
						}
					}
				}
				this.all_shortcuts[shortcut_combination] = {
					'callback': func,
					'target': ele,
					'event': opt['type']
				};
				//Attach the function with the event
				if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
				else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
				else ele['on' + opt['type']] = func;
			},

			//Remove the shortcut - just specify the shortcut and I will remove the binding
			'remove': function (shortcut_combination) {
				shortcut_combination = shortcut_combination.toLowerCase();
				var binding = this.all_shortcuts[shortcut_combination];
				delete (this.all_shortcuts[shortcut_combination])
				if (!binding) return;
				var type = binding['event'];
				var ele = binding['target'];
				var callback = binding['callback'];

				if (ele.detachEvent) ele.detachEvent('on' + type, callback);
				else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
				else ele['on' + type] = false;
			}
		}
		shortcut.add("F1", function () {
			ReactDOM.render(
				<Router>
					<div>
						<Route path="/" component={EmployeeMenuHeader} />
						<Route path="/" component={Help} />
						<Route path="/" component={FooterText} />

					</div>
				</Router>,
				document.getElementById('root'));
		});


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
								<Route path="/" component={FooterText} />
							</div>
						</Router>, document.getElementById('root'));

				} else if (data.employeeId == "BLOCKED") {
					localStorage.clear();

					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />
								<Route path="/" component={FooterText} />
							</div>
						</Router>, document.getElementById('root'));

				} else if (data.employeeId == "PASSWORD_INCORRECT") {

					localStorage.clear();
					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />
								<Route path="/" component={FooterText} />
							</div>
						</Router>, document.getElementById('root'));

				}
				else {

					if(navigator.onLine){
          
						if (navigator.geolocation) {
						  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
					  } else{
						//alert("Geolocation is Not supported by this Browser");
					  }
					}
					//Get the latitude and the longitude;
					function successFunction(position) {
						var lat = position.coords.latitude;
						var lng = position.coords.longitude;
						//console.log("succ",position)
						codeLatLng(lat, lng)
					}
					
					function errorFunction(){
						//alert("Geocoder failed");
					}
					
					  function codeLatLng(lat, lng) {
					
						$.ajax({
						type: "GET",
						url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng +"&sensor=true",
						success: function(data) {
						 // console.log("full",data,"status",data.status)
						  if(data.status=="OK"){ 
							//console.log("full address",data.results[0].formatted_address);
							//console.log("main Address",data.results[0].address_components[1].long_name,",",data.results[0].address_components[2].long_name);
							
							var loca=data.results[0].address_components[1].long_name +","+ data.results[0].address_components[2].long_name;
						localStorage.setItem('Location', loca);
						  }
						}
					});
					  }
					
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
					localStorage.setItem('CompanyType', CryptoJS.AES.encrypt(data.companyType, key));
					localStorage.setItem('SMS', CryptoJS.AES.encrypt(data.sms.toString(), key));
				}
			},


		});

	}

	offlineData() {

		if (navigator.onLine) {


			var dbPromise = idb.open('Attendance-db');

			dbPromise.then(function (db) {
				if (db.objectStoreNames.contains('checkInOut')) {
					var tx = db.transaction('checkInOut', 'readonly');
					var keyValStore = tx.objectStore('checkInOut');
					var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
						if (!cursor) return;
						if (cursor.value.status == "CheckIn") {
							$.ajax({
								type: 'POST',
								data: cursor.value.data,
								url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckin",
								contentType: "application/json",
								dataType: 'json',
								async: false,

								success: function (data, textStatus, jqXHR) {
									if (data.employeeName == "NOT_VAILD") {
										confirmAlert({
											title: 'Check In Failed',                        // Title dialog
											message: 'Enter Valid Employee Id',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
				
										})
									}
				
									else if (data.employeeName == "BLOCKED") {
										confirmAlert({
											title: 'Check In Failed',                        // Title dialog
											message:'The Employee Id '+ data.employeeId + '  has been BLOCKED',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
				
				
									}
									else if (data.employeeName == "ALREADY_CHECKIN") {
										confirmAlert({
											title: 'Check In Failed',                        // Title dialog
											message: 'The Employee Id '+data.employeeId + ' Has already Checked In today',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
				
				
									}
									else {
										confirmAlert({
											title: 'Check In Success',                        // Title dialog
											message: 'The Employee Id '+data.employeeId +' Checked In Successfully ' ,               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
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
						} else {
							$.ajax({
								type: 'POST',
								data: cursor.value.data,
								url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
								contentType: "application/json",
								dataType: 'json',
								async: false,

								success: function (data, textStatus, jqXHR) {
									if (data.employeeName == "NOT_VAILD") {
										confirmAlert({
											title: 'CheckIn Failed',                        // Title dialog
											message: 'Entered An Invalid Employee Id Kindly Try Check In Again With A Valid Employee Id',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
										})
				
									}
									else if (data.employeeName == "NOT_CHECKED_IN") {
										confirmAlert({
											title: 'Not Checked In',                        // Title dialog
											message: data.employeeId + ' is not checked in today',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
									}
									else if (data.employeeName == "ALREADY_CHECKOUT") {
										confirmAlert({
											title: 'Check Out Failed',                        // Title dialog
											message: 'The Employee Id '+data.employeeId + ' is already checked out today',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
				
										})
				
				
									} else {
										confirmAlert({
											title: 'Check Out Success',                        // Title dialog
											message: 'The Employee Id '+ data.employeeId+' Checked Out Successfully  ' ,               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
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



						}
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
	/* var dbPromise = idb.open('Attendance-db', 2);

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
			var tx = db.transaction('checkOut', 'readwrite');
			var keyValStore = tx.objectStore('checkOut');
			return keyValStore.delete(cursor.key);

		});
		return cursor.continue().then(cursorIterate);
	});
*/







	LogoutFunc() {
		localStorage.clear();
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={LoginPage} />
					<Route path="/" component={FooterText} />
				</div>
			</Router>, document.getElementById('root'));

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
		/* alert("this.probs.location" + this.props.location);
		console.log("props", this.props.location);
	 */	confirmAlert({
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
					<Route path="/" component={FooterText} />

				</div>
			</Router>,
			document.getElementById('root'));

	}

	ImportFunc() {
		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId = companyId;
		var today = new Date();
		var today1 = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();

		var totalName = companyId + "_" + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + "_" + today1 + ".xlsx";

		this.state.importFileName = totalName;

		/*
		var fileName=localStorage.getItem('ImportFileName');
				alert("AreadyFilename"+fileName);
				var fileName1;
				var file=[];
				if(fileName!=null){
					alert("FILE NAME ALEADY EXIST");
		fileName1=fileName+","+this.state.importFileName;
				//file.push(fileName1);
				var key = "shinchanbaby";
				localStorage.setItem('ImportFileName',fileName1);
		//localStorage.setItem('ImportFileName',file);
		}else {
			alert("NEW FILE NAME");
		//	file.push(this.state.importFileName);
			localStorage.setItem('ImportFileName',this.state.importFileName);
		
			//localStorage.setItem('ImportFileName',file);
		}
		
		
			//	localStorage.setItem('ImportFileName', CryptoJS.AES.encrypt(this.state.importFileName, key));
		*/

		this.setState({
			importFileName: this.state.importFileName,
			companyId: this.state.companyId,
		});

		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				fileName: this.state.importFileName,
				companyId: this.state.companyId,
			}),

			// data:resultData,
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/excelexport/importfile",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {

				confirmAlert({
					title: 'Download Succcess',                        // Title dialog
					message: 'The File Requested For Import Is Downloaded Successfully',               // Message dialog
					confirmLabel: 'Ok',                           // Text button confirm


				});

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

	ExportFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
		//console.log("permission" + permission);
		var flag = 1;//false
		var i = permission.length;
	//	console.log("permission length" + i);
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

						<Route path="/" component={ExcelExport}  />
							</div>
				</Router>,
				document.getElementById('root'));

		} else {

			confirmAlert({
				title: 'Access Denied',                        // Title dialog
				message: "You Are Not Authorized To Perform Export Operation",               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			});

		}

	}

	Admin(){
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />

					<Route path="/" component={AdminLoginPage} />
						</div>
			</Router>,
			document.getElementById('root'));
	}
	render() {
		return (
			<div >

				<nav class="navbar navbar-inverse" style={{marginBottom:"0px",backgroundColor:"#4aa64e"}}>
					<div class="container-fluid justify-content-center">
						<div class="navbar-header">
							<a class="navbar-brand" id="headerIcon" href="#" to="/" onClick={() => this.MainPageFunc()} >
							</a>



							{/*  <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="#">Page 1-1</a></li>
          <li><a href="#">Page 1-2</a></li>
          <li><a href="#">Page 1-3</a></li>
        </ul>
      </li>
	  <li><a href="#">Page 2</a></li> */}
							<span class="navbar-text "
							id="headerName"
								style={{
									float: "none",
									position: "absolute",
									color: "white",
									left: "50%",
									transform: "translate(-50%, -50%)",
									wordWrap: "break-word",
								}} >
								{CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)}
  </span>

							<div class=" navbar-right"
								style={{
									float: "none",
									position: "absolute",
									top: "35%",
									left: "93%",
									/* transform: "translate(-50%, -50%)", */
									wordWrap: "break-word",
									color: "red",

								}}>
								<a href="#" class="btn btn-md dropdown-toggle" type="button"  id="headerLogout" data-toggle="dropdown" 

									style={{
										/* marginTop: "5px",
										padding: "0px 2px 1px 2px", */
									}} >
									{/* */}
								<span class="glyphicon-glyphicon-cog"></span></a>

								<ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
									{/* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} */}
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-hand-right" onClick={() => this.HelpFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Help</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-eye-close" onClick={() => this.ResetFunc()} style={{ float: "left", backgroundColor: "#677785" }} ><span  style={{ paddingLeft:"10px"}}>ResetPassword</span></span></a></li>
									<li className="divider"></li>
									<li><a href="Import.xlsx" download={this.state.importFileName} onClick={() => this.ImportFunc()} style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-download" style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Export</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-upload" onClick={() => this.ExportFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Import</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="fa fa-users" onClick={() => this.Admin()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Admin&ensp;Console</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>LogOut</span></span></a></li>

								</ul>

							</div>

						</div>


					</div>
				</nav>

				{/* 	<div class="row navbar " id="logomenurow">
					<div className="col-sm-2 col-xs-2 align-middle navbar-brand">
						<a to="/" id="" onClick={() => this.MainPageFunc()} >
							<img id="logomenuheader" src={t4} alt="Logo" /></a>

					</div>
					<div className="col-sm-8 col-xs-8 align-middle navbar-nav" style={{ color: "white", fontFamily: "Lucida Sans Unicode", textTransform: "uppercase", textAlign: "center", fontSize: "0vw", paddingTop: "0px" }} >

						<h6 class="align-middle" style={{ fontSize: "3.5vw" }} >{CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)}</h6>
					</div>
					<div className="col-sm-2 col-xs-2 navbar-btn ">
						<a href="#" class="btn btn-md dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"

							style={{
								/* marginTop: "5px",
								padding: "0px 2px 1px 2px", *
							}} >
							<img id="logouticon" src={t5} alt="Logo" />

							{/* <span class="glyphicon glyphicon-off"></span>*
						</a>

						<ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
							{/* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} *
							<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-hand-right" onClick={() => this.HelpFunc()} style={{ float: "left", backgroundColor: "#677785" }}>Help</span></a></li>
							<li className="divider"></li>
							<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-eye-close" onClick={() => this.ResetFunc()} style={{ float: "left", backgroundColor: "#677785" }} >ResetPassword</span></a></li>
							<li className="divider"></li>
							<li><a href="Import.xlsx" download={this.state.importFileName} onClick={() => this.ImportFunc()} style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-download" style={{ float: "left", backgroundColor: "#677785" }}>Import</span></a></li>
							<li className="divider"></li>
							<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-upload" onClick={() => this.ExportFunc()} style={{ float: "left", backgroundColor: "#677785" }}>Export</span></a></li>
							<li className="divider"></li>
							<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "#677785" }}>LogOut</span></a></li>

						</ul>
					</div>

				</div> */}
				{/*
				<nav class="navbar navbar-default" id="bgheader" >
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
									 style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} 
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
				</div> 
			
			ImportFunc() {
		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

		var today = new Date();
		var today1 = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();

		var totalName = companyId + "_" + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + "_" + today1 + ".xlsx";

		this.state.importFileName = totalName;
		var fileName = localStorage.getItem('ImportFileName');
		alert("AreadyFilename" + fileName);
		var fileName1;
		var file = [];
		if (fileName != null) {
			alert("FILE NAME ALEADY EXIST");
			fileName1 = fileName + "," + this.state.importFileName;
			//file.push(fileName1);
			var key = "shinchanbaby";
			localStorage.setItem('ImportFileName', fileName1);
			//localStorage.setItem('ImportFileName',file);
		} else {
			alert("NEW FILE NAME");
			//	file.push(this.state.importFileName);
			localStorage.setItem('ImportFileName', this.state.importFileName);

			//localStorage.setItem('ImportFileName',file);
		}


		//	localStorage.setItem('ImportFileName', CryptoJS.AES.encrypt(this.state.importFileName, key));


		this.setState({
			importFileName: this.state.importFileName,

		});

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

	}*/}

			</div>

		);
	}

}


export default EmployeeMenuHeader;

