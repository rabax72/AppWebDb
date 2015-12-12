$(function () {
    //$(".caricaDaMagazzinoSuCamion").on('click', function () {
    //    var idDistributore = $(this).attr('data-IdDistributore');
    //    var descDistributore = $(this).attr('data-descDistributore');
    //    $(".descDistributore").html('Carica per:' + descDistributore);
    //    var desc = '\'' + descDistributore + '\'';
    //    var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
    //    $(".backDistributore").attr("href", linkBack);

    //    ElencoProdottiInMagazzino(idDistributore);
    //});
});

function ElencoProdottiInMagazzinoPerMezzo(idMezzo, azione) {

    if (azione == 'carica') {
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
                        
                var dettaglio = '<table id="tabellaProdottiInMagazzinoPerCamion" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>N° DDT interno</th>' +
                                                '<th>Data DDT interno</th>' +
                                                '<th>Quantità da caricare</th>' +
                                                '<th> </th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>N° DDT interno</th>' +
                                                '<th>Data DDT interno</th>' +
                                                '<th>Quantità da caricare</th>' +
                                                '<th> </th>' +
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

                    idProd = risultati[i].idProdotto;
                    numLotto = risultati[i].numeroLotto;
                    //console.log(numLotto);
                    quantita = risultati[i].quantitaMagazzino;
                    if (idProd != idProdOld) {
                        quantitaTot = quantita;
                        //dettaglio = dettaglio + '<tr>';
                        //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                        //dettaglio = dettaglio + '<td class="storicoVenduto">N° DDT interno<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        //dettaglio = dettaglio + '<td class="storicoVenduto">Data DDT interno<input type="text" data-role="date" class="dataDDT accentraInput"></td>';
                        //dettaglio = dettaglio + '<td class="storicoVenduto">Quantità da caricare<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        //dettaglio = dettaglio + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCamion ui-btnCarica">Carica</a> </td>';
                        //dettaglio = dettaglio + '</tr>';

                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzino + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">N° DDT interno<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Data DDT interno<input type="text" data-role="date" class="dataDDT accentraInput"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Quantità da caricare<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCamion ui-btnCarica">Carica</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        if (numLotto != numLottoOld) {
                            quantitaTot = quantita;
                            rigaDettaglio[i] = '<tr>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzino + '</td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">N° DDT interno<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Data DDT interno<input type="text" data-role="date" class="dataDDT accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Quantità da caricare<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCamion ui-btnCarica">Carica</a> </td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        } else {
                            rigaDettaglio[i - 1] = '';
                            quantitaTot = (quantitaTot + quantita);
                            rigaDettaglio[i] = '<tr>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">N° DDT interno<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Data DDT interno<input type="text" data-role="date" class="dataDDT accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Quantità da caricare<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCamion ui-btnCarica">Carica</a> </td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        }
                    }
                    idProdOld = risultati[i].idProdotto;
                    numLottoOld = risultati[i].numeroLotto;
                    quantitaOld = risultati[i].quantitaMagazzino;
                }
                //dettaglio = dettaglio + '</tbody> </table>';

                var righe = '';

                for (var i = 0; i < risultati.length; i++) {
                    righe = righe + rigaDettaglio[i];
                }

                dettaglio = dettaglio + righe + '</tbody> </table>';

                $('.MerceDaCaricareSuCamion').html(dettaglio);

                $(".dataDDT").datepicker({
                    dateFormat: "dd-mm-yy"
                });

                var table = $('#tabellaProdottiInMagazzinoPerCamion').DataTable(
                    { "paging": false, responsive: true }
                );

                $(".caricaProdInCamion").on('click', function () {

                    var IdMagazzino = $(this).attr('data-IdMagazzino');
                    var idProdotto = $(this).attr('data-idProdotto');
                    var prezzo = $(this).attr('data-prezzo');
                    var note = $(this).attr('data-note');
                    var quantitaAttuale = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
                    var quantitaCaricati = $(this).closest('td').prev('td')[0].children[0].value;
                    var numeroDDT = $(this).attr('data-numeroDDT');
                    if (numeroDDT == '') {
                        numeroDDT = 0;
                    }

                    var numeroDDT_interno = $(this).closest('td').prev('td').prev('td').prev('td')[0].children[0].value;
                    if (numeroDDT_interno == '') {
                        numeroDDT_interno = 0;
                    }

                    var dataDDT = parseJsonDateToJsDate($(this).attr('data-dataDDT'));
                    

                    var dataDDT_interno =$(this).closest('td').prev('td').prev('td')[0].children[0].value;
                    if (dataDDT_interno != '') {
                        dataDDT_interno = stringToDate(dataDDT_interno, "dd-MM-yyyy", "-");
                    } else {
                        dataDDT_interno = new Date();
                    }

                    var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                    //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                    var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                    var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                    var idOperatore = localStorage.idOperatore;
                    //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                    var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                    //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaCaricati=' + quantitaCaricati + ' isInteroPositivo(parseInt(quantitaCaricati))=' + isInteroPositivo(parseInt(quantitaCaricati)) + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT);
                    //return;

                    if (quantitaCaricati == "" || isInteroPositivo(parseInt(quantitaCaricati)) == false) {
                        alert("Scegli un valore Numerico prima di caricare");
                        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    } else {
                        $(this).prev().removeClass("evidenziaErrore");
                    }

                    if (parseInt(quantitaCaricati) > parseInt(quantitaAttuale)) {
                        alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");
                        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    } else {
                        $(this).prev().removeClass("evidenziaErrore");
                    }

                    if (!confirm("Sicuro di voler Caricare sul camion " + quantitaCaricati + " pezzi di questo prodotto?")) return;

                    CaricaProdottisuCamion(IdMagazzino, idMezzo, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno, note);

                    var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                    //console.log(labelQuantita);
                    //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                    //labelQuantita.css("background-color", "green");
                    labelQuantita.animate({
                        backgroundColor: "green",
                        color: "#000"
                    }, 1000);
                    labelQuantita.html(quantitaRimasti);
                });
            }
        });
    }//Fine Carica ************************************************

    if (azione == 'scarica') {

        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInCamion",        
            url: urlGetProdottiSuCamion,
            cache: false,                   
            async: true,        
            data: JSON.stringify({ idMezzo: idMezzo }),
            error: function (data) {
                console.log(data.responseText)
            },
            beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
            complete: function () { $.mobile.loading('hide'); }, //Hide spinner
            success: function (response) {
                risultati = response.d;
                var dettaglio = '<table id="tabellaProdottiInMagazzinoPerCamionDaScaricare" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quantità su Camion</th>' +                                                
                                                '<th>Quantità da scaricare</th>' +
                                                '<th> </th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quantità su Camion</th>' +
                                                '<th>Quantità da scaricare</th>' +
                                                '<th> </th>' +
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

                    idProd = risultati[i].idProdotto;
                    numLotto = risultati[i].numeroLotto;
                    //console.log(numLotto);
                    quantita = risultati[i].quantitaTrasporto;
                    if (idProd != idProdOld) {
                        quantitaTot = quantita;
                        //dettaglio = dettaglio + '<tr>';
                        //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                        //dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        //dettaglio = dettaglio + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdDaCamion ui-btnScarica">Scarica</a> </td>';
                        //dettaglio = dettaglio + '</tr>';

                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdDaCamion ui-btnScarica">Scarica</a> </td>';                                                
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        if (numLotto != numLottoOld) {
                            quantitaTot = quantita;
                            rigaDettaglio[i] = '<tr>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdDaCamion ui-btnScarica">Scarica</a> </td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        } else {
                            rigaDettaglio[i - 1] = '';
                            quantitaTot = (quantitaTot + quantita);

                            rigaDettaglio[i] = '<tr>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdDaCamion ui-btnScarica">Scarica</a> </td>';
                            rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        }

                    }
                    idProdOld = risultati[i].idProdotto;
                    numLottoOld = risultati[i].numeroLotto;
                    quantitaOld = risultati[i].quantitaTrasporto;
                }
                //dettaglio = dettaglio + '</tbody> </table>';

                var righe = '';

                for (var i = 0; i < risultati.length; i++) {
                    righe = righe + rigaDettaglio[i];
                }

                dettaglio = dettaglio + righe + '</tbody> </table>';

                $('.MerceDaScaricareDaCamion').html(dettaglio);                

                var table = $('#tabellaProdottiInMagazzinoPerCamionDaScaricare').DataTable(
                    { "paging": false, responsive: true }
                );

                $(".scaricaProdDaCamion").on('click', function () {

                    var IdTrasporto = $(this).attr('data-IdTrasporto');
                    var idProdotto = $(this).attr('data-idProdotto');
                    var prezzo = $(this).attr('data-prezzo');
                    var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                    var quantitaDaRimettereInMagazzino = $(this).closest('td').prev('td')[0].children[0].value;
                    //var numeroDDT = $(this).closest('td').prev('td').prev('td').prev('td')[0].children[0].value;
                    //var dataDDT = $(this).closest('td').prev('td').prev('td')[0].children[0].value;

                    var numeroDDT = $(this).attr('data-numeroDDT');
                    var numeroDDT_interno = $(this).attr('data-numeroDDT_interno');
                    var dataDDT = parseJsonDateToJsDate($(this).attr('data-dataDDT'));
                    var dataDDT_interno = parseJsonDateToJsDate($(this).attr('data-dataDDT_interno'));

                    var quantitaRimasti = (quantitaAttuale - quantitaDaRimettereInMagazzino);
                    //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                    var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                    var prezzoTotaleDaRimettereInMagazzino = (prezzo * quantitaDaRimettereInMagazzino);
                    var idOperatore = localStorage.idOperatore;
                    //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                    var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                    //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaDaRimettereInMagazzino=' + quantitaDaRimettereInMagazzino + ' isInteroPositivo(parseInt(quantitaDaRimettereInMagazzino))=' + isInteroPositivo(parseInt(quantitaDaRimettereInMagazzino)) + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
                    //return;

                    if (quantitaDaRimettereInMagazzino == "" || isInteroPositivo(parseInt(quantitaDaRimettereInMagazzino)) == false) {
                        alert("Scegli un valore Numerico prima di scaricare");
                        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    } else {
                        $(this).prev().removeClass("evidenziaErrore");
                    }

                    if (parseInt(quantitaDaRimettereInMagazzino) > parseInt(quantitaAttuale)) {
                        alert("E' impossibile che ci siano da scaricare più prodotti di quelli presenti!");
                        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    } else {
                        $(this).prev().removeClass("evidenziaErrore");
                    }

                    if (!confirm("Sicuro di voler Scaricare dal camion " + quantitaDaRimettereInMagazzino + " pezzi di questo prodotto?")) return;

                    ScaricaProdottiDaCamion(IdTrasporto, idMezzo, idProdotto, quantitaDaRimettereInMagazzino, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno);
                    
                    var labelQuantita = $(this).closest('td').prev('td').prev('td');
                    //console.log(labelQuantita);
                    //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                    //labelQuantita.css("background-color", "green");
                    labelQuantita.animate({
                        backgroundColor: "green",
                        color: "#000"
                        }, 1000);
                        labelQuantita.html(quantitaRimasti);
                    });
            }//end success
        });//end ajaax
    }//Fine Scarica  
                  
}


