import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import NoSearchResult from './NoSearchResult';
import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Maintenance from './Maintenance';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import FooterText from './FooterText';
class EmployeeAddRemUpdMenu extends Component {

    constructor() {
        super()
        this.state = {

            search: '',
            companyId: '',

        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    componentDidMount() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeAddRemUpdMenu} />
                    <Route path="/" component={AddEmployee} />
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
            data: JSON.stringify(this.state),
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


    AddEmployeeFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeAddRemUpdMenu} />
                    <Route path="/" component={AddEmployee} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }

    RemoveFunc() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeAddRemUpdMenu} />
                    <Route path="/" component={RemoveEmployee} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();



    }

    UpdateFunc() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeAddRemUpdMenu} />
                    <Route path="/" component={UpdateEmployee} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={Maintenance} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }


    render() {
        return (

            <div className="container" style={{ backgroundColor: "white" }}>
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


              {/*   <div className="row" id="Employeemenu" >
                    <div id="Employeesearchtab " className="col-xs-7">
                        <h4>Employee </h4>
                    </div>
                    <div className="col-xs-5" style={{ paddingBottom: "10px" ,display:"inline-block"}}>

                        <input type="text" placeholder="Search.." name="search2"
                            style={{
                                padding: "10px",
                                fontSize: " 17px",
                                border: "1px solid #80808094",
                                float: " left",
                                width: "80%",
                                background: "rgb(255, 255, 255)",
                            }} />
                        <button type="submit"
                            style={{
                                borderRadius: "0px 20px 11px 0px",
                                borderTop: "6px solid #edf5e1",
                                borderRight: "1px solid #edf5e1",
                                borderBottom: "17px solid #edf5e1",
                                borderLeft: "none",
                                
                                borderLeft: "none",
                                cursor: "pointer",
                                color: "white",
                                padding: "10px",
                                fontSize: " 17px",
                                
                                float: " left",
                                width: "20%",
                                background: "#65bd69",
                            }}><i class="glyphicon glyphicon-search"></i></button>

                        {/*  <div class="input-group add-on">
                            <input
                                style={{ 
                                    marginLeft: "-15px",
                                    padding: "0px 0px 0px 0px",
                            }}
                                type="text"
                                value={this.state.search}
                            class="form-control"
                            placeholder="Search"
                                onChange={this.handleUserInput}
                            name="search"
                            id="srch-term"
                        />
                            <div class="input-group-btn">

                                <button class="btn btn-default" id="searchbtn" type="submit" onClick={() => this.SearchFunc()}><i class="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div> **

                    </div>
                </div> */}

                <div id='horMenunew' >
                    <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active" onClick={() => this.AddEmployeeFunc()}><span class="glyphicon glyphicon-plus">Add</span></a></li>
                        <li><a onClick={() => this.RemoveFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </a></li>
                        <li><a onClick={() => this.UpdateFunc()}><span class="glyphicon glyphicon-retweet"> Update</span></a></li>
                    </ul>

                </div>



            </div >
        );
    }
}

export default EmployeeAddRemUpdMenu;
