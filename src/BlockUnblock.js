import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';

import AddNewDepartment from './AddNewDepartment';
import TaskMapping from './TaskMapping';
import FooterText from './FooterText';


class BlockUnblock extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
    if(companyType=="Office"){
        companyType="Employee";
    }
    else{
        companyType="Student/Staff";
    }
    this.state = {

      employeeId: '',
      block: '',
      companyId: '',
      superiorId: superiorId,
      companyType:companyType,
      valid: false,
    };
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value,
      valid: true, },
    );
  }

  ChangeBlock(e) {
    this.setState(
      {
        block: e,
      }
    );
  }
  Submit() {
var self=this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
if(this.state.block.length>0){
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        employeeId:this.state.employeeId,
        block: this.state.block,
        companyId:this.state.companyId,
        superiorId:this.state.superiorId
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeeBlockUnblock",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data.employeeName == "NOT_VALID") {
          confirmAlert({
            title: 'Invalid EmployeeId',                        // Title dialog
            message: 'Enter Valid Employee Id',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          })
        } else if (data.employeeName == "NOT_BLOCKED") {

          confirmAlert({
            title: 'Unblock Failed',                        // Title dialog
            message: 'The Employee Id '+data.employeeId + ' Cannot Be UnBlocked Since It Is Not Blocked Already ',            // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          })

        } else {

          confirmAlert({
            title: data.status+'Success',                        // Title dialog
            message: 'The Employee Id '+data.employeeId + ' Is ' + data.status+' Successfully',            // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          })


        }
        $('[name=employeeId]').val(' ');
        self.state.block='';
        self.state.valid=false;
        
        self.setState({
          block:'',
          valis:false,
        })
        $('input[name=optradio]').attr("checked", false);
        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={TaskMapping} />

              <Route path="/" component={BlockUnblock} />
              <Route path="/" component={FooterText} />


            </div>
          </Router>, document.getElementById('root'));


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
  else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Choose Block or Unblock',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }

  componentDidMount() {
var self=this;
    window.scrollTo(0, 0);

    var emp = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var employeeId;
    employeeId += '<option value=" " disabled selected hidden >Select a '+self.state.companyType+' Id</option>';
    $.each(emp, function (i, item) {

      employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

    });
    $("#employeeId").append(employeeId);

  }

  render() {
    return (

      <div class="container" id="containerbody">
        <h2>Block/Unblock</h2>

        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <label>
              {this.state.companyType} Id*
     <select
                id="employeeId"
                className="form-control"
                onChange={this.handleUserInput}
                name="employeeId"
              >
              </select>
            </label>

          </div>

          <div class="form-group">

            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div class="radio">
                <label style={{ fontSize: "20px" }} ><input type="radio" onClick={(e) => this.ChangeBlock("1")} name="optradio" />Block</label>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div class="radio">
                <label style={{ fontSize: "20px" }}><input type="radio" name="optradio" onClick={(e) => this.ChangeBlock("0")} />UnBlock</label>
              </div>

            </div>

          </div>

        </form>
      {/*   <button type="button"
          disabled={!this.state.valid}
          onClick={() => this.UnlockBtn()}
          className="btn btn-primary"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "140px", marginBottom: '75px', display: "block" }}
        >UnLock</button> */}

        <button type="button"
        disabled={!this.state.valid} 
         onClick={() => this.Submit()}
         className="btn btn-primary"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "140px", marginBottom: '75px', display: "block" }}
        >Submit</button>
      </div>
    );
  }

}

export default BlockUnblock;