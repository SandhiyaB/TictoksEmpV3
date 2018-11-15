import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import AddNewDepartment from './AddNewDepartment';
import RemoveDepartment from './RemoveDepartment';
import FooterText from './FooterText';
import EmployeeMenuPage from './EmployeeMenuPage';
import AddDevice from './AddDevice';
import EditDevicePage from './EditDevicePage';
import AllDeviceReport from './AllDeviceReport';


class DeviceMenuPage extends Component {

    constructor() {
        super()
        this.state = {

        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.AddDeviceFunc();
    }
    AddDeviceFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={DeviceMenuPage} />
                    <Route path="/" component={AddDevice} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }

    RemoveDeviceFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={DeviceMenuPage} />
                    <Route path="/" component={EditDevicePage} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
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
    AllDeviceReport(){
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={DeviceMenuPage} />
                    <Route path="/" component={AllDeviceReport} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }


    render() {
        return (
            <div className="container"
                style={{ backgroundColor: "#edf5e1" }}>
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
                    
                <div id='horMenunew' >
                    <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active"  onClick={() => this.AddDeviceFunc()} ><span class="glyphicon glyphicon-plus">Add</span></a></li>
                       <li><a  onClick={() => this.RemoveDeviceFunc()}><span class="fa fa-pencil">Edit</span> </a></li>
                       <li><a  onClick={() => this.AllDeviceReport()}><span class="fa fa-file">Report</span> </a></li>
                       
                                    </ul>

                </div>
            </div>




        );
    }

}


export default UserDeviceMenuPage;