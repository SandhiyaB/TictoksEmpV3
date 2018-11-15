import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import HolidayConfig from './HolidayConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import LeaveType from './LeaveType';
import HolidayMenuPage from './HolidayMenuPage';
import './EmployeeMenuPage.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import FooterText from './FooterText';
var arrayShift = [];
var arrayShiftNew = [];

class WeekEndConfig extends Component {


  constructor() {

    var today = new Date();
    var displayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {

      leavePerYear: 0,
      companyId: '',
      date: date,
      sundayOption: 'NoneSundays',
      mondayOption: 'NoneMondays',
      tuesdayOption: 'NoneTuesdays',
      wednesdayOption: 'NoneWednesdays',
      thursdayOption: 'NoneThursdays',
      fridayOption: 'NoneFridays',
      saturdayOption: 'NoneSaturdays',
      shift: "Shift1",
      editsave: "edit",
      superiorId: superiorId,

    };
  }

  componentDidMount() {
 
    var self = this;

    $("#sundayradio").hide();
    $("#mondayradio").hide();
    $("#tuesdayradio").hide();
    $("#wednesdayradio").hide();
    $("#thursdayradio").hide();
    $("#fridayradio").hide();
    $("#saturdayradio").hide();


    this.GetData(this.state.shift);

    $("#weekendholiday :input").prop("disabled", true);
    window.scrollTo(0, 0);

  }


