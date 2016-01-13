$(function () {
    
    //$("#ResiDataDa").datepicker({
    //    dateFormat: "dd-mm-yy"
    //});
    //$("#ResiDataA").datepicker({
    //    dateFormat: "dd-mm-yy"
    //});

    //$(".filtraResi").on('click', function () {
    //    var dataDa = $("#ResiDataDa").val();
    //    if (dataDa != '') {
    //        dataDa = stringToDate(dataDa, "dd-MM-yyyy", "-");
    //    } else {
    //        dataDa = stringToDate("01-01-2000", "dd-MM-yyyy", "-");
    //    }

    //    var dataA = $("#ResiDataA").val();
    //    if (dataA != '') {
    //        dataA = stringToDate(dataA, "dd-MM-yyyy", "-");
    //    } else {
    //        dataA = stringToDate("01-01-2100", "dd-MM-yyyy", "-");
    //    }
    //    GetProdottiInMagazzinoResiFiltrato(dataDa, dataA);
    //});

});

function RiepilogoVenduto() {

    $('.DettRiepilogoVenduto').html('');
    location.hash = "RiepilogoVenduto";
}

function VenditaDiretta(DataDa, DataA) {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var where = "";
            var parameter = [];
            if (DataDa == "") {
                DataDa = null;
            }
            if (DataA == "") {
                DataA = null;
            }
            if (DataDa != null) {
                where = where + " and (venduto.DataRilevazione >= ?) ";
                parameter = [DataDa];
            }
            if (DataA != null) {
                where = where + " and (venduto.DataRilevazione <= ?) ";
                parameter = [DataA];
            }

            if (DataDa != null && DataA != null) {
                parameter = [DataDa, DataA];
            }
            var query = "SELECT   venduto.IdVendita, prodotti.Descrizione AS DescProdotto, prodotti.Foto, prodotti.Aliquota, venduto.numeroLotto, clienti.Descrizione AS DescCliente, distributori.Descrizione AS DescDistributore, " +
                        "venduto.Quantita, venduto.PrezzoTotale, venduto.DataRilevazione, venduto.numeroDDT, venduto.DataDDT, venduto.IdOperatore, operatori.Nome, operatori.Cognome " +
                        "FROM    venduto INNER JOIN " +
                        "operatori ON venduto.IdOperatore = operatori.IdOperatore INNER JOIN " +
                        "prodotti ON venduto.IdProdotto = prodotti.IdProdotto LEFT OUTER JOIN " +
                        "distributori ON venduto.IdDistributore = distributori.IdDistributore LEFT OUTER JOIN " +
                        "clienti ON venduto.IdCliente = clienti.IdCliente " +
                        "WHERE   (venduto.VenditaDiretta = 1) " + where + "ORDER BY prodotti.ordine, venduto.numeroLotto";
            t.executeSql(query, parameter, function (transaction, results) {

            var dettaglio = '<div>' +
                                'Data Da <input type="text" id="ProdottiVendutiDirettamenteDataDa" class="calendario" data-theme="a" /> Data A <input type="text" id="ProdottiVendutiDirettamenteDataA" class="calendario" data-theme="a" /> <button id="filtraProdottiVendutiDirettamente" value="Filtra" class="filtraProdottiVendutiDirettamente">Filtra</button>' +
                            '</div><table id="tabellaProdottiVendutiDirettamente" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            //'<th>Prezzo Tot.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            var dataDdt = '';
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                //if (risultati[i].dataDDT != '/Date(-62135596800000)/') {
                //    dataDdt = parseJsonDateLettura(risultati[i].dataDDT);
                //}
                //else {
                //    dataDdt = '';
                //}
                dataDdt = row.DataDDT;
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                dettaglio = dettaglio + '<td>' + row.DescProdotto + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + row.Quantita + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + dataDdt + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DataRilevazione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + row.Nome + ' ' + row.Cognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + row.PrezzoTotale;
                totaleQuantita = totaleQuantita + row.Quantita;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            //'<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + ' €</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' + 
                                            '<th>Data Ril.</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiVendutiDirettamente').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraProdottiVendutiDirettamente').click(function () {
                //var DataDa = stringToDate($('#ProdottiVendutiDirettamenteDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDatePerDataA($('#ProdottiVendutiDirettamenteDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#ProdottiVendutiDirettamenteDataDa').val();
                var DataA = stringPerDataA($('#ProdottiVendutiDirettamenteDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VenditaDiretta(DataDa, DataA);
            });


            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

//function VenditaDiretta(DataDa, DataA) {
    
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",                
//        url: urlGetVendutoDirettamente,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati);


//            var dettaglio = '<div>' +
//                                'Data Da <input type="text" id="ProdottiVendutiDirettamenteDataDa" class="calendario" data-theme="a" /> Data A <input type="text" id="ProdottiVendutiDirettamenteDataA" class="calendario" data-theme="a" /> <button id="filtraProdottiVendutiDirettamente" value="Filtra" class="filtraProdottiVendutiDirettamente">Filtra</button>' +
//                            '</div><table id="tabellaProdottiVendutiDirettamente" class="display" cellspacing="0" width="100%">' +
//                                    '<thead>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Quantità</th>' +
//                                            //'<th>Prezzo Tot.</th>' +
//                                            //'<th>N° DDT</th>' +
//                                            //'<th>Data DDT</th>' +
//                                            '<th>Data Ril.</th>' + 
//                                            '<th>Operatore</th>' +                                            
//                                        '</tr>' +
//                                    '</thead>' +                                    
//                                    '<tbody>';
//            var prezzoTot = 0;
//            var totaleQuantita = 0;
//            var dataDdt = '';
//            for (var i = 0; i < risultati.length; i++) {
//                if (risultati[i].dataDDT != '/Date(-62135596800000)/') {
//                    dataDdt = parseJsonDateLettura(risultati[i].dataDDT);
//                }
//                else {
//                    dataDdt = '';
//                }
//                dettaglio = dettaglio + '<tr>';
//                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
//                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
//                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + dataDdt + '</td>';
//                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
//                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
//                dettaglio = dettaglio + '</tr>';
//                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
//                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
//            }
//            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
//                                            //'<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + ' €</th>' +
//                                            //'<th>N° DDT</th>' +
//                                            //'<th>Data DDT</th>' + 
//                                            '<th>Data Ril.</th>' +
//                                            '<th>Operatore</th>' +
//                                        '</tr>' +
//                                    '</tfoot>' + ' </table>';

//            //console.log(dettaglio);

//            $('.DettRiepilogoVenduto').html(dettaglio);

//            $(".dataDDT").datepicker({
//                dateFormat: "dd-mm-yy"
//            });

//            $(".calendario").datepicker({
//                dateFormat: "dd-mm-yy"
//            });

//            var table = $('#tabellaProdottiVendutiDirettamente').DataTable(
//                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
//            );

//            $('.filtraProdottiVendutiDirettamente').click(function () {
//                //var DataDa = stringToDate($('#ProdottiVendutiDirettamenteDataDa').val(), "dd-MM-yyyy", "-");
//                //var DataA = stringToDatePerDataA($('#ProdottiVendutiDirettamenteDataA').val(), "dd-MM-yyyy", "-");
//                var DataDa = $('#ProdottiVendutiDirettamenteDataDa').val();
//                var DataA = stringPerDataA($('#ProdottiVendutiDirettamenteDataA').val(), "dd-MM-yyyy", "-");
//                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
//                VenditaDiretta(DataDa, DataA);
//            });
            
            
//        }
//    });
    
//}

function VendutoPerProdotto() {
    // location.hash = "VenditaDiretta";

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "SELECT  prodotti.IdProdotto, prodotti.Descrizione, prodotti.Foto, prodotti.Prezzo, prodotti.Aliquota " +
                        "FROM   prodotti INNER JOIN " +
                        "venduto ON prodotti.IdProdotto = venduto.IdProdotto " +
                        "WHERE  (prodotti.cancellato = 0) " +
                        "GROUP BY prodotti.IdProdotto, prodotti.Descrizione, prodotti.Foto, prodotti.Prezzo, prodotti.Aliquota " +
                        "ORDER BY prodotti.ordine";
            t.executeSql(query, [], function (transaction, results) {

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdotti" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Dettaglio</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Dettaglio</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                var desc = row.Descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                //var numLotto = parseJsonDateLettura(row.numeroLotto);
                //numLotto = '\'' + numLotto + '\'';
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdotto(' + row.IdProdotto + ', null, ' + desc + ', null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + row.Descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + row.Prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + row.Aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande"><a href="javascript:GetVendutoByIdProdotto(' + row.IdProdotto + ', null, ' + desc + ', null, null);">Dettaglio</a></td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdotti').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

function VendutoPerProdottoLotto() {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoProdottiVendutiPerLotto,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdottiPerLotto" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Data Scadenza</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Data Scadenza</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                var numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                numLotto = '\'' + numLotto + '\'';
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdotto(' + risultati[i].idProdotto + ', ' + numLotto + ', ' + desc + ', null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdottiPerLotto').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

        }
    });

}

function GetVendutoByIdProdotto(idProdotto, numeroLotto, descrizione, DataDa, DataA) {
    // location.hash = "VenditaDiretta";

    //if (numeroLotto != null) {
    //    numeroLotto = stringToDate(numeroLotto, "dd/MM/yyyy", "/");
    //}

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var where = "";
            var parameter = [idProdotto];
            if (numeroLotto == "") {
                numeroLotto = null;
            }
            if (DataDa == "") {
                DataDa = null;
            }
            if (DataA == "") {
                DataA = null;
            }
            if (numeroLotto != null) {
                where = where + " and venduto.numeroLotto = ? ";
                parameter = [idProdotto, numeroLotto];
            }

            if (DataDa != null) {
                where = where + " and (venduto.DataRilevazione >= ?) ";
                parameter = [idProdotto, DataDa];
            }
            if (numeroLotto != null && DataDa != null) {
                parameter = [idProdotto, numeroLotto, DataDa];
            }

            if (DataA != null) {
                where = where + " and (venduto.DataRilevazione <= ?) ";
                parameter = [idProdotto, DataA];
            }

            if (numeroLotto != null && DataA != null) {
                parameter = [idProdotto, numeroLotto, DataA];
            }

            if (DataDa != null && DataA != null) {
                parameter = [idProdotto, DataDa, DataA];
            }

            if (numeroLotto != null && DataDa != null && DataA != null) {
                parameter = [idProdotto, numeroLotto, DataDa, DataA];
            }
            var query = "SELECT   venduto.IdVendita, prodotti.Descrizione AS DescProdotto, prodotti.Foto, prodotti.Aliquota, venduto.numeroLotto, clienti.Descrizione AS DescCliente, distributori.Descrizione AS DescDistributore, " +
                        "venduto.Quantita, venduto.PrezzoTotale, venduto.DataRilevazione, venduto.numeroDDT, venduto.DataDDT, venduto.IdOperatore, operatori.Nome, operatori.Cognome," +
                        "venduto.IdCliente, venduto.IdDistributore " +
                        "FROM    venduto INNER JOIN " +
                        "operatori ON venduto.IdOperatore = operatori.IdOperatore INNER JOIN " +
                        "prodotti ON venduto.IdProdotto = prodotti.IdProdotto LEFT OUTER JOIN " +
                        "distributori ON venduto.IdDistributore = distributori.IdDistributore LEFT OUTER JOIN " +
                        "clienti ON venduto.IdCliente = clienti.IdCliente " +
                        "WHERE   (prodotti.IdProdotto = ?) " + where + " ORDER BY prodotti.ordine";
            t.executeSql(query, parameter, function (transaction, results) {

            var dettaglio = '<h1>Filtro per: ' + descrizione + '</h1>' + '<div>' +
                                'Data Da <input type="text" id="VendutiByIdProdottoDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdProdottoDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdProdotto" value="Filtra" class="filtraVendutiByIdProdotto">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdProdotto" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            //'<th>Prezzo Tot.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            //'<th>Cliente</th>' +
                                            '<th>Data Ril.</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                dettaglio = dettaglio + '<td>' + row.DescProdotto + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + row.Quantita + '</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + row.prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(row.dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DescDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + row.descrizioneCliente + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + row.operatoreNome + ' ' + row.operatoreCognome + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DataRilevazione + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + row.PrezzoTotale;
                totaleQuantita = totaleQuantita + row.Quantita;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale:<br>' + totaleQuantita + '</th>' +
                                            //'<th>Totale:<br>' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Data Ril.</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdProdotto').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraVendutiByIdProdotto').click(function () {
                
                //var DataDa = $('#VendutiByIdProdottoDataDa').val();
                //var DataA = stringPerDataA($('#VendutiByIdProdottoDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = stringPerDataAmericana($('#VendutiByIdProdottoDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataAmericanaPiUno($('#VendutiByIdProdottoDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdProdotto(idProdotto, numeroLotto, descrizione, DataDa, DataA);
            });

            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

//function GetVendutoByIdProdotto(idProdotto, numeroLotto, descrizione, DataDa, DataA) {
//    // location.hash = "VenditaDiretta";
    
//    if (numeroLotto != null) {
//        numeroLotto = stringToDate(numeroLotto, "dd/MM/yyyy", "/");
//    }
    
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetVendutoByIdProdotto,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ idProdotto: idProdotto, numeroLotto:numeroLotto, DataDa: DataDa, DataA: DataA }),
//        error: function (data) {
//            console.log(data.responseText);
//            $('.DettRiepilogoVenduto').html(data.responseText);
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            console.log(risultati);

//            var dettaglio = '<h1>Filtro per: ' + descrizione + '</h1>' + '<div>' +
//                                'Data Da <input type="text" id="VendutiByIdProdottoDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdProdottoDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdProdotto" value="Filtra" class="filtraVendutiByIdProdotto">Filtra</button>' +
//                            '</div><table id="tabellaVendutiByIdProdotto" class="display" cellspacing="0" width="100%">' +
//                                    '<thead>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Quantità</th>' +
//                                            //'<th>Prezzo Tot.</th>' +
//                                            //'<th>N° DDT</th>' +
//                                            //'<th>Data DDT</th>' +
//                                            '<th>Distributore</th>' +
//                                            //'<th>Cliente</th>' +
//                                            '<th>Data Ril.</th>' +
//                                        '</tr>' +
//                                    '</thead>' +                                    
//                                    '<tbody>';
//            var prezzoTot = 0;
//            var totaleQuantita = 0;
//            for (var i = 0; i < risultati.length; i++) {

//                dettaglio = dettaglio + '<tr>';
//                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
//                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
//                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
//                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].prezzoTotale + ' €</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
//                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
//                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
//                dettaglio = dettaglio + '</tr>';
//                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
//                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
//            }
//            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Totale:<br>' + totaleQuantita + '</th>' +
//                                            //'<th>Totale:<br>' + Number(prezzoTot).toFixed(2) + '€</th>' +
//                                            //'<th>N° DDT</th>' +
//                                            //'<th>Data DDT</th>' +
//                                            '<th>Distributore</th>' +
//                                            '<th>Data Ril.</th>' +
//                                        '</tr>' +
//                                    '</tfoot>' + ' </table>';

//            //console.log(dettaglio);

//            $('.DettRiepilogoVenduto').html(dettaglio);

//            $(".dataDDT").datepicker({
//                dateFormat: "dd-mm-yy"
//            });

//            $(".calendario").datepicker({
//                dateFormat: "dd-mm-yy"
//            });

//            var table = $('#tabellaVendutiByIdProdotto').DataTable(
//                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
//            );
            
//            $('.filtraVendutiByIdProdotto').click(function () {
//                //var DataDa = stringToDate($('#VendutiByIdProdottoDataDa').val(), "dd-MM-yyyy", "-");
//                //var DataA = stringToDatePerDataA($('#VendutiByIdProdottoDataA').val(), "dd-MM-yyyy", "-");
//                var DataDa = $('#VendutiByIdProdottoDataDa').val();
//                var DataA = stringPerDataA($('#VendutiByIdProdottoDataA').val(), "dd-MM-yyyy", "-");
//                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
//                GetVendutoByIdProdotto(idProdotto, numeroLotto, descrizione, DataDa, DataA);
//            });

//        }
//    });

//}

function VendutoPerTuttiDistributori(DataDa, DataA) {
    // location.hash = "VenditaDiretta";

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var where = " WHERE   (venduto.VenditaDiretta = 0) AND (venduto.IdDistributore > 0) ";
            var parameter = [];
            if (DataDa == "") {
                DataDa = null;
            }
            if (DataA == "") {
                DataA = null;
            }
            if (DataDa != null) {
                where = where + " and (venduto.DataRilevazione >= ?) ";
                parameter = [DataDa];
            }
            if (DataA != null) {
                where = where + " and (venduto.DataRilevazione <= ?) ";
                parameter = [DataA];
            }

            if (DataDa != null && DataA != null) {
                parameter = [DataDa, DataA];
            }

            var query = "SELECT   venduto.IdVendita, prodotti.Descrizione AS DescProdotto, prodotti.Foto, prodotti.Aliquota, venduto.numeroLotto, clienti.Descrizione AS DescCliente, distributori.Descrizione AS DescDistributore, " +
                                "venduto.Quantita, venduto.PrezzoTotale, venduto.DataRilevazione, venduto.numeroDDT, venduto.DataDDT, venduto.IdOperatore, operatori.Nome, operatori.Cognome " +
                                "FROM    venduto INNER JOIN " +
                                "operatori ON venduto.IdOperatore = operatori.IdOperatore INNER JOIN " +
                                "prodotti ON venduto.IdProdotto = prodotti.IdProdotto LEFT OUTER JOIN " +
                                "distributori ON venduto.IdDistributore = distributori.IdDistributore LEFT OUTER JOIN " +
                                "clienti ON venduto.IdCliente = clienti.IdCliente " + where + " ORDER BY prodotti.ordine, venduto.numeroLotto ";

            t.executeSql(query, parameter, function (transaction, results) {

            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributore" value="Filtra" class="filtraVendutoPerTuttiDitributori">Filtra</button>' +
                            '</div><table id="tabellaVendutoPerTuttiDitributori" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            //'<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                dettaglio = dettaglio + '<td>' + row.DescProdotto + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + row.Quantita + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DataRilevazione + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(row.dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DescDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.Nome + ' ' + row.Cognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + row.PrezzoTotale;
                totaleQuantita = totaleQuantita + row.Quantita;
            }


            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            //'<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Venduto Mark: </th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutoPerTuttiDitributori').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraVendutoPerTuttiDitributori').click(function () {
                //var DataDa = stringToDate($('#VendutoPerTuttiDitributoriDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDatePerDataA($('#VendutoPerTuttiDitributoriDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = stringPerDataAmericana($('#VendutoPerTuttiDitributoriDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataAmericanaPiUno($('#VendutoPerTuttiDitributoriDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributori(DataDa, DataA);
            });

            }, errorHandler);
        

        });

    function errorHandler(transaction, error) {
        console.log("Error : " + error.message);
    }

} else {
    alert("db not found, your browser does not support web sql!");
}

}

