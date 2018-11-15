
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FooterText from './FooterText';
 
import './EmployeeMenuPage.css';

class EmployeeMaintenanceReport extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
    if(companyType=="Office"){
        companyType="Employee";
    }
    else{
        companyType="Student/Staff";
    }
    this.state = {
      date: today,
      companyType:companyType

    };
  }
  componentDidMount() {
    var self=this;
    window.scrollTo(0, 0);

    var tab = '<thead><tr class="headcolor"><th>Id</th><th>FirstName</th><th>LastName</th><th>Role</th><th>Dept</th><th>Type</th><th>MobileNo</th></tr></thead>';
    $.each(this.props.data.employeeRetrievelist, function (i, item) {
      tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + item.employeeId + '</td><td>' + item.firstName + '</td><td>' + item.lastName + '</td><td>' + item.role + '</td><td>' + item.department + '</td><td>' + item.employeeType + '</td><td>' + item.mobileNo + '</td></tr></tbody>';
    });
    $("#tableHeadings").append(tab);

    var summary = '<thead><tr class="headcolor"><th>Type</th><th>#'+self.state.companyType+'</th></thead>';
    summary += '<tr class="success" id="tabletextcol" ><td> Permanent</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfPermanentEmployee;
    summary += '<tr class="success"  id="tabletextcol"><td> Contract</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfContractEmployee;
    summary += '<tr class="success" id="tabletextcol" ><td> Temporary</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfTemporaryEmployee;


    $("#summary").append(summary);


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

      <div className="container" id="containerbody">
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


        <h3 className="centerAlign" style={{ textAlign: "center" }}> Employee Maintenance Report</h3>

        <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
        <div    style={{ display: "grid" }}>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="summary"
                    filename="Maintenance_Report"
                    sheet="tablexls"
                    buttonText="Download Summary Report"/>
                    </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table" id="tableHeadings">

          </table>
        </div>
        <div id="tableOverflow">
          <table class="table" id="summary" style={{ marginBottom: "30%" }}>

          </table>
          </div>
        </div>


      </div>
    );
  }

}

export default EmployeeMaintenanceReport;
