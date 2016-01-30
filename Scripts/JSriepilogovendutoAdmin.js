$(function () {
    
    

});

function RiepilogoVendutoAdmin() {

    $('.DettRiepilogoVendutoAdmin').html('');
    location.hash = "RiepilogoVendutoAdmin";
}

function VenditaDirettaAdmin(DataDa, DataA, numeroLotto, codiceLotto) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",                
        url: urlGetVendutoDirettamente,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA, numeroLotto: numeroLotto, codiceLotto: codiceLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<div>' +
                                'NumeroLotto <input type="text" id="ProdottiVendutiDirettamenteNumeroLottoAdmin"  class="calendario" data-theme="a" /> CodiceLotto <input type="text" id="ProdottiVendutiDirettamenteCodiceLottoAdmin" data-theme="a" />' +
                            '</div>' +
                            '<div>' +
                                'Data Da <input type="text" id="ProdottiVendutiDirettamenteDataDaAdmin" class="calendario" data-theme="a" /> Data A <input type="text" id="ProdottiVendutiDirettamenteDataAAdmin" class="calendario" data-theme="a" /> <button id="filtraProdottiVendutiDirettamenteAdmin" value="Filtra" class="filtraProdottiVendutiDirettamenteAdmin">Filtra</button>' +
                            '</div><table id="tabellaProdottiVendutiDirettamenteAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Operatore</th>' +                                            
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            var prezzoTot = 0;
            var prezzoTot2 = 0;
            var totalonePrezzi = 0;
            var totaleQuantita = 0;
            var totaleQuantita2 = 0;
            var totaloneQuantita = 0;
            var idProdottoOld = 0;
            var numeroLottoOld = '';
            var codLottoOld = '';
            var dataScadenzaOld = '';
            var rigaDettaglio = new Array();
            for (var i = 0; i < risultati.length; i++) {
                var numLotto = '';
                rigaDettaglio[i] = '';
                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                var codLotto = '';
                if (risultati[i].codiceLotto != null) {
                    codLotto = risultati[i].codiceLotto;
                }
                if (risultati[i].idProdotto != idProdottoOld) {
                    totaleQuantita2 = risultati[i].quantitaVenduto;
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {

                    if (numLotto != numeroLottoOld) {
                        totaleQuantita = risultati[i].quantitaVenduto;
                        prezzoTot = parseFloat(risultati[i].prezzo * totaleQuantita);
                        totaleQuantita2 = 0;
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        rigaDettaglio[i] = '';
                        totaleQuantita2 = totaleQuantita + totaleQuantita2 + risultati[i].quantitaVenduto;
                        prezzoTot2 = parseFloat(risultati[i].prezzo * totaleQuantita2);
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + totaleQuantita2 + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot2).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        totaleQuantita = 0;
                    }
                }

                //if (risultati[i].dataDDT != '/Date(-62135596800000)/') {
                //    dataDdt = parseJsonDateLettura(risultati[i].dataDDT);
                //}
                //else {
                //    dataDdt = '';
                //}
                //var numLotto = '';
                //if (parseJsonDateLettura(risultati[i].numeroLotto) != '') {
                //    numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                //}
                //var codLotto = '';
                //if (risultati[i].codiceLotto != null) {
                //    codLotto = risultati[i].codiceLotto;
                //}
                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + codLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + numLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';
                //prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                //totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
                idProdottoOld = risultati[i].idProdotto;

                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numeroLottoOld = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                if (risultati[i].codiceLotto != null) {
                    codLottoOld = risultati[i].codiceLotto;
                }

                totaloneQuantita = totaloneQuantita + risultati[i].quantitaVenduto;
                totalonePrezzi = totalonePrezzi + (Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2));
            }

            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaloneQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(totalonePrezzi).toFixed(2) + ' €</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiVendutiDirettamenteAdmin').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraProdottiVendutiDirettamenteAdmin').click(function () {
                var codiceLotto = $('#ProdottiVendutiDirettamenteCodiceLottoAdmin').val();
                var numeroLotto = stringPerDataEsatta($('#ProdottiVendutiDirettamenteNumeroLottoAdmin').val(), "dd-MM-yyyy", "-");

                var DataDa = stringPerDataEsatta($('#ProdottiVendutiDirettamenteDataDaAdmin').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataA($('#ProdottiVendutiDirettamenteDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VenditaDirettaAdmin(DataDa, DataA, numeroLotto, codiceLotto);
            });
                        
        }
    });
    
}