//function VendutoPerTuttiDistributori(DataDa, DataA) {
//    // location.hash = "VenditaDiretta";

//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetVendutoPerTuttiDistributori,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
//                            '<div>' +
//                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributore" value="Filtra" class="filtraVendutoPerTuttiDitributori">Filtra</button>' +
//                            '</div><table id="tabellaVendutoPerTuttiDitributori" class="display" cellspacing="0" width="100%">' +
//                                    '<thead>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Quantità</th>' +
//                                            //'<th>Prezzo Tot.</th>' +
//                                            '<th>Data Ril.</th>' +
//                                            //'<th>N° DDT</th>' +
//                                            //'<th>Data DDT</th>' +
//                                            '<th>Distributore</th>' +
//                                            '<th>Operatore</th>' +
//                                        '</tr>' +
//                                    '</thead>' +
//                                    '<tbody>';
//            var prezzoTot = 0;
//            var totaleQuantita = 0;
//            for (var i = 0; i < risultati.length; i++) {

//                dettaglio = dettaglio + '<tr>';
//                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
//                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
//                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
//                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
//                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
//                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
//                dettaglio = dettaglio + '</tr>';
//                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
//                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
//            }

           
//            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
//                                            //'<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
//                                            '<th>Venduto Mark: </th>' +
//                                            //'<th>Data DDT</th>' +
//                                            '<th>Distributore</th>' +
//                                            '<th>Operatore</th>' +
//                                        '</tr>' +
//                                    '</tfoot>' + ' </table>';

