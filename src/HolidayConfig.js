import React, { Component } from 'react';
import * as $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Multiselectjquery.css';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import LeaveType from './LeaveType';
import WeekEndConfig from './WeekEndConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import HolidayMenuPage from './HolidayMenuPage';
import "./bootstrap-multiselect.css";
import './EmployeeMenuPage.css';
import multiselect from 'bootstrap-multiselect/dist/js/bootstrap-multiselect';
import './App.css';
import FooterText from './FooterText';

import datepicker from 'jquery-ui/ui/widgets/datepicker';
//import fSelect from 'jquery-ui/ui/widgets/fSelect';
var Multiselect = require('react-bootstrap-multiselect/dist/index.js');
var arrayShift = [];
var arrayShiftNew = [];
var totalShift;
var today = new Date();
today = today.getFullYear();
class HolidayConfig extends Component {


  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {
      date: '',
      description: '',
      companyId: '',
      shift: '',
      oldDate: '',
      oldDescription: '',
      myData: '',
      superiorId: superiorId,

    };

  }

  componentDidMount() {

    var self = this;
    var tab;

    $('#datepicker').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        self.setState({
          date: date,
          // dateValid:true,
        });

      },

      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: '12M',
      numberOfMonths: 1
    });

    $("#leavetabledata").hide();
    $("#pid").hide();

    $("#leavetabledata").on('click', "#delete", function () {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      self.state.companyId = companyId;

      var currentRow = $(this).closest("tr");

      self.state.date = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      self.state.description = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      self.setState({
        date: self.state.date,
        //description:self.state.description,
        companyId: self.state.companyId,

      });


      $("#datepicker").val("");
      $("description").val("");
      //$(this).closest('tr').remove(); 
      confirmAlert({
        title: 'Deleting Holiday Confirmation',                        // Title dialog
        message: 'Are You Sure Do You Want To Remove Holiday On ' + self.state.date +'?' ,               // Message dialog
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.Delete(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel
      })


    })

    //FUNCTION ON CLICKING UPDATE BUTTON
    $("#leavetabledata").on('click', "#update", function () {
      var large = [];
      for (var i = 1; i <= totalShift; i++) {
        large.push({ label: 'Shift ' + i, value: i });
      }
      var updateData = self.state.myData;
      self.state.myData = large;
      arrayShift.splice(0, arrayShift.length);
      var currentRow = $(this).closest("tr");
      var html1;
      var shiftId;
      var updateDate = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var updateDescription = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      var updateShift = currentRow.find("td:eq(2)").html();
      updateShift = updateShift.split(",");

      /* for (var i = 0; i < totalShift; i++) {
        if (updateData[i].value == updateShift[i]) {
          large[i].selected = true;
        }
        
      } */
      self.state.myData = large;
      // self.state.shift=shift.toString();
      self.setState({
        myData: large,
        shift: self.state.shift,
      })



      $("#datepicker").val(updateDate);
      $("#description").val(updateDescription);

      self.state.date = updateDate;
      self.state.description = updateDescription;


      self.setState({
        oldDate: self.state.date,
        oldDescription: self.state.description,
        shift: self.state.shift,
      })

      //  $(this).closest('tr').remove();
      $('#addrow').hide();
      $('#updaterow').show();
      $('#cancelUpdate').show();
    });
    self.handleChange();
    self.GetData();


  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,

    });
  }

  handleUserInputDate = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      //dateValid:true
    });

  }
  handleChange = (e) => {

    /*  let selected = [...this.refs.myRef]
     .filter(option => option.selected)
     .map(option => option.value); */
    var self = this;
    var node = ReactDOM.findDOMNode(this.refs.myRef);
    var options = [].slice.call(node.querySelectorAll('option'));
    var selected = options.filter(function (option) {
      return option.selected;
    });
    var selectedValues = selected.map(function (option) {
      return option.value;
    });
    var sel = selectedValues.toString();


    this.state.shift = selectedValues.toString();


  }


  LeaveFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={LeaveType} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }

  HolidayFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={HolidayConfig} />
          <Route path="/" component={FooterText} />
          

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }

  WeekEndFunc() {


    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={WeekEndConfig} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }



  GetData() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;

    this.setState({
      companyId: this.state.companyId,

    });

    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/getholidayinfodata",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        if (data.holidayDatalist.length == 0) {
          $("#pid").show();
        } else {

          var tab = '<thead><tr class="headcolor"><th>Date</th><th>Description</th><th>Shift</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';

          $.each(data.holidayDatalist, function (i, item) {
            tab += '<tr class ="success" ><td>' + item.date + '</td><td>' + item.description + '</td><td>' + item.holiDayShift + '</td><td ><button id="delete">' + "Delete" + '</button><button id="update">' + "Update" + '</button></td></tr>';

          });
          $("#leavetabledata").append(tab);
          $("#leavetabledata").show();

        }

        totalShift = data.totalShift;

        var large = [];
        for (var i = 1; i <= totalShift; i++) {
          large.push({ label: 'Shift ' + i, value: i });

        }
        self.state.myData = large;
        self.setState({
          myData: large,
        })


      },
      error: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

       
      },

    });


  }

  AddRow() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    if((this.state.date.length!=0) && (this.state.description.length!=0)&& (this.state.shift.length!=0)){
    this.state.companyId = companyId;
    this.setState({
      date: this.state.date,
      description: this.state.description,
      companyId: this.state.companyId,
      shift: this.state.shift,
      superiorId: this.state.superiorId,

    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        description: this.state.description,
        companyId: this.state.companyId,
        shift: this.state.shift.toString(),
        superiorId: this.state.superiorId,

      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/addholidayinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        confirmAlert({
          title: 'Declaring Holiday Success',                        // Title dialog
          message: 'Holiday Is Being Declared On ' + self.state.date + ' Successfully',               // Message dialog
          confirmLabel: 'Ok',                           // Text button configuration

        });



        if (data.description == "New") {
          $("#leavetabledata").append("<tr><td>" + $("#datepicker").val() + "</td><td>" + $("#description").val() + "</td><td>" + self.state.shift + "</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
          $("#pid").hide();
          $("#leavetabledata").show();
        } else {
          confirmAlert({
            title: 'Declaring Holiday Failed',                        // Title dialog
            message: 'A Holiday Is Already Being Declared  On ' + self.state.date + ' . Please Use Update Option',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confi

          });


          $("#pid").hide();
          $("#leavetabledata").show();
        }
        var large = [];
        for (var i = 1; i <= totalShift; i++) {
          large.push({ label: 'Shift ' + i, value: i });
        }

        self.state.date = "";
        self.state.description = "";
        self.setState({
          date: self.state.date,
          description: self.state.description,
          myData: large,

        })

        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={HolidayMenuPage} />
              <Route path="/" component={HolidayConfig} />
              <Route path="/" component={FooterText} />

            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();

      },

      error: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      },

    });
  } else if(!this.state.shift.length) {

    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Shift.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

  }else if (!this.state.date.length){
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Date.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

  }else {
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Enter Description.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  

  }


  UpdateRow() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    if((this.state.date.length!=0) && (this.state.description.length!=0)&& (this.state.shift.length!=0)){
   
    this.state.companyId = companyId;

    this.setState({
      date: this.state.date,
      description: this.state.description,
      companyId: this.state.companyId,
      shift: this.state.shift.toString(),
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        description: this.state.description,
        companyId: this.state.companyId,
        shift: this.state.shift,
        oldDate: this.state.oldDate,
        oldDescription: this.state.oldDescription,
        superiorId: this.state.superiorId,

      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/updateholidayinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        $("#leavetabledata").empty();
        self.state.date = "";
        self.state.description = "";
        self.setState({
          date: self.state.date,
          description: self.state.description,
        })

        $("#datepicker").val("");
        $("#description").val("");
        $('#addrow').show();
        $('#updaterow').hide();
        $('#cancelUpdate').hide();
        self.GetData();
        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={HolidayMenuPage} />
              <Route path="/" component={HolidayConfig} />
              <Route path="/" component={FooterText} />
            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();

      },

      error: function (data, textStatus, jqXHR) {

        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });



      },

    });
  } else if(!this.state.shift.length) {

    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Shift.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

  }else if (!this.state.date.length){
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Date.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });

  }else {
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Enter Description.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }


  }
  CancelUpdate() {
    this.state.date = "";
    this.state.description = "";
    this.setState({
      date: this.state.date,
      description: this.state.description,
    })
    $("#datepicker").val("");
    $("#description").val("");
    $('#addrow').show();
    $('#updaterow').hide();
    $('#cancelUpdate').hide();


    $("#leavetabledata").empty();
    this.GetData();
  }

  //$(this).closest('tr').remove(); 
  Delete(currentRow) {


    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        date: this.state.date,
        superiorId: this.state.superiorId,


      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/deleteholidayinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        currentRow.remove();

        self.state.date = "";
        self.state.description = "";

        self.setState({
          date: self.state.date,
          description: self.state.description,
        })

      },

      error: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });


      },

    });


  }
  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={HolidayMenuPage} />
          <Route path="/" component={HolidayConfig} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }

  LeaveFunc() {


    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={LeaveType} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }

  HolidayFunc() {


    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={HolidayConfig} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }

  WeekEndFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={WeekEndConfig} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }


  render() {

    return (
      <div className="container" style={{ marginBottom: '30%' }}>
        <div class="jumbotron">

          <h2>Holiday Configuration For {today}</h2>
          <br />
          <label
            htmlFor="datepicker"
            style={{ paddingRight: '30px' }}>Select Shifts :</label>
          <Multiselect onChange={this.handleChange} ref="myRef" data={this.state.myData} value={this.state.myData} multiple />

          <form id="dateformat">

            <label
              htmlFor="datepicker"
              style={{ paddingRight: '30px' }}>Date:</label>

            <input
              style={{ width: '35%' }}
              type="text"
              value={this.state.date}
              id="datepicker"
              name="date"
              readOnly
              onChange={this.handleUserInputDate} />
          </form>
          <form id="Description">

            <label
              htmlFor="description"
              style={{ paddingRight: '30px' }}>Description:</label>

            <input
              style={{ width: '35%' }}
              type="text"
              value={this.state.description}
              id="description"
              name="description"
              onChange={this.handleUserInput} />
          </form>

          <button type="button" id="addrow" onClick={() => this.AddRow()} class="btn btn-info">Add</button>

          <button type="button" id="updaterow" onClick={() => this.UpdateRow()} style={{ display: "none" }} class="btn btn-info">Update</button>
          <button type="button" id="cancelUpdate" onClick={() => this.CancelUpdate()} style={{ display: "none" }} class="btn btn-info">Cancel</button>

          <h2 id="pid">No Holidays Declared Yet</h2>
          <div id="tableOverflow">
            <table class="table" id="leavetabledata">

            </table>
          </div>

        </div>
      </div>
    );
  }

}
export default HolidayConfig;
/* 
<Multiselect  data={this.state.myData} value={this.state.myData} multiple />
 */