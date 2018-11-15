
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import './LoginPage.css';
import {
  FormErrors
} from './FormErrors';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js' ;
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
//import timepicker from 'jquery-ui-timepicker-addon/src/jquery-ui-timepicker-addon';
//import timepicker from 'jquery-ui/ui/widgets/timepicker';
//import timepicker from 'timepicker/jquery.timepicker';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import Switch from 'react-toggle-switch';

import '../node_modules/react-toggle-switch/dist/css/switch.min.css';

import logo from './image/BG1.png';

import EmployeeMenuPage from './EmployeeMenuPage';


class BackGroundColorSettings extends Component{


  constructor(props) {
    super(props)
        this.state = {
       date:'',
       checkInTime:'',
       checkOutTime:'',
       employeeId:'',
       companyId:'',
        dateValid:false,
        checkInTimeValid:false,
        checkOutTimeValid:false,
        employeeIdValid:false,
        switched: false,
        
}
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

  handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value,
        employeeIdValid:true});

  }
  
  
  handleUserInputDate = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value,
        dateValid:true});

  }
  

      handleCheckIn = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value,
        checkInTimeValid:true});
      $("#checkOutTime").timepicker('option', 'minTime', value);
      }               
    componentDidMount() {
      var self=this;
      
    $('#date').datepicker({ 
       onSelect: function(date) {
         var dt = new Date(date);
            self.setState({
        date:date,
        dateValid:true,
       });
        
     },
     
     dateFormat: 'yy/mm/dd',
     minDate: '-3M', 
     maxDate: '-1D',
    numberOfMonths:1 } );
    
      
    

    $('#checkInTime').timepicker({ 
       onSelect: function(time) {
        $("#checkOutTime").timepicker('option', 'minTime', time);
                  
      self.state.checkInTime=time;
      self.setState({
        checkInTime:time,
       });
      
      },
      
      timeFormat: 'H:i:s',
     });

    $('#checkOutTime').timepicker({ onSelect: function(time) {
        $("#checkInTime").timepicker('option', 'maxTime', time);
                  
      self.state.checkOutTime=time;
      self.setState({
        checkOutTime:time,
       });
     
      },
      
      timeFormat: 'H:i:s',
      
     });
   
      
      var emp=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
    var employeeId;
      employeeId += '<option disabled selected hidden >Select a Employee Id</option>';
      $.each(emp, function (i, item) {
      
        employeeId += '<option value="' + item.employeeId + '">'+item.employeeId+ '</option>'
        
      });
      $("#employeeId").append(employeeId);
      
      
    




   }

   BackGroundColorFunc(){

  ReactDOM.render(
    <Router>
      <div>
       <Route path="/" component={EmployeeMenuHeader}/>
         <Route  path="/" component={BackGroundColorSettings}/>
          </div>
                </Router>,
                    document.getElementById('root'));
                    registerServiceWorker();
                    }
myFunction() {
                document.body.style.backgroundColor = "#4fc8ff";
                document.getElementById("menuhead").style.backgroundColor = "#002052";
          /*       document.getElementsByClassName("container-fluid.text-center").style.backgroundColor = "#002052";  
           */  }
                                         


render(){

  
    return(




<div className="container" style={{ marginBottom: '30%'}}>
      <div class ="jumbotron">
      <h3>Custom BackGrounds</h3>

      <div class="form-group radio-pink-gap ">
      <input name="group103" type="radio" class="with-gap"  data-toggle="modal" data-target="#myModal" id="radio109"/>
      <label for="radio109"  >Blue Theme</label>
  </div>

  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
  
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h2 class="modal-title">Preview Blue Theme</h2>
        </div>
        <div class="modal-body">
        
          <img src={logo} alt="Cinque Terre" width="200" height="200 " style={{margin: "10% 10%"}} /  >
          <img  src={require('./image/BG2.png')} alt="Cinque Terre" width="200" height="200" style={{margin: "10% 10%"}}/ >
          <img  src={require('./image/BG3.png')} alt="Cinque Terre" width="200" height="200" style={{margin: "10% 10%"}} / >
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-default"  onClick={() => this.myFunction()} data-dismiss="modal" >SET</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">CANCEL</button>
        </div>
      </div>
      </div>
      </div>
  
  <div class="form-group radio-pink-gap">
      <input name="group103" type="radio" class="with-gap" onClick={() => this.myFunction()} id="radio110" />
      <label for="radio110">Option 2</label>
  </div>
  
  <div class="form-group radio-pink-gap">
      <input name="group103" type="radio" class="with-gap" id="radio111" />
      <label for="radio111">Option 3</label>
  </div>
  

    </div>

   
        

  </div>

    );



  }

}
export default BackGroundColorSettings;