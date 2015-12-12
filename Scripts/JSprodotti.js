$(function () {

    $("#inserisciProdotto").click(function () {
        var descrizione = $("#fDescrizione").val();
        var prezzo = $("#fPrezzo").val();
        var aliquota = $("#fAliquota").val();
        //var dataProd = $("#dataProd").val();
        //var dataScad = $("#dataScad").val();
        //var dataInserimento = $("#dataInserimento").val();
        //var dataModifica = $("#dataModifica").val();
        
        //console.log(descrizione); 
        if (descrizione == "") {
            alert("Descrizione è un campo obbligatorio!");
            return;
        }

        if (prezzo == "") {
            alert("Prezzo è un campo obbligatorio!");
            return;
        }

        if (aliquota == "") {
            alert("Aliquota è un campo obbligatorio!");
            return;
        }

        if ($.isNumeric(prezzo) == false) {
            alert("Il prezzo deve essere un numero!");
            return;
        }

        if ($.isNumeric(aliquota) == false) {
            alert("Aliquota deve essere un numero!");
            return;
        }

        $('#risultatiProdotti').html('Inserimento in corso...');

        var col = $('.formInserimentoProdotto');
        col.collapsible("collapse");

        //insertProdotto(descrizione, prezzo, aliquota);

    });

    Dropzone.options.myDropzone = {
        // $("#myDropzone").dropzone({
        autoProcessQueue: false,
        maxFilesize: 1,
        uploadMultiple: false,
        acceptedFiles: ".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF",
        url: "FileManager.ashx",
        init: function () {
            var submitButton = document.querySelector("#inserisciProdotto")
            //var removeButton = document.querySelector("#remove-all")
            myDropzone = this; // closure

            submitButton.addEventListener("click", function () {
                myDropzone.processQueue(); // Tell Dropzone to process all queued files.
            });

            //removeButton.addEventListener("click", function () {
            //    myDropzone.removeAllFiles(); // Tell Dropzone to remove all files.
            //});

            myDropzone.on("sending", function (file, xhr, formData) {
                // add headers with xhr.setRequestHeader() or
                // form data with formData.append(name, value);                
                                         
                //console.log(file);
            });

            this.on("success", function (file, responseText) {
                // Handle the responseText here. For example, add the text to the preview element:
                //if (IdTE != "00000000-0000-0000-0000-000000000000") {
                //    window.location.href = "/cms/" + LinkDettaglio;
                //} else {
                //    window.location.href = "/cms/Multimedia_List.aspx?Type=simpleobject";
                //}

                var descrizione = $("#fDescrizione").val();
                var prezzo = $("#fPrezzo").val();
                var aliquota = $("#fAliquota").val();
                insertProdotto(descrizione, prezzo, aliquota, file.name);

                //console.log(responseText);
                //  file.previewTemplate.appendChild(document.createTextNode(responseText));
                //file.previewTemplate.appendChild(document.createTextNode(file.name + " Caricato con Successo!"));
            });

            this.on("error", function (file, errorMessage, xhr) {
                //file.previewTemplate.appendChild(document.createTextNode(errorMessage));
                //                    console.log(errorMessage);
                //                    console.log(xhr);
            });

        }

        

    }
});

function GestioneProdotti() {
    location.hash = "formInserimentoProdotto";

}
    
function insertProdotto(descrizione, prezzo, aliquota, nomeFile) {
    //$("#footerRisultati").loader({ html: "<span class='ui-icon ui-icon-loading'><img src='jquery-logo.png' /><h2>is loading for you ...</h2></span>" });
    var risultati;

    //console.log('parametro descrizione=' + descrizione);

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/InsertProdotto",        
        url: urlInsertProdotto,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ descrizione: descrizione, prezzo: prezzo, aliquota: aliquota, nomeFile: nomeFile }),
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

            //var dettaglio = 'Prodotto Correttamente Inserito!';
                                    
            $('.risultatiProdotti').html(risultati);
            //$('#headerRicercaOrdinanze').html('Risultati: ' + (risultati.length + 1));
            $('#totRisultatiProdotti').html('Risultati Inseriti: ' + risultati);
            //$('#footerRisultatiOrdinanze').html('Risultati Trovati: ' + (risultati.length));

        }

    });
    
}

        