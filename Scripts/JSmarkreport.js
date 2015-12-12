function componiData(_date) {
    var dataDaComporre = _date.toString();
    var year = dataDaComporre.substr(0, 2);
    year = '20' + year;
    var month = dataDaComporre.substr(2, 2);
    var day = dataDaComporre.substr(4, 2);
    // var formatedDate = new Date(year, month, day);
    var formatedDate = day + '/' + month + '/' + year;
    return formatedDate;
}

function GetMarkReport() {
    location.hash = "MarkReport";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMarkReport,
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
            console.log(risultati);
            var dettaglio = '<h1>Riepilogo Mark per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="MarkReportDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="MarkReportDataA"  class="calendario" data-theme="a" /> <button id="filtraMarkReport" value="Filtra" class="filtraMarkReport">Filtra</button>' +
                            '</div><table id="tabellaMarkReport" class="table table-striped table-bordered dataTable">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Distr.</th>' +
                                            '<th>Cod. Gett.</th>' +
                                            '<th>Venduto</th>' +
                                            '<th>Inviato in cassa </th>' +
                                            '<th>Banconote </th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Data Ril. prec.</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleVenduto = 0;
            var totaleInviatoCassa = 0;
            var totaleBanconote = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].nomeDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].codiceGettoniera + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">€ ' + Number(risultati[i].venduto / 100).toFixed(2) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">€ ' + Number(risultati[i].inviatoInCassa / 100).toFixed(2) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">€ ' + risultati[i].banconote + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + componiData(risultati[i].dataRilevazione) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + componiData(risultati[i].dataRilevazionePrecedente) + '</td>';
                dettaglio = dettaglio + '</tr>';
                var totInv = risultati[i].inviatoInCassa;
                var totBanc = risultati[i].banconote;
                //totInv = totInv.replace("$ ", "");
                //totInv = totInv.replace(".", ",");
                totaleInviatoCassa = (totaleInviatoCassa + parseFloat(totInv / 100));
                totaleBanconote = parseFloat(totaleBanconote) + parseFloat(Number(risultati[i].banconote).toFixed(2));
                totaleVenduto = (totaleVenduto + parseFloat((risultati[i].venduto)/100));
                //console.log(totaleInviatoCassa)
            }

            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Distr.</th>' +
                                            '<th>Cod. Gett.</th>' +                                            
                                            '<th>Totale Venduto: ' + totaleVenduto.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Totale Inviato in cassa: ' + totaleInviatoCassa.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Totale Banconote: ' + totaleBanconote.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Data Ril. prec.</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettMarkReport').html(dettaglio);
            
            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaMarkReport').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraMarkReport').click(function () {
                //var DataDa = stringToDate($('#MarkReportDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#MarkReportDataA').val(), "dd-MM-yyyy", "-");

                var DataDa = $('#MarkReportDataDa').val();
                var DataA = stringPerDataA($('#MarkReportDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                filterMarkReport(DataDa, DataA);
            });

        }
    });

}

function filterMarkReport(DataDa, DataA) {
    var distributore = '';
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlFilterMarkReport,
        cache: false,
        async: true,
        data: JSON.stringify({ distributore: distributore, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log(risultati);
            var dettaglio = '<h1>Riepilogo Mark filtrato</h1>' +
                '<div>' +
                    'Data Da <input type="text" id="MarkReportDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="MarkReportDataA"  class="calendario" data-theme="a" /> <button id="filtraMarkReport" value="Filtra" class="filtraMarkReport">Filtra</button>' +
                '</div><table id="tabellaMarkReport" class="table table-striped table-bordered dataTable">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>Distributore</th>' +
                            '<th>Codice Gettoniera</th>' +
                            '<th>Venduto</th>' +
                            '<th>Inviato in cassa</th>' +
                            '<th>Banconote</th>' +
                            '<th>Data Rilevazione</th>' +
                            '<th>Data rilevazione precedente</th>' +
                        '</tr>' +
                   '</thead>' +
                   '<tbody>';
            var prezzoTot = 0;
            var prezzoTotCassa = 0;
            var prezzoTotBanconote = 0;
            var totaleQuantita = 0;
            var dataDdt = '';
            for (var i = 0; i < risultati.length; i++) {
                //if (risultati[i].dataDDT != '/Date(-62135596800000)/') {
                //    dataDdt = parseJsonDateLettura(risultati[i].dataDDT);
                //}
                //else {
                //    dataDdt = '';
                //}
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].nomeDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].codiceGettoniera + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">€ ' + Number(risultati[i].venduto / 100).toFixed(2) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">€ ' + Number(risultati[i].inviatoInCassa / 100).toFixed(2) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">€ ' + risultati[i].banconote + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + componiData(risultati[i].dataRilevazione) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + componiData(risultati[i].dataRilevazionePrecedente) + '</td>';

                prezzoTot = parseFloat(prezzoTot) + parseFloat(Number(risultati[i].venduto / 100).toFixed(2));
                prezzoTotCassa = parseFloat(prezzoTotCassa) + parseFloat(Number(risultati[i].inviatoInCassa / 100).toFixed(2));
                prezzoTotBanconote = parseFloat(prezzoTotBanconote) + parseFloat(Number(risultati[i].banconote).toFixed(2));


            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Distributore</th>' +
                                            '<th>Codice Gettoniera</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Totale Inviato in cassa: ' + Number(prezzoTotCassa).toFixed(2) + '€</th>' +
                                            '<th>Totale Banconote: ' + Number(prezzoTotBanconote).toFixed(2) + '€</th>' +
                                            '<th>Data Rilevazione</th>' +
                                            '<th>Data rilevazione precedente</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettMarkReport').html(dettaglio);

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaMarkReport').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraMarkReport').click(function () {
                //var DataDa = stringToDate($('#MarkReportDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#MarkReportDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#MarkReportDataDa').val();
                var DataA = stringPerDataA($('#MarkReportDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                filterMarkReport(DataDa, DataA);
            });
        }
    });
}