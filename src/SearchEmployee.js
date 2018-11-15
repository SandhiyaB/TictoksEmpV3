import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader'


class SearchEmployee extends Component {

        constructor() {
                super()
        }


        componentDidMount() {

                var tab = '<thead><tr class="headcolor"><th>Emp Id</th><th>Emp Name</th></th><th>Department</th><th>Role</th><th>Type</th><th>Address</th><th>Mobile NO</th></tr></thead>';


                $.each(this.props.data, function (i, item) {
                        tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.department + '</td><td>' + item.role + '</td><td>' + item.employeeType + '</td><td>' + item.address + '</td><td>' + item.mobileNo + '</td></tr>';
                });
                $("#tableHeadings").append(tab);
                window.scrollTo(0, 0);
        }
        render() {
                return (

                        <div class="container">
                                <h3 className="centerAlign" style={{ textAlign: "center" }}>Search Result</h3>

                                <div>
                                        <div id="tableOverflow" style={{ marginBottom: "30%" }}>
                                                <table class="table" id="tableHeadings">


                                                </table>
                                        </div>

                                </div>


                        </div>

                );
        }

}


export default SearchEmployee;
