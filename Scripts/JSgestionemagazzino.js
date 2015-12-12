$(function () {
    
});

function GestioneMagazzino() {
    location.hash = "gestioneMagazzino";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/urlGetProdottiDaGestireInMagazzino",        
        url: urlGetProdottiDaGestireInMagazzino,
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

            //console.log(risultati);
            //$(".menuPrincipale").hide();

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
            for (var i = 0; i < risultati.length; i++) {
                colore = risultati[i].colore;
                quantita = risultati[i].quantitaMagazzino;
                //var lotto = parseJsonDateLettura(risultati[i].numeroLotto);
                //if (lotto == '02-01-1') {
                //    lotto = '';
                //}
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"><a href="#popUpStoricoMagazzino" data-rel="popup" data-position-to="window" class="storicoScaricatoInMagazzino" data-idProdotto="' + risultati[i].idProdotto + '" data-IdDistributore="' + risultati[i].IdDistributore + '"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
                dettaglio = dettaglio + '<td class="descrizione' + risultati[i].idProdotto + '">' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="quantita ' + colore + ' quantMagazzino-' + risultati[i].idProdotto + '">' + quantita + '</td>';
                //dettaglio = dettaglio + '<td><input type="text" id="lotto' + risultati[i].idProdotto + '" class="miniInput calendario" min="0"></td>';
                dettaglio = dettaglio + '<td><input type="number" id="carica' + risultati[i].idProdotto + '" class="miniInput" min="0"><a href="#" data-descrizione="' + risultati[i].descrizione + '" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + quantita + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzino ui-btnCarica">Carica</a></td>';
                
                if (parseInt(quantita) > 0) {
                    dettaglio = dettaglio + '<td><input type="number" id="scarica' + risultati[i].idProdotto + '" class="miniInput" min="0"><a href="#" data-descrizione="' + risultati[i].descrizione + '" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdottoDaMagazzino ui-btnScarica">Scarica</a> </td>';
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
                    //var idDistributore = IdDistributore;
                    //var numeroLotto = $(this).attr('data-numeroLotto');
                    //console.log("numeroLotto=" + numeroLotto + "---");
                    //numeroLotto = stringToDate(numeroLotto, 'dd/mm/yyyy', '/');
                    //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                    //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
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

                        if (numeroLotto == '' && codiceLotto =='') {
                            alert('Inserire il Codice Lotto o il Numero Lotto!');
                            return;
                        }
                        if (numeroLotto != '') {
                            numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");
                        }

                        if (dataScadenza == '') {
                            alert('Data Scadenza è un campo obbligatorio!');
                            return;
                        }
                        if (dataScadenza != '') {
                            dataScadenza = stringToDate(dataScadenza, "dd-MM-yyyy", "-");
                        }                        
                                        
                        var note = $("#noteCaricareinMagazzino").val();
                        var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
                        //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                        //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                        var prezzoTotaleCaricati = (prezzo * quantitaCaricati);                    
                                        
                        //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
                        //return;

                        //CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, note);                    

                        CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, quantitaTotale, prezzoTotaleCaricati, idOperatore, codiceLotto, numeroLotto, dataScadenza, null, null, note, 'azzurro');
                                            
                        tdQuantita.animate({
                            backgroundColor: "#38c",
                            color: "#000"
                        }, 1000);
                        tdQuantita.html(quantitaTotale);

                        $('#carica' + idProdotto).val('');

                    });

                    //CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, quantitaTotale, prezzoTotaleCaricati, idOperatore, numeroLotto, null, null, '', 'azzurro');

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
                    var quantitaRimanente  = (parseInt(giacenza) - parseInt(quantitaDaScaricare));
                    var idOperatore = localStorage.idOperatore;
                    //SmaltiscoProdottiDaMagazzino(idProdotto, quantitaTotale, prezzoTotale, numeroLotto, idOperatore, null, null, '', true, "rosso");
                   // SmaltiscoProdottiDaMagazzinoV2(idProdotto, quantitaTotale, prezzoTotale, idOperatore, true, "rosso");
                   
                    GetProdottiInMagazzinoByIdProdNumLotto(idProdotto, idOperatore, giacenza, quantitaDaScaricare, quantitaRimanente, prezzo, true, "rosso");

                    quantitaAttuale.animate({
                        backgroundColor: "red",
                        color: "#000"
                    }, 1000);
                    quantitaAttuale.html(quantitaTotale);

                    

                    //Non ricarica la pagina
                    //setTimeout(GestioneMagazzino, 3000);
                    
                });

            }

            displayNumeriLottoMagazzino(0, 0);

            var pulsanteFineGestMagazzino = '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica fineCarico" onclick="togliEvidenziatoMagazzino()" /></p>';
            tabellaGestioneMagazzino = $('#elencoGestioneMagazzino').append(pulsanteFineGestMagazzino);
        }
    });

}

