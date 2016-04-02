
function SincronizzaTabletConProdottiInMagazzino() {
    location.hash = "SyncronizzazioneMagazzinoToTablet";
    $('.contentSyncroMagToTablet').html('');

    if (!confirm("Sicuro che vuoi procedere all aggiornamento dei dati sul tablet??? Tutti i dati attualmente presenti verranno cancellati e sovrascritti con quelli presenti sul server!")) return;
    if (mydb) {
        AggiornaDataSincronizzazione('MagToTablet');               

    } else {
        alert("db not found, your browser does not support web sql!");
    }
        
}

function SincronizzaVendutoDaTablet() {
    if (!confirm("Sicuro che vuoi procedere all aggiornamento dei dati sul server???")) return;

    location.hash = "SyncronizzazioneTabletToVenduto";
    $('.contentSyncronizzazioneTabletToVenduto').html('');
    
    var idOperatore = localStorage.idOperatore;

    //AggiornaDataSincronizzazione('TabToMag');

    $('.contentSyncronizzazioneTabletToVendutoCompletato').html('');
    getDataUltimaSincronizzazione(CheckNewItemInMagazzino);
    getDataUltimaSincronizzazione(CheckNewItemInMagazzinoResi);
    getDataUltimaSincronizzazione(CheckNewItemInSituazioneDistributore);
    //getDataUltimaSincronizzazione(CheckNewItemInSituazioneCliente);
    getDataUltimaSincronizzazione(CheckNewItemInVenduto);
           
}

