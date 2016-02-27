//Connessioni ai WebServices
var tipoDiConn = "prod";
var urlProd = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/';

if (tipoDiConn == "test") {
    urlProd = 'http://localhost:60683/WebServiceAppDondi.asmx/';
}
if (tipoDiConn == "preprod") {
    urlProd = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondiTest.asmx/';
}

var urlGetAuthentication = urlProd + 'GetAuthentication';
var urlGetClienteById = urlProd + 'GetClienteById';
var urlGetElencoMezzi = urlProd + 'GetElencoMezzi';
var urlGetElencoClienti = urlProd + 'GetElencoClienti';
var urlGetElencoDistributori = urlProd + 'GetElencoDistributori';
var urlGetElencoOperatori = urlProd + 'GetElencoOperatori';
var urlGetElencoProdotti = urlProd + 'GetElencoProdotti';
var urlGetElencoProdottiVenduti = urlProd + 'GetElencoProdottiVenduti';
var urlGetElencoProdottiVendutiPerLotto = urlProd + 'GetElencoProdottiVendutiPerLotto';
var urlInsertProdotto = urlProd + 'InsertProdotto';
var urlGetProdottiDaGestireInMagazzino = urlProd + 'GetProdottiDaGestireInMagazzino';
var urlGetProdottiDaScaricareDaMagazzino = urlProd + 'GetProdottiDaScaricareDaMagazzino';
var urlGetProdottiInMagazzino = urlProd + 'GetProdottiInMagazzino';
var urlGetProdottiInMagazzinoResi = urlProd + 'GetProdottiInMagazzinoResi';
var urlGetProdottiInMagazzinoResiFiltrato = urlProd + 'GetProdottiInMagazzinoResiFiltrato';
var urlStoricizzoProdottiInMagazzino = urlProd + 'StoricizzoProdottoInMagazzino';
var urlSmaltiscoProdottoInMagazzino = urlProd + 'SmaltiscoProdottoInMagazzino';
var urlSmaltiscoProdottoInMagazzinoV2 = urlProd + 'SmaltiscoProdottoInMagazzinoV2';
var urlSmaltiscoProdottoInMagazzinoV3 = urlProd + 'SmaltiscoProdottoInMagazzinoV3';
var urlQuantitaProdottiInMagazzino = urlProd + 'AggiornaQuantitaProdottiInMagazzino';
var urlQuantitaProdottiInMagazzinoV2 = urlProd + 'AggiornaQuantitaProdottiInMagazzinoV2';
var urlGetProdottiSuCamion = urlProd + 'GetProdottiInCamion';
var urlGetProdottiSuCamionByIdProdotto = urlProd + 'GetProdottiInCamionByIdProdotto';
var urlStoricizzoProdTrasporto = urlProd + 'StoricizzoProdottoInTrasporto';
var urlStoricizzoProdTrasportoV2 = urlProd + 'StoricizzoProdottoInTrasportoV2';
var urlAggiornaQuantInTrasporto = urlProd + 'AggiornaQuantitaProdottiInTrasporto';
var urlAggiornaQuantInTrasportoV2 = urlProd + 'AggiornaQuantitaProdottiInTrasportoV2';
var urlGetSituazioneClienti = urlProd + 'GetSituazioneClienti';
var urlGetSituazioneDistributori = urlProd + 'GetSituazioneDistributori';
var urlGetSituazioneCliente = urlProd + 'GetSituazioneCliente';
var urlGetSituazioneClienteV2 = urlProd + 'GetSituazioneClienteV2';
var urlAggiornaQuantitaProdottiVenduti = urlProd + 'AggiornaQuantitaProdottiVenduti';
var urlAggiornaQuantitaProdottiInMagazzinoResi = urlProd + 'AggiornaQuantitaProdottiInMagazzinoResi';
var urlAggiornaQuantitaProdottiInMagazzinoResiV2 = urlProd + 'AggiornaQuantitaProdottiInMagazzinoResiV2';
var urlStoricizzoStatoProdottiInDistributore = urlProd + 'StoricizzoStatoProdottoInDistributore';
var urlStoricizzoStatoProdottiInDistributore2 = urlProd + 'StoricizzoStatoProdottoInDistributore2';
var urlAggiornaQuantitaProdottoInCliente = urlProd + 'AggiornaQuantitaProdottoInCliente';
var urlAggiornaQuantitaProdottoInClienteV2 = urlProd + 'AggiornaQuantitaProdottoInClienteV2';
var urlGetSituazioneDistributore = urlProd + 'GetSituazioneDistributore';
var urlGetSituazioneDistributoreV2 = urlProd + 'GetSituazioneDistributoreV2';
var urlAggiornoQuantitaProdottiInDistributore = urlProd + 'AggiornaQuantitaProdottoInDistributore';
var urlAggiornoQuantitaProdottiInDistributoreV2 = urlProd + 'AggiornaQuantitaProdottoInDistributoreV2';
var urlAggiornoQuantitaProdottiInDistributoreV3 = urlProd + 'AggiornaQuantitaProdottoInDistributoreV3';
var urlAggiornaQuantitaProdottoInClienteV3 = urlProd + 'AggiornaQuantitaProdottoInClienteV3';
var urlAggiornaColoreProdottoInCliente = urlProd + 'AggiornaColoreProdottoInCliente';
var urlAggiornaColoreProdottoInDistributore = urlProd + 'AggiornaColoreProdottoInDistributore';
var urlStoricizzaStatoProdottoInCliente = urlProd + 'StoricizzoStatoProdottoInCliente';
var urlStoricizzaStatoProdottoInClienteV2 = urlProd + 'StoricizzoStatoProdottoInClienteV2';
var urlCaricaProdottiInMagazzino = urlProd + 'CaricaProdottiInMagazzino';
var urlCaricaProdottiInMagazzinoV2 = urlProd + 'CaricaProdottiInMagazzinoV2';
var urlGetSituazioneVendutoInCliente = urlProd + 'GetSituazioneVendutoInCliente';
var urlGetSituazioneVendutoInDistributore = urlProd + 'GetSituazioneVendutoInDistributore';
var urlGetSituazioneVendutoInDistributore2 = urlProd + 'GetSituazioneVendutoInDistributore2';
var urlGetVendutoCliente = urlProd + 'GetVendutoCliente';
var urlGetVendutoDirettamente = urlProd + 'GetVendutoDirettamente';
var urlGetVendutoDistributori = urlProd + 'GetVendutoDistributori';
var urlGetVendutoByIdProdotto = urlProd + 'GetVendutoByIdProdotto';
var urlGetVendutoByIdDistributore = urlProd + 'GetVendutoByIdDistributore';
var urlGetVendutoPerTuttiDistributori = urlProd + 'GetVendutoPerTuttiDistributori';
var urlGetVendutoPerTuttiDistributoriStampa = urlProd + 'GetVendutoPerTuttiDistributoriStampa';
var urlGetVendutoByIdCliente = urlProd + 'GetVendutoByIdCliente';
var urlResetEvidenzaByCliente = urlProd + 'ResetEvidenzaByCliente';
var urlResetEvidenzaByDistributore = urlProd + 'ResetEvidenzaByDistributore';
var urlResetEvidenzaMagazzino = urlProd + 'ResetEvidenzaMagazzino';
var urlCorrezioneVendita = urlProd + 'CorrezioneVendita';
var urlGetMark = urlProd + 'GetMark';
var urlGetMarkReport = urlProd + 'GetMarkReport';
var urlFilterMarkReport = urlProd + 'FiltraMarkReport';
var urlGetStoricoMagazzinoByIdProd = urlProd + 'GetStoricoMagazzinoByIdProd';
var urlCorrezioneMagazzinoByIdProd = urlProd + 'CorrezioneMagazzinoByIdProd';
var urldisplayNumeriLottoMagazzino = urlProd + 'displyaNumeriLottoMagazzino';
var urldisplayNumeriLottoMagazzinoResi = urlProd + 'displyaNumeriLottoMagazzinoResi';
var urldisplayNumeriLottoDistributore = urlProd + 'displayNumeriLottoDistributore';
var urlGetProdottiInMagazzinoByIdProdNumLotto = urlProd + 'GetProdottiInMagazzinoByIdProdNumLotto';
var urlAzzeraProdottoInMagazzinoResi = urlProd + 'AzzeraProdottoInMagazzinoResi';
var urlGetVenduto = urlProd + 'GetVenduto';
var urlGetMagazzino = urlProd + 'GetMagazzino';
var urlGetMagazzinoPerSyncro = urlProd + 'GetMagazzinoPerSyncro';
var urlGetMagazzinoResiPerSyncro = urlProd + 'GetMagazzinoResiPerSyncro';
var urlGetSituazioneDistributoriPerSyncro = urlProd + 'GetSituazioneDistributoriPerSyncro';
var urlAggiornaColoreProdottoInCliente = urlProd + 'AggiornaColoreProdottoInCliente';

