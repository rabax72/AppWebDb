$(function () {
   
});

function GetElencoDistributori() {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM distributori order by citta, ordine", [], elencoDistributori);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function elencoDistributori(transaction, results) {
   
    var i;
    //Iterate through the results
    //var text = '{ "distributori" : [';
    //for (i = 0; i < results.rows.length; i++) {
    //    //Get the current row
    //    var row = results.rows.item(i);


    //    text = text + '{ "idDistributore":"' + row.IdDistributore + '" , "sigla":"' + row.Sigla + '", "descrizione":"' + row.Descrizione + '", "indirizzo":"' + row.Indirizzo + '", "codGettoniera":"' + row.CodGettoniera + '", "Latitudine":"' + row.Latitudine + '", "Longitudine":"' + row.Longitudine + '", "dataInserimento":"' + row.DataInserimento + '", "Citta":"' + row.Citta + '", "ordine":"' + row.Ordine + '" },';
    //    if (i == results.rows.length - 1) {
    //        text = text + '{ "idDistributore":"' + row.IdDistributore + '" , "sigla":"' + row.Sigla + '", "descrizione":"' + row.Descrizione + '", "indirizzo":"' + row.Indirizzo + '", "codGettoniera":"' + row.CodGettoniera + '", "Latitudine":"' + row.Latitudine + '", "Longitudine":"' + row.Longitudine + '", "dataInserimento":"' + row.DataInserimento + '", "Citta":"' + row.Citta + '", "ordine":"' + row.Ordine + '" } ]}';
    //    }

    //    //listholder.innerHTML += "<li>" + row.Descrizione + " - " + row.Indirizzo + " (<a href='javascript:void(0);' onclick='deleteCar(" + row.IdDistributore + ");'>Delete Car</a>)";
    //}
    //var obj = JSON.parse(text);
    ////console.log(obj);
    //return obj;

    var distributori = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
    var Citta = '';
    var CittaOld = '';
    for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        Citta = row.Citta;
        var indirizzo = row.Indirizzo;
        var desc = row.Descrizione;
        desc = desc.replace("'", "\\'");
        desc = '\'' + desc + '\'';

        if (Citta != CittaOld) {
            distributori = distributori + '<li data-role="list-divider">' + Citta + '</li>';
        }

        distributori = distributori + '<li class="Blu"><a href="javascript:GetSituazioneDistributore(' + row.IdDistributore + ', ' + desc + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r nomeDistributore" >' + row.Descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';

        CittaOld = row.Citta;
    }
    distributori = distributori + '</ul>';
    
    $("#tuttiDistributori").html(distributori);
}





        