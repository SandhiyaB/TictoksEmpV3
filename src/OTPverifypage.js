import React, { Component } from 'react';
import LoginPage from './LoginPage';
import Newpassword from './Newpassword';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ForgotpasswordLog from './ForgotpasswordLog';
class OTPverifypage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			emailId: '',
			otp: '',
			employeeId:'',
			companyId:'',

		};
	}


	handleChangeotp(value) {
		this.setState({
			otp: value
		});
	}

	componentDidMount() {

		window.scrollTo(0, 0);
		var emailIdProps = this.props.emailId;
		this.setState({
			emailId: emailIdProps
		});
	}
	OTPverify() {

		this.setState({
			
			emailId: this.state.emailId,
			otp: this.state.otp
		});
		var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify(this.state),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/verifyOTP",
			contentType: "application/json",
			dataType: 'json',
			success: function (data, textStatus, jqXHR) {
				//console.log("data"+data);
			/* 	alert("pri"+data.otp);
				alert("pri",data.otp);
				alert("otp"+data.employeeId);
				alert("comp"+data.companyId);
			 */	if (data.otp == 0) {
					self.state.employeeId=data.employeeId;
					self.state.companyId=data.companyId;
					ReactDOM.render(<ForgotpasswordLog companyId={self.state.companyId} employeeId={self.state.employeeId} emailId={self.state.emailId}/>, document.getElementById("root"));
				}
				else {
					confirmAlert({
						title: 'Invalid OTP',                        // Title dialog
						message: 'OTP is InCorrect',               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm


					});

				}
			},
			error: function (data) {
				confirmAlert({
					title: 'No Internet',                        // Title dialog
					message: 'Network Connection Problem',               // Message dialog
					confirmLabel: 'Ok',                           // Text button confirm
				  });
		  

			}

		});
	}



	BackbtnFunc() {
		ReactDOM.render(<LoginPage />, document.getElementById("root"));
	}
	render() {

		return (

			<div className="container">
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
	<div className="jumbotron ">
					<div className="form-group">
						<label htmlFor="otp">OTP:</label>
						<input type="text" id="OTP" value={this.state.otp} onChange={(e) => this.handleChangeotp(e.target.value)} className="form-control" placeholder="Enter OTP" />
					</div>
					<button type="button" onClick={() => this.OTPverify()} class="btn btn-primary">Submit</button>

				</div>
			</div>
		);
	}

}
export default OTPverifypage;