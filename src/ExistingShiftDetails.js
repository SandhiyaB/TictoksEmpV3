import React, { Component } from 'react';
import './EmployeeMenuPage.css';
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
import AddNewShift from './AddNewShift';
import ConfigurationPage from './ConfigurationPage';
import FooterText from './FooterText';
class ExistingShiftDetails extends Component {

  constructor() {
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    super()
    this.state = {
      shift: '',
      from: '',
      to: '',
      newShift: '',
      newFrom: '',
      newTo: '',
      currentRow: '',
      superiorId: superiorId,
    };

  }

  componentDidMount() {
    $("#Shift").hide();
    $("#From").hide();
    $("#To").hide();
    $("#submit").hide();
    $("#CancelUpdate").hide();

    this.GetData();
    this.UpdateButton();
    this.DeleteButton();


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


    window.scrollTo(0, 0);

  }

  GetData() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/getshiftconfigdata",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        $.each(data.shiftData, function (i, item) {
          var shiftdata = '<tbody><tr class="success"><td>' + item.shift + '</td><td>' + item.from + '</td><td>' + item.to + '</td><td><button id="delete">Delete</button></td><td><button id="update">Update</button></td></tr></tobody>';
          $("#shifttabledata").append(shiftdata);
        });

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
    this.setState({
      [name]: value,
      [id]: true
    });
    //$("#shift1").timepicker('option', 'maxTime', value);


  }




  UpdateButton() {

    var self = this;
    $("#shifttabledata").on('click', "#update", function () {
      $("#Shift").show();
      $("#From").show();
      $("#To").show();

      var currentRow = $(this).closest("tr");
      self.state.currentRow = currentRow;
      var updateShift = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var updateFrom = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      var updateTo = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value

      $("#shift").val(updateShift);
      $("#fromtimepicker").val(updateFrom);
      $("#Totimepicker").val(updateTo);

      self.state.shift = updateShift;
      self.state.from = updateFrom;
      self.state.to = updateTo;
      self.state.newFrom = updateFrom;
      self.state.newTo = updateTo;

      self.setState({
        shift: self.state.shift,
        from: self.state.from,
        to: self.state.to,
        newFrom: self.state.newFrom,
        newTo: self.state.newTo,


      })

      $("#submit").show();
      $("#CancelUpdate").show();



    })
  }


  DeleteButton() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });

    var self = this;
    $("#shifttabledata").on('click', "#delete", function () {

      var currentRow = $(this).closest("tr");
      var deleteShift = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var deleteFrom = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      var deleteTo = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value


      self.state.shift = deleteShift;
      self.state.from = deleteFrom;
      self.state.to = deleteTo;
      self.setState({
        shift: self.state.shift,
        from: self.state.from,
        to: self.state.to,
        companyId: self.state.companyId,


      })

      confirmAlert({
        title: 'Shift Delete Confirmation',                        // Title dialog
        message: 'Are You Sure , Do you want to Delete the Shift ' + self.state.shift + ' ? ',               // Message dialog
        confirmLabel: 'Delete',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.DeleteConfirm(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel

      })





    });
  }

  DeleteConfirm(currentRow) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        shift: self.state.shift,
        from: self.state.from,
        to: self.state.to,
        companyId: self.state.companyId,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/shiftconfigdelete",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        if (data.status == "EMP_EXITS") {
          confirmAlert({
            title: 'Deleting Shift Failed',                        // Title dialog
            message: 'Employees Exits in Shift ' + self.state.shift + '. Change Those Employee To Another Shift And Try Deleting The Shift Agaiin. ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });


        } else {
          confirmAlert({
            title: 'Deleting Shift Success',                        // Title dialog
            message: 'Deleted the Shift ' + data.shift+' Successfully',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confir

          })

          currentRow.remove();
        }

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
  NoAction() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={EmployeeMenuHeader} />

          <Route path="/" component={ExistingShiftDetails} />
          <Route path="/" component={FooterText} />


        </div>
      </Router>, document.getElementById('root'));


  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }



  Submit() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        shift: this.state.shift,
        newFrom: this.state.newFrom,
        newTo: this.state.newTo,
        companyId: this.state.companyId,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/ShiftUpdate",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {


        if (data.response == "Already_Time_Exist") {

          confirmAlert({
            title: 'Updating Shift Timings Failed',                        // Title dialog
            message: 'Timing Provided For The Shift '+self.state.shift+' Is  Already Provided For Another Shift',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })


          self.state.shift = self.state.shift;
          self.state.newFrom = self.state.from;
          self.state.newTo = self.state.to;

          self.setState({
            shift: self.state.shift,
            newFrom: self.state.from,
            newTo: self.state.to,
          })
        } else {
          $("#Shift").hide();
          $("#From").hide();
          $("#To").hide();
          $("#submit").hide();
          $("#CancelUpdate").hide();

          var currentRow = self.state.currentRow;
          currentRow.remove();
          var shiftdata = '<tbody><tr class="success"><td>' + self.state.shift + '</td><td>' + self.state.newFrom + '</td><td>' + self.state.newTo + '</td><td><button id="delete">Delete</button></td><td><button id="update">Update</button></td></tr></tobody>';
          $("#shifttabledata").append(shiftdata);

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

  Add() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={AddNewShift} />
          <Route path="/" component={FooterText} />


        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }
  CancelUpdate() {
    $("#Shift").hide();
    $("#From").hide();
    $("#To").hide();
    $("#submit").hide();
    $("#CancelUpdate").hide();


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

          <p>SHIFT1</p>

          <button onClick={() => this.Add()} id="add">Add New Shift</button>


          <div id="Shift">
            <label for="shift" >
              Shift
    		</label>

            <input type="text"
              onChange={this.handleUserInput}
              id="shift"
              name="newShift" style={{ width: "65%" }}
              readOnly />
          </div>

          <div id="From">
            <label for="From" >
              From
    		</label>
            <input

              type="text"
              data-step="5"
              value={this.state.newFrom}
              required
              name="newFrom"
              onSelect={this.handleFrom}
              className="form-control"
              id="fromtimepicker"
              placeholder="Enter Start Time"

            />       </div>

          <div id="To">
            <label for="To" >
              To
    		</label>
            <input

              type="text"
              data-step="5"
              value={this.state.newTo}
              required
              name="newTo"
              onSelect={this.handleTo}
              className="form-control"
              id="totimepicker"
              placeholder="Enter End Time"

            />
          </div>

          <button onClick={() => this.Submit()} id="submit">Submit</button>
          <button onClick={() => this.CancelUpdate()} id="CancelUpdate">Cancel</button>


          <div id="tableOverflow">
            <table class="table" id="shifttabledata" style={{ marginBottom: "30%" }}>
              <thead><tr class="headcolor"><th>Shift</th><th>From</th><th>To</th><th colspan="3" style={{ textAlign: "center" }}>Actions</th></tr></thead>
            </table>
          </div>

        </div>
      </div>
    );
  }

}
export default ExistingShiftDetails;
