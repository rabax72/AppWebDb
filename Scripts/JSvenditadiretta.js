$(function () {
    
});

function ElencoProdottiInMagazzinoPerVenditaDiretta() {
    location.hash = "VenditaDiretta";
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInMagazzino",        
        url: urlGetProdottiInMagazzino,
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

            console.log(risultati);


            var dettaglio = '<table id="tabellaProdottiInMagazzinoPerVenditaDiretta" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Giacenza</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Quantità</th>' +
                                            '<th> </th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Giacenza</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Quantità</th>' +
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

                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">N° DDT<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">Data DDT<input type="text" class="dataDDT accentraInput"></td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">Quantità<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                //dettaglio = dettaglio + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active venditaDiretta ui-btnCarica">Vendi</a> </td>';
                //dettaglio = dettaglio + '</tr>';

                idProd = risultati[i].idProdotto;
                //numLotto = risultati[i].numeroLotto;                
                quantita = risultati[i].quantitaMagazzino;

                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzino + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">N° DDT<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Data DDT<input type="text" class="dataDDT accentraInput"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Quantità<input type="number" data-clear-btn="true" class="miniInput accentraInput" min="0"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active venditaDiretta ui-btnCarica">Vendi</a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzino + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">N° DDT<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Data DDT<input type="text" class="dataDDT accentraInput"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Quantità<input type="number" data-clear-btn="true" class="miniInput accentraInput" min="0"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active venditaDiretta ui-btnCarica">Vendi</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);

                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">N° DDT<input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Data DDT<input type="text" class="dataDDT accentraInput"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">Quantità<input type="number" data-clear-btn="true" class="miniInput accentraInput" min="0"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-note="' + risultati[i].note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active venditaDiretta ui-btnCarica">Vendi</a> </td>';
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

            $('.MercePerVenditaDiretta').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiInMagazzinoPerVenditaDiretta').DataTable(
                { "paging": false, responsive: true }
            );

            $(".venditaDiretta").on('click', function () {

                var IdMagazzino = $(this).attr('data-IdMagazzino');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var note = $(this).attr('data-note');
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaVenduti = $(this).closest('td').prev('td')[0].children[0].value;
                //var numeroDDT = $(this).closest('td').prev('td').prev('td').prev('td')[0].children[0].value;
                //if (numeroDDT == '') {
                //    numeroDDT = 0;
                //}
                //var dataDDT = $(this).closest('td').prev('td').prev('td')[0].children[0].value;
                //if (dataDDT != '') {
                //    dataDDT = stringToDate(dataDDT, "dd/MM/yyyy", "/");
                //} else {
                //    dataDDT = null;
                //}

                var quantitaRimasti = (quantitaAttuale - quantitaVenduti);
                //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                //var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaVenduti=' + quantitaVenduti + ' isInteroPositivo(parseInt(quantitaVenduti))=' + isInteroPositivo(parseInt(quantitaVenduti)) );
                //return;

                if (quantitaVenduti == "" || isInteroPositivo(parseInt(quantitaVenduti)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaVenduti) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (!confirm("Sicuro di voler vendere " + quantitaVenduti + " pezzi di questo prodotto?")) return;
                
                storicizzaProdottoInMagazzino(idProdotto, idOperatore, note, false, quantitaRimasti, prezzoTotaleRimasti);

                //if (parseInt(quantitaRimasti) > 0) {
                //    AggiornaQuantitaProdottiInMagazzino(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT, note);
                //}
                
                var idDistributore = 0;
                var idCliente = 0;
                
                //console.log(idProdotto + ', '+idProdotto + ', '+idDistributore + ', '+idCliente + ', '+quantitaVenduti + ', '+prezzoTotaleVenduti + ', '+idOperatore + ', '+numeroDDT + ', '+dataDDT );
                //return;
                //if (parseInt(quantitaVenduti) > 0) {
                //    AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, true, numeroDDT, dataDDT, numeroLotto);
                //}
                if (parseInt(quantitaVenduti) > 0) {
                    AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, true);
                }
                
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

