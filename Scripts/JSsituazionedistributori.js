$(function () {

    

});

function GetSituazioneVendutoInDistributore(IdDistributore, idProd, obj, numeroLotto) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneVendutoInDistributore,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: IdDistributore, idProdotto: idProd, numeroLotto: numeroLotto }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText);
            //$("#tuttiDistributori").html(data.responseText);
            //alert(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;
            //console.log('Caricati!');
            //console.log(Ordinanze);
            //console.log(risultati);
            //$(".menuPrincipale").hide();
            //venduto = response.d;
           // alert(risultati);
            //obj.next('div').html(risultati.quantita);
            obj.closest('td').html(risultati.quantitaVenduto);

            //return risultati;

            //$("#tuttiDistributori").html(distributori);

        }

    });
}

function GetStoricoVendutoInDistributore(IdDistributore, idProd, numeroRecord, descDistributore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
            var query = "SELECT   IdProdotto, IdDistributore, Quantita, PrezzoTotale, DataRilevazione, IdOperatore, IdCliente, VenditaDiretta, numeroDDT, DataDDT, idVendita, numeroLotto," +
                               "(SELECT sum(quantita) " +
                        "FROM situazionedistributori " +
                        "WHERE iddistributore = ? " +
                        "AND idProdotto = ? " +
                        "AND modificato =0) as quantitaProdInDistributore, " +
                    "(Select prezzo from prodotti where idprodotto = ?) as prezzoProdotto, " +
                    "codicelotto, datascadenza " +
                        "FROM    venduto " +
                        "WHERE        (IdDistributore = ?) AND (IdProdotto = ?) " +
                        " ORDER BY DataRilevazione desc LIMIT ?";
            t.executeSql(query, [IdDistributore, idProd, idProd, IdDistributore, idProd, numeroRecord], function (transaction, results) {
             
            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td><td>Cancella</td></tr>';

            var righe = '';
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                righe = righe + '<tr>';
                righe = righe + '<td>' + row.DataRilevazione + '</td>';
                righe = righe + '<td>' + row.Quantita + '</td>';
                righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnCancella" data-idVendita="' + row.IdVendita + '" data-numeroLotto="' + row.NumeroLotto + '" data-idProdotto="' + row.IdProdotto + '" data-prezzoProdotto="' + row.prezzoProdotto + '" data-quantProdInDist="' + row.quantitaProdInDistributore + '" data-quantExVenduto="' + row.Quantita + '" data-codiceLotto="' + row.CodiceLotto + '" data-dataScadenza="' + row.DataScadenza + '">Cancella</a></td>';
                righe = righe + '</tr>';
            }

            storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

            var datiPopUpStorico = '<div style="padding:10px 20px;">';
            datiPopUpStorico = datiPopUpStorico + '<h2>Storico Venduto</h2>';
            datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
            datiPopUpStorico = datiPopUpStorico + '</div>';
            //console.log(datiPopUpStorico);
            $("#popUpStoricoVendutoDaDist").html(datiPopUpStorico);

            $(".btnCancella").on('click', function () {
                var idVendita = $(this).attr('data-idVendita');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzoProdotto = $(this).attr('data-prezzoProdotto');
                var quantProdInDist = $(this).attr('data-quantProdInDist');
                var quantExVenduto = $(this).attr('data-quantExVenduto');
                var idOperatore = localStorage.idOperatore;
                var quantitaRimasti = (parseInt(quantProdInDist) + parseInt(quantExVenduto));
                var prezzoTotaleRimasti = (quantitaRimasti * prezzoProdotto);
                var codiceLotto = $(this).attr('data-codiceLotto');
                var numeroLotto = $(this).attr('data-numeroLotto');

                var dataScadenza = $(this).attr('data-dataScadenza');
                if (dataScadenza == '') {
                    dataScadenza = '2015-01-01';
                } else {
                    dataScadenza = dataScadenza;
                }
                //dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');

                var prezzoTotaleDaCaricare = (quantExVenduto * prezzoProdotto);

                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);

                if (!confirm("Sicuro che vuoi cancellare " + quantExVenduto + " pezzi di questo prodotto?")) return;

                CorrezioneVendita(idVendita);
                //adeguare la funzione a quella sotto                             

                //StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantExVenduto, quantitaRimasti, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, null);
                InsertProdottiInDistributore(IdDistributore, idProdotto, quantExVenduto, quantitaRimasti, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                //setTimeout(GetSituazioneDistributore(IdDistributore, descDistributore), 3000);                                                 

                $("#popUpStoricoVendutoDaDist").popup("close");

                $("#popUpStoricoVendutoDaDist").bind({
                    popupafterclose: function (event, ui) {
                        //alert('chiuso');
                        //console.log(idProdotto);
                        $(".quantProdInDist-" + idProdotto).html(quantitaRimasti);
                    }
                });

                // GetStoricoVendutoInDistributore(IdDistributore, idProdotto, '', 10);
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

//function GetStoricoVendutoInDistributore(IdDistributore, idProd, numeroLotto, numeroRecord, descDistributore) {
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetSituazioneVendutoInDistributore2,
//        cache: false,
//        //jsonpCallback: 'risposta',
//        // jsonp: 'callback',
//        // dataType: "jsonp",            
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ idDistributore: IdDistributore, idProdotto: idProd, numeroLotto: numeroLotto, numeroRecord: numeroRecord }),
//        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
//        error: function (data) {
//            console.log(data.responseText);
//            //$("#tuttiDistributori").html(data.responseText);
//            alert(data.responseText);
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;
            
//            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td><td>Cancella</td></tr>';
            
//            var righe = '';
//            for (var i = 0; i < results.rows.length; i++) {
//                righe = righe + '<tr>';
//                righe = righe + '<td>' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
//                righe = righe + '<td>' + risultati[i].quantitaVenduto + '</td>';
//                righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnCancella" data-idVendita="' + risultati[i].IdVendita + '" data-idProdotto="' + risultati[i].IdProdotto + '" data-prezzoProdotto="' + risultati[i].prezzo + '" data-quantProdInDist="' + risultati[i].quantitaDistributore + '" data-quantExVenduto="' + risultati[i].quantitaVenduto + '" data-codiceLotto="' + risultati[i].CodiceLotto + '" data-dataScadenza="' + risultati[i].DataScadenza + '">Cancella</a></td>';
//                righe = righe + '</tr>';
//            }
            
//            storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

//            var datiPopUpStorico = '<div style="padding:10px 20px;">';
//            datiPopUpStorico = datiPopUpStorico + '<h2>Storico Venduto</h2>';
//            datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
//            datiPopUpStorico = datiPopUpStorico + '</div>';
//            //console.log(datiPopUpStorico);
//            $("#popUpStoricoVendutoDaDist").html(datiPopUpStorico);

//            $(".btnCancella").on('click', function () {
//                var idVendita = $(this).attr('data-idVendita');
//                var idProdotto = $(this).attr('data-idProdotto');
//                var prezzoProdotto = $(this).attr('data-prezzoProdotto');
//                var quantProdInDist = $(this).attr('data-quantProdInDist');
//                var quantExVenduto = $(this).attr('data-quantExVenduto');
//                var idOperatore = localStorage.idOperatore;
//                var quantitaRimasti = (parseInt(quantProdInDist) + parseInt(quantExVenduto));
//                var prezzoTotaleRimasti = (quantitaRimasti * prezzoProdotto);
//                var codiceLotto = $(this).attr('data-codiceLotto');
//                var dataScadenza = $(this).attr('data-dataScadenza');
//                if (dataScadenza == '') {
//                    dataScadenza = '2015-01-01';
//                } else {
//                    dataScadenza = parseJsonDateLettura(dataScadenza);
//                }                
//                dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');

//                var prezzoTotaleDaCaricare = (quantExVenduto * prezzoProdotto);

//                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
//                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);

//                if (!confirm("Sicuro che vuoi cancellare " + quantExVenduto + " pezzi di questo prodotto?")) return;

//                CorrezioneVendita(idVendita);
//                //adeguare la funzione a quella sotto                             

//                //StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantExVenduto, quantitaRimasti, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, null);
//                InsertProdottiInDistributore(IdDistributore, idProdotto, quantExVenduto, quantitaRimasti, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
//                //setTimeout(GetSituazioneDistributore(IdDistributore, descDistributore), 3000);                                                 

//                $("#popUpStoricoVendutoDaDist").popup("close");

//                $("#popUpStoricoVendutoDaDist").bind({
//                    popupafterclose: function (event, ui) {
//                        //alert('chiuso');
//                        //console.log(idProdotto);
//                        $(".quantProdInDist-" + idProdotto).html(quantitaRimasti);
//                    }
//                });
                                
//               // GetStoricoVendutoInDistributore(IdDistributore, idProdotto, '', 10);
//            });
//        }

//    });
//}

function GetSituazioneDistributore(IdDistributore, descDistributore) {
    location.hash = "formDettaglioDistributore";
    //ElencoMezziPerDistributori();

    $(".caricaDaCamion").attr("data-IdDistributore", IdDistributore);
    $(".caricaDaCamion").attr("data-descDistributore", descDistributore);
    $(".h1DettDistributore").html(descDistributore);

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT DISTINCT  prodotti.Descrizione," +
                                                "prodotti.Foto, " +
                                                "prodotti.IdProdotto, " +
                                                "IFNULL((select SUM( quantita) from magazzino where magazzino.IdProdotto = prodotti.IdProdotto and  modificato =0 and smaltito = 0),0) as quantitaMagazzino, " +
                                                "prodotti.Prezzo, " +
                                                "(select situazionedistributori.colore from situazionedistributori where situazionedistributori.IdProdotto = prodotti.IdProdotto and  modificato =0 and situazionedistributori.IdDistributore = ? order by datainserimento desc limit 1) as colore," +
                                                "IFNULL((select SUM( quantita) from situazionedistributori where situazionedistributori.IdProdotto = prodotti.IdProdotto and  modificato =0 and situazionedistributori.IdDistributore = ?),0) as quantitaDistributore " +
                                    "FROM        prodotti LEFT OUTER JOIN " +
                                                "magazzino ON prodotti.IdProdotto = magazzino.IdProdotto LEFT OUTER JOIN " +
                                                "situazionedistributori ON situazionedistributori.IdProdotto = prodotti.IdProdotto   " +
                                    "order by prodotti.ordine, prodotti.Descrizione", [IdDistributore, IdDistributore], function (transaction, results) {

                                        var dettaglio = '<table id="tabellaDettaglioDistributore" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th width="10%">Foto</th>' +
                                                '<th width="17%">Mag.</th>' +
                                                '<th width="18%">Quant. Dist.</th>' +
                                                '<th width="15%">Rimasti</th>' +
                                                '<th width="10%">Resi</th>' +
                                                '<th width="20%">Carica</th>' +
                                                '<th width="10%">Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Mag.</th>' +
                                                '<th>Quant. Dist.</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
                                        var idProd = '';
                                        var idProdOld = '';
                                        //var numLotto = '';
                                        //var numLottoOld = '';
                                        var rigaDettaglio = new Array();
                                        var quantita = 0;
                                        var quantitaOld = 0;
                                        var quantitaTot = 0;
                                        var coloreEvidenziato = '';
                                        var prodotti = new Array();
                                        for (var i = 0; i < results.rows.length; i++) {
                                            //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
                                            //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);
                                            var row = results.rows.item(i);
                                            idProd = row.IdProdotto;
                                            //numLotto = row.NumeroLotto;
                                            quantita = row.quantitaDistributore;
                                            coloreEvidenziato = row.colore;

                                            var evidenziato = "";
                                            if (row.caricato) {
                                                evidenziato = "verde";
                                            }

                                            prodotti[i] = idProd;
                                            dettaglio = dettaglio + '<tr>';
                                            dettaglio = dettaglio + '<td width="10%" align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"><a href="#popUpStoricoVendutoDaDist" data-rel="popup" data-position-to="window" class="storicoVendutoDaDistributore" data-idProdotto="' + row.IdProdotto + '" data-IdDistributore="' + row.IdDistributore + '" data-numeroLotto=""><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
                                            dettaglio = dettaglio + '<td width="17%" class="descrizione' + row.IdProdotto + '">' + row.Descrizione + '<br><br><div id="quantMagazzino' + row.IdProdotto + '" class="quantitaMag" data-quantitaMagazzino="' + row.quantitaMagazzino + '">' + row.quantitaMagazzino + '</div></td>';
                                            dettaglio = dettaglio + '<td width="18%" class="quantita ' + coloreEvidenziato + ' quantProdInDist-' + row.IdProdotto + '" data-quantitaDistributore="' + row.quantitaDistributore + '">' + row.quantitaDistributore + '</td>';
                                            dettaglio = dettaglio + '<td width="15%"><div class="nomeDistributore">Rimasti</div> <input type="number" id="rimastoDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
                                            dettaglio = dettaglio + '<td width="10%"><div class="medioFont" style="margin-bottom:9px;">Resi</div> <input type="number" id="resoDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
                                            dettaglio = dettaglio + '<td width="20%"><div class="medioFont" style="margin-bottom:9px;">Carica</div> <input type="number" id="caricaDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" data-quantMagazzino="' + row.quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaDist ui-btnCaricaDaMagazzino">Salva</a></td>';
                                            dettaglio = dettaglio + '<td width="10%"><div class="medioFont" style="margin-bottom:9px;">Scarica</div> <input type="number" id="spostaDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" data-quantMagazzino="' + row.quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaDist ui-btnSposta">Salva</a></td>';
                                            //dettaglio = dettaglio + '<td><input type="checkbox" data-role="flipswitch" name="flip-checkbox-' + row.IdProdotto + '" id="flip-checkbox-' + row.IdProdotto + '" data-on-text="Camion" data-off-text="Distributore" data-wrapper-class="custom-size-flipswitch" checked=""><span id="quantInCamion-' + row.IdProdotto + '" class="quantSuCamion">0</span> <input type="number" id="spostaDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaDist ui-btnSposta">Salva</a></td>';
                                            dettaglio = dettaglio + '</tr>';
                                        }

                                        dettaglio = dettaglio + '</tbody> </table>';
                                        var desc = descDistributore;
                                        desc = desc.replace("'", "\\'");
                                        desc = '\'' + desc + '\'';
                                        dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCarica fineCarico" onclick="togliEvidenziatoDistributore(' + IdDistributore + ', ' + desc + ')" /></p>';

                                        $('.DettaglioDistributore').html(dettaglio);


                                        displayNumeriLottoMagazzino(0, 0);

                                        displayNumeriLottoDistributore(IdDistributore, 0, quantita);
                                       
                                        $(".storicoVendutoDaDistributore").on('click', function () {
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var idDistributore = IdDistributore;
                                            var numeroLotto = $(this).attr('data-numeroLotto');
                                            //console.log("numeroLotto=" + numeroLotto + "---");
                                            numeroLotto = stringToDate(numeroLotto, 'dd/mm/yyyy', '/');
                                            //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                                            //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
                                            GetStoricoVendutoInDistributore(idDistributore, idProdotto, 10, desc);

                                        });

                                        var table = $('#tabellaDettaglioDistributore').DataTable(
                                            {
                                                "paging": false, responsive: true, "fnDrawCallback": function () {
                                                    $(this).trigger('create');
                                                }
                                            }
                                        );

                                        //for (var i = 0; i < prodotti.length; i++) {
                                        //    GetProdottiInCamionByIdProdotto(1, prodotti[i]);
                                        //}

                                        $(".rimasti").on('click', function () {

                                            var idDistributore = IdDistributore;
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var prezzo = $(this).attr('data-prezzo');
                                            //var quantitaAttuale = $(this).closest('td').prev('td').text();
                                            var quantitaAttuale = $(this).closest('td').prev('td').attr('data-quantitaDistributore');
                                            var quantitaRimasti = $('#rimastoDist' + idProdotto).val();
                                            var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                                            var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                                            var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                                            var idOperatore = localStorage.idOperatore;

                                            if (quantitaRimasti == "") {
                                                alert("Scegli un valore Numerico per indicare i Rimasti!");
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }

                                            if (parseInt(quantitaRimasti) > parseInt(quantitaAttuale)) {
                                                alert("E' impossibile che siano rimasti più prodotti di quelli presenti!");
                                                //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }
                                            idProdotto = parseInt(idProdotto);
                                            //if (!confirm("Sicuro che sul distributore sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;
                                            GetProdottiInDistributorePerRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzo, idOperatore);

                                            //SalvaRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore);

                                            var labelQuantita = $(this).closest('td').prev('td');
                                            //console.log(labelQuantita);
                                            //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                                            //labelQuantita.css("background-color", "green");
                                            labelQuantita.animate({
                                                backgroundColor: "#38c",
                                                color: "#000"
                                            }, 1000);
                                            labelQuantita.html(quantitaRimasti);

                                            
                                            $('.quantProdInDist-' + idProdotto).attr('data-quantitadistributore', quantitaRimasti);
                                            //azzero il campo
                                            $('#rimastoDist' + idProdotto).val('');

                                            //var labelVenduto = $(this).closest('td').next('td').next('td');
                                            //labelVenduto.animate({
                                            //    backgroundColor: "green",
                                            //    color: "#000"
                                            //}, 1000);
                                            //labelVenduto.html(quantitaVenduti);
                                        });

                                        $(".resi").on('click', function () {

                                            var idDistributore = IdDistributore;
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var prezzo = $(this).attr('data-prezzo');
                                            var quantitaResi = $('#resoDist' + idProdotto).val();
                                            //var quantitaDist = $(this).closest('td').prev('td').prev('td').text();
                                            var quantitaDist = $(this).closest('td').prev('td').prev('td').attr('data-quantitaDistributore');
                                            var prezzoTotaleResi = (prezzo * quantitaResi);
                                            var idOperatore = localStorage.idOperatore;
                                            var quantitaRimasti = (quantitaDist - quantitaResi);
                                            var prezzoTotaleRimasti = (prezzo * quantitaRimasti);                                            

                                            if (parseInt(quantitaResi) > parseInt(quantitaDist)) {
                                                alert("E' impossibile che siano più prodotti Resi di quelli presenti!");
                                                //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }

                                            var confermaResi = ConfermaResi(quantitaResi);
                                            if (confermaResi == 0) {
                                                return;
                                            }
                                            //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta + 'prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                                            //return;

                                            //if (!confirm("Sicuro che sono da rendere " + quantitaResi + " pezzi di questo prodotto?")) return;

                                            //SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);                                           
                                            GetProdottiInDistributorePerResi(idDistributore, idProdotto, quantitaResi, quantitaRimasti, prezzoTotaleResi, prezzoTotaleRimasti, idOperatore);
                                            $('#resoDist' + idProdotto).val('');

                                            var labelQuantita = $(this).closest('td').prev('td').prev('td');
                                            //console.log(labelQuantita);                

                                            $('.quantProdInDist-' + idProdotto).attr('data-quantitadistributore', quantitaRimasti);

                                            labelQuantita.animate({
                                                backgroundColor: "red",
                                                color: "#000"
                                            }, 1000);

                                            labelQuantita.html(quantitaRimasti);
                                        });

                                        $('.caricaDist').on('click', function () {
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var quantitaDaCaricare = $('#caricaDist' + idProdotto).val();
                                            var quantMagazzino = $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino');
                                            var quantitaRimasti = (quantMagazzino - quantitaDaCaricare);
                                            var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td');
                                            var TDquantitaDistributore = $('.quantProdInDist-' + idProdotto);
                                            var quantitaDistributore = $('.quantProdInDist-' + idProdotto).attr('data-quantitaDistributore');
                                            var quantitaAggiornataMagazzino = (parseInt(quantMagazzino) - parseInt(quantitaDaCaricare));
                                            var quantitaAggiornataDistributore = (parseInt(quantitaDaCaricare) + parseInt(quantitaDistributore));
                                            var prezzo = $(this).attr('data-prezzo');
                                            var prezzoTotaleDaCaricare = (prezzo * quantitaDaCaricare);
                                            var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                                            var idOperatore = localStorage.idOperatore;
                                            var giacenza = $('#quantMagazzino' + idProdotto);

                                            if (quantitaDaCaricare == "" || isInteroPositivo(parseInt(quantitaDaCaricare)) == false) {
                                                alert("Scegli un valore Numerico per indicare quanto caricare!");
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }

                                            if (isInteroPositivo(parseInt(quantMagazzino)) == false) {
                                                alert("Questo prodotto risulta esaurito in magazzino!");
                                                return;
                                            }

                                            if (parseInt(quantitaDaCaricare) > parseInt(quantMagazzino)) {
                                                alert("Non si possono caricare più prodotti di quelli presenti in magazzino!");
                                                return;
                                            }

                                            GetProdottiInMagazzinoPerCaricare(IdDistributore, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore);

                                            TDquantitaDistributore.html(quantitaAggiornataDistributore);
                                            giacenza.html(quantitaRimasti);
                                            $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino', quantitaRimasti);
                                            $('#caricaDist' + idProdotto).val('');

                                            labelQuantita.animate({
                                                backgroundColor: "green",
                                                color: "#000"
                                            }, 1000);

                                            giacenza.animate({
                                                backgroundColor: "green",
                                                color: "#000"
                                            }, 1000);

                                        });

                                        $('.spostaDist').on('click', function () {
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var quantitaDaSpostare = $('#spostaDist' + idProdotto).val();
                                            var quantitaDistributore = $('.quantProdInDist-' + idProdotto).attr('data-quantitadistributore');
                                            var tdQuantitaDist = $('.quantProdInDist-' + idProdotto);
                                            // var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');                
                                            var prezzo = $(this).attr('data-prezzo');
                                            //var quantMagazzino = $(this).attr('data-quantMagazzino');
                                            var quantMagazzino = $('#quantMagazzino' + idProdotto).attr('data-quantitamagazzino');

                                            var giacenza = $('#quantMagazzino' + idProdotto);
                                            var quantRestanteDistributore = (parseInt(quantitaDistributore) - parseInt(quantitaDaSpostare));
                                            var quantRestante = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
                                            var quantitaAggiornataMagazzino = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
                                            var quantitaAggiornataDistributore = (parseInt(quantitaDistributore) - parseInt(quantitaDaSpostare));
                                            var prezzoTotaleRimasti = (prezzo * quantRestante);
                                            var prezzoTotaleRimastiDistributore = (prezzo * (parseInt(quantitaDistributore) - parseInt(quantitaDaSpostare)));
                                            var prezzoTotaleDaSpostare = (prezzo * quantitaDaSpostare);

                                            var idOperatore = localStorage.idOperatore;

                                            //var direzione = $('#flip-checkbox-' + idProdotto).is(':checked');

                                            if (quantitaDaSpostare == "" || isInteroPositivo(parseInt(quantitaDaSpostare)) == false) {
                                                alert("Scegli un valore Numerico per indicare quanto scaricare!");
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }

                                            //if (!confirm("Sicuro che vuoi spostare " + quantitaDaSpostare + " pezzi di questo prodotto?")) return;

                                            if (parseInt(quantitaDaSpostare) > parseInt(quantitaDistributore)) {
                                                alert("E' impossibile scaricare più prodotti di quelli presenti nel distributore!");
                                                //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }

                                            GetProdottiInMagazzinoPerScaricare(IdDistributore, idProdotto, quantitaDaSpostare, quantRestanteDistributore, quantitaAggiornataMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaSpostare, prezzoTotaleRimastiDistributore, idOperatore);

                                            $('#spostaDist' + idProdotto).val('');

                                            tdQuantitaDist.html(quantRestanteDistributore);
                                            $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino', quantitaAggiornataMagazzino);
                                            tdQuantitaDist.animate({
                                                backgroundColor: "#FFA500",
                                                color: "#000"
                                            }, 1000);

                                            giacenza.html(quantRestante);
                                            giacenza.animate({
                                                backgroundColor: "#FFA500",
                                                color: "#000"
                                            }, 1000);

                                            //*********************************

                                        });

                                    });
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function SituazioneDistributore(transaction, results) {
//    //location.hash = "formDettaglioDistributore";
//    ////ElencoMezziPerDistributori();
    
//    //$(".caricaDaCamion").attr("data-IdDistributore", IdDistributore);
//    //$(".caricaDaCamion").attr("data-descDistributore", descDistributore);
//    //$(".h1DettDistributore").html(descDistributore);

//    //$.ajax({
//    //    type: "POST",
//    //    crossDomain: true,
//    //    contentType: "application/json; charset=utf-8",
//    //    //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneDistributoreV2",        
//    //    url: urlGetSituazioneDistributoreV2,
//    //    cache: false,
//    //    //jsonpCallback: 'risposta',
//    //    // jsonp: 'callback',
//    //    // dataType: "jsonp",            
//    //    async: true,
//    //    //            data: "idDisciplina=" + idDisciplina,
//    //    data: JSON.stringify({ idDistributore: IdDistributore }),
//    //    //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
//    //    error: function (data) {
//    //        console.log(data.responseText)
//    //    },
//    //    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//    //    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//    //    success: function (response) {
//    //        risultati = response.d;
//    //        //corsiGlobal = response.d;
//    //        //console.log('Caricati!');
//    //        //console.log(Ordinanze);
//    //        //console.log(risultati);
//    //        //$(".menuPrincipale").hide();                        

//            var dettaglio = '<table id="tabellaDettaglioDistributore" class="display" cellspacing="0" width="100%">' +
//                                        '<thead>' +
//                                            '<tr>' +
//                                                '<th width="10%">Foto</th>' +
//                                                '<th width="15%">Mag.</th>' +
//                                                '<th width="20%">Quant. Dist.</th>' +
//                                                '<th width="15%">Rimasti</th>' +
//                                                '<th width="10%">Resi</th>' +
//                                                '<th width="20%">Carica</th>' +
//                                                '<th width="10%">Scarica</th>' +
//                                            '</tr>' +
//                                        '</thead>' +
//                                        '<tfoot>' +
//                                            '<tr>' +
//                                                '<th>Foto</th>' +
//                                                '<th>Mag.</th>' +
//                                                '<th>Quant. Dist.</th>' +
//                                                '<th>Rimasti</th>' +
//                                                '<th>Resi</th>' +
//                                                '<th>Carica</th>' +
//                                                '<th>Scarica</th>' +
//                                            '</tr>' +
//                                        '</tfoot>' +
//                                        '<tbody>';
//            var idProd = '';
//            var idProdOld = '';
//            var numLotto = '';
//            var numLottoOld = '';
//            var rigaDettaglio = new Array();
//            var quantita = 0;
//            var quantitaOld = 0;
//            var quantitaTot = 0;
//            var coloreEvidenziato = '';
//            var prodotti = new Array();
//            for (var i = 0; i < results.rows.length; i++) {
//                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
//                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);
//                var row = results.rows.item(i);
//                idProd = row.IdProdotto;
//                numLotto = dataItaliana(row.NumeroLotto);
//                quantita = row.QuantitaDistributore;
//                coloreEvidenziato = row.colore;
//                var idDistributore = row.IdDistributore;
//                var evidenziato = "";
//                if (row.caricato) {
//                    evidenziato = "verde";
//                }

//                prodotti[i] = idProd;
//                dettaglio = dettaglio + '<tr>';
//                dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"><a href="#popUpStoricoVendutoDaDist" data-rel="popup" data-position-to="window" class="storicoVendutoDaDistributore" data-idProdotto="' + row.IdProdotto + '" data-IdDistributore="' + row.IdDistributore + '" data-numeroLotto=""><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
//                dettaglio = dettaglio + '<td class="descrizione' + row.IdProdotto + '">' + row.Descrizione + '<br><br><div id="quantMagazzino' + row.IdProdotto + '" class="quantitaMag" data-quantitaMagazzino="' + row.QuantitaMagazzino + '">' + row.QuantitaMagazzino + '</div></td>';
//                dettaglio = dettaglio + '<td class="quantita ' + coloreEvidenziato + ' quantProdInDist-' + row.IdProdotto + '" data-quantitaDistributore="' + row.QuantitaDistributore + '">' + row.QuantitaDistributore + '</td>';
//                dettaglio = dettaglio + '<td><div class="nomeDistributore">Rimasti</div> <input type="number" id="rimastoDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
//                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Resi</div> <input type="number" id="resoDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
//                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Carica</div> <input type="number" id="caricaDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" data-quantMagazzino="' + row.QuantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaDist ui-btnCaricaDaMagazzino">Salva</a></td>';
//                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Scarica</div> <input type="number" id="spostaDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" data-quantMagazzino="' + row.QuantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaDist ui-btnSposta">Salva</a></td>';
//                //dettaglio = dettaglio + '<td><input type="checkbox" data-role="flipswitch" name="flip-checkbox-' + row.IdProdotto + '" id="flip-checkbox-' + row.IdProdotto + '" data-on-text="Camion" data-off-text="Distributore" data-wrapper-class="custom-size-flipswitch" checked=""><span id="quantInCamion-' + row.IdProdotto + '" class="quantSuCamion">0</span> <input type="number" id="spostaDist' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaDist ui-btnSposta">Salva</a></td>';
//                dettaglio = dettaglio + '</tr>';
//            }

//            dettaglio = dettaglio + '</tbody> </table>';
//            //var desc = descDistributore;
//            //desc = desc.replace("'", "\\'");
//            //desc = '\'' + desc + '\'';
//            //dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCarica fineCarico" onclick="togliEvidenziatoDistributore(' + IdDistributore + ', ' + desc + ')" /></p>';

//            $('.DettaglioDistributore').html(dettaglio);

           
//            displayNumeriLottoMagazzino(0, 0);
            
//            displayNumeriLottoDistributore(idDistributore, 0, quantita);

//            $(".storicoVendutoDaDistributore").on('click', function () {
//                var idProdotto = $(this).attr('data-idProdotto');
//                var idDistributore = IdDistributore;
//                var numeroLotto = $(this).attr('data-numeroLotto');
//                //console.log("numeroLotto=" + numeroLotto + "---");
//                numeroLotto = stringToDate(numeroLotto, 'dd/mm/yyyy', '/');
//                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
//                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
//                GetStoricoVendutoInDistributore(idDistributore, idProdotto, 10, desc);

//            });

//            var table = $('#tabellaDettaglioDistributore').DataTable(
//                {
//                    "paging": false, responsive: true, "fnDrawCallback": function () {
//                        $(this).trigger('create');
//                    }
//                }
//            );

//            for (var i = 0; i < prodotti.length; i++) {
//                GetProdottiInCamionByIdProdotto(1, prodotti[i]);
//            }

//            $(".rimasti").on('click', function () {

//                var idDistributore = IdDistributore;
//                var idProdotto = $(this).attr('data-idProdotto');
//                var prezzo = $(this).attr('data-prezzo');
//                //var quantitaAttuale = $(this).closest('td').prev('td').text();
//                var quantitaAttuale = $(this).closest('td').prev('td').attr('data-quantitaDistributore');
//                var quantitaRimasti = $('#rimastoDist' + idProdotto).val();
//                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
//                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
//                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
//                var idOperatore = localStorage.idOperatore;

//                if (quantitaRimasti == "") {
//                    alert("Scegli un valore Numerico per indicare i Rimasti!");
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                if (parseInt(quantitaRimasti) > parseInt(quantitaAttuale)) {
//                    alert("E' impossibile che siano rimasti più prodotti di quelli presenti!");
//                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                //if (!confirm("Sicuro che sul distributore sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;
//                GetProdottiInDistributorePerRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzo, idOperatore);

//                //SalvaRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore);

//                var labelQuantita = $(this).closest('td').prev('td');
//                //console.log(labelQuantita);
//                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
//                //labelQuantita.css("background-color", "green");
//                labelQuantita.animate({
//                    backgroundColor: "#38c",
//                    color: "#000"
//                }, 1000);
//                labelQuantita.html(quantitaRimasti);

//                //azzero il campo
//                $('#rimastoDist' + idProdotto).val('');

//                //var labelVenduto = $(this).closest('td').next('td').next('td');
//                //labelVenduto.animate({
//                //    backgroundColor: "green",
//                //    color: "#000"
//                //}, 1000);
//                //labelVenduto.html(quantitaVenduti);
//            });

//            $(".resi").on('click', function () {

//                var idDistributore = IdDistributore;
//                var idProdotto = $(this).attr('data-idProdotto');
//                var prezzo = $(this).attr('data-prezzo');
//                var quantitaResi = $('#resoDist' + idProdotto).val();
//                //var quantitaDist = $(this).closest('td').prev('td').prev('td').text();
//                var quantitaDist = $(this).closest('td').prev('td').prev('td').attr('data-quantitaDistributore');
//                var prezzoTotaleResi = (prezzo * quantitaResi);
//                var idOperatore = localStorage.idOperatore;
//                var quantitaRimasti = (quantitaDist - quantitaResi);
//                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);

//                //if (quantitaResi == "" || isInteroPositivo(parseInt(quantitaResi)) == false) {
//                //    alert("Scegli un valore Numerico per indicare i Resi!");
//                //    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
//                //    return;
//                //} else {
//                //    $(this).prev().removeClass("evidenziaErrore");
//                //}

//                if (parseInt(quantitaResi) > parseInt(quantitaDist)) {
//                    alert("E' impossibile che siano più prodotti Resi di quelli presenti!");
//                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                var confermaResi = ConfermaResi(quantitaResi);
//                if (confermaResi == 0) {
//                    return;
//                }
//                //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta + 'prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
//                //return;

//                //if (!confirm("Sicuro che sono da rendere " + quantitaResi + " pezzi di questo prodotto?")) return;

//                //SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);
//                GetProdottiInDistributorePerResi(idDistributore, idProdotto, quantitaResi, quantitaRimasti, prezzoTotaleResi, prezzoTotaleRimasti, idOperatore);
//                $('#resoDist' + idProdotto).val('');

//                var labelQuantita = $(this).closest('td').prev('td').prev('td');
//                //console.log(labelQuantita);                

//                labelQuantita.animate({
//                    backgroundColor: "red",
//                    color: "#000"
//                }, 1000);

//                labelQuantita.html(quantitaRimasti);
//            });

//            $('.caricaDist').on('click', function () {
//                var idProdotto = $(this).attr('data-idProdotto');
//                var quantitaDaCaricare = $('#caricaDist' + idProdotto).val();
//                var quantMagazzino = $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino');
//                var quantitaRimasti = (quantMagazzino - quantitaDaCaricare);
//                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td');
//                var TDquantitaDistributore = $('.quantProdInDist-' + idProdotto);
//                var quantitaDistributore = $('.quantProdInDist-' + idProdotto).attr('data-quantitaDistributore');
//                var quantitaAggiornataMagazzino = (parseInt(quantMagazzino) - parseInt(quantitaDaCaricare));
//                var quantitaAggiornataDistributore = (parseInt(quantitaDaCaricare) + parseInt(quantitaDistributore));
//                var prezzo = $(this).attr('data-prezzo');
//                var prezzoTotaleDaCaricare = (prezzo * quantitaDaCaricare);
//                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
//                var idOperatore = localStorage.idOperatore;
//                var giacenza = $('#quantMagazzino' + idProdotto);

//                if (quantitaDaCaricare == "" || isInteroPositivo(parseInt(quantitaDaCaricare)) == false) {
//                    alert("Scegli un valore Numerico per indicare quanto caricare!");
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                if (isInteroPositivo(parseInt(quantMagazzino)) == false) {
//                    alert("Questo prodotto risulta esaurito in magazzino!");
//                    return;
//                }

//                if (parseInt(quantitaDaCaricare) > parseInt(quantMagazzino)) {
//                    alert("Non si possono caricare più prodotti di quelli presenti in magazzino!");
//                    return;
//                }

//                GetProdottiInMagazzinoPerCaricare(IdDistributore, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore);

//                TDquantitaDistributore.html(quantitaAggiornataDistributore);
//                giacenza.html(quantitaRimasti);
//                $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino', quantitaRimasti);
//                $('#caricaDist' + idProdotto).val('');

//                labelQuantita.animate({
//                    backgroundColor: "green",
//                    color: "#000"
//                }, 1000);

//                giacenza.animate({
//                    backgroundColor: "green",
//                    color: "#000"
//                }, 1000);

//            });

//            $('.spostaDist').on('click', function () {
//                var idProdotto = $(this).attr('data-idProdotto');
//                var quantitaDaSpostare = $('#spostaDist' + idProdotto).val();
//                var quantitaDistributore = $('.quantProdInDist-' + idProdotto).attr('data-quantitadistributore');
//                var tdQuantitaDist = $('.quantProdInDist-' + idProdotto);
//                // var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');                
//                var prezzo = $(this).attr('data-prezzo');
//                //var quantMagazzino = $(this).attr('data-quantMagazzino');
//                var quantMagazzino = $('#quantMagazzino' + idProdotto).attr('data-quantitamagazzino');

//                var giacenza = $('#quantMagazzino' + idProdotto);
//                var quantRestanteDistributore = (parseInt(quantitaDistributore) - parseInt(quantitaDaSpostare));
//                var quantRestante = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
//                var quantitaAggiornataMagazzino = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
//                var quantitaAggiornataDistributore = (parseInt(quantitaDistributore) - parseInt(quantitaDaSpostare));
//                var prezzoTotaleRimasti = (prezzo * quantRestante);
//                var prezzoTotaleRimastiDistributore = (prezzo * (parseInt(quantitaDistributore) - parseInt(quantitaDaSpostare)));
//                var prezzoTotaleDaSpostare = (prezzo * quantitaDaSpostare);

//                var idOperatore = localStorage.idOperatore;

//                //var direzione = $('#flip-checkbox-' + idProdotto).is(':checked');

//                if (quantitaDaSpostare == "" || isInteroPositivo(parseInt(quantitaDaSpostare)) == false) {
//                    alert("Scegli un valore Numerico per indicare quanto scaricare!");
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                //if (!confirm("Sicuro che vuoi spostare " + quantitaDaSpostare + " pezzi di questo prodotto?")) return;

//                if (parseInt(quantitaDaSpostare) > parseInt(quantitaDistributore)) {
//                    alert("E' impossibile scaricare più prodotti di quelli presenti nel distributore!");
//                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                GetProdottiInMagazzinoPerScaricare(IdDistributore, idProdotto, quantitaDaSpostare, quantRestanteDistributore, quantitaAggiornataMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaSpostare, prezzoTotaleRimastiDistributore, idOperatore);

//                $('#spostaDist' + idProdotto).val('');

//                tdQuantitaDist.html(quantRestanteDistributore);

//                tdQuantitaDist.animate({
//                    backgroundColor: "#FFA500",
//                    color: "#000"
//                }, 1000);

                

//                giacenza.html(quantRestante);
//                giacenza.animate({
//                    backgroundColor: "#FFA500",
//                    color: "#000"
//                }, 1000);

//                //*********************************

//            });

//        //}

//    //});

//}

function displayNumeriLottoDistributore(idDistributore, idProdotto, quantitaDistributore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var parameter = [idDistributore];
            var where = "";
            if (idProdotto != 0) {
                parameter = [idDistributore, idProdotto];
                where = " and situazionedistributori.idProdotto = ? ";
            }
            t.executeSql("SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazionedistributori.NumeroLotto, " + 
                        "situazionedistributori.quantita, situazionedistributori.IdDistributore, situazionedistributori.DataScadenza, situazionedistributori.CodiceLotto, situazionedistributori.IdSituazioneDistributore " + 
                        "FROM prodotti " + 
                        "LEFT OUTER JOIN situazionedistributori situazionedistributori ON prodotti.IdProdotto = situazionedistributori.IdProdotto " + 
                        "WHERE situazionedistributori.modificato = 0 and " +
                        "situazionedistributori.IdDistributore = ? " + where + " ORDER BY prodotti.ordine, prodotti.Descrizione, situazionedistributori.DataScadenza ", parameter, function (transiction, results) {
                            
                            var idProd = 0;
                            var idProdottoOld = 0;
                            var numLotti = '';
                            var numeroLotto = '';
                            var numeroLottoOld = '';
                            var dataScadenza = '';
                            var dataScadenzaOld = '';
                            var quantitaLotto = 0;

                            $('.quantProdInDist-' + idProdotto).html(quantitaDistributore);
                            $('.quantProdInDist-' + idProdotto).attr('data-quantitadistributore', quantitaDistributore);
                            var rigaDettaglio = new Array();
                            for (var i = 0; i < results.rows.length; i++) {
                                var lotti = '<br>Lotti: ';
                                var row = results.rows.item(i);

                                numeroLotto = dataItaliana(row.NumeroLotto);
                                dataScadenza = dataItaliana(row.DataScadenza);
                                idProd = row.IdProdotto;

                                if (dataScadenza == dataScadenzaOld && idProd == idProdottoOld) {
                                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                                        numeroLotto = row.CodiceLotto;
                                    }
                                    quantitaLotto = (parseInt(quantitaLotto) + parseInt(row.Quantita));
                                    //$('.Descrizione' + row.IdProdotto).append('<div class="miniFont lottoMag' + row.IdProdotto + '">' + quantitaLotto + ' - ' + parseJsonDateLettura(row.NumeroLotto)+ '</div>');
                                    rigaDettaglio[i - 1] = '';
                                    rigaDettaglio[i] = '<div class="miniFont lottoDist' + row.IdProdotto + '">' + quantitaLotto + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                                } else {
                                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                                        numeroLotto = row.CodiceLotto;
                                    }
                                    if (idProd != idProdottoOld) {
                                        $('.lottoDist' + row.IdProdotto).remove();
                                    }
                                    quantitaLotto = row.Quantita;
                                    //$('.Descrizione' + row.IdProdotto).append('<div class="miniFont lottoMag' + row.IdProdotto + '">' + row.QuantitaMagazzino + ' - ' + parseJsonDateLettura(row.NumeroLotto) + '</div>');
                                    rigaDettaglio[i] = '<div class="miniFont lottoDist' + row.IdProdotto + '">' + row.Quantita + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                                }
                                numeroLottoOld = dataItaliana(row.NumeroLotto);
                                dataScadenzaOld = dataItaliana(row.DataScadenza);
                                idProdottoOld = row.IdProdotto;
                            }
                            idProdottoOld = 0;
                            var lottiDist = '';
                            for (var i = 0; i < results.rows.length; i++) {
                                var row2 = results.rows.item(i);
                                if (i == 0) {
                                    lotti = rigaDettaglio[i];
                                }
                                if (row2.IdProdotto != idProdottoOld) {
                                    //if (results.rows.length == 1) {
                                    //    $('.quantProdInDist-' + row.IdProdotto).append(lotti);
                                    //} else {
                                    $('.quantProdInDist-' + idProdottoOld).append(lotti);
                                    //}
                                    //if (results.rows.length == 1) {
                                    //    $('.quantProdInDist-' + row2.IdProdotto).append(lotti);
                                    //}
                                    if (i > 0) {
                                        lotti = '';
                                    }

                                }
                                if (i > 0) {
                                    lotti = lotti + rigaDettaglio[i];
                                }
                                if (i == results.rows.length - 1) {
                                    $('.quantProdInDist-' + row2.IdProdotto).append(lotti);
                                }
                                idProdottoOld = row2.IdProdotto;
                            }

                            if (idProdotto != 0) {
                                $('.lottoDist' + idProdotto).remove();
                                $('.quantProdInDist-' + idProdotto).append(lotti);
                            }

                        });
        });
} else {
    alert("db not found, your browser does not support web sql!");
}

}


function GetProdottiInDistributorePerRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
          
                var query = "SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazionedistributori.NumeroLotto, " +
                                "situazionedistributori.quantita, situazionedistributori.IdDistributore, situazionedistributori.DataScadenza, situazionedistributori.CodiceLotto, situazionedistributori.IdSituazioneDistributore " +
                                "FROM prodotti " +
                                "LEFT OUTER JOIN situazionedistributori situazionedistributori ON prodotti.IdProdotto = situazionedistributori.IdProdotto " +
                                "WHERE situazionedistributori.modificato = 0 and " +
                                "situazionedistributori.IdDistributore = ? and situazionedistributori.IdProdotto = ?  ORDER BY prodotti.ordine, prodotti.Descrizione, situazionedistributori.DataScadenza ";
                t.executeSql(query, [idDistributore, idProdotto], function (transaction, results) {
            var idProdottoOld = 0;
            var numLotti = '';
            var dataScadenza = '';
            var codiceLotto = '';
            var quantitaDistributore = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                var lotti = '<br>Lotti: ';
                numLotti = dataItaliana(row.NumeroLotto);
                //var numeroLotto = stringToDate(numLotti, 'dd-MM-yyyy', '-');
                var numeroLotto = dataItaliana(row.NumeroLotto);
                dataScadenza = dataItaliana(row.DataScadenza);
                //dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');
                codiceLotto = row.CodiceLotto;
                var IdSituazioneDistributore = row.IdSituazioneDistributore;
                if (codiceLotto == null) {
                    codiceLotto = '';
                }
               
                quantitaDistributore = row.Quantita;
                //var quantitaDaInserire = quantitaDistributore - quantitaVenduti;
                //}

                var idCliente = 0;
                var VenditaDiretta = false;
                if (quantitaVenduti <= quantitaDistributore) {
                                       
                    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaVenduti, quantitaDistributore, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneDistributore);

                    AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                    break;
                } else {
                    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaVenduti, quantitaDistributore, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneDistributore);
                    if (quantitaVenduti <= quantitaDistributore) {
                        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                    } else {
                        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaDistributore, prezzoTotaleVenduti, idOperatore, VenditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                    }
                }
                quantitaVenduti = quantitaVenduti - quantitaDistributore;
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


function GetProdottiInDistributorePerResi(idDistributore, idProdotto, quantitaResi, quantitaRimasti, prezzoTotaleResi, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
          
            var query = "SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazionedistributori.NumeroLotto, " +
                            "situazionedistributori.quantita, situazionedistributori.IdDistributore, situazionedistributori.DataScadenza, situazionedistributori.CodiceLotto, situazionedistributori.IdSituazioneDistributore " +
                            "FROM prodotti " +
                            "LEFT OUTER JOIN situazionedistributori situazionedistributori ON prodotti.IdProdotto = situazionedistributori.IdProdotto " +
                            "WHERE situazionedistributori.modificato = 0 and " +
                            "situazionedistributori.IdDistributore = ? and situazionedistributori.IdProdotto = ?  ORDER BY prodotti.ordine, prodotti.Descrizione, situazionedistributori.DataScadenza ";
            t.executeSql(query, [idDistributore, idProdotto], function (transaction, results) {
            var idProdottoOld = 0;
            var numLotti = '';
            var dataScadenza = '';
            var codiceLotto = '';
            var quantitaDistributore = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                var lotti = '<br>Lotti: ';
                numeroLotto = dataItaliana(row.NumeroLotto);
                dataScadenza = dataItaliana(row.DataScadenza);
                //var numeroLotto = stringToDate(numLotti, 'dd-MM-yyyy', '-');
                //dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');
                if (row.CodiceLotto != null) {
                    codiceLotto = row.CodiceLotto;
                }
                var IdSituazioneDistributore = row.IdSituazioneDistributore;
                //if (numLotti == '02-01-1') {
                //    //$('.quantProdInDist-' + row.IdProdotto).append('<div class="miniFont">' + row.quantitaDistributoreNull + ' - Lotto: nessun lotto</div>');
                //    //console.log('quantita: ' + row.quantitaDistributoreNull);
                //    quantitaDistributore = row.quantitaDistributoreNull;
                //} else {
                //$('.quantProdInDist-' + row.IdProdotto).append('<div class="miniFont">' + row.quantitaDistributore + ' - Lotto: ' + parseJsonDateLettura(row.NumeroLotto + '</div>'));
                //console.log('quantita: ' + row.quantitaDistributore);
                quantitaDistributore = row.Quantita;
                //}

                var idCliente = 0;
                var VenditaDiretta = false;
                if (quantitaResi <= quantitaDistributore) {

                    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaResi, quantitaDistributore, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneDistributore);
                    //AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaResi, prezzoTotaleResi, idOperatore, VenditaDiretta, numeroLotto);
                    SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaResi, prezzoTotaleResi, idOperatore, numeroLotto, dataScadenza, codiceLotto);
                    break;
                } else {
                    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaResi, quantitaDistributore, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneDistributore);
                    if (quantitaResi <= quantitaDistributore) {
                        SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaResi, prezzoTotaleResi, idOperatore, numeroLotto, dataScadenza, codiceLotto);
                    } else {
                        SalvaResi(idDistributore, idProdotto, quantitaDistributore, quantitaResi, prezzoTotaleResi, idOperatore, numeroLotto, dataScadenza, codiceLotto);
                    }
                }
                quantitaResi = quantitaResi - quantitaDistributore;
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

function GetProdottiInMagazzinoPerCaricare(idDistributore, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var parameter = [];
            var where = "";
            if (idProdotto != 0) {
                parameter = [idProdotto];
                where = " and magazzino.idprodotto = ? ";
            }
            t.executeSql("SELECT DISTINCT prodotti.idprodotto, prodotti.descrizione, magazzino.numerolotto, " +
                           "magazzino.quantita, " +
                           "magazzino.id, prodotti.prezzo, magazzino.codicelotto, magazzino.datascadenza   " +
                        "FROM prodotti " +
                        "LEFT OUTER JOIN magazzino ON prodotti.idprodotto = magazzino.idprodotto " +
                        "WHERE magazzino.modificato = 0 and magazzino.smaltito = 0 " + where + "  ORDER BY prodotti.ordine, prodotti.descrizione, magazzino.datascadenza", parameter, function (transaction, results) {

                var idProdottoOld = 0;
                var numLotti = '';
                var dataScadenza = '';
                var codiceLotto = '';
                var quantitaMagazzino = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var lotti = '<br>Lotti: ';
                    var numeroLotto = dataItaliana(row.NumeroLotto);
                    //var numeroLotto = stringToDate(numLotti, 'dd-MM-yyyy', '-');

                    dataScadenza = dataItaliana(row.DataScadenza);
                    //dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');
                    codiceLotto = row.CodiceLotto;
                    if (codiceLotto == null) {
                        codiceLotto = '';
                    }

                    quantitaMagazzino = row.Quantita;
                    var idCliente = 0;
                    var VenditaDiretta = false;
                    if (quantitaDaCaricare <= quantitaMagazzino) {

                        SmaltiscoProdottoInMagazzinoV3(row.Id, idProdotto, idOperatore, quantitaDaCaricare, parseInt(quantitaMagazzino), row.Prezzo, quantitaAggiornataMagazzino, codiceLotto, numeroLotto, dataScadenza, true, 'rosso');

                        InsertProdottiInDistributore(idDistributore, idProdotto, quantitaDaCaricare, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                        break;
                    } else {

                        SmaltiscoProdottoInMagazzinoV3(row.Id, idProdotto, idOperatore, quantitaDaCaricare, parseInt(quantitaMagazzino), row.Prezzo, quantitaAggiornataMagazzino, codiceLotto, numeroLotto, dataScadenza, true, 'rosso');
                        if (quantitaDaCaricare <= quantitaMagazzino) {

                            InsertProdottiInDistributore(idDistributore, idProdotto, quantitaDaCaricare, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                        } else {

                            InsertProdottiInDistributore(idDistributore, idProdotto, quantitaMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                        }
                    }
                    quantitaDaCaricare = quantitaDaCaricare - quantitaMagazzino;
                }
            }, errorHandler);
            //}            
            
        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
        alert("db not found, your browser does not support web sql!");
}
}

function GetProdottiInMagazzinoPerScaricare(idDistributore, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataDistributore, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            
                var oggi = dataOdierna();
                t.executeSql("SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazionedistributori.NumeroLotto, " + 
                                "situazionedistributori.quantita, situazionedistributori.IdDistributore, situazionedistributori.DataScadenza, situazionedistributori.CodiceLotto, situazionedistributori.IdSituazioneDistributore " + 
                                "FROM prodotti " + 
                                "LEFT OUTER JOIN situazionedistributori situazionedistributori ON prodotti.IdProdotto = situazionedistributori.IdProdotto " + 
                                "WHERE situazionedistributori.modificato = 0 and " +
                                "situazionedistributori.IdDistributore = ? AND situazionedistributori.idprodotto = ? ORDER BY situazionedistributori.DataScadenza ", [idDistributore, idProdotto], function (transaction, results) {

                    var idProdottoOld = 0;
                    var numLotti = '';
                    var dataScadenza = '';
                    var codiceLotto = '';
                    var quantitaDistributore = 0;
                    for (var i = 0; i < results.rows.length; i++) {
                        var row = results.rows.item(i);
                        var lotti = '<br>Lotti: ';
                        var numeroLotto = dataItaliana(row.NumeroLotto);
                        dataScadenza = dataItaliana(row.DataScadenza);
                        //var numeroLotto = stringToDate(numLotti, 'dd-MM-yyyy', '-');
                        //dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');

                        if (row.CodiceLotto != null) {
                            codiceLotto = row.CodiceLotto;
                        }

                        quantitaDistributore = row.Quantita;
                        var IdSituazioneDistributore = row.IdSituazioneDistributore;
                        var idCliente = 0;
                        var VenditaDiretta = false;
                        if (quantitaDaCaricare <= quantitaDistributore) {

                            StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaDaCaricare, quantitaDistributore, quantitaAggiornataDistributore, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneDistributore);

                            CaricaProdottoInMagazzino(idProdotto, quantitaDaCaricare, quantitaAggiornataMagazzino, prezzoTotaleDaCaricare, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, '', 'azzurro');
                            break;
                        } else {
                            StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaDaCaricare, quantitaDistributore, quantitaAggiornataDistributore, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneDistributore);
                            if (quantitaDaCaricare <= quantitaDistributore) {
                                //AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroLotto);
                                CaricaProdottoInMagazzino(idProdotto, quantitaDaCaricare, quantitaAggiornataMagazzino, prezzoTotaleDaCaricare, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, '', 'azzurro');
                            } else {
                                //AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaDistributore, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroLotto);
                                CaricaProdottoInMagazzino(idProdotto, quantitaDistributore, quantitaAggiornataMagazzino, prezzoTotaleDaCaricare, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, '', 'azzurro');
                            }
                        }
                        quantitaDaCaricare = quantitaDaCaricare - quantitaDistributore;
                    }
                    displayNumeriLottoDistributore(idDistributore, idProdotto, quantitaAggiornataDistributore);

            }, errorHandler);
                
        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }
}


