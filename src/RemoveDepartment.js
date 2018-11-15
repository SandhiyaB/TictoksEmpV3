import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
import FooterText from './FooterText';
import AddNewDepartment from './AddNewDepartment';
import DepartmentAddRemove from './DepartmentAddRemove';

const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};


class RemoveDepartment extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {

      department: '',
      superiorId: superiorId,
      valid: false,
      companyId: '',
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      valid: true,
    },

    );
  }
  componentDidMount() {
    this.GetDep();
    window.scrollTo(0, 0);

  }


  GetDep() {

    var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var dept;
    dept += '<option  value="" disabled selected hidden>Select a department</option>';
    $.each(department, function (i, item) {

      dept += '<option value="' + item.department + '">' + item.department + '</option>'

    });
    $("#department").append(dept);

  }

  RemoveDepartmentFunc() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(
        {

          department: this.state.department,
          superiorId: this.state.superiorId,
          companyId: this.state.companyId,
        }
      ),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deletedepartment",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data.authorization == "DELETED") {
          confirmAlert({
            title: 'Removing Department Succeded ',                        // Title dialog
            message: 'The Department '+self.state.department +' Is Removed Successfully' ,               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

          var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          var del = self.state.department;
          var key;
          var i = department.length;

          while (i--) {
            if (del == department[i].department) {
              key = i;
              department.splice(i, 1);
            }

          }
          $('#department').empty();
          $('[name=department]').val('');

          localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(department), "shinchanbaby"));
          self.GetDep();
        } else {

          confirmAlert({
            title: 'Removing Department  Failed',                        // Title dialog
            message: 'Cannot Remove Department ' + self.state.department + ' Because Employee Exist In The Department ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })




        }
        $('[name=department]').val('');
        self.state.department = " ";
        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={DepartmentAddRemove} />

              <Route path="/" component={RemoveDepartment} />
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


  render() {
    return (

      <div class="container"
        style={{
          marginBottom: "30%",
          backgroundColor: "rgb(242, 242, 242)",
          color: "#232f3c"
        }}>
        <h2>Remove Department</h2>


        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>


          <div className="col-xs-12 col-sm-12 col-lg-12"  style={{ marginTop: "20px", marginBottom: "20px"}} >
            <label>
              Department*
 <select
                id="department"
                className="form-control"
                onChange={this.handleUserInput}

                name="department"
                style={{ marginBottom: "15px" }}
              >
              </select>
            </label>



            <button
              type="button"

              style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "50px",
                display: "block"
              }}
              disabled={!this.state.valid}
              className="btn btn-danger"
              onClick={() => this.RemoveDepartmentFunc()}
            >Remove</button>

          </div>


        </form>
      </div>


    );
  }

}

export default RemoveDepartment;