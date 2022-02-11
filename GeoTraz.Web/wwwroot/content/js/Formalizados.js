


var $_table = $('#table');
var $_data = [];
//var $_tablefileIgafomCorrect = $('#tableIgaCorrec');
//var $_datafileIgafCorrect = [];
var $_tablefileContrato = $('#tableContrato');
var $_datafileContrato = [];

//var $_tablefileIgafomPrev = $('#tableIgaPrev');
//var $_datafileIgafPrev = [];
var $_tablefileResolucion = $('#tableResolucion');
var $_datafileResolucion = [];

//var $_tablefileIgafomLevSus = $('#tableLevSus');
//var $_datafileIgafLevSus = [];
var $_tablefileOtrosDocs = $('#tableOtrosDocs');
var $_datafileOtrosDocs = [];
var UserSede = 0;
var sedeReinfo = 0;
function cargardatosTabla() {

    $.ajax({
        url: '/Home/ListaReinfo',
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
            $('#liFormalizados').addClass('active');
        },
        success: function (data) {

            var datos = data.data;

            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,


                columns: [
                    {
                        field: 'n_SEDE',
                        title: 'SEDE',
                        formatter: Sede,
                        sortable: true
                    },
                    {
                        field: 'v_RUC',
                        title: 'Ruc',
                        sortable: true
                    },
                    {
                        field: 'v_PROVEEDOR',
                        title: '<label style="width:320px">Proveedor</label>',
                        sortable: true,
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: 'Código Concesión',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: 'Nombre Concesión',
                        sortable: true,
                    },
                    {
                        field: 'v_CONTRATO',
                        title: 'Contrato',
                        formatter: contrato,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cogs text-secondary-d1 text-130"></i>',
                        formatter: AccionContrato,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'v_RESOLUCION',
                        title: 'Resolución',
                        formatter: Resolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cogs text-secondary-d1 text-130"></i>',
                        formatter: AccionResolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'v_OTROSDOCS',
                        title: 'Otros<br>Documentos',
                        formatter: OtrosDocumentos,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cogs text-secondary-d1 text-130"></i>',
                        formatter: AccionOtrosDocumentos,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                ],

                icons: {
                    columns: 'fa-th-list text-orange-d1',
                    detailClose: 'fa-minus text-blue',
                    export: 'fa-download text-blue',
                    print: 'fa-print text-purple-d1',
                    fullscreen: 'fa fa-expand',
                    search: 'fa-search text-blue'
                },
                toolbar: "#table-toolbar",
                theadClasses: "bgc-white text-grey text-uppercase text-80",
                clickToSelect: true,

                checkboxHeader: true,
                search: false,
                searchAlign: "left",
                //showSearchButton: true,
                sortable: true,
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
                                  <title>FORMALIZADOS</title>\
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


    function Resolucion(value, row, index, field) {

        if (value == 1) {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled  value="second_checkbox">\
                              </div>';
        }

    }
    function AccionResolucion(value, row, index, field) {
        //var sedeReinfo = 0;
        //$.ajax({
        //    async: false,
        //    url: '/Home/BuscarReinfo?N_CODREINFO=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        var datos = data.data;
        //        $(datos).each(function (index, val) {

        //            sedeReinfo = val.n_SEDE;

        //        });

        //    },


        //});

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getResolucion('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getResolucion('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function contrato(value, row, index, field) {
        if (value == 1) {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                              </div>';
        }

    }
    function AccionContrato(value, row, index, field) {
        //var sedeReinfo = 0;
        //$.ajax({
        //    async: false,
        //    url: '/Home/BuscarReinfo?N_CODREINFO=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        var datos = data.data;
        //        $(datos).each(function (index, val) {

        //            sedeReinfo = val.n_SEDE;

        //        });

        //    },


        //});

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getContrato('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getContrato('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function OtrosDocumentos(value, row, index, field) {
        if (value == 1) {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                              </div>';
        }
    }
    function AccionOtrosDocumentos(value, row, index, field) {
        //var sedeReinfo = 0;
        //$.ajax({
        //    async: false,
        //    url: '/Home/BuscarReinfo?N_CODREINFO=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        var datos = data.data;
        //        $(datos).each(function (index, val) {

        //            sedeReinfo = val.n_SEDE;

        //        });

        //    },

        //});

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getOtrosDocs('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getOtrosDocs('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }

    }

    function Sede(value, row, index, field) {

        var nomSede = ""
        $.ajax({
            async: false,
            url: '/Home/ListaSedes',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, val) {
                    if (val.n_CODSEDE == value) {
                        nomSede = val.v_NOMSEDE;
                        sedeReinfo = value;
                    }
                });
            },
        });

        return '<label>' + nomSede + '</label>';
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
            field: 'n_CODREINFO',
            values: ids
        });

        $removeBtn.prop('disabled', true)
    });


}

jQuery(function ($) {
    //initiate the plugin
    cargardatosTabla();
    ListaSedesFiltrar();

    $('#filesContrato').prop('disabled', true);
    $('#filesResolucion').prop('disabled', true);
    $('#filesOtrosDocs').prop('disabled', true);
    $.ajax({
        async: false,
        url: '/Home/CargarUser',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                UserSede = value.n_CODSEDE;
            });

        },

    });
});

