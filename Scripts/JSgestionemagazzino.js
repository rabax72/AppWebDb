$(function () {
    
});

function GestioneMagazzino() {
    location.hash = "gestioneMagazzino";
    $('#elencoGestioneMagazzino').html('Sto caricando i dati...');

    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "SELECT   DISTINCT prodotti.descrizione, " + 
            "prodotti.foto, " + 
            "prodotti.idprodotto,  " +
            "(select quantitaVecchia from magazzino where magazzino.idprodotto = prodotti.idprodotto and  magazzino.modificato = 0 and magazzino.smaltito = 0) as quantitaVecchia , " +
            "(select SUM( quantita) from magazzino where magazzino.idprodotto = prodotti.idprodotto and  modificato =0 and smaltito = 0) as quantita , " + 
            "prodotti.prezzo, " + 
            "(select magazzino.colore from magazzino where magazzino.idprodotto = prodotti.idprodotto and  modificato =0 and smaltito = 0 order by datainserimento desc limit 0,1) as colore " + 
            "FROM  prodotti LEFT OUTER JOIN magazzino ON prodotti.idprodotto = magazzino.idprodotto " + 
            "order by prodotti.ordine, prodotti.descrizione";
            t.executeSql(query, [], function (transaction, results) {
             
            var dettaglio = '<table id="tabellaProdottiDaGestire" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th  width="10%">Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Prezzo</th>' +
                                                '<th>Giacenza</th>' +
                                                //'<th>Lotto</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Prezzo</th>' +
                                                '<th>Giacenza</th>' +
                                                //'<th>Lotto</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var idProd = '';
            var idProdOld = '';
            var numLotto = '';
            var numLottoOld = '';
            var rigaDettaglio = new Array();
            var quantita = 0;
            var quantitaOld = 0;
            var quantitaTot = 0;

            var colore = "";
            var q = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                colore = row.colore;
                quantita = row.quantita;
                var quantitaVecchia = row.quantitaVecchia;
                if (quantita == null) {
                    quantita = 0;
                }
                dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"><a href="#popUpStoricoMagazzino" data-rel="popup" data-position-to="window" class="storicoScaricatoInMagazzino" data-idProdotto="' + row.IdProdotto + '" data-IdDistributore="' + row.IdDistributore + '"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
                dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + row.Foto + '"></td>';
                dettaglio = dettaglio + '<td class="descrizione' + row.IdProdotto + '">' + row.Descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + row.Prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="quantita ' + colore + ' quantMagazzino-' + row.IdProdotto + '">' + quantita + '</td>';
                //dettaglio = dettaglio + '<td><input type="text" id="lotto' + row.idProdotto + '" class="miniInput calendario" min="0"></td>';
                dettaglio = dettaglio + '<td><input type="number" id="carica' + row.IdProdotto + '" class="miniInput" min="0"><a href="#" data-descrizione="' + row.Descrizione + '" data-idProdotto="' + row.IdProdotto + '" data-foto="' + row.Foto + '" data-quantita="' + quantita + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzino ui-btnCarica">Carica</a></td>';

                if (parseInt(quantita) > 0) {
                    dettaglio = dettaglio + '<td><input type="number" id="scarica' + row.IdProdotto + '" class="miniInput" min="0"><a href="#" data-descrizione="' + row.Descrizione + '" data-IdMagazzino="' + row.IdMagazzino + '"  data-idProdotto="' + row.IdProdotto + '" data-quantita="' + quantita + '" data-quantitaVecchia="' + quantitaVecchia + '"data-prezzo="' + row.Prezzo + '" data-foto="' + row.Foto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdottoDaMagazzino ui-btnScarica">Scarica</a> </td>';
                }
                else {
                    dettaglio = dettaglio + '<td></td>';
                }

                dettaglio = dettaglio + '</tr>';

                //dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE GESTIONE MAGAZZINO" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica fineCarico" onclick="togliEvidenziatoMagazzino()" /></p>';

                $('#elencoGestioneMagazzino').html(dettaglio);

                $(".calendario").datepicker({
                    dateFormat: "dd-mm-yy"
                });

                $(".storicoScaricatoInMagazzino").on('click', function () {
                    var idProdotto = $(this).attr('data-idProdotto');
                   
                    GetStoricoMagazzinoByIdProd(idProdotto, 10);

                });

                var table = $('#tabellaProdottiDaGestire').DataTable(
                    { "paging": false, responsive: true }
                );

                $(".caricaProdottoInMagazzino").on('click', function () {
                    var idProdotto = $(this).attr('data-idProdotto');
                    var prezzo = $(this).attr('data-prezzo');
                    var tdQuantita = $(this).closest('td').prev('td');
                    var quantitaAttuale = $(this).closest('td').prev('td').text();
                    var idOperatore = localStorage.idOperatore;
                    var quantitaCaricati = $('#carica' + idProdotto).val();
                    //var numeroLotto = $('#lotto' + idProdotto).val();
                    var foto = $(this).attr('data-foto');
                    $(this).attr('data-rel', 'popup');
                    $(this).attr('data-position-to', 'window');
                    $(this).attr('href', '#popupCaricaMerceInMagazzino');

                    //if (numeroLotto == '') {
                    //    alert("Scegli un lotto prima di caricare!");
                    //    return;
                    //}
                    //numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");

                    if (quantitaCaricati == '' || isInteroPositivo(parseInt(quantitaCaricati)) == false) {
                        alert("Scegli un valore Numerico prima di caricare");
                        return;
                    }

                    var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
                    var prezzoTotaleCaricati = (prezzo * quantitaCaricati);

                    var finestraDati = '';
                    finestraDati = '<div style="padding:10px 20px;">';
                    finestraDati = finestraDati + '<h3>Carica in Magazzino</h3>';
                    finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + foto + '">';
                    finestraDati = finestraDati + '<label for="quantitaProdDaCaricareInMagazzino">Quantita:</label>';
                    finestraDati = finestraDati + '<input type="number" id="quantitaProdDaCaricareInMagazzino" data-theme="a" value="' + quantitaCaricati + '">';
                    finestraDati = finestraDati + '<label for="codiceLottoDaCaricareInMagazzino">Codice Lotto</label>';
                    finestraDati = finestraDati + '<input type="text" id="codiceLottoDaCaricareInMagazzino" data-theme="a">';
                    finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
                    finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
                    finestraDati = finestraDati + '<label for="dataScadenzaProdDaCaricareInMagazzino">Data Scadenza:</label>';
                    finestraDati = finestraDati + '<input type="text" id="dataScadenzaProdDaCaricareInMagazzino" data-theme="a">';
                    finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
                    finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
                    finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzinoDaPopUp">Carica</a>';
                    finestraDati = finestraDati + '</div>';

                    $("#popupCaricaMerceInMagazzino").html(finestraDati);

                    $("#popupCaricaMerceInMagazzino").bind({
                        popupafterclose: function (event, ui) {
                            //alert('chiuso');
                            //console.log(idProdotto);
                            $("#popupCaricaMerceInMagazzino").html('');
                            finestraDati = '';
                            $("#carica" + idProdotto).val('');
                        }
                    });

                    $("#dataScadenzaProdDaCaricareInMagazzino").datepicker({
                        dateFormat: "dd-mm-yy"
                    });

                    $("#numeroLotttoCaricareinMagazzino").datepicker({
                        dateFormat: "dd-mm-yy"
                    });

                    $(".caricaProdottoInMagazzinoDaPopUp").on('click', function () {
                        var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();
                        var quantitaCaricati = $("#quantitaProdDaCaricareInMagazzino").val();
                        var codiceLotto = $("#codiceLottoDaCaricareInMagazzino").val();
                        var dataScadenza = $("#dataScadenzaProdDaCaricareInMagazzino").val();

                        if (quantitaCaricati == '' || isInteroPositivo(parseInt(quantitaCaricati)) == false) {
                            alert("Scegli un valore Numerico prima di caricare");
                            return;
                        }

                        if (numeroLotto == '' && codiceLotto == '') {
                            alert('Inserire il Codice Lotto o il Numero Lotto!');
                            return;
                        }
                        //if (numeroLotto != '') {
                        //    numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");
                        //}

                        if (dataScadenza == '') {
                            alert('Data Scadenza è un campo obbligatorio!');
                            return;
                        }
                        //if (dataScadenza != '') {
                        //    dataScadenza = stringToDate(dataScadenza, "dd-MM-yyyy", "-");
                        //}

                        var note = $("#noteCaricareinMagazzino").val();
                        var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
                        //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                        //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                        var prezzoTotaleCaricati = (prezzo * quantitaCaricati);

                        //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
                        //return;

                        //CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, note);                    

                        CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, quantitaTotale, prezzoTotaleCaricati, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, note, 'azzurro', quantitaVecchia);

                        tdQuantita.animate({
                            backgroundColor: "#38c",
                            color: "#000"
                        }, 1000);
                        tdQuantita.html(quantitaTotale);

                        $('#carica' + idProdotto).val('');

                    });                    

                    //tdQuantita.animate({
                    //    backgroundColor: "#38c",
                    //    color: "#000"
                    //}, 1000);
                    //tdQuantita.html(quantitaTotale);

                });


                $(".scaricaProdottoDaMagazzino").on('click', function () {
                    var idProdotto = $(this).attr('data-idProdotto');
                    var quantitaDaScaricare = $('#scarica' + idProdotto).val();

                    if (quantitaDaScaricare == "" || isInteroPositivo(parseInt(quantitaDaScaricare)) == false) {
                        alert("Scegli un valore Numerico prima di scaricare");
                        return;
                    }

                    //var numeroLotto = $('#lotto' + idProdotto).val();

                    //if (numeroLotto == '') {
                    //    alert("Scegli un lotto prima di scaricare!");
                    //    return;
                    //}
                    //numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");

                    var quantitaAttuale = $(this).closest('td').prev('td').prev('td');
                    var giacenza = $(this).closest('td').prev('td').prev('td').text();
                    if (parseInt(quantitaDaScaricare) > parseInt(giacenza)) {
                        alert("Non puoi scaricare più di quanto presente in magazzino!");
                        return;
                    }
                    var prezzo = $(this).attr('data-prezzo');

                    var quantitaTotale = (parseInt(giacenza) - parseInt(quantitaDaScaricare));
                    var prezzoTotale = (prezzo * quantitaTotale);
                    var quantitaRimanente = (parseInt(giacenza) - parseInt(quantitaDaScaricare));
                    var idOperatore = localStorage.idOperatore;
                    //SmaltiscoProdottiDaMagazzino(idProdotto, quantitaTotale, prezzoTotale, numeroLotto, idOperatore, null, null, '', true, "rosso");                    

                    GetProdottiInMagazzinoByIdProdNumLotto(idProdotto, idOperatore, giacenza, quantitaDaScaricare, quantitaRimanente, prezzo, 1, "rosso");

                    quantitaAttuale.animate({
                        backgroundColor: "red",
                        color: "#000"
                    }, 1000);
                    quantitaAttuale.html(quantitaTotale);

                    $('#scarica' + idProdotto).val('');

                    //Non ricarica la pagina
                    //setTimeout(GestioneMagazzino, 3000);

                });

            }

            
            }, errorHandler);

        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
    }

    displayNumeriLottoMagazzino(0, 0);

    var pulsanteFineGestMagazzino = '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica fineCarico" onclick="togliEvidenziatoMagazzino()" /></p>';
    tabellaGestioneMagazzino = $('#elencoGestioneMagazzino').append(pulsanteFineGestMagazzino);

}


