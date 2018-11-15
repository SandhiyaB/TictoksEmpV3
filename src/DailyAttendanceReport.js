import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js' ;
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';


class DailyAttendanceReport extends Component{


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
    
      
             var tab='<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>CheckOut</th><th>AuthorizedBy</th><th>Type</th></tr></thead>';
                  
                  
             $.each(this.props.data.employeeRetrievelist, function (i,item) {
                tab += '<tr class="success" id="tabletextcol" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>'  + item.checkinTime +'</td><td>' + item.checkoutTime + '</td><td>' + item.authorizedBy + '</td><td>' + item.employeeType +'</td></tr>';
            });
            $("#tableHeadings").append(tab);
            var summary='<thead><tr class="headcolor"><th>Type</th><th>#Employee</th><th>Present</th><th>Absent</th></tr></thead>';
             summary += '<tr class="success" id="tabletextcol" ><td> Permanent</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfPermanentEmployee + '</td><td>' +this.props.data.employeeCountRetrievelist[1].permanentCountPresent+ '</td><td>'  +this.props.data.employeeCountRetrievelist[2].permanentCountAbsent+'</td></tr>';
             summary += '<tr class="success" id="tabletextcol"><td> Contract</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfContractEmployee + '</td><td>' +this.props.data.employeeCountRetrievelist[1].contractCountPresent+ '</td><td>'  +this.props.data.employeeCountRetrievelist[2].contractCountAbsent+'</td></tr>';
             summary += '<tr class="success" id="tabletextcol"><td> Temporary</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfTemporaryEmployee + '</td><td>' +this.props.data.employeeCountRetrievelist[1].temporaryCountPresent+ '</td><td>'  +this.props.data.employeeCountRetrievelist[2].temporaryCountAbsent+'</td></tr>';
               
                  
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

 <div className="container"id="containerbody" >
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

 <h3 className="centerAlign" style={{textAlign:"center"}}>Daily Attendance Report</h3>
  <h4 className="centerAlign" style={{textAlign:"center"}}>{this.state.date}</h4>
   
          <div id="tableOverflow" >
        <table style={{margin:"auto"}}class="table" id="tableHeadings">
        
      
         </table>
         
        </div>
         <div id="tableOverflow">
        <table class="table" id="summary" style={{marginBottom:"30%"}}>
        
      
         </table>
         
        </div>
   
        
 </div>
    );
  }

}
  
export default DailyAttendanceReport;