function VendutoPerProdottoAdmin() {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoProdottiVenduti,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVendutoAdmin').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdottiAdmin" class="display" cellspacing="0" width="100%">' +
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

            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                //var numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                //numLotto = '\'' + numLotto + '\'';
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdottoAdmin(' + risultati[i].idProdotto + ', null, ' + desc + ', null, null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande"><a href="javascript:GetVendutoByIdProdottoAdmin(' + risultati[i].idProdotto + ', null, ' + desc + ', null, null, null);">Dettaglio</a></td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdottiAdmin').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

        }
    });

}

function VendutoPerProdottoLottoAdmin() {   

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
        beforeSend: function () { $('.DettRiepilogoVendutoAdmin').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdottiPerLottoAdmin" class="display" cellspacing="0" width="100%">' +
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
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdottoAdmin(' + risultati[i].idProdotto + ', ' + numLotto + ', ' + desc + ', null, null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdottiPerLottoAdmin').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

        }
    });

}

function GetVendutoByIdProdottoAdmin(idProdotto, numeroLotto, descrizione, DataDa, DataA, codiceLotto) {    
    
    //if (numeroLotto != null) {
    //    numeroLotto = stringToDate(numeroLotto, "dd/MM/yyyy", "/");
    //}
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdProdotto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, numeroLotto: numeroLotto, DataDa: DataDa, DataA: DataA, codiceLotto: codiceLotto }),
        error: function (data) {
            console.log(data.responseText);
            $('.DettRiepilogoVendutoAdmin').html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtro per: ' + descrizione + '</h1>' +
                            '<div>' +
                                'NumeroLotto <input type="text" id="VendutiByIdProdottoNumeroLottoAdmin"  class="calendario" data-theme="a" /> CodiceLotto <input type="text" id="VendutiByIdProdottoCodiceLottoAdmin" data-theme="a" />' +
                            '</div>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutiByIdProdottoDataDaAdmin"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdProdottoDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdProdottoAdmin" value="Filtra" class="filtraVendutiByIdProdottoAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdProdottoAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Distributore</th>' +
                                            //'<th>Cliente</th>' +
                                            
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            var prezzoTot = 0;
            var prezzoTot2 = 0;
            var totalonePrezzi = 0;
            var totaleQuantita = 0;
            var totaleQuantita2 = 0;
            var totaloneQuantita = 0;
            var idProdottoOld = 0;
            var numeroLottoOld = '';
            var codLottoOld = '';
            var dataScadenzaOld = '';
            var rigaDettaglio = new Array();

            for (var i = 0; i < risultati.length; i++) {
                var numLotto = '';
                rigaDettaglio[i] = '';
                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                var codLotto = '';
                if (risultati[i].codiceLotto != null) {
                    codLotto = risultati[i].codiceLotto;
                }
                if (risultati[i].idProdotto != idProdottoOld) {
                    totaleQuantita2 = risultati[i].quantitaVenduto;
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {

                    if (numLotto != numeroLottoOld) {
                        totaleQuantita = risultati[i].quantitaVenduto;
                        prezzoTot = parseFloat(risultati[i].prezzo * totaleQuantita);
                        totaleQuantita2 = 0;
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        rigaDettaglio[i] = '';
                        totaleQuantita2 = totaleQuantita + totaleQuantita2 + risultati[i].quantitaVenduto;
                        prezzoTot2 = parseFloat(risultati[i].prezzo * totaleQuantita2);
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + totaleQuantita2 + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot2).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        totaleQuantita = 0;
                    }
                }
                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + codLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + numLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';


                idProdottoOld = risultati[i].idProdotto;

                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numeroLottoOld = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                if (risultati[i].codiceLotto != null) {
                    codLottoOld = risultati[i].codiceLotto;
                }

                totaloneQuantita = totaloneQuantita + risultati[i].quantitaVenduto;
                totalonePrezzi = totalonePrezzi + (Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2));
            }

            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale:<br>' + totaleQuantita + '</th>' +
                                            '<th>Totale:<br>' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Distributore</th>' +
                                            
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdProdottoAdmin').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );
            
            $('.filtraVendutiByIdProdottoAdmin').click(function () {
                var codiceLotto = $('#VendutiByIdProdottoCodiceLottoAdmin').val();
                var numeroLotto = stringPerDataEsatta($('#VendutiByIdProdottoNumeroLottoAdmin').val(), "dd-MM-yyyy", "-");

                var DataDa = stringPerDataEsatta($('#VendutiByIdProdottoDataDaAdmin').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataA($('#VendutiByIdProdottoDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdProdottoAdmin(idProdotto, numeroLotto, descrizione, DataDa, DataA, codiceLotto);
            });

        }
    });

}