var urlGetMagazzinoResi = urlProd + 'GetMagazzinoResi';
var urlGetMaxId = urlProd + 'GetMaxId';
var urlSincronizzoDatiInMagazzino = urlProd + 'SincronizzoDatiInMagazzino';
var urlSincronizzoDatiInMagazzinoResi = urlProd + 'SincronizzoDatiInMagazzinoResi';
var urlSincronizzoDatiInSituazioneDistributori = urlProd + 'SincronizzoDatiInSituazioneDistributori';
var urlSincronizzoDatiInSituazioneCliente = urlProd + 'SincronizzoDatiInSituazioneCliente';
var urlSincronizzoDatiInVenduto = urlProd + 'SincronizzoDatiInVenduto';
var urlAggiornaRecordCancellatiInVenduto = urlProd + 'AggiornaRecordCancellatiInVenduto';
var urlAggiornaTabellaSincronizzazioni = urlProd + 'AggiornaTabellaSincronizzazioni';
var urlUltimoAggiornamentoByIdOperatore = urlProd + 'UltimoAggiornamentoByIdOperatore';

$(function () {    

    $(".leftPanel").load("Include/LeftPanel.html");
    
    //ElencoMezziPerDistributori();
    //ElencoMezziPerClienti();
    //ElencoMezziPerCaricareMerce();

    GetElencoDistributori();

    //ElencoDistributori();

    ElencoClienti();        

    $("#btn-submit").click(function () {

        var email = $("#txt-email").val();
        var password = $("#txt-password").val();
        alert("user=" + email);
        //Autenticazione(email, password);
        getAutenticazione(email, password);

    });

    //$("#gestMagazzino").click(function () {
    //    ElencoProdottiInMagazzino();
    //});

    if ($('#chck-rememberme').is(':checked')) {
        // save username and password
        localStorage.usrname = $('#txt-email').val();
        localStorage.pass = $('#txt-password').val();
        localStorage.chkbx = $('#chck-rememberme').val();
    } else {
        localStorage.usrname = '';
        localStorage.pass = '';
        localStorage.chkbx = '';
        localStorage.idOperatore = '';
        $('#txt-email').val('');
        $('#txt-password').val('');
    }

    $("#LogOut").click(function () {
        if ($('#chck-rememberme').is(':checked')) {
            // save username and password
            localStorage.usrname = $('#txt-email').val();
            localStorage.pass = $('#txt-password').val();
            localStorage.chkbx = $('#chck-rememberme').val();
        } else {
            localStorage.usrname = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
            localStorage.idOperatore = '';
            $('#txt-email').val('');
            $('#txt-password').val('');
        }
    });

});