function displayNumeriLottoMagazzino(idProdotto, quantitaAggiornata) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urldisplayNumeriLottoMagazzino,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto  }),        
        error: function (data) {
            console.log(data.responseText);            
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            $('#scarica' + idProdotto).val('');
            if (quantitaAggiornata > 0) {
                $('#quantMagazzino' + idProdotto).html(quantitaAggiornata);
                $('#quantMagazzino' + idProdotto).attr('data-quantitamagazzino', quantitaAggiornata);
                $('.lottoMag' + idProdotto).remove();
            }
            var idProd = 0;
            var idProdottoOld = 0;
            var numeroLotto = '';
            var numeroLottoOld = '';
            var quantitaLotto = 0;
            var lotti = '';
            var dataScadenza = '';
            var dataScadenzaOld = '';
            var rigaDettaglio = new Array();
            for (var i = 0; i < risultati.length; i++) {
                if (idProdotto == 0 && quantitaAggiornata == 0) {
                  
                    $('.lottoMag' + risultati[i].idProdotto).remove();
                }
                numeroLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                dataScadenza = parseJsonDateLettura(risultati[i].dataScadenza);
                idProd = risultati[i].idProdotto;

                if (dataScadenza == dataScadenzaOld && idProd == idProdottoOld) {
                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                        numeroLotto = risultati[i].codiceLotto;
                    }
                    quantitaLotto = (parseInt(quantitaLotto) + parseInt(risultati[i].quantitaMagazzino));
                    //$('.descrizione' + risultati[i].idProdotto).append('<div class="miniFont lottoMag' + risultati[i].idProdotto + '">' + quantitaLotto + ' - ' + parseJsonDateLettura(risultati[i].numeroLotto)+ '</div>');
                    rigaDettaglio[i - 1] = '';
                    rigaDettaglio[i] = '<div class="miniFont lottoMag' + risultati[i].idProdotto + '">' + quantitaLotto + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                } else {
                    if (numeroLotto == '02-01-1' || numeroLotto == '02-01-1901') {
                        numeroLotto = risultati[i].codiceLotto;
                    }
                    if (idProd != idProdottoOld) {
                        $('.lottoMag' + risultati[i].idProdotto).remove();
                    }
                    quantitaLotto = risultati[i].quantitaMagazzino;
                    //$('.descrizione' + risultati[i].idProdotto).append('<div class="miniFont lottoMag' + risultati[i].idProdotto + '">' + risultati[i].quantitaMagazzino + ' - ' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div>');
                    rigaDettaglio[i] = '<div class="miniFont lottoMag' + risultati[i].idProdotto + '">' + risultati[i].quantitaMagazzino + ' / ' + dataScadenza + ' / L:' + numeroLotto + '</div>';
                }
                numeroLottoOld = parseJsonDateLettura(risultati[i].numeroLotto);
                dataScadenzaOld = parseJsonDateLettura(risultati[i].dataScadenza);
                idProdottoOld = risultati[i].idProdotto;                                
            }
            idProdottoOld = 0;
            var idProdNew = 0;
            for (var i = 0; i < risultati.length; i++) {
                idProdNew = risultati[i].idProdotto;
                if (i == 0) {
                    lotti =  rigaDettaglio[i];
                }
                if (idProdNew != idProdottoOld) {
                    //lotti = lotti + rigaDettaglio[i];
                    $('.descrizione' + idProdottoOld).append(lotti);
                    if (i > 0) {
                        lotti = '';
                    }
                    
                }

                ////per far vedere i lotti nell'ultimo prodotto
                //if (i == risultati.length - 1) {
                //    lotti = lotti + rigaDettaglio[i];
                //    $('.descrizione' + idProdNew).append(lotti);
                //}

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
            

        }

    });
}