function VendutoPerTuttiDistributoriAdmin(DataDa, DataA, numeroLotto, codiceLotto) {   

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoPerTuttiDistributori,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA, numeroLotto: numeroLotto, codiceLotto: codiceLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVendutoAdmin').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
                            '<div>' +
                                'NumeroLotto <input type="text" id="VendutoPerTuttiDitributoriAdminNumeroLotto"  class="calendario" data-theme="a" /> CodiceLotto <input type="text" id="VendutoPerTuttiDitributoriAdminCodiceLotto" data-theme="a" />' +
                            '</div>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriDataDaAdmin"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributoreAdmin" value="Filtra" class="filtraVendutoPerTuttiDitributoriAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutoPerTuttiDitributoriAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Distributore</th>' +
                                            //'<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {
                var numLotto = '';
                if (parseJsonDateLettura(risultati[i].numeroLotto) != '') {
                    numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                var codLotto = '';
                if (risultati[i].codiceLotto != null) {
                    codLotto = risultati[i].codiceLotto;
                }
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + codLotto + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + numLotto + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }

           
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Venduto Mark: </th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Distributore</th>' +
                                            //'<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutoPerTuttiDitributoriAdmin').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraVendutoPerTuttiDitributoriAdmin').click(function () {
                var codiceLotto = $('#VendutoPerTuttiDitributoriAdminCodiceLotto').val();
                var numeroLotto = stringPerDataEsatta($('#VendutoPerTuttiDitributoriAdminNumeroLotto').val(), "dd-MM-yyyy", "-");

                var DataDa = stringPerDataEsatta($('#VendutoPerTuttiDitributoriDataDaAdmin').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataA($('#VendutoPerTuttiDitributoriDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributoriAdmin(DataDa, DataA, numeroLotto, codiceLotto);
            });

        }
    });

}

function VendutoPerTuttiDistributoriStampaAdmin(DataDa, DataA) {    

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
        beforeSend: function () { $('.DettRiepilogoVendutoAdmin').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log(risultati);
            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriStampaDataDaAdmin"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriStampaDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributoreStampa" value="Filtra" class="filtraVendutoPerTuttiDitributoriStampaAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutoPerTuttiDitributoriStampaAdmin" class="display" cellspacing="0" width="100%">' +
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

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);            

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutoPerTuttiDitributoriStampaAdmin').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraVendutoPerTuttiDitributoriStampaAdmin').click(function () {
                //var DataDa = stringToDate($('#VendutoPerTuttiDitributoriStampaDataDaAdmin').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#VendutoPerTuttiDitributoriStampaDataAAdmin').val(), "dd-MM-yyyy", "-");
                var DataDa = stringPerDataEsatta($('#VendutoPerTuttiDitributoriStampaDataDaAdmin').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataA($('#VendutoPerTuttiDitributoriStampaDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributoriStampaAdmin(DataDa, DataA);
            });

        }
    });

}

function VendutoPerDistributoreAdmin() {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoDistributori,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVendutoAdmin').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per Distributore:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
            var Citta = '';
            var CittaOld = '';
            for (var i = 0; i < risultati.length; i++) {
                Citta = risultati[i].Citta;
                var indirizzo = risultati[i].indirizzo;
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';

                if (Citta != CittaOld) {
                    dettaglio = dettaglio + '<li data-role="list-divider" class="ui-li-divider">' + Citta + '</li>';
                }

                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdDistributoreAdmin(' + risultati[i].idDistributore + ', ' + desc + ', null, null, null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
                CittaOld = risultati[i].Citta;
            }
            dettaglio = dettaglio + '</ul>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });           

        }
    });

}

