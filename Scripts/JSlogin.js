//Connessioni ai WebServices
var tipoDiConn = "prod";
var urlProd = 'http://www.giacomorabaglia.com/appdistributoridondi/';

if (tipoDiConn != "prod") {
    urlProd = '';
}

var urlGetAuthentication = urlProd + 'WebServiceAppDondi.asmx/GetAuthentication';
var urlGetClienteById = urlProd + 'WebServiceAppDondi.asmx/GetClienteById';
var urlGetElencoMezzi = urlProd + 'WebServiceAppDondi.asmx/GetElencoMezzi';
var urlGetElencoClienti = urlProd + 'WebServiceAppDondi.asmx/GetElencoClienti';
var urlGetElencoDistributori = urlProd + 'WebServiceAppDondi.asmx/GetElencoDistributori';
var urlGetElencoProdotti = urlProd + 'WebServiceAppDondi.asmx/GetElencoProdotti';
var urlGetElencoProdottiVenduti = urlProd + 'WebServiceAppDondi.asmx/GetElencoProdottiVenduti';
var urlGetElencoProdottiVendutiPerLotto = urlProd + 'WebServiceAppDondi.asmx/GetElencoProdottiVendutiPerLotto';
var urlInsertProdotto = urlProd + 'WebServiceAppDondi.asmx/InsertProdotto';
var urlGetProdottiDaGestireInMagazzino = urlProd + 'WebServiceAppDondi.asmx/GetProdottiDaGestireInMagazzino';
var urlGetProdottiDaScaricareDaMagazzino = urlProd + 'WebServiceAppDondi.asmx/GetProdottiDaScaricareDaMagazzino';
var urlGetProdottiInMagazzino = urlProd + 'WebServiceAppDondi.asmx/GetProdottiInMagazzino';
var urlGetProdottiInMagazzinoResi = urlProd + 'WebServiceAppDondi.asmx/GetProdottiInMagazzinoResi';
var urlGetProdottiInMagazzinoResiFiltrato = urlProd + 'WebServiceAppDondi.asmx/GetProdottiInMagazzinoResiFiltrato';
var urlStoricizzoProdottiInMagazzino = urlProd + 'WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino';
var urlSmaltiscoProdottoInMagazzino = urlProd + 'WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzino';
var urlSmaltiscoProdottoInMagazzinoV2 = urlProd + 'WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzinoV2';
var urlSmaltiscoProdottoInMagazzinoV3 = urlProd + 'WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzinoV3';
var urlQuantitaProdottiInMagazzino = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino';
var urlQuantitaProdottiInMagazzinoV2 = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoV2';
var urlGetProdottiSuCamion = urlProd + 'WebServiceAppDondi.asmx/GetProdottiInCamion';
var urlGetProdottiSuCamionByIdProdotto = urlProd + 'WebServiceAppDondi.asmx/GetProdottiInCamionByIdProdotto';
var urlStoricizzoProdTrasporto = urlProd + 'WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto';
var urlStoricizzoProdTrasportoV2 = urlProd + 'WebServiceAppDondi.asmx/StoricizzoProdottoInTrasportoV2';
var urlAggiornaQuantInTrasporto = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto';
var urlAggiornaQuantInTrasportoV2 = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasportoV2';
var urlGetSituazioneClienti = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneCliente';
var urlGetSituazioneClientiV2 = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneClienteV2';
var urlAggiornaQuantitaProdottiVenduti = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti';
var urlAggiornaQuantitaProdottiInMagazzinoResi = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResi';
var urlAggiornaQuantitaProdottiInMagazzinoResiV2 = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResiV2';
var urlStoricizzoStatoProdottiInDistributore = urlProd + 'WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore';
var urlStoricizzoStatoProdottiInDistributore2 = urlProd + 'WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore2';
var urlAggiornaQuantitaProdottoInCliente = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInCliente';
var urlAggiornaQuantitaProdottoInClienteV2 = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInClienteV2';
var urlGetSituazioneDistributore = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneDistributore';
var urlGetSituazioneDistributoreV2 = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneDistributoreV2';
var urlAggiornoQuantitaProdottiInDistributore = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore';
var urlAggiornoQuantitaProdottiInDistributoreV2 = urlProd + 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributoreV2';
var urlAggiornaColoreProdottoInCliente = urlProd + 'WebServiceAppDondi.asmx/AggiornaColoreProdottoInCliente';
var urlAggiornaColoreProdottoInDistributore = urlProd + 'WebServiceAppDondi.asmx/AggiornaColoreProdottoInDistributore';
var urlStoricizzaStatoProdottoInCliente = urlProd + 'WebServiceAppDondi.asmx/StoricizzoStatoProdottoInCliente';
var urlStoricizzaStatoProdottoInClienteV2 = urlProd + 'WebServiceAppDondi.asmx/StoricizzoStatoProdottoInClienteV2';
var urlCaricaProdottiInMagazzino = urlProd + 'WebServiceAppDondi.asmx/CaricaProdottiInMagazzino';
var urlCaricaProdottiInMagazzinoV2 = urlProd + 'WebServiceAppDondi.asmx/CaricaProdottiInMagazzinoV2';
var urlGetSituazioneVendutoInCliente = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneVendutoInCliente';
var urlGetSituazioneVendutoInDistributore = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneVendutoInDistributore';
var urlGetSituazioneVendutoInDistributore2 = urlProd + 'WebServiceAppDondi.asmx/GetSituazioneVendutoInDistributore2';
var urlGetVendutoCliente = urlProd + 'WebServiceAppDondi.asmx/GetVendutoCliente';
var urlGetVendutoDirettamente = urlProd + 'WebServiceAppDondi.asmx/GetVendutoDirettamente';
var urlGetVendutoDistributori = urlProd + 'WebServiceAppDondi.asmx/GetVendutoDistributori';
var urlGetVendutoByIdProdotto = urlProd + 'WebServiceAppDondi.asmx/GetVendutoByIdProdotto';
var urlGetVendutoByIdDistributore = urlProd + 'WebServiceAppDondi.asmx/GetVendutoByIdDistributore';
var urlGetVendutoPerTuttiDistributori = urlProd + 'WebServiceAppDondi.asmx/GetVendutoPerTuttiDistributori';
var urlGetVendutoPerTuttiDistributoriStampa = urlProd + 'WebServiceAppDondi.asmx/GetVendutoPerTuttiDistributoriStampa';
var urlGetVendutoByIdCliente = urlProd + 'WebServiceAppDondi.asmx/GetVendutoByIdCliente';
var urlResetEvidenzaByCliente = urlProd + 'WebServiceAppDondi.asmx/ResetEvidenzaByCliente';
var urlResetEvidenzaByDistributore = urlProd + 'WebServiceAppDondi.asmx/ResetEvidenzaByDistributore';
var urlResetEvidenzaMagazzino = urlProd + 'WebServiceAppDondi.asmx/ResetEvidenzaMagazzino';
var urlCorrezioneVendita = urlProd + 'WebServiceAppDondi.asmx/CorrezioneVendita';
var urlGetMarkReport = urlProd + 'WebServiceAppDondi.asmx/GetMarkReport';
var urlFilterMarkReport = urlProd + 'WebServiceAppDondi.asmx/FiltraMarkReport';
var urlGetStoricoMagazzinoByIdProd = urlProd + 'WebServiceAppDondi.asmx/GetStoricoMagazzinoByIdProd';
var urlCorrezioneMagazzinoByIdProd = urlProd + 'WebServiceAppDondi.asmx/CorrezioneMagazzinoByIdProd';
var urldisplayNumeriLottoMagazzino = urlProd + 'WebServiceAppDondi.asmx/displyaNumeriLottoMagazzino';
var urldisplayNumeriLottoMagazzinoResi = urlProd + 'WebServiceAppDondi.asmx/displyaNumeriLottoMagazzinoResi';
var urldisplayNumeriLottoDistributore = urlProd + 'WebServiceAppDondi.asmx/displayNumeriLottoDistributore';
var urlGetProdottiInMagazzinoByIdProdNumLotto = urlProd + 'WebServiceAppDondi.asmx/GetProdottiInMagazzinoByIdProdNumLotto';
var urlAzzeraProdottoInMagazzinoResi = urlProd + 'WebServiceAppDondi.asmx/AzzeraProdottoInMagazzinoResi';