function StoricizzoProdInTrasportoV2(IdProdotto, IdOperatore, quantitaDaSpostare, prezzoTotaleRimasti, idDidtributore, idCliente) {
    $.ajax({
                    type: "POST",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",                    
                    url: urlStoricizzoProdTrasportoV2,
                    cache: false,
                    async: true,
                    data: JSON.stringify({ IdProdotto: IdProdotto, IdOperatore: IdOperatore }),
                    error: function (data) {
                        console.log(data.responseText)
                    },
                    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
                    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
                    success: function (response) {
                        risultati = response.d;

                        //console.log(risultati);
                       
                        InsertProdottiInCamionV2(IdProdotto, quantitaDaSpostare, prezzoTotaleRimasti, IdOperatore, 1, idDidtributore, idCliente);
                    }

                });
}

function GetProdottiInCamionByIdProdotto(idMezzo, idProdotto) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiSuCamionByIdProdotto",        
        url: urlGetProdottiSuCamionByIdProdotto,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idMezzo: idMezzo, idProdotto: idProdotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        //beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        //complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //$(".menuPrincipale").hide();
            var quantita = 0;
            for (var i = 0; i < results.rows.length; i++) {
                quantita = (quantita + parseInt(risultati[i].quantitaTrasporto));
            }

            $('#quantInCamion-' + idProdotto).html(quantita);
            //$('.DettaglioDistributore').html(dettaglio);
            //AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, 'rosso');

        }

    });
}


