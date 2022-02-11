var $_table = $('#table');
var $_data = [];

jQuery(function ($) {
    //initiate the plugin
    cargardatosTabla();

    $('#filesDocCapacitacion').prop('disabled', true);
});

$('#btnReset').click(function () {
    cargardatosTabla();
    LimpiarFiltros();
});

//FILTRA DATOS DE ACUERDO A LO INGRESADO
$('#btnSearch').click(function () {
    var inicio = $('#txtFechaInicioFiltrar').val()
    var finalq = $('#txtFechaFinFiltrar').val()
    inicio = new Date(inicio);
    finalq = new Date(finalq);
    if (inicio > finalq) {
        toastr["error"]("La fecha inicio no puede ser mayor a la fecha final");
    } else {
        Filtrar();
    }
});

function cargardatosTabla() {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=%&V_TIPOIMAG=DOCUMENTOCAPACITACION&V_TIPOIGAFOM=%',
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
            $('#liDocuCapacitacion').addClass('active');
        },
        success: function (data) {
            var datos = data.data;

            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns: [
                    {
                        field: 'v_FECMODIF',
                        title: 'Fecha de Capacitación',
                        sortable: true,
                    },
                    {
                        field: 'v_DESCRIPARCH',
                        title: 'Titulo',
                        sortable: true,
                    },
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
                search: false,
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
                                <a class="download text-success mx-2px" style="cursor:pointer;" id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
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

function Filtrar() {
    $.ajax({
        url: '/Home/ListaFiltraArchivo?N_CODIGAFOM=0&V_TIPOIGAFOM=%&V_TIPOARCH=%&V_TIPOIMAG=DOCUMENTOCAPACITACION&V_NOMBRE=%&V_DESCRIPARCH=%' + $('#txtTituloFiltrar').val() + '%&V_FECMODIFINICIO=' + $('#txtFechaInicioFiltrar').val() + '&V_FECMODIFFIN=' + $('#txtFechaFinFiltrar').val(),
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
        },
        success: function (data) {
            var datos = data.data;
            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns: [
                    {
                        field: 'v_FECMODIF',
                        title: 'Fecha de Capacitación',
                        sortable: true,
                    },
                    {
                        field: 'v_DESCRIPARCH',
                        title: 'Titulo',
                        sortable: true,
                    },
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
                search: false,
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
                                <a class="download text-success mx-2px" style="cursor:pointer;" id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
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

function LimpiarFiltros() {
    $('#txtTituloFiltrar').val('');
    $('#txtFechaInicioFiltrar').val('');
    $('#txtFechaFinFiltrar').val('');
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

$("#filesDocCapacitacion").change(function () {
    uploadFilesDoc('filesDocCapacitacion');
});
//SUBIDA DE DOCUMENTOS DE AYUDA
function uploadFilesDoc(inputId) {
    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", 0);
        formData.append("N_CODIGAFOM", 0);
        formData.append("V_TIPOARCH", "DOCUMENTO"); 
        formData.append("V_TIPOIMAG", "DOCUMENTOCAPACITACION");  
        formData.append("V_TIPOIGAFOM", "NA");
        formData.append("V_DESCRIPARCH", $('#txtTitulo').val());
        formData.append("V_FECMODIF", $('#txtFechaCapa').val());
    }
    $.ajax(
        {
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                $("#filesDocCapacitacion").val('');
                $("#txtFechaCapa").val('');
                $("#txtTitulo").val('');
                toastr["success"]("Se Almacenó el archivo seleccionado");
                cargardatosTabla();
            },
            error: function (error) {
                toastr["error"]("Ocurrio un Error");
            }
        }
    );
}

$("#txtFechaCapa").focusout(function () {
    var fecha = $("#txtFechaCapa").val();
    var fechaFormato = fecha.split("-");
    var day = fechaFormato[2];
    var month = fechaFormato[1];
    var year = fechaFormato[0];
    var fechaCorrecta = day + '/' + month + '/' + year
    if (validarFormatoFecha(fechaCorrecta) && year > 1999) {
        if (existeFecha(fechaCorrecta)) {

        } else {

        }
    } else {
        $('#filesDocCapacitacion').prop('disabled', true);
        toastr["error"]("El formato de fecha es incorrecto o La fecha es invalida.");
        $("#txtFechaCapa").val('');
    }
});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE IGAFOM CORRECTIVO
$("#txtFechaCapa").change(function () {
    if ($("#txtFechaCapa").val() != "") {
        if ($("#txtTitulo").val().trim() != "") {
            $('#filesDocCapacitacion').prop('disabled', false);
        }
    } else {
        $('#filesDocCapacitacion').prop('disabled', true);
    }
});
$("#txtTitulo").keyup(function () {
    if ($("#txtFechaCapa").val() != "") {
        if ($("#txtTitulo").val().trim() != "") {
            $('#filesDocCapacitacion').prop('disabled', false);
        } else {
            $('#filesDocCapacitacion').prop('disabled', true);
        }
    }
});

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

//VERIFICA SI EXISTE LA FECHA
function existeFecha(fecha) {
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year, month, '0');

    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}
//VALIDA FORMATO FECHA
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
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
                    });
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

$("#txtFechaInicioFiltrar").change(function () {
    $("#txtFechaFinFiltrar").focus();

});
$("#txtFechaFinFiltrar").change(function () {
    $("#txtFechaInicioFiltrar").focus();

});