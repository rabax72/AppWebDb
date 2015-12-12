$(function () {
    
});

function GetStoricoVendutoInCliente(IdCliente, idProd, numeroLotto, numeroRecord) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneVendutoInCliente,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idCliente: IdCliente, idProdotto: idProd, numeroLotto: numeroLotto, numeroRecord: numeroRecord }),
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

            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td><td>Cancella</td></tr>';

            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + '<tr>';
                righe = righe + '<td>' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                righe = righe + '<td>' + risultati[i].quantitaVenduto + '</td>';
                righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnCancella" data-idVendita="' + risultati[i].IdVendita + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzoProdotto="' + risultati[i].prezzo + '" data-quantProdInCli="' + risultati[i].quantitaCliente + '" data-quantExVenduto="' + risultati[i].quantitaVenduto + '">Cancella</a></td>';
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
                var quantProdInCli = $(this).attr('data-quantProdInCli');
                var quantExVenduto = $(this).attr('data-quantExVenduto');
                var idOperatore = localStorage.idOperatore;
                var quantitaRimasti = (parseInt(quantProdInCli) + parseInt(quantExVenduto));
                var prezzoTotaleRimasti = (quantitaRimasti * prezzoProdotto);
                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);

                if (!confirm("Sicuro che vuoi cancellare " + quantExVenduto + " pezzi di questo prodotto?")) return;

                CorrezioneVendita(idVendita);

                StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, 'azzurro');

                //setTimeout(GetSituazioneDistributore(IdDistributore, descDistributore), 3000);                                                 

                $("#popUpStoricoVendutoDaCliente").popup("close");

                $("#popUpStoricoVendutoDaCliente").bind({
                    popupafterclose: function (event, ui) {
                        //alert('chiuso');
                        //console.log(idProdotto);
                        $(".quantProdInCli-" + idProdotto).html(quantitaRimasti);
                    }
                });

                // GetStoricoVendutoInDistributore(IdDistributore, idProdotto, '', 10);
            });
        }

    });
}

