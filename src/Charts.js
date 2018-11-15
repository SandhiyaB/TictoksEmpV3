

import React, {
  Component
} from 'react';
import {Pie,Bar,HorizontalBar,Doughnut,Bubble} from 'react-chartjs-2';
import CryptoJS from 'crypto-js' ;
 import $ from 'jquery';
import './EmployeeMenuPage.css';
import EmployeeMenuPage from './EmployeeMenuPage';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import FooterText from './FooterText';
import ReportMenuPage from './ReportMenuPage';
import  MultiSelectReact  from 'multi-select-react';
var Multiselect = require('react-bootstrap-multiselect/dist/index.js');

class Charts extends Component{

constructor(props){
   super(props);
   var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
   if(companyType=="Office"){
       companyType="Employee";
   }
   else{
       companyType="Student/Staff";
   }
   this.state={
    companyType:companyType,
    multiSelect: [],
    chartData:{
      labels :[ '#'+companyType,'#Present','#Leave','#Absent'] ,
      datasets:[
      {
        label:'Employee Attendance graph',
        
        backgroundColor:[
          'rgba(0, 102, 255,0.8)',
          
           'rgba(62, 172, 6,0.8)',
           'rgba(255,255,0,.8)',
           'rgba(255,0,0,0.8)',
           'rgba(255,0,0,0.8)',
        
           
           
         ],
         hoverBackgroundColor: [
         'rgba(0, 102, 255,0.8)',
       
           'rgba(62, 172, 6,0.8)',
           'rgba(255,255,0,.8)',
           'rgba(255,0,0,0.8)',
           
          'rgba(255,0,0,0.8)',
         
          
          ],
      }
    ]
    },

   }

}
	
  componentDidMount() {
    window.scrollTo(0, 0);
    //console.log("Chart"+this.props.data.toString());

    var total=0;
    var present=0;
    var absent =0;
    var leave=0;
    var holiday=0;
    if (this.props.data.employeeRetrievelist.length != 0) {
      $.each(this.props.data.employeeRetrievelist, function (i, item) {
        total++;
      
          if (item.status == "P") {
          present++;
           
          } else if (item.status == "A") {
           absent++;
           
          } else if (item.status == "L") {
           leave++;
           
          } else {
            holiday++;
            
          }
        });
        this.state.chartData.datasets[0].data[0]= total;
    //  var total= this.props.data[0].noOfPermanentEmployee +this.props.data[0].noOfContractEmployee+this.props.data[0].noOfTemporaryEmployee;
      
      this.state.chartData.datasets[0].data[1]= present;
     // var present= this.props.data[1].permanentCountPresent + this.props.data[1].temporaryCountPresent + this.props.data[1].contractCountPresent;
      
      this.state.chartData.datasets[0].data[3]= absent ;
     // var absent= this.props.data[2].permanentCountAbsent + this.props.data[2].temporaryCountAbsent+ this.props.data[2].contractCountAbsent; ;
     this.state.chartData.datasets[0].data[2]= leave ;

     /* this.state.chartData.datasets[0].data[0]= this.props.data[0].noOfPermanentEmployee +this.props.data[0].noOfContractEmployee+this.props.data[0].noOfTemporaryEmployee;
      var total= this.props.data[0].noOfPermanentEmployee +this.props.data[0].noOfContractEmployee+this.props.data[0].noOfTemporaryEmployee;
      
      this.state.chartData.datasets[0].data[1]= this.props.data[1].permanentCountPresent + this.props.data[1].temporaryCountPresent + this.props.data[1].contractCountPresent;
      var present= this.props.data[1].permanentCountPresent + this.props.data[1].temporaryCountPresent + this.props.data[1].contractCountPresent;
      
      this.state.chartData.datasets[0].data[2]= this.props.data[2].permanentCountAbsent + this.props.data[2].temporaryCountAbsent+ this.props.data[2].contractCountAbsent; ;
      var absent= this.props.data[2].permanentCountAbsent + this.props.data[2].temporaryCountAbsent+ this.props.data[2].contractCountAbsent; ;
 */
      this.setState(
      {
        chartData:this.state.chartData,
      });
      var tab;
      tab+='<thead><tr class="headcolor"style={{margin:"auto"}}/><th style={{textAlign:"center"}}>Chart Info</th></thead>';
            
      tab +='<tr class="success" ><td> Total '+this.state.companyType+'</td><td>' + total+ '</td></tr>';
       tab +='<tr class="success" ><td> Present</td><td>' + present+ '</td></tr>';
       tab +='<tr class="success" ><td> Leave</td><td>' + leave+ '</td></tr>';
      tab +='<tr class="success" ><td> Absent</td><td>' + absent+ '</td></tr>';
     
      $("#summary").append(tab);
    }
    else{
      $("#summary").append('<h3> Today Holiday</h3>');
      $("#dispchart").hide();/////
    }

}
BackbtnFunc(){
  ReactDOM.render(
          <Router>
            <div>           
                   <Route path="/" component={EmployeeMenuHeader}/>
                   <Route path="/" component={ReportMenuPage}/>
                   <Route path="/" component={FooterText} />
                           </div>
                                </Router>,
                                          document.getElementById('root'));
                                          registerServiceWorker();
                                      }  

      
  optionClicked(optionsList) {
    this.setState({ multiSelect: optionsList });
}
selectedBadgeClicked(optionsList) {
    this.setState({ multiSelect: optionsList });
}                               
  render() {
    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
  };
  const optionsListStyles = {
      backgroundColor: "#dff0d8",
      color: "#3c763d"
  };
    return (
      <div className="container" style={{backgroundColor:"white"}}>
     
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

 <MultiSelectReact 
      options={this.state.multiSelect}
      optionClicked={this.optionClicked.bind(this)}
      selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
      selectedOptionsStyles={selectedOptionsStyles}
      optionsListStyles={optionsListStyles} />
    );
        <div id="dispchart" className="chart"> 
                 
         <Pie data={this.state.chartData} width={50} height={200} options={{
        maintainAspectRatio: false
    }}/>
        
        </div>
        <div id="tableOverflow" style={{
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "25%",
    }}>
        
        <table className="table" id="summary">
        
      
         </table>
        </div>
      </div>
    );
  }
}
export default Charts;