function ConfermaResi(quantita) {
    var answer = confirm('Confermi che per questo articolo ci sono '+quantita + ' Resi?')
    if (!answer) {

        return 0;
    }
    else {
        return 1;
    }

    //var result = 0;

    //jConfirm('Confermi che per questo articolo ci sono dei Resi??', 'Conferma Resi', function (r) {
    //    //jAlert('Confirmed: ' + r, 'Confirmation Results');
    //    return r;
    //})

    //$("#dialogConfirmResi").dialog({
    //    resizable: false,
    //    height: 140,
    //    modal: true,
    //    buttons: {
    //        "OK": function () {
    //            $(this).dialog("close");
    //            result = 1;
    //            return result;
    //        },
    //        Cancel: function () {
    //            $(this).dialog("close");
    //            return result;
    //        }
    //    }
    //});
}


function SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, dataScadenza, codiceLotto) {

    
    var idCliente = 0;
    //Inserisco la quantita di Resi nel Magazzino Resi
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
           
            idProdotto = parseInt(idProdotto);
            quantitaResi = parseInt(quantitaResi);
            idOperatore = parseInt(idOperatore);
            t.executeSql("Insert into magazzinoresi (idProdotto, idDistributore, idCliente, quantita, prezzoTotale, idOperatore, dataScadenza, codiceLotto, numeroLotto, dataModifica) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [idProdotto, idDistributore, idCliente, quantitaResi, prezzoTotale, idOperatore, dataScadenza, codiceLotto, numeroLotto, dataModifica], function (transaction, results) {
            
            }, errorHandler);
        
            //console.log('inseriti in magazzino resi ' + quantitaResi + ' prodotti.');

        });

    function errorHandler(transaction, error) {
        console.log("Error : " + error.message);
    }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
    AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, 'rosso');
}