function AggiornaDataSincronizzazione(verso) {
    var idOperatore = localStorage.idOperatore;
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("Insert into sincronizzazioni (idOperatore, verso, numtabelleaggiornate) Values (?, ?, 0)", [idOperatore, verso], function (transaction, results) {
                if (verso == 'MagToTablet') {
                    //RecuperoDatiPerTabellaClienti();
                    RecuperoDatiPerTabellaDistributori();
                    //RecuperoDatiPerTabellaMezzi();
                    RecuperoDatiPerTabellaOperatori();
                    RecuperoDatiPerTabellaProdotti();
                    //RecuperoDatiPerTabellaSituazioneClienti();
                    RecuperoDatiPerTabellaSituazioneDistributori();
                    RecuperoDatiPerTabellaVenduto();
                    RecuperoDatiPerTabellaMagazzino();
                    RecuperoDatiPerTabellaMagazzinoResi();
                }
                if (verso == 'TabToMag') {
                    //getDataUltimaSincronizzazione(CheckNewItemInMagazzino);
                    //getDataUltimaSincronizzazione(CheckNewItemInMagazzinoResi);
                    //getDataUltimaSincronizzazione(CheckNewItemInSituazioneDistributore);
                    ////getDataUltimaSincronizzazione(CheckNewItemInSituazioneCliente);
                    //getDataUltimaSincronizzazione(CheckNewItemInVenduto);
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

function getDataUltimaSincronizzazione(callBackFunction) {
    var risultato = "";
    var idOperatore = localStorage.idOperatore;
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("select max(ultimoaggiornamento) as ultimaSincro from sincronizzazioni where idoperatore = ?", [idOperatore], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    risultato = row.ultimaSincro;
                    callBackFunction(risultato);
                }
                
                //return risultato;
            }, errorHandler);

        });
        
        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

function RecuperoDatiPerTabellaClienti() {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",               
        url: urlGetElencoClienti,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            var testoInsert = "INSERT INTO clienti (IdCliente, Descrizione, Indirizzo, DataInserimento, DataModifica, Cancellato, IdOperatore, ordine) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "''");
                //desc = '\'' + desc + '\'';

                var indirizzo = risultati[i].indirizzo;
                if (indirizzo != null) {
                    indirizzo = indirizzo.replace("'", "''");
                    //indirizzo = '\'' + indirizzo + '\'';
                }                
                
                var dataModifica = dataOdierna();
                var cancellato = risultati[i].cancellato;
                if (cancellato) {
                    cancellato = 1;
                } else {
                    cancellato = 0;
                }
                if (i < risultati.length - 1) {
                    valoriInsert = valoriInsert + "(" + risultati[i].idCliente + ", '" + desc + "', '" + indirizzo + "', '" + dataModifica + "', NULL, " + cancellato + ", 1, " + risultati[i].ordine + "),";
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idCliente + ", '" + desc + "', '" + indirizzo + "', '" + dataModifica + "', NULL, " + cancellato + ", 1, " + risultati[i].ordine + ");";
                }
            }
            
            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from Clienti";
            
            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Clienti');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaDistributori() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoDistributori,
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

            var testoInsert = "INSERT INTO distributori (IdDistributore, CodGettoniera, Sigla, Descrizione, Indirizzo, Latitudine, Longitudine, Citta, ordine) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "''");
                //desc = '\'' + desc + '\'';

                var indirizzo = risultati[i].indirizzo;
                if (indirizzo != null) {
                    indirizzo = indirizzo.replace("'", "''");
                    //indirizzo = '\'' + indirizzo + '\'';
                } 

                var citta = risultati[i].Citta;
                if (citta != null) {
                    citta = citta.replace("'", "''");
                }

                //var dataModifica = dataOdierna();
                var cancellato = risultati[i].cancellato;
                if (cancellato) {
                    cancellato = 1;
                } else {
                    cancellato = 0;
                }
                if (i < risultati.length - 1) {
                    valoriInsert = valoriInsert + "(" + risultati[i].idDistributore + ", '" + risultati[i].codGettoniera + "', '" + risultati[i].sigla + "', '" + desc + "', '" + indirizzo + "', " + risultati[i].Latitudine + ", " + risultati[i].Longitudine + ", '" + citta + "', " + risultati[i].ordine + "),";
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idDistributore + ", '" + risultati[i].codGettoniera + "', '" + risultati[i].sigla + "', '" + desc + "', '" + indirizzo + "', " + risultati[i].Latitudine + ", " + risultati[i].Longitudine + ", '" + citta + "', " + risultati[i].ordine + ");";
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from Distributori";

            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Distributori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaMezzi() {
    aggiornaTabella("Delete from mezzi", "Mezzi", null);

    //$.ajax({
    //    type: "POST",
    //    crossDomain: true,
    //    contentType: "application/json; charset=utf-8",
    //    url: urlGetElencoMezzi,
    //    cache: false,
    //    async: true,
    //    data: JSON.stringify({}),
    //    error: function (data) {
    //        console.log(data.responseText)
    //    },
    //    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
    //    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
    //    success: function (response) {
    //        risultati = response.d;

    //        var testoInsert = "INSERT INTO mezzi (IdMezzo, Descrizione, ordine) VALUES ";
    //        var valoriInsert = "";
    //        for (var i = 0; i < risultati.length; i++) {
    //            var desc = risultati[i].descrizione;
    //            desc = desc.replace("'", "''");
    //            //desc = '\'' + desc + '\'';
               
    //            if (i < risultati.length - 1) {
    //                valoriInsert = valoriInsert + "(" + risultati[i].idMezzo + ", '" + desc + "', " + risultati[i].ordine + "),";
    //            } else {
    //                valoriInsert = valoriInsert + "(" + risultati[i].idMezzo + ", '" + desc + "', " + risultati[i].ordine + ");";
    //            }
    //        }

    //        valoriInsert = testoInsert + valoriInsert;
    //        //console.log(valoriInsert);
    //        var pulisciClienti = "Delete from Mezzi";

    //        var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Mezzi');
    //        //console.log(aggClienti);
    //    }

    //});
}

function RecuperoDatiPerTabellaOperatori() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoOperatori,
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

            var testoInsert = "INSERT INTO operatori (IdOperatore, Nome, Cognome, Email, User, Password, Ruolo) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {
                //var desc = risultati[i].descrizione;
                //desc = desc.replace("'", "''");
                //desc = '\'' + desc + '\'';

                if (i < risultati.length - 1) {
                    valoriInsert = valoriInsert + "(" + risultati[i].idOperatore + ", '" + risultati[i].nome + "', '" + risultati[i].cognome + "', '" + risultati[i].email + "', '" + risultati[i].user + "', '" + risultati[i].password + "', '" + risultati[i].ruolo + "'),";
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idOperatore + ", '" + risultati[i].nome + "', '" + risultati[i].cognome + "', '" + risultati[i].email + "', '" + risultati[i].user + "', '" + risultati[i].password + "', '" + risultati[i].ruolo + "');";
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from Operatori";

            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Operatori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaProdotti() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoProdotti,
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

            var testoInsert = "INSERT INTO prodotti (IdProdotto, Descrizione, Foto, Prezzo, Aliquota, DataScadenza, cancellato, Ordine) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "''");
                //desc = '\'' + desc + '\'';

                var indirizzo = risultati[i].indirizzo;
                if (indirizzo != null) {
                    indirizzo = indirizzo.replace("'", "''");
                    //indirizzo = '\'' + indirizzo + '\'';
                }

                var citta = risultati[i].Citta;
                if (citta != null) {
                    citta = citta.replace("'", "''");
                }

                //var dataModifica = dataOdierna();
                var cancellato = risultati[i].cancellato;
                if (cancellato) {
                    cancellato = 1;
                } else {
                    cancellato = 0;
                }
                var dataScadenza = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataScadenza);
                if (dataScadenza == "02-01-1") {
                    dataScadenza = null;
                }
                if (i < risultati.length - 1) {
                    valoriInsert = valoriInsert + "(" + risultati[i].idProdotto + ", '" + desc + "', '" + risultati[i].foto + "', " + risultati[i].prezzo + ", " + risultati[i].aliquota + ", '" + dataScadenza + "', " + cancellato + ", " + risultati[i].ordine + "),";
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idProdotto + ", '" + desc + "', '" + risultati[i].foto + "', " + risultati[i].prezzo + ", " + risultati[i].aliquota + ", '" + dataScadenza + "', " + cancellato + ", " + risultati[i].ordine + ");";
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from Prodotti";

            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Prodotti');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaSituazioneClienti() {
    aggiornaTabella("Delete from situazioneclienti", "SituazioneClienti", null);
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneClienti,
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
                              
            var testoInsert = "INSERT INTO situazioneclienti (IdSituazioneCliente, IdCliente, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataScadenza, Modificato, IdOperatore, colore) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {                

                var numeroLotto = parseJsonDateLetturaAmericanaWithTime(risultati[i].numeroLotto);
                if (numeroLotto == "3939-01-01 01:00:00" || numeroLotto == "2038-12-31" || numeroLotto == "2038-12-31 02:00:00") {
                    numeroLotto = null;
                } else {
                    numeroLotto = "'" + numeroLotto + "'";
                }

                //var dataModifica = dataOdierna();

                var modificato = risultati[i].modificato;
                if (modificato) {
                    modificato = 1;
                } else {
                    modificato = 0;
                }

                var cancellato = risultati[i].cancellato;
                if (cancellato) {
                    cancellato = 1;
                } else {
                    cancellato = 0;
                }

                var codiceLotto = risultati[i].codiceLotto;
                if (codiceLotto != null) {
                    codiceLotto = "'" + codiceLotto + "'";
                }

                var dataScadenza = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataScadenza);
                if (dataScadenza == "02-01-1") {
                    dataScadenza = null;
                }

                var colore = risultati[i].colore;
                if (colore != null) {
                    colore = "'" + colore + "'";
                }

                if (i < risultati.length - 1) {
                    valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneCliente + ", " + risultati[i].idCliente + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", '" + dataScadenza + "', " + modificato + ", " + risultati[i].idOperatore + ", " + colore + "),";
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneCliente + ", " + risultati[i].idCliente + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", '" + dataScadenza + "', " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ");";
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from SituazioneClienti";
            if (risultati.length > 0) {
                var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneClienti');
            }
            
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaSituazioneDistributori() {
    aggiornaTabella("Delete from situazionedistributori", "SituazioneDistributori", null);
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneDistributori,
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

            var testoInsert = "INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataScadenza, Modificato, IdOperatore, colore, dataModifica) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {

                var numeroLotto = parseJsonDateLetturaAmericanaWithTime(risultati[i].numeroLotto);
                if (numeroLotto == "3939-01-01 01:00:00" || numeroLotto == "2038-12-31" || numeroLotto == "2038-12-31 02:00:00") {
                    numeroLotto = null;
                } else {
                    numeroLotto = "'" + numeroLotto + "'";
                }

                //var dataModifica = dataOdierna();

                var modificato = risultati[i].modificato;
                if (modificato) {
                    modificato = 1;
                } else {
                    modificato = 0;
                }

                var cancellato = risultati[i].cancellato;
                if (cancellato) {
                    cancellato = 1;
                } else {
                    cancellato = 0;
                }
                var dataScadenza = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataScadenza);
                if (dataScadenza == "02-01-1901" || dataScadenza == "2038-12-31") {
                    dataScadenza = null;
                } else {
                    dataScadenza = "'" + dataScadenza + "'";
                }

                var codiceLotto = risultati[i].codiceLotto;
                if (codiceLotto != null) {
                    codiceLotto = "'" + codiceLotto + "'";
                }

                var colore = risultati[i].colore;
                if (colore != null) {
                    colore = "'" + colore + "'";
                }

                var dataModifica = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataModifica);
                if (dataModifica == "02-01-1901" || dataModifica == "2038-12-31") {
                    dataModifica = null;
                } else {
                    dataModifica = "'" + dataModifica + "'";
                }

                if (i < risultati.length - 1) {
                    
                    if ((i > 0) && (i % 400) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneDistributore + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataScadenza + ", " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ", " + dataModifica + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'SituazioneDistributori', null);
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneDistributore + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataScadenza + ", " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ", " + dataModifica + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneDistributore + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataScadenza + ", " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ", " + dataModifica + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'SituazioneDistributori', null);
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from situazionedistributori";
            //if (risultati.length > 0) {
            //    var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //}
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaVenduto() {
    aggiornaTabella("Delete from venduto", "Venduto", null);

    //$.ajax({
    //    type: "POST",
    //    crossDomain: true,
    //    contentType: "application/json; charset=utf-8",
    //    url: urlGetVenduto,
    //    cache: false,
    //    async: true,
    //    data: JSON.stringify({}),
    //    error: function (data) {
    //        console.log(data.responseText)
    //    },
    //    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
    //    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
    //    success: function (response) {
    //        risultati = response.d;

    //        var testoInsert = "INSERT INTO venduto(idVendita, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, dataRilevazione, DataScadenza, venditaDiretta, IdOperatore, idCliente, note) VALUES ";
    //        var valoriInsert = "";
    //        for (var i = 0; i < risultati.length; i++) {

    //            var numeroLotto = parseJsonDateLetturaAmericana(risultati[i].numeroLotto);
    //            if (numeroLotto == "1902038-12-31" || numeroLotto == "2038-12-31") {
    //                numeroLotto = null;
    //            } else {
    //                numeroLotto = "'" + numeroLotto + "'";
    //            }                

    //            var cancellato = risultati[i].cancellato;
    //            if (cancellato) {
    //                cancellato = 1;
    //            } else {
    //                cancellato = 0;
    //            }

    //            var venditaDiretta = risultati[i].venditaDiretta;
    //            if (venditaDiretta) {
    //                venditaDiretta = 1;
    //            } else {
    //                venditaDiretta = 0;
    //            }
                
    //            var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
    //            if (dataScadenza == "02-01-1901" || dataScadenza == "2038-12-31") {
    //                dataScadenza = null;
    //            } else {
    //                dataScadenza = "'" + dataScadenza + "'";
    //            }

    //            var dataRilevazione = parseJsonDateLetturaAmericana(risultati[i].dataRilevazione);
    //            if (dataRilevazione == "02-01-1901" || dataRilevazione == "2038-12-31") {
    //                dataRilevazione = null;
    //            } else {
    //                dataRilevazione = "'" + dataRilevazione + "'";
    //            }
                
    //            var codiceLotto = risultati[i].codiceLotto;
    //            if (codiceLotto != null) {
    //                codiceLotto = "'" + codiceLotto + "'";
    //            }

    //            var note = risultati[i].note;
    //            if (note != null) {
    //                note = "'" + note + "'";
    //            }

    //            if (i < risultati.length - 1) {
                    
    //                if ((i > 0) && (i % 400) == 0) {
    //                    valoriInsert = valoriInsert + "(" + risultati[i].idVendita + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataRilevazione + ", " + dataScadenza + ", " + venditaDiretta + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ", " + note + ");";
    //                    //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
    //                    aggiornaTabella(testoInsert + valoriInsert, 'Venduto', null);
    //                    valoriInsert = "";
    //                    //console.log(testoInsert + valoriInsert + '<br><br>');
    //                    //return;
    //                } else {
    //                    valoriInsert = valoriInsert + "(" + risultati[i].idVendita + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataRilevazione + ", " + dataScadenza + ", " + venditaDiretta + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ", " + note + "),";
    //                }
    //            } else {
    //                valoriInsert = valoriInsert + "(" + risultati[i].idVendita + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataRilevazione + ", " + dataScadenza + ", " + venditaDiretta + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ", " + note + ");";
    //                aggiornaTabella(testoInsert + valoriInsert, 'Venduto', null);
    //            }
    //        }

    //        valoriInsert = testoInsert + valoriInsert;
    //        //console.log(valoriInsert);
    //        var pulisciClienti = "Delete from venduto";
    //        if (i < 500) {
    //            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Venduto');
    //        }
    //        //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
    //        //console.log(aggClienti);
    //    }

    //});
}

function RecuperoDatiPerTabellaMark() {
    aggiornaTabella("Delete from mark", "Mark", null);
    //$.ajax({
    //    type: "POST",
    //    crossDomain: true,
    //    contentType: "application/json; charset=utf-8",
    //    url: urlGetMark,
    //    cache: false,
    //    async: true,
    //    data: JSON.stringify({}),
    //    error: function (data) {
    //        console.log(data.responseText)
    //    },
    //    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
    //    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
    //    success: function (response) {
    //        risultati = response.d;

    //        var testoInsert = "INSERT INTO mark(id, codiceGettoniera, Venduto, inviatoincassa, dataRilevazione, oraRilevazione, dataRilevazionePrecedente, oraRilevazionePrecedente, nomefile, banconote, idRilevazione) VALUES ";
    //        var valoriInsert = "";
    //        for (var i = 0; i < risultati.length; i++) {
               
    //            var nomeFile = risultati[i].nomeFile;
    //            if (nomeFile != null) {
    //                nomeFile = "'" + nomeFile + "'";
    //            }

    //            var codiceGettoniera = risultati[i].codiceGettoniera;
    //            if (codiceGettoniera != null) {
    //                codiceGettoniera = "'" + codiceGettoniera + "'";
    //            }

    //            var oraRilevazione = risultati[i].oraRilevazioneMark;
    //            if (oraRilevazione != null) {
    //                oraRilevazione = "'" + oraRilevazione + "'";
    //            }
    //            var oraRilevazionePrecedente = risultati[i].oraRilevazionePrecedenteMark;
    //            if (oraRilevazionePrecedente != null) {
    //                oraRilevazionePrecedente = "'" + oraRilevazionePrecedente + "'";
    //            }

    //            if (i < risultati.length - 1) {
                    
    //                if ((i > 0) && (i % 400) == 0) {
    //                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + codiceGettoniera + ", " + risultati[i].venduto + ", " + risultati[i].inviatoInCassa + ", " + risultati[i].dataRilevazioneMark + ", " + oraRilevazione + ", " + risultati[i].dataRilevazionePrecedenteMark + ", " + oraRilevazionePrecedente + ", " + nomeFile + ", " + risultati[i].banconote2 + ", " + risultati[i].idRilevazione + ");";
    //                    //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
    //                    aggiornaTabella(testoInsert + valoriInsert, 'Mark', null);
    //                    valoriInsert = "";
    //                    //console.log(testoInsert + valoriInsert + '<br><br>');
    //                    //return;
    //                } else {
    //                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + codiceGettoniera + ", " + risultati[i].venduto + ", " + risultati[i].inviatoInCassa + ", " + risultati[i].dataRilevazioneMark + ", " + oraRilevazione + ", " + risultati[i].dataRilevazionePrecedenteMark + ", " + oraRilevazionePrecedente + ", " + nomeFile + ", " + risultati[i].banconote2 + ", " + risultati[i].idRilevazione + "),";
    //                }
    //            } else {
    //                valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + codiceGettoniera + ", " + risultati[i].venduto + ", " + risultati[i].inviatoInCassa + ", " + risultati[i].dataRilevazioneMark + ", " + oraRilevazione + ", " + risultati[i].dataRilevazionePrecedenteMark + ", " + oraRilevazionePrecedente + ", " + nomeFile + ", " + risultati[i].banconote2 + ", " + risultati[i].idRilevazione + ");";
    //                aggiornaTabella(testoInsert + valoriInsert, 'Mark', null);
    //            }
    //        }

    //        valoriInsert = testoInsert + valoriInsert;
    //        //console.log(valoriInsert);
    //        var pulisciClienti = "Delete from mark";
    //        if (i < 500) {
    //            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Mark');
    //        }
    //        //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
    //        //console.log(aggClienti);
    //    }

    //});
}

function RecuperoDatiPerTabellaMagazzino() {
    aggiornaTabella("Delete from magazzino", "Magazzino", null);
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMagazzino,
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

            var testoInsert = "INSERT INTO magazzino(id, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale,dataInserimento, DataScadenza, dataModifica, Modificato, IdOperatore, note, smaltito, colore) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {

                var codiceLotto = risultati[i].codiceLotto;
                if (codiceLotto != null) {
                    codiceLotto = "'" + codiceLotto + "'";
                }

                var dataInserimento = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataInserimento);
                if (dataInserimento == "3939-01-01 01:00:00" || dataInserimento == "2038-12-31") {
                    dataInserimento = null;
                } else {
                    dataInserimento = "'" + dataInserimento + "'";
                }

                var dataScadenza = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataScadenza);
                if (dataScadenza == "3939-01-01 01:00:00" || dataScadenza == "2038-12-31") {
                    dataScadenza = null;
                } else {
                    dataScadenza = "'" + dataScadenza + "'";
                }

                var dataModifica = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataModifica);
                if (dataModifica == "3939-01-01 01:00:00" || dataModifica == "2038-12-31") {
                    dataModifica = null;
                } else {
                    dataModifica = "'" + dataModifica + "'";
                }

                var modificato = risultati[i].modificato;
                if (modificato) {
                    modificato = 1;
                } else {
                    modificato = 0;
                }
                
                var note = risultati[i].note;
                if (note != null) {
                    note = "'" + note + "'";
                }

                var smaltito = risultati[i].smaltito;
                if (smaltito) {
                    smaltito = 1;
                } else {
                    smaltito = 0;
                }

                var colore = risultati[i].colore;
                if (colore != null) {
                    colore = "'" + colore + "'";
                }

                var numeroLotto = parseJsonDateLetturaAmericanaWithTime(risultati[i].numeroLotto);
                if (numeroLotto == "3939-01-01 01:00:00" || numeroLotto == "2038-12-31" || numeroLotto == "2038-12-31 02:00:00") {
                    numeroLotto = null;
                } else {
                    numeroLotto = "'" + numeroLotto + "'";
                }

                if (i < risultati.length - 1) {
                   
                    if ((i > 0) && (i % 400) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idOperatore + ", " + note + ", " + smaltito + ", " + colore + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'Magazzino', null);
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idOperatore + ", " + note + ", " + smaltito + ", " + colore + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idOperatore + ", " + note + ", " + smaltito + ", " + colore + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'Magazzino', 1);
                }

                //if (i == risultati.length-1) {
                //    inserisciVecchieQuantita();
                //}
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            //var pulisciClienti = "Delete from Magazzino";
            //if (i < 500) {
            //    var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Magazzino');
            //}
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function inserisciVecchieQuantita() {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT * FROM  magazzino where modificato = 0 ", [], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var numeroLotto = row.NumeroLotto;
                    if (numeroLotto == null) {
                        numeroLotto = row.CodiceLotto;
                        AggiornaVecchiaQuantitaInizio(row.IdProdotto, numeroLotto, 2);
                    } else {
                        AggiornaVecchiaQuantitaInizio(row.IdProdotto, numeroLotto, 1);
                    }
                    
                }

                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

