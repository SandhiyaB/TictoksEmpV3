import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './LoginPage';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import CryptoJS from 'crypto-js';
import AttendanceDisplay from './AttendanceDisplay';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import ReportMenuPage from './ReportMenuPage';
import LeaveManagement from './LeaveManagement';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import TableToExcel from './TableToExcel';
import FooterText from './FooterText';

import $ from 'jquery';
var divStyle = {
	color: 'white',
	backgroundcolor: 'green',
};


//Get the latitude and the longitude;
function successFunction(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	//console.log("succ",position)
	codeLatLng(lat, lng)
}

function errorFunction(){
	alert("Geocoder failed");
}

  function codeLatLng(lat, lng) {

	$.ajax({
	type: "GET",
	url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng +"&sensor=true",
	success: function(data) {

		//var loca=data.results[0].address_components[1].long_name +","+ data.results[0].address_components[2].long_name;
	localStorage.setItem('Location', "-");
	
	//  console.log("full",data,"status",data.status)
	  if(data.status=="OK"){ 
		//console.log("full address",data.results[0].formatted_address);
		//console.log("main Address",data.results[0].address_components[1].long_name,",",data.results[0].address_components[2].long_name);
		
		var loca=data.results[0].address_components[1].long_name +","+ data.results[0].address_components[2].long_name;
	localStorage.setItem('Location', loca);

	  }
	}
});
  }
/*LAST EDITED ON 2018-04-21 BY B.Priyanka
CHANGES MADE : EDITED THE URL FOR GIVING DEMO TO THE CLIENT
			 :   MADE THE URL NOT TO LOAD WITH CREDENTIALS
*/
/*
ReactDOM.render(<TableToExcel / > , document.getElementById("root"));
registerServiceWorker();
*/

if (localStorage.getItem('isLoggedIn')) {
	var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
	if (login == "true") {
		if(navigator.onLine){
          
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		  } else{
			alert("Geolocation is not Supported by this Browser");
		  }
		}
		window.scrollTo(0, 0);
		ReactDOM.render(
			<Router>
				<div >

					<Route path="/" component={EmployeeMenuHeader} />
					<Route exact path="/" component={EmployeeMenuPage} />
					<Route exact path="/Attendence" component={Attendence} />
					<Route exact path="/Charts" component={Charts} />
					<Route exact path="/AttendanceDisplay" component={AttendanceDisplay} />

					<Route exact path="/Maintenance" component={Maintenance} />
					<Route exact path="/AddEmployee" component={AddEmployee} />
					<Route exact path="/RemoveEmployee" component={RemoveEmployee} />
					<Route exact path="/SearchEmployee" component={SearchEmployee} />
					<Route exact path="/UpdateEmployee" component={UpdateEmployee} />
					<Route exact path="/EmployeeAttendanceRequest*" component={EmployeeRequestAcceptReject} />
					<Route exact path="/EmployeeLeaveRequest*" component={EmployeeRequestAcceptReject} />
					<Route  path="/" component={FooterText} />


				</div>
			</Router>, document.getElementById('root'));
		registerServiceWorker();
	}
	else {
		ReactDOM.render(
		<Router>
		<div >
		<Route  path="/" component={LoginPage}/>
		<Route  path="/" component={FooterText}/>
		</div>
		</Router>
		, document.getElementById("root"));
		registerServiceWorker();
	}

}
else {

	ReactDOM.render(
		<Router>
		<div >
		<Route  path="/" component={LoginPage}/>
		<Route  path="/" component={FooterText}/>
		</div>
		</Router>
		, document.getElementById("root"));
		registerServiceWorker();
}
