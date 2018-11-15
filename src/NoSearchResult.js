import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
class NoSearchResult extends Component {

    render() {
        return (
            <div class="container" >
                <h3 className="centerAlign" style={{ textAlign: "center", marginBottom: "20%" }}> No Search Result</h3>

            </div>
        );
    }

}

export default NoSearchResult;