function CaricaProdottisuCamion(IdMagazzino, idMezzo, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno, note) {
    //console.log(" idProdotto=" + idProdotto + " quantitaCaricati=" + quantitaCaricati + " prezzoTotaleCaricati=" + prezzoTotaleCaricati + " idOperatore=" + idOperatore + " numeroLotto=" + numeroLotto + " idMezzo=" + idMezzo + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
    //return;

    storicizzaProdottoInMagazzino(idProdotto, numeroLotto, idOperatore, note, false, quantitaRimasti, prezzoTotaleRimasti, numeroDDT, dataDDT);
    
    //if (parseInt(quantitaRimasti) > 0) {
    //    AggiornaQuantitaProdottiInMagazzino(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT, note);
    //}
    
    InsertProdottiInCamion(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno);
}

function ScaricaProdottiDaCamion(IdTrasporto, idMezzo, idProdotto, quantitaDaRimettereInMagazzino, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno) {

    //console.log(" IdTrasporto=" + IdTrasporto + " idMezzo=" + idMezzo + " idProdotto=" + idProdotto + " quantitaDaRimettereInMagazzino=" + quantitaDaRimettereInMagazzino + " quantitaRimasti=" + quantitaRimasti + " prezzoTotaleRimasti=" + prezzoTotaleRimasti + " prezzoTotaleDaRimettereInMagazzino=" + prezzoTotaleDaRimettereInMagazzino + " idOperatore=" + idOperatore + " numeroLotto=" + numeroLotto + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
    //return;

    // Storicizzo Prodotti su Camion ************************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto",        
        url: urlStoricizzoProdTrasporto,
        cache: false,

        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdProdotto: idProdotto, numeroLotto: numeroLotto, IdOperatore: idOperatore }),

        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            // Aggiorno quantita Prodotti rimasti in Camion ************************************
            if (parseInt(quantitaRimasti) > 0) {
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",
                    url: urlAggiornaQuantInTrasporto,
                    cache: false,
                    async: true,
                    data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: idMezzo, numeroDDT: numeroDDT, dataDDT: dataDDT, numeroDDT_interno: numeroDDT_interno, dataDDT_interno: dataDDT_interno }),
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
        }

    });
    // *********************************************************************************

    //console.log(" idProdotto=" + idProdotto + " quantitaRimasti=" + quantitaRimasti + " prezzoTotaleRimasti=" + prezzoTotaleRimasti + " idOperatore=" + idOperatore + " numeroLotto=" + numeroLotto + " idMezzo=" + idMezzo + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
    //return;
    
    //InsertProdottiInCamion(idProdotto, quantitaDaRimettereInMagazzino, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, idMezzo);

    //TODO
    // gestire il passaggio numeroDDT e dataDDT
    CaricaProdottoInMagazzino(idProdotto, quantitaDaRimettereInMagazzino, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, numeroDDT, dataDDT, 'Rimessi da camion a Magazzino');
}

//inserisco in un determinato Cliente una determinata quantita di Prodotto
function InsertProdottiInCamion(idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, idMezzo, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",        
        url: urlAggiornaQuantInTrasporto,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: idMezzo, numeroDDT: numeroDDT, dataDDT: dataDDT, numeroDDT_interno: numeroDDT_interno, dataDDT_interno: dataDDT_interno }),
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

function InsertProdottiInCamionV2(idProdotto, quantita, prezzoTotale, idOperatore, idMezzo, idDistributore, idCliente) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasportoV2",        
        url: urlAggiornaQuantInTrasportoV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, IdMezzo: idMezzo }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            if (idCliente == 0) {
                AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, 'arancio');
            }
            if (idDistributore == 0) {
                AggiornaColoreProdottoInCliente(idCliente, idProdotto, 'arancio');
            }
            
        }

    });
}



        