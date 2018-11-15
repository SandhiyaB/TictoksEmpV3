
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import ExcelExportResponse from './ExcelExportResponse';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ConfigurationPage from './ConfigurationPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
//import ExcelExport1 from './ExcelExport1';
import ExcelFileToJSON from './ExcelFileToJSON';


class ExcelExport extends Component {

  constructor() {
    super()

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      companyId: companyId,
    };
  }

  componentDidMount() {


    $.ajax({

      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/excelexport/initialData",
      //url: "http://localhost:8080/EmployeeAttendenceAPI/excelexport/initialData",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data) {


       // console.log("SUCCESS : ", data);


        if (data.role == "Fail" || data.department == "Fail" || data.shiftType == "Fail") {

          confirmAlert({
            title: 'Configuration Error',                        // Title dialog
            message: "You Haven't Configured The Basic Configuration Do Check your Role,Department And Shift ",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });
          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={() => <ConfigurationPage />} />


              </div>
            </Router>,
            document.getElementById('root'));
          registerServiceWorker();




        } else {

          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={() => <ExcelFileToJSON />} />


              </div>
            </Router>,
            document.getElementById('root'));
          registerServiceWorker();
        }
      },
      error: function (e) {
        $("#result").text(e.responseText);
     //   console.log("ERROR : ", e);
        $("#btnSubmit").prop("disabled", false);

      }
    });


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Upload Employee Details</h1>
        </header>


        <form method="POST" enctype="multipart/form-data" id="fileForm">

          <p>
            Select File To Be Uploaded : <input type="file" id="file" name="file" size="45" />
          </p>

          <p>
            <input id="uploadBtn" type="button" value="Upload PFD Files" />
          </p>

        </form>
      </div>
    );
  }
}

export default ExcelExport;


