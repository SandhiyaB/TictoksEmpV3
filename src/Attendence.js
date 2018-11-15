import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import AttendanceDisplay from './AttendanceDisplay';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import idb from 'idb';
import { CaptureFinger, PrepareScanner, VerifyFinger, getFalseRes, PostMFS100Client, quality, timeout } from './Mantra.js';
import FooterText from './FooterText';
class Attendence extends Component {
    constructor() {
        super();
        var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var sms = CryptoJS.AES.decrypt(localStorage.getItem('SMS'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 
       var location=localStorage.getItem('Location');
        if(companyType=="Office"){
            companyType="Enter EmployeeId";
        }
        else{
            companyType="Enter StudentId";
        }
        this.state = {
            employeeId: '',
            checkInTime: '',
            date: '',
            checkOutTime: '',
            companyId: '',
            biometric: biometric,
            companyType:companyType,
            location:location,
            sms:sms,
        };
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => this.offlineData(), 2000);
    }

    offlineData() {
        if (navigator.onLine) {
            var dbPromise = idb.open('Attendance-db');
            dbPromise.then(function (db) {
                if (db.objectStoreNames.contains('checkInOut')) {
                    var tx = db.transaction('checkInOut', 'readonly');
                    var keyValStore = tx.objectStore('checkInOut');
                    var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
                        if (!cursor) return;
                        if(cursor.value.status=="CheckIn"){
                        $.ajax({
                            type: 'POST',
                            data: cursor.value.data,
                            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckin",
                            contentType: "application/json",
                            dataType: 'json',
                            async: false,

                            success: function (data, textStatus, jqXHR) {
                                if (data.employeeName == "NOT_VAILD") {
                                    confirmAlert({
                                        title: 'CheckIn Failed',                        // Title dialog
                                        message: 'Entered An Invalid Employee Id Kindly Try Check In Again With A Valid Employee Id',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })

                                }
                                else if (data.employeeName == "ALREADY_CHECKIN") {
                                    confirmAlert({
                                        title: 'CheckIn Failed',                        // Title dialog
                                        message: 'The Employee Id '+data.employeeId + ' is already checked in today',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })


                                }
                                else {
                                    confirmAlert({
                                        title: 'Check In Success',                        // Title dialog
                                        message: 'The Employee Id '+ data.employeeId+'Checked In Successfully' ,               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })


                                }

                            },
                            error: function (data) {
                                confirmAlert({
                                    title: 'No Internet',                        // Title dialog
                                    message: 'Network Connection Problem',               // Message dialog
                                    confirmLabel: 'Ok',                           // Text button confirm
                                });

                            },
                        });

                    }else{
                        $.ajax({
                            type: 'POST',
                            data: cursor.value.data,
                            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
                            contentType: "application/json",
                            dataType: 'json',
                            async: false,

                            success: function (data, textStatus, jqXHR) {
                                if (data.employeeName == "NOT_VAILD") {
                                    confirmAlert({
                                        title: 'Check Out Failed',                        // Title dialog
                                        message: 'Entered An Invalid Employee Id Kindly Try Check Out  Again With A Valid Employee Id',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })

                                }
                                else if (data.employeeName == "NOT_CHECKED_IN") {
                                    confirmAlert({
                                        title: 'Check Out Failed',                        // Title dialog
                                        message: 'The Employee Id '+data.employeeId + ' Has Not Checked In Today Hence Check Out Cannot Be Done ',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm


                                    })

                                }
                                else if (data.employeeName == "ALREADY_CHECKOUT") {
                                    confirmAlert({
                                        title: 'Check Out Failed',                        // Title dialog
                                        message: 'The Employee Id '+data.employeeId + ' is already checked out today',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm


                                    })

                                }else if(data.employeeName == "BLOCKED"){
                                    confirmAlert({
                                        title: 'Check In Failed',                        // Title dialog
                                        message:'The Employee Id '+ data.employeeId + '  has been BLOCKED',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
            
                                    });
                                } 
                                else {

                                    confirmAlert({
                                        title: 'Check Out Success',                        // Title dialog
                                        message: 'The Employee Id '+ data.employeeId+'Checked Out Successfully  ' ,               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })

                                }
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
                        dbPromise.then(function (db) {
                            var tx = db.transaction('checkInOut', 'readwrite');
                            var keyValStore = tx.objectStore('checkInOut');
                            return keyValStore.delete(cursor.key);

                        });
                        return cursor.continue().then(cursorIterate);
                    });

                }

            });
        }
    }
                   /*  var dbPromise = idb.open('Attendance-db', 2);

                    var tx = db.transaction('checkOut', 'readonly');
                    var keyValStore = tx.objectStore('checkOut');
                    var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
                        if (!cursor) return;
                        $.ajax({
                            type: 'POST',
                            data: cursor.value,
                            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
                            contentType: "application/json",
                            dataType: 'json',
                            async: false,

                            success: function (data, textStatus, jqXHR) {
                                if (data.employeeName == "NOT_VAILD") {
                                    confirmAlert({
                                        title: 'Check Out Failed',                        // Title dialog
                                        message: 'Entered An Invalid Employee Id Kindly Try Check Out  Again With A Valid Employee Id',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })

                                }
                                else if (data.employeeName == "NOT_CHECKED_IN") {
                                    confirmAlert({
                                        title: 'Check Out Failed',                        // Title dialog
                                        message: 'The Employee Id '+data.employeeId + ' Has Not Checked In Today Hence Check Out Cannot Be Done ',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm


                                    })

                                }
                                else if (data.employeeName == "ALREADY_CHECKOUT") {
                                    confirmAlert({
                                        title: 'Check Out Failed',                        // Title dialog
                                        message: 'The Employee Id'+data.employeeId + ' is already checked out today',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm


                                    })

                                }
                                else {

                                    confirmAlert({
                                        title: 'Check Out Success',                        // Title dialog
                                        message: 'The Employee Id '+ data.employeeId+'Checked Out Successfully  ' ,               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    })

                                }
                            },
                            error: function (data) {
                                confirmAlert({
                                    title: 'No Internet',                        // Title dialog
                                    message: 'Network Connection Problem',               // Message dialog
                                    confirmLabel: 'Ok',                           // Text button confirm
                                });

                            },

                        });

                        dbPromise.then(function (db) {
                            var tx = db.transaction('checkOut', 'readwrite');
                            var keyValStore = tx.objectStore('checkOut');
                            return keyValStore.delete(cursor.key);

                        });
                        return cursor.continue().then(cursorIterate);
                    }); */
               
    //Check Whether Check In with Bio Or not

    checkIn() {

       // this.sendSMS();
       if(this.state.employeeId.trim().length>0){
        if (this.state.biometric == 1 && navigator.onLine) {

            this.CheckInWithBio();

        }
        else {
            confirmAlert({
                title: 'Check In Confirmation', // Title dialog
                message: 'Are you sure want to Check In ' + this.state.employeeId, // Message dialog
                confirmLabel: 'Confirm', // Text button confirm
                cancelLabel: 'Cancel', // Text button cancel
                onConfirm: () => { this.CheckInConfirm() }, // Action after Confirm
                onCancel: () => { this.NoAction() }, // Action after Cancel


            })


        }
    }else{
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Enter EmployeeId .',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
    }

    CheckInWithBio() {


        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                employeeId: this.state.employeeId,
                companyId: this.state.companyId,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/fingerprint/employeeBio",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                var empBio;
                if (data.fingerPrint != null) {
                    empBio = data.fingerPrint;
                    var res = CaptureFinger(quality, timeout);
                    if (res.httpStaus) {

                        if (res.data.ErrorCode == "0") {

                            var result = VerifyFinger(empBio, res.data.IsoTemplate);
                            //var res = VerifyFinger(isotemplate, isotemplate);

                            if (result.httpStaus) {
                                if (result.data.Status) {
                                    self.CheckInConfirm();
                                }
                                else {
                                    if (result.data.ErrorCode != "0") {
                                        confirmAlert({
                                            title: 'DEVICE ERROR', // Title dialog
                                            message: 'Check your biometric device ',// Message dialog
                                            confirmLabel: 'ok', // Text button confirm


                                        })

                                    }
                                    else {
                                        
                                            confirmAlert({
                                                title: ' Check In Failed', // Title dialog
                                                message: 'FingerPrint is not MATCHED ',// Message dialog
                                                confirmLabel: 'ok', // Text button confirm
                        
                        
                                            })
    
                                    }
                                }
                            }
                            else {
                                confirmAlert({
                                    title: 'DEVICE ERROR', // Title dialog
                                    message: 'Check your biometric device ',// Message dialog
                                    confirmLabel: 'ok', // Text button confirm


                                })

                            }

                        } else {

                            confirmAlert({
                                title: 'DEVICE ERROR', // Title dialog
                                message: 'Check your biometric device ',// Message dialog
                                confirmLabel: 'ok', // Text button confirm


                            })
                        }
                    }
                    else {
                        confirmAlert({
                            title: 'DEVICE ERROR', // Title dialog
                            message: 'Check your biometric device ',// Message dialog
                            confirmLabel: 'ok', // Text button confirm


                        })
                    }
                    // self.bioCapture(empBio);

                } else {
                    confirmAlert({
                        title: 'Check In Failed',                        // Title dialog
                        message: 'You Havent Registered your FingerPrint. Kindly Register',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })

                }

            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });


            },
        });
    }

    bioCapture(dbFinger) {

        var self = this;
        $.ajax({
            type: 'POST',
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/Biometric/CheckInBio",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            crossDomain: true,
            success: function (data) {


                if (data.ErrorCode == '0') {

                    self.VerifyFinger(dbFinger, data.AnsiTemplate);
                }
                else {
                    confirmAlert({
                        title: 'DEVICE ERROR', // Title dialog
                        message: 'Check your biometric device ',// Message dialog
                        confirmLabel: 'ok', // Text button confirm

                    })

                }

            },
            error: function (data) {

                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });

            }
        });

    }
    sendSMS() {

        $.ajax({
            type: 'GET',
            url: "http://alerts.digimiles.in/sendsms/bulksms?username=di80-arun&password=digimile&type=0&dlr=1&destination=8838598967&source=TICTOK&message=hello",
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
              /*   console.log("re"+data);
            alert("send");
 */
            },
            error: function (data) {
                console.log("re"+data.toString());
                alert("not send");
            }
        });

    }

    VerifyFinger(dbFinger, currentAnsi) {
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                dbFingerValue: dbFinger,
                currentFingerValue: currentAnsi,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/Biometric/BioVerification",
            contentType: "application/json",

            dataType: 'json',
            async: false,
            success: function (data) {

                if (data.Status == true) {

                    self.CheckInConfirm();
                }
                else {

                    confirmAlert({
                        title: 'Authorization Error Message',                        // Title dialog
                        message: 'Retry FingerPrint Authorization',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                }

            },
            error: function (data) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });

            }
        });

    }




    CheckInConfirm() {

        var today = new Date();
        var currenttime = today.toLocaleTimeString([], { hour12: false });
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state.checkInTime = currenttime;
        this.state.date = today;
        this.setState({
            checkInTime: currenttime,
            employeeId: this.state.employeeId,
            date: today,
           

        });
        var self = this;
        if (navigator.onLine) {

            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            this.state.companyId = companyId;
            this.setState({
                companyId: companyId,
            });
           // alert("thiss"+this.state.location);
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    checkInTime: this.state.checkInTime,
                    employeeId: this.state.employeeId,
                    date: this.state.date,
                    companyId: this.state.companyId,
                    location:this.state.location,
                    sms:this.state.sms,
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckin",
                contentType: "application/json",
                dataType: 'json',
                async: false,

                success: function (data, textStatus, jqXHR) {
                    if (data.employeeName == "NOT_VAILD") {
                        confirmAlert({
                            title: 'Check In Failed',                        // Title dialog
                            message: 'Enter Valid Employee Id',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm


                        })
                    }

                    else if (data.employeeName == "BLOCKED") {
                        confirmAlert({
                            title: 'Check In Failed',                        // Title dialog
                            message:'The Employee Id '+ data.employeeId + '  has been BLOCKED',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm

                        })


                    }
                    else if (data.employeeName == "ALREADY_CHECKIN") {
                        confirmAlert({
                            title: 'Check In Failed',                        // Title dialog
                            message: 'The Employee Id '+data.employeeId + ' Has already Checked In today',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm

                        })


                    }
                    else {
                        confirmAlert({
                            title: 'Check In Success',                        // Title dialog
                            message: 'The Employee Id '+data.employeeId +' Checked In Successfully ' ,               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm

                        })


                    }
                    self.state.employeeId = '';
                    self.setState({
                        employeeId: '',
                    })
                },
                
            
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });

                },

            });
        } else {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            this.state.companyId = companyId;
            this.setState({
                companyId: companyId,
            });
            var message = JSON.stringify({
                checkInTime: this.state.checkInTime,
                employeeId: this.state.employeeId,
                date: this.state.date,
                companyId: this.state.companyId,
                location:this.state.location,
                sms:this.state.sms,
            });
            var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
                switch (upgradeDb.oldVersion) {
                    case 0:

                    case 1:
                        upgradeDb.createObjectStore('checkInOut', { autoIncrement: true });
              
                }
            });
            dbPromise.then(function (db) {
                var tx = db.transaction('checkInOut', 'readwrite');
                var keyValStore = tx.objectStore('checkInOut');
                keyValStore.put({"data":message,"status":"CheckIn"});
                return tx.complete;

            }).then(function (val) {
            });
            self.state.employeeId = '';
            self.setState({
                employeeId: '',
            })

        }
    }
    checkOut() {
        if(this.state.employeeId.trim().length>0){
      
        if (this.state.biometric == 1) {

            this.CheckOutWithBio();

        }
        else {

            confirmAlert({
                title: 'Check Out Confirmation',                        // Title dialog
                message: 'Are you sure want to Check Out ' + this.state.employeeId,               // Message dialog
                confirmLabel: 'Confirm',                           // Text button confirm
                cancelLabel: 'Cancel',                             // Text button cancel
                onConfirm: () => { this.CheckOutConfirm() },    // Action after Confirm
                onCancel: () => { this.NoAction() },      // Action after Cancel

            })

        }
    }else{
        confirmAlert({
            title: 'Error',                        // Title dialog
            message: 'Please Enter EmployeeId .',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
    }

    CheckOutWithBio() {
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/fingerprint/employeeBio",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                var empBio;
                if (data.fingerPrint != null) {
                    empBio = data.fingerPrint;
                    var res = CaptureFinger(quality, timeout);
                    if (res.httpStaus) {

                        if (res.data.ErrorCode == "0") {

                            var result = VerifyFinger(empBio, res.data.IsoTemplate);
                            //var res = VerifyFinger(isotemplate, isotemplate);

                            if (result.httpStaus) {
                                if (result.data.Status) {
                                    self.CheckOutConfirm();
                                }
                                else {
                                    if (result.data.ErrorCode != "0") {
                                        confirmAlert({
                                            title: 'DEVICE ERROR', // Title dialog
                                            message: 'Check your biometric device ',// Message dialog
                                            confirmLabel: 'ok', // Text button confirm


                                        })

                                    }
                                    else {
                                        confirmAlert({
                                            title: ' Check Out Failed', // Title dialog
                                            message: 'FingerPrint is not MATCHED ',// Message dialog
                                            confirmLabel: 'ok', // Text button confirm
                    
                    
                                        })


                                    }
                                }
                            }
                            else {
                                confirmAlert({
                                    title: 'DEVICE ERROR', // Title dialog
                                    message: 'Check your biometric device ',// Message dialog
                                    confirmLabel: 'ok', // Text button confirm


                                })

                            }

                        } else {

                            confirmAlert({
                                title: 'DEVICE ERROR', // Title dialog
                                message: 'Check your biometric device ',// Message dialog
                                confirmLabel: 'ok', // Text button confirm


                            })
                        }
                    }
                    else {
                        confirmAlert({
                            title: 'DEVICE ERROR', // Title dialog
                            message: 'Check your biometric device ',// Message dialog
                            confirmLabel: 'ok', // Text button confirm


                        })
                    }
                    // self.bioCapture(empBio);

                } else {
                    confirmAlert({
                        title: 'Check Out Failed',                        // Title dialog
                        message: 'You Havent Register your FingerPrint. Kindly Register',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })

                }
            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });

            },
        });

    }



    CheckOutConfirm() {
        var today = new Date();
        var currenttime = today.toLocaleTimeString([], { hour12: false });
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state.checkOutTime = currenttime;
        this.state.date = today;
        this.setState({
            checkOutTime: currenttime,
            employeeId: this.state.employeeId,
            date: today,

        });
        var self = this;
        if (navigator.onLine) {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            this.state.companyId = companyId;
            this.setState({
                companyId: companyId,
            });
//alert("thiss"+this.state.location)
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    checkOutTime: this.state.checkOutTime,
                    employeeId: this.state.employeeId,
                    date: this.state.date,
                    companyId: this.state.companyId,
                    location:this.state.location,
                    sms:this.state.sms,
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
                contentType: "application/json",
                dataType: 'json',
                async: false,

                success: function (data, textStatus, jqXHR) {
                    if (data.employeeName == "NOT_VAILD") {
                        confirmAlert({
                            title: 'CheckIn Failed',                        // Title dialog
                            message: 'Entered An Invalid Employee Id Kindly Try Check In Again With A Valid Employee Id',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                        })

                    }
                    else if (data.employeeName == "NOT_CHECKED_IN") {
                        confirmAlert({
                            title: 'Not Checked In',                        // Title dialog
                            message: data.employeeId + ' is not checked in today',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm

                        })
                    }
                    else if (data.employeeName == "ALREADY_CHECKOUT") {
                        confirmAlert({
                            title: 'Check Out Failed',                        // Title dialog
                            message: 'The Employee Id '+data.employeeId + ' is already checked out today',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm


                        })


                    }else if(data.employeeName == "BLOCKED"){
                        confirmAlert({
                            title: 'Check In Failed',                        // Title dialog
                            message:'The Employee Id '+ data.employeeId + '  has been BLOCKED',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm

                        });
                    }  else {
                        confirmAlert({
                            title: 'Check Out Success',                        // Title dialog
                            message: 'The Employee Id '+ data.employeeId+' Checked Out Successfully  ' ,               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                        })


                    }
                    self.state.employeeId = '';
                    self.setState({
                        employeeId: '',
                    })
                },
                error: function () {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });

                },
            });

        } else {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            this.state.companyId = companyId;
            this.setState({
                companyId: companyId,
            });

            var message = JSON.stringify({
                checkOutTime: this.state.checkOutTime,
                employeeId: this.state.employeeId,
                date: this.state.date,
                companyId: this.state.companyId,
                location:this.state.location,
                sms:this.state.sms,
            });

            var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
                switch (upgradeDb.oldVersion) {
                    case 0:

                    case 1:
                        upgradeDb.createObjectStore('checkInOut', { autoIncrement: true });
                     
                }
            });

            dbPromise.then(function (db) {
                var tx = db.transaction('checkInOut', 'readwrite');
                var keyValStore = tx.objectStore('checkInOut');
                keyValStore.put({"data":message,"status":"CheckOut"});
                return tx.complete;

            }).then(function (val) {
            });
            self.state.employeeId = '';
            self.setState({
                employeeId: '',
            })
        }
    }
    NoAction() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={Attendence} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>, document.getElementById('root'));
        this.state.employeeId = '';
        this.setState({
            employeeId: '',
        })

    }

    /*  //Capturing and Storing The Finger Print
        Capture() {
         try {
 
             var res = CaptureFinger(quality, timeout);
             if (res.httpStaus) {
 
                 if (res.data.ErrorCode == "0") {
 
                     this.store(res.data.AnsiTemplate);
                 }
             }
             else {
                 alert(res.err);
             }
         }
         catch (e) {
             alert(e);
         }
         return false;
     }
     //Storing Finger Print (need this to add in add employee)
     store(iso) {
         var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
         this.state.companyId = companyId;
         this.setState({
             companyId: companyId,
         });
 
         $.ajax({
             type: "POST",
             async: false,
             crossDomain: true,
             url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/fingerprint/store",
             data: JSON.stringify({
                 employeeId: this.state.employeeId,
                 companyId: this.state.companyId,
                 fingerPrint: iso
             }),
             dataType: 'json',
             contentType: "application/json; charset=utf-8",
             processData: false,
             success: function (data) {
                // alert("stored succesfully");
             },
             error: function (jqXHR, ajaxOptions, thrownError) {
 
                // alert("error");
             },
         });
 
     }
  */
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

            <div className="container " style={{
                marginBottom: "20%",
                backgroundColor: "white",

            }}>
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


                <div class="form-group"
                    style={{
                        textAlign: "center",
                        display: "block"
                    }}>
                    {/* <label htmlFor="employeeId"
                    >Employee ID:</label> */}
                    <input
                        type="number"
                        autoFocus
                        value={this.state.employeeId}
                        required
                        name="employeeId"
                        onChange={this.handleUserInput}
                        className="form-control"
                        id="employeeId"
                        placeholder={this.state.companyType}

                        style={{
                            width: "50%",
                            height: "50px",
                            display: "inline-block",
                            marginLeft: "10px"
                        }}
                    />
                </div>

                <div className="row" id="checkInOut" >
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a to="/" onClick={() => this.checkIn()} id="checkIn" className="" ></a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a to="/" id="checkOut" onClick={() => this.checkOut()} ></a>
                    </div>

                </div>
            </div>

        );
    }

}

export default Attendence;
{/* <div>
<input type="submit" id="btnCapture" value="Capture" class="btn btn-primary btn-100" onClick={() => this.Capture()} />
</div> */}