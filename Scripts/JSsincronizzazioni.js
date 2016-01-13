
function SincronizzaTabletConProdottiInMagazzino() {
    location.hash = "SyncronizzazioneMagazzinoToTablet";
    $('.contentSyncroMagToTablet').html('');

    if (!confirm("Sicuro che vuoi procedere all aggiornamento dei dati sul tablet??? Tutti i dati attualmente presenti verranno cancellati e sovrascritti con quelli presenti sul server!")) return;
    if (mydb) {
        
        RecuperoDatiPerTabellaClienti();
        RecuperoDatiPerTabellaDistributori();
        RecuperoDatiPerTabellaMezzi();
        RecuperoDatiPerTabellaOperatori();
        RecuperoDatiPerTabellaProdotti();
        RecuperoDatiPerTabellaSituazioneClienti();
        RecuperoDatiPerTabellaSituazioneDistributori();
        RecuperoDatiPerTabellaVenduto();
        RecuperoDatiPerTabellaMark();
        RecuperoDatiPerTabellaMagazzino();
        RecuperoDatiPerTabellaMagazzinoResi();

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

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoMezzi,
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

            var testoInsert = "INSERT INTO mezzi (IdMezzo, Descrizione, ordine) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {
                var desc = risultati[i].descrizione;
                desc = desc.replace("'", "''");
                //desc = '\'' + desc + '\'';
               
                if (i < risultati.length - 1) {
                    valoriInsert = valoriInsert + "(" + risultati[i].idMezzo + ", '" + desc + "', " + risultati[i].ordine + "),";
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idMezzo + ", '" + desc + "', " + risultati[i].ordine + ");";
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from Mezzi";

            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Mezzi');
            //console.log(aggClienti);
        }

    });
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
                var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
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

                var numeroLotto = parseJsonDateLetturaAmericana(risultati[i].numeroLotto);
                if (numeroLotto == "1901-01-02" || numeroLotto == "1-01-02") {
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

                var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
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

            var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneClienti');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaSituazioneDistributori() {

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

                var numeroLotto = parseJsonDateLetturaAmericana(risultati[i].numeroLotto);
                if (numeroLotto == "1901-01-02" || numeroLotto == "1-01-02") {
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
                var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
                if (dataScadenza == "02-01-1901" || dataScadenza == "1-01-02") {
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

                var dataModifica = parseJsonDateLetturaAmericana(risultati[i].dataModifica);
                if (dataModifica == "02-01-1901" || dataModifica == "1-01-02") {
                    dataModifica = null;
                } else {
                    dataModifica = "'" + dataModifica + "'";
                }

                if (i < risultati.length - 1) {
                    if (i==0) {
                        aggiornaTabella("Delete from situazionedistributori", "SituazioneDistributori");
                    }
                    if ((i > 0) && (i % 499) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneDistributore + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataScadenza + ", " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ", " + dataModifica + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'SituazioneDistributori');
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneDistributore + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataScadenza + ", " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ", " + dataModifica + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idSituazioneDistributore + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataScadenza + ", " + modificato + ", " + risultati[i].idOperatore + ", " + colore + ", " + dataModifica + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'SituazioneDistributori');
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from situazionedistributori";
            if (i < 500) {
                var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            }
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaVenduto() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVenduto,
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

            var testoInsert = "INSERT INTO venduto(idVendita, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, dataRilevazione, DataScadenza, venditaDiretta, IdOperatore, idCliente, note) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {

                var numeroLotto = parseJsonDateLetturaAmericana(risultati[i].numeroLotto);
                if (numeroLotto == "1901-01-02" || numeroLotto == "1-01-02") {
                    numeroLotto = null;
                } else {
                    numeroLotto = "'" + numeroLotto + "'";
                }                

                var cancellato = risultati[i].cancellato;
                if (cancellato) {
                    cancellato = 1;
                } else {
                    cancellato = 0;
                }

                var venditaDiretta = risultati[i].venditaDiretta;
                if (venditaDiretta) {
                    venditaDiretta = 1;
                } else {
                    venditaDiretta = 0;
                }
                
                var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
                if (dataScadenza == "02-01-1901" || dataScadenza == "1-01-02") {
                    dataScadenza = null;
                } else {
                    dataScadenza = "'" + dataScadenza + "'";
                }

                var dataRilevazione = parseJsonDateLetturaAmericana(risultati[i].dataRilevazione);
                if (dataRilevazione == "02-01-1901" || dataRilevazione == "1-01-02") {
                    dataRilevazione = null;
                } else {
                    dataRilevazione = "'" + dataRilevazione + "'";
                }
                
                var codiceLotto = risultati[i].codiceLotto;
                if (codiceLotto != null) {
                    codiceLotto = "'" + codiceLotto + "'";
                }

                var note = risultati[i].note;
                if (note != null) {
                    note = "'" + note + "'";
                }

                if (i < risultati.length - 1) {
                    if (i == 0) {
                        aggiornaTabella("Delete from venduto", "Venduto");
                    }
                    if ((i > 0) && (i % 499) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].idVendita + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataRilevazione + ", " + dataScadenza + ", " + venditaDiretta + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ", " + note + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'Venduto');
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].idVendita + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataRilevazione + ", " + dataScadenza + ", " + venditaDiretta + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ", " + note + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].idVendita + ", " + risultati[i].idDistributore + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataRilevazione + ", " + dataScadenza + ", " + venditaDiretta + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ", " + note + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'Venduto');
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from venduto";
            if (i < 500) {
                var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Venduto');
            }
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaMark() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMark,
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

            var testoInsert = "INSERT INTO mark(id, codiceGettoniera, Venduto, inviatoincassa, dataRilevazione, oraRilevazione, dataRilevazionePrecedente, oraRilevazionePrecedente, nomefile, banconote, idRilevazione) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {
               
                var nomeFile = risultati[i].nomeFile;
                if (nomeFile != null) {
                    nomeFile = "'" + nomeFile + "'";
                }

                var codiceGettoniera = risultati[i].codiceGettoniera;
                if (codiceGettoniera != null) {
                    codiceGettoniera = "'" + codiceGettoniera + "'";
                }

                var oraRilevazione = risultati[i].oraRilevazioneMark;
                if (oraRilevazione != null) {
                    oraRilevazione = "'" + oraRilevazione + "'";
                }
                var oraRilevazionePrecedente = risultati[i].oraRilevazionePrecedenteMark;
                if (oraRilevazionePrecedente != null) {
                    oraRilevazionePrecedente = "'" + oraRilevazionePrecedente + "'";
                }

                if (i < risultati.length - 1) {
                    if (i == 0) {
                        aggiornaTabella("Delete from mark", "Mark");
                    }
                    if ((i > 0) && (i % 499) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + codiceGettoniera + ", " + risultati[i].venduto + ", " + risultati[i].inviatoInCassa + ", " + risultati[i].dataRilevazioneMark + ", " + oraRilevazione + ", " + risultati[i].dataRilevazionePrecedenteMark + ", " + oraRilevazionePrecedente + ", " + nomeFile + ", " + risultati[i].banconote2 + ", " + risultati[i].idRilevazione + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'Mark');
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + codiceGettoniera + ", " + risultati[i].venduto + ", " + risultati[i].inviatoInCassa + ", " + risultati[i].dataRilevazioneMark + ", " + oraRilevazione + ", " + risultati[i].dataRilevazionePrecedenteMark + ", " + oraRilevazionePrecedente + ", " + nomeFile + ", " + risultati[i].banconote2 + ", " + risultati[i].idRilevazione + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + codiceGettoniera + ", " + risultati[i].venduto + ", " + risultati[i].inviatoInCassa + ", " + risultati[i].dataRilevazioneMark + ", " + oraRilevazione + ", " + risultati[i].dataRilevazionePrecedenteMark + ", " + oraRilevazionePrecedente + ", " + nomeFile + ", " + risultati[i].banconote2 + ", " + risultati[i].idRilevazione + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'Mark');
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from mark";
            if (i < 500) {
                var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Mark');
            }
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaMagazzino() {

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

                var dataInserimento = parseJsonDateLetturaAmericana(risultati[i].dataInserimento);
                if (dataInserimento == "1901-01-02" || dataInserimento == "1-01-02") {
                    dataInserimento = null;
                } else {
                    dataInserimento = "'" + dataInserimento + "'";
                }

                var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
                if (dataScadenza == "1901-01-02" || dataScadenza == "1-01-02") {
                    dataScadenza = null;
                } else {
                    dataScadenza = "'" + dataScadenza + "'";
                }

                var dataModifica = parseJsonDateLetturaAmericana(risultati[i].dataModifica);
                if (dataModifica == "1901-01-02" || dataModifica == "1-01-02") {
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

                var numeroLotto = parseJsonDateLetturaAmericana(risultati[i].numeroLotto);
                if (numeroLotto == "1901-01-02" || numeroLotto == "1-01-02") {
                    numeroLotto = null;
                } else {
                    numeroLotto = "'" + numeroLotto + "'";
                }

                if (i < risultati.length - 1) {
                    if (i == 0) {
                        aggiornaTabella("Delete from magazzino", "Magazzino");
                    }
                    if ((i > 0) && (i % 499) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idOperatore + ", " + note + ", " + smaltito + ", " + colore + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'Magazzino');
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idOperatore + ", " + note + ", " + smaltito + ", " + colore + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idOperatore + ", " + note + ", " + smaltito + ", " + colore + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'Magazzino');
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from Magazzino";
            if (i < 500) {
                var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'Magazzino');
            }
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function RecuperoDatiPerTabellaMagazzinoResi() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMagazzinoResi,
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

            var testoInsert = "INSERT INTO magazzinoresi (id, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, dataInserimento, DataScadenza, dataModifica, Modificato, idDistributore, IdOperatore, idCliente) VALUES ";
            var valoriInsert = "";
            for (var i = 0; i < risultati.length; i++) {

                var codiceLotto = risultati[i].codiceLotto;
                if (codiceLotto != null) {
                    codiceLotto = "'" + codiceLotto + "'";
                }

                var dataInserimento = parseJsonDateLetturaAmericana(risultati[i].dataInserimento);
                if (dataInserimento == "1901-01-02" || dataInserimento == "1-01-02") {
                    dataInserimento = null;
                } else {
                    dataInserimento = "'" + dataInserimento + "'";
                }

                var dataScadenza = parseJsonDateLetturaAmericana(risultati[i].dataScadenza);
                if (dataScadenza == "1901-01-02" || dataScadenza == "1-01-02") {
                    dataScadenza = null;
                } else {
                    dataScadenza = "'" + dataScadenza + "'";
                }

                var dataModifica = parseJsonDateLetturaAmericana(risultati[i].dataModifica);
                if (dataModifica == "1901-01-02" || dataModifica == "1-01-02") {
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

                var numeroLotto = parseJsonDateLetturaAmericana(risultati[i].numeroLotto);
                if (numeroLotto == "1901-01-02" || numeroLotto == "1-01-02") {
                    numeroLotto = null;
                } else {
                    numeroLotto = "'" + numeroLotto + "'";
                }

                if (i < risultati.length - 1) {
                    if (i == 0) {
                        aggiornaTabella("Delete from magazzinoresi", "MagazzinoResi");
                    }
                    if ((i > 0) && (i % 499) == 0) {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idDistributore + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ");";
                        //valoriInsert = valoriInsert + " INSERT INTO situazionedistributori(IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, CodiceLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, DataScadenza, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES ";
                        aggiornaTabella(testoInsert + valoriInsert, 'MagazzinoResi');
                        valoriInsert = "";
                        //console.log(testoInsert + valoriInsert + '<br><br>');
                        //return;
                    } else {
                        valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idDistributore + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + "),";
                    }
                } else {
                    valoriInsert = valoriInsert + "(" + risultati[i].id + ", " + risultati[i].idProdotto + ", " + numeroLotto + ", " + codiceLotto + ", " + risultati[i].quantita + ", " + risultati[i].prezzoTotale + ", " + dataInserimento + ", " + dataScadenza + ", " + dataModifica + ", " + modificato + ", " + risultati[i].idDistributore + ", " + risultati[i].idOperatore + ", " + risultati[i].idCliente + ");";
                    aggiornaTabella(testoInsert + valoriInsert, 'MagazzinoResi');
                }
            }

            valoriInsert = testoInsert + valoriInsert;
            //console.log(valoriInsert);
            var pulisciClienti = "Delete from MagazzinoResi";
            if (i < 500) {
                var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'MagazzinoResi');
            }
            //var aggClienti = creaTabella(pulisciClienti, valoriInsert, 'SituazioneDistributori');
            //console.log(aggClienti);
        }

    });
}