function GetStoricoMagazzinoByIdProd(idProd, numeroRecord) {
    //console.log('idProd=' + idProd);
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetStoricoMagazzinoByIdProd,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProd, numeroRecord: numeroRecord }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText);
            //$("#tuttiDistributori").html(data.responseText);
            alert(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            
            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data</b></td><td><b>Quantità</b></td><td>Ripristina</td></tr>';
            
            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + '<tr>';
                righe = righe + '<td>' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                righe = righe + '<td>' + risultati[i].quantitaMagazzino + '</td>';
                if (i==0) {
                    righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnRipristina" data-idMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzoProdotto="' + risultati[i].prezzo + '" data-quantExMagazzino="' + risultati[0].quantitaMagazzino + '">Ripristina</a></td>';
                }else{
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
                //var quantitaRimasti = (parseInt(quantProdInDist) + parseInt(quantExVenduto));
                //var prezzoTotaleRimasti = (quantitaRimasti * prezzoProdotto);
                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);

                if (!confirm("Sicuro che vuoi procedere al ripristino di questa situazione di magazzino?")) return;

                CorrezioneMagazzinoByIdProd(idMagazzino, idProdotto);

                //CorrezioneVendita(idVendita);

                //StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore);

                //setTimeout(GetSituazioneDistributore(IdDistributore, descDistributore), 3000);                                                 

                $("#popUpStoricoMagazzino").popup("close");

                $("#popUpStoricoMagazzino").bind({
                    popupafterclose: function (event, ui) {
                        //alert('chiuso');
                        //console.log(idProdotto);
                        $(".quantMagazzino-" + idProdotto).html(quantExMagazzino);
                    }
                });
                                
               // GetStoricoVendutoInDistributore(IdDistributore, idProdotto, '', 10);
            });
        }

    });
}

function cambiaQuantitaGiacente(obj) {
    var lotto = obj.selectedIndex;
    //console.log(lotto);
    $('.quantitaGiacenteInMagazzino').prop("selectedIndex", lotto);
    $('#numeroDDTScaricareinMagazzino').prop("selectedIndex", lotto);
    $('#dataDDTScaricareinMagazzino').prop("selectedIndex", lotto);
    $('#noteScaricareinMagazzino').prop("selectedIndex", lotto);    
}