function inserisciVecchieQuantitaResi() {
    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT * FROM  magazzinoresi where modificato = 0 ", [], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var numeroLotto = row.NumeroLotto;
                    if (numeroLotto == null) {
                        numeroLotto = row.CodiceLotto;
                        AggiornaVecchiaQuantitaResi(row.IdProdotto, numeroLotto, 2);
                    } else {
                        AggiornaVecchiaQuantitaResi(row.IdProdotto, numeroLotto, 1);
                    }


                }

                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function RecuperoDatiPerTabellaMagazzinoResi() {
    aggiornaTabella("Delete from magazzinoresi", "MagazzinoResi", null);
    //$.ajax({
    //    type: "POST",
    //    crossDomain: true,
    //    contentType: "application/json; charset=utf-8",
    //    url: urlGetMagazzinoResi,
    //    cache: false,
    //    async: true,
    //    data: JSON.stringify({}),
    //    error: function (data) {
    //        console.log(data.responseText)
    //    },
    //    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
    //    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
    //    success: function (response) {
    //        risultati = response.d;

    //        var testoInsert = "INSERT INTO magazzinoresi (id, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, dataInserimento, DataScadenza, dataModifica, Modificato, idDistributore, IdOperatore, idCliente) VALUES ";
    //        var valoriInsert = "";
    //        for (var i = 0; i < risultati.length; i++) {

    //            var codiceLotto = risultati[i].codiceLotto;
    //            if (codiceLotto != null) {
    //                codiceLotto = "'" + codiceLotto + "'";
    //            }

    //            var dataInserimento = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataInserimento);
    //            if (dataInserimento == "3939-01-01 01:00:00" || dataInserimento == "2038-12-31") {
    //                dataInserimento = null;
    //            } else {
    //                dataInserimento = "'" + dataInserimento + "'";
    //            }

    //            var dataScadenza = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataScadenza);
    //            if (dataScadenza == "3939-01-01 01:00:00" || dataScadenza == "2038-12-31") {
    //                dataScadenza = null;
    //            } else {
    //                dataScadenza = "'" + dataScadenza + "'";
    //            }

    //            var dataModifica = parseJsonDateLetturaAmericanaWithTime(risultati[i].dataModifica);
    //            if (dataModifica == "3939-01-01 01:00:00" || dataModifica == "2038-12-31") {
    //                dataModifica = null;
    //            } else {
    //                dataModifica = "'" + dataModifica + "'";
    //            }

    //            var modificato = risultati[i].modificato;
    //            if (modificato) {
    //                modificato = 1;
    //            } else {
    //                modificato = 0;
    //            }

    //            var note = risultati[i].note;
    //            if (note != null) {
    //                note = "'" + note + "'";
    //            }

    //            var smaltito = risultati[i].smaltito;
    //            if (smaltito) {
    //                smaltito = 1;
    //            } else {
    //                smaltito = 0;
    //            }

    //            var colore = risultati[i].colore;
    //            if (colore != null) {
    //                colore = "'" + colore + "'";
    //            }

    //            var numeroLotto = parseJsonDateLetturaAmericanaWithTime(risultati[i].numeroLotto);
    //            if (numeroLotto == "3939-01-01 01:00:00" || numeroLotto == "2038-12-31" || numeroLotto == "2038-12-31 02:00:00") {
    //                numeroLotto = null;
    //            } else {
    //                numeroLotto = "'" + numeroLotto + "'";
    //            }

    //            if (i < risultati.length - 1) {
                    
    //                if ((i > 0) && (i % 400) == 0) {
    //                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idDistributore + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ");";
    //                    //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
    //                    aggiornaTabella(testoInsert + valoriInsert, 'MagazzinoResi', null);
    //                    valoriInsert = "";
    //                    //console.log(testoInsert + valoriInsert + '<br><br>');
    //                    //return;
    //                } else {
    //                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idDistributore + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + "),";
    //                }
    //            } else {
    //                valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idDistributore + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ");";
    //                aggiornaTabella(testoInsert + valoriInsert, 'MagazzinoResi', 1);
    //            }
    //        }

    //        valoriInsert = testoInsert + valoriInsert;
    //        //console.log(valoriInsert);
    //        //var pulisciClienti = "Delete from MagazzinoResi";
    //        //if (i < 500) {
    //        //    var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'MagazzinoResi');
    //        //}
    //        //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
    //        //console.log(aggClienti);
    //    }

    //});
}