function SincronizzaVendutoDaTablet() {
    location.hash = "SyncronizzazioneTabletToVenduto";
    $('.contentSyncronizzazioneTabletToVenduto').html('');

    syncroUpdateRecordMagazzino();
    syncroUpdateRecordMagazzinoResi();
    syncroUpdateRecordSituazioneDistributore();
    EliminaVendutiCancellati();

    syncroNuoviRecordMagazzino();
    syncroNuoviRecordMagazzinoResi();
    syncroNuoviRecordSituazioneDistributori();
    
}

function syncroUpdateRecordMagazzino() {
    var nomeCampoId = "id";
    var nomeTabella = "magazzino";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMagazzinoPerSyncro,
        cache: false,
        async: true,
        data: JSON.stringify({ }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            for (var i = 0; i < risultati.length; i++) {
                var id = risultati[i].id;
                var dataModifica = dataItaliana(parseJsonDateLettura(risultati[i].dataModifica));
                if (dataModifica == "1-01-02") {
                    dataModifica = null;
                }
                checkUpdateInMagazzino(id, dataModifica);
            }
            //console.log(risultati[0].codiceLotto);            
        }

    });
}

function syncroUpdateRecordMagazzinoResi() {
    var nomeCampoId = "id";
    var nomeTabella = "magazzinoresi";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMagazzinoPerSyncro,
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

            for (var i = 0; i < risultati.length; i++) {
                var id = risultati[i].id;
                var dataModifica = dataItaliana(parseJsonDateLettura(risultati[i].dataModifica));
                if (dataModifica == "1-01-02") {
                    dataModifica = null;
                }
                checkUpdateInMagazzinoResi(id, dataModifica);
            }
            //console.log(risultati[0].codiceLotto);            
        }

    });
}