function isInt32(n) {
    return +n === n && !(n % 1) && n < 0x80000000 && n >= -0x80000000;
}

function isUint8(n) {
    return +n === n && !(n % 1) && n < 0x100 && n >= 0;
}

function isInteroPositivo(n) {
    return +n === n && !(n % 1) && n < 0x80000000 && n > 0;
}

function onlyNumbers(n) {
    var x = n;
    var regex = /^[a-zA-Z]+$/;
    if (!x.match(regex)) {
        //alert("Must input numbers");
        return false;
    }
}

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

function stringPerDataA(_date, _format, _delimiter) {
    var formatedDate = '';
    if (_date != '') {
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        formatedDate.setDate(formatedDate.getDate() + 1);
        var mese = (1 + formatedDate.getMonth());
        formatedDate = padLeft(formatedDate.getDate(), 2) + '-' + padLeft(mese, 2) + '-' + formatedDate.getFullYear();

    }
    return formatedDate;
}

function stringPerDataEsatta(_date, _format, _delimiter) {
    var formatedDate = '';
    if (_date != '') {
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        formatedDate.setDate(formatedDate.getDate());
        var mese = (1 + formatedDate.getMonth());
        formatedDate = padLeft(formatedDate.getDate(),2) + '-' + padLeft(mese,2) + '-' + formatedDate.getFullYear();

    }
    return formatedDate;
}

function dataItaliana(_date) {
    var formatedDate = '';
    if (_date != null) {
        _date = _date.substring(0, 10);
        var dateItems = _date.split('-');
        formatedDate = dateItems[2] + '-' + dateItems[1] + '-' + dateItems[0];
    }
    return formatedDate;
}