$(function () {    

    $(".leftPanel").load("Include/LeftPanel.html");
    
    //ElencoMezziPerDistributori();
    //ElencoMezziPerClienti();
    //ElencoMezziPerCaricareMerce();
    ElencoDistributori();
    ElencoClienti();        

    $("#btn-submit").click(function () {

        var email = $("#txt-email").val();
        var password = $("#txt-password").val();

        Autenticazione(email, password);

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
        formatedDate = formatedDate.getDate() + '-' + (1 + formatedDate.getMonth()) + '-' + formatedDate.getFullYear();
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
   
    return (date + "-" + mon + "-" + year);
};

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
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetElencoClienti,
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

            var clienti = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il Cliente..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                
                clienti = clienti + '<li><a href="javascript:GetSituazioneCliente(' + risultati[i].idCliente + ', ' + desc + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r nomeCliente" >' + risultati[i].descrizione + '</a></li>';
                //$("#" + risultati[i]).show();
            }
            clienti = clienti + '</ul>';

            $("#tuttiClienti").html(clienti);

            //console.log(clienti);

            //$(".caricaDaCamion").on('click', function () {

            //    var idCliente = $(this).attr('data-idCliente');
            //    var descCliente = $(this).attr('data-descCliente');
            //    var idDistributore = $(this).attr('data-IdDistributore');
            //    var descDistributore = $(this).attr('data-descDistributore');
            //    $("#titoloProdottiInCamion").html('Elenco prodotti su:' + descMezzo);
            //    $(".descDistributore").html('Carica per:' + descDistributore);
            //    var desc = '\'' + descDistributore + '\'';
            //    var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
            //    $(".backDistributore").attr("href", linkBack);

            //    ElencoProdottiSuCamion(idCliente, idDistributore);
            //});

            //console.log(risultati);

        }

    });
}

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

// Aggiorno quantita Prodotti rimasti in magazzino *********************************
function AggiornaQuantitaProdottiInMagazzino(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT, note) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino",
        url: urlQuantitaProdottiInMagazzino,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, numeroDDT: numeroDDT, dataDDT: dataDDT, note: note }),
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

            //console.log(risultati);

        }

    });
}
// *********************************************************************************

//Inserisco la quantita di Prodotti Venduti
function AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, DataDDT, numeroLotto, dataScadenza, codiceLotto) {
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

        }

    });
}
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
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlAggiornaColoreProdottoInCliente,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idCliente: idCliente, idProdotto: idProdotto, colore: colore }),
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
}

function AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, colore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlAggiornaColoreProdottoInDistributore,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto, colore: colore }),
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
}

function CorrezioneVendita(idVendita) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlCorrezioneVendita,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idVendita: idVendita}),
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
}

function CorrezioneMagazzinoByIdProd(idMagazzino, idProdotto) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlCorrezioneMagazzinoByIdProd,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idMagazzino: idMagazzino, idProdotto: idProdotto }),
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
}