function GetProdottiDaScaricareDaMagazzino(idProdotto, quantitaAttuale) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiDaScaricareDaMagazzino",        
        url: urlGetProdottiDaScaricareDaMagazzino,
        cache: false,                   
        async: true,        
        data: JSON.stringify({ idProdotto: idProdotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var numeriLotti = '';
            var quantitaGiacente = '';
            var numeriDDT = '';
            var dateDDT = '';
            var noteDDT = '';
            var foto2 = '';            
            var numLotto = '';
            var numLottoOld = '';
            var quantitaTot = 0;            
            for (var i = 0; i < risultati.length; i++) {
                if (risultati[i].quantitaMagazzino > 0) {
                    numLotto = risultati[i].numeroLotto;
                    if (numLotto != numLottoOld) {
                        quantitaTot = risultati[i].quantitaMagazzino;
                        numeriLotti = numeriLotti + '<option>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</option>';
                        quantitaGiacente = quantitaGiacente + '<option>' + quantitaTot + '</option>';
                        numeriDDT = numeriDDT + '<option>' + risultati[i].numeroDDT + '</option>';
                        dateDDT += '<option>' + parseJsonDateLettura(risultati[i].dataDDT) + '</option>';
                        noteDDT = noteDDT + '<option>' + risultati[i].Note + '</option>';
                    } else {
                        quantitaTot = (quantitaTot + risultati[i].quantitaMagazzino);
                        numeriLotti = '<option>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</option>';
                        quantitaGiacente = '<option>' + quantitaTot + '</option>';
                        numeriDDT = '<option>' + risultati[i].numeroDDT + '</option>';
                        dateDDT = '<option>' + parseJsonDateLettura(risultati[i].dataDDT) + '</option>';
                        noteDDT = '<option>' + risultati[i].Note + '</option>';
                    }
                    
                    foto2 = risultati[i].foto;
                    var prezzo = risultati[i].prezzo;
                    numLottoOld = risultati[i].numeroLotto;
                }
                //else {
                //    var finestraDati = '<div style="padding:10px 20px;">';
                //    finestraDati = finestraDati + '<h3>Non è possibile scaricare un prodotto che risulta a 0 nel magazzino!</h3>';
                //    finestraDati = finestraDati + '</div>';

                //    $("#popupScaricaMerceDaMagazzino").html(finestraDati);
                //    return;
                //}
            }

            var finestraDati = '<div style="padding:10px 20px;">';
            finestraDati = finestraDati + '<h3>Scarica da Magazzino</h3>';
            finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + foto2 + '">';
            finestraDati = finestraDati + '<br><br>Scegli il Lotto da scaricare: <select onchange="cambiaQuantitaGiacente(this)" class="lottoSpecifico">' + numeriLotti + '</select>';
            finestraDati = finestraDati + '<label for="quantitaProdDaScaricareDaMagazzino">Quantita da scaricare:</label>';
            finestraDati = finestraDati + '<input type="number" id="quantitaProdDaScaricareDaMagazzino" data-theme="a">';
            finestraDati = finestraDati + '<br><br>Giacenza: <select disabled class="quantitaGiacenteInMagazzino">' + quantitaGiacente + '</select><br><br>';
            finestraDati = finestraDati + '<label for="numeroDDTScaricareinMagazzino">Numero DDT</label>';
            finestraDati = finestraDati + '<select disabled id="numeroDDTScaricareinMagazzino">' + numeriDDT + '</select>';
            finestraDati = finestraDati + '<label for="dataDDTScaricareinMagazzino">Data DDT:</label>';
            finestraDati = finestraDati + '<select disabled id="dataDDTScaricareinMagazzino">' + dateDDT + '</select>';
            finestraDati = finestraDati + '<label for="noteScaricareinMagazzino">Note:</label>';
            finestraDati = finestraDati + '<select disabled id="noteScaricareinMagazzino">' + noteDDT + '</select>';
            finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdottoDaMagazzino">Scarica</a>';
            finestraDati = finestraDati + '</div>';

            //console.log(finestraDati);

            $("#popupScaricaMerceDaMagazzino").html(finestraDati);

            //$("#numeroLotttoCaricareinMagazzino").datepicker({
            //    dateFormat: "dd-mm-yy"
            //});
            $("#dataDDTCaricareinMagazzino").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".scaricaProdottoDaMagazzino").on('click', function () {
                //var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();
                var quantitaDaScaricare = $("#quantitaProdDaScaricareDaMagazzino").val();
                if (quantitaDaScaricare == "" || isInteroPositivo(parseInt(quantitaDaScaricare)) == false) {
                    alert("Scegli un valore Numerico prima di scaricare");
                    //$(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                }
                var giacenzaPerLotto = $(".quantitaGiacenteInMagazzino").val();
                if (parseInt(quantitaDaScaricare) > parseInt(giacenzaPerLotto)) {
                    alert("Non puoi scaricare più di quanto presente in magazzino!");
                    return;
                }
                var numeroDDT = $("#numeroDDTScaricareinMagazzino").val();
                var dataDDT = $("#dataDDTScaricareinMagazzino").val();
                

                dataDDT = stringToDate(dataDDT, "dd/MM/yyyy", "/");

                var note = $("#noteScaricareinMagazzino").val();
                var quantitaTotale = (parseInt(giacenzaPerLotto) - parseInt(quantitaDaScaricare));
                var totaleAggiornato = (parseInt(quantitaAttuale.text()) - parseInt(quantitaDaScaricare));
                //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotale = (prezzo * quantitaTotale);

                var lottoSpecifico = $('.lottoSpecifico').val();
                //console.log(quantitaDaScaricare);
                                
                //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
                //return;

                //numeroLotto = parseJsonDateToJsDate(numeroLotto);
                numeroLotto = stringToDate(lottoSpecifico, 'dd/MM/yyyy', '/');
                var idOperatore = localStorage.idOperatore;

                SmaltiscoProdottiDaMagazzino(idProdotto, quantitaTotale, totaleAggiornato, prezzoTotale, numeroLotto, idOperatore, numeroDDT, dataDDT, note, true);

                //dataDDT = null;
                //console.log(' idProdotto=' + idProdotto + ' quantitaDaScaricare=' + quantitaDaScaricare + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT + ' note=' + note);

                //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');

                //var labelQuantita = $(lblQ);
                //console.log(labelQuantita);                   
                quantitaAttuale.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                quantitaAttuale.html(totaleAggiornato);

            });

            }
        });
}


