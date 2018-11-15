import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import './EmployeeMenuPage.css';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu'
import EditEmployeeDetails from './EditEmployeeDetails'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import FooterText from './FooterText';

class UpdateEmployee extends Component {

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
			companyType:companyType


		}
	}
	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value,
			valid: true,
		});
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
	EditBtn() {
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
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updateEmployeeDetails",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {

				if (data.firstName) {
					ReactDOM.render(
						<Router >
							<div>
								<Route path="/" component={EmployeeMenuHeader} />
								<Route path="/" component={EmployeeAddRemUpdMenu} />

								<Route path="/" component={() => <EditEmployeeDetails data={data} />} />
								<Route path="/" component={FooterText} />

							</div>
						</Router>, document.getElementById('root'));
				}
				else {

					confirmAlert({
						title: 'Invalid EmployeeId',                        // Title dialog
						message: 'Enter Valid Employee Id',               // Message dialog
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


	render() {
		return (

			<div class="container" style={{ marginBottom: "30%",
			backgroundColor: "white",
			color: "#232f3c" }}>
				<div className="jumbotron" style={{ backgroundColor: " #f2f2f2 " }} >
					<h3>Update {this.state.companyType}</h3>

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

					<button type="button" disabled={!this.state.valid} onClick={() => this.EditBtn()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", display: "block" }}>Edit</button>
				</div>

			</div>



		);
	}

}

export default UpdateEmployee;
