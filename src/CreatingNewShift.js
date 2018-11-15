import React, { Component } from 'react';
//import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
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
import ExistingShiftDetails from './ExistingShiftDetails';
import ConfigurationPage from './ConfigurationPage';
import FooterText from './FooterText';

class CreatingNewShift extends Component {

    constructor() {
        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            shift1:'',
            shift2:'',
            shift3:'',
            shift1From: '',
            shift2From: '',
            shift3From: '',
            shift1To:'',
            shift2To:'',
            shift3To:'',
            shiftTime: '',
            from: '',
            to: '',
            companyId: '',
            totalNoOfShift: '',
            superiorId:superiorId,
            formErrors:{
                shift1FromValid:false,
                shift1ToValid:false,
                shift2FromValid:false,
                shift2ToValid:false,
                shift3FromValid:false,
                shift3ToValid:false,

            }
        };

    }

    componentDidMount() {
        $("#shiftNo1").hide();
        $("#shiftNo2").hide();
        $("#shiftNo3").hide();

        this.TimePicker();
        window.scrollTo(0, 0);
    
            }
        TimePicker(){
            $('#shift1From').timepicker({
               onSelect: function(time) {
                $("#shift1To").timepicker('option', 'minTime', time);

              this.state.shift1From=time;
              this.setState({
                shift1From:time,
               });
              },

              timeFormat: 'H:i:s',
             });

            $('#shift1To').timepicker({ onSelect: function(time) {
                $("#shift1From").timepicker('option', 'maxTime', time);

              this.state.shift1To=time;
              this.setState({
                shift1To:time,
               });

              },

              timeFormat: 'H:i:s',

             });
        $('#shift2From').timepicker({
               onSelect: function(time) {
                $("#shift2To").timepicker('option', 'minTime', time);

              this.state.shift2From=time;
              this.setState({
                shift2From:time,
               });
              },

              timeFormat: 'H:i:s',
             });

            $('#shift2To').timepicker({ onSelect: function(time) {
                $("#shift2From").timepicker('option', 'maxTime', time);

              this.state.shift2To=time;
              this.setState({
                shift2To:time,
               });

              },

              timeFormat: 'H:i:s',

             });

            $('#shift3From').timepicker({
               onSelect: function(time) {
                $("#shift3To").timepicker('option', 'minTime', time);

              this.state.shift3From=time;
              this.setState({
                shift3From:time,
               });
              },

              timeFormat: 'H:i:s',
             });

            $('#shift3To').timepicker({ onSelect: function(time) {
                $("#shift3From").timepicker('option', 'maxTime', time);

              this.state.shift3To=time;
              this.setState({
                shift3To:time,
               });

              },

              timeFormat: 'H:i:s',

             });
        }

        handleShiftInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
      
        if (value == 1) {
            $("#ShiftTable").show();
            $("#shiftNo1").show();
            $("#shiftNo2").hide();
            $("#shiftNo3").hide();
            this.setState({
                shift1:'',
                shift1From:'',
                shift1To:'',

                shift2:'',
                shift2From:'',
                shift2To:'',
                shift3:'',
                shift3From:'',
                shift3To:'',
                shift1FromValid:false,
                shift1ToValid:false,

                shift2FromValid:true,
                shift2ToValid:true,
                shift3FromValid:true,
                shift3ToValid:true,
            });
        } else if (value == "2") {
            $("#ShiftTable").show();

            $("#shiftNo1").show();
            $("#shiftNo2").show();
            $("#shiftNo3").hide();
            this.setState({
                shift1:'',
                shift1From:'',
                shift1To:'',

                shift2:'',
                shift2From:'',
                shift2To:'',

                shift3:'',
                shift3From:'',
                shift3To:'',

                shift1FromValid:false,
                shift1ToValid:false,
                shift2FromValid:false,
                shift2ToValid:false,

                shift3FromValid:true,
                shift3ToValid:true,

            });
        } else {
            $("#ShiftTable").show();
            $("#shiftNo1").show();
            $("#shiftNo2").show();
            $("#shiftNo3").show();
            this.setState({
                shift1:'',
                shift1From:'',
                shift1To:'',

                shift2:'',
                shift2From:'',
                shift2To:'',


                shift3:'',
                shift3From:'',
                shift3To:'',
                shift1FromValid:false,
                shift1ToValid:false,
                shift2FromValid:false,
                shift2ToValid:false,
                shift3FromValid:false,
                shift3ToValid:false,

            });

        }
      
    }

    handleFrom = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;
        var no;
        this.setState({
            [name]: value,
           /*  [id]: true */
        },
        () => { this.validateField(name, value) });

        if (id == "shift1From") {
            no = "shift1";
        } else if (id == "shift2From") {
            no = "shift2";
        } else {
            no = "shift3";
        }

        $("#"+ no +"To").timepicker('option','minTime', value);
        var statename= no + "To";
        if(value>this.state[statename]){
            this.setState({
               [statename]:'',
            })
        }

    }
    handleTo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;
        this.setState({
            [name]: value,

        },
        () => { this.validateField(name, value) });
        //$("#shift1").timepicker('option', 'maxTime', value);
        var totalshift = this.state.totalNoOfShift;
        var no;
        if (id == "shift1To") {
            no = "shift2";
            this.state.shift1="1";
            this.setState({
                shift1:this.state.shift1,
            })
        } else if (id == "shift2To") {
            no = "shift3";
            this.state.shift2="2";
            this.setState({
                shift2:this.state.shift2,
            })

        } else {
            no = "shift1";
            this.state.shift3="3";
            this.setState({
                shift3:this.state.shift3,
            })

        }
        //$("#"+ no +"From").timepicker('option', 'minTime', value);
