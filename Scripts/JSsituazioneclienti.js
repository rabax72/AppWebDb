$(function () {
    
});

function GetStoricoVendutoInCliente(IdCliente, idProd, numeroRecord, descCliente) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
            var query = "SELECT   IdProdotto, IdCliente, Quantita, PrezzoTotale, DataRilevazione, IdOperatore, IdCliente, VenditaDiretta, numeroDDT, DataDDT, idVendita, numeroLotto," +
                               "(SELECT sum(quantita) " +
                        "FROM situazioneclienti " +
                        "WHERE idCliente = ? " +
                        "AND idProdotto = ? " +
                        "AND modificato =0) as quantitaProdInCliente, " +
                    "(Select prezzo from prodotti where idprodotto = ?) as prezzoProdotto, " +
                    "codicelotto, datascadenza " +
                        "FROM    venduto " +
                        "WHERE        (IdCliente = ?) AND (IdProdotto = ?) " +
                        " ORDER BY DataRilevazione desc LIMIT ?";
            t.executeSql(query, [IdCliente, idProd, idProd, IdCliente, idProd, numeroRecord], function (transaction, results) {

                var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td><td>Cancella</td></tr>';

                var righe = '';
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    righe = righe + '<tr>';
                    righe = righe + '<td>' + row.DataRilevazione + '</td>';
                    righe = righe + '<td>' + row.Quantita + '</td>';
                    righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnCancella" data-idVendita="' + row.IdVendita + '" data-numeroLotto="' + row.NumeroLotto + '" data-idProdotto="' + row.IdProdotto + '" data-prezzoProdotto="' + row.prezzoProdotto + '" data-quantProdInCliente="' + row.quantitaProdInCliente + '" data-quantExVenduto="' + row.Quantita + '" data-codiceLotto="' + row.CodiceLotto + '" data-dataScadenza="' + row.DataScadenza + '">Cancella</a></td>';
                    righe = righe + '</tr>';
                }

                storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

                var datiPopUpStorico = '<div style="padding:10px 20px;">';
                datiPopUpStorico = datiPopUpStorico + '<h2>Storico Venduto</h2>';
                datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
                datiPopUpStorico = datiPopUpStorico + '</div>';
                //console.log(datiPopUpStorico);
                $("#popUpStoricoVendutoDaCliente").html(datiPopUpStorico);

                $(".btnCancella").on('click', function () {
                    var idVendita = $(this).attr('data-idVendita');
                    var idProdotto = $(this).attr('data-idProdotto');
                    var prezzoProdotto = $(this).attr('data-prezzoProdotto');
                    var quantProdInCliente = $(this).attr('data-quantProdInCliente');
                    var quantExVenduto = $(this).attr('data-quantExVenduto');
                    var idOperatore = localStorage.idOperatore;
                    var quantitaRimasti = (parseInt(quantProdInCliente) + parseInt(quantExVenduto));
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

                    //console.log("idCliente=" + idCliente + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                    //GetStoricoVendutoInCliente(idCliente, idProdotto, numeroLotto, 10);

                    if (!confirm("Sicuro che vuoi cancellare " + quantExVenduto + " pezzi di questo prodotto?")) return;

                    CorrezioneVendita(idVendita);
                    //adeguare la funzione a quella sotto                             

                    //StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantExVenduto, quantitaRimasti, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, null);
                    InsertProdottiInCliente(IdCliente, idProdotto, quantExVenduto, quantitaRimasti, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                    //setTimeout(GetSituazioneCliente(IdCliente, descCliente), 3000);                                                 

                    $('.quantProdInCliente-' + idProdotto).attr('data-quantitacliente', quantitaRimasti);

                    $("#popUpStoricoVendutoDaCliente").popup("close");

                    $("#popUpStoricoVendutoDaCliente").bind({
                        popupafterclose: function (event, ui) {
                            //alert('chiuso');
                            //console.log(idProdotto);
                            $(".quantProdInCliente-" + idProdotto).html(quantitaRimasti);
                        }
                    });

                    // GetStoricoVendutoInCliente(IdCliente, idProdotto, '', 10);
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

//function GetStoricoVendutoInCliente(IdCliente, idProd, numeroLotto, numeroRecord) {
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetSituazioneVendutoInCliente,
//        cache: false,
//        //jsonpCallback: 'risposta',
//        // jsonp: 'callback',
//        // dataType: "jsonp",            
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ idCliente: IdCliente, idProdotto: idProd, numeroLotto: numeroLotto, numeroRecord: numeroRecord }),
//        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
//        error: function (data) {
//            console.log(data.responseText);
            
//            alert(data.responseText);
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td><td>Cancella</td></tr>';

//            var righe = '';
//            for (var i = 0; i < risultati.length; i++) {
//                righe = righe + '<tr>';
//                righe = righe + '<td>' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
//                righe = righe + '<td>' + risultati[i].quantitaVenduto + '</td>';
//                righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnCancella" data-idVendita="' + risultati[i].IdVendita + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzoProdotto="' + risultati[i].prezzo + '" data-quantProdInCli="' + risultati[i].quantitaCliente + '" data-quantExVenduto="' + risultati[i].quantitaVenduto + '">Cancella</a></td>';
//                righe = righe + '</tr>';
//            }

//            storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

//            var datiPopUpStorico = '<div style="padding:10px 20px;">';
//            datiPopUpStorico = datiPopUpStorico + '<h2>Storico Venduto</h2>';
//            datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
//            datiPopUpStorico = datiPopUpStorico + '</div>';
//            //console.log(datiPopUpStorico);
//            $("#popUpStoricoVendutoDaCliente").html(datiPopUpStorico);            

//            $(".btnCancella").on('click', function () {
//                var idVendita = $(this).attr('data-idVendita');
//                var idProdotto = $(this).attr('data-idProdotto');
//                var prezzoProdotto = $(this).attr('data-prezzoProdotto');
//                var quantProdInCli = $(this).attr('data-quantProdInCli');
//                var quantExVenduto = $(this).attr('data-quantExVenduto');
//                var idOperatore = localStorage.idOperatore;
//                var quantitaRimasti = (parseInt(quantProdInCli) + parseInt(quantExVenduto));
//                var prezzoTotaleRimasti = (quantitaRimasti * prezzoProdotto);
//                //console.log("idCliente=" + idCliente + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
//                //GetStoricoVendutoInCliente(idCliente, idProdotto, numeroLotto, 10);

//                if (!confirm("Sicuro che vuoi cancellare " + quantExVenduto + " pezzi di questo prodotto?")) return;

//                CorrezioneVendita(idVendita);

//                StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, 'azzurro');

//                //setTimeout(GetSituazioneCliente(IdCliente, descCliente), 3000);                                                 

//                $("#popUpStoricoVendutoDaCliente").popup("close");

//                $("#popUpStoricoVendutoDaCliente").bind({
//                    popupafterclose: function (event, ui) {
//                        //alert('chiuso');
//                        //console.log(idProdotto);
//                        $(".quantProdInCli-" + idProdotto).html(quantitaRimasti);
//                    }
//                });

//                // GetStoricoVendutoInDistributore(IdDistributore, idProdotto, '', 10);
//            });
//        }

//    });
//}

function GetSituazioneCliente(IdCliente, descCliente) {
    location.hash = "formDettaglioCliente";
    //ElencoMezziPerDistributori();

    $(".caricaDaCamion").attr("data-IdCliente", IdCliente);
    $(".caricaDaCamion").attr("data-descCliente", descCliente);
    $(".h1DettCliente").html(descCliente);

    $('.DettaglioCliente').html('Sto caricando i dati...');

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT DISTINCT  prodotti.Descrizione," +
                                                "prodotti.Foto, " +
                                                "prodotti.IdProdotto, " +
                                                "IFNULL((select SUM( quantita) from magazzino where magazzino.IdProdotto = prodotti.IdProdotto and  modificato =0 and smaltito = 0),0) as quantitaMagazzino, " +
                                                "prodotti.Prezzo, " +
                                                "(select situazioneclienti.colore from situazioneclienti where situazioneclienti.IdProdotto = prodotti.IdProdotto and  modificato =0 and situazioneclienti.IdCliente = ? order by datainserimento desc limit 1) as colore," +
                                                "IFNULL((select SUM( quantita) from situazioneclienti where situazioneclienti.IdProdotto = prodotti.IdProdotto and  modificato =0 and situazioneclienti.IdCliente = ?),0) as quantitaCliente " +
                                    "FROM        prodotti LEFT OUTER JOIN " +
                                                "magazzino ON prodotti.IdProdotto = magazzino.IdProdotto LEFT OUTER JOIN " +
                                                "situazioneclienti ON situazioneclienti.IdProdotto = prodotti.IdProdotto   " +
                                    "order by prodotti.ordine, prodotti.Descrizione", [IdCliente, IdCliente], function (transaction, results) {

                                        var dettaglio = '<table id="tabellaDettaglioCliente" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th width="10%">Foto</th>' +
                                                '<th width="17%">Mag.</th>' +
                                                '<th width="18%">Quant. Cli.</th>' +
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
                                                '<th>Quant. Cli.</th>' +
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
                                            //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneCliente).val();
                                            //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);
                                            var row = results.rows.item(i);
                                            idProd = row.IdProdotto;
                                            //numLotto = row.NumeroLotto;
                                            quantita = row.quantitaCliente;
                                            coloreEvidenziato = row.colore;

                                            var evidenziato = "";
                                            if (row.caricato) {
                                                evidenziato = "verde";
                                            }

                                            prodotti[i] = idProd;
                                            dettaglio = dettaglio + '<tr>';
                                            dettaglio = dettaglio + '<td width="10%" align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"><a href="#popUpStoricoVendutoDaCliente" data-rel="popup" data-position-to="window" class="storicoVendutoDaCliente" data-idProdotto="' + row.IdProdotto + '" data-IdCliente="' + row.IdCliente + '" data-numeroLotto=""><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
                                            dettaglio = dettaglio + '<td width="17%" class="descrizione' + row.IdProdotto + '">' + row.Descrizione + '<br><br><div id="quantMagazzino' + row.IdProdotto + '" class="quantitaMag" data-quantitaMagazzino="' + row.quantitaMagazzino + '">' + row.quantitaMagazzino + '</div></td>';
                                            dettaglio = dettaglio + '<td width="18%" class="quantita ' + coloreEvidenziato + ' quantProdInCliente-' + row.IdProdotto + '" data-quantitaCliente="' + row.quantitaCliente + '">' + row.quantitaCliente + '</td>';
                                            dettaglio = dettaglio + '<td width="15%"><div class="nomeCliente">Rimasti</div> <input type="number" id="rimastoCliente' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
                                            dettaglio = dettaglio + '<td width="10%"><div class="medioFont" style="margin-bottom:9px;">Resi</div> <input type="number" id="resoCliente' + row.IdProdotto + '" data-clear-btn="true" class="miniInput"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
                                            dettaglio = dettaglio + '<td width="20%"><div class="medioFont" style="margin-bottom:9px;">Carica</div> <input type="number" id="caricaCliente' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" data-quantMagazzino="' + row.quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaCliente ui-btnCaricaDaMagazzino">Salva</a></td>';
                                            dettaglio = dettaglio + '<td width="10%"><div class="medioFont" style="margin-bottom:9px;">Scarica</div> <input type="number" id="spostaCliente' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" data-quantMagazzino="' + row.quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaCliente ui-btnSposta">Salva</a></td>';
                                            //dettaglio = dettaglio + '<td><input type="checkbox" data-role="flipswitch" name="flip-checkbox-' + row.IdProdotto + '" id="flip-checkbox-' + row.IdProdotto + '" data-on-text="Camion" data-off-text="Cliente" data-wrapper-class="custom-size-flipswitch" checked=""><span id="quantInCamion-' + row.IdProdotto + '" class="quantSuCamion">0</span> <input type="number" id="spostaCliente' + row.IdProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaCliente ui-btnSposta">Salva</a></td>';
                                            dettaglio = dettaglio + '</tr>';
                                        }

                                        dettaglio = dettaglio + '</tbody> </table>';
                                        var desc = descCliente;
                                        desc = desc.replace("'", "\\'");
                                        desc = '\'' + desc + '\'';
                                        dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCarica fineCarico" onclick="togliEvidenziatoCliente(' + IdCliente + ', ' + desc + ')" /></p>';

                                        $('.DettaglioCliente').html(dettaglio);


                                        displayNumeriLottoMagazzino(0, 0);

                                        displayNumeriLottoCliente(IdCliente, 0, quantita);

                                        $(".storicoVendutoDaCliente").on('click', function () {
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            
                                            var numeroLotto = $(this).attr('data-numeroLotto');
                                            //console.log("numeroLotto=" + numeroLotto + "---");
                                            numeroLotto = stringToDate(numeroLotto, 'dd/mm/yyyy', '/');
                                            //console.log("IdCliente=" + IdCliente + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                                            //GetStoricoVendutoInCliente(IdCliente, idProdotto, numeroLotto, 10);
                                            GetStoricoVendutoInCliente(IdCliente, idProdotto, 10, desc);

                                        });

                                        var table = $('#tabellaDettaglioCliente').DataTable(
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
                                           
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var prezzo = $(this).attr('data-prezzo');
                                            //var quantitaAttuale = $(this).closest('td').prev('td').text();
                                            var quantitaAttuale = $(this).closest('td').prev('td').attr('data-quantitaCliente');
                                            var quantitaRimasti = $('#rimastoCliente' + idProdotto).val();
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
                                            //if (!confirm("Sicuro che sul Cliente sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;
                                            GetProdottiInClientePerRimasti(IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzo, idOperatore);

                                            //SalvaRimasti(IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore);

                                            var labelQuantita = $(this).closest('td').prev('td');
                                            //console.log(labelQuantita);
                                            //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                                            //labelQuantita.css("background-color", "green");
                                            labelQuantita.animate({
                                                backgroundColor: "#38c",
                                                color: "#000"
                                            }, 1000);
                                            labelQuantita.html(quantitaRimasti);

                                            $('.quantProdInCliente-' + idProdotto).attr('data-quantitacliente', quantitaRimasti);

                                            //azzero il campo
                                            $('#rimastoCliente' + idProdotto).val('');

                                            //var labelVenduto = $(this).closest('td').next('td').next('td');
                                            //labelVenduto.animate({
                                            //    backgroundColor: "green",
                                            //    color: "#000"
                                            //}, 1000);
                                            //labelVenduto.html(quantitaVenduti);
                                        });

                                        $(".resi").on('click', function () {
                                      
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var prezzo = $(this).attr('data-prezzo');
                                            var quantitaResi = $('#resoCliente' + idProdotto).val();
                                            //var quantitaCliente = $(this).closest('td').prev('td').prev('td').text();
                                            var quantitaCliente = $(this).closest('td').prev('td').prev('td').attr('data-quantitaCliente');
                                            var prezzoTotaleResi = (prezzo * quantitaResi);
                                            var idOperatore = localStorage.idOperatore;
                                            var quantitaRimasti = (quantitaCliente - quantitaResi);
                                            var prezzoTotaleRimasti = (prezzo * quantitaRimasti);

                                            if (parseInt(quantitaResi) > parseInt(quantitaCliente)) {
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
                                            //alert('IdSituazioneCliente=' + IdSituazioneCliente + ' IdCliente=' + IdCliente + ' idProdotto=' + idProdotto + ' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta + 'prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                                            //return;

                                            //if (!confirm("Sicuro che sono da rendere " + quantitaResi + " pezzi di questo prodotto?")) return;

                                            //SalvaResi(IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);                                           
                                            GetProdottiInClientePerResi(IdCliente, idProdotto, quantitaResi, quantitaRimasti, prezzoTotaleResi, prezzoTotaleRimasti, idOperatore);
                                            $('#resoCliente' + idProdotto).val('');

                                            var labelQuantita = $(this).closest('td').prev('td').prev('td');
                                            //console.log(labelQuantita);                
                                            $('.quantProdInCliente-' + idProdotto).attr('data-quantitacliente', quantitaRimasti);

                                            labelQuantita.animate({
                                                backgroundColor: "red",
                                                color: "#000"
                                            }, 1000);

                                            labelQuantita.html(quantitaRimasti);
                                        });

                                        $('.caricaCliente').on('click', function () {
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var quantitaDaCaricare = $('#caricaCliente' + idProdotto).val();
                                            var quantMagazzino = $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino');
                                            var quantitaRimasti = (quantMagazzino - quantitaDaCaricare);
                                            var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td');
                                            var TDquantitaCliente = $('.quantProdInCliente-' + idProdotto);
                                            var quantitaCliente = $('.quantProdInCliente-' + idProdotto).attr('data-quantitaCliente');
                                            var quantitaAggiornataMagazzino = (parseInt(quantMagazzino) - parseInt(quantitaDaCaricare));
                                            var quantitaAggiornataCliente = (parseInt(quantitaDaCaricare) + parseInt(quantitaCliente));
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

                                            GetProdottiInMagazzinoPerCaricareCliente(IdCliente, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataCliente, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore);

                                            TDquantitaCliente.html(quantitaAggiornataCliente);
                                            giacenza.html(quantitaRimasti);
                                            $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino', quantitaRimasti);
                                            $('.quantProdInCliente-' + idProdotto).attr('data-quantitacliente', quantitaAggiornataCliente);
                                            $('#caricaCliente' + idProdotto).val('');

                                            labelQuantita.animate({
                                                backgroundColor: "green",
                                                color: "#000"
                                            }, 1000);

                                            giacenza.animate({
                                                backgroundColor: "green",
                                                color: "#000"
                                            }, 1000);

                                        });

                                        $('.spostaCliente').on('click', function () {
                                            var idProdotto = $(this).attr('data-idProdotto');
                                            var quantitaDaSpostare = $('#spostaCliente' + idProdotto).val();
                                            var quantitaCliente = $('.quantProdInCliente-' + idProdotto).attr('data-quantitaCliente');
                                            var tdQuantitaCliente = $('.quantProdInCliente-' + idProdotto);
                                            // var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');                
                                            var prezzo = $(this).attr('data-prezzo');
                                            //var quantMagazzino = $(this).attr('data-quantMagazzino');
                                            var quantMagazzino = $('#quantMagazzino' + idProdotto).attr('data-quantitamagazzino');

                                            var giacenza = $('#quantMagazzino' + idProdotto);
                                            var quantRestanteCliente = (parseInt(quantitaCliente) - parseInt(quantitaDaSpostare));
                                            var quantRestante = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
                                            var quantitaAggiornataMagazzino = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
                                            var quantitaAggiornataCliente = (parseInt(quantitaCliente) - parseInt(quantitaDaSpostare));
                                            var prezzoTotaleRimasti = (prezzo * quantRestante);
                                            var prezzoTotaleRimastiCliente = (prezzo * (parseInt(quantitaCliente) - parseInt(quantitaDaSpostare)));
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

                                            if (parseInt(quantitaDaSpostare) > parseInt(quantitaCliente)) {
                                                alert("E' impossibile scaricare più prodotti di quelli presenti nel Cliente!");
                                                //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                                                $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                                                return;
                                            } else {
                                                $(this).prev().removeClass("evidenziaErrore");
                                            }

                                            GetProdottiInMagazzinoPerScaricareCliente(IdCliente, idProdotto, quantitaDaSpostare, quantRestanteCliente, quantitaAggiornataMagazzino, quantitaAggiornataCliente, prezzoTotaleDaSpostare, prezzoTotaleRimastiCliente, idOperatore);

                                            $('#spostaCliente' + idProdotto).val('');
                                            $('#quantMagazzino' + idProdotto).attr('data-quantitaMagazzino', quantitaAggiornataMagazzino);
                                            $('.quantProdInCliente-' + idProdotto).attr('data-quantitacliente', quantRestanteCliente);
                                            tdQuantitaCliente.html(quantRestanteCliente);

                                            tdQuantitaCliente.animate({
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


//function GetSituazioneCliente(IdCliente, descCliente) {
//    location.hash = "formDettaglioCliente";
    

//    $(".caricaDaCamionPerCliente").attr("data-IdCliente", IdCliente);
//    $(".caricaDaCamionPerCliente").attr("data-descCliente", descCliente);
//    $(".h1DettCliente").html('Dettaglio Cliente: ' + descCliente);

//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneClienteV2",        
//        url: urlGetSituazioneClienteV2,
//        cache: false,
//        //jsonpCallback: 'risposta',
//        // jsonp: 'callback',
//        // dataType: "jsonp",            
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ IdCliente: IdCliente }),
//        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;
//            //corsiGlobal = response.d;
//            //console.log('Caricati!');
//            //console.log(Ordinanze);
//            //console.log(risultati);

//            //$(".menuPrincipale").hide();      
//            //if (risultati.length > 0) {
//            //    $(".h1DettCliente").html('Dettaglio Cliente: ' + risultati[0].descrizioneCliente);
//            //}

//            var dettaglio = '<table id="tabellaDettaglioCliente" class="display" cellspacing="0" width="100%">' +
//                                        '<thead>' +
//                                            '<tr>' +                                                
//                                               '<th width="10%">Foto</th>' +
//                                                '<th width="15%">Mag.</th>' +
//                                                '<th width="20%">Quant. Cli.</th>' +
//                                                '<th width="20%">Vendita</th>' +
//                                                '<th width="15%">Rimasti</th>' +
//                                                '<th width="10%">Resi</th>' +                                                
//                                                '<th width="10%">Scarica</th>' +
//                                            '</tr>' +
//                                        '</thead>' +
//                                        '<tfoot>' +
//                                            '<tr>' +                                              
//                                                '<th>Foto</th>' +
//                                                '<th>Mag.</th>' +
//                                                '<th>Quant. Cli.</th>' +
//                                                '<th>Vendita</th>' +
//                                                '<th>Rimasti</th>' +
//                                                '<th>Resi</th>' +
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
//            for (var i = 0; i < risultati.length; i++) {
//                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
//                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);

//                idProd = risultati[i].idProdotto;
//                numLotto = risultati[i].numeroLotto;
//                quantita = risultati[i].quantitaDistributore;                
//                coloreEvidenziato = risultati[i].colore;
                 
//                var evidenziato = "";
//                if (risultati[i].caricato) {
//                    evidenziato = "verde";
//                }

//                prodotti[i] = idProd;
//                dettaglio = dettaglio + '<tr>';
//                dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"><a href="#popUpStoricoVendutoDaCliente" data-rel="popup" data-position-to="window" class="storicoVendutoDaCliente" data-idProdotto="' + risultati[i].idProdotto + '"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
//                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><br><div id="quantMagazzino' + risultati[i].idProdotto + '" class="quantitaMag">' + risultati[i].quantitaMagazzino + '</div></td>';
//                dettaglio = dettaglio + '<td class="quantita ' + coloreEvidenziato + ' quantProdInCli-' + risultati[i].idProdotto + '">' + risultati[i].quantitaCliente + '</td>';
//                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Vendita</div> <input type="number" id="caricaCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-quantMagazzino="' + risultati[i].quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaCliente ui-btnCaricaDaMagazzino">Salva</a></td>';
//                dettaglio = dettaglio + '<td><div class="medioFont">Rimasti</div> <input type="number" id="rimastoCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimastiCliente ui-btnCarica">Salva</a> </td>';
//                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Resi</div> <input type="number" id="resoCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';                
//                //dettaglio = dettaglio + '<td><input type="checkbox" data-role="flipswitch" name="flip-checkbox-' + risultati[i].idProdotto + '" id="flip-checkbox-' + risultati[i].idProdotto + '" data-on-text="Camion" data-off-text="Cliente" data-wrapper-class="custom-size-flipswitch" checked=""><span id="quantInCamionCliente-' + risultati[i].idProdotto + '" class="quantSuCamion"></span> <input type="number" id="spostaCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaCliente ui-btnSposta">Salva</a></td>';
//                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Scarica</div> <input type="number" id="spostaCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-quantMagazzino="' + risultati[i].quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaCliente ui-btnSposta">Salva</a></td>';
//                dettaglio = dettaglio + '</tr>';
//            }    

//            dettaglio = dettaglio + '</tbody> </table>';
//            var desc = descCliente;
//            desc = desc.replace("'", "\\'");
//            desc = '\'' + desc + '\'';
//            dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCarica fineCarico" onclick="togliEvidenziatoCliente(' + IdCliente + ', ' + desc + ')" /></p>';

//            //console.log(dettaglio);
//            $('.DettaglioCliente').html(dettaglio);
            
//            var table = $('#tabellaDettaglioCliente').DataTable(
//                {
//                    "paging": false, responsive: true, "fnDrawCallback": function () {
//                        $(this).trigger('create');
//                    }
//                }
//            );

//            for (var i = 0; i < prodotti.length; i++) {
//                GetProdottiInCamionPerClienteByIdProdotto(1, prodotti[i]);
//            }

//            $(".storicoVendutoDaCliente").on('click', function () {
//                var idProdotto = $(this).attr('data-idProdotto');
               
//                //console.log("IdCliente=" + IdCliente + ", idProdotto=" + idProdotto );
//                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
//                GetStoricoVendutoInCliente(IdCliente, idProdotto, '', 10);

//            });

//            $('.caricaCliente').on('click', function () {
//                var idProdotto = $(this).attr('data-idProdotto');
//                var quantitaDaCaricare = $('#caricaCliente' + idProdotto).val();
//                var quantMagazzino = $('#quantMagazzino' + idProdotto).text();
//                var quantRestante = (quantMagazzino - quantitaDaCaricare);
//                var labelQuantita = $(this).closest('td').prev('td');
//                var quantitaAggiornata = (parseInt(quantitaDaCaricare) + parseInt(labelQuantita.text()));
//                var prezzo = $(this).attr('data-prezzo');
//                var prezzoTotale = (prezzo * quantRestante);
//                var prezzoTotaleProdCaricato = (prezzo * quantitaDaCaricare);
//                var idOperatore = localStorage.idOperatore;
//                var giacenza = $('#quantMagazzino' + idProdotto);

//                if (quantitaDaCaricare == "" || isInteroPositivo(parseInt(quantitaDaCaricare)) == false) {
//                    alert("Scegli un valore Numerico per indicare quanto caricare!");
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                if (parseInt(quantitaDaCaricare) > parseInt(quantMagazzino)) {
//                    alert("E' impossibile che siano più prodotti da caricare di quelli presenti in magazzino!");
//                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                //console.log('idProdotto=' + idProdotto + ' quantRestante=' + quantRestante + ' prezzoTotale=' + prezzoTotale);
//                //return;

//                //if (!confirm("Sicuro che vuoi caricare " + quantitaDaCaricare + " pezzi di questo prodotto?")) return;

//                SmaltiscoProdottiDaMagazzinoV2(idProdotto, quantRestante, prezzoTotale, idOperatore, false, 'verde');
                
//                if (parseInt(quantitaDaCaricare) > 0) {
//                    InsertProdottiInCliente(IdCliente, idProdotto, quantitaDaCaricare, prezzoTotaleProdCaricato, idOperatore, 'verde');                    
//                }

//                labelQuantita.html(quantitaAggiornata);
//                giacenza.html(quantRestante);

//                $('#caricaCliente' + idProdotto).val('');

//                labelQuantita.animate({
//                    backgroundColor: "green",
//                    color: "#000"
//                }, 1000);

//                giacenza.animate({
//                    backgroundColor: "green",
//                    color: "#000"
//                }, 1000);

//            });

//            $(".rimastiCliente").on('click', function () {

//                var IdSituazioneCliente = $(this).attr('data-IdSituazioneCliente');                
//                var idProdotto = $(this).attr('data-idProdotto');
//                var prezzo = $(this).attr('data-prezzo');
//                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
//                var quantitaRimasti = $('#rimastoCliente' + idProdotto).val();
//                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
//                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
//                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
//                var idOperatore = localStorage.idOperatore;                

//                if (quantitaRimasti == "") {
//                    alert("Scegli un valore Numerico prima di caricare");
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

//                //if (!confirm("Sicuro che al cliente sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;

//                SalvaRimastiCliente(IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore);

//                var labelQuantita = $(this).closest('td').prev('td').prev('td');
//                //console.log(labelQuantita);

//                $('#rimastoCliente' + idProdotto).val('');
                
//                labelQuantita.animate({
//                    backgroundColor: "#38c",
//                    color: "#000"
//                }, 1000);
//                labelQuantita.html(quantitaRimasti);
//            });

//            $(".resi").on('click', function () {

//                //var IdSituazioneCliente = $(this).attr('data-IdSituazioneCliente');
//                //var IdCliente = $(this).attr('data-IdCliente');
//                var idProdotto = $(this).attr('data-idProdotto');
//                var prezzo = $(this).attr('data-prezzo');
//                var quantitaResi = $('#resoCliente' + idProdotto).val();
//                var quantitaDist = $(this).closest('td').prev('td').prev('td').prev('td').text();
//                var prezzoTotale = (prezzo * quantitaResi);
//                var idOperatore = localStorage.idOperatore;
//                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
//                //var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
//                var quantitaRimasta = (quantitaDist - quantitaResi);
                
//                //if (quantitaResi == "" || isInteroPositivo(parseInt(quantitaResi)) == false) {
//                //    alert("Scegli un valore Numerico prima di caricare");
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

//                //if (!confirm("Sicuro che il cliente ti ha reso " + quantitaResi + " pezzi di questo prodotto?")) return;

//                SalvaResiCliente(IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore);

//                $('#resoCliente' + idProdotto).val('');

//                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td');
//                //console.log(labelQuantita);
//                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
//                //labelQuantita.css("background-color", "green");
//                labelQuantita.animate({
//                    backgroundColor: "red",
//                    color: "#000"
//                }, 1000);
                
//                labelQuantita.html(quantitaRimasta);
//            });
            
//            $('.spostaCliente').on('click', function () {
//                var idProdotto = $(this).attr('data-idProdotto');
//                var quantitaDaSpostare = $('#spostaCliente' + idProdotto).val();
//                //var quantCamion = $('#quantInCamionCliente-' + idProdotto);
//                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
//                var prezzo = $(this).attr('data-prezzo');
//                var giacenza = $('#quantMagazzino' + idProdotto);
//                var quantMagazzino = $('#quantMagazzino' + idProdotto).text();
//                var quantRestante = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
//                var prezzoTotaleRimasti = (prezzo * quantRestante);
//                var prezzoTotaleRimastiDistributore = (prezzo * (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare)));

//                var idOperatore = localStorage.idOperatore;

//                //var direzione = $('#flip-checkbox-' + idProdotto).is(':checked');

//                if (quantitaDaSpostare == "" || isInteroPositivo(parseInt(quantitaDaSpostare)) == false) {
//                    alert("Scegli un valore Numerico per indicare quanto scaricare!");
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }

//                if (parseInt(quantitaDaSpostare) > parseInt(labelQuantita.text())) {
//                    alert("E' impossibile spostare più prodotti di quelli presenti dal Cliente!");
//                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                    return;
//                } else {
//                    $(this).prev().removeClass("evidenziaErrore");
//                }
//                var quantRestanteDistributore = (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare));
//                //var quantRestanteCamion = (parseInt(quantCamion.text()) + parseInt(quantitaDaSpostare));

//                StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore, 'arancio');
//                storicizzaProdottoInMagazzino(idProdotto, idOperatore, '', true, quantRestante, prezzoTotaleRimasti);

//                labelQuantita.html(quantRestanteDistributore);                

//                $('#spostaCliente' + idProdotto).val('');

//                labelQuantita.animate({
//                    backgroundColor: "#FFA500",
//                    color: "#000"
//                }, 1000);

//                giacenza.html(quantRestante);
//                giacenza.animate({
//                    backgroundColor: "#FFA500",
//                    color: "#000"
//                }, 1000);

//                //if (!confirm("Sicuro che vuoi spostare " + quantitaDaSpostare + " pezzi di questo prodotto?")) return;

//                //if (direzione) {
//                //    if (parseInt(quantitaDaSpostare) > parseInt(labelQuantita.text())) {
//                //        alert("E' impossibile spostare più prodotti di quelli presenti dal Cliente!");
//                //        //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                //        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                //        return;
//                //    } else {
//                //        $(this).prev().removeClass("evidenziaErrore");
//                //    }
//                //    var quantRestanteDistributore = (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare));
//                //    var quantRestanteCamion = (parseInt(quantCamion.text()) + parseInt(quantitaDaSpostare));

//                //} else {
//                //    if (parseInt(quantitaDaSpostare) > parseInt(quantCamion.text())) {
//                //        alert("E' impossibile spostare più prodotti di quelli presenti sul camion!");
//                //        //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
//                //        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

//                //        return;
//                //    } else {
//                //        $(this).prev().removeClass("evidenziaErrore");
//                //    }
//                //    var quantRestanteDistributore = (parseInt(labelQuantita.text()) + parseInt(quantitaDaSpostare));
//                //    var quantRestanteCamion = (parseInt(quantCamion.text()) - parseInt(quantitaDaSpostare));
//                //    //InsertProdottiInCamionV2(idProdotto, quantitaDaSpostare, prezzoTotaleRimastiCamion, idOperatore, 1);
//                //}
//                //var prezzoTotaleRimastiDistributore = (prezzo * quantRestanteDistributore);
//                //var prezzoTotaleRimastiCamion = (prezzo * quantRestanteCamion);

//                //StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore);
//                //StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore, 'arancio');
//                //StoricizzoProdInTrasportoV2(idProdotto, idOperatore, quantRestanteCamion, prezzoTotaleRimastiCamion, 0, IdCliente);

//                //labelQuantita.html(quantRestanteDistributore);
//                //quantCamion.html(quantRestanteCamion);

//                //labelQuantita.animate({
//                //    backgroundColor: "#FFA500",
//                //    color: "#000"
//                //}, 1000);

//                //quantCamion.animate({
//                //    backgroundColor: "#FFA500",
//                //    color: "#000"
//                //}, 1000);

//            });
//        }

//    });

//}

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

function SalvaRimastiCliente(IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore) {

    StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, 'azzurro');
    
    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('IdCliente=' + IdCliente + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    //if (quantitaRimasti > 0) {
    //    InsertProdottiInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);
    //}
       
    //Inserisco la quantita di Prodotti Venduti
    var VenditaDiretta = 0;
    var idDistributore = 0;

    if (parseInt(quantitaVenduti) > 0) {
        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, IdCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta);        
    }
    

    //****************************************************************** 

    //GetSituazioneCliente(IdCliente, null);
}

function SalvaResiCliente(idCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, dataScadenza, codiceLotto) {

    var idDistributore = 0;
    //Inserisco la quantita di Resi nel Magazzino Resi
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();

            idProdotto = parseInt(idProdotto);
            quantitaResi = parseInt(quantitaResi);
            idOperatore = parseInt(idOperatore);
            t.executeSql("Insert into magazzinoresi (idProdotto, idDistributore, idCliente, quantita, prezzoTotale, idOperatore, dataScadenza, codiceLotto, numeroLotto, dataModifica) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [idProdotto, idDistributore, idCliente, quantitaResi, prezzoTotale, idOperatore, dataScadenza, codiceLotto, numeroLotto, dataModifica], function (transaction, results) {
                if (results.rowsAffected > 0) {
                    displayNumeriLottoCliente(idCliente, 0, quantitaRimasta);
                }
            }, errorHandler);

            //console.log('inseriti in magazzino resi ' + quantitaResi + ' prodotti.');

        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
    AggiornaColoreProdottoInCliente(idCliente, idProdotto, 'rosso');
}

//function SalvaResiCliente(IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore) {    
    
//    StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, 'rosso');
//    //alert(' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta);

//    //if (quantitaRimasta > 0) {
//    //    InsertProdottiInCliente(IdCliente, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT);
//    //}

//    var idDistributore = 0;
//    //Inserisco la quantita di Resi nel Magazzino Resi
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResiV2",        
//        url: urlAggiornaQuantitaProdottiInMagazzinoResiV2,
//        cache: false,
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ idProdotto: idProdotto, idDistributore:idDistributore, IdCliente: IdCliente, quantita: quantitaResi, prezzoTotale: prezzoTotale, idOperatore: idOperatore }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati);
//            //$(".menuPrincipale").hide();

//            //$('.DettaglioDistributore').html(dettaglio);

//            //GetSituazioneDistributore(IdCliente);
//        }

//    });
//    //******************************************************************   
    
//    //GetSituazioneCliente(IdCliente, null);
//}

//Storicizzo la quantita di prodotto in possesso di un dato cliente
function StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaVenduti, quantitaCliente, quantitaRimasti, prezzo, idOperatore, numeroLotto, dataScadenza, codiceLotto, idSituazioneCliente) {

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var addedOn = dataOdierna();
            t.executeSql("UPDATE situazioneclienti set DataModifica = '" + addedOn + "', Modificato = 1 Where idSituazioneCliente = ? ", [idSituazioneCliente], function (transaction, results) {

            }, errorHandler);
            if (quantitaVenduti < quantitaCliente) {
                var quantitaDaCaricare = (quantitaCliente - quantitaVenduti);
                var prezzoParziale = (quantitaDaCaricare * prezzo);
                if (numeroLotto == "") {                 
                    numeroLotto = null
                }
                if (dataScadenza == "") {                   
                    dataScadenza = null;
                }
                t.executeSql("Insert into situazioneclienti (IdCliente, IdProdotto, Quantita, PrezzoTotale, IdOperatore, NumeroLotto, colore, dataScadenza, codiceLotto) Values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [idCliente, idProdotto, quantitaDaCaricare, prezzoParziale, idOperatore, numeroLotto, 'azzurro', dataScadenza, codiceLotto], function (transaction, results) {
                    if (results.rowsAffected > 0) {
                        displayNumeriLottoCliente(idCliente, 0, quantitaRimasti);
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

//function StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, colore) {
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInClienteV2",        
//        url: urlStoricizzaStatoProdottoInClienteV2,
//        cache: false,
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ idCliente: idCliente, idProdotto: idProdotto}),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;
//            //console.log(risultati);
//            if (parseInt(quantitaRimasti) > 0) {
//                InsertProdottiInCliente(idCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, colore);
//            }
//        }

//    });
//    //******************************************************************
//}

//inserisco in un determinato Cliente una determinata quantita di Prodotto
function InsertProdottiInCliente(idCliente, idProdotto, quantita, quantitaAggiornata, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT, dataScadenza, codiceLotto, colore) {

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
            t.executeSql("Insert into situazioneclienti (IdCliente, IdProdotto, Quantita, PrezzoTotale, IdOperatore, NumeroLotto, colore, dataScadenza, codiceLotto, numeroDDT, dataDDT) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [idCliente, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, colore, dataScadenza, codiceLotto, numeroDDT, dataDDT], function (transaction, results) {
                //console.log(risultati);
                if (results.rowsAffected > 0) {
                    displayNumeriLottoMagazzino(0, 0);
                    displayNumeriLottoCliente(idCliente, 0, quantitaAggiornata);
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

//function InsertProdottiInCliente(IdCliente, idProdotto, quantita, prezzoTotale, idOperatore, colore) {

//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInClienteV2",        
//        url: urlAggiornaQuantitaProdottoInClienteV2,
//        cache: false,
//        async: true,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ IdCliente: IdCliente, idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati);
//            AggiornaColoreProdottoInCliente(IdCliente, idProdotto, colore);
//        }

//    });
//}

function GetProdottiInCamionPerClienteByIdProdotto(idMezzo, idProdotto) {
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
            for (var i = 0; i < risultati.length; i++) {
                quantita = (quantita + parseInt(risultati[i].quantitaTrasporto));
            }

            $('#quantInCamionCliente-' + idProdotto).html(quantita);          

        }

    });
}

function displayNumeriLottoCliente(idCliente, idProdotto, quantitaCliente) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var parameter = [idCliente];
            var where = "";
            if (idProdotto != 0) {
                parameter = [idCliente, idProdotto];
                where = " and situazioneclienti.idProdotto = ? ";
            }
            t.executeSql("SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazioneclienti.NumeroLotto, " +
                        "situazioneclienti.quantita, situazioneclienti.IdCliente, situazioneclienti.DataScadenza, situazioneclienti.CodiceLotto, situazioneclienti.IdSituazioneCliente " +
                        "FROM prodotti " +
                        "LEFT OUTER JOIN situazioneclienti situazioneclienti ON prodotti.IdProdotto = situazioneclienti.IdProdotto " +
                        "WHERE situazioneclienti.modificato = 0 and " +
                        "situazioneclienti.IdCliente = ? " + where + " ORDER BY prodotti.ordine, prodotti.Descrizione, situazioneclienti.DataScadenza ", parameter, function (transiction, results) {

                            var idProd = 0;
                            var idProdottoOld = 0;
                            var numLotti = '';
                            var numeroLotto = '';
                            var numeroLottoOld = '';
                            var dataScadenza = '';
                            var dataScadenzaOld = '';
                            var quantitaLotto = 0;

                            $('.quantProdInCliente-' + idProdotto).html(quantitaCliente);
                            $('.quantProdInCliente-' + idProdotto).attr('data-quantitaCliente', quantitaCliente);
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
                                    rigaDettaglio[i] = '<div class="miniFont lottoCliente' + row.IdProdotto + '">' + quantitaLotto + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                                } else {
                                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                                        numeroLotto = row.CodiceLotto;
                                    }
                                    if (idProd != idProdottoOld) {
                                        $('.lottoCliente' + row.IdProdotto).remove();
                                    }
                                    quantitaLotto = row.Quantita;
                                    //$('.Descrizione' + row.IdProdotto).append('<div class="miniFont lottoMag' + row.IdProdotto + '">' + row.QuantitaMagazzino + ' - ' + parseJsonDateLettura(row.NumeroLotto) + '</div>');
                                    rigaDettaglio[i] = '<div class="miniFont lottoCliente' + row.IdProdotto + '">' + row.Quantita + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                                }
                                numeroLottoOld = dataItaliana(row.NumeroLotto);
                                dataScadenzaOld = dataItaliana(row.DataScadenza);
                                idProdottoOld = row.IdProdotto;
                            }
                            idProdottoOld = 0;
                            var lottiCliente = '';
                            for (var i = 0; i < results.rows.length; i++) {
                                var row2 = results.rows.item(i);
                                if (i == 0) {
                                    lotti = rigaDettaglio[i];
                                }
                                if (row2.IdProdotto != idProdottoOld) {
                                    //if (results.rows.length == 1) {
                                    //    $('.quantProdInCliente-' + row.IdProdotto).append(lotti);
                                    //} else {
                                    $('.quantProdInCliente-' + idProdottoOld).append(lotti);
                                    //}
                                    //if (results.rows.length == 1) {
                                    //    $('.quantProdInCliente-' + row2.IdProdotto).append(lotti);
                                    //}
                                    if (i > 0) {
                                        lotti = '';
                                    }

                                }
                                if (i > 0) {
                                    lotti = lotti + rigaDettaglio[i];
                                }
                                if (i == results.rows.length - 1) {
                                    $('.quantProdInCliente-' + row2.IdProdotto).append(lotti);
                                }
                                idProdottoOld = row2.IdProdotto;
                            }

                            if (idProdotto != 0) {
                                $('.lottoCliente' + idProdotto).remove();
                                $('.quantProdInCliente-' + idProdotto).append(lotti);
                            }

                        });
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

