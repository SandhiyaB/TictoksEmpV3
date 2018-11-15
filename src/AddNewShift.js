import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
//import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CryptoJS from 'crypto-js';
import HolidayConfig from './HolidayConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuPage from './EmployeeMenuPage';
import ExistingShiftDetails from './ExistingShiftDetails';
import FooterText from './FooterText';
import CreatingNewShift from './CreatingNewShift';


class AddNewShift extends Component {
  constructor() {
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    super()
    this.state = {
      shift: '',
      from: '',
      to: '',
      companyId: '',
      superiorId: superiorId,
    };

  }

  componentDidMount() {

    window.scrollTo(0, 0);

    $('#fromtimepicker').timepicker({
      onSelect: function (time) {
        $("#totimepicker").timepicker('option', 'minTime', time);

        this.state.newfrom = time;
        this.setState({
          newfrom: time,
        });
      },

      timeFormat: 'H:i:s',
    });

    $('#totimepicker').timepicker({
      onSelect: function (time) {
        $("#fromtimepicker").timepicker('option', 'maxTime', time);

        this.state.newto = time;
        this.setState({
          newto: time,
        });

      },

      timeFormat: 'H:i:s',

    });

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleFrom = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const id = e.target.id;
    var no;
    this.setState({
      [name]: value,
      [id]: true
    });
    $("#" + id + no).timepicker('option', 'minTime', value);


  }
  handleTo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const id = e.target.id;
    var no;

    this.setState({
      [name]: value,
      [id]: true
    });
    $("#" + id + no).timepicker('option', 'minTime', value);

    //$("#shift1").timepicker('option', 'maxTime', value);

  }

  Add() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;

    this.setState({
      shift: this.state.shift,
      from: this.state.from,
      to: this.state.to,
      companyId: this.state.companyId,
      superiorId: this.state.superiorId,
    })
if((this.state.shift.length>0) && (this.state.from.length>0) && (this.state.to.length>0)){
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        shift: this.state.shift,
        from: this.state.from,
        to: this.state.to,
        companyId: this.state.companyId,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/shiftconfiginsert",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        if (data.response == "Already Exist") {
          if (data.response == "Already Exist") {
            confirmAlert({
              title: 'Adding New Shift Failed',                        // Title dialog
              message: 'The Shift ' + data.shift + ' Already Exist',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
  
  
            })
  

          $("#shift").val("");
          $("#from").val("");
          $("#to").val("");

          self.state.shift = "";
          self.state.from = "";
          self.state.to = "";

          self.setState({
            shift: self.state.shift,
            from: self.state.from,
            to: self.state.to,
          })
        } else if (data.response == "Already_Time_Exist") {

          confirmAlert({
            title: 'Adding New Shift Failed',                        // Title dialog
            message: 'The Time Specified For The Shift Already Exist',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

          self.state.shift = "";
          self.state.from = "";
          self.state.to = "";

          self.setState({
            shift: self.state.shift,
            from: self.state.from,
            to: self.state.to,
          })
        } else {
          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={ExistingShiftDetails} />
                <Route path="/" component={FooterText} />

              </div>
            </Router>,
            document.getElementById('root'));
          registerServiceWorker();

        }
      }
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
  else if(this.state.shift.length==0){
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Shift ',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Shift Timing. ',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }
  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={CreatingNewShift} />
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


          <div id="Shift">
            <label for="shift" >
              Shift
        </label>
            <select onChange={this.handleUserInput}
              id="shift"
              name="shift" style={{ width: "65%" }}
              required>
              <option value="" disabled selected hidden>Select Shift No</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>

            </select>

          </div>

          <div id="From">
            <label for="From" >
              From
        </label>
            <input

              type="text"
              data-step="5"
              value={this.state.from}
              required
              name="from"
              onSelect={this.handleFrom}
              className="form-control"
              id="fromtimepicker"
              placeholder="Enter Start Time"

            />    </div>

          <div id="To">
            <label for="To" >
              To
        </label>
            <input

              type="text"
              data-step="5"
              value={this.state.to}
              required
              name="to"
              onSelect={this.handleTo}
              className="form-control"
              id="totimepicker"
              placeholder="Enter End Time"

            />
          </div>
          <button onClick={() => this.Add()} id="submit">Submit</button>

        </div>
      </div>
    );
  }

}
export default AddNewShift;
{/* <input type="text"
              onChange={this.handleUserInput}
              id="shift"
              name="shift" style={{ width: "65%" }}
              placeholder="Enter Shift No" /> */}