function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function stringPerDataAmericana(_date, _format, _delimiter) {
    var formatedDate = '';
    if (_date != '') {
        var dataSpezzata = _date.split(' ');
        var soloData = dataSpezzata[0];
        var orario = dataSpezzata[1];
        //var formatLowerCase = _format.toLowerCase();
        //var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = soloData.split(_delimiter);
        //var monthIndex = formatItems.indexOf("mm");
        //var dayIndex = formatItems.indexOf("dd");
        //var yearIndex = formatItems.indexOf("yyyy");
        //var month = parseInt(dateItems[1]);
        //month -= 1;
        //formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        //formatedDate.setDate(formatedDate.getDate() + 1);
        formatedDate = dateItems[2] + '-' + dateItems[1] + '-' + dateItems[0] + ' ' + orario;
    }
    return formatedDate;
}

function stringPerDataAmericanaPiUno(_date, _format, _delimiter) {
    var formatedDate = '';
    if (_date != '') {
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        formatedDate.setDate(formatedDate.getDate() + 1);
        formatedDate = formatedDate.getFullYear() + '-' + padLeft((1 + formatedDate.getMonth()), 2) + '-' + formatedDate.getDate();
    }
    return formatedDate;
}

function parseJsonDate(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
    date = d.getDate() + 1;
    date = date < 10 ? "0" + date : date;
    mon = d.getMonth() ;
    mon = mon < 10 ? "0" + mon : mon;
    year = d.getFullYear();
    return (date + "/" + mon + "/" + year);
};

function annoBisestile(anno) {
    if ((anno % 4) == 0) {
        return true;
    } else {
        return false;
    }
}

function parseJsonDateLettura(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);

    year = d.getFullYear();
    var bisestile = annoBisestile(year);
    mon = d.getMonth() + 1;    
    date = d.getDate() + 1;
    if ((mon == 4 || mon == 6 || mon == 9 || mon == 11) && date == 31) {
        mon = mon + 1;
        date = 1;
    }

    date = date < 10 ? "0" + date : date;
    
    if (date == "32" && mon < 12) {
        mon = mon + 1;
        date = "01";
    }
    if (date == "32" && mon == 12) {
        mon = 1;
        date = "01";
        year = year + 1;
    }
    if (bisestile == false && mon == "02" && date == "29") {
        date = "01";
        mon = "3";
    }
    mon = mon < 10 ? "0" + mon : mon;
   
    return (padLeft(date, 2) + "-" + padLeft(mon,2) + "-" + year);
};

function parseJsonDateLetturaAmericana(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);

    year = d.getFullYear();
    var bisestile = annoBisestile(year);
    mon = d.getMonth() + 1;
    date = d.getDate() + 1;
    if ((mon == 4 || mon == 6 || mon == 9 || mon == 11) && date == 31) {
        mon = mon + 1;
        date = 1;
    }

    date = date < 10 ? "0" + date : date;

    if (date == "32" && mon < 12) {
        mon = mon + 1;
        date = "01";
    }
    if (date == "32" && mon == 12) {
        mon = 1;
        date = "01";
        year = year + 1;
    }
    if (bisestile == false && mon == "02" && date == "29") {
        date = "01";
        mon = "3";
    }
    mon = mon < 10 ? "0" + mon : mon;

    return (year + "-" + padLeft(mon, 2) + "-" + padLeft(date, 2));
};

function parseJsonDateLetturaAmericanaWithTime(jsonDate) {
    var str, year, month, day, hour, minute, seconds, d, finalDate;

    str = jsonDate.replace(/\D/g, "");
    d = new Date(parseInt(str));

    year = d.getFullYear();
    month = pad(d.getMonth() + 1);
    day = pad(d.getDate());
    hour = pad(d.getHours());
    minutes = pad(d.getMinutes());
    seconds = pad(d.getSeconds());

    finalDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"  + seconds;

    return finalDate;
};

function pad(num) {
    num = "0" + num;
    return num.slice(-2);
}

function dataOdierna() {
    var currentTime = new Date();

    // returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1;

    // returns the day of the month (from 1 to 31)
    var day = currentTime.getDate();

    // returns the year (four digits)
    var year = currentTime.getFullYear();

    var ora = currentTime.getHours();
    var minuti = currentTime.getMinutes();
    var secondi = currentTime.getSeconds();

    var orario = padLeft(ora, 2) + ":" + padLeft(minuti, 2) + ":" + padLeft(secondi, 2);
    // write output MM/dd/yyyy
    var oggi = year + "-" + padLeft(month, 2) + "-" + padLeft(day, 2) + " " + orario;

    return oggi;
}

function parseJsonDateSenzaTime(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
    date = d.getDate();
    date = date < 10 ? "0" + date : date;
    mon = d.getMonth() + 1;
    mon = mon < 10 ? "0" + mon : mon;
    year = d.getFullYear();
    return (date + "/" + mon + "/" + year);
};

