import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js' ;
import {
  format,
  display,
  transms,
  transstr,
  reduce,
} from './utils';
class Attendence extends Component{

		constructor(data) {

        super(data)
         
        this.state = {
        				re: '00:00:00',
				        le: [],
				        isRun: false,
				        isPause: false,
						employeeId:'',
						currenttime:'',
					};
					 this.timeId = '';
				    this.br = '00:00:00';
				    this.delay = 0;
				    this.st = null;
				    this.progress = undefined;
				    this.sss = undefined;
				    this.ss = undefined;
				    this.mm = 0;
				    this.hh = 0;
				    this.start = this.start.bind(this);
				    this.reset = this.reset.bind(this);
				    this.count = this.count.bind(this);
				    this.pause = this.pause.bind(this);
				    this.step = this.step.bind(this);
				}

				renderRecord() {
    const data = this.state.le;
    return data.map((record, index) => 
    (<div className="record" key={`key${index}`}>{record}</div>));
  }
  start() {
    this.timeId = window.requestAnimationFrame(this.step);
    this.setState({
      isRun: true,
      isPause: false,
    });
  }
  pause() {
    this.setState({
      isRun: true, // still run in requestAnimationFrame
      isPause: true,
    });
  }
  reset() {
    let r;
    window.cancelAnimationFrame(this.timeId);
    this.mm = 0;
    this.ss = 0;
    this.hh = 0;
    this.sss = 0;
    this.delay = 0;
    r = format(this.hh, 2) + ':' + format(this.mm, 2) + ':' + format(this.ss, 2) ;
    this.setState({
      re: r,
      le: [],
      isRun: false,
      isPause: false,
    });
  }
  count() {
    let ru;
    let newlist = this.state.le.slice();
    const { re, isRun, isPause } = this.state;
    if (this.br !== re && isRun && !isPause) {
      ru = reduce(this.state.re, this.br);
      newlist.unshift(ru);
      this.br = re;
      this.setState({ le: newlist });
    }
  }
  step(timestamp) {
    let temp1, temp2, t, r;
    const { isRun, isPause } = this.state;
    if (this.st === null) { this.st = timestamp; }
    if (isRun && !isPause) {
      this.progress = timestamp - this.st - this.delay;
      t = ((this.progress/1000).toFixed(3));
      this.ss = +(t.split('.')[0]);
      this.sss = +(t.split('.')[1]);
      temp1 = display(this.ss, 3600);
      this.hh = temp1.tbig;
      this.ss = temp1.tsmall;
      temp2 = display(this.ss, 60);
      this.mm = temp2.tbig;
      this.ss = temp2.tsmall;
      r = format(this.hh, 2) + ':' + format(this.mm, 2) + ':' + format(this.ss, 2)  ;
      this.setState({ re: r });
      window.requestAnimationFrame(this.step);
    } else if (isRun && isPause) { // press stop
      this.delay = timestamp - this.st - this.progress;
      window.requestAnimationFrame(this.step);
    } else if (!isRun && !isPause) { // press reset
      this.st = null;
      this.br = '00:00:00';
    }
  }

componentDidMount() {
			 var trHTML;
			 var EmpId="0001";
			 var CheckIn="900";
			 var CheckOut="788";
			 var samp;
			

			 trHTML += '<tr id =' +EmpId+'><td >' + EmpId + '</td><td>' + CheckIn+ '</td></tr>';
			 samp += '<td>' + CheckOut + '</td></tr>';
			   $("#tableHeadings").append(trHTML);
			    $("#"+EmpId).append(samp);

            }

     handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
);
                 
}


            checkIn()
            {
            var today = new Date();
            
            var currenttime=today.toLocaleTimeString();
            this.state.currenttime=currenttime;
            this.setState({
            	currenttime:currenttime,
            	employeeId:this.state.employeeId,

            })
             var tab=document.getElementById("tableHeadings");
             var index=document.getElementById(this.state.employeeId);
             if(index==null){

			var trHTML;
			trHTML += '<tr id =' +this.state.employeeId+'><td >' + this.state.employeeId + '</td><td>' + this.state.currenttime+ '</td></tr>';
			
			   $("#tableHeadings").append(trHTML);
			
		}


			 
			  
            }
            checkOut()
            {
            var today = new Date();
            	 
            var currenttime=today.toLocaleTimeString();
            this.state.currenttime=currenttime;
            this.setState({
            	currenttime:currenttime,
            	employeeId:this.state.employeeId,

            })
            var tab=document.getElementById("tableHeadings");
             var index=document.getElementById(this.state.employeeId+this.state.employeeId);
             if(index==null){
             		var samp;
             		 samp += '<td id =' +this.state.employeeId+this.state.employeeId+'>' + this.state.currenttime + '</td>';
			   
			    $("#"+this.state.employeeId).append(samp);
	
            }
        }
render(){
	
		return(


  <div className="container" >
  
  
 
<input type="text"
						value={this.state.employeeId}
						required name="employeeId"
						onChange={this.handleUserInput}
						className="form-control"
						id="emoloyeeId"
						placeholder="Enter EmployeeId"/>

<br/>
<button type="submit" style={{marginBottom:'70px'}} className="btn btn-default" onClick={() => this.checkIn()}>Check In</button>
<button type="submit" style={{marginBottom:'70px'}} className="btn btn-default" onClick={() => this.checkOut()}>Check Out</button>
						<div>
        <table  id="tableHeadings">
        <thead>
         <tr className="tableHeadingsbg">
         	 <th>Employee Id#</th>
	         <th>Check In </th> 
	         <th>Check Out</th>
	         <th>Clock</th>
	         
         </tr>
     	</thead>
     	
         </table>
         
        </div>
   
        
 </div>
 		);
	}

}
	

export default Attendence;