function displayNumeriLottoMagazzino(idProdotto, quantitaAggiornata) {
 
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
            "WHERE magazzino.modificato = 0 and magazzino.smaltito = 0 " + where + " ORDER BY prodotti.ordine, prodotti.descrizione, magazzino.datascadenza", parameter, function (transaction, results) {
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
                        $('.lottoMag' + row.IdProdotto).remove();
                    }
                    numeroLotto = dataItaliana(row.NumeroLotto);
                    dataScadenza = '';
                    if (row.DataScadenza != null) {
                        dataScadenza = dataItaliana(row.DataScadenza);
                    }

                    idProd = row.IdProdotto;

                    if (dataScadenza == dataScadenzaOld && idProd == idProdottoOld) {
                        if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                            numeroLotto = row.CodiceLotto;
                        }
                        quantitaLotto = (parseInt(quantitaLotto) + parseInt(row.Quantita));                        
                        rigaDettaglio[i - 1] = '';
                        rigaDettaglio[i] = '<div class="superMiniFont lottoMag' + row.IdProdotto + '">' + quantitaLotto + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                    } else {
                        if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                            numeroLotto = row.CodiceLotto;
                        }
                        if (idProd != idProdottoOld) {
                            $('.lottoMag' + row.IdProdotto).remove();
                        }
                        quantitaLotto = row.Quantita;
                        
                        rigaDettaglio[i] = '<div class="superMiniFont lottoMag' + row.IdProdotto + '">' + row.Quantita + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
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
                        $('.descrizione' + idProdottoOld).append(lotti);
                        if (i > 0) {
                            lotti = '';
                        }

                    }

                    //per far vedere i lotti nell'ultimo prodotto
                    if (i == results.rows.length - 1) {
                        if (i > 0) {
                            lotti = lotti + rigaDettaglio[i];
                        }
                        $('.descrizione' + idProdNew).append(lotti);
                    }

                    if (i > 0) {
                        lotti = lotti + rigaDettaglio[i];
                    }

                    idProdottoOld = idProdNew;
                }

                //Se aggiorno solo un prodotto
                if (idProdotto != '') {
                    $('.lottoMag' + idProdotto).remove();
                    $('.descrizione' + idProdotto).append(lotti);
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

function NumeriLottoMagazzino(transaction, results) {
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
        //if (idProdotto == 0 && quantitaAggiornata == 0) {

        //    $('.lottoMag' + row.IdProdotto).remove();
        //}
        numeroLotto = dataItaliana(row.NumeroLotto);
        dataScadenza = '';
        if (row.DataScadenza != null) {
            dataScadenza = dataItaliana(row.DataScadenza);
        }
        
        idProd = row.IdProdotto;

        if (dataScadenza == dataScadenzaOld && idProd == idProdottoOld) {
            if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                numeroLotto = row.CodiceLotto;
            }
            quantitaLotto = (parseInt(quantitaLotto) + parseInt(row.Quantita));
            //$('.descrizione' + row.IdProdotto).append('<div class="miniFont lottoMag' + row.IdProdotto + '">' + quantitaLotto + ' - ' + parseJsonDateLettura(row.NumeroLotto)+ '</div>');
            rigaDettaglio[i - 1] = '';
            rigaDettaglio[i] = '<div class="miniFont lottoMag' + row.IdProdotto + '">' + quantitaLotto + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
        } else {
            if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                numeroLotto = row.CodiceLotto;
            }
            if (idProd != idProdottoOld) {
                $('.lottoMag' + row.IdProdotto).remove();
            }
            quantitaLotto = row.Quantita;
            //$('.descrizione' + row.IdProdotto).append('<div class="miniFont lottoMag' + row.IdProdotto + '">' + row.Quantita + ' - ' + parseJsonDateLettura(row.NumeroLotto) + '</div>');
            rigaDettaglio[i] = '<div class="miniFont lottoMag' + row.IdProdotto + '">' + row.Quantita + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
        }
        numeroLottoOld = dataItaliana(row.NumeroLotto);
        dataScadenzaOld = '';
        if (row.DataScadenza != null) {
            dataScadenzaOld = dataItaliana(row.DataScadenza);
        }
        
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
            $('.descrizione' + idProdottoOld).append(lotti);
            if (i > 0) {
                lotti = '';
            }

        }

        if (i > 0) {
            lotti = lotti + rigaDettaglio[i];
        }

        idProdottoOld = idProdNew;
    }

    //Se aggiorno solo un prodotto
    //if (idProdotto != '') {
    //    $('.lottoMag' + idProdotto).remove();
    //    $('.descrizione' + idProdotto).append(lotti);
    //}
}

