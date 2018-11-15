import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import RoleAddRemove from './RoleAddRemove';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';



class AddNewRole extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {
      role: '',
      department: '',
      companyId: '',
      superiorId: superiorId,
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
  }

  AddRoleFunc() {
if(this.state.role.trim().length>0){
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addRole",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data.authorization == "DUPLICATE") {
          confirmAlert({
            title: 'Adding New Role Failed ',                        // Title dialog
            message: 'The Role ' +data.role + ' Already Exist',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

        }
        else {

          var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          Role.push({ role: self.state.role });

          localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(Role), "shinchanbaby"));

          confirmAlert({
            title: 'Adding New Role Success',                        // Title dialog
            message: 'Added The New Role '+self.state.role+' Successfully',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

        }
        self.state.role = "";

        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />

              <Route path="/" component={RoleAddRemove} />
              <Route path="/" component={AddNewRole} />
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
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Enter Role Name.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }


  render() {
    return (

      <div class="container" style={{
        marginBottom: "30%",
       
        backgroundColor: "rgb(242, 242, 242)",
        color: "rgb(35, 47, 60)"
        
      }}>
        <h2>Add New Role</h2>
        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
       
<div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
            <label>
              New Role Name*
      <input
                type="text"
                value={this.state.role}
                required name="role"
                onChange={this.handleUserInput}
                className="form-control"
                id="role"
                placeholder="Enter New Role Name"
              />
            </label>


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

              className="btn btn-success"
              onClick={() => this.AddRoleFunc()}
            >Add</button>

          </div>


        </form>
      </div>


    );
  }

}

export default AddNewRole;