/*
        var statename= no + "From";
        if(value>this.state[statename]){
            this.setState({
               [statename]:'',
            })
         
        }
 */

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let shift1FromValid = this.state.shift1FromValid;
        let shift1ToValid = this.state.shift1ToValid;
        let shift2FromValid = this.state.shift2FromValid;
        let shift2ToValid = this.state.shift2ToValid;
        let shift3FromValid = this.state.shift3FromValid;
        let shift3ToValid = this.state.shift3ToValid;

        switch(fieldName) {

          case 'shift1From':
          shift1FromValid =value.length > 0;
            fieldValidationErrors.shift1From = shift1FromValid ? '' : ' Please Enter';
            break;
          case 'shift1To':
            shift1ToValid = value.length >0;
            fieldValidationErrors.shift1To = shift1ToValid ? '': 'Please Enter';
            break;
            case 'shift2From':
          shift2FromValid =value.length > 0;
            fieldValidationErrors.shift2From = shift2FromValid ? '' : ' Please Enter';
            break;
          case 'shift2To':
            shift2ToValid = value.length >0;
            fieldValidationErrors.shift2To = shift2ToValid ? '': 'Please Enter';
            break;

            case 'shift3From':
          shift3FromValid =value.length > 0;
            fieldValidationErrors.shift3From = shift3FromValid ? '' : ' Please Enter';
            break;
          case 'shift3To':
            shift3ToValid = value.length >0;
            fieldValidationErrors.shift3To = shift3ToValid ? '': 'Please Enter';
            break;

          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        shift1FromValid: shift1FromValid,
                        shift1ToValid: shift1ToValid,
                        shift2FromValid: shift2FromValid,
                        shift2ToValid: shift2ToValid,
                        shift3FromValid: shift3FromValid,
                        shift3ToValid: shift3ToValid

                        }, this.validateForm);
      }

      validateForm() {
        this.setState({formValid: this.state.shift1FromValid && this.state.shift1ToValid && this.state.shift2FromValid && this.state.shift2ToValid && this.state.shift3FromValid && this.state.shift3ToValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }



    Submit() {
	$("#ShiftTable").hide(); //jeeva
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
   this.setState({
        companyId: companyId,
    });

var totalshift=this.state.totalNoOfShift;
 $.ajax({
        type: 'POST',
        data: JSON.stringify({
        	shift1:this.state.shift1,
        	shift2:this.state.shift2,
        	shift3:this.state.shift3,
        	shift1From:this.state.shift1From,
        	shift1To:this.state.shift1To,
        	shift2From:this.state.shift2From,
        	shift2To:this.state.shift2To,
        	shift3From:this.state.shift3From,
        	shift3To:this.state.shift3To,
            companyId:this.state.companyId,
            superiorId:this.state.superiorId,
        }),
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/shiftconfiginitialinsert",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {

	 ReactDOM.render(
        <Router>
          <div>
                 <Route path="/" component={EmployeeMenuHeader}/>
                 <Route  path="/" component={() => <ExistingShiftDetails />}/>

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

        },
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
            <p>SHIFT</p>
                    <label for="shift">
                        Total Shifts
    		</label>
                    <div>
                        <select name="totalNoOfShift"
                            id="shift"
                            onChange={this.handleShiftInput}
                            required>
                            <option value="" disabled selected hidden>Select your total no of Shifts</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>

                        </select>

                    </div>

                    <table id="ShiftTable" style={{ width: "65%" }}>
                        <tr>
                            <div >
                                <th>Shift</th><th >From</th><th>To</th>
                            </div>
                        </tr>
                        <tr id="shiftNo1">

                            <div id="Shift1">
                                <td>
                                    <label for="shift1" >
                                        Shift-1
                               		</label>
                                  </td>
                                <td>
                                    <input
                                         type="text"
                                        id="shift1From"
                                        name="shift1From"
                                        style={{ width: "65%" }}

                                        data-step="5"
                                        value={this.state.shift1From}
                                        required

                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        placeholder="Enter Start Time" />
                                </td>
                                <td>
                                    <input type="text"


                                         style={{ width: "65%" }}

                                        data-step="5"
                                        value={this.state.shift1To}
                                        required
                                        name="shift1To"
                                        onSelect={this.handleTo}
                                        className="form-control"
                                        id="shift1To"
                                        placeholder="Enter End Time"
/>
                                </td>

                            </div>
                        </tr>

                        <tr id="shiftNo2">

                            <div id="Shift2">
                                <td>
                                    <label for="shift2" >
                                        Shift-2
    		</label>
                                </td>
                                <td>
                                    <input type="text"
                                        id="shift2From"
                                        name="shift2From"
                                        style={{ width: "65%" }}

                                        data-step="5"
                                        value={this.state.shift2From}
                                        required

                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        placeholder="Enter Start Time" />
                                </td>
                                <td>
                                    <input
                                       type="text"

                                      style={{ width: "65%" }}
                                      data-step="5"
                                      value={this.state.shift2To}
                                      required
                                      name="shift2To"
                                      onSelect={this.handleTo}
                                      className="form-control"
                                      id="shift2To"
                                      placeholder="Enter End Time" />
                                </td>


                            </div>
                        </tr>

                        <tr id="shiftNo3">

                            <div id="Shift3">
                                <td>
                                    <label for="shift3" >
                                        Shift-3
    		</label>
                                </td>

                                <td>
                                    <input type="text"
                                        id="shift3From"
                                        name="shift3From"
                                        style={{ width: "65%" }}

                                        data-step="5"
                                        value={this.state.shift3From}
                                        required

                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        placeholder="Enter Start Time"/>
                                </td>
                                <td>
                                    <input
                                        type="text"


                                        style={{ width: "65%" }}

                                       data-step="5"
                                       value={this.state.shift3To}
                                       required
                                       name="shift3To"
                                       onSelect={this.handleTo}
                                       className="form-control"
                                       id="shift3To"
                                       placeholder="Enter End Time" />
                                </td>
                            </div>
                        </tr>
                    </table>
                    <button onClick={() => this.Submit()}  disabled={!this.state.formValid} id="submit">Submit</button>
                </div>
            </div>
        );
    }

}
export default CreatingNewShift;
