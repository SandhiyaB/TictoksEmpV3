import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import HolidayConfig from './HolidayConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import WeekEndConfig from './WeekEndConfig';
import HolidayMenuPage from './HolidayMenuPage';
//import SelectSearch from 'react-select-search';
import './LeaveTypeCss.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import FooterText from './FooterText';

var currentRow;
var today = new Date();
today = today.getFullYear();

class LeaveType extends Component {

  constructor() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    if (companyType == "Office") {
      companyType = "Employee";
    }
    else {
      companyType = "Student/Staff";
    }
    super()
    this.state = {

      leaveType: '',
      noofLeave: '',
      companyId: companyId,
      leaveTypeEdited: 'None',
      superiorId: superiorId,
      companyType: companyType

    };
  }


  componentDidMount() {

    var self = this;
    var tab;
    $("#leavetabledata").on('click', "#delete", function () {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      self.state.companyId = companyId;

      currentRow = $(this).closest("tr");

      self.state.leaveType = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      self.state.noofLeave = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      self.setState({
        leaveType: self.state.leaveType,
        //description:self.state.description,
        companyId: self.state.companyId,

      });

      confirmAlert({
        title: 'Deleting Leave Type Confirmation',                        // Title dialog
        message: 'Are You Sure Do You Want To Remove Leave ' + self.state.leaveType + ' That Is Being Declared  ',            // Message dialog
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.Delete(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel
      })



    })

    $("#leavetabledata").on('click', "#update", function () {

      currentRow = $(this).closest("tr");


      var updateLeaveType = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var updateNoOfLeave = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      self.state.leaveType = updateLeaveType;
      self.state.noofLeave = updateNoOfLeave;

      self.setState({
        oldLeaveType: self.state.leaveType,
        oldnoofLeave: self.state.noofLeave,
        //leaveTypeEdited:self.state.leaveTypeEdited
      })

      $('[name=leaveType]').val(updateLeaveType);
      $("#leaveType").prop('disabled', true);
      $('#addrow').hide();
      $('#updaterow').show();
      $('#cancelUpdate').show();
    })


    self.GetData();

    window.scrollTo(0, 0);
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

  GetData() {
    var tab;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;

    this.setState({
      leaveType: this.state.leaveType,
      noofLeave: this.state.noofLeave,
      superiorId: this.state.superiorId,
     
      companyId: this.state.companyId,
    });


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        leaveType: this.state.leaveType,
        noofLeave: this.state.noofLeave,
        superiorId: this.state.superiorId,
        
        companyId: this.state.companyId,


      }
      ),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/getleaveinfodata",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {


        $.each(data.holidayDatalist, function (i, item) {

          tab += '<tr><td>' + item.leaveType + '</td><td>' + item.days + '</td><td ><button id="delete">' + "Delete" + '</button><button id="update">' + "Update" + '</button></td></tr>';

        });
        $("#leavetabledata").append(tab);

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

    if((this.state.leaveType.length!=0) && (this.state.noofLeave.length!=0)){
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;

    this.setState({
      date: this.state.date,
      leaveType: this.state.leaveType,
      noofLeave: this.state.noofLeave,
      companyId: this.state.companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: this.state.companyId,
        leaveType: this.state.leaveType,
        noofLeave: this.state.noofLeave,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/addLeaveinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        if (data.description == "New") {
          $("#leavetabledata").append("<tr><td>" + self.state.leaveType + "</td><td>" + $("#noofleave").val() + "</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
          self.state.leaveType = "";
          self.state.noofLeave = "";

          $('[name=leaveType]').val('');
          self.setState({
            leaveType: self.state.leaveType,
            noofLeave: self.state.noofLeave,
          })

        } else {
          confirmAlert({
            title: 'Declaring Days For ' + self.state.leaveType + ' Failed',                        // Title dialog
            message: 'You have Already Declared Leave Days for ' + self.state.leaveType,               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });


          $('[name=leaveType]').val('');
        }
        $('[name=leaveType]').val('');
        $("#noofleave").val("");
        self.state.leaveType = "";
        self.state.noofLeave = "";

        self.setState({
          leaveType: self.state.leaveType,
          noofLeave: self.state.noofLeave,
        })

        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={HolidayMenuPage} />
              <Route path="/" component={LeaveType} />
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

        $('[name=leaveType]').val('');
        self.state.leaveType = "";
        self.state.noofLeave = "";

        self.setState({
          leaveType: self.state.leaveType,
          noofLeave: self.state.noofLeave,
        })
      },

    });
  }
  else if(!this.state.leaveType.length){
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select Leave Type.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }else{
     
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Enter Number Of Days.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }
  UpdateRow() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

  
    this.state.companyId = companyId;
    this.setState({

      noofleave: this.state.noofleave,
      companyId: this.state.companyId,
      leavetype: this.state.leavetype,
      oldLeaveType: this.state.oldLeaveType,
      oldnoofLeave: this.state.oldnoofLeave,

    });

    var self = this;
    if (this.state.noofLeave == this.state.oldnoofLeave) {

      $('#addrow').show();
      $('#updaterow').hide();
      $('#cancelUpdate').hide();

      $('[name=leaveType]').val('');
      self.state.leaveType = "";
      self.state.noofLeave = "";

      self.setState({
        leaveType: self.state.leaveType,
        noofLeave: self.state.noofLeave,
      })
      confirmAlert({
        title: 'No Change',                        // Title dialog
        message: 'There is No Change.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm


      });
    } else {

      if((this.state.leaveType.length!=0) && (this.state.noofLeave.length!=0)){
    
      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          companyId: this.state.companyId,
          leaveType: this.state.leaveType,
          oldLeaveType: this.state.oldLeaveType,
          noofLeave: this.state.noofLeave,
          oldnoofLeave: this.state.oldnoofLeave,
          superiorId: this.state.superiorId,
        }),
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/updateleaveinfo",
        contentType: "application/json",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
          currentRow.remove();

          $("#leavetabledata").append("<tr><td>" + self.state.leaveType + "</td><td>" + $("#noofleave").val() + "</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")


          self.state.leaveType = "";
          self.state.noofLeave = "";

          self.setState({
            leaveType: self.state.leaveType,
            noofLeave: self.state.noofLeave,
          })

          $('#addrow').show();
          $('#updaterow').hide();
          $('#cancelUpdate').hide();

          $('[name=leaveType]').val('');
          $("#leaveType").prop('disabled', false);
          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={HolidayMenuPage} />
                <Route path="/" component={LeaveType} />
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

          $('#addrow').show();
          $('#updaterow').hide();
          $('#cancelUpdate').hide();

          $('[name=leaveType]').val('');

          self.state.leaveType = "";
          self.state.noofLeave = "";

          self.setState({
            leaveType: self.state.leaveType,
            noofLeave: self.state.noofLeave,
          })

        },

      });
    }else{
         
        confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'Please Enter Number Of Days.',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }
    }

  }
  CancelUpdate() {
    this.state.leaveType = "";
    this.state.noofLeave = "";

    this.setState({
      leaveType: this.state.leaveType,
      noofLeave: this.state.noofLeave,
    })
    $('#addrow').show();
    $('#updaterow').hide();
    $('#cancelUpdate').hide();
    $('[name=leaveType]').val('');

    $("#leavetabledata").empty();
    this.GetData();
  }

  Delete(currentRow) {

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        leaveType: this.state.leaveType,
        superiorId: this.state.superiorId,
      }),


      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/deleteleaveinfo",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        self.state.leaveType = "";
        self.state.noofLeave = "";

        self.setState({
          leaveType: self.state.leaveType,
          noofLeave: self.state.noofLeave,
        })
        currentRow.remove();
      },

      error: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

        self.state.leaveType = "";
        self.state.noofLeave = "";

        self.setState({
          leaveType: self.state.leaveType,
          noofLeave: self.state.noofLeave,
        })

      },

    });
    //})

  }
  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={HolidayMenuPage} />
          <Route path="/" component={LeaveType} />
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

          <h2>Leave Configuration For {today}</h2>
          <br />
          <form id="LeaveType" style={{ paddingRight: '30px', marginRight: '0px' }}>

            <label
              htmlFor="leaveType"
              style={{ paddingRight: '30px', marginLeft: '0px' }}>LeaveType:</label>

            <select id="leaveType"
              name="leaveType"
              onChange={this.handleUserInput}
            >
              <option value="" disabled selected hidden>Select your Leave Type</option>
              <option value="AnnualLeave">Annual Leave</option>
              <option value="CasualLeave">Casual Leave</option>
              <option value="FamilyLeave">Family Leave</option>
              <option value="MaternityLeave">Maternity Leave</option>
              <option value="MedicalLeave">Medical Leave</option>
              <option value="PaternityLeave">Paternity Leave</option>
              <option value="PrivilegeLeave">Privilege Leave</option>
              <option value="SickLeave">Sick Leave</option>
              <option value="CompassinateLeave">Compassinate Leave</option>
              <option value="VacationLeave">Vacation Leave</option>

            </select>
          </form>
          <form id="NoOfLeave">

            <label
              htmlFor="noofLeave"
              style={{ paddingRight: '30px' }}>NoOfLeave:</label>

            <input
              style={{ width: '35%' }}
              type="text"
              value={this.state.noofLeave}
              id="noofleave"
              name="noofLeave"
              onChange={this.handleUserInput} />

          </form>

          <button type="button" id="addrow" onClick={() => this.AddRow()} class="btn btn-info">Add</button>

          <button type="button" id="updaterow" onClick={() => this.UpdateRow()} style={{ display: "none" }} class="btn btn-info">Update</button>
          <button type="button" id="cancelUpdate" onClick={() => this.CancelUpdate()} style={{ display: "none" }} class="btn btn-info">Cancel</button>


          <table id="leavetabledata" class="table">
            <thead><tr class="headcolor"><th class="headcolor">LeaveType</th><th>No.Of.Days</th><th style={{ colSpan: "2" }}>Action</th></tr>
            </thead>
          </table>

        </div>
      </div>

    );
  }

}
export default LeaveType;