function GetVendutoByIdDistributoreAdmin(idDistributore, descrizione, DataDa, DataA, numeroLotto, codiceLotto) {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdDistributore,
        cache: false,
        async: true,
        data: JSON.stringify({ idDistributore: idDistributore, DataDa: DataDa, DataA: DataA, numeroLotto: numeroLotto, codiceLotto: codiceLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Riepilogo Venduto per Distributore: ' + descrizione + '</h1>' +
                            '<div>' +
                                'NumeroLotto <input type="text" id="VendutoDitributoreNumeroLottoAdmin"  class="calendario" data-theme="a" /> CodiceLotto <input type="text" id="VendutoDitributoreCodiceLottoAdmin" data-theme="a" />' +
                            '</div>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoDitributoreDataDaAdmin"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoDitributoreDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributoreAdmin" value="Filtra" class="filtraVendutoDitributoreAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdDistributoreAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Distributore</th>' +                                            
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var prezzoTot2 = 0;
            var totalonePrezzi = 0;
            var totaleQuantita = 0;
            var totaleQuantita2 = 0;
            var totaloneQuantita = 0;
            var idProdottoOld = 0;
            var numeroLottoOld = '';
            var codLottoOld = '';
            var dataScadenzaOld = '';
            var rigaDettaglio = new Array();

            for (var i = 0; i < risultati.length; i++) {
                var numLotto = '';
                rigaDettaglio[i] = '';
                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                var codLotto = '';
                if (risultati[i].codiceLotto != null) {
                    codLotto = risultati[i].codiceLotto;
                }
                if (risultati[i].idProdotto != idProdottoOld) {
                    totaleQuantita2 = risultati[i].quantitaVenduto;
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {
                                        
                    if (numLotto != numeroLottoOld) {
                        totaleQuantita = risultati[i].quantitaVenduto;
                        prezzoTot = parseFloat(risultati[i].prezzo * totaleQuantita);
                        totaleQuantita2 = 0;
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        rigaDettaglio[i] = '';                        
                        totaleQuantita2 = totaleQuantita + totaleQuantita2 + risultati[i].quantitaVenduto;
                        prezzoTot2 = parseFloat(risultati[i].prezzo * totaleQuantita2);
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + totaleQuantita2 + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot2).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        totaleQuantita = 0;
                    }
                }
                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + codLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + numLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';
                

                idProdottoOld = risultati[i].idProdotto;
                
                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numeroLottoOld = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                if (risultati[i].codiceLotto != null) {
                    codLottoOld = risultati[i].codiceLotto;
                }
                
                totaloneQuantita = totaloneQuantita + risultati[i].quantitaVenduto;
                totalonePrezzi = totalonePrezzi + (Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2));
            }
            
            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }
            
            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdDistributoreAdmin').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraVendutoDitributoreAdmin').click(function () {
                var codiceLotto = $('#VendutoDitributoreCodiceLottoAdmin').val();
                var numeroLotto = stringPerDataEsatta($('#VendutoDitributoreNumeroLottoAdmin').val(), "dd-MM-yyyy", "-");

                var DataDa = stringPerDataEsatta($('#VendutoDitributoreDataDaAdmin').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataA($('#VendutoDitributoreDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdDistributoreAdmin(idDistributore, descrizione, DataDa, DataA, numeroLotto, codiceLotto);
            });

        }
    });

}

function VendutoPerClienteAdmin() {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoCliente,
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

            var dettaglio = '<h1>Filtra per Cliente:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < risultati.length; i++) {
                var indirizzo = '';
                if (risultati[i].indirizzo != null) {
                    indirizzo = risultati[i].indirizzo;
                }
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdClienteAdmin(' + risultati[i].idCliente + ', ' + desc + ', null, null, null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
            }
            dettaglio = dettaglio + '</ul>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });            

        }
    });

}

