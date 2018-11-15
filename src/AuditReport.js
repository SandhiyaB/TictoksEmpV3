import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import registerServiceWorker from './registerServiceWorker';
import Maintenance from './Maintenance';
import NoSearchResult from './NoSearchResult';
import FooterText from './FooterText';


class AuditReport extends Component {

    constructor(data) {
        super(data)

        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: today,
            fromDate:data.fromDate,
            toDate:data.toDate,

        };
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
      
/*
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/auditReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
*/
                if (this.props.data.employeeRetrievelist.length != 0) {
                    var tab = '<thead><tr class="headcolor"  style="color: white; background-color: #486885;"><th>SuperiorId</th><th>Name</th><th>Role</th><th>Operation</th><th>Affected On</th><th>Date</th><th>Time</th></tr></thead>';
                    $.each(this.props.data.employeeRetrievelist, function (i, item) {
                        tab += '<tbody id= "myTable" ><tr class="success" ><td>' + item.superiorId + '</td><td>' + item.name + '</td><td>' + item.role + '</td><td>' + item.operation + '</td><td>' + item.employeeId + '</td><td>' + item.date + '</td><td>' + item.time + '</td></tr></tbody>';
                    });
                    $("#tableHeadings").append(tab);

                }
                else {
                    $("#tableHeadings").append('<h3 align="center">No Data</h3>');
                }
        //    }
     //   });

        //search button func 
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });

    }
    BackbtnFunc() {
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
    }


    render() {

        return (

            <div className="container">
                  {/*   <ul class="previous disabled" id="backbutton"
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
      {/*           <div className="row" id="Employeemenu" >
                    <div id="Employeesearchtab " className="col-xs-7">
                        <h3></h3>
                    </div>
                    <div className="col-xs-5" style={{ paddingBottom: "10px" }}>
                        <div class="input-group add-on">
                            <input
                                type="text"
                                value={this.state.search}
                                class="form-control"
                                placeholder="Search..."
                                onChange={this.handleUserInput}
                                name="search"
                                id="myInput"
                            />
                            <div class="input-group-btn">

                                <button class="btn btn-default" id="searchbtn" type="submit" onClick={() => this.SearchFunc()}><i class="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>

                    </div>
                </div> */}

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

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Audit Report</h3>
               <h4 className="centerAlign" style={{ textAlign: "center" }}>From:{this.state.fromDate} </h4>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>To:{this.state.toDate} </h4>
      
                <div id="tableOverflow" style={{ marginBottom: "20%" }} >
                    <table style={{ margin: "auto" }} class="table" id="tableHeadings">
                    </table>

                </div>
            </div>
        );
    }

}

export default AuditReport;


