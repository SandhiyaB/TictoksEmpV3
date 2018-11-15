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
import RoleAddRemove from './RoleAddRemove';
import AddNewRole from './AddNewRole';
import FooterText from './FooterText';
const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};


class RemoveRole extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {

      role: '',
      valid: false,
      companyId: '',
      superiorId: superiorId,

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



  handleAddNew(value) {
    this.setState({
      department: value,
    });
  }

  componentDidMount() {

    this.GetRole();
    window.scrollTo(0, 0);

  }

  GetRole() {
    var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var role;

    role += '<option value ="" disabled selected hidden >Select a role</option>';
    $.each(Role, function (i, item) {

      role += '<option value="' + item.role + '">' + item.role + '</option>'

    });
    $("#role").append(role);

  }




  RemoveRoleFunc() {


    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;

    this.setState({
      companyId: companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(({
        role: this.state.role,
        companyId: this.state.companyId,
        superiorId: this.state.superiorId,
      })),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deleterole",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        if (data.authorization == "DELETED") {

          var role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          var del = self.state.role;
          var key;
          var i = role.length;

          while (i--) {
            if (del == role[i].role) {
              key = i;
              var remRole;
              role.splice(i, 1);

            }

          }
          $('#role').empty();

          localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(role), "shinchanbaby"));
          $('[name=role]').val('');
          self.GetRole();
          confirmAlert({
            title: 'Removal Of Role Succeded', // Title dialog
            message: 'Successfully Removed Role ' + self.state.role, // Message dialog
            confirmLabel: 'Ok', // Text button confirm


          })



        }
        else {

          confirmAlert({
            title: 'Removal Of  Role Failed ',                        // Title dialog
            message: 'Cannot Remove Role ' + self.state.role + ' Because Employee Exist In The Role ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })



        }

        $('[name=role]').val('');
        self.state.role = " ";

        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={RoleAddRemove} />
              <Route path="/" component={RemoveRole} />
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

      <div class="container" style={{
        marginBottom: "30%",
        backgroundColor: "rgb(242, 242, 242)",
      color: "rgb(35, 47, 60)"
      }}>
        <h2>Remove Role</h2>


        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>



          <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
            <label>
              Role Name*
      <select
                id="role"
                className="form-control"
                onChange={this.handleUserInput}

                name="role"
                style={{ marginBottom: "15px" }}
              >
                <option value="" disabled selected hidden>Select your role</option>
              </select>
            </label>

          </div>
          <div>
            <button
              type="button"

              style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "25px",
                display: "block"
              }}
              disabled={!this.state.valid}
              className="btn btn-danger"
              onClick={() => this.RemoveRoleFunc()}
            >Remove</button>

          </div>


        </form>
      </div>


    );
  }

}

export default RemoveRole;