function GetVendutoByIdClienteAdmin(idCliente, descrizione, DataDa, DataA, numeroLotto, codiceLotto) {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdCliente,
        cache: false,
        async: true,
        data: JSON.stringify({ idCliente: idCliente, DataDa: DataDa, DataA: DataA, numeroLotto: numeroLotto, codiceLotto: codiceLotto }),
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
                                'NumeroLotto <input type="text" id="VendutiByIdClienteNumeroLottoAdmin"  class="calendario" data-theme="a" /> CodiceLotto <input type="text" id="VendutiByIdClienteCodiceLottoAdmin" data-theme="a" />' +
                            '</div>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutiByIdClienteDataDaAdmin" class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdClienteDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdClienteAdmin" value="Filtra" class="filtraVendutiByIdClienteAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdClienteAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var prezzoTot2 = 0;
            var totalonePrezzi = 0;
            var totaleQuantita = 0;
            var totaleQuantita2 = 0;
            var totaloneQuantita = 0;
            var idProdottoOld = 0;
            var numeroLottoOld = '';
            var codLottoOld = '';
            var dataScadenzaOld = '';
            var rigaDettaglio = new Array();
            for (var i = 0; i < risultati.length; i++) {
                var numLotto = '';
                rigaDettaglio[i] = '';
                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                var codLotto = '';
                if (risultati[i].codiceLotto != null) {
                    codLotto = risultati[i].codiceLotto;
                }
                if (risultati[i].idProdotto != idProdottoOld) {
                    totaleQuantita2 = risultati[i].quantitaVenduto;
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {

                    if (numLotto != numeroLottoOld) {
                        totaleQuantita = risultati[i].quantitaVenduto;
                        prezzoTot = parseFloat(risultati[i].prezzo * totaleQuantita);
                        totaleQuantita2 = 0;
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        rigaDettaglio[i] = '';
                        totaleQuantita2 = totaleQuantita + totaleQuantita2 + risultati[i].quantitaVenduto;
                        prezzoTot2 = parseFloat(risultati[i].prezzo * totaleQuantita2);
                        rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + totaleQuantita2 + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTot2).toFixed(2) + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + codLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + numLotto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                        totaleQuantita = 0;
                    }
                }

                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + codLotto + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + numLotto + '</td>';
                ////dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';
                //prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                //totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
                idProdottoOld = risultati[i].idProdotto;

                if (parseJsonDateLettura(risultati[i].numeroLotto) != '' && parseJsonDateLettura(risultati[i].numeroLotto) != '02-01-1') {
                    numeroLottoOld = parseJsonDateLettura(risultati[i].numeroLotto);
                }
                if (risultati[i].codiceLotto != null) {
                    codLottoOld = risultati[i].codiceLotto;
                }

                
                totaloneQuantita = totaloneQuantita + risultati[i].quantitaVenduto;
                totalonePrezzi = totalonePrezzi + (Number(risultati[i].prezzo * risultati[i].quantitaVenduto).toFixed(2));
            }

            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }
            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaloneQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Cod. Lotto</th>' +
                                            '<th>Num. Lotto</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVendutoAdmin').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdClienteAdmin').DataTable(
                { "paging": false, responsive: true, dom: 'T<"clear">lfrtip' }
            );

            $('.filtraVendutiByIdClienteAdmin').click(function () {
                var codiceLotto = $('#VendutiByIdClienteCodiceLottoAdmin').val();
                var numeroLotto = stringPerDataEsatta($('#VendutiByIdClienteNumeroLottoAdmin').val(), "dd-MM-yyyy", "-");

                var DataDa = stringPerDataEsatta($('#VendutiByIdClienteDataDaAdmin').val(), "dd-MM-yyyy", "-");
                var DataA = stringPerDataA($('#VendutiByIdClienteDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                var desc = descrizione;
                //desc = desc.replace("'", "\\'");
                //desc = '\'' + desc + '\'';
                GetVendutoByIdClienteAdmin(idCliente, desc, DataDa, DataA, numeroLotto, codiceLotto);
            });

        }
    });

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
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active svuota ui-btnCarica">Svuota</a></td>';
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
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + row.IdProdotto + '" data-prezzo="' + row.Prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active svuota ui-btnCarica">Svuota</a></td>';
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

                $(".svuota").on('click', function () {
                
                    var idProdotto = $(this).attr('data-idProdotto');
                    var labelQuantita = $(this).closest('td').prev('td').prev('td');                
                    labelQuantita.html('0');
                    AzzeraProdottoInMagazzinoResi(idProdotto);

                });

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
    displayNumeriLottoMagazzinoResi(0, 0);
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

//                //dettaglio = dettaglio + '<tr>';
//                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
//                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
//                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
//                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
//                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
//                //dettaglio = dettaglio + '</tr>';

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
//                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + risultati[i].idProdotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active svuota ui-btnCarica">Svuota</a></td>';
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

//            $(".svuota").on('click', function () {
                
//                var idProdotto = $(this).attr('data-idProdotto');
//                var labelQuantita = $(this).closest('td').prev('td').prev('td');                
//                labelQuantita.html('0');
//                AzzeraProdottoInMagazzinoResi(idProdotto);

//            });

//            displayNumeriLottoMagazzinoResi(0, 0);
//        }
//    });

//}

function AzzeraProdottoInMagazzinoResi(idProdotto) {
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            //var dataModifica = dataOdierna();
            var query = "delete from magazzinoresi where idProdotto = ?";
            t.executeSql(query, [idProdotto], function (transaction, results) {

            //console.log(risultati);
                
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