  //function for getting pre-configured data's
  GetData(value) {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;

    this.state.shift = value;

    this.setState({
      companyId: this.state.companyId,
      shift: this.state.shift,

    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        leavePerYear: 0,
        companyId: this.state.companyId,
        date: this.state.date,
        sundayOption: this.state.sundayOption,
        mondayOption: this.state.mondayOption,
        tuesdayOption: this.state.tuesdayOption,
        wednesdayOption: this.state.wednesdayOption,
        thursdayOption: this.state.thursdayOption,
        fridayOption: this.state.fridayOption,
        saturdayOption: this.state.saturdayOption,
        shift: this.state.shift,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/getholidayconfigurationdata",
     //url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeLeaveHoliday/getholidayconfigurationdata",
     
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {



        //Assigining pre-configured leavePerYear data
        var leavePerYearinfo = data.leavePerYear;
        $("#leaveperyearinfo").val(leavePerYearinfo);
        self.state.leavePerYear = data.leavePerYear;


        if (data.weekendOptionList.length != 0) {
          //Assigining pre-configured leave option  data
          self.state.sundayOption = data.weekendOptionList[0].weekdaysHoliday;
          self.state.mondayOption = data.weekendOptionList[1].weekdaysHoliday;
          self.state.tuesdayOption = data.weekendOptionList[2].weekdaysHoliday;
          self.state.wednesdayOption = data.weekendOptionList[3].weekdaysHoliday;
          self.state.thursdayOption = data.weekendOptionList[4].weekdaysHoliday;
          self.state.fridayOption = data.weekendOptionList[5].weekdaysHoliday;
          self.state.saturdayOption = data.weekendOptionList[6].weekdaysHoliday;

          self.setState({
            sundayOption: self.state.sundayOption,
            mondayOption: self.state.mondayOption,
            tuesdayOption: self.state.tuesdayOption,
            wednesdayOption: self.state.wednesdayOption,
            thursdayOption: self.state.thursdayOption,
            fridayOption: self.state.fridayOption,
            saturdayOption: self.state.saturdayOption,
          });


          //Unchecking the checkbox if option value is found to be NONE

          //SundayOPtion
          if (self.state.sundayOption == "NoneSundays") {
            $("#sundayradio").hide();

            if ($("#sunday").is(':checked')) {
              $("#sunday").prop('checked', false);
            }

          } else {
            $("#sunday").prop('checked', true);
            $("#sundayradio").show();
          }


          //MondayOPtion
          if (self.state.mondayOption == "NoneMondays") {
            $("#mondayradio").hide();

            if ($("#monday").is(':checked')) {
              $("#monday").prop('checked', false);
            }
          } else {
            $("#monday").prop('checked', true);
            $("#mondayradio").show();
          }


          //TuesdayOption
          if (self.state.tuesdayOption == "NoneTuesdays") {
            $("#tuesdayradio").hide();

            if ($("#tuesday").is(':checked')) {
              $("#tuesday").prop('checked', false);
            }
          } else {
            $("#tuesday").prop('checked', true);
            $("#tuesdayradio").show();
          }


          //WednesdayOPtion
          if (self.state.wednesdayOption == "NoneWednesdays") {
            $("#wednesdayradio").hide();

            if ($("#wednesday").is(':checked')) {
              $("#wednesday").prop('checked', false);
            }
          } else {
            $("#wednesday").prop('checked', true);
            $("#wednesdayradio").show();
          }


          //ThursdayOption
          if (self.state.thursdayOption == "NoneThursdays") {
            $("#thursdayradio").hide();

            if ($("#thursday").is(':checked')) {
              $("#thursday").prop('checked', false);
            }
          } else {
            $("#thursday").prop('checked', true);
            $("#thursdayradio").show();
          }


          //FridayOption
          if (self.state.fridayOption == "NoneFridays") {
            $("#fridayradio").hide();

            if ($("#friday").is(':checked')) {
              $("#friday").prop('checked', false);
            }
          } else {
            $("#friday").prop('checked', true);
            $("#fridayradio").show();
          }

          //SaturdayOption
          if (self.state.saturdayOption == "NoneSaturdays") {
            $("#saturdayradio").hide();

            if ($("#saturday").is(':checked')) {
              $("#saturday").prop('checked', false);
            }
          } else {
            $("#saturday").prop('checked', true);
            $("#saturdayradio").show();
          }

        } else {


          $("#sunday").prop('checked', false);
          $("#monday").prop('checked', false);
          $("#tuesday").prop('checked', false);
          $("#wednesday").prop('checked', false);
          $("#thursday").prop('checked', false);
          $("#friday").prop('checked', false);
          $("#saturday").prop('checked', false);

          $("#sundayradio").hide();
          $("#mondayradio").hide();
          $("#tuesdayradio").hide();
          $("#wednesdayradio").hide();
          $("#thursdayradio").hide();
          $("#fridayradio").hide();
          $("#saturdayradio").hide();
          self.setState({
            sundayOption: 'NoneSundays',
            mondayOption: 'NoneMondays',
            tuesdayOption: 'NoneTuesdays',
            wednesdayOption: 'NoneWednesdays',
            thursdayOption: 'NoneThursdays',
            fridayOption: 'NoneFridays',
            saturdayOption: 'NoneSaturdays',
          })

        }



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

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,

    });
  }

  handleCheckBox = (e) => {
    const name = e.target.name;

    if ($('#' + name).is(':checked')) {
      $(name).attr('value', 'true');
      $("#" + name + "radio").show();
      if (name == "sunday") {

        this.setState({
          sundayOption: "AllSundays",
        });
      }
      else if (name == "monday") {

        this.setState({
          mondayOption: "AllMondays",
        });

      } else if (name == "tuesday") {

        this.setState({
          tuesdayOption: "AllTuesdays",
        });

      } else if (name == "wednesday") {

        this.setState({
          wednesdayOption: "AllWednesdays",
        });

      } else if (name == "thursday") {


        this.setState({
          thursdayOption: "AllThursdays",
        });

      } else if (name == "friday") {

        this.setState({
          fridayOption: "AllFridays",
        });

      } else if (name == "saturday") {

        this.setState({
          saturdayOption: "AllSaturdays",
        });

      }

    } else {

      if (!$('#' + name).is(':checked')) {
        $(name).attr('value', 'true');

        $("#" + name + "radio").hide();
        if (name == "sunday") {

          this.setState({
            sundayOption: "NoneSundays",
          });
        }
        else if (name == "monday") {

          this.setState({
            mondayOption: "NoneMondays",
          });

        } else if (name == "tuesday") {

          this.setState({
            tuesdayOption: "NoneTuesdays",
          });

        } else if (name == "wednesday") {

          this.setState({
            wednesdayOption: "NoneWednesdays",
          });

        } else if (name == "thursday") {


          this.setState({
            thursdayOption: "NoneThursdays",
          });

        } else if (name == "friday") {

          this.setState({
            fridayOption: "NoneFridays",
          });

        } else if (name == "saturday") {

          this.setState({
            saturdayOption: "NoneSaturdays",
          });

        }

      }

    }


  }

  //function called on submit button click
  Config() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.setState({

      sundayOption: this.state.sundayOption,
      mondayOption: this.state.mondayOption,
      tuesdayOption: this.state.tuesdayOption,
      wednesdayOption: this.state.wednesdayOption,
      thursdayOption: this.state.thursdayOption,
      fridayOption: this.state.fridayOption,
      saturdayOption: this.state.saturdayOption,
      leaveperyear: this.state.leaveperyear,
      date: this.state.date,
      companyId: this.state.companyId,
      shift: this.state.shift,
      superiorId: this.state.superiorId

    });
    alert(JSON.stringify(this.state));
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        leavePerYear: 0,
        companyId: this.state.companyId,
        date: this.state.date,
        sundayOption: this.state.sundayOption,
        mondayOption: this.state.mondayOption,
        tuesdayOption: this.state.tuesdayOption,
        wednesdayOption: this.state.wednesdayOption,
        thursdayOption: this.state.thursdayOption,
        fridayOption: this.state.fridayOption,
        saturdayOption: this.state.saturdayOption,
        shift: this.state.shift,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeLeaveHoliday/holidayconfiguration",
     // url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeLeaveHoliday/holidayconfiguration",
     
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        self.setState({ editsave: 'edit' });
        $("#weekendholiday :input").prop("disabled", true);
        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={HolidayMenuPage} />

              <Route path="/" component={WeekEndConfig} />
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


  }

  handleOptionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    $("input[value='" + value + "']").prop('checked', true);
    this.GetData(value);

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



  buildOptions() {
    var arr = [];

    for (let i = 0; i <= 20; i++) {
      arr.push(<option name="leavePerYear" key={i} value={i} >{i}</option>)
    }

    return arr;
  }
  edit() {

    $("#weekendholiday :input").prop("disabled", false);

    this.setState({
      editsave: 'save',

    })

  }

  render() {

    return (
      <div className="container" style={{ marginBottom: '30%' }}>
        <div class="jumbotron">

          <h2>Week End Holiday Configuration</h2>
          <br />
          <div id="mydiv" >
            {/*CONTENT FOR LEAVE PER YEAR :
*/}

            {/*
<form id="leaveperyear"  style={{ paddingBottom: '20px', position: 'inline-block'}}   >

                               <label
                                    htmlFor="noofleavedaysperyear"
                                    style={{ paddingRight: '30px' }}>No Of Leave Granted Per Year:</label>
				<select className="select-board-size" name="leavePerYear"  id="leaveperyearinfo"
				value={this.state.leavePerYear} onChange={this.handleUserInput}> 
				{this.buildOptions()}
						            </select>
       
        </form >*/}






            {/*CONTENT FOR SHIFT :
*/}


            <form id="Shift">

              <label>Shift</label>
              <br />
              <input type="radio" name="shift" value="Shift1" checked={this.state.shift === 'Shift1'} onChange={this.handleOptionChange}
              />
              Shift-1

 <input type="radio" name="shift" style={{marginLeft:"20px"}} value="Shift2" checked={this.state.shift === 'Shift2'} onChange={this.handleOptionChange}
              />
              Shift-2
   <input type="radio" name="shift" style={{marginLeft:"20px"}} value="Shift3" checked={this.state.shift === 'Shift3'} onChange={this.handleOptionChange}
              />
              Shift-3

           </form>



            {/*CONTENT FOR WEEKEND HOLIDAY DAYS :
*/}

            <form id="weekendholiday" >

              <br />
              <label
                htmlFor="weekdaysholiday"
                style={{ paddingRight: '30px' }}>Week End Holiday Days:</label>


              {/*CONTENT FOR SUNDAY CHECKBOX AND RADIO BUTTONS:
*/}
              <div class="checkbox">
                <label><input type="checkbox"
                  value={this.state.sunday}
                  name="sunday"
                  onChange={this.handleCheckBox}
                  id="sunday" />Sunday</label>
              </div>

              <form style={{marginBottom:"20px"}} id="sundayradio">
                <input type="radio" name="sundayOption" value="EvenSundays" checked={this.state.sundayOption === 'EvenSundays'} onChange={(e) => this.setState({ sundayOption: e.target.value })} />
                EvenSundays
  <input type="radio" name="sundayOption" style={{marginLeft:"20px"}} value="OddSundays" checked={this.state.sundayOption === 'OddSundays'} onChange={(e) => this.setState({ sundayOption: e.target.value })} />
                OddSundays
  <input type="radio" name="sundayOption" style={{marginLeft:"20px"}} value="AllSundays" checked={this.state.sundayOption === 'AllSundays'} onChange={(e) => this.setState({ sundayOption: e.target.value })} />
                All

</form>


              {/*CONTENT FOR MONDAY CHECKBOX AND RADIO BUTTONS:
*/}


              <div class="checkbox">
                <label><input type="checkbox"

                  value={this.state.monday}
                  name="monday"
                  onChange={this.handleCheckBox}
                  id="monday" />Monday</label>
              </div>

              <form  style={{marginBottom:"20px"}} id="mondayradio">
                <input type="radio" id="EvenMondays" name="mondayOption" value="EvenMondays" checked={this.state.mondayOption === 'EvenMondays'} onChange={(e) => this.setState({ mondayOption: e.target.value })} />
                EvenMonndays
  <input type="radio" id="OddMondays" style={{marginLeft:"20px"}} name="mondayOption" value="OddMondays" checked={this.state.mondayOption === 'OddMondays'} onChange={(e) => this.setState({ mondayOption: e.target.value })} />
                OddMondays
  <input type="radio" id="All" style={{marginLeft:"20px"}} name="mondayOption" value="AllMondays" checked={this.state.mondayOption === 'AllMondays'} onChange={(e) => this.setState({ mondayOption: e.target.value })} />
                All

</form>

              {/*CONTENT FOR TUESDAY CHECKBOX AND RADIO BUTTONS:
*/}

              <div class="checkbox">
                <label><input type="checkbox"

                  value={this.state.tuesday}
                  name="tuesday"
                  onChange={this.handleCheckBox}
                  id="tuesday" />Tuesday</label>
              </div>

              <form  style={{marginBottom:"20px"}} id="tuesdayradio">
                <input type="radio" id="EvenTuesdays" name="tuesday" value="EvenTuesdays" checked={this.state.tuesdayOption === 'EvenTuesdays'} onChange={(e) => this.setState({ tuesdayOption: e.target.value })} />
                EvenTuesdays
  <input type="radio" id="OddTuesdays" style={{marginLeft:"20px"}}  name="tuesday" value="OddTuesdays" checked={this.state.tuesdayOption === 'OddTuesdays'} onChange={(e) => this.setState({ tuesdayOption: e.target.value })} />
                OddTuesdays
  <input type="radio" id="AllTuesdays" style={{marginLeft:"20px"}} name="tuesday" value="AllTuesdays" checked={this.state.tuesdayOption === 'AllTuesdays'} onChange={(e) => this.setState({ tuesdayOption: e.target.value })} />
                All

</form>


              {/*CONTENT FOR WEDNESDAY CHECKBOX AND RADIO BUTTONS:
*/}


              <div class="checkbox">
                <label><input type="checkbox"

                  value={this.state.wednesday}
                  name="wednesday"
                  onChange={this.handleCheckBox}
                  id="wednesday" />Wednesday</label>
              </div>

              <form  style={{marginBottom:"20px"}} id="wednesdayradio">
                <input type="radio" id="EvenWednesdays" name="wednesday" value="EvenWednesdays" checked={this.state.wednesdayOption === 'EvenWednesdays'} onChange={(e) => this.setState({ wednesdayOption: e.target.value })} />
                EvenWednesdays
  <input type="radio" id="OddWednesdays" style={{marginLeft:"20px"}}  name="wednesday" value="OddWednesdays" checked={this.state.wednesdayOption === 'OddWednesdays'} onChange={(e) => this.setState({ wednesdayOption: e.target.value })} />
                OddWednesdays
  <input type="radio" id="AllWednesdays" style={{marginLeft:"20px"}} name="wednesday" value="AllWednesdays" checked={this.state.wednesdayOption === 'AllWednesdays'} onChange={(e) => this.setState({ wednesdayOption: e.target.value })} />
                All

</form>



              {/*CONTENT FOR THURSDAY CHECKBOX AND RADIO BUTTONS:
*/}



              <div class="checkbox">
                <label><input type="checkbox"

                  value={this.state.thursday}
                  name="thursday"
                  onChange={this.handleCheckBox}
                  id="thursday" />Thursday</label>
              </div>

              <form  style={{marginBottom:"20px"}} id="thursdayradio">
                <input type="radio" id="EvenThursdays" name="thursday" value="EvenThursdays" checked={this.state.thursdayOption === 'EvenThursdays'} onChange={(e) => this.setState({ thursdayOption: e.target.value })} />
                EvenThursdays
  <input type="radio" id="OddThursdays" style={{marginLeft:"20px"}}  name="thursday" value="OddThursdays" checked={this.state.thursdayOption === 'OddThursdays'} onChange={(e) => this.setState({ thursdayOption: e.target.value })} />
                OddThursdays
  <input type="radio" id="AllThursdays" style={{marginLeft:"20px"}} name="thursday" value="AllThursdays" checked={this.state.thursdayOption === 'AllThursdays'} onChange={(e) => this.setState({ thursdayOption: e.target.value })} />
                All

</form>


              {/*CONTENT FOR FRIDAY CHECKBOX AND RADIO BUTTONS:
*/}



              <div class="checkbox">
                <label><input type="checkbox"

                  value={this.state.friday}
                  name="friday"
                  onChange={this.handleCheckBox}
                  id="friday" />Friday</label>
              </div>

              <form  style={{marginBottom:"20px"}} id="fridayradio">
                <input type="radio" id="EvenFridays" name="friday" value="EvenFridays" checked={this.state.fridayOption === 'EvenFridays'} onChange={(e) => this.setState({ fridayOption: e.target.value })} />
                EvenFridays
  <input type="radio" id="OddFridays" style={{marginLeft:"20px"}} name="friday" value="OddFridays" checked={this.state.fridayOption === 'OddFridays'} onChange={(e) => this.setState({ fridayOption: e.target.value })} />
                OddFridays
  <input type="radio" id="AllFridays" style={{marginLeft:"20px"}} name="friday" value="AllFridays" checked={this.state.fridayOption === 'AllFridays'} onChange={(e) => this.setState({ fridayOption: e.target.value })} />
                All

</form>


              {/*CONTENT FOR SATURDAY CHECKBOX AND RADIO BUTTONS:
*/}



              <div class="checkbox">
                <label><input type="checkbox"

                  value={this.state.saturday}
                  name="saturday"
                  onChange={this.handleCheckBox}
                  id="saturday" />Saturday</label>
              </div>

              <form  style={{marginBottom:"20px"}} id="saturdayradio">
                <input type="radio" id="EvenSaturdays" name="saturday" value="EvenSaturdays" checked={this.state.saturdayOption === 'EvenSaturdays'} onChange={(e) => this.setState({ saturdayOption: e.target.value })} />
                EvenFridays
  <input type="radio" id="OddSaturdays" style={{marginLeft:"20px"}} name="saturday" value="OddSaturdays" checked={this.state.saturdayOption === 'OddSaturdays'} onChange={(e) => this.setState({ saturdayOption: e.target.value })} />
                OddFridays
  <input type="radio" id="AllSaturdays" style={{marginLeft:"20px"}} name="saturday" value="AllSaturdays" checked={this.state.saturdayOption === 'AllSaturdays'} onChange={(e) => this.setState({ saturdayOption: e.target.value })} />
                All

</form>



            </form>
            <div>
              {(this.state.editsave === 'edit'
                ? <button type="button" className="stop-btn" onClick={() => this.edit()}>edit</button>
                : <button type="button" className="stop-btn" onClick={() => this.Config()}>save</button>

              )}
            </div>

            {/* /* 
            <button type="button" id="leaveconfig" onClick={() => this.Config()} class="btn btn-info">Submit</button>
 */
            }

          </div>
        </div>

      </div>
    );
  }

}
export default WeekEndConfig;

