import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import AddNewDepartment from './AddNewDepartment';
import AddNewRole from './AddNewRole';
import AddNewPermission from './AddNewPermission';
import BlockUnblock from './BlockUnblock';
import Unlock from './Unlock';
import EmployeeMenuPage from './EmployeeMenuPage';
import FooterText from './FooterText';


class TaskMapping extends Component {

  constructor() {
    super()
    this.state = {

    };
  }

  componentDidMount() {


    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={TaskMapping} />

          <Route path="/" component={AddNewPermission} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>, document.getElementById('root'));


  }





  BlockUnblockFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={TaskMapping} />

          <Route path="/" component={BlockUnblock} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>, document.getElementById('root'));


  }

  UnlockFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={TaskMapping} />

          <Route path="/" component={Unlock} />
          <Route path="/" component={FooterText} />
        </div>
      </Router>, document.getElementById('root'));


  }


  AddNewPermission() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={TaskMapping} />

          <Route path="/" component={AddNewPermission} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>, document.getElementById('root'));


  }

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={EmployeeMenuPage} />
          <Route path="/" component={FooterText} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }


  render() {
    return (


      <div className="container" id="containerhead">
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




        <div id='horMenunew'>
          <ul id='horMenunew'>
            <li><a className="active" onClick={() => this.AddNewPermission()}><span  style={{display: "inline-grid"}} class="glyphicon glyphicon-eye-open">Permission</span></a></li>
            <li><a onClick={() => this.BlockUnblockFunc()}><span style={{display: "inline-grid"}}class="glyphicon glyphicon-ban-circle">Block/Unblock</span></a></li>
            <li><a onClick={() => this.UnlockFunc()}><span  style={{display: "inline-grid"}} class="glyphicon glyphicon-lock">Unlock</span></a></li>


          </ul>
        </div>
      </div>



    );
  }

}

export default TaskMapping;