function parseJsonDateToJsDate(jsonDate) {
    //var offset = new Date().getTimezoneOffset() * 60000;
    //var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    //if (parts[2] == undefined) parts[2] = 0;
    //if (parts[3] == undefined) parts[3] = 0;
    //d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
    //date = d.getDate() + 1;
    //date = date < 10 ? "0" + date : date;
    //mon = d.getMonth() + 1;
    //mon = mon < 10 ? "0" + mon : mon;
    //year = d.getFullYear();
    //return (year + "-" + mon + "-" + date);
    var javascriptDate = new Date(parseInt(jsonDate.substr(6)));

    return javascriptDate;
};

function getAutenticazione(user, password) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM operatori where user = ? and password = ?", [user, password], operatoriValidi);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function operatoriValidi(transaction, results) {
    var i;
      
    for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        alert("ruolo=" + row.Ruolo);
        if (row.Ruolo != null) {
            if (row.Ruolo == 'admin') {
                $(".onlyAdmin").switchClass("onlyAdmin", "", 1000);
            }
            localStorage.idOperatore = row.IdOperatore;
            location.hash = "ElencoDistributori";
        } else {
            $("#authResult").html('User o Password Errati!!!');
        }
    }
   
}

function Autenticazione(user, password) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",            
        url: urlGetAuthentication,
        cache: false,                   
        async: true,       
        data: JSON.stringify({ user: user, password: password }),        
        error: function (data) {
            console.log(data.responseText)
            $("#authResult").html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            
            //console.log(risultati);                       
            if (risultati.ruolo != null) {
                if (risultati.ruolo == 'admin') {
                    $(".onlyAdmin").switchClass("onlyAdmin", "", 1000);                    
                }
                localStorage.idOperatore = risultati.idOperatore;
                location.hash = "ElencoDistributori";
            } else {
                $("#authResult").html('User o Password Errati!!!');
            }

        }

    });

}

function GetClienteById(idCliente) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetClienteById,
        cache: false,
        async: false,
        data: JSON.stringify({ idCliente: idCliente }),
        error: function (data) {
            console.log(data.responseText)
            //$("#authResult").html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);                       
            return risultati;

        }

    });

}

function ElencoMezziPerCaricareMerce() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoMezzi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log('elenco mezzi');
            //console.log(risultati);

            var mezzi = '<li data-role="list-divider">Scegli il mezzo su cui caricare la merce:</li>'
            for (var i = 0; i < risultati.length; i++) {
                //mezzi = mezzi + '<li><a href="#formPerCaricareMerceSuCamion" class="caricaDaMagazzinoPerCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">' + risultati[i].descrizione + '</a></li>';

                
                mezzi = mezzi + '<li><a href="#CaricoScaricoMagazzino" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '"><b>' + risultati[i].descrizione + '</b></a></li>';
            }

            var tabellaMezzi = '<table id="tabellaMezzi" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Mezzo</th>' +                                                
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Mezzo</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + '<tr>' +
                    '<td class="medioGrande"><b>' + risultati[i].descrizione + '</b></td>' +
                    '<td><a href="#formPerCaricareMerceSuCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaDaMagazzinoPerCamion ui-btnCarica">Carica</a></td>' +
                    '<td><a href="#formPerScaricareMerceDaCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active ScaricaDaCamionInMagazzino ui-btnScarica">Scarica</a></td>' +
                    '</tr>';
            }

            tabellaMezzi = tabellaMezzi + righe + '</tbody> </table>';


            $("#tabellaMezziCaricoScarico").html(tabellaMezzi);

            var table = $('#tabellaMezzi').DataTable(
               { "paging": false, responsive: true }
           );


            $(".caricaDaMagazzinoPerCamion").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                //var IdCliente = $(this).attr('data-IdCliente');
                //var descCliente = $(this).attr('data-descCliente');
                //$("#titoloProdottiInCamionPerCliente").html('Elenco prodotti su:' + descMezzo);
                $(".h1DettCamion").html('Carica per:' + descMezzo);
               
                //alert(idMezzo);
                //return;
                ElencoProdottiInMagazzinoPerMezzo(idMezzo, 'carica');

                //ElencoProdottiSuCamionPerCliente(idMezzo, IdCliente);
            });

            $(".ScaricaDaCamionInMagazzino").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                //var IdCliente = $(this).attr('data-IdCliente');
                //var descCliente = $(this).attr('data-descCliente');
                //$("#titoloProdottiInCamionPerCliente").html('Elenco prodotti su:' + descMezzo);
                $(".h1DettCamionScarica").html('Scarica merce da:<br>' + descMezzo);

                //alert(idMezzo);
                //return;
                ElencoProdottiInMagazzinoPerMezzo(idMezzo, 'scarica');

                //ElencoProdottiSuCamionPerCliente(idMezzo, IdCliente);
            });

            //console.log(risultati);

        }

    });
}