//function SincronizzaVendutoDaTablet() {
//    if (!confirm("Sicuro che vuoi procedere all aggiornamento dei dati sul server???")) return;

//    location.hash = "SyncronizzazioneTabletToVenduto";
//    $('.contentSyncronizzazioneTabletToVenduto').html('');
//    var idOperatore = localStorage.idOperatore;
//    if (mydb) {

//        mydb.transaction(function (t) {

//            t.executeSql("SELECT ultimoaggiornamento FROM  sincronizzazioni where idoperatore = ? order by ultimoaggiornamento desc limit 0,1 ", [idOperatore], function (transaction, results) {
//                for (var i = 0; i < results.rows.length; i++) {
//                    var row = results.rows.item(i);
//                    var ultimoaggiornamento = row.ultimoAggiornamento;
//                    //console.log(ultimoaggiornamento);
                    
//                    syncroUpdateRecordMagazzino(ultimoaggiornamento);
//                    syncroUpdateRecordMagazzinoResi(ultimoaggiornamento);
//                    syncroUpdateRecordSituazioneDistributore(ultimoaggiornamento);
//                    //syncroUpdateRecordVenduti(ultimoaggiornamento);
//                    EliminaVendutiCancellati(ultimoaggiornamento);
//                        //syncroNuoviRecordMagazzino();
//                        //syncroNuoviRecordMagazzinoResi();
//                        //syncroNuoviRecordSituazioneDistributori();

