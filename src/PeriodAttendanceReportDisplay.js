import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js' ;
import ReportMenuPage from './ReportMenuPage';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';


class PeriodAttendanceReportDisplay extends Component{


  constructor(data) {
    super(data)

    var today = new Date();
    today= today.getDate()+'-'+ (today.getMonth() + 1) + '-'+today.getFullYear() ;
        this.state = {
             date:today,
       

            };
    }
    componentDidMount() {
    
    window.scrollTo(0, 0);
    
             var tab='<thead><tr class="headcolor"><th>Date</th><th>Id</th><th>Emp Name</th><th>Dept</th><th>CheckIn</th><th>CheckOut </th><th>#hour</th><th>Status</th><th>Type</th></tr></thead>';
                  
                  
             $.each(this.props.data.employeeRetrievelist, function (i, item) {
               tab += '<tr class="success" id="tabletextcol"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>'  + item.checkinTime +'</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + item.status + '</td><td>' + item.employeeType +'</td></tr>';
            });
            $("#tableHeadings").append(tab);
            var summary='<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>#Present</th><th>#Absent</th><th>#Hour</th></tr></thead>';
             $.each(this.props.data.employeeCountRetrievelist, function (i, item) {
              summary += '<tr class="success" id="tabletextcol"><td>' + item.employeeId + '</td><td>' +item.employeeName + '</td><td>'+item.noOfDaysPresent+ '</td><td>'  +item.noOfDaysAbsent+'</td><td>'+item.totalWorkHour+ '</td></tr>';
             });
  
                  
            $("#summary").append(summary);


           }
BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
                     <Route path="/" component={ReportMenuPage}/>
                     
                             </div>
                                  </Router>,
                                            document.getElementById('root'));
                                            registerServiceWorker();
                                        }   


render(){
  
    return(

  <div className="container" id="containerbody" >
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

 <h3 className="centerAlign" style={{textAlign:"center"}}>Period Attendance Report</h3>
  <h4 className="centerAlign" style={{textAlign:"center"}}></h4>
   
          <div id="tableOverflow">
        <table class="table" id="tableHeadings">
        
      
         </table>
         
        </div>
         <div id="tableOverflow" style={{marginBottom:"10%"}}>
        <h3 className="centerAlign" style={{textAlign:"center"}}>Summary</h3>
 
        <table class="table" id="summary" style={{marginBottom:"10%"}}>
        
      
         </table>
         
        </div>
   
        
 </div>
    );
  }

}
  
export default PeriodAttendanceReportDisplay;