function ElencoMezziPerClienti() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetElencoMezzi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log('elenco mezzi');
            //console.log(risultati);
            $(".mezziDisponibiliPerCliente").html('');
            var mezzi = '<li data-role="list-divider">Scegli un mezzo da cui caricare la merce:</li>'
            for (var i = 0; i < risultati.length; i++) {
                mezzi = mezzi + '<li><a href="#formProdottiInCamionPerCliente" class="caricaDaCamionPerCliente" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">Carica da: ' + risultati[i].descrizione + '</a></li>';
            }
            $(".mezziDisponibiliPerCliente").html(mezzi);

            $(".caricaDaCamionPerCliente").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                var IdCliente = $(this).attr('data-IdCliente');
                var descCliente = $(this).attr('data-descCliente');
                $("#titoloProdottiInCamionPerCliente").html('Elenco prodotti su:' + descMezzo);
                $(".descCliente").html('Carica per:' + descCliente);
                var desc = '\'' + descCliente + '\'';
                var linkBack = 'javascript:GetSituazioneCliente(' + IdCliente + ', ' + desc + ');'
                $(".backCliente").attr("href", linkBack);

                ElencoProdottiSuCamionPerCliente(idMezzo, IdCliente);
            });

            //console.log(risultati);

        }

    });
}

function ElencoMezziPerDistributori() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetElencoMezzi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText);
            $(".mezziDisponibiliPerDistributore").html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log('elenco mezzi');
            //console.log(risultati);

            var mezzi = '<li data-role="list-divider">Scegli un mezzo da cui caricare la merce:</li>';
            for (var i = 0; i < risultati.length; i++) {
                mezzi = mezzi + '<li><a href="#formProdottiInCamionPerDistributore" class="caricaDaCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">Carica da: ' + risultati[i].descrizione + '</a></li>';
            }
            $(".mezziDisponibiliPerDistributore").html(mezzi);

            $(".caricaDaCamion").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                var idDistributore = $(this).attr('data-IdDistributore');
                var descDistributore = $(this).attr('data-descDistributore');
                $("#titoloProdottiInCamionPerDistributore").html('Elenco prodotti su:' + descMezzo);
                $(".descDistributore").html('Carica per:' + descDistributore);
                //var desc = '\'' + descDistributore + '\'';
                var desc = descDistributore;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
                $(".backDistributore").attr("href", linkBack);

                ElencoProdottiSuCamionPerDistributore(idMezzo, idDistributore);
            });

            //console.log(risultati);

        }

    });
}

function ElencoClienti() {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            
            t.executeSql("SELECT idcliente, descrizione, indirizzo, dataModifica, cancellato, idoperatore, ordine From clienti ORDER by descrizione", [], function (transaction, results) {
                //console.log(risultati);

            var clienti = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il Cliente..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                var desc = row.Descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';

                clienti = clienti + '<li><a href="javascript:GetSituazioneCliente(' + row.IdCliente + ', ' + desc + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r nomeCliente" >' + row.Descrizione + '</a></li>';
                //$("#" + row).show();
            }
            clienti = clienti + '</ul>';

            $("#tuttiClienti").html(clienti);

            //console.log(clienti);            

            }, errorHandler);
            //console.log(risultati);
        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }
}

//function ElencoClienti() {
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",        
//        url: urlGetElencoClienti,
//        cache: false,
//        async: true,
//        data: JSON.stringify({}),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            var clienti = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il Cliente..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

//            for (var i = 0; i < risultati.length; i++) {
//                var desc = risultati[i].descrizione;
//                desc = desc.replace("'", "\\'");
//                desc = '\'' + desc + '\'';
                
//                clienti = clienti + '<li><a href="javascript:GetSituazioneCliente(' + risultati[i].idCliente + ', ' + desc + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r nomeCliente" >' + risultati[i].descrizione + '</a></li>';
//                //$("#" + risultati[i]).show();
//            }
//            clienti = clienti + '</ul>';

//            $("#tuttiClienti").html(clienti);

//            //console.log(clienti);

//            //$(".caricaDaCamion").on('click', function () {