//Storicizzo la quantita di prodotto nel Distributore
function StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaVenduti, quantitaDistributore, quantitaRimasti, prezzo, idOperatore, numeroLotto, dataScadenza, codiceLotto, idSituazioneDistributore) {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var addedOn = dataOdierna();
            t.executeSql("UPDATE situazionedistributori set DataModifica = '" + addedOn + "', Modificato = 1 Where idSituazioneDistributore = ? ", [idSituazioneDistributore], function (transaction, results) {
               
            }, errorHandler);
            if (quantitaVenduti < quantitaDistributore) {
                var quantitaDaCaricare = (quantitaDistributore - quantitaVenduti);
                var prezzoParziale = (quantitaDaCaricare * prezzo);
                if (numeroLotto != "") {
                    numeroLotto = dataItaliana(numeroLotto);
                } else {
                    numeroLotto = null
                }
                if (dataScadenza != "") {
                    dataScadenza = dataItaliana(dataScadenza);
                } else {
                    dataScadenza = null;
                }
                t.executeSql("Insert into situazionedistributori (IdDistributore, IdProdotto, Quantita, PrezzoTotale, IdOperatore, NumeroLotto, colore, dataScadenza, codiceLotto) Values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [idDistributore, idProdotto, quantitaDaCaricare, prezzoParziale, idOperatore, numeroLotto, 'azzurro', dataScadenza, codiceLotto], function (transaction, results) {
                    if (results.rowsAffected > 0) {
                        displayNumeriLottoDistributore(idDistributore, idProdotto, quantitaRimasti);
                    }
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

//inserisco in un determinato Distributore una determinata quantita di Prodotto
function InsertProdottiInDistributore(idDistributore, idProdotto, quantita, quantitaAggiornata, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT, dataScadenza, codiceLotto, colore) {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
            if (numeroLotto != "") {
                numeroLotto = dataItaliana(numeroLotto);
            } else {
                numeroLotto = null
            }
            if (dataScadenza != "") {
                dataScadenza = dataItaliana(dataScadenza);
            } else {
                dataScadenza = null;
            }
            t.executeSql("Insert into situazionedistributori (IdDistributore, IdProdotto, Quantita, PrezzoTotale, IdOperatore, NumeroLotto, colore, dataScadenza, codiceLotto, numeroDDT, dataDDT) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, colore, dataScadenza, codiceLotto, numeroDDT, dataDDT], function (transaction, results) {
                //console.log(risultati);
                if (results.rowsAffected > 0) {
                    displayNumeriLottoMagazzino(0, 0);
                    displayNumeriLottoDistributore(idDistributore, idProdotto, quantitaAggiornata);
                }
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

function AggiornaQuantitaProdottoInDistributoreV3(idSituazioneDistributore, idDistributore, idProdotto, codiceLotto, numeroLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, colore) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlAggiornoQuantitaProdottiInDistributoreV3,
        cache: false,
        async: true,
        data: JSON.stringify({ idSituazioneDistributore: idSituazioneDistributore, idDistributore: idDistributore, idProdotto: idProdotto, codiceLotto: codiceLotto, numeroLotto: numeroLotto, quantita: quantita, prezzoTotale: prezzoTotale, dataModifica: dataModifica, dataScadenza: dataScadenza, modificato: modificato, idOperatore: idOperatore, colore: colore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati[0].codiceLotto);            

        }

    });

}



        