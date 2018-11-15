
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import DepartmentAddRemove from './DepartmentAddRemove';
import FooterText from './FooterText';

const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};

class AddNewDepartment extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {

      superiorId: superiorId,
      department: '',
      companyId: '',
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

  Submit() {

    if(this.state.department.trim().length>0){
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addDepartment",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data.authorization == "DUPLICATE") {
          confirmAlert({
            title: 'Adding New Department Failed',                        // Title dialog
            message: 'The Department '+ data.department + ' Already Exist',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })


        }
        else {


          var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          department.push({ department: self.state.department });
          localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(department), "shinchanbaby"));

          confirmAlert({
            title: 'Adding New Department Success ', // Title dialog
            message: 'Added The Department '+ self.state.department +' Successfully', // Message dialog
            confirmLabel: 'Ok', // Text button confirm


          })

        }
        self.state.department = " ";

        ReactDOM.render(
          <Router >
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={DepartmentAddRemove} />


              <Route path="/" component={AddNewDepartment} />
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
      message: 'Enter Department Name',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

  }
  }


  render() {
    return (

      <div class="container" style={{
        marginBottom: "30%",
        backgroundColor: "rgb(242, 242, 242)",
        color: "#232f3c"
      }}>
        <h2>Add New Department</h2>

        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

          <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
            <label>
              Department Name*
 <input
                type="text"
                value={this.state.department}
                required name="department"
                onChange={this.handleUserInput}
                className="form-control"
                id="department"
                placeholder="Enter New Department Name"
              />
            </label>


            <button
              type="button"
              onClick={() => this.Submit()}

              style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "25px",
                display: "block"
              }}
              onClick={() => this.Submit()}
              class="btn btn-success" >ADD</button>

          </div>


        </form>
      </div>


    );
  }

}

export default AddNewDepartment;

