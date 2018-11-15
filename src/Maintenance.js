
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import NoSearchResult from './NoSearchResult';
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu';
import './Maintenance.css';
import AddNewDepartment from './AddNewDepartment';
import AddNewRole from './AddNewRole';
import DepartmentAddRemove from './DepartmentAddRemove';
import RoleAddRemove from './RoleAddRemove';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuPage from './EmployeeMenuPage';
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';

class Maintenance extends Component {

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

			search: '',
			companyId: '',
			companyType:companyType,

		}
	}
	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value },
		);
	}

	EmployeeFunc() {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={EmployeeMenuHeader} />

					<Route path="/" component={EmployeeAddRemUpdMenu} />
					<Route path="/" component={FooterText} />


				</div>
			</Router>,
			document.getElementById('root'));
		registerServiceWorker();
	}

	SearchFunc() {

		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId = companyId;
		this.setState({
			companyId: companyId,
		});
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				companyId:this.state.companyId,
				search:this.state.search,
			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/searchemployee",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {
				if (data.length) {
					ReactDOM.render(
						<Router>
							<div>
								<Route path="/" component={EmployeeMenuHeader} />
								<Route path="/" component={Maintenance} />
								<Route path="/" component={() => <SearchEmployee data={data} />} />
								<Route path="/" component={FooterText} />
							</div>
						</Router>,

						document.getElementById('root'));
					registerServiceWorker();

				} else {
					ReactDOM.render(
						<Router>
							<div>
								<Route path="/" component={EmployeeMenuHeader} />
								<Route path="/" component={Maintenance} />
								<Route path="/" component={NoSearchResult} />								 		 </div>
							<Route path="/" component={FooterText} />
						</Router>,

						document.getElementById('root'));
					registerServiceWorker();

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

	DepartmentFunc() {
		ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={DepartmentAddRemove} />
					<Route path="/" component={AddNewDepartment} />
					<Route path="/" component={FooterText} />

				</div>
			</Router>, document.getElementById('root'));

	}
	RoleFunc() {
		ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={EmployeeMenuHeader} />
					<Route path="/" component={RoleAddRemove} />
					<Route path="/" component={AddNewRole} />
					<Route path="/" component={FooterText} />


				</div>
			</Router>, document.getElementById('root'));

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



			<div className="container" style={{
				marginBottom: "0%",
				backgroundColor: " #ffffff"
			}} >

				{/*           <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>
 */}
				<div className="row" id="Employeemenu" >
					<div id="Employeesearchtab " className="col-xs-2">
						<h4>  <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a>
						</h4>
					</div>
					<div className="col-xs-10" style={{ paddingBottom: "10px" }}>
						<div class="input-group add-on">
							<input
								type="text"
								value={this.state.search}
								class="form-control"
								placeholder="Search..."
								onChange={this.handleUserInput}
								name="search"
								id="srch-term"
								style={{
									marginTop: "2px",
									width: "70%",
									float: "right",
								}}
							/>
							<div class="input-group-btn">

								<button style={{ marginTop: "-4px" }} class="btn btn-default" id="searchbtn" type="submit" onClick={() => this.SearchFunc()}><i style={{ padding: "4px 0px 1px 0px", border: "solid #ffffff" }} class="glyphicon glyphicon-search"></i></button>
							</div>
						</div>

					</div>
				</div>

				<div id='horMenu'>
					<ul id='horMenunew' >
						<li><a className="active" onClick={() => this.EmployeeFunc()}><span class="glyphicon glyphicon-user">{this.state.companyType}</span></a></li>
						<li><a onClick={() => this.DepartmentFunc()}><span class="glyphicon glyphicon-th-large">Department    </span></a></li>
						<li><a onClick={() => this.RoleFunc()}><span class="glyphicon glyphicon-pushpin">Role</span></a></li>
					</ul>



				</div>

			</div>

		);
	}

}


export default Maintenance;