//                }
                
//                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

//            }, errorHandler);
//        });

//        function errorHandler(transaction, error) {
//            console.log("Error : " + error.message);
//        }

//    } else {
//        alert("db not found, your browser does not support web sql!");
//    }
    
//}

function syncroUpdateRecordMagazzino() {
    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT * FROM  magazzino where modificato = 1", [], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                     
                    SincronizzoDatiInMagazzino(row.Id, row.DataModifica);
                }

                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }

}

//function syncroUpdateRecordMagazzino() {
//    var nomeCampoId = "id";
//    var nomeTabella = "magazzino";
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetMagazzinoPerSyncro,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            for (var i = 0; i < risultati.length; i++) {
//                var id = risultati[i].id;
//                var dataModifica = dataItaliana(parseJsonDateLettura(risultati[i].dataModifica));
//                if (dataModifica == "2038-12-31") {
//                    dataModifica = null;
//                }
//                checkUpdateInMagazzino(id, dataModifica);
//            }
//            //console.log(risultati[0].codiceLotto);            
//        }

//    });
//}

function syncroUpdateRecordMagazzinoResi(ultimoaggiornamento) {
    
    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT * FROM  magazzinoresi where modificato = 1", [], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    SincronizzoDatiInMagazzinoResi(row.Id, row.DataModifica);
                }

                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

//function syncroUpdateRecordMagazzinoResi() {
//    var nomeCampoId = "id";
//    var nomeTabella = "magazzinoresi";
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetMagazzinoPerSyncro,
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

//            for (var i = 0; i < risultati.length; i++) {
//                var id = risultati[i].id;
//                var dataModifica = dataItaliana(parseJsonDateLettura(risultati[i].dataModifica));
//                if (dataModifica == "2038-12-31") {
//                    dataModifica = null;
//                }
//                checkUpdateInMagazzinoResi(id, dataModifica);
//            }
//            //console.log(risultati[0].codiceLotto);            
//        }

//    });
//}

function syncroUpdateRecordSituazioneDistributore(ultimoaggiornamento) {
    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT * FROM  situazionedistributori where datamodifica > ?", [ultimoaggiornamento], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    SincronizzoDatiInSituazioneDistributore(row.IdSituazioneDistributore, row.DataModifica);                    
                }

                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

//function syncroUpdateRecordSituazioneDistributore() {
    
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetSituazioneDistributoriPerSyncro,
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

//            for (var i = 0; i < risultati.length; i++) {
//                var id = risultati[i].idSituazioneDistributore;
//                var dataModifica = dataItaliana(parseJsonDateLettura(risultati[i].dataModifica));
//                if (dataModifica == "2038-12-31") {
//                    dataModifica = null;
//                }
//                checkUpdateInSituazioneDistributore(id, dataModifica);
//            }
//            //console.log(risultati[0].codiceLotto);            
//        }

//    });
//}

//function syncroUpdateRecordSituazioneClienti(ultimoaggiornamento) {
//    if (mydb) {

//        mydb.transaction(function (t) {

//            t.executeSql("SELECT * FROM  situazioneclienti where datamodifica > ?", [ultimoaggiornamento], function (transaction, results) {
//                for (var i = 0; i < results.rows.length; i++) {
//                    var row = results.rows.item(i);

//                    SincronizzoDatiInSituazioneCliente(row.IdSituazioneCliente, row.DataModifica);
//                }

//                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

//            }, errorHandler);
//        });

//        function errorHandler(transaction, error) {
//            console.log("Error : " + error.message);
//        }

//    } else {
//        alert("db not found, your browser does not support web sql!");
//    }

//}

function syncroUpdateRecordVenduto(ids, ultimoaggiornamento) {
    var tuttid = "";
    //for (var i = 0; i < ids.length; i++) {
    //    tuttid = tuttid + ids[i] + "-";
    //}
    //console.log(tuttid);

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlAggiornaRecordCancellatiInVenduto,
        cache: false,
        async: true,
        data: JSON.stringify({ ids: ids}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //$('.contentSyncronizzazioneTabletToVenduto').append(risultati + '<br>');
            //syncroNuoviRecordVenduto(ultimoaggiornamento);
            //syncroUpdateRecordVenduti(ultimoaggiornamento);
            
        }

    });
}

//function syncroUpdateRecordVenduti(ultimoaggiornamento) {

//    if (mydb) {

//        mydb.transaction(function (t) {

//            t.executeSql("SELECT idvendita, datarilevazione FROM  venduto where datarilevazione > ?", [ultimoaggiornamento], function (transaction, results) {
//                var ids = new Array();
//                var numeroUpdate = 0;
//                var tuttiGliId = "";
//                for (var i = 0; i < results.rows.length; i++) {
//                    var row = results.rows.item(i);
//                    //SincronizzoDatiInVenduto(row.IdVendita, row.DataRilevazione);
//                    CheckNewItemInVenduto(row.IdVendita);
//                }
                
//                //AggiornaTabellaSincronizzazioni();
//                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

//            }, errorHandler);
//        });

//        function errorHandler(transaction, error) {
//            console.log("Error : " + error.message);
//        }

//    } else {
//        alert("db not found, your browser does not support web sql!");
//    }
//}

//function EliminaVendutiCancellati(ultimoaggiornamento) {

//    if (mydb) {

//        mydb.transaction(function (t) {

//            t.executeSql("SELECT idvendita FROM  venduto ", [], function (transaction, results) {
//                var ids = new Array();
//                var numeroUpdate = 0;
//                var tuttiGliId = "";
//                for (var i = 0; i < results.rows.length; i++) {
//                    var row = results.rows.item(i);
//                    if (row.IdVendita != null) {
//                        ids[i] = row.IdVendita;
//                        if (i == results.rows.length - 1) {
//                            tuttiGliId = tuttiGliId + row.IdVendita;
//                        } else {
//                            tuttiGliId = tuttiGliId + row.IdVendita + ",";
//                        }
//                    }                    
                   
//                }
//                syncroUpdateRecordVenduto(tuttiGliId, ultimoaggiornamento);
//                //$('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

//            }, errorHandler);
//        });

//        function errorHandler(transaction, error) {
//            console.log("Error : " + error.message);
//        }

//    } else {
//        alert("db not found, your browser does not support web sql!");
//    }
//}