function syncroUpdateRecordSituazioneDistributore() {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneDistributoriPerSyncro,
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

            for (var i = 0; i < risultati.length; i++) {
                var id = risultati[i].idSituazioneDistributore;
                var dataModifica = dataItaliana(parseJsonDateLettura(risultati[i].dataModifica));
                if (dataModifica == "1-01-02") {
                    dataModifica = null;
                }
                checkUpdateInSituazioneDistributore(id, dataModifica);
            }
            //console.log(risultati[0].codiceLotto);            
        }

    });
}

function syncroUpdateRecordVenduto(ids) {
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
        data: JSON.stringify({ids: ids}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //$('.contentSyncronizzazioneTabletToVenduto').append(risultati + '<br>');
            syncroNuoviRecordVenduto();
        }

    });
}

function EliminaVendutiCancellati() {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT idvendita FROM  venduto ", [], function (transaction, results) {
                var ids = new Array();
                var numeroUpdate = 0;
                var tuttiGliId = "";
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    if (row.IdVendita != null) {
                        ids[i] = row.IdVendita;
                        if (i == results.rows.length - 1) {
                            tuttiGliId = tuttiGliId + row.IdVendita;
                        } else {
                            tuttiGliId = tuttiGliId + row.IdVendita + ",";
                        }
                    }                    
                   
                }
                syncroUpdateRecordVenduto(tuttiGliId);
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

            //console.log(risultati);
            $('.contentSyncronizzazioneTabletToVenduto').append(risultati + '<br>');

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
            //console.log(risultati);
            $('.contentSyncronizzazioneTabletToVenduto').append(risultati + '<br>');
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
            $('.contentSyncronizzazioneTabletToVenduto').append(risultati + '<br>');
        }
    });

}

