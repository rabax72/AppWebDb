$(function () {        

});


function ElencoProdottiSuCamionPerDistributore(idMezzo, idDistributore) {
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
            
            //console.log(risultati);
            //$(".menuPrincipale").hide();
            
            var dettaglio = '<table id="tabellaProdottiSuMezzo" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +                                                
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Scaricare</th>' +
                                                //'<th>N° DDT</th>' +
                                                //'<th>Data DDT</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                               '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Scaricare</th>' +
                                                //'<th>N° DDT</th>' +
                                                //'<th>Data DDT</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var data = new Date();
            var oggi =  data.getDate() ;
            //var oggi = '\'' + data.getDate() + '\'';
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
                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;                
                quantita = risultati[i].quantitaTrasporto;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    //dettaglio = dettaglio + '<tr>';
                    //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                    ////dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].numeroLotto) + '</td>';
                    //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                    //dettaglio = dettaglio + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                    ////dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                    ////dettaglio = dettaglio + '<td><input type="text" data-role="date" class="dataDDT accentraInput"></td>';
                    //dettaglio = dettaglio + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInDistributore ui-btnScarica">Scarica</a></td>';
                    //dettaglio = dettaglio + '</tr>';

                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';                   
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaTrasporto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';                    
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInDistributore ui-btnScarica">Scarica</a></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaTrasporto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInDistributore ui-btnScarica">Scarica</a></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInDistributore ui-btnScarica">Scarica</a></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }
                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaTrasporto;
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaTrasporto;

            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }
            dettaglio = dettaglio + righe + '</tbody> </table>';

            $('#ElencoProdottiSuCamionPerDistributore').html(dettaglio);

            //$(".dataDDT").datepicker({
            //    dateFormat: "dd-mm-yy"
            //});


            var table = $('#tabellaProdottiSuMezzo').DataTable(
                { "paging": false, responsive: true }
            );

            $(".caricaProdInDistributore").on('click', function () {

                var IdTrasporto = $(this).attr('data-IdTrasporto');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var numeroDDT = $(this).attr('data-numeroDDT');
                var numeroDDT_interno = $(this).attr('data-numeroDDT_interno');
                if (numeroDDT == 'undefined') {
                    numeroDDT = 0;
                }
                var dataDDT = $(this).attr('data-dataDDT');
                if (dataDDT != 'undefined') {
                    //var dataJs = parseJsonDateToJsDate(dataDDT);
                    dataDDT = new Date(parseInt(dataDDT.substr(6)));
                    //dataDDT = new Date(dataJs);
                } else {
                    dataDDT = new Date();
                }

                var dataDDT_interno = $(this).attr('data-dataDDT_interno');
                if (dataDDT_interno != 'undefined') {
                    //var dataJs = parseJsonDateToJsDate(dataDDT);
                    dataDDT_interno = new Date(parseInt(dataDDT_interno.substr(6)));
                    //dataDDT = new Date(dataJs);
                } else {
                    dataDDT_interno = new Date().toDateString();                    
                    dataDDT_interno = new Date(dataDDT_interno);
                }

                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaCaricati = $(this).closest('td').prev('td')[0].children[0].value;
                //var quantiC = quantitaCaricati[0].children[0].value;
                var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                //var numeroDDT = $(this).closest('td').prev('td').prev('td')[0].children[0].value;
                //var dataDDT = $(this).closest('td').prev('td')[0].children[0].value;
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                var IdMagazzino = $(this).attr('data-IdMagazzino');
                //console.log(quantitaCaricati);
                //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaCaricati= ' + quantitaCaricati);
                //return;
                if (!confirm("Sicuro di voler Scaricare " + quantitaCaricati + " pezzi di questo prodotto?")) return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' quantitaAttuale=' + quantitaAttuale + ' IdTrasporto=' + IdTrasporto);
                //return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' isInteroPositivo(parseInt(quantitaCaricati))=' + isInteroPositivo(parseInt(quantitaCaricati)));
                var inputQuantitaCaricati = $(this).closest('td').prev('td')[0].children[0];
                //console.log(inputQuantitaCaricati.id);
                var quantic = '#' + inputQuantitaCaricati.id;
                if (quantitaCaricati == "" || isInteroPositivo(parseInt(quantitaCaricati)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");                    
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaCaricati) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");                    
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                //console.log(IdTrasporto + ", " + idDistributore + ", " + idProdotto + ", " + quantitaCaricati + ", " + quantitaRimasti + ", " + prezzoTotaleRimasti + ", " + prezzoTotaleCaricati + ", " + idOperatore + ", " + numeroLotto + ", " + idMezzo + ", " + numeroDDT + ", " + dataDDT);
                //return;

                CaricaProdottiInDistributore(IdTrasporto, idDistributore, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno);

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

        }

    });

}