function GetProdottiInMagazzinoPerCaricareCliente(idCliente, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataCliente, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore) {
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
                                //var idCliente = 0;
                                var VenditaDiretta = 0;
                                if (quantitaDaCaricare <= quantitaMagazzino) {

                                    SmaltiscoProdottoInMagazzinoV3(row.Id, idProdotto, idOperatore, quantitaDaCaricare, parseInt(quantitaMagazzino), row.Prezzo, quantitaAggiornataMagazzino, codiceLotto, numeroLotto, dataScadenza, true, 'rosso');

                                    InsertProdottiInCliente(idCliente, idProdotto, quantitaDaCaricare, quantitaAggiornataCliente, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                                    break;
                                } else {

                                    SmaltiscoProdottoInMagazzinoV3(row.Id, idProdotto, idOperatore, quantitaDaCaricare, parseInt(quantitaMagazzino), row.Prezzo, quantitaAggiornataMagazzino, codiceLotto, numeroLotto, dataScadenza, true, 'rosso');
                                    if (quantitaDaCaricare <= quantitaMagazzino) {

                                        InsertProdottiInCliente(idCliente, idProdotto, quantitaDaCaricare, quantitaAggiornataCliente, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
                                    } else {

                                        InsertProdottiInCliente(idCliente, idProdotto, quantitaMagazzino, quantitaAggiornataCliente, prezzoTotaleDaCaricare, idOperatore, numeroLotto, null, null, dataScadenza, codiceLotto, 'azzurro');
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

function GetProdottiInMagazzinoPerScaricareCliente(idCliente, idProdotto, quantitaDaCaricare, quantitaRimasti, quantitaAggiornataMagazzino, quantitaAggiornataCliente, prezzoTotaleDaCaricare, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {

            var oggi = dataOdierna();
            t.executeSql("SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazioneclienti.NumeroLotto, " +
                            "situazioneclienti.quantita, situazioneclienti.IdCliente, situazioneclienti.DataScadenza, situazioneclienti.CodiceLotto, situazioneclienti.IdSituazioneCliente " +
                            "FROM prodotti " +
                            "LEFT OUTER JOIN situazioneclienti situazioneclienti ON prodotti.IdProdotto = situazioneclienti.IdProdotto " +
                            "WHERE situazioneclienti.modificato = 0 and " +
                            "situazioneclienti.IdCliente = ? AND situazioneclienti.idprodotto = ? ORDER BY situazioneclienti.DataScadenza ", [idCliente, idProdotto], function (transaction, results) {

                                var idProdottoOld = 0;
                                var numLotti = '';
                                var dataScadenza = '';
                                var codiceLotto = '';
                                var quantitaCliente = 0;
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

                                    quantitaCliente = row.Quantita;
                                    var IdSituazioneCliente = row.IdSituazioneCliente;
                                    
                                    var VenditaDiretta = 0;
                                    if (quantitaDaCaricare <= quantitaCliente) {

                                        StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaDaCaricare, quantitaCliente, quantitaAggiornataCliente, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneCliente);

                                        CaricaProdottoInMagazzino(idProdotto, quantitaDaCaricare, quantitaAggiornataMagazzino, prezzoTotaleDaCaricare, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, '', 'azzurro');
                                        break;
                                    } else {
                                        StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaDaCaricare, quantitaCliente, quantitaAggiornataCliente, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneCliente);
                                        if (quantitaDaCaricare <= quantitaCliente) {
                                            //AggiornaQuantitaProdottiVenduti(idProdotto, idCliente, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroLotto);
                                            CaricaProdottoInMagazzino(idProdotto, quantitaDaCaricare, quantitaAggiornataMagazzino, prezzoTotaleDaCaricare, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, '', 'azzurro');
                                        } else {
                                            //AggiornaQuantitaProdottiVenduti(idProdotto, idCliente, idCliente, quantitaCliente, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroLotto);
                                            CaricaProdottoInMagazzino(idProdotto, quantitaCliente, quantitaAggiornataMagazzino, prezzoTotaleDaCaricare, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, '', 'azzurro');
                                        }
                                    }
                                    quantitaDaCaricare = quantitaDaCaricare - quantitaCliente;
                                }
                                displayNumeriLottoCliente(idCliente, 0, quantitaAggiornataCliente);

                            }, errorHandler);

        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}
       
function GetProdottiInClientePerRimasti(idCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {

            var query = "SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazioneclienti.NumeroLotto, " +
                            "situazioneclienti.quantita, situazioneclienti.IdCliente, situazioneclienti.DataScadenza, situazioneclienti.CodiceLotto, situazioneclienti.IdSituazioneCliente " +
                            "FROM prodotti " +
                            "LEFT OUTER JOIN situazioneclienti situazioneclienti ON prodotti.IdProdotto = situazioneclienti.IdProdotto " +
                            "WHERE situazioneclienti.modificato = 0 and " +
                            "situazioneclienti.IdCliente = ? and situazioneclienti.IdProdotto = ?  ORDER BY prodotti.ordine, prodotti.Descrizione, situazioneclienti.DataScadenza ";
            t.executeSql(query, [idCliente, idProdotto], function (transaction, results) {
                var idProdottoOld = 0;
                var numLotti = '';
                var dataScadenza = '';
                var codiceLotto = '';
                var quantitaCliente = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var lotti = '<br>Lotti: ';
                    numLotti = dataItaliana(row.NumeroLotto);
                    //var numeroLotto = stringToDate(numLotti, 'dd-MM-yyyy', '-');
                    var numeroLotto = row.NumeroLotto;
                    dataScadenza = row.DataScadenza;
                    //dataScadenza = stringToDate(dataScadenza, 'dd-MM-yyyy', '-');
                    codiceLotto = row.CodiceLotto;
                    var IdSituazioneCliente = row.IdSituazioneCliente;
                    if (codiceLotto == null) {
                        codiceLotto = '';
                    }

                    quantitaCliente = row.Quantita;
                    //var quantitaDaInserire = quantitaCliente - quantitaVenduti;
                    //}

                    var idDistributore = 0;
                    var VenditaDiretta = 0;
                    if (quantitaVenduti <= quantitaCliente) {

                        StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaVenduti, quantitaCliente, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneCliente);

                        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                        break;
                    } else {
                        StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaVenduti, quantitaCliente, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneCliente);
                        if (quantitaVenduti <= quantitaCliente) {
                            AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                        } else {
                            AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaCliente, prezzoTotaleVenduti, idOperatore, VenditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                        }
                    }
                    quantitaVenduti = quantitaVenduti - quantitaCliente;
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

function GetProdottiInClientePerResi(idCliente, idProdotto, quantitaResi, quantitaRimasti, prezzoTotaleResi, prezzoTotaleRimasti, idOperatore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {

            var query = "SELECT DISTINCT prodotti.IdProdotto, prodotti.Descrizione, situazioneclienti.NumeroLotto, " +
                            "situazioneclienti.quantita, situazioneclienti.IdCliente, situazioneclienti.DataScadenza, situazioneclienti.CodiceLotto, situazioneclienti.IdSituazioneCliente " +
                            "FROM prodotti " +
                            "LEFT OUTER JOIN situazioneclienti situazioneclienti ON prodotti.IdProdotto = situazioneclienti.IdProdotto " +
                            "WHERE situazioneclienti.modificato = 0 and " +
                            "situazioneclienti.IdCliente = ? and situazioneclienti.IdProdotto = ?  ORDER BY prodotti.ordine, prodotti.Descrizione, situazioneclienti.DataScadenza ";
            t.executeSql(query, [idCliente, idProdotto], function (transaction, results) {
                var idProdottoOld = 0;
                var numLotti = '';
                var dataScadenza = '';
                var codiceLotto = '';
                var quantitaCliente = 0;
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
                    var IdSituazioneCliente = row.IdSituazioneCliente;
                    //if (numLotti == '02-01-1') {
                    //    //$('.quantProdInDist-' + row.IdProdotto).append('<div class="miniFont">' + row.quantitaClienteNull + ' - Lotto: nessun lotto</div>');
                    //    //console.log('quantita: ' + row.quantitaClienteNull);
                    //    quantitaCliente = row.quantitaClienteNull;
                    //} else {
                    //$('.quantProdInDist-' + row.IdProdotto).append('<div class="miniFont">' + row.quantitaCliente + ' - Lotto: ' + parseJsonDateLettura(row.NumeroLotto + '</div>'));
                    //console.log('quantita: ' + row.quantitaCliente);
                    quantitaCliente = row.Quantita;
                    //}
                    
                    var VenditaDiretta = 0;
                    if (quantitaResi <= quantitaCliente) {

                        StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaResi, quantitaCliente, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneCliente);
                        //AggiornaQuantitaProdottiVenduti(idProdotto, idCliente, idCliente, quantitaResi, prezzoTotaleResi, idOperatore, VenditaDiretta, numeroLotto);
                        SalvaResiCliente(idCliente, idProdotto, quantitaResi, quantitaResi, prezzoTotaleResi, idOperatore, numeroLotto, dataScadenza, codiceLotto);
                        break;
                    } else {
                        StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaResi, quantitaCliente, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, dataScadenza, codiceLotto, IdSituazioneCliente);
                        if (quantitaResi <= quantitaCliente) {
                            SalvaResiCliente(idCliente, idProdotto, quantitaResi, quantitaResi, prezzoTotaleResi, idOperatore, numeroLotto, dataScadenza, codiceLotto);
                        } else {
                            SalvaResiCliente(idCliente, idProdotto, quantitaCliente, quantitaResi, prezzoTotaleResi, idOperatore, numeroLotto, dataScadenza, codiceLotto);
                        }
                    }
                    quantitaResi = quantitaResi - quantitaCliente;
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