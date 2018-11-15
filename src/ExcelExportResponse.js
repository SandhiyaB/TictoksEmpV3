import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class ExcelExportResponse extends Component {

 constructor(data) {
 super()

 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

 this.state = {
 companyId:companyId,
 };
 }

  componentDidMount() {

 var excelResponse = '<thead><tr class="headcolor"><th>FirstName</th><th>LastName</th><th>DOB</th><th>EmailId</th><th>MobileNo</th><th>Type</th><th>Department</th><th>Role</th><th>ProofType</th><th>ProofNum</th><th>EmailStatus</th><th>MobileStatus</th></tr></thead>';
    $("#excelResponse").append(excelResponse);
   
    $.each(this.props.data.returnXl, function (i, item) {
     // if(i>0){
     var excelResponsetab = '<tr class="success" ><td>' + item.firstName + '</td><td>' + item.lastName
      + '</td><td>' + item.dob + '</td><td>'+item.emailId+'</td><td>' + item.mobileNo
       + '</td><td>' + item.type + '</td><td>' + item.department
        + '</td><td>' + item.role + '</td><td>' + item.proofType
         + '</td><td>' + item.proofNum + '</td><td>' + item.emailIdDB
          + '</td><td>' + item.mobileNoDB + '</td></tr>';
   
    $("#excelResponse").append(excelResponsetab);
  //}
  });

  }


  render() {

    return (

      <div className="container">


            <h3 className="centerAlign" style={{ textAlign: "center" }}>Exported Data Response</h3>
    <p style={{color:"red"}}>**Kindly Download The Error Report Displayed For Your Future Reference
       using <b><q>Download Error Report</q> </b>Button</p>

      <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="excelResponse "
                    filename="Error_Report"
                    sheet="tablexls"
                    buttonText="Download Error Report"/>


       <div id="tableOverflow">
          <table class="table" id="excelResponse">

          </table>

			</div>
               </div>
    );
  }

}

export default ExcelExportResponse;

