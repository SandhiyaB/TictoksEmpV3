import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import HolidayConfig from './HolidayConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuPage from './EmployeeMenuPage';
import ConfigurationPage from './ConfigurationPage';
import FooterText from './FooterText';


class ShiftMode extends Component {


  constructor() {
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    super()
    this.state = {
      companyId: '',
      hours: '',
      shiftSwitched: 1,
      superiorId: superiorId,

    };

  }


  componentDidMount() {

    $('#hours').timepicker({
      onSelect: function (time) {
        $("#hours").timepicker('option', 'minTime', time);

        this.state.hours = time;

        this.setState({
          hours: time,
        });

      },

      timeFormat: 'H:i:s',
    });

  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      //hours:true,
    });
  }

  Submit() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: this.state.companyId,
      shiftSwitched: this.state.shiftSwitched,


    })

    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/shiftstrictmode",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        localStorage.setItem('ShiftMode', CryptoJS.AES.encrypt("1", "shinchanbaby"));


        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={ConfigurationPage} />
              <Route path="/" component={FooterText} />

            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();


      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      }

    });

  }
  BackbtnFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={ConfigurationPage} />
          <Route path="/" component={FooterText} />
        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }
  render() {

    return (
      <div className="container" style={{ marginBottom: '30%' }}>
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

        <div class="jumbotron">

          <label for="To" >
           Minimum Hours to Check-In*
        </label>

          
      <input
            // class="form-control" 
            type="text"
            data-step="5"
            value={this.state.hours}
            required
            name="hours"
            onSelect={this.handleUserInput}
            className="form-control"
            id="hours"
          />


          <button onClick={() => this.Submit()} id="submit">Submit</button>
          <button style={{marginLeft:"20px"}} onClick={() => this.BackbtnFunc()} id="submit">Cancel</button>


        </div>
      </div>
    );
  }

}
export default ShiftMode;