//CAPTURA EL ID DE CONTRATO
function getContrato(id, condicion) {
    if (id > 0) {
        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRazonSocialContrato").val(value.v_PROVEEDOR);
                    $("#txtRucProveedorContrato").val(value.v_RUC);
                    $("#txtCodDMContrato").val(value.v_CODCONSECION);
                    $("#txtNomConceContrato").val(value.v_NOMCONSECION);

                    $('#txtId_Contrato').val(value.n_CODREINFO);
                    $('#TxtIndicadorContrato').val(1);
                    cargardatosTablaContrato(id, condicion);
                    $("#myModalContrato").modal({ backdrop: 'static', keyboard: false });

                    if (condicion == 1) {
                        $('#divCondicionContrato').css("display", "none");


                    } else {
                        $('#divCondicionContrato').css("display", "block");

                    }
                    $("#myModalContrato").modal('show');
                });

            },


        });

    }
}
//CAPTURA EL ID DE RESOLUCIÓN
function getResolucion(id, condicion) {
    if (id > 0) {

        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRazonSocialResolucion").val(value.v_PROVEEDOR);
                    $("#txtRucProveedorResolucion").val(value.v_RUC);
                    $("#txtCodDMResolucion").val(value.v_CODCONSECION);
                    $("#txtNomConceResolucion").val(value.v_NOMCONSECION);
                    cargardatosTablaResolucion(id, condicion);
                    $('#txtId_Resolucion').val(value.n_CODREINFO);
                    $('#TxtIndicadorResolucion').val(1);

                    $("#myModalResolucion").modal({ backdrop: 'static', keyboard: false });
                    if (condicion == 1) {
                        $('#divCondicionResolucion').css("display", "none");


                    } else {
                        $('#divCondicionResolucion').css("display", "block");

                    }
                    $("#myModalResolucion").modal('show');
                });

            },


        });

    }
}
//CAPTURA EL ID DE OTROS DOCUMENTOS
function getOtrosDocs(id, condicion) {

    if (id > 0) {

        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRazonSocialOtrosDocs").val(value.v_PROVEEDOR);
                    $("#txtRucProveedorOtrosDocs").val(value.v_RUC);
                    $("#txtCodDMOtrosDocs").val(value.v_CODCONSECION);
                    $("#txtNomConceOtrosDocs").val(value.v_NOMCONSECION);
                    cargardatosTablaOtrosDocs(id, condicion);
                    $('#txtId_OtrosDocs').val(value.n_CODREINFO);
                    $('#TxtIndicadorOtrosDocs').val(1);

                    $("#myModalOtrosDocs").modal({ backdrop: 'static', keyboard: false });
                    if (condicion == 1) {
                        $('#divCondicionOtrosDocs').css("display", "none");


                    } else {
                        $('#divCondicionOtrosDocs').css("display", "block");

                    }
                    $("#myModalOtrosDocs").modal('show');
                });

            },


        });


    }

}