//            //    var idCliente = $(this).attr('data-idCliente');
//            //    var descCliente = $(this).attr('data-descCliente');
//            //    var idDistributore = $(this).attr('data-IdDistributore');
//            //    var descDistributore = $(this).attr('data-descDistributore');
//            //    $("#titoloProdottiInCamion").html('Elenco prodotti su:' + descMezzo);
//            //    $(".descDistributore").html('Carica per:' + descDistributore);
//            //    var desc = '\'' + descDistributore + '\'';
//            //    var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
//            //    $(".backDistributore").attr("href", linkBack);

//            //    ElencoProdottiSuCamion(idCliente, idDistributore);
//            //});

//            //console.log(risultati);

//        }

//    });
//}

// Storicizzo Prodotti in magazzino ************************************************
function storicizzaProdottoInMagazzino(IdProdotto, IdOperatore, note, smaltito, quantitaRimasti, prezzoTotaleRimasti) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino",        
        url: urlStoricizzoProdottiInMagazzino,
        cache: false,

        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdProdotto: IdProdotto, IdOperatore: IdOperatore, note: note, smaltito: smaltito }),

        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            if (parseInt(quantitaRimasti) > 0) {
                AggiornaQuantitaProdottiInMagazzinoV2(IdProdotto, quantitaRimasti, prezzoTotaleRimasti, IdOperatore, note);
            }
        }

    });
   
}
// *********************************************************************************
// Aggiorno quantita Prodotti rimasti in magazzinoresi *********************************
function AggiornaQuantitaProdottiInMagazzinoResi(id, idProdotto, numeroLotto, codiceLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idDistributore, idOperatore, IdCliente) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",

        url: urlAggiornaQuantitaProdottiInMagazzinoResi,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, numeroLotto: numeroLotto, codiceLotto: codiceLotto, quantita: quantita, prezzoTotale: prezzoTotale, dataModifica: dataModifica, dataScadenza: dataScadenza, modificato: modificato, idDistributore: idDistributore, idOperatore: idOperatore, IdCliente: IdCliente }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            itemSincronizzato('id', id, 'magazzinoresi');
            //console.log('Record Inserito Correttamente in MagazzinoResi');

        }

    });
}
// *********************************************************************************
// Aggiorno quantita Prodotti rimasti in magazzino *********************************
function AggiornaQuantitaProdottiInMagazzino(idProdotto, codiceLotto, numeroLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, note, smaltito, colore, id) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
      
        url: urlQuantitaProdottiInMagazzino,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, codiceLotto: codiceLotto, numeroLotto: numeroLotto, quantita: quantita, prezzoTotale: prezzoTotale, dataModifica: dataModifica, dataScadenza: dataScadenza, modificato: modificato, idOperatore: idOperatore, note: note, smaltito: smaltito, colore: colore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            itemSincronizzato('id', id, 'magazzino');
            console.log(risultati);

        }

    });
}
// *********************************************************************************
// Aggiorno quantita Prodotti rimasti in magazzino V2*********************************
function AggiornaQuantitaProdottiInMagazzinoV2(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, note) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoV2",
        url: urlQuantitaProdottiInMagazzinoV2,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, note: note }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);

        }

    });
}
// *********************************************************************************

function aggiornaTabellaMySql(valoriTabella, nomeTabella) {
    var righeAggiornate = [];
    var righeCancellate = 0;
    var righeInserite = 0;

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",       
        url: urlQuantitaProdottiInMagazzinoV2,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, note: note }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

        }

    });

    if (mydb) {
        mydb.transaction(function (t) {

            t.executeSql(valoriTabella, [], function (transaction, results) {
                if (results.rowsAffected > 0) {
                    righeInserite = results.rowsAffected;
                    //console.log('Righe Inserite: ' + righeInserite);
                    //console.log('***Aggiornamento Tabella: ' + nomeTabella + ' completato***');
                    //$('.contentSyncroMagToTablet').html('');
                    $('.contentSyncroMagToTablet').append('Righe Inserite: ' + righeInserite + '<br>');
                    $('.contentSyncroMagToTablet').append('***Aggiornamento Tabella: ' + nomeTabella + ' completato***<br><br>');
                    //righeAggiornate = [righeCancellate, righeInserite];
                    //return righeAggiornate;
                }

            }, errorHandler);

        });
        function errorHandler(transaction, error) {
            console.log("Error : " + error.message + "<br>br>" + valoriTabella);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

//Inserisco la quantita di Prodotti Venduti
function AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, DataDDT, numeroLotto, dataScadenza, codiceLotto) {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("Insert into venduto (IdProdotto, IdDistributore, idCliente, Quantita, PrezzoTotale, IdOperatore, VenditaDiretta, numeroDDT, dataDDT, numeroLotto, dataScadenza, codiceLotto, syncro) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)", [idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, DataDDT, numeroLotto, dataScadenza, codiceLotto], function (transaction, results) {
                               
            }, errorHandler);
                        
            });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
      
}