function syncroNuoviRecordMagazzino() {
    var nomeCampoId = "id";
    var nomeTabella = "magazzino";
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
            CheckNewItemInMagazzino(risultati);

        }

    });
}

function syncroNuoviRecordMagazzinoResi() {
    var nomeCampoId = "id";
    var nomeTabella = "magazzinoresi";
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
            CheckNewItemInMagazzinoResi(risultati);

        }

    });
}


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

function syncroNuoviRecordVenduto() {
    var nomeCampoId = "idvendita";
    var nomeTabella = "venduto";
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
            CheckNewItemInVenduto(risultati);

        }

    });
}

function CheckNewItemInMagazzino(lastId) {
    
    if (mydb) {
        
        mydb.transaction(function (t) {
            
            t.executeSql("SELECT  * FROM  magazzino where id > ?", [lastId], function (transaction, results) {
                var ids = new Array();
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
                    var idOperatore = row.IdOperatore;
                    var note = "";
                    if (row.Note != "") {
                        note = row.Note;
                    }
                    var smaltito = false;
                    if (row.Smaltito == "true") {
                        smaltito = true;
                    }
                    var colore = "";
                    if (row.colore != "") {
                        colore = row.colore;
                    }                                        

                    AggiornaQuantitaProdottiInMagazzino(id, idProdotto, codiceLotto, numeroLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, note, smaltito, colore);
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella Magazzino - Record Inseriti: ' + results.rows.length + '<br>');
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

function CheckNewItemInMagazzinoResi(lastId) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  magazzinoresi where id > ?", [lastId], function (transaction, results) {
                //var ids = new Array();
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
                   
                    AggiornaQuantitaProdottiInMagazzinoResi(id, idProdotto, numeroLotto, codiceLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idDistributore, idOperatore, IdCliente);
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella MagazzinoResi - Record Inseriti: ' + results.rows.length + '<br>');
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

function CheckNewItemInSituazioneDistributore(lastId) {

    if (mydb) {

        mydb.transaction(function (t) {

            t.executeSql("SELECT  * FROM  situazionedistributori where idsituazionedistributore > ?", [lastId], function (transaction, results) {
                //var ids = new Array();
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

                    AggiornaQuantitaProdottoInDistributoreV3(idSituazioneDistributore, idDistributore, idProdotto, codiceLotto, numeroLotto, quantita, prezzoTotale, dataModifica, dataScadenza, modificato, idOperatore, colore);
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella SituazioneDistributori - Record Inseriti: ' + results.rows.length + '<br>');
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

            t.executeSql("SELECT * FROM  venduto where idvendita > ?", [lastId], function (transaction, results) {
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
                    var numeroLotto = row.NumeroLotto;
                    var codiceLotto = "";
                    if (row.CodiceLotto != "") {
                        codiceLotto = row.CodiceLotto;
                    }
                    var dataScadenza = row.DataScadenza;                    
                    var note = row.note;                    
                    AggiornaQuantitaProdottiVendutiServer(idVendita, idProdotto, idDistributore, IdCliente, quantita, prezzoTotale, idOperatore, venditaDiretta, null, null, numeroLotto, dataScadenza, codiceLotto);
                }

                $('.contentSyncronizzazioneTabletToVenduto').append('Tabella Vendita - Record Inseriti: ' + results.rows.length + '<br>');
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