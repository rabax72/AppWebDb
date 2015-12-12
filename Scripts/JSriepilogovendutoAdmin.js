$(function () {
    
    

});

function RiepilogoVendutoAdmin() {

    $('.DettRiepilogoVendutoAdmin').html('');
    location.hash = "RiepilogoVendutoAdmin";
}

function VenditaDirettaAdmin(DataDa, DataA) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",                
        url: urlGetVendutoDirettamente,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<div>' +
                                'Data Da <input type="text" id="ProdottiVendutiDirettamenteDataDaAdmin" class="calendario" data-theme="a" /> Data A <input type="text" id="ProdottiVendutiDirettamenteDataAAdmin" class="calendario" data-theme="a" /> <button id="filtraProdottiVendutiDirettamenteAdmin" value="Filtra" class="filtraProdottiVendutiDirettamenteAdmin">Filtra</button>' +
                            '</div><table id="tabellaProdottiVendutiDirettamenteAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
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
            for (var i = 0; i < risultati.length; i++) {
                if (risultati[i].dataDDT != '/Date(-62135596800000)/') {
                    dataDdt = parseJsonDateLettura(risultati[i].dataDDT);
                }
                else {
                    dataDdt = '';
                }
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + dataDdt + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + ' €</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +     
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
                //var DataDa = stringToDate($('#ProdottiVendutiDirettamenteDataDaAdmin').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#ProdottiVendutiDirettamenteDataAAdmin').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#ProdottiVendutiDirettamenteDataDaAdmin').val();
                var DataA = stringPerDataA($('#ProdottiVendutiDirettamenteDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VenditaDirettaAdmin(DataDa, DataA);
            });
            
            
        }
    });
    
}

function VendutoPerProdottoAdmin() {
    // location.hash = "VenditaDirettaAdmin";

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

            console.log(risultati);

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
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdottoAdmin(' + risultati[i].idProdotto + ', null, ' + desc + ', null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande"><a href="javascript:GetVendutoByIdProdottoAdmin(' + risultati[i].idProdotto + ', null, ' + desc + ', null, null);">Dettaglio</a></td>';
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
    // location.hash = "VenditaDirettaAdmin";

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
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdottoAdmin(' + risultati[i].idProdotto + ', ' + numLotto + ', ' + desc + ', null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
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

function GetVendutoByIdProdottoAdmin(idProdotto, numeroLotto, descrizione, DataDa, DataA) {
    // location.hash = "VenditaDirettaAdmin";
    
    if (numeroLotto != null) {
        numeroLotto = stringToDate(numeroLotto, "dd/MM/yyyy", "/");
    }
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdProdotto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, numeroLotto:numeroLotto, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText);
            $('.DettRiepilogoVendutoAdmin').html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);

            var dettaglio = '<h1>Filtro per: ' + descrizione + '</h1>' + '<div>' +
                                'Data Da <input type="text" id="VendutiByIdProdottoDataDaAdmin"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdProdottoDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdProdottoAdmin" value="Filtra" class="filtraVendutiByIdProdottoAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdProdottoAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
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
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale:<br>' + totaleQuantita + '</th>' +
                                            '<th>Totale:<br>' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Data Ril.</th>' +
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
                //var DataDa = stringToDate($('#VendutiByIdProdottoDataDaAdmin').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#VendutiByIdProdottoDataAAdmin').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#VendutiByIdProdottoDataDaAdmin').val();
                var DataA = stringPerDataA($('#VendutiByIdProdottoDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdProdottoAdmin(idProdotto, numeroLotto, descrizione, DataDa, DataA);
            });

        }
    });

}

function VendutoPerTuttiDistributoriAdmin(DataDa, DataA) {
    // location.hash = "VenditaDirettaAdmin";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoPerTuttiDistributori,
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

            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
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
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
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
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Venduto Mark: </th>' +
                                            //'<th>Data DDT</th>' +
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

            var table = $('#tabellaVendutoPerTuttiDitributoriAdmin').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraVendutoPerTuttiDitributoriAdmin').click(function () {
                //var DataDa = stringToDate($('#VendutoPerTuttiDitributoriDataDaAdmin').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#VendutoPerTuttiDitributoriDataAAdmin').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#VendutoPerTuttiDitributoriDataDaAdmin').val();
                var DataA = stringPerDataA($('#VendutoPerTuttiDitributoriDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributoriAdmin(DataDa, DataA);
            });

        }
    });

}

