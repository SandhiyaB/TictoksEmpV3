import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import TaskMapping from './TaskMapping';
import FooterText from './FooterText';

class Unlock extends Component {

	constructor() {
		super()
		var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
		if(companyType=="Office"){
			companyType="Employee";
		}
		else{
			companyType="Student/Staff";
		}
		this.state = {

			employeeId: '',

			valid: false,
			companyId: '',
			superiorId: '',
			companyType:companyType
		};
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value,
			valid: true,
		},
		);
	}

	componentDidMount() {
		
		this.GetLokList();
		window.scrollTo(0, 0);
	}
	GetLokList() {
		var emp = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('LockList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
		var employeeId;
		employeeId += '<option value =" "disabled selected hidden >Select a '+this.state.companyType+' Id</option>';
		$.each(emp, function (i, item) {

			employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

		});
		$("#employeeId").append(employeeId);

	}
	UnlockBtn() {

		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
		var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

		this.state.companyId = companyId;
		this.state.superiorId = superiorId;
		this.setState({
			companyId: companyId,
			superiorId: superiorId,
		});
		var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({

				employeeId: this.state.employeeId,
				companyId: this.state.companyId,
				superiorId: this.state.superiorId,
			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/empunlock",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {

				if (data.employeeName == "UNLOCKED") {
					var employeeId = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('LockList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
					var del = self.state.employeeId;

					var key;
					var i = employeeId.length;

					while (i--) {
						if (del == employeeId[i].employeeId) {
							key = i;
							employeeId.splice(i, 1);
						}

					}
					localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(employeeId), "shinchanbaby"));

					$('[name=employeeId]').val(' ');
					self.GetLokList();
					confirmAlert({
						title: 'Unlock Success',                       // Title dialog
						message: 'Successfully Unlocked The '+self.state.companyType+' Id ' + data.employeeId,               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm


					})

				}
				else {
					confirmAlert({
						title: 'Unlock Failed',                       // Title dialog
						message:'The '+self.state.companyType+' Id'+ data.employeeId + '  Is Not Locked ',               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm


					})



				}

				ReactDOM.render(
					<Router>
						<div>

							<Route path="/" component={EmployeeMenuHeader} />
							<Route path="/" component={TaskMapping} />
							<Route path="/" component={Unlock} />
							<Route path="/" component={FooterText} />



						</div>
					</Router>, document.getElementById('root'));

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


	render() {
		return (



			<div class="container" id="containerbody" >
				<div className="jumbotron" id="containerbodyjumbo"style={{  marginTop: "-50px"}}>
					<h3>Unlock {this.state.companyType}</h3>
					<div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
						<label>
							{this.state.companyType} Id*
	   <select
								id="employeeId"
								className="form-control"
								onChange={this.handleUserInput}

								name="employeeId"
								style={{ marginBottom: "15px" }}
							>
							</select>
						</label>


					</div>
					<button type="button" disabled={!this.state.valid} onClick={() => this.UnlockBtn()} className="btn btn-primary" style={{ marginLeft: "20px", marginBottom: "25px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", display: "block" }}>UnLock</button>
				</div>
			</div>


		);
	}

}


export default Unlock;;
