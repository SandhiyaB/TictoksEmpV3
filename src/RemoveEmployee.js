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
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu';
import FooterText from './FooterText';
class RemoveEmployee extends Component {

	constructor() {
		super()
		var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
        if(companyType=="Office"){
            companyType="Employee";
        }
        else{
            companyType="Student/Staff";
        }
		this.state = {

			employeeId: '',
			superiorId: superiorId,
			valid: false,
			companyId: '',
			companyType:companyType,
		}
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
		this.GetEmpId();
		window.scrollTo(0, 0);

	}

	GetEmpId() {
		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

		this.state.companyId = companyId;
		this.setState({
			companyId: companyId,
		});
var self=this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({

				companyId: this.state.companyId,

			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeList",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			crossDomain: true,

			success: function (data, textStatus, jqXHR) {

				var employeeId;
				employeeId += '<option value=" " disabled selected hidden >Select a '+self.state.companyType+' Id</option>';
				$.each(data, function (i, item) {

					employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

				});
				$("#employeeId").append(employeeId);
			}
		});
	}
	RemoveBtn() {
		var self = this;
		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId = companyId;
		this.setState({
			companyId: companyId,
		});


		$.ajax({
			type: 'POST',
			data: JSON.stringify({

				employeeId: this.state.employeeId,

				companyId: this.state.companyId,
			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeedetails",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {
				if (data.employeeName != null) {
					confirmAlert({
						title: self.state.companyType+' Deletion Confirmation  ',                        // Title dialog
						message: 'Are You Sure Do You Want To Remove ' + data.employeeId + " " + data.employeeName + "  " + data.role + "  from department " + data.department,               // Message dialog
						confirmLabel: 'Confirm',                           // Text button confirm
						cancelLabel: 'Cancel',                             // Text button cancel
						onConfirm: () => { self.RemoveEmployeeConf() },    // Action after Confirm
						onCancel: () => { self.NoAction() },      // Action after Cancel
					})

				}
				else {
					confirmAlert({
						title: 'Removal Of Employee Failed',                        // Title dialog
						message: 'The Empoyee Id Cannot Be Removed . Enter A Valid Employee Id',               // Message dialog
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

	RemoveEmployeeConf() {

		var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				employeeId: this.state.employeeId,
				companyId: this.state.companyId,
				superiorId: this.state.superiorId,
			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deleteemployee",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {
				var employeeId = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
				var del = self.state.employeeId;
				var key;
				var i = employeeId.length;

				while (i--) {
					if (del == employeeId[i].employeeId) {
						key = i;
						employeeId.splice(i, 1);
					}

				}
				$('#department').empty();
				$('[name=department]').val('');
				localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(employeeId), "shinchanbaby"));

				self.GetEmpId();
				confirmAlert({
					title: 'Employee Removal Success ',                        // Title dialog
					message: 'The Employee Id ' + data.employeeId +' Is Removed Successfully',               // Message dialog
					confirmLabel: 'Ok',                           // Text button confirm


				})


				$('[name=employeeId]').val(' ');
				ReactDOM.render(
					<Router>
						<div>

							<Route path="/" component={EmployeeMenuHeader} />

							<Route path="/" component={EmployeeAddRemUpdMenu} />
							<Route path="/" component={RemoveEmployee} />
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

	NoAction() {
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={EmployeeMenuHeader} />

					<Route path="/" component={Maintenance} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>, document.getElementById('root'));

	}

	render() {
		return (



			<div class="container" style={{ marginBottom: "30%", backgroundColor: "white",
			color: "#232f3c"}}>
				<div className="jumbotron" style={{ backgroundColor: "#f2f2f2" }} >
					<h3>Remove {this.state.companyType}</h3>
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
					<button type="button" disabled={!this.state.valid} onClick={() => this.RemoveBtn()} className="btn btn-primary" style={{ marginBottom: "0px", marginLeft: "auto", marginRight: "auto", marginTop: "0px", display: "block" }}>Remove</button>
				</div>
			</div>


		);
	}

}


export default RemoveEmployee;