function VendutoPerTuttiDistributoriStampaAdmin(DataDa, DataA) {
    // location.hash = "VenditaDirettaAdmin";

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
            console.log(risultati);
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
                var DataDa = $('#VendutoPerTuttiDitributoriStampaDataDaAdmin').val();
                var DataA = stringPerDataA($('#VendutoPerTuttiDitributoriStampaDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributoriStampaAdmin(DataDa, DataA);
            });

        }
    });

}

function VendutoPerDistributoreAdmin() {
    // location.hash = "VenditaDirettaAdmin";

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

                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdDistributoreAdmin(' + risultati[i].idDistributore + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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

function GetVendutoByIdDistributoreAdmin(idDistributore, descrizione, DataDa, DataA) {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdDistributore,
        cache: false,
        async: true,
        data: JSON.stringify({ idDistributore: idDistributore, DataDa: DataDa, DataA: DataA }),
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
                                'Data Da <input type="text" id="VendutoDitributoreDataDaAdmin"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoDitributoreDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributoreAdmin" value="Filtra" class="filtraVendutoDitributoreAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdDistributoreAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
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
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            
            //dettaglio = dettaglio + '<tr>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>Totale Venduto: ' + prezzoTot + '€</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                        '</tr>';
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
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
                //var DataDa = stringToDate($('#VendutoDitributoreDataDaAdmin').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#VendutoDitributoreDataAAdmin').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#VendutoDitributoreDataDaAdmin').val();
                var DataA = stringPerDataA($('#VendutoDitributoreDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdDistributoreAdmin(idDistributore, descrizione, DataDa, DataA);
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
                var indirizzo = risultati[i].indirizzo;
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "\\'");
                desc = '\'' + desc + '\'';
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdClienteAdmin(' + risultati[i].idCliente + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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

function GetVendutoByIdClienteAdmin(idCliente, descrizione, DataDa, DataA) {    

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
                                'Data Da <input type="text" id="VendutiByIdClienteDataDaAdmin" class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdClienteDataAAdmin"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdClienteAdmin" value="Filtra" class="filtraVendutiByIdClienteAdmin">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdClienteAdmin" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
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
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
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
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            //'<th>Cliente</th>' +
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
                //var DataDa = stringToDate($('#VendutiByIdClienteDataDaAdmin').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#VendutiByIdClienteDataAAdmin').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#VendutiByIdClienteDataDaAdmin').val();
                var DataA = stringPerDataA($('#VendutiByIdClienteDataAAdmin').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                var desc = descrizione;
                //desc = desc.replace("'", "\\'");
                //desc = '\'' + desc + '\'';
                GetVendutoByIdClienteAdmin(idCliente, desc, DataDa, DataA);
            });

        }
    });

}

function GetProdottiInMagazzinoResi() {

    location.hash = "RiepilogoResi";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetProdottiInMagazzinoResi,
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
                quantita = risultati[i].quantitaMagazzinoResi;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    prezzoTotProd = risultati[i].prezzoTotale;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="descrizioneReso' + risultati[i].idProdotto + '">' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzinoResi + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Svuota</a></td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {
                   
                    rigaDettaglio[i - 1] = '';
                    quantitaTot = (quantitaTot + quantita);
                    prezzoTotProd = prezzoTotProd + risultati[i].prezzoTotale;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="descrizioneReso' + risultati[i].idProdotto + '">' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTotProd).toFixed(2) + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto"><a href="#" data-idProdotto="' + risultati[i].idProdotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active svuota ui-btnCarica">Svuota</a></td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                   
                }
                idProdOld = risultati[i].idProdotto;
                //numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaMagazzinoResi;
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaMagazzinoResi;
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

            displayNumeriLottoMagazzinoResi(0, 0);
        }
    });

}

function AzzeraProdottoInMagazzinoResi(idProdotto) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlAzzeraProdottoInMagazzinoResi,
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
            displayNumeriLottoMagazzinoResi(idProdotto, 0);
        }
    });
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