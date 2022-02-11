var $_table = $('#table');
var $_data = [];

jQuery(function ($) {
    //initiate the plugin
    cargardatosTabla();

   
    
});



function cargardatosTabla() {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=%&V_TIPOIMAG=DOCUMENTOAYUDA&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        beforeSend: function () {
            $('#myModalLoading').removeAttr('hidden');
            $('#myModalLoading').modal("show");

        },
        complete: function () {
            $('#myModalLoading').attr('hidden', true);
            $('#myModalLoading').modal('hide');
            $('#liDocumentos').addClass('active');
        },
        success: function (data) {
            var datos = data.data;

            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns: [
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Archivo',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions2,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODARCHIVO',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                ],

                icons: {
                    columns: 'fa-th-list text-orange-d1',
                    search: 'fa-search text-blue'
                },

                toolbar: "#table-toolbar",
                theadClasses: "bgc-primary-tp2 text-white text-uppercase text-80",
                clickToSelect: true,

                checkboxHeader: true,
                search: true,
                searchAlign: "left",
                //showSearchButton: true,

                sortable: false,
                detailView: false,
                detailFormatter: "detailFormatter",

                pagination: true,
                paginationLoop: false,

                buttonsClass: "outline-default btn-smd bgc-white btn-h-light-primary btn-a-outline-primary py-1",

                showExport: false,
                showPrint: false,
                showColumns: false,
                showFullscreen: false,


                printPageBuilder: function (table) {
                    var bsHref = $('link[rel=stylesheet][href*="/bootstrap.css"], link[rel=stylesheet][href*="/bootstrap.min.css"]').attr('href');
                    //get bootstrap.css

                    return '<html>\
                                <head>\
                                  <link rel="stylesheet" type="text/css" href="'+ bsHref + '">\
                                  <title>ARCHIVOS</title>\
                                </head>\
                                <body class="container">\
                                  <p>IMPRESO POR: TRAZABILIDAD</p>\
                                  <div>\
                                    <table class="table table-bordered">'
                        + table +
                        '</table>\
                                  </div>\
                                </body>\
                        </html>';
                }
            });
        },
    });



    function formatTableCellActions(value, row, index, field) {
        return '<div class="action-buttons">\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivo('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
    }
    function formatTableCellActions2(value, row, index, field) {
     
        return '<div class="action-buttons">\
                                <a class="download text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
                                  <i class="fa fa-download text-105"></i>\
                                </a></div>';

    }


    //enable/disable 'remove' button
    var $removeBtn = $('#remove-btn');

    $_table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $removeBtn.prop('disabled', !$_table.bootstrapTable('getSelections').length);
    });

    //remove an item
    $removeBtn.click(function () {
        var ids = $.map($_table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });


        $_table.bootstrapTable('remove', {
            field: 'n_CODARCHIVO',
            values: ids
        });

        $removeBtn.prop('disabled', true)
    });


}


function descargar(value) {
  
    var parametros = "fileName=" + value;

    $.ajax({
        async: false,
        url: '/Home/ConsultaArchivo?' + parametros,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            if (data == 0) {
                toastr["error"]("Ocurrio un error o no existe el archivo");
            } else {
                w = window.open("/Home/Descargar?" + parametros, "_blank");
                $(w).ready(function () {
                    toastr["success"]("Se descargó el archivo:  " + value);
                });
            }
        }
    });
   
}

$("#filesDocAyuda").change(function () {
    uploadFilesDocAyuda('filesDocAyuda');

});

//SUBIDA DE DOCUMENTOS DE AYUDA
function uploadFilesDocAyuda(inputId) {

    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", 0);
        formData.append("N_CODIGAFOM", 0);
        formData.append("V_TIPOARCH", "DOCUMENTO"); //
        formData.append("V_TIPOIMAG","DOCUMENTOAYUDA");  //2021
        formData.append("V_TIPOIGAFOM", "NA"); //semestre 
    }

    $.ajax(
        {
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {

                $("#filesDocAyuda").val('');
                toastr["success"]("Se Almacenó el archivo seleccionado");
                cargardatosTabla();
            },
            error: function (error) {
                toastr["error"]("Ocurrio un Error");
            }

        }
    );

}

function DeleteArchivo(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: '¿Esta seguro de eliminar el archivo?',
        text: "Eliminar Archivo",
        icon: 'warning',
        confirmButtonColor: "#228B22",
        cancelButtonColor: "#DD6B55",
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',

        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: '/Home/EliminarArchivoId?N_CODARCHIVO=' + id,
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se eliminó la foto seleccionada',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    cargardatosTabla();

                    


                },

            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
}