//function AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, DataDDT, numeroLotto, dataScadenza, codiceLotto) {
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti",
//        url: urlAggiornaQuantitaProdottiVenduti,
//        cache: false,
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, idCliente: idCliente, quantita: quantitaVenduti, prezzoTotale: prezzoTotaleVenduti, idOperatore: idOperatore, VenditaDiretta: VenditaDiretta, numeroDDT: numeroDDT, DataDDT: DataDDT, NumeroLotto: numeroLotto, dataScadenza: dataScadenza, codiceLotto: codiceLotto }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati);

//        }

//    });
//}
//****************************************************************** 
function togliEvidenziatoCliente(idCliente, descCliente) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlResetEvidenzaByCliente,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idCliente: idCliente }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            GetSituazioneCliente(idCliente, descCliente);
        }

    });
}

function togliEvidenziatoDistributore(idDistributore, descDistributore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlResetEvidenzaByDistributore,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            GetSituazioneDistributore(idDistributore, descDistributore);
        }

    });
}

function togliEvidenziatoMagazzino() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlResetEvidenzaMagazzino,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            GestioneMagazzino();
        }

    });
}

function AggiornaColoreProdottoInCliente(idCliente, idProdotto, colore) {
    if (mydb) {       
        mydb.transaction(function (t) {
            if (idProdotto == 0) {
                var oggi = dataOdierna();
                t.executeSql("UPDATE situazioneclienti set DataModifica = '" + oggi + "', colore = ? Where idCliente = ? and idProdotto = ? and modificato = 0", [colore, idCliente, idProdotto], function (transaction, results) {

                    //console.log(risultati);            
                }, errorHandler);
            }

        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, colore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            if (idProdotto == 0) {
                var oggi = dataOdierna();
                t.executeSql("UPDATE situazionedistributori set DataModifica = '" + oggi + "', colore = ? Where idDistributore = ? and idProdotto = ? and modificato = 0", [colore, idDistributore, idProdotto], function (transaction, results) {

            //console.log(risultati);            
        }, errorHandler);
        }
            
            
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


function CorrezioneVendita(idVendita) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
            t.executeSql("delete from venduto Where idVendita = ?", [idVendita], function (transaction, results) {
                //console.log(risultati);
            }, errorHandler);     

        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function CorrezioneMagazzinoByIdProd(idMagazzino, idProdotto) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
            var query = "delete from magazzino Where idProdotto = ? and modificato = 0";
            t.executeSql(query, [idProdotto], function (transaction, results) {
                  
            }, errorHandler);
            var oggi = dataOdierna();
            t.executeSql("update magazzino set modificato = 0, dataModifica = '" + oggi + "' where id = ?", [idMagazzino], function (transaction, results) {

            }, errorHandler);

        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function AggiornaQuantitaProdottiVendutiServer(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, DataDDT, numeroLotto, dataScadenza, codiceLotto) {
    //console.log('idVendita=' + idVendita + '-' + 'idProdotto=' + idProdotto + '-' + 'idDistributore=' + idDistributore + '-' + 'idCliente=' + idCliente + '-' + 'quantitaVenduti=' + quantitaVenduti + '-' + 'prezzoTotaleVenduti=' + prezzoTotaleVenduti + '-' + 'idOperatore=' + idOperatore + '-' + 'VenditaDiretta=' + VenditaDiretta + '-' + 'numeroDDT=' + numeroDDT + '-' + 'DataDDT=' + DataDDT + '-' + 'numeroLotto=' + numeroLotto + '-' + 'dataScadenza=' + dataScadenza + '-' + 'codiceLotto=' + codiceLotto);
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti",
        url: urlAggiornaQuantitaProdottiVenduti,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, idCliente: idCliente, quantita: quantitaVenduti, prezzoTotale: prezzoTotaleVenduti, idOperatore: idOperatore, VenditaDiretta: VenditaDiretta, numeroDDT: numeroDDT, DataDDT: DataDDT, NumeroLotto: numeroLotto, dataScadenza: dataScadenza, codiceLotto: codiceLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //AggiornaTabellaSincronizzazioni();
        }

    });
}

function AggiornaTabellaSincronizzazioni() {
    var idOperatore = localStorage.idOperatore;
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlAggiornaTabellaSincronizzazioni,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({  idOperatore: idOperatore}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            $('.contentSyncronizzazioneTabletToVenduto').append('<br><br>' + risultati);
            //console.log(risultati);
         
        }

    });
}