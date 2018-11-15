import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ExcelExportResponse from './ExcelExportResponse';
import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';
import EmployeeMenuPage from './EmployeeMenuPage';

var result;
var oldFileNames;
var name;
class ExcelFileToJSON extends Component {

 constructor() {
 super()

//
this.state = {

            data:[],
  //   companyId:companyId,
    }
 }

componentDidMount() {

var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
                }),
    
           // data:resultData,
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/excelexport/getfilename",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
       //   console.log(data);
          oldFileNames=data.fileName;

},
            error: function (data) {
              confirmAlert({
                title: 'No Internet',                        // Title dialog
                message: 'Network Connection Problem',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              });


            },
});


$("#files").prop("disabled", true);
$("#submit").prop("disabled", true);
  var detector = new MobileDetect(window.navigator.userAgent)
          
//alert("DEVICE DETAILS"+detector.mobile()+"----"+detector.phone()+"----"+detector.tablet()+"----"+detector.os()+"----"+detector.userAgent());

var mobile=detector.mobile();
var phone=detector.phone();
var tablet=detector.tablet();
//var os=detector.os();
var newos=navigator.platform;
var OSName="null";

if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";



          /*
             console.log( "Mobile: " + mobile);
            console.log( "Phone: " +phone );
            console.log( "Tablet: " +tablet );
            //console.log( "OS: " + os);
            console.log( "userAgent: " + detector.userAgent());
            console.log("NEW OS"+newos);
            console.log("OS NAME"+OSName);
*/

if( tablet==null && OSName=="Windows"){

$("#files").prop("disabled", false);
alert("success");

}else{

var data;

  if(mobile!==null){
  data="Mobile";
}
if(tablet!==null){
data="Tablet";
}

if(OSName=="null"){
  data="Your OS ";
}

  confirmAlert({
            title: 'File CanNot Be Uploaded',                        // Title dialog
            message: "Uploading File From "+data+" Is Forbidden",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });

     ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={() => <EmployeeMenuPage />} />


            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();
}
  
 /* set up drag-and-drop event */
  $(document).ready(function(){
    $('#files').change(handleFile);
  });


function handleFile(e) {
   

        var files = e.target.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            name = f.name;
    //  console.log("FILE NAME : " +name);
            reader.onload = function (e) {
                var data = e.target.result;
 //console.log("DATA : " +data);
  var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
                /* if binary string, read with type 'binary' */
                
                var workbook = XLSX.read(binary, { type: 'binary' });
 //console.log("WORK BOOK : " +workbook);
                /* DO SOMETHING WITH workbook HERE */
             //   workbook.SheetNames.forEach(function (sheetName) {
              var sheetName = workbook.SheetNames[0];
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                 //  var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                  //   console.log("ROA LENGTH: " +roa.length);
                    if (roa.length > 0) {
                        result = roa;
                        // console.log("RESULT : " +result);
                       //  alert("RESULT LENGTH : " +result.length);

                         $("#submit").prop("disabled", false);
                    }else{

                      confirmAlert({
                        title: 'Uploading File Failed',                        // Title dialog
                        message: 'An Empty File Cannot Be Uploaded',
                        confirmLabel: 'Ok',                           // Text button confirm


                    });

                    }
                   
               // });
               //Get the first column first cell value
            //    alert(result[0].Column1);
            };
            reader.readAsArrayBuffer(f);
        }

    
       }
       /*
var self=this;
          var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
                }),
    
           // data:resultData,
            url: "http://localhost:8080/EmployeeAttendenceAPI/excelexport/getfilename",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
          console.log(data);

          var storedFileName=data.fileName;
var fileArray = storedFileName.split(",");
alert("FILE ARRAY"+fileArray);
alert("file length"+fileArray.length);
var length=fileArray.length;
var test=1;
for(var i=0;i<fileArray.length;i++){
  alert("in loop" +i);
  alert("fileName in arrary"+fileArray[i]);
if(fileArray[i].toString()==name){

  alert("file name matched");
  test=0;

}

if(test==0){
  confirmAlert({
                        title: 'Uploading File',                        // Title dialog
                        message: 'File Upload Will Be Done Shortly',
                        confirmLabel: 'Ok',                           // Text button confirm


                    });

for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
      console.log("FILE NAME : " +name);
       
       

}else{

  confirmAlert({
            title: 'File Upload Error',                        // Title dialog
            message: "You Have Uploaded An Invalid File Please Upload A Valid File ",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });
}
}
         

  },
            error: function (data) {
                confirmAlert({
                    title: 'Server Error',                        // Title dialog
                    message: 'Server Error Try Again Later',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                });


            },
});

}
*/
}
  

Upload(){

var fileArray = oldFileNames.split(",");
/* alert("FILE ARRAY"+fileArray);
alert("file length"+fileArray.length); */
var length=fileArray.length;
var test=1;
for(var i=0;i<fileArray.length;i++){
/*  alert("in loop" +i);
  alert("fileName in arrary"+fileArray[i]); */
if(fileArray[i].toString()==name){

/*  alert("file name matched"); */
  test=0;

}
}

if(test==0){
  
confirmAlert({
                        title: 'Uploading File',                        // Title dialog
                        message: 'File Upload Will Be Done Shortly',
                        confirmLabel: 'Ok',                           // Text button confirm


                    });



var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
//console.log("INSIDE UPLOAD FUNCTION");
//console.log("RESULT DATA : " +JSON.stringify(result));

var resultData=JSON.stringify(result);
this.state.result1=resultData.toString();

//alert("AJAX DATA : "+resultData);
//console.log("AJAX DATA : "+resultData.toString());
 
  /*this.state.data = [];
  this.state.data.push(companyId);
  this.state.data.push(resultData);

 this.state.data = this.state.data.toString();

 this.setState({
            data: this.state.data.toString(),
        });
var jsonData=this.state.data.toString();*/
 // alert("AJAX ARRAY DATA : "+JSON.stringify(result));
 $.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
                testlist:result}),
    
           // data:resultData,
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/excelexport/uploadData",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
       //   console.log(data);
           ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={() => <ExcelExportResponse data={data} />} />


            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();


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

  confirmAlert({
            title: 'File Upload Error',                        // Title dialog
            message: "You Have Uploaded An Invalid File Please Upload A Valid File ",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });
}



}


 render() {


 return (

<div >
<input type="file" id="files" name="files"/>
<br/>
     <button type="button" id="submit" onClick={() => this.Upload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>

  

</div>



  );
 }
}

export default ExcelFileToJSON;