function checkUpdateInMagazzino(id, dataModifica) {

    if (mydb) {
        
        mydb.transaction(function (t) {
            
            t.executeSql("SELECT  * FROM  magazzino where id = ?", [id], function (transaction, results) {
                //var ids = new Array();
                var numeroUpdate = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);                    
                    if (dataModifica != row.DataModifica) {
                        //console.log(id + ' ' + dataModifica + ' : ' + row.DataModifica + ' - Update');

                        SincronizzoDatiInMagazzino(id, row.DataModifica);
                        numeroUpdate = numeroUpdate + 1;
                    }
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella Magazzino Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

            function errorHandler(transaction, error) {
                console.log("Error : " + error.message);
            }

        } else {
            alert("db not found, your browser does not support web sql!");
        }
}

function checkUpdateInMagazzinoResi(id, dataModifica) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  magazzinoresi where id = ?", [id], function (transaction, results) {
                //var ids = new Array();
                var numeroUpdate = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    if (dataModifica != row.DataModifica) {
                        //console.log(id + ' ' + dataModifica + ' : ' + row.DataModifica + ' - Update');

                        SincronizzoDatiInMagazzinoResi(id, row.DataModifica);
                        numeroUpdate = numeroUpdate + 1;
                    }
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella MagazzinoResi Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function checkUpdateInSituazioneDistributore(id, dataModifica) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  situazionedistributori where idsituazionedistributore = ?", [id], function (transaction, results) {
                //var ids = new Array();
                var numeroUpdate = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    if (dataModifica != row.DataModifica) {
                        //console.log(id + ' ' + dataModifica + ' : ' + row.DataModifica + ' - Update');

                        SincronizzoDatiInSituazioneDistributore(id, row.DataModifica);
                        numeroUpdate = numeroUpdate + 1;
                    }
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('***Sincronizzazione Tabella SituazioneDistributori Terminata con N. ' + numeroUpdate + ' record aggiornati! ****<br>');

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function SincronizzoDatiInMagazzino(Id, dataModifica) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlSincronizzoDatiInMagazzino,
        cache: false,
        async: true,
        data: JSON.stringify({ Id: Id, dataModifica: dataModifica }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            itemSincronizzato('id', Id, 'magazzino');
            //console.log(risultati);
            
        }

    });

}

function SincronizzoDatiInMagazzinoResi(Id, dataModifica) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlSincronizzoDatiInMagazzinoResi,
        cache: false,
        async: true,
        data: JSON.stringify({ Id: Id, dataModifica: dataModifica }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            itemSincronizzato('id', Id, 'magazzinoresi');
                        
        }
    });

}

function SincronizzoDatiInSituazioneCliente(Id, dataModifica) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlSincronizzoDatiInSituazioneCliente,
        cache: false,
        async: true,
        data: JSON.stringify({ Id: Id, dataModifica: dataModifica }),
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

function SincronizzoDatiInSituazioneDistributore(Id, dataModifica) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlSincronizzoDatiInSituazioneDistributori,
        cache: false,
        async: true,
        data: JSON.stringify({ Id: Id, dataModifica: dataModifica }),
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

function SincronizzoDatiInVenduto(Id, dataModifica) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlSincronizzoDatiInVenduto,
        cache: false,
        async: true,
        data: JSON.stringify({ Id: Id, dataModifica: dataModifica }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            ////console.log(risultati);
            
        }

    });

}

//function syncroNuoviRecordMagazzino(ultimoAggiornamento) {
//    var nomeCampoId = "id";
//    var nomeTabella = "magazzino";
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetMaxId,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ nomeCampoId: nomeCampoId, nomeTabella: nomeTabella }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati[0].codiceLotto);
//            CheckNewItemInMagazzino(risultati);

//        }

//    });
//}

//function syncroNuoviRecordMagazzinoResi() {
//    var nomeCampoId = "id";
//    var nomeTabella = "magazzinoresi";
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetMaxId,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ nomeCampoId: nomeCampoId, nomeTabella: nomeTabella }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati[0].codiceLotto);
//            CheckNewItemInMagazzinoResi(risultati);

//        }

//    });
//}


function syncroNuoviRecordSituazioneDistributori() {
    var nomeCampoId = "idsituazionedistributore";
    var nomeTabella = "situazionedistributori";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMaxId,
        cache: false,
        async: true,
        data: JSON.stringify({ nomeCampoId: nomeCampoId, nomeTabella: nomeTabella }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati[0].codiceLotto);
            CheckNewItemInSituazioneDistributore(risultati);

        }

    });
}

//function syncroNuoviRecordVenduto(ultimoaggiornamento) {
//    var nomeCampoId = "idvendita";
//    var nomeTabella = "venduto";
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetMaxId,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ nomeCampoId: nomeCampoId, nomeTabella: nomeTabella }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati[0].codiceLotto);
//            CheckNewItemInVenduto(risultati);

//        }

//    });
//}

//function syncroNuoviRecordVenduto() {
//    var nomeCampoId = "idvendita";
//    var nomeTabella = "venduto";
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        url: urlGetMaxId,
//        cache: false,
//        async: true,
//        data: JSON.stringify({ nomeCampoId: nomeCampoId, nomeTabella: nomeTabella }),
//        error: function (data) {
//            console.log(data.responseText)
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            risultati = response.d;

//            //console.log(risultati[0].codiceLotto);
//            CheckNewItemInVenduto(risultati);

//        }

//    });
//}