//            //console.log(dettaglio);

//            $('.DettRiepilogoVenduto').html(dettaglio);

//            $(".dataDDT").datepicker({
//                dateFormat: "dd-mm-yy"
//            });

//            $(".calendario").datepicker({
//                dateFormat: "dd-mm-yy"
//            });

//            var table = $('#tabellaVendutoPerTuttiDitributori').DataTable(
//                {
//                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
//                }
//            );

//            $('.filtraVendutoPerTuttiDitributori').click(function () {
//                //var DataDa = stringToDate($('#VendutoPerTuttiDitributoriDataDa').val(), "dd-MM-yyyy", "-");
//                //var DataA = stringToDatePerDataA($('#VendutoPerTuttiDitributoriDataA').val(), "dd-MM-yyyy", "-");
//                var DataDa = $('#VendutoPerTuttiDitributoriDataDa').val();
//                var DataA = stringPerDataA($('#VendutoPerTuttiDitributoriDataA').val(), "dd-MM-yyyy", "-");
//                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
//                VendutoPerTuttiDistributori(DataDa, DataA);
//            });

//        }
//    });

//}

function VendutoPerTuttiDistributoriStampa(DataDa, DataA) {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoPerTuttiDistributoriStampa,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log(risultati);
            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriStampaDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriStampaDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributoreStampa" value="Filtra" class="filtraVendutoPerTuttiDitributoriStampa">Filtra</button>' +
                            '</div><table id="tabellaVendutoPerTuttiDitributoriStampa" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th width ="40%">Distributore</th>' +                                            
                                            '<th width ="40%">Venduto Tot.</th>' +
                                            '<th width ="20%">Data Ril.</th>' +                                           
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totalePerDist= 0;
            var descrizioneOld = "";
            var k = 0;
            var rigaDettaglio = new Array();
            var sommaTotali = 0;
            for (var i = 0; i < risultati.length; i++) {
                //totalePerDist = risultati[i].prezzoTotale;
                sommaTotali = sommaTotali + risultati[i].prezzoTotale;
                //console.log(risultati[i]);
                if (descrizioneOld != risultati[i].descrizione) {
                    rigaDettaglio[i] = '';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(risultati[i].prezzoTotale).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    prezzoTot = risultati[i].prezzoTotale;
                } else {
                    rigaDettaglio[i - 1] = '';
                    prezzoTot = (parseFloat(prezzoTot) + parseFloat(risultati[i].prezzoTotale));
                    rigaDettaglio[i] = '';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';                    
                }
                //var riga = rigaDettaglio[i];
                descrizioneOld = risultati[i].descrizione;
                           
            }

            //console.log(dettaglio);

            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                         '<tr>' +
                                             '<th>Distributore</th>' +
                                             '<th>Totale Venduto:<br>' + Number(sommaTotali).toFixed(2) + '€</th>' +
                                             //'<th>Venduto Mark: </th>' +                                            
                                             '<th>Data Ril.</th>' +
                                         '</tr>' +
                                     '</tfoot>' + ' </table>';

            $('.DettRiepilogoVenduto').html(dettaglio);            

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutoPerTuttiDitributoriStampa').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraVendutoPerTuttiDitributoriStampa').click(function () {
                //var DataDa = stringToDate($('#VendutoPerTuttiDitributoriStampaDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDatePerDataA($('#VendutoPerTuttiDitributoriStampaDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#VendutoPerTuttiDitributoriStampaDataDa').val();
                var DataA = stringPerDataA($('#VendutoPerTuttiDitributoriStampaDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributoriStampa(DataDa, DataA);
            });

        }
    });

}