function GetStoricoMagazzinoByIdProd(idProd, numeroRecord) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "SELECT    prodotti.Descrizione, prodotti.Foto, magazzino.IdProdotto, magazzino.NumeroLotto, magazzino.Quantita, " +
                        "prodotti.Prezzo, magazzino.PrezzoTotale, magazzino.IdOperatore, magazzino.Id, magazzino.note," +
                        "magazzino.dataDDT, magazzino.numeroDDT, magazzino.DataInserimento " +
                        "FROM     magazzino INNER JOIN " +
                        "prodotti ON magazzino.IdProdotto = prodotti.IdProdotto " +
                        "WHERE    (magazzino.Modificato = 1) AND (magazzino.Quantita > 0) AND (magazzino.IdProdotto = ?) " +
                        "ORDER BY magazzino.DataInserimento desc LIMIT ?";
            t.executeSql(query, [idProd, numeroRecord], function (transaction, results) {

            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data</b></td><td><b>Quantità</b></td><td>Ripristina</td></tr>';

            var righe = '';
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                righe = righe + '<tr>';
                righe = righe + '<td>' + row.DataInserimento + '</td>';
                righe = righe + '<td>' + row.Quantita + '</td>';
                if (i == 0) {
                    righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnRipristina" data-idMagazzino="' + row.Id + '" data-idProdotto="' + row.IdProdotto + '" data-prezzoProdotto="' + row.Prezzo + '" data-quantExMagazzino="' + results.rows[0].Quantita + '">Ripristina</a></td>';
                } else {
                    righe = righe + '<td>&nbsp;</td>';
                }

                righe = righe + '</tr>';
            }

            storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

            var datiPopUpStorico = '<div style="padding:10px 20px;">';
            datiPopUpStorico = datiPopUpStorico + '<h2>Storico Magazzino</h2>';
            datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
            datiPopUpStorico = datiPopUpStorico + '</div>';
            //console.log(datiPopUpStorico);
            $("#popUpStoricoMagazzino").html(datiPopUpStorico);

            $(".btnRipristina").on('click', function () {
                var idMagazzino = $(this).attr('data-idMagazzino');
                var idProdotto = $(this).attr('data-idProdotto');
                //var prezzoProdotto = $(this).attr('data-prezzoProdotto');
                //var quantProdInDist = $(this).attr('data-quantProdInDist');
                var quantExMagazzino = $(this).attr('data-quantExMagazzino');
                var idOperatore = localStorage.idOperatore;                

                if (!confirm("Sicuro che vuoi procedere al ripristino di questa situazione di magazzino?")) return;

                CorrezioneMagazzinoByIdProd(idMagazzino, idProdotto);

                $("#popUpStoricoMagazzino").popup("close");

                $("#popUpStoricoMagazzino").bind({
                    popupafterclose: function (event, ui) {
                        //alert('chiuso');
                        //console.log(idProdotto);
                        $(".quantMagazzino-" + idProdotto).html(quantExMagazzino);
                    }
                });


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

function cambiaQuantitaGiacente(obj) {
    var lotto = obj.selectedIndex;
    //console.log(lotto);
    $('.quantitaGiacenteInMagazzino').prop("selectedIndex", lotto);
    $('#numeroDDTScaricareinMagazzino').prop("selectedIndex", lotto);
    $('#dataDDTScaricareinMagazzino').prop("selectedIndex", lotto);
    $('#noteScaricareinMagazzino').prop("selectedIndex", lotto);    
}


function CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, quantitaAggiornata, prezzoTotaleCaricati, idOperatore, codiceLotto, numeroLotto, dataScadenza, numeroDDT, dataDDT, note, colore, quantitaVecchia) {

    if (mydb) {

        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            if (numeroLotto != "") {
                numeroLotto = numeroLotto;
            } else {
                numeroLotto = null
            }
            if (dataScadenza != "") {
                dataScadenza = dataScadenza;
            } else {
                dataScadenza = null;
            }
            var parametri = [idProdotto, numeroLotto];
            var adesso = dataOdierna();
            var query = "Update magazzino set modificato = 1, syncro = 0, datamodifica = '" + adesso + "'  where idprodotto = ? and numerolotto = ?";
            if (numeroLotto == null) {
                query = "Update magazzino set modificato = 1, syncro = 0, datamodifica = '" + adesso + "'  where idprodotto = ? and codicelotto = ?";
                parametri = [idProdotto, codiceLotto];
            }

            t.executeSql(query, parametri, function (transaction, results) {
                //console.log(risultati);
               
            }, errorHandler);

        });
        
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            if (numeroLotto != "") {
                numeroLotto = numeroLotto;
            } else {
                numeroLotto = null
            }
            if (dataScadenza != "") {
                dataScadenza = dataScadenza;
            } else {
                dataScadenza = null;
            }
            
            t.executeSql("Insert into magazzino (idProdotto, quantita, prezzoTotale, idOperatore, codiceLotto, numeroLotto, dataScadenza, numeroDDT, dataDDT, note, colore, syncro, quantitaVecchia) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)", [idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, codiceLotto, numeroLotto, dataScadenza, numeroDDT, dataDDT, note, colore, quantitaVecchia], function (transaction, results) {
                //console.log(risultati);
                if (results.rowsAffected > 0) {
                    displayNumeriLottoMagazzino(0, 0);
                    if (numeroLotto == null) {
                        AggiornaVecchiaQuantita(idProdotto, codiceLotto, 2);
                    } else {
                        AggiornaVecchiaQuantita(idProdotto, numeroLotto, 1);
                    }
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


function GetProdottiInMagazzinoByIdProdNumLotto(idProdotto, idOperatore, quantitaAttuale, quantitaDaScaricare, quantitaRimanente, prezzo, smaltito, colore) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "SELECT magazzino.quantita, magazzino.numerolotto, magazzino.id, magazzino.CodiceLotto, magazzino.DataScadenza " +
                        "FROM  magazzino " +
                        "WHERE idprodotto = ? and modificato = 0 order by datascadenza";
            t.executeSql(query, [idProdotto], function (transaction, results) {

                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var codiceLotto = row.CodiceLotto;
                    var numLotto = row.NumeroLotto;
                    var dataScadenza = row.DataScadenza;
                    
                    if (smaltito) {
                        smaltito = 1;
                    } else {
                        smaltito = 0;
                    }
                    //numLotto = stringToDate(numLotto, 'dd-MM-yyyy', '-');
                    if (quantitaDaScaricare <= row.Quantita) {

                        SmaltiscoProdottoInMagazzinoV3(row.Id, idProdotto, idOperatore, quantitaDaScaricare, parseInt(row.Quantita), prezzo, quantitaAttuale, codiceLotto, numLotto, dataScadenza, smaltito, colore);
                        break;
                    } else {
                        SmaltiscoProdottoInMagazzinoV3(row.Id, idProdotto, idOperatore, quantitaDaScaricare, parseInt(row.Quantita), prezzo, quantitaAttuale, codiceLotto, numLotto, dataScadenza, smaltito, colore);
                    }
                    quantitaDaScaricare = parseInt(quantitaDaScaricare) - parseInt(row.Quantita);
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

function SmaltiscoProdottoInMagazzinoV3(idMagazzino, idProdotto, idOperatore, quantitaDaSmaltire, quantitaRimanente, prezzoProdotto, quantitaAggiornata, codiceLotto, numeroLotto, dataScadenza, smaltito, colore, quantitaVecchia) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            var dataModifica = dataOdierna();
            t.executeSql("UPDATE magazzino set DataModifica = '" + dataModifica + "', Modificato = 1, IdOperatore = ?, smaltito = ?, syncro = 0 Where id = ?", [idOperatore, smaltito, idMagazzino], function (transaction, results) {
            //console.log(risultati);
                        }, errorHandler);
           
            if (quantitaDaSmaltire < quantitaRimanente)
            {
                var quantitaDaCaricare = quantitaRimanente - quantitaDaSmaltire;
                var prezzoTotale = quantitaDaCaricare * prezzoProdotto;
                if (numeroLotto != "") {
                    numeroLotto = numeroLotto;
                } else {
                    numeroLotto = null
                }
                if (dataScadenza != "") {
                    dataScadenza = dataScadenza;
                } else {
                    dataScadenza = null;
                }
                t.executeSql("Insert into magazzino (IdProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, colore, numeroDDT, dataDDT, dataScadenza, codiceLotto, note, quantitaVecchia, syncro) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)", [idProdotto, quantitaDaCaricare, prezzoTotale, idOperatore, numeroLotto, colore, '', '', dataScadenza, codiceLotto, '', quantitaVecchia], function (transaction, results) {
                    //console.log(transaction);
                    //console.log(results);
                    if (results.rowsAffected > 0) {
                        displayNumeriLottoMagazzino(0, 0);
                        //if (numeroLotto == null) {
                        //    AggiornaVecchiaQuantita(idProdotto, codiceLotto, 2)
                        //} else {
                        //    AggiornaVecchiaQuantita(idProdotto, numeroLotto, 1)
                        //}
                        
                    }
                }, errorHandler);

                //CaricaProdottiInMagazzino(IdProdotto, quantitaDaCaricare, prezzoTotale, IdOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, "", colore);
            } 

        });

        

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
    
    
        
}
         

        