function GetProdottiDaScaricareDaMagazzinoV2(idProdotto, quantitaAttuale) {

}

function SituazioneMagazzino() {
    location.hash = "situazioneMagazzino";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInMagazzino",        
        url: urlGetProdottiInMagazzino,
        cache: false,                   
        async: true,        
        data: JSON.stringify({  }),        
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            
            //console.log(risultati);
            //$(".menuPrincipale").hide();
            
            var dettaglio = '<table id="tabellaProdottiInMagazzino" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>N° Lotto</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>Numero DDT</th>' +
                                                '<th>Data DDT</th>' +                                                
                                                '<th>Note</th>' +
                                                //'<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>N° Lotto</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>Numero DDT</th>' +
                                                '<th>Data DDT</th>' +
                                                '<th>Note</th>' +
                                                //'<th>Scarica</th>' +
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
            for (var i = 0; i < risultati.length; i++) {
                
                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br> Lotto: ' + parseJsonDate(risultati[i].numeroLotto) + '</td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';                       
                //dettaglio = dettaglio + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                //dettaglio = dettaglio + '<td><a href="#"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdInMagazzino">Scarica</a> </td>';
                //dettaglio = dettaglio + '</tr>';

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                //console.log(numLotto);
                quantita = risultati[i].quantitaMagazzino;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantitaMagazzino + '</td>';

                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].Note + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + parseJsonDateLettura(risultati[i].dataDDT) + '" data-note="' + risultati[i].Note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';

                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantitaMagazzino + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].Note + '</td>';
                       // rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + parseJsonDateLettura(risultati[i].dataDDT) + '" data-note="' + risultati[i].Note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].Note + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + parseJsonDateLettura(risultati[i].dataDDT) + '" data-note="' + risultati[i].Note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }

                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaMagazzino;
            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            dettaglio = dettaglio + righe + '</tbody> </table>';

            $('#elencoSituazioneMagazzino').html(dettaglio);

            var table = $('#tabellaProdottiInMagazzino').DataTable(
                { "paging": false, responsive: true }
            );           

            //$(".scegliProdDaCaricareInMagazzino").on('click', function () {
            //    var idProdotto = $(this).attr('data-idProdotto');
            //    var IdMagazzino = $(this).attr('data-IdMagazzino');
            //    var prezzo = $(this).attr('data-prezzo');
            //    var lblQ = '#quantitaInMagazzino' + IdMagazzino;
            //    var quantitaAttuale = $(lblQ).text();
            //    var idOperatore = $(this).attr('data-idOperatore');
            //    var foto = $(this).attr('data-foto');

            //    var finestraDati = '<div style="padding:10px 20px;">';
            //    finestraDati = finestraDati + '<h3>Carica in Magazzino</h3>';
            //    finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + foto + '">';
            //    finestraDati = finestraDati + '<label for="quantitaProdDaCaricareInMagazzino">Quantita:</label>';
            //    finestraDati = finestraDati + '<input type="number" id="quantitaProdDaCaricareInMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
            //    finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="numeroDDTCaricareinMagazzino">Numero DDT</label>';
            //    finestraDati = finestraDati + '<input type="number" id="numeroDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="dataDDTCaricareinMagazzino">Data DDT:</label>';
            //    finestraDati = finestraDati + '<input type="text" id="dataDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
            //    finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
            //    finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzino">Carica</a>';
            //    finestraDati = finestraDati + '</div>';

            //    $("#popupCaricaMerceInMagazzino").html(finestraDati);

            //    $("#numeroLotttoCaricareinMagazzino").datepicker({
            //        dateFormat: "dd-mm-yy"
            //    });
            //    $("#dataDDTCaricareinMagazzino").datepicker({
            //        dateFormat: "dd-mm-yy"
            //    });
                         

            //    $(".caricaProdottoInMagazzino").on('click', function () {
            //        var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();                    
            //        var quantitaCaricati = $("#quantitaProdDaCaricareInMagazzino").val();
            //        var numeroDDT = $("#numeroDDTCaricareinMagazzino").val();
            //        var dataDDT = $("#dataDDTCaricareinMagazzino").val();

            //        if (numeroLotto == '') {
            //            alert('Numero Lotto è un campo obbligatorio!');
            //            return;
            //        }
            //        numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");

            //        if (quantitaCaricati == '' || isInteroPositivo(parseInt(quantitaCaricati)) == false) {
            //            alert("Scegli un valore Numerico prima di caricare");
            //            return;
            //        }

            //        if (numeroDDT == '') {
            //            numeroDDT = null;
            //        } 
                    
            //        if (dataDDT == '') {
            //            dataDDT = null;
            //        } else {
            //            dataDDT = stringToDate(dataDDT, "dd-MM-yyyy", "-");
            //        }
                                        
            //        var note = $("#noteCaricareinMagazzino").val();
            //        var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
            //        //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
            //        //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
            //        var prezzoTotaleCaricati = (prezzo * quantitaCaricati);                    
                                        
            //        //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
            //        //return;

            //        CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, note);                    

            //        //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                    
            //        var labelQuantita = $(lblQ);
            //        //console.log(labelQuantita);                   
            //        labelQuantita.animate({
            //            backgroundColor: "green",
            //            color: "#000"
            //        }, 1000);
            //        labelQuantita.html(quantitaTotale);

            //    });
                
               
            //});
            
            //$(".scegliProdDaScaricareDaMagazzino").on('click', function () {
            //    var idProdotto = $(this).attr('data-idProdotto');
            //    var IdMagazzino = $(this).attr('data-IdMagazzino');
            //    var prezzo = $(this).attr('data-prezzo');
            //    var lblQ = '#quantitaInMagazzino' + IdMagazzino;
            //    var quantitaAttuale = $(lblQ).text();
            //    var idOperatore = $(this).attr('data-idOperatore');
            //    var foto2 = $(this).attr('data-foto');
            //    var numeroLotto = $(this).attr('data-numeroLotto');

            //    console.log('idProdotto=' + idProdotto + ' IdMagazzino=' + IdMagazzino + ' prezzo=' + prezzo + ' quantitaAttuale=' + quantitaAttuale + ' idOperatore=' + idOperatore + ' foto2=' + foto2 + ' numeroLotto=' + numeroLotto);

            //    var finestraDati = '<div style="padding:10px 20px;">';
            //    finestraDati = finestraDati + '<h3>Scarica da Magazzino</h3>';
            //    finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + foto2 + '">';
            //    finestraDati = finestraDati + '<label for="quantitaProdDaScaricareDaMagazzino">Quantita:</label>';
            //    finestraDati = finestraDati + '<input type="number" id="quantitaProdDaScaricareDaMagazzino" data-theme="a">';
            //    //finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
            //    //finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<br><br>Numero Lotto: ' + parseJsonDate(numeroLotto) + '<br><br>';
            //    finestraDati = finestraDati + '<label for="numeroDDTCaricareinMagazzino">Numero DDT</label>';
            //    finestraDati = finestraDati + '<input type="number" id="numeroDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="dataDDTCaricareinMagazzino">Data DDT:</label>';
            //    finestraDati = finestraDati + '<input type="text" id="dataDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
            //    finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
            //    finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdottoDaMagazzino">Scarica</a>';
            //    finestraDati = finestraDati + '</div>';

            //    $("#popupScaricaMerceDaMagazzino").html(finestraDati);

            //    //$("#numeroLotttoCaricareinMagazzino").datepicker({
            //    //    dateFormat: "dd-mm-yy"
            //    //});
            //    $("#dataDDTCaricareinMagazzino").datepicker({
            //        dateFormat: "dd-mm-yy"
            //    });


            //    $(".scaricaProdottoDaMagazzino").on('click', function () {
            //        //var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();
            //        var quantitaDaScaricare = $("#quantitaProdDaScaricareDaMagazzino").val();
            //        var numeroDDT = $("#numeroDDTCaricareinMagazzino").val();
            //        var dataDDT = $("#dataDDTCaricareinMagazzino").val();

            //        //numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");
            //        dataDDT = stringToDate(dataDDT, "dd-MM-yyyy", "-");
            //        var note = $("#noteCaricareinMagazzino").val();
            //        var quantitaTotale = (parseInt(quantitaAttuale) - parseInt(quantitaDaScaricare));
            //        //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
            //        //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
            //        var prezzoTotale = (prezzo * quantitaTotale);

            //        //console.log(quantitaDaScaricare);

            //        if (quantitaDaScaricare == "" || isInteroPositivo(parseInt(quantitaDaScaricare)) == false) {
            //            alert("Scegli un valore Numerico prima di caricare");
            //            //$(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
            //            return;
            //            //} else {
            //            //    $(this).prev().removeClass("evidenziaErrore");
            //        }

            //        //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
            //        //return;
            //        numeroLotto = parseJsonDateToJsDate(numeroLotto);
            //        if (numeroDDT == "" || isInteroPositivo(parseInt(numeroDDT)) == false) {
            //            numeroDDT = 0;
            //        }

            //        SmaltiscoProdottiDaMagazzino(idProdotto, quantitaTotale, prezzoTotale, numeroLotto, idOperatore, numeroDDT, dataDDT, note, true);
                                                                                
            //        //dataDDT = null;
            //        //console.log(' idProdotto=' + idProdotto + ' quantitaDaScaricare=' + quantitaDaScaricare + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT + ' note=' + note);
                   

            //        //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');

            //        var labelQuantita = $(lblQ);
            //        //console.log(labelQuantita);                   
            //        labelQuantita.animate({
            //            backgroundColor: "green",
            //            color: "#000"
            //        }, 1000);
            //        labelQuantita.html(quantitaTotale);

            //    });


            //});
        }

    });

}


function CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, quantitaAggiornata, prezzoTotaleCaricati, idOperatore, codiceLotto, numeroLotto, dataScadenza, numeroDDT, dataDDT, note, colore) {    

    // Carico Prodotti in magazzino *********************************
    //note = '';
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/CaricaProdottiInMagazzino",
        url: urlCaricaProdottiInMagazzino,
        cache: false,
        async: true,        
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaCaricati, prezzoTotale: prezzoTotaleCaricati, idOperatore: idOperatore, codiceLotto: codiceLotto, numeroLotto: numeroLotto, dataScadenza: dataScadenza, numeroDDT: numeroDDT, dataDDT: dataDDT, note: note, colore: colore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            displayNumeriLottoMagazzino(idProdotto, quantitaAggiornata);

            //console.log(risultati);
            //Ricarico i valori
            //GestioneMagazzino();
        }

    });
    // *********************************************************************************  
}

function CaricaProdottoInMagazzinoV2(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, colore) {

    // Carico Prodotti in magazzino *********************************
    //note = '';
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/CaricaProdottiInMagazzinoV2",
        url: urlCaricaProdottiInMagazzinoV2,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaCaricati, prezzoTotale: prezzoTotaleCaricati, idOperatore: idOperatore, colore: colore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //Ricarico i valori
            //GestioneMagazzino();
        }

    });
    // *********************************************************************************  
}


