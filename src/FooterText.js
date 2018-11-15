import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
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

//import logo from './image/logo.png';
 var divStyle={
	/* backgroundColor: '#232f3c',
	 */
	backgroundColor:"rgb(73, 166, 76)",
    textAlign: 'center',
    padding: '0px 0px',
	color: 'white',
	marginBottom:'-6px',
 }

class FooterText extends Component {


	componentDidMount() {

		/* if (localStorage.getItem('isLoggedIn')) {
			var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
			if (login == "true") {
				this.interval = setInterval(() => this.Refresh(), 200000);
				this.interval = setInterval(() => this.offlineData(), 2000);
			}
		} */
	}
	
	/* ExportFunc() {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />

					<Route path="/" component={ExcelExport} />
				</div>
			</Router>,
			document.getElementById('root'));

	} */

	render() {
		return (
			<div>
				<div style={divStyle} className="footer navbar-fixed-bottom">
					<h5 id="footerh5" style={{fontSize:"2.75vw",fontFamily:"Lucida Sans Unicode",}}>TicToks <span id="footerspan" style={{fontSize:"2.25vw"}}>Powered by ThroughApps </span></h5>
					
						
				</div>
			</div>

		);
	}

}


export default FooterText;