function VendutoPerDistributore() {
    // location.hash = "VenditaDiretta";

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            
            t.executeSql("SELECT DISTINCT venduto.IdDistributore, distributori.Descrizione, distributori.Indirizzo, distributori.Citta " +
                                "FROM  venduto INNER JOIN " +
                                "      distributori ON venduto.IdDistributore = distributori.IdDistributore " +
                                "WHERE (venduto.VenditaDiretta = 0) " +
                                "ORDER BY distributori.ordine", [], function (transaction, results) {

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per Distributore:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
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
                    dettaglio = dettaglio + '<li data-role="list-divider" class="ui-li-divider">' + Citta + '</li>';
                }

                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdDistributore(' + row.IdDistributore + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + row.Descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
                CittaOld = row.Citta;
            }
            dettaglio = dettaglio + '</ul>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            }, errorHandler);
        
        });

    function errorHandler(transaction, error) {
        console.log("Error : " + error.message);
    }

} else {
    alert("db not found, your browser does not support web sql!");
}

}

function GetVendutoByIdDistributore(idDistributore, descrizione, DataDa, DataA) {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var where = " WHERE   (venduto.VenditaDiretta = 0) AND (venduto.IdDistributore = ?) ";
            var parameters = [idDistributore];

            if (DataDa == "") {
                DataDa = null;
            }
            if (DataA == "") {
                DataA = null;
            }

            if (DataDa != null) {
                where = where + " and (venduto.DataRilevazione >= ?)";
                parameters = [idDistributore, DataDa];
            }

            if (DataA != null) {
                where = where + " and (venduto.DataRilevazione <= ?)";
                parameters = [idDistributore, DataA];
            }
            if (DataDa != null && DataA != null) {
                parameters = [idDistributore, DataDa, DataA];
            }

            var query = "SELECT   venduto.IdVendita, prodotti.Descrizione AS DescProdotto, prodotti.Foto, prodotti.Aliquota, venduto.numeroLotto, clienti.Descrizione AS DescCliente, distributori.Descrizione AS DescDistributore, " +
                        "venduto.Quantita, venduto.PrezzoTotale, venduto.DataRilevazione, venduto.numeroDDT, venduto.DataDDT, venduto.IdOperatore, operatori.Nome, operatori.Cognome, " +
                        "venduto.dataScadenza, venduto.codicelotto " +
                        "FROM    venduto INNER JOIN " +
                        "operatori ON venduto.IdOperatore = operatori.IdOperatore INNER JOIN " +
                        "prodotti ON venduto.IdProdotto = prodotti.IdProdotto LEFT OUTER JOIN " +
                        "distributori ON venduto.IdDistributore = distributori.IdDistributore LEFT OUTER JOIN " +
                        "clienti ON venduto.IdCliente = clienti.IdCliente " + where + " ORDER BY prodotti.ordine, venduto.datascadenza desc";

            t.executeSql(query, parameters, function (transaction, results) {

            var dettaglio = '<h1>Riepilogo Venduto per Distributore: ' + descrizione + '</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoDitributoreDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoDitributoreDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributore" value="Filtra" class="filtraVendutoDitributore">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdDistributore" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            //'<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                dettaglio = dettaglio + '<td>' + row.DescProdotto + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + row.Quantita + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DataRilevazione + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + row.numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(row.dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.DescDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + row.Nome + ' ' + row.Cognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + row.PrezzoTotale;
                totaleQuantita = totaleQuantita + row.Quantita;
            }

          
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            //'<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdDistributore').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraVendutoDitributore').click(function () {
               
                //var DataDa = $('#VendutoDitributoreDataDa').val();
                //var DataA = stringPerDataA($('#VendutoDitributoreDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = stringPerDataAmericana($('#VendutoDitributoreDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataAmericanaPiUno($('#VendutoDitributoreDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdDistributore(idDistributore, descrizione, DataDa, DataA);
            });

            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

function VendutoPerCliente() {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "SELECT DISTINCT venduto.IdCliente, clienti.Descrizione, clienti.Indirizzo " +
                        "FROM  venduto INNER JOIN " +
                        "clienti ON venduto.IdCliente = clienti.IdCliente " +
                        "WHERE (venduto.VenditaDiretta = 0) " +
                        "ORDER BY venduto.DataRilevazione DESC";
            t.executeSql(query, [], function (transaction, results) {

            var dettaglio = '<h1>Filtra per Cliente:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                var indirizzo = row.Indirizzo;
                var desc = row.Descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdCliente(' + row.IdCliente + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + row.Descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
            }
            dettaglio = dettaglio + '</ul>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

function GetVendutoByIdCliente(idCliente, descrizione, DataDa, DataA) {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdCliente,
        cache: false,
        async: true,
        data: JSON.stringify({ idCliente: idCliente, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //var cliente = GetClienteById(idCliente);

            var dettaglio = '<h1>Filtro per Cliente: ' + descrizione + '</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutiByIdClienteDataDa" class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdClienteDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdCliente" value="Filtra" class="filtraVendutiByIdCliente">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdCliente" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            //'<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            //'<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            //'<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            //'<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdCliente').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraVendutiByIdCliente').click(function () {
                //var DataDa = stringToDate($('#VendutiByIdClienteDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDatePerDataA($('#VendutiByIdClienteDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#VendutiByIdClienteDataDa').val();
                var DataA = stringPerDataA($('#VendutiByIdClienteDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                var desc = descrizione;
                //desc = desc.replace("'", "\\'");
                //desc = '\'' + desc + '\'';
                GetVendutoByIdCliente(idCliente, desc, DataDa, DataA);
            });

        }
    });

}

function displayNumeriLottoMagazzinoResi(idProdotto, quantitaAggiornata) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var where = "";
            var parameter = [];
            if (idProdotto > 0) {
                where = " AND magazzinoresi.idprodotto = ? ";
                parameter = [idProdotto];
            }
            var query = "SELECT DISTINCT prodotti.idprodotto, prodotti.descrizione, magazzinoresi.numerolotto, " +
                              " magazzinoresi.quantita, " +
                              "  magazzinoresi.id, prodotti.prezzo, magazzinoresi.codicelotto, magazzinoresi.datascadenza " +
                        "FROM prodotti " +
                        "LEFT OUTER JOIN magazzinoresi ON prodotti.idprodotto = magazzinoresi.idprodotto " +
                        "WHERE magazzinoresi.modificato =0 " + where + " ORDER BY prodotti.ordine, prodotti.descrizione, magazzinoresi.datascadenza";
            
            t.executeSql(query, parameter, function (transaction, results) {
            
            var idProd = 0;
            var idProdottoOld = 0;
            var numeroLotto = '';
            var numeroLottoOld = '';
            var quantitaLotto = 0;
            var lotti = '';
            var dataScadenza = '';
            var dataScadenzaOld = '';
            var rigaDettaglio = new Array();
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                if (idProdotto == 0 && quantitaAggiornata == 0) {

                    $('.lottoMagResi' + row.IdProdotto).remove();
                }
                numeroLotto = dataItaliana(row.NumeroLotto);
                dataScadenza = dataItaliana(row.DataScadenza);
                idProd = row.IdProdotto;

                if (dataScadenza == dataScadenzaOld && idProd == idProdottoOld) {
                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                        numeroLotto = row.codiceLotto;
                    }
                    quantitaLotto = (parseInt(quantitaLotto) + parseInt(row.Quantita));
                    //$('.descrizione' + row.idProdotto).append('<div class="miniFont lottoMagResi' + row.idProdotto + '">' + quantitaLotto + ' - ' + parseJsonDateLettura(row.numeroLotto)+ '</div>');
                    rigaDettaglio[i - 1] = '';
                    rigaDettaglio[i] = '<div class="miniFont lottoMagResi' + row.IdProdotto + '">' + quantitaLotto + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                } else {
                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                        numeroLotto = row.codiceLotto;
                    }
                    if (idProd != idProdottoOld) {
                        $('.lottoMagResi' + row.IdProdotto).remove();
                    }
                    quantitaLotto = row.Quantita;
                    //$('.descrizione' + row.idProdotto).append('<div class="miniFont lottoMagResi' + row.idProdotto + '">' + row.Quantita + ' - ' + parseJsonDateLettura(row.numeroLotto) + '</div>');
                    rigaDettaglio[i] = '<div class="miniFont lottoMagResi' + row.IdProdotto + '">' + row.Quantita + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                }
                numeroLottoOld = dataItaliana(row.NumeroLotto);
                dataScadenzaOld = dataItaliana(row.DataScadenza);
                idProdottoOld = row.IdProdotto;
            }
            idProdottoOld = 0;
            var idProdNew = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row2 = results.rows.item(i);
                idProdNew = row2.IdProdotto;
                if (i == 0) {
                    lotti = rigaDettaglio[i];
                }
                if (idProdNew != idProdottoOld) {
                    //lotti = lotti + rigaDettaglio[i];
                    if (idProdottoOld == 0) {
                        $('.descrizioneReso' + idProdNew).append(lotti);
                    }
                    $('.descrizioneReso' + idProdottoOld).append(lotti);
                    if (i > 0) {
                        lotti = '';
                        $('.lottoMagResi' + idProdNew).remove();
                    }

                }

                ////per far vedere i lotti nell'ultimo prodotto
                if (i == results.rows.length - 1) {
                    lotti = lotti + rigaDettaglio[i];
                    $('.descrizioneReso' + idProdNew).append(lotti);
                }

                if (i > 0) {
                    lotti = lotti + rigaDettaglio[i];
                }

                idProdottoOld = idProdNew;
            }

            //Se aggiorno solo un prodotto
            if (idProdotto != '') {
                $('.lottoMagResi' + idProdotto).remove();
                $('.descrizioneReso' + idProdotto).append(lotti);

            }


            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function GetProdottiInMagazzinoResi() {

    location.hash = "RiepilogoResi";

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "SELECT  prodotti.Descrizione, prodotti.Foto, magazzinoresi.IdProdotto, magazzinoresi.NumeroLotto, magazzinoresi.Quantita, prodotti.Prezzo, magazzinoresi.PrezzoTotale, magazzinoresi.Id, operatori.Nome, " +
                        "operatori.Cognome, prodotti.Aliquota, distributori.Descrizione AS DescDistributore, clienti.Descrizione AS DescCliente, magazzinoresi.DataInserimento " +
                        "FROM   magazzinoresi INNER JOIN " +
                        "prodotti ON magazzinoresi.IdProdotto = prodotti.IdProdotto INNER JOIN " +
                        "operatori ON magazzinoresi.IdOperatore = operatori.IdOperatore LEFT OUTER JOIN " +
                        "clienti ON magazzinoresi.IdCliente = clienti.IdCliente LEFT OUTER JOIN " +
                        "distributori ON magazzinoresi.IdDistributore = distributori.IdDistributore " +
                        "ORDER BY prodotti.ordine, magazzinoresi.numeroLotto";
            t.executeSql(query, [], function (transaction, results) {
             

            var dettaglio = '<table id="tabellaProdottiMagazzinoResi" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Totale perso</th>' +
                                            '<th>Svuota</th>' +
                                            //'<th>Cliente</th>' +
                                            //'<th>Data Reso</th>' +
                                            //'<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>';
            var idProd = '';
            var idProdOld = '';
            var numLotto = '';
            var numLottoOld = '';
            var rigaDettaglio = new Array();
            var quantita = 0;
            var quantitaOld = 0;
            var quantitaTot = 0;
            var prezzoTot = 0;
            var prezzoTotProd = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);

                idProd = row.IdProdotto;
                numLotto = row.NumeroLotto;
                //console.log(numLotto);
                quantita = row.Quantita;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    prezzoTotProd = row.PrezzoTotale;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + row.descrizione + ' (' + parseJsonDateLettura(row.NumeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="descrizioneReso' + row.IdProdotto + '">' + row.Descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + row.Quantita + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + row.PrezzoTotale + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Svuota</a></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {

                    rigaDettaglio[i - 1] = '';
                    quantitaTot = (quantitaTot + quantita);
                    prezzoTotProd = prezzoTotProd + row.PrezzoTotale;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="descrizioneReso' + row.IdProdotto + '">' + row.Descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTotProd).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Svuota</a></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                }
                idProdOld = row.IdProdotto;
                //numLottoOld = row.NumeroLotto;
                quantitaOld = row.Quantita;
                prezzoTot = prezzoTot + row.PrezzoTotale;
                totaleQuantita = totaleQuantita + row.Quantita;
            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < results.rows.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            //dettaglio = dettaglio + righe + '</tbody> </table>';
            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Perso: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Svuota</th>' +
                                            //'<th>Cliente</th>' +
                                            //'<th>Data Reso</th>' +
                                            //'<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            $('.DettRiepilogoResi').html(dettaglio);

            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

                if (results.rowsAffected > 0) {
                    displayNumeriLottoMagazzinoResi(0, 0);
                }

            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }
    
}

//function GetProdottiInMagazzinoResi() {

//    location.hash = "RiepilogoResi";

//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetProdottiInMagazzinoResi,
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

//            //console.log(risultati);

//            var dettaglio = '<table id="tabellaProdottiMagazzinoResi" class="display" cellspacing="0" width="100%">' +
//                                    '<thead>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Quantità</th>' +
//                                            '<th>Totale perso</th>' +
//                                            '<th>Svuota</th>' +
//                                            //'<th>Cliente</th>' +
//                                            //'<th>Data Reso</th>' +
//                                            //'<th>Operatore</th>' +
//                                        '</tr>' +
//                                    '</thead>';
//            var idProd = '';
//            var idProdOld = '';
//            var numLotto = '';
//            var numLottoOld = '';
//            var rigaDettaglio = new Array();
//            var quantita = 0;
//            var quantitaOld = 0;
//            var quantitaTot = 0;
//            var prezzoTot = 0;
//            var prezzoTotProd = 0;
//            var totaleQuantita = 0;
//            for (var i = 0; i < risultati.length; i++) {

//                idProd = risultati[i].idProdotto;
//                numLotto = risultati[i].numeroLotto;
//                //console.log(numLotto);
//                quantita = risultati[i].quantitaMagazzinoResi;
//                if (idProd != idProdOld) {
//                    quantitaTot = quantita;
//                    prezzoTotProd = risultati[i].prezzoTotale;
//                    rigaDettaglio[i] = '<tr>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="descrizioneReso' + risultati[i].idProdotto + '">' + risultati[i].descrizione + '</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzinoResi + '</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Svuota</a></td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

//                } else {
                   
//                    rigaDettaglio[i - 1] = '';
//                    quantitaTot = (quantitaTot + quantita);
//                    prezzoTotProd = prezzoTotProd + risultati[i].prezzoTotale;
//                    rigaDettaglio[i] = '<tr>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="descrizioneReso' + risultati[i].idProdotto + '">' + risultati[i].descrizione + '</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTotProd).toFixed(2) + ' €</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Svuota</a></td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
//                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
//                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                   
//                }
//                idProdOld = risultati[i].idProdotto;
//                //numLottoOld = risultati[i].numeroLotto;
//                quantitaOld = risultati[i].quantitaMagazzinoResi;
//                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
//                totaleQuantita = totaleQuantita + risultati[i].quantitaMagazzinoResi;
//            }
//            //dettaglio = dettaglio + '</tbody> </table>';
            
//            //console.log(dettaglio);
//            var righe = '';

//            for (var i = 0; i < risultati.length; i++) {
//                righe = righe + rigaDettaglio[i];
//            }

//            //dettaglio = dettaglio + righe + '</tbody> </table>';
//            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
//                                        '<tr>' +
//                                            '<th>Foto</th>' +
//                                            '<th>Desc.</th>' +
//                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
//                                            '<th>Totale Perso: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
//                                            '<th>Svuota</th>' +
//                                            //'<th>Cliente</th>' +
//                                            //'<th>Data Reso</th>' +
//                                            //'<th>Operatore</th>' +
//                                        '</tr>' +
//                                    '</tfoot>' + ' </table>';

//            $('.DettRiepilogoResi').html(dettaglio);            

//            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
//                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
//            );

//            displayNumeriLottoMagazzinoResi(0, 0);
//        }
//    });

//}

function GetProdottiInMagazzinoResiFiltrato(dataDa, dataA){   

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetProdottiInMagazzinoResiFiltrato,
        cache: false,
        async: true,
        data: JSON.stringify({ dataDa: dataDa, dataA: dataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<table id="tabellaProdottiMagazzinoResi" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Data Reso</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>';

            var idProd = '';
            var idProdOld = '';
            var numLotto = '';
            var numLottoOld = '';
            var rigaDettaglio = new Array();
            var quantita = 0;
            var quantitaOld = 0;
            var quantitaTot = 0;
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                //console.log(numLotto);
                quantita = risultati[i].quantitaVenduto;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }
                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaVenduto;
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            //dettaglio = dettaglio + righe + '</tbody> </table>';
            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            $('.DettRiepilogoResi').html(dettaglio);

            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );


        }
    });

}