function GetSituazioneCliente(IdCliente, descCliente) {
    location.hash = "formDettaglioCliente";
    

    $(".caricaDaCamionPerCliente").attr("data-IdCliente", IdCliente);
    $(".caricaDaCamionPerCliente").attr("data-descCliente", descCliente);
    $(".h1DettCliente").html('Dettaglio Cliente: ' + descCliente);

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneClienteV2",        
        url: urlGetSituazioneClientiV2,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdCliente: IdCliente }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
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
            //if (risultati.length > 0) {
            //    $(".h1DettCliente").html('Dettaglio Cliente: ' + risultati[0].descrizioneCliente);
            //}

            var dettaglio = '<table id="tabellaDettaglioCliente" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +                                                
                                               '<th width="10%">Foto</th>' +
                                                '<th width="15%">Mag.</th>' +
                                                '<th width="20%">Quant. Cli.</th>' +
                                                '<th width="20%">Vendita</th>' +
                                                '<th width="15%">Rimasti</th>' +
                                                '<th width="10%">Resi</th>' +                                                
                                                '<th width="10%">Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +                                              
                                                '<th>Foto</th>' +
                                                '<th>Mag.</th>' +
                                                '<th>Quant. Cli.</th>' +
                                                '<th>Vendita</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
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
            var coloreEvidenziato = '';
            var prodotti = new Array();
            for (var i = 0; i < risultati.length; i++) {
                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                quantita = risultati[i].quantitaDistributore;                
                coloreEvidenziato = risultati[i].colore;
                 
                var evidenziato = "";
                if (risultati[i].caricato) {
                    evidenziato = "verde";
                }

                prodotti[i] = idProd;
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"><a href="#popUpStoricoVendutoDaCliente" data-rel="popup" data-position-to="window" class="storicoVendutoDaCliente" data-idProdotto="' + risultati[i].idProdotto + '"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><br><div id="quantMagazzino' + risultati[i].idProdotto + '" class="quantitaMag">' + risultati[i].quantitaMagazzino + '</div></td>';
                dettaglio = dettaglio + '<td class="quantita ' + coloreEvidenziato + ' quantProdInCli-' + risultati[i].idProdotto + '">' + risultati[i].quantitaCliente + '</td>';
                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Vendita</div> <input type="number" id="caricaCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-quantMagazzino="' + risultati[i].quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaCliente ui-btnCaricaDaMagazzino">Salva</a></td>';
                dettaglio = dettaglio + '<td><div class="medioFont">Rimasti</div> <input type="number" id="rimastoCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimastiCliente ui-btnCarica">Salva</a> </td>';
                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Resi</div> <input type="number" id="resoCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';                
                //dettaglio = dettaglio + '<td><input type="checkbox" data-role="flipswitch" name="flip-checkbox-' + risultati[i].idProdotto + '" id="flip-checkbox-' + risultati[i].idProdotto + '" data-on-text="Camion" data-off-text="Cliente" data-wrapper-class="custom-size-flipswitch" checked=""><span id="quantInCamionCliente-' + risultati[i].idProdotto + '" class="quantSuCamion"></span> <input type="number" id="spostaCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaCliente ui-btnSposta">Salva</a></td>';
                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Scarica</div> <input type="number" id="spostaCliente' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-quantMagazzino="' + risultati[i].quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaCliente ui-btnSposta">Salva</a></td>';
                dettaglio = dettaglio + '</tr>';
            }    

            dettaglio = dettaglio + '</tbody> </table>';
            var desc = descCliente;
            desc = desc.replace("'", "\\'");
            desc = '\'' + desc + '\'';
            dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCarica fineCarico" onclick="togliEvidenziatoCliente(' + IdCliente + ', ' + desc + ')" /></p>';

            //console.log(dettaglio);
            $('.DettaglioCliente').html(dettaglio);
            
            var table = $('#tabellaDettaglioCliente').DataTable(
                {
                    "paging": false, responsive: true, "fnDrawCallback": function () {
                        $(this).trigger('create');
                    }
                }
            );

            for (var i = 0; i < prodotti.length; i++) {
                GetProdottiInCamionPerClienteByIdProdotto(1, prodotti[i]);
            }

            $(".storicoVendutoDaCliente").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
               
                //console.log("IdCliente=" + IdCliente + ", idProdotto=" + idProdotto );
                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
                GetStoricoVendutoInCliente(IdCliente, idProdotto, '', 10);

            });

            $('.caricaCliente').on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var quantitaDaCaricare = $('#caricaCliente' + idProdotto).val();
                var quantMagazzino = $('#quantMagazzino' + idProdotto).text();
                var quantRestante = (quantMagazzino - quantitaDaCaricare);
                var labelQuantita = $(this).closest('td').prev('td');
                var quantitaAggiornata = (parseInt(quantitaDaCaricare) + parseInt(labelQuantita.text()));
                var prezzo = $(this).attr('data-prezzo');
                var prezzoTotale = (prezzo * quantRestante);
                var prezzoTotaleProdCaricato = (prezzo * quantitaDaCaricare);
                var idOperatore = localStorage.idOperatore;
                var giacenza = $('#quantMagazzino' + idProdotto);

                if (quantitaDaCaricare == "" || isInteroPositivo(parseInt(quantitaDaCaricare)) == false) {
                    alert("Scegli un valore Numerico per indicare quanto caricare!");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaDaCaricare) > parseInt(quantMagazzino)) {
                    alert("E' impossibile che siano più prodotti da caricare di quelli presenti in magazzino!");
                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                //console.log('idProdotto=' + idProdotto + ' quantRestante=' + quantRestante + ' prezzoTotale=' + prezzoTotale);
                //return;

                //if (!confirm("Sicuro che vuoi caricare " + quantitaDaCaricare + " pezzi di questo prodotto?")) return;

                SmaltiscoProdottiDaMagazzinoV2(idProdotto, quantRestante, prezzoTotale, idOperatore, false, 'verde');
                
                if (parseInt(quantitaDaCaricare) > 0) {
                    InsertProdottiInCliente(IdCliente, idProdotto, quantitaDaCaricare, prezzoTotaleProdCaricato, idOperatore, 'verde');                    
                }

                labelQuantita.html(quantitaAggiornata);
                giacenza.html(quantRestante);

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

            $(".rimastiCliente").on('click', function () {

                var IdSituazioneCliente = $(this).attr('data-IdSituazioneCliente');                
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaRimasti = $('#rimastoCliente' + idProdotto).val();
                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = localStorage.idOperatore;                

                if (quantitaRimasti == "") {
                    alert("Scegli un valore Numerico prima di caricare");
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

                //if (!confirm("Sicuro che al cliente sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;

                SalvaRimastiCliente(IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
                //console.log(labelQuantita);

                $('#rimastoCliente' + idProdotto).val('');
                
                labelQuantita.animate({
                    backgroundColor: "#38c",
                    color: "#000"
                }, 1000);
                labelQuantita.html(quantitaRimasti);
            });

            $(".resi").on('click', function () {

                //var IdSituazioneCliente = $(this).attr('data-IdSituazioneCliente');
                //var IdCliente = $(this).attr('data-IdCliente');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaResi = $('#resoCliente' + idProdotto).val();
                var quantitaDist = $(this).closest('td').prev('td').prev('td').prev('td').text();
                var prezzoTotale = (prezzo * quantitaResi);
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                //var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                var quantitaRimasta = (quantitaDist - quantitaResi);
                
                //if (quantitaResi == "" || isInteroPositivo(parseInt(quantitaResi)) == false) {
                //    alert("Scegli un valore Numerico prima di caricare");
                //    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                //    return;
                //} else {
                //    $(this).prev().removeClass("evidenziaErrore");
                //}

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

                //if (!confirm("Sicuro che il cliente ti ha reso " + quantitaResi + " pezzi di questo prodotto?")) return;

                SalvaResiCliente(IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore);

                $('#resoCliente' + idProdotto).val('');

                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "red",
                    color: "#000"
                }, 1000);
                
                labelQuantita.html(quantitaRimasta);
            });
            
            $('.spostaCliente').on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var quantitaDaSpostare = $('#spostaCliente' + idProdotto).val();
                //var quantCamion = $('#quantInCamionCliente-' + idProdotto);
                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                var prezzo = $(this).attr('data-prezzo');
                var giacenza = $('#quantMagazzino' + idProdotto);
                var quantMagazzino = $('#quantMagazzino' + idProdotto).text();
                var quantRestante = (parseInt(quantMagazzino) + parseInt(quantitaDaSpostare));
                var prezzoTotaleRimasti = (prezzo * quantRestante);
                var prezzoTotaleRimastiDistributore = (prezzo * (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare)));

                var idOperatore = localStorage.idOperatore;

                //var direzione = $('#flip-checkbox-' + idProdotto).is(':checked');

                if (quantitaDaSpostare == "" || isInteroPositivo(parseInt(quantitaDaSpostare)) == false) {
                    alert("Scegli un valore Numerico per indicare quanto scaricare!");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaDaSpostare) > parseInt(labelQuantita.text())) {
                    alert("E' impossibile spostare più prodotti di quelli presenti dal Cliente!");
                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }
                var quantRestanteDistributore = (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare));
                //var quantRestanteCamion = (parseInt(quantCamion.text()) + parseInt(quantitaDaSpostare));

                StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore, 'arancio');
                storicizzaProdottoInMagazzino(idProdotto, idOperatore, '', true, quantRestante, prezzoTotaleRimasti);

                labelQuantita.html(quantRestanteDistributore);                

                $('#spostaCliente' + idProdotto).val('');

                labelQuantita.animate({
                    backgroundColor: "#FFA500",
                    color: "#000"
                }, 1000);

                giacenza.html(quantRestante);
                giacenza.animate({
                    backgroundColor: "#FFA500",
                    color: "#000"
                }, 1000);

                //if (!confirm("Sicuro che vuoi spostare " + quantitaDaSpostare + " pezzi di questo prodotto?")) return;

                //if (direzione) {
                //    if (parseInt(quantitaDaSpostare) > parseInt(labelQuantita.text())) {
                //        alert("E' impossibile spostare più prodotti di quelli presenti dal Cliente!");
                //        //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                //        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                //        return;
                //    } else {
                //        $(this).prev().removeClass("evidenziaErrore");
                //    }
                //    var quantRestanteDistributore = (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare));
                //    var quantRestanteCamion = (parseInt(quantCamion.text()) + parseInt(quantitaDaSpostare));

                //} else {
                //    if (parseInt(quantitaDaSpostare) > parseInt(quantCamion.text())) {
                //        alert("E' impossibile spostare più prodotti di quelli presenti sul camion!");
                //        //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                //        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                //        return;
                //    } else {
                //        $(this).prev().removeClass("evidenziaErrore");
                //    }
                //    var quantRestanteDistributore = (parseInt(labelQuantita.text()) + parseInt(quantitaDaSpostare));
                //    var quantRestanteCamion = (parseInt(quantCamion.text()) - parseInt(quantitaDaSpostare));
                //    //InsertProdottiInCamionV2(idProdotto, quantitaDaSpostare, prezzoTotaleRimastiCamion, idOperatore, 1);
                //}
                //var prezzoTotaleRimastiDistributore = (prezzo * quantRestanteDistributore);
                //var prezzoTotaleRimastiCamion = (prezzo * quantRestanteCamion);

                //StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore);
                //StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore, 'arancio');
                //StoricizzoProdInTrasportoV2(idProdotto, idOperatore, quantRestanteCamion, prezzoTotaleRimastiCamion, 0, IdCliente);

                //labelQuantita.html(quantRestanteDistributore);
                //quantCamion.html(quantRestanteCamion);

                //labelQuantita.animate({
                //    backgroundColor: "#FFA500",
                //    color: "#000"
                //}, 1000);

                //quantCamion.animate({
                //    backgroundColor: "#FFA500",
                //    color: "#000"
                //}, 1000);

            });
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