//smaltisco una determinata quantita di Prodotto
function SmaltiscoProdottiDaMagazzino(IdProdotto, quantitaTotale, quantitaAggiornata, prezzoTotale, numeroLotto, IdOperatore, numeroDDT, dataDDT, note, smaltito, colore) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzino",        
        url: urlSmaltiscoProdottoInMagazzinoV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdProdotto: IdProdotto, IdOperatore: IdOperatore, smaltito: smaltito }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);            
            CaricaProdottoInMagazzino(IdProdotto, quantitaTotale, quantitaAggiornata, prezzoTotale, IdOperatore, numeroLotto, numeroDDT, dataDDT, note, colore);
        }

    });
}

function SmaltiscoProdottiDaMagazzinoV2(IdProdotto, quantitaTotale, prezzoTotale, IdOperatore, smaltito, colore) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzinoV2",        
        url: urlSmaltiscoProdottoInMagazzinoV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdProdotto: IdProdotto, IdOperatore: IdOperatore, smaltito: smaltito }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            CaricaProdottoInMagazzinoV2(IdProdotto, quantitaTotale, prezzoTotale, IdOperatore, colore);
        }

    });
}

function GetProdottiInMagazzinoByIdProdNumLotto(idProdotto, idOperatore, quantitaAttuale, quantitaDaScaricare, quantitaRimanente, prezzo, smaltito, colore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetProdottiInMagazzinoByIdProdNumLotto,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, numeroLotto: null }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            for (var i = 0; i < risultati.length; i++) {
                var codiceLotto = risultati[i].codiceLotto;
                var numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                var dataScadenza = parseJsonDateLettura(risultati[i].dataScadenza);
                numLotto = stringToDate(numLotto, 'dd-MM-yyyy', '-');
                if (quantitaDaScaricare <= risultati[i].quantitaMagazzino) {
                    
                    SmaltiscoProdottoInMagazzinoV3(risultati[i].IdMagazzino, idProdotto, idOperatore, quantitaDaScaricare, parseInt(risultati[i].quantitaMagazzino), prezzo, quantitaAttuale, codiceLotto, numLotto, dataScadenza, smaltito, colore);
                    break;
                } else {
                    SmaltiscoProdottoInMagazzinoV3(risultati[i].IdMagazzino, idProdotto, idOperatore, quantitaDaScaricare, parseInt(risultati[i].quantitaMagazzino), prezzo, quantitaAttuale, codiceLotto, numLotto, dataScadenza, smaltito, colore);
                }
                quantitaDaScaricare = parseInt(quantitaDaScaricare) - parseInt(risultati[i].quantitaMagazzino);
            }
            
        }

    });

}
         
function SmaltiscoProdottoInMagazzinoV3(idMagazzino, idProdotto, idOperatore, quantitaDaSmaltire, quantitaRimanente, prezzoProdotto, quantitaAggiornata, codiceLotto, numeroLotto, dataScadenza, smaltito, colore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlSmaltiscoProdottoInMagazzinoV3,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idMagazzino: idMagazzino, IdProdotto: idProdotto, IdOperatore: idOperatore, quantitaDaSmaltire: quantitaDaSmaltire, quantitaRimanente: quantitaRimanente, prezzoProdotto: prezzoProdotto, codiceLotto: codiceLotto, numeroLotto: numeroLotto, dataScadenza: dataScadenza, smaltito: smaltito, colore: colore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log(risultati);
            //for (var i = 0; i < risultati.length; i++) {
            //    SmaltiscoProdottoInMagazzinoV3(idProdotto, idOperatore, quantitaAttuale, quantitaDaScaricare, quantitaRimanente, prezzo, risultati[i].numeroLotto, smaltito, colore);
            //}
            displayNumeriLottoMagazzino(idProdotto, quantitaAggiornata);
        }

    });
}
        