function ElencoProdottiSuCamionPerCliente(idMezzo, idCliente) {
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

            //console.log(risultati);
            //$(".menuPrincipale").hide();

            var dettaglio = '<table id="tabellaProdottiSuMezzoPerCliente" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Scaricare</th>' +
                                                //'<th>N° numeroDDT</th>' +
                                                //'<th>Data DDT</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                               '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Scaricare</th>' +
                                                //'<th>N° DDT</th>' +
                                                //'<th>Data DDT</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var data = new Date();
            var oggi =  data.getDate() ;
            //var oggi = '\'' + data.getDate() + '\'';
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
                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;                
                quantita = risultati[i].quantitaTrasporto;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;

                    //dettaglio = dettaglio + '<tr>';
                    //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';                    
                    //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                    //dettaglio = dettaglio + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                    //dettaglio = dettaglio + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-IdCliente="' + idCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCliente ui-btnScarica">Scarica</a></td>';
                    //dettaglio = dettaglio + '</tr>';

                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaTrasporto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-IdCliente="' + idCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCliente ui-btnScarica">Scarica</a></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaTrasporto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-IdCliente="' + idCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCliente ui-btnScarica">Scarica</a></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-IdCliente="' + idCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" data-numeroDDT_interno="' + risultati[i].numeroDDT_interno + '" data-dataDDT_interno="' + risultati[i].dataDDT_interno + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCliente ui-btnScarica">Scarica</a></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }
                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaTrasporto;
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaTrasporto;

            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }
            dettaglio = dettaglio + righe + '</tbody> </table>';

            $('#ElencoProdottiSuCamionPerCliente').html(dettaglio);

            //$(".dataDDT").datepicker({
            //    dateFormat: "dd-mm-yy"
            //});


            var table = $('#tabellaProdottiSuMezzoPerCliente').DataTable(
                { "paging": false, responsive: true }
            );

            $(".caricaProdInCliente").on('click', function () {

                var IdTrasporto = $(this).attr('data-IdTrasporto');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var numeroDDT = $(this).attr('data-numeroDDT');
                var numeroDDT_interno = $(this).attr('data-numeroDDT_interno');
                if (numeroDDT == 'undefined') {
                    numeroDDT = 0;
                }
                var dataDDT = $(this).attr('data-dataDDT');
                var dataDDT_interno = $(this).attr('data-dataDDT_interno');

                if (dataDDT != 'undefined') {
                    //dataDDT = new Date(parseJsonDateToJsDate(dataDDT));
                    dataDDT = parseJsonDateToJsDate(dataDDT);
                } else {
                    dataDDT = new Date();
                }

                if (dataDDT_interno != 'undefined') {
                    //dataDDT = new Date(parseJsonDateToJsDate(dataDDT));
                    dataDDT_interno = parseJsonDateToJsDate(dataDDT_interno);
                } else {
                    dataDDT_interno = new Date();
                }
                
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaCaricati = $(this).closest('td').prev('td')[0].children[0].value;
                //var quantiC = quantitaCaricati[0].children[0].value;
                var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                //var numeroDDT = $(this).closest('td').prev('td').prev('td')[0].children[0].value;
                //var dataDDT = $(this).closest('td').prev('td')[0].children[0].value;
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                var IdMagazzino = $(this).attr('data-IdMagazzino');
                //console.log(quantitaCaricati);
                //alert('numeroDDT=' + numeroDDT + ' dataDDT= ' + dataDDT);
                //return;
                if (!confirm("Sicuro di voler Scaricare " + quantitaCaricati + " pezzi di questo prodotto?")) return;
                //alert('quantitaCaricati=' + quantitaCaricati + ' quantitaAttuale=' + quantitaAttuale + ' IdTrasporto=' + IdTrasporto);
                //return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' isInteroPositivo(parseInt(quantitaCaricati))=' + isInteroPositivo(parseInt(quantitaCaricati)));
                var inputQuantitaCaricati = $(this).closest('td').prev('td')[0].children[0];
                //console.log(inputQuantitaCaricati.id);
                var quantic = '#' + inputQuantitaCaricati.id;
                if (quantitaCaricati == "" || isInteroPositivo(parseInt(quantitaCaricati)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaCaricati) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                //alert('idCliente=' + idCliente);
                //return;

                CaricaProdottiInCliente(IdTrasporto, idCliente, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno);

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

        }

    });

}

function CaricaProdottiInCliente(IdTrasporto, idCliente, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, IdMezzo, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno) {

    // Storicizzo Prodotti in camion ************************************************
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
                    data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: IdMezzo, numeroDDT: numeroDDT, dataDDT: dataDDT, numeroDDT_interno: numeroDDT_interno, dataDDT_interno: dataDDT_interno }),
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
        
    InsertProdottiInCliente(idCliente, idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT);
}

function CaricaProdottiInDistributore(IdTrasporto, idDistributore, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, IdMezzo, numeroDDT, dataDDT, numeroDDT_interno, dataDDT_interno) {

    // Storicizzo Prodotti in camion ************************************************
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
                    data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: IdMezzo, numeroDDT: numeroDDT, dataDDT: dataDDT, numeroDDT_interno: numeroDDT_interno, dataDDT_interno: dataDDT_interno }),
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
            
    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT);
}




        