//SUBIR ARCHIVOS DE IGAFOM
$("#filesContrato").change(function () {
    uploadFilesContrato('filesContrato', $("#txtId_Contrato").val());
});
$("#filesResolucion").change(function () {
    uploadFilesResolucion('filesResolucion', $("#txtId_Resolucion").val());
});
$("#filesOtrosDocs").change(function () {
    uploadFilesOtrosDocs('filesOtrosDocs', $("#txtId_OtrosDocs").val());

});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE IGAFOM CORRECTIVO
$("#cmbTipoArchivoContrato").change(function () {
    if ($("#cmbTipoArchivoContrato").val() == "0" || $("#cmbTipoDocContrato").val() == "0") {
        $('#filesContrato').prop('disabled', true);
    } else {
        $('#filesContrato').prop('disabled', false);
    }
});
$("#cmbTipoDocContrato").change(function () {
    if ($("#cmbTipoArchivoContrato").val() == "0" || $("#cmbTipoDocContrato").val() == "0") {
        $('#filesContrato').prop('disabled', true);
    } else {
        $('#filesContrato').prop('disabled', false);
    }
});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE IGAFOM PREVENTIVO
$("#cmbTipoArchivoResolucion").change(function () {
    if ($("#cmbTipoArchivoResolucion").val() == "0" || $("#cmbTipoDocResolucion").val() == "0") {
        $('#filesResolucion').prop('disabled', true);
    } else {
        $('#filesResolucion').prop('disabled', false);
    }
});
$("#cmbTipoDocResolucion").change(function () {
    if ($("#cmbTipoArchivoResolucion").val() == "0" || $("#cmbTipoDocResolucion").val() == "0") {
        $('#filesResolucion').prop('disabled', true);
    } else {
        $('#filesResolucion').prop('disabled', false);
    }
});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE LEVANTAMIENTO DE SUSPENSION
$("#cmbTipoArchivoOtrosDocs").change(function () {
    if ($("#cmbTipoArchivoOtrosDocs").val() == "0" || $("#cmbTipoDocOtrosDocs").val() == "0") {
        $('#filesOtrosDocs').prop('disabled', true);
    } else {
        $('#filesOtrosDocs').prop('disabled', false);
    }
});
$("#cmbTipoDocOtrosDocs").change(function () {
    if ($("#cmbTipoArchivoOtrosDocs").val() == "0" || $("#cmbTipoDocOtrosDocs").val() == "0") {
        $('#filesOtrosDocs').prop('disabled', true);
    } else {
        $('#filesOtrosDocs').prop('disabled', false);
    }
});


//LISTAR TABLAS DE IGAFOM
function cargardatosTablaContrato(id, condicion) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=5&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=CONTRATO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafileContrato = datos;
            $_tablefileContrato.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileContrato,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',
                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de documento',
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
                                  <p></p>\
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
        if (condicion == 0) {
            return '<div class="action-buttons">\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoContrato('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                  <i class="fa fa-ban text-105"></i>\
                              </div > ';
        }
    }
    function formatTableCellActions2(value, row, index, field) {
        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
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
function cargardatosTablaResolucion(id, condicion) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=5&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=RESOLUCION',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $_datafileResolucion  = datos;
            $_tablefileResolucion.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileResolucion,
                columns: [
                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de Documento',

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
        if (condicion == 0) {
            return '<div class="action-buttons">\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoResolucion('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                  <i class="fa fa-ban text-105"></i>\
                              </div > ';
        }
    }
    function formatTableCellActions2(value, row, index, field) {

        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"  >\
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
function cargardatosTablaOtrosDocs(id, condicion) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=5&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=OTROS',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafileOtrosDocs = datos;
            $_tablefileOtrosDocs.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileOtrosDocs,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de Documento',

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
        if (condicion == 0) {
            return '<div class="action-buttons">\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoOtrosDocs('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                  <i class="fa fa-ban text-105"></i>\
                              </div > ';
        }
    }
    function formatTableCellActions2(value, row, index, field) {
        //$.ajax({
        //    async: false,
        //    url: '/Home/previsualizar?fileName=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        datosPrueba = data.data;
        //    },

        //});

        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"  >\
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
//LISTAR SEDES DE FILTRAR
function ListaSedesFiltrar() {
    $.ajax({
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSedeFiltrar').empty();
            $('#cmbSedeFiltrar').append('<option selected value="0">TODOS...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSedeFiltrar').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }
    });
}
//DESCARGA LOS ARCHIVOS SELECCIONADOS
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

//SUBIR ARCHIVOS CONTRATO
function uploadFilesContrato(inputId, id) {

        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 5);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoContrato").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocContrato").val());
            formData.append("V_TIPOIGAFOM", "CONTRATO");
        }

        $.ajax(
            {
                url: "/Home/PostArchivos",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {

                    cargardatosTablaContrato($("#txtId_Contrato").val(), 0);

                    $("#filesContrato").val('');
                    cargardatosTabla();

                }
            }
        );
}

//SUBIR ARCHIVOS RESOLUCION
function uploadFilesResolucion(inputId, id) {
        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 5);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoResolucion").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocResolucion").val());
            formData.append("V_TIPOIGAFOM", "RESOLUCION");
        }

        $.ajax(
            {
                url: "/Home/PostArchivos",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {

                    cargardatosTablaResolucion($("#txtId_Resolucion").val(), 0);
                    $("#filesResolucion").val('');
                    cargardatosTabla();
                }
            }
        );


}

