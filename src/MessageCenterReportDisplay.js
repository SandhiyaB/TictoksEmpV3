import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import registerServiceWorker from './registerServiceWorker';
import Maintenance from './Maintenance';
import NoSearchResult from './NoSearchResult';
import FooterText from './FooterText';
import MessageCenterReport from './MessageCenterReport';

class MessageReportDisplay extends Component {

    constructor(data) {
        super(data)

        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: today,
            fromDate:data.fromDate,
            toDate:data.toDate,

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
      //console.log("data"+this.props.data.toString());

                if (this.props.data.employeeRetrievelist.length != 0) {
                    var tab = '<thead><tr class="headcolor"  style="color: white; background-color: #486885;"><th>SuperiorId</th><th>Name</th><th>Role</th><th>Sent</th><th> Message</th><th> To</th><th>Date</th><th>Time</th></tr></thead>';
                    $.each(this.props.data.employeeRetrievelist, function (i, item) {
                        tab += '<tbody id= "myTable" ><tr class="success" ><td>' + item.superiorId + '</td><td>' + item.name + '</td><td>' + item.role + '</td><td>' + item.type + '</td><td>' + item.messageSent + '</td><td>' + item.sendTo + '</td><td>' + item.date + '</td><td>' + item.time + '</td></tr></tbody>';
                    });
                    $("#tableHeadings").append(tab);
                  
                }
                else {
                    $("#tableHeadings").append('<h3 align="center">No Data</h3>');
                }

                var summary = '<thead ><tr style="color: white; background-color: #486885;"  class="headcolor"><th></th><th></th></tr></thead>';
                summary += '<tr class="success" ><td> Message Center Sms</td><td>'+this.props.data.smsCount+'</td></tr>';
                summary += '<tr class="success" ><td> CheckIn/CheckOut Sms</td><td>'+this.props.data.checkInOutCount+'</td></tr>';
                summary += '<tr class="success" ><td> Message Center Sms</td><td>'+Number(Number(this.props.data.smsCount)+Number(this.props.data.checkInOutCount))+'</td></tr>';
                
                $("#summary").append(summary);
        //    }
     //   });

       
         //search button func
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={MessageCenterReport} />
                    <Route path="/" component={FooterText} />


                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }


    render() {

        return (

            <div className="container">
                 
                <div className="row" id="Employeemenu" >
					<div id="Employeesearchtab " className="col-xs-2">
						<h4>  <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a>
						</h4>
					</div>
				
          <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
	
				</div>

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Message Center Report</h3>
               <h4 className="centerAlign" style={{ textAlign: "center" }}>From:{this.state.fromDate} </h4>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>To:{this.state.toDate} </h4>
      
                <div id="tableOverflow" style={{ marginBottom: "2%" }} >
                    <table style={{ margin: "auto" }} class="table" id="tableHeadings">
                    </table>

                </div>
                
                <div id="tableOverflow" style={{
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "25%",
    }}>
        <h3 className="centerAlign" style={{ textAlign: "center" }}>Message Summary</h3>

          <table class="table" id="summary" style={{ marginBottom: "2%",color:"black" }}>


          </table>

        </div>
      </div>
            
        );
    }

}

export default MessageReportDisplay;