function SalvaRimastiCliente(IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore) {

    StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, 'azzurro');
    
    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('IdCliente=' + IdCliente + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    //if (quantitaRimasti > 0) {
    //    InsertProdottiInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);
    //}
       
    //Inserisco la quantita di Prodotti Venduti
    var VenditaDiretta = false;
    var idDistributore = 0;

    if (parseInt(quantitaVenduti) > 0) {
        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, IdCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta);        
    }
    

    //****************************************************************** 

    //GetSituazioneCliente(IdCliente, null);
}

function SalvaResiCliente(IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore) {    
    
    StoricizzoStatoProdottoInCliente(IdCliente, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, 'rosso');
    //alert(' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta);

    //if (quantitaRimasta > 0) {
    //    InsertProdottiInCliente(IdCliente, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT);
    //}

    var idDistributore = 0;
    //Inserisco la quantita di Resi nel Magazzino Resi
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResiV2",        
        url: urlAggiornaQuantitaProdottiInMagazzinoResiV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore:idDistributore, IdCliente: IdCliente, quantita: quantitaResi, prezzoTotale: prezzoTotale, idOperatore: idOperatore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //$(".menuPrincipale").hide();

            //$('.DettaglioDistributore').html(dettaglio);

            //GetSituazioneDistributore(IdCliente);
        }

    });
    //******************************************************************   
    
    //GetSituazioneCliente(IdCliente, null);
}

//Storicizzo la quantita di prodotto in possesso di un dato cliente
function StoricizzoStatoProdottoInCliente(idCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, colore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInClienteV2",        
        url: urlStoricizzaStatoProdottoInClienteV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idCliente: idCliente, idProdotto: idProdotto}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log(risultati);
            if (parseInt(quantitaRimasti) > 0) {
                InsertProdottiInCliente(idCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, colore);
            }
        }

    });
    //******************************************************************
}

//inserisco in un determinato Cliente una determinata quantita di Prodotto
function InsertProdottiInCliente(IdCliente, idProdotto, quantita, prezzoTotale, idOperatore, colore) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInClienteV2",        
        url: urlAggiornaQuantitaProdottoInClienteV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdCliente: IdCliente, idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            AggiornaColoreProdottoInCliente(IdCliente, idProdotto, colore);
        }

    });
}

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
            //$('.DettaglioDistributore').html(dettaglio);
            //AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, 'rosso');

        }

    });
}
        