//SUBIR ARCHIVOS OTROS
function uploadFilesOtrosDocs(inputId, id) {

        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 5);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoOtrosDocs").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocOtrosDocs").val());
            formData.append("V_TIPOIGAFOM", "OTROS");
        }


        $.ajax({
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {

                cargardatosTablaOtrosDocs($("#txtId_OtrosDocs").val(), 0);
                $("#filesOtrosDocs").val('');
                cargardatosTabla();
            }
        }
        );

    }
//ELIMINA ARCHIVOS DE FORMALIZADOS-CONTRATO
function DeleteArchivoContrato(id) {

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
                        title: 'Se eliminó el archivo seleccionada',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    cargardatosTablaContrato($("#txtId_Contrato").val(), 0);

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
function DeleteArchivoResolucion(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: '¿Esta seguro de eliminar el archivo?',
        text: "",
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

                    cargardatosTablaResolucion($("#txtId_Resolucion").val(), 0);

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
function DeleteArchivoOtrosDocs(id) {

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

                    cargardatosTablaOtrosDocs($("#txtId_OtrosDocs").val(), 0);

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


//LIMPIAR TEXTOS DE FILTROS DE BUSQUEDA
$('#btnReset').click(function () {
    cargardatosTabla();
    LimpiarFiltros();
});
//FILTRA LOS DOCUMENTOS
$('#btnSearch').click(function () {
    Filtrar();
});
//CARGA TABLA CON DATOS FILTRADOS
function Filtrar() {
 
    $.ajax({
        url: '/Home/FiltrarReinfo?V_RUC=' + $('#txtRucFiltrar').val() + '%&V_PROVEEDOR=%' + encodeURIComponent($('#txtRazonSocialFiltrar').val()) + '%&V_CODCONSECION=' + $('#txtCodConcesionFiltrar').val() + '%&V_NOMCONSECION=' + $('#txNombreConceFiltrar').val() + '%&V_NOMDERECHMINE=' + $('#txtNomDerechoMineroFiltrar').val() + '%&V_FECREINFO=' + $('#txtFechaReinfoFiltrar').val() + '%&V_RESULTADOS=' + $('#cmbResultadoFiltrar').val() + '&N_SEDES=' + $('#cmbSedeFiltrar').val(),
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
                        field: 'n_SEDE',
                        title: 'SEDE',
                        formatter: Sede,
                        sortable: true
                    },
                    {
                        field: 'v_RUC',
                        title: 'Ruc',

                        sortable: true
                    },
                    {
                        field: 'v_PROVEEDOR',
                        title: '<label style="width:320px">Proveedor</label>',

                        sortable: true,
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: 'Código Concesión',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: 'Nombre Concesión',

                        sortable: true,
                    },
                    {
                        field: 'v_CONTRATO',
                        title: 'Contrato',

                        formatter: contrato,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cogs text-secondary-d1 text-130"></i>',

                        formatter: AccionContrato,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },

                    {
                        field: 'v_RESOLUCION',
                        title: 'Resolución',

                        formatter: Resolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cogs text-secondary-d1 text-130"></i>',
                        formatter: AccionResolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'v_OTROSDOCS',
                        title: 'Otros<br>Documentos',
                        formatter: OtrosDocumentos,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cogs text-secondary-d1 text-130"></i>',

                        formatter: AccionOtrosDocumentos,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },

                ],

                icons: {
                    columns: 'fa-th-list text-orange-d1',
                    detailClose: 'fa-minus text-blue',
                    export: 'fa-download text-blue',
                    print: 'fa-print text-purple-d1',
                    fullscreen: 'fa fa-expand',
                    search: 'fa-search text-blue'
                },


                toolbar: "#table-toolbar",
                theadClasses: "bgc-white text-grey text-uppercase text-80",
                clickToSelect: true,

                checkboxHeader: true,
                search: false,
                searchAlign: "left",
                //showSearchButton: true,

                sortable: true,

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
                                  <title>SISTEMA DE TRAZABILIDAD</title>\
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


    //function formatTableCellActions(value, row, index, field) {
    //    return '<div class="action-buttons">\
    //                        <a class="text-success mx-2px"  onclick=getAmbiente('+ value + ') >\
    //                          <i class="fa fa-pencil-alt text-105"></i>\
    //                        </a>\
    //                        <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteAmbiente('+ value + ')>\
    //                          <i class="fa fa-trash-alt text-105"></i>\
    //                        </a>\
    //                      </div > ';
    //}

    function Resolucion(value, row, index, field) {

        if (value == 1) {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled  value="second_checkbox">\
                              </div>';
        }

    }
    function AccionResolucion(value, row, index, field) {
        //var sedeReinfo = 0;
        //$.ajax({
        //    async: false,
        //    url: '/Home/BuscarReinfo?N_CODREINFO=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        var datos = data.data;
        //        $(datos).each(function (index, val) {

        //            sedeReinfo = val.n_SEDE;

        //        });

        //    },


        //});

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getResolucion('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getResolucion('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function contrato(value, row, index, field) {
        if (value == 1) {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                              </div>';
        }

    }
    function AccionContrato(value, row, index, field) {
        //var sedeReinfo = 0;
        ////var UserSede = 0;
        //$.ajax({
        //    async: false,
        //    url: '/Home/BuscarReinfo?N_CODREINFO=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        var datos = data.data;
        //        $(datos).each(function (index, val) {
        //            sedeReinfo = val.n_SEDE;
        //        });
        //    },
        //});

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getContrato('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getContrato('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function OtrosDocumentos(value, row, index, field) {
        if (value == 1) {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                               <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                              </div>';
        }
    }
    function AccionOtrosDocumentos(value, row, index, field) {
        //var sedeReinfo = 0;
        ////var UserSede = 0;
        //$.ajax({
        //    async: false,
        //    url: '/Home/BuscarReinfo?N_CODREINFO=' + value,
        //    type: 'GET',
        //    dataType: 'json',
        //    data: 'data',
        //    success: function (data) {
        //        var datos = data.data;
        //        $(datos).each(function (index, val) {
        //            sedeReinfo = val.n_SEDE;    
        //        });
        //    },
        //});

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getOtrosDocs('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getOtrosDocs('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }

    }

    function Sede(value, row, index, field) {

        var nomSede = ""
        $.ajax({
            async: false,
            url: '/Home/ListaSedes',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, val) {
                    if (val.n_CODSEDE == value) {
                        nomSede = val.v_NOMSEDE;
                        sedeReinfo = value;
                    }
                });
            },
        });

        return '<label>' + nomSede + '</label>';
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
            field: 'n_CODREINFO',
            values: ids
        });

        $removeBtn.prop('disabled', true)
    });

}

//LIMPIA CONTROLES DEL MODULO DE FILTRO
function LimpiarFiltros() {
    $('#txtRucFiltrar').val('');
    $('#txtRazonSocialFiltrar').val('');
    $('#txNombreConceFiltrar').val('');
    $('#txtNomDerechoMineroFiltrar').val('');
    $('#txtCodConcesionFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#cmbResultado').val('0');
    $('#cmbSedeFiltrar').val('0');
}
//EXPORTA A EXCEL
$('#btnExportar').click(function () {

    var V_RUC = $('#txtRucFiltrar').val();
    var V_PROVEEDOR = encodeURIComponent($('#txtRazonSocialFiltrar').val());
    var V_CODCONSECION = $('#txtCodConcesionFiltrar').val();
    var V_NOMCONSECION = $('#txNombreConceFiltrar').val();
    var V_NOMDERECHMINE = $('#txtNomDerechoMineroFiltrar').val();
    var V_FECREINFO = $('#txtFechaReinfoFiltrar').val();
    var V_RESULTADOS = $('#cmbResultadoFiltrar').val();
    var N_SEDES = $('#cmbSedeFiltrar').val();
    var parametros = "V_RUC=" + V_RUC + "%&V_PROVEEDOR=%" + V_PROVEEDOR + "%&V_CODCONSECION=%" + V_CODCONSECION + "%&V_NOMCONSECION=%" + V_NOMCONSECION + "%&V_NOMDERECHMINE=%" + V_NOMDERECHMINE + "%&V_FECREINFO=" + V_FECREINFO + "%&V_RESULTADOS=" + V_RESULTADOS + "&N_SEDES=" + N_SEDES;
    var w = window.open("/Home/ExportaExcelFormalizados?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede demorar unos minutos...");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargó el archivo..  ");
    //});
});
//VALIDA LA SESIÓN
function fnValidaSesion() {
    $.ajax({
        url: '/Home/ValidaSesion',
        type: 'POST',
        //data: { "activo_filtro.VIdactivo": idactivo },
        success: function (data) {
            if (data.cod_ret_out < 0) {
                window.location.replace(data.msg_ope_out)
                window.opener.document.location = data.msg_ope_out;
            }
        }
    });
}