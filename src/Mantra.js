import $ from 'jquery';

var isGetSuccess = false;
var KeyFlag = "";
var uri = "https://localhost:8003/mfs100/";  //Secure


    
export  function CaptureFinger(quality, timeout) {
    if (!PrepareScanner()) {
        return getFalseRes();
    }
    var MFS100Request = {
        "Quality": quality,
        "TimeOut": timeout
    };
    var jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("capture", jsondata);
}

export function PrepareScanner() {
    try
    {
        if (!isGetSuccess) {
            var resInfo = GetMFS100Client("info");
            if (!resInfo.httpStaus) {
           
                return false;
            }
            else {
                isGetSuccess = true;
            }
           
            if (KeyFlag !=  null && KeyFlag != 'undefined' && KeyFlag.length > 0) {
                var MFS100Request = {
                    "Key": KeyFlag,
                };
                var jsondata = JSON.stringify(MFS100Request);
                PostMFS100Client("keyinfo", jsondata);
            }
        }
    }
    catch(e) {}
    return true;
}
export function getFalseRes()
{
    var res;
    res = { httpStaus: false, err: "Error while calling service" };
    return res;
}

export function PostMFS100Client(method, jsonData) {
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
        type: "POST",
        async: false,
        crossDomain: true,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        data: jsonData,
        dataType: "json",
        processData: false,
        success: function (data) {
            httpStaus = true;
            res = { httpStaus: httpStaus, data: data };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}

export const quality = 60; //(1 to 100) (recommanded minimum 55)
export const timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )

function GetMFS100Client(method) {
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
        type: "GET",
        async: false,
        crossDomain: true,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (data) {
            httpStaus = true;
            res = { httpStaus: httpStaus, data: data };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}

function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}
export function VerifyFinger(ProbFMR, GalleryFMR) {
    if (!PrepareScanner()) {
        return getFalseRes();
    }
    var MFS100Request = {
        "ProbTemplate": ProbFMR,
        "GalleryTemplate": GalleryFMR,
        "BioType": "FMR" // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    var jsondata = JSON.stringify(MFS100Request);
    return PostMFS100Client("verify", jsondata);
}