function CheckNewItemInMagazzino(lastDate) {
    
    if (mydb) {
        
        mydb.transaction(function (t) {
            //var lastDate = getDataUltimaSincronizzazione();
            t.executeSql("SELECT  * FROM  magazzino where modificato = 0 and syncro = 0 and dataInserimento > ? union all SELECT  * FROM  magazzino where modificato = 1 and syncro = 0 and datamodifica > ?", [lastDate, lastDate], function (transaction, results) {
                var ids = new Array();
                var recordAggiornati = 0;
                var recordAggiunti = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    
                    var id = row.Id;
                    var idProdotto = row.IdProdotto;
                    var codiceLotto = "";
                    if (row.CodiceLotto != "" && row.CodiceLotto != null) {
                        codiceLotto = row.CodiceLotto;
                    }
                    var numeroLotto = row.NumeroLotto;
                    var quantita = row.Quantita;
                    var prezzoTotale = row.PrezzoTotale;
                    var dataModifica = null;
                    //if (row.DataModifica != null) {
                    //    dataModifica = row.DataModifica;
                    //}
                    var dataScadenza = row.DataScadenza;
                    var modificato = false;
                    if (row.Modificato == 1) {
                        modificato = true;
                    }
                    var idOperatore = row.IdOperatore;
                    var note = "";
                    if (row.Note != "" && row.Note != null) {
                        note = row.Note;
                    }
                    var smaltito = true;
                    if (row.Smaltito == 0) {
                        smaltito = false;
                    }
                    var colore = "";
                    if (row.colore != "" && row.colore != null) {
                        colore = row.colore;
                    }                                        

                    var vecchiaQuantita = row.quantitaVecchia;
                    var quantitaRelativa = 0;
                    if (vecchiaQuantita == 0) {
                        quantitaRelativa = quantita;
                    } else {
                        quantitaRelativa = vecchiaQuantita - quantita;
                    }
                    
                    if (row.Modificato == 1) {
                        SincronizzoDatiInMagazzino(row.Id, row.DataModifica);
                        recordAggiornati = recordAggiornati + 1;
                    } else {
                        //if (quantitaRelativa > 0) {
                            AggiornaQuantitaProdottiInMagazzino(idProdotto, codiceLotto, numeroLotto, quantitaRelativa, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, note, smaltito, colore, id);
                            recordAggiunti = recordAggiunti + 1;
                        //}
                    }
                    
                }
                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella Magazzino - Aggiornati: ' + recordAggiornati + ' Aggiunti: ' + recordAggiunti + '<br>');

                $('.contentSyncronizzazioneTabletToVendutoCompletato').append('*');
                var agg = $('.contentSyncronizzazioneTabletToVendutoCompletato').html();
                if (agg == '****') {
                    $('.contentSyncronizzazioneTabletToVendutoCompletato').html('*******AGGIORNAMENTO COMPLETATO*********');
                    AggiornaDataSincronizzazione('TabToMag');
                }
                //setTimeout(syncroUpdateRecordMagazzino, 5000);


            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function itemSincronizzato(nomeCampoId, valoreId, nomeTabella) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("Update " + nomeTabella + " set syncro = 1 where " + nomeCampoId + " = ? ", [valoreId], function (transaction, results) {
               
                               
            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

function CheckNewItemInMagazzinoResi(lastDate) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  magazzinoresi where modificato = 0 and syncro = 0 and dataInserimento > ? union all SELECT  * FROM  magazzinoresi where modificato = 1 and syncro = 0 and datamodifica > ?", [lastDate, lastDate], function (transaction, results) {
                //var ids = new Array();
                var recordAggiornati = 0;
                var recordAggiunti = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    var id = row.Id;
                    var idProdotto = row.IdProdotto;
                    var codiceLotto = "";
                    if (row.CodiceLotto != "") {
                        codiceLotto = row.CodiceLotto;
                    }
                    var numeroLotto = row.NumeroLotto;
                    var quantita = row.Quantita;
                    var prezzoTotale = row.PrezzoTotale;
                    var dataModifica = null;
                    //if (row.DataModifica != null) {
                    //    dataModifica = row.DataModifica;
                    //}
                    var dataScadenza = row.DataScadenza;
                    var modificato = false;
                    if (row.Modificato == 1) {
                        modificato = true;
                    }
                    
                    var idDistributore = null;
                    if (row.IdDistributore != null) {
                        idDistributore = row.IdDistributore;
                    }
                    var idOperatore = row.IdOperatore;
                    var IdCliente = null;
                    if (row.IdCliente != null) {
                        IdCliente = row.IdCliente;
                    }

                    var vecchiaQuantita = row.quantitaVecchia;

                    //var quantitaRelativa = vecchiaQuantita - quantita;
                    if (row.Modificato == 1) {
                        SincronizzoDatiInMagazzinoResi(row.Id, row.DataModifica);
                        recordAggiornati = recordAggiornati + 1;
                    } else {
                        if (quantita > 0) {
                            AggiornaQuantitaProdottiInMagazzinoResi(id, idProdotto, numeroLotto, codiceLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idDistributore, idOperatore, IdCliente);
                            recordAggiunti = recordAggiunti + 1;
                        }
                    }
                                                           
                }
                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella MagazzinoResi - Aggiornati: ' + recordAggiornati + ' Aggiunti: ' + recordAggiunti + '<br>');
                $('.contentSyncronizzazioneTabletToVendutoCompletato').append('*');
                var agg = $('.contentSyncronizzazioneTabletToVendutoCompletato').html();
                if (agg == '****') {
                    $('.contentSyncronizzazioneTabletToVendutoCompletato').html('*******AGGIORNAMENTO COMPLETATO*********');
                    AggiornaDataSincronizzazione('TabToMag');
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

function CheckNewItemInSituazioneDistributore(lastId) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  situazionedistributori where modificato = 0 and syncro = 0 and dataInserimento > ? union all SELECT  * FROM  situazionedistributori where modificato = 1 and syncro = 0 and datamodifica > ?", [lastId, lastId], function (transaction, results) {
                var recordAggiornati = 0;
                var recordAggiunti = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    var idSituazioneDistributore = row.IdSituazioneDistributore;
                    
                    var idProdotto = row.IdProdotto;
                    var codiceLotto = "";
                    if (row.CodiceLotto != "") {
                        codiceLotto = row.CodiceLotto;
                    }
                    var numeroLotto = row.NumeroLotto;
                    var quantita = row.Quantita;
                    var prezzoTotale = row.PrezzoTotale;
                    var dataModifica = null;
                    //if (row.DataModifica != null) {
                    //    dataModifica = row.DataModifica;
                    //}
                    var dataScadenza = row.DataScadenza;
                    var modificato = false;
                    if (row.Modificato == 1) {
                        modificato = true;
                    }

                    var idDistributore = null;
                    if (row.IdDistributore != null) {
                        idDistributore = row.IdDistributore;
                    }
                    var idOperatore = row.IdOperatore;
                    var IdCliente = null;
                    if (row.IdCliente != null) {
                        IdCliente = row.IdCliente;
                    }
                    
                    var colore = row.colore;

                    if (row.Modificato == 1) {
                        SincronizzoDatiInSituazioneDistributore(row.IdSituazioneDistributore, row.DataModifica);
                        recordAggiornati = recordAggiornati + 1;
                    } else {
                        if (quantita > 0) {
                            AggiornaQuantitaProdottoInDistributoreV3(idDistributore, idProdotto, codiceLotto, numeroLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, colore);
                            recordAggiunti = recordAggiunti + 1;
                        }
                    }
                    
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella SituazioneDistributori - Inseriti: ' + recordAggiunti + ' aggiornati: ' + recordAggiornati + '<br>');
                $('.contentSyncronizzazioneTabletToVendutoCompletato').append('*');
                var agg = $('.contentSyncronizzazioneTabletToVendutoCompletato').html();
                if (agg == '****') {
                    $('.contentSyncronizzazioneTabletToVendutoCompletato').html('*******AGGIORNAMENTO COMPLETATO*********');
                    AggiornaDataSincronizzazione('TabToMag');
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

function CheckNewItemInSituazioneCliente(lastId) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  situazioneclienti where modificato = 0 and syncro = 0 and dataInserimento > ? union all SELECT  * FROM  situazioneclienti where modificato = 1 and syncro = 0 and datamodifica > ?", [lastId, lastId], function (transaction, results) {
                var recordAggiornati = 0;
                var recordAggiunti = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    var idSituazioneCliente = row.IdSituazioneCliente;

                    var idProdotto = row.IdProdotto;
                    var codiceLotto = "";
                    if (row.CodiceLotto != "") {
                        codiceLotto = row.CodiceLotto;
                    }
                    var numeroLotto = row.NumeroLotto;
                    var quantita = row.Quantita;
                    var prezzoTotale = row.PrezzoTotale;
                    var dataModifica = null;
                    //if (row.DataModifica != null) {
                    //    dataModifica = row.DataModifica;
                    //}
                    var dataScadenza = row.DataScadenza;
                    var modificato = false;
                    if (row.Modificato == 1) {
                        modificato = true;
                    }

                    var idDistributore = null;
                    if (row.IdDistributore != null) {
                        idDistributore = row.IdDistributore;
                    }
                    var idOperatore = row.IdOperatore;
                    var IdCliente = null;
                    if (row.IdCliente != null) {
                        IdCliente = row.IdCliente;
                    }

                    var colore = row.colore;
                    var VenditaDiretta = 0;
                    if (row.Modificato == 1) {
                        SincronizzoDatiInSituazioneCliente(row.IdCliente, row.DataModifica);
                        recordAggiornati = recordAggiornati + 1;
                    } else {
                        if (quantita > 0) {                            
                            AggiornaQuantitaProdottoInClienteV3(IdCliente, idProdotto, codiceLotto, numeroLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, colore);
                            recordAggiunti = recordAggiunti + 1;
                        }
                    }

                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella SituazioneClienti - Inseriti: ' + recordAggiunti + ' aggiornati: ' + recordAggiornati + '<br>');
                //console.log(ids);

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function CheckNewItemInVenduto(lastId) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT * FROM  venduto where datarilevazione > ? and syncro = 0", [lastId], function (transaction, results) {
                //var ids = new Array();
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    var idVendita = row.IdVendita;
                    var idProdotto = row.IdProdotto;
                    var idDistributore = null;
                    if (row.IdDistributore != null) {
                        idDistributore = row.IdDistributore;
                    }
                    var quantita = row.Quantita;
                    var prezzoTotale = row.PrezzoTotale;
                    var dataRilevazione = row.DataRilevazione;
                    var idOperatore = row.IdOperatore;
                    var IdCliente = null;
                    if (row.IdCliente != null) {
                        IdCliente = row.IdCliente;
                    }
                    var venditaDiretta = row.VenditaDiretta;
                    if (venditaDiretta == 0) {
                        venditaDiretta = false;
                    } else {
                        venditaDiretta = true;
                    }
                    var numeroLotto = row.NumeroLotto;
                    var codiceLotto = "";
                    if (row.CodiceLotto != "") {
                        codiceLotto = row.CodiceLotto;
                    }
                    var dataScadenza = row.DataScadenza;                    
                    var note = row.note;                    
                    AggiornaQuantitaProdottiVendutiServer(idProdotto, idDistributore, IdCliente, quantita, prezzoTotale, idOperatore, venditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella Vendita - Inseriti: ' + results.rows.length + '<br>');
                $('.contentSyncronizzazioneTabletToVendutoCompletato').append('*');
                var agg = $('.contentSyncronizzazioneTabletToVendutoCompletato').html();
                if (agg == '****') {
                    $('.contentSyncronizzazioneTabletToVendutoCompletato').html('*******AGGIORNAMENTO COMPLETATO*********');
                    AggiornaDataSincronizzazione('TabToMag');
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

function AggiornaVecchiaQuantitaInizio(idProdotto, numeroLotto, qualeCampo) {

    if (mydb) {

        mydb.transaction(function (t) {
            var query = "";
            
            if (qualeCampo == 1) {
                //query = "select max(quantita) as oldQuanttia from magazzino where modificato = 1 and idprodotto = ? and numerolotto = ?";
                query = "SELECT sum(quantita) as oldQuantita FROM  magazzino where idProdotto = ? and numeroLotto = ? and modificato = 0";
            }
            if (qualeCampo == 2) {
                //query = "select max(quantita) as oldQuanttia from magazzino where modificato = 1 and idprodotto = ? and codiceLotto = ?";
                query = "SELECT sum(quantita) as oldQuantita FROM  magazzino where idProdotto = ? and codiceLotto = ? and modificato = 0";
            }
            
            t.executeSql(query, [idProdotto, numeroLotto], function (transaction, results) {
                //var ids = new Array();
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);                                    
                    ScriviVecchiaQuantita(row.oldQuantita, idProdotto, numeroLotto, qualeCampo);                    
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

function AggiornaVecchiaQuantita(idProdotto, numeroLotto, qualeCampo) {

    if (mydb) {

        mydb.transaction(function (t) {
            var query = "";

            if (qualeCampo == 1) {
                query = "select quantitaVecchia as oldQuantita from magazzino where modificato = 1 and idprodotto = ? and numerolotto = ?";
                //query = "SELECT sum(quantita) as oldQuantita FROM  magazzino where idProdotto = ? and numeroLotto = ? and modificato = 0";
            }
            if (qualeCampo == 2) {
                query = "select quantitaVecchia as oldQuantita from magazzino where modificato = 1 and idprodotto = ? and codiceLotto = ?";
                //query = "SELECT sum(quantita) as oldQuantita FROM  magazzino where idProdotto = ? and codiceLotto = ? and modificato = 0";
            }

            t.executeSql(query, [idProdotto, numeroLotto], function (transaction, results) {
                //var ids = new Array();
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    ScriviVecchiaQuantita(row.oldQuantita, idProdotto, numeroLotto, qualeCampo);
                }
                if (results.rows.length == 0) {                                 
                    //ScriviVecchiaQuantita(0, idProdotto, numeroLotto, qualeCampo);
                    AggiornaVecchiaQuantitaNonAncoraMod(idProdotto, numeroLotto, qualeCampo);
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

function AggiornaVecchiaQuantitaNonAncoraMod(idProdotto, numeroLotto, qualeCampo) {

    if (mydb) {

        mydb.transaction(function (t) {
            var query = "";

            if (qualeCampo == 1) {
                query = "select max(quantitaVecchia) as oldQuantita from magazzino where modificato = 0 and idprodotto = ? and numerolotto = ?";
                //query = "SELECT sum(quantita) as oldQuantita FROM  magazzino where idProdotto = ? and numeroLotto = ? and modificato = 0";
            }
            if (qualeCampo == 2) {
                query = "select max(quantitaVecchia) as oldQuantita from magazzino where modificato = 0 and idprodotto = ? and codiceLotto = ?";
                //query = "SELECT sum(quantita) as oldQuantita FROM  magazzino where idProdotto = ? and codiceLotto = ? and modificato = 0";
            }

            t.executeSql(query, [idProdotto, numeroLotto], function (transaction, results) {
                //var ids = new Array();
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    ScriviVecchiaQuantita(row.oldQuantita, idProdotto, numeroLotto, qualeCampo);
                }
                if (row.oldQuantita == null) {
                    ScriviVecchiaQuantita(0, idProdotto, numeroLotto, qualeCampo);
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

function AggiornaVecchiaQuantitaResi(idProdotto, numeroLotto, qualeCampo) {

    if (mydb) {

        mydb.transaction(function (t) {
            var query = "";
            if (qualeCampo == 1) {
                query = "SELECT sum(quantita) as oldQuantita FROM  magazzinoresi where idProdotto = ? and numeroLotto = ? and modificato = 0";
            }
            if (qualeCampo == 2) {
                query = "SELECT sum(quantita) as oldQuantita FROM  magazzinoresi where idProdotto = ? and codiceLotto = ? and modificato = 0";
            }

            t.executeSql(query, [idProdotto, numeroLotto], function (transaction, results) {
                //var ids = new Array();
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    ScriviVecchiaQuantitaResi(row.oldQuantita, idProdotto, numeroLotto, qualeCampo);
                }

                //$('.contentSyncronizzazioneTabletToVenduto').append('Tabella Vendita - Record Inseriti: ' + results.rows.length + '<br>');
                //console.log(ids);

            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function ScriviVecchiaQuantita(oldQuantita, IdProdotto, numeroLotto, qualeCampo) {

    if (mydb) {

        mydb.transaction(function (t) {
            var query = "";
            if (qualeCampo == 1) {
                query = "update  magazzino set quantitaVecchia = ? where idProdotto = ? and numeroLotto = ? and modificato = 0";
            } else {
                query = "update  magazzino set quantitaVecchia = ? where idProdotto = ? and codiceLotto = ? and modificato = 0";
            }
            t.executeSql(query, [oldQuantita, IdProdotto, numeroLotto], function (transaction2, results2) {
                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella Magazzino - Agg. Vecchia Quantita prod: ' + IdProdotto + '<br>');
            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function ScriviVecchiaQuantitaResi(oldQuantita, IdProdotto, numeroLotto, qualeCampo) {

    if (mydb) {

        mydb.transaction(function (t) {
            var query = "";
            if (qualeCampo == 1) {
                query = "update  magazzinoresi set quantitaVecchia = ? where idProdotto = ? and numeroLotto = ? and modificato = 0";
            } else {
                query = "update  magazzinoresi set quantitaVecchia = ? where idProdotto = ? and codiceLotto = ? and modificato = 0";
            }
            t.executeSql(query, [oldQuantita, IdProdotto, numeroLotto], function (transaction2, results2) {
                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella MagazzinoResi - Agg. Vecchia Quantita prod: ' + IdProdotto + '<br>');
            }, errorHandler);
        });

        function errorHandler(transaction, error) {
            console.log("Error : " + error.message);
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}