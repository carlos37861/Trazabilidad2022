//VARIABLES GLOBALES
var UsuarioNom = '';
var $_table = $('#table');
var $_data = [];
var $_tableDocProv = $('#tableDocProv');
var $_dataDocProv = [];
var UserSede = 0;
var sedeReinfo = 0;
var datosPrueba = "";

//CARGA LA TABLA DE REINFO EN LA PAGINA PRINCIPAL
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
            $('#lidocumentoproveedor').addClass('active');
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
                        title: 'Proveedor',

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
                        field: 'v_NOMDERECHMINE',
                        title: 'Derecho Minero',

                        sortable: true,
                    },
                    {
                        field: 'v_FECREINFO',
                        title: 'Fecha Reinfo',

                        sortable: false,
                    },

                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',

                        formatter: formatTableCellActions,
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
                                  <title>DOCUMENTOS PROVEEDOR</title>\
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

        if (sedeReinfo == UserSede || UserSede == 1) {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-4px" href="#" onclick=getReinfo('+ value + ',0) >\
                                  <i class="fa fa-plus-square text-145"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-4px" href="#" onclick=getReinfo('+ value + ',1) >\
                                  <i class="fa fa-plus-square text-145"></i>\
                                </a>\
                              </div > ';
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

//AL CARGAR PAGINA
jQuery(function ($) {
    nombreUsuario();
    //initiate the plugin
    ListaSedes();
    cargardatosTabla();
    ListaSedesFiltrar();


    ListaDepartamentos();
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
    $('#filesDocProv').prop("disabled", true);
});

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
    var w = window.open("/Home/ExportaExcelDecMinera?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede demorar unos minutos...");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargó el archivo..  ");
    //});
});

//LISTA LAS SEDES DEL MODULO DE FILTRAR
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

//CAPTURA EL ID DEL REINFO Y MUESTRA SUS DATOS
function getReinfo(id, condicion) {
    $('#cmbTipoDocProv').val('0');
    $('#txtDescArchDocProv').val('');
    $("#filesDocProv").val('');
    $.ajax({
        async: false,
        url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                $("#txtRazonSocial").text(value.v_PROVEEDOR);
                $("#txtRucProveedor").text(value.v_RUC);
                $("#txtCodConcesion").text(value.v_CODCONSECION);
                $("#txtNomConcesion").text(value.v_NOMCONSECION);
                $("#txtNomDerechoMinero").text(value.v_NOMDERECHMINE);
                $('#txtId_IdReinfo').val(value.n_CODREINFO);
                cargardatosTablaDocProv(id);
                $("#myModalDeclaracionMinera").modal({ backdrop: 'static', keyboard: false })
                $("#myModalDeclaracionMinera").modal('show');
            });
        },
    });
}


//LIMPIAR TEXTOS DE FILTROS DE BUSQUEDA
$('#btnReset').click(function () {

    cargardatosTabla();
    LimpiarFiltros();
});

//FILTRA CON LOS DATOS INGRESADOS
$('#btnSearch').click(function () {
    Filtrar();
});

//CARGA LA TABLA CON LOS DATOS FILTRADOS
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
                        title: 'Proveedor',
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
                        field: 'v_NOMDERECHMINE',
                        title: 'Derecho Minero',
                        sortable: true,
                    },
                    {
                        field: 'v_FECREINFO',
                        title: 'Fecha Reinfo',
                        sortable: false,
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: formatTableCellActions,
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
                                  <title>AMBIENTES</title>\
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

    //CREACIÓN DE ICONOS
    function formatTableCellActions(value, row, index, field) {
        if (sedeReinfo == UserSede || UserSede == 1) {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-4px" href="#" onclick=getReinfo('+ value + ',0) >\
                                  <i class="fa fa-plus-square text-145"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-4px" href="#" onclick=getReinfo('+ value + ',1) >\
                                  <i class="fa fa-plus-square text-145"></i>\
                                </a>\
                              </div > ';
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

//LISTA DEPARTAMENTOS 
function ListaDepartamentos() {
    $.ajax({
        url: '/Home/ListaDepartamento',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#cmbDepartamento').empty();
            $('#cmbDepartamento').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbDepartamento').append('<option value=' + value.v_UBIGEO + '>' + value.v_DEP + '</option > ');
            });
            $.ajax({
                url: '/Home/ListaTodasProvincias',
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#cmbProvincia').empty();
                    $('#cmbProvincia').append('<option selected value="0">ELEGIR...</option>');
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $('#cmbProvincia').append('<option value=' + value.v_UBIGEO + '>' + value.v_PROV + '</option > ');
                    });
                    $.ajax({
                        url: '/Home/ListaTodosDistritos',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            $('#cmbCiudad').empty();
                            $('#cmbCiudad').append('<option selected value="0">ELEGIR...</option>');
                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                $('#cmbCiudad').append('<option value=' + value.v_UBIGEO + '>' + value.v_DIST + '</option > ');
                            });
                        },
                    });
                },
            });
        },
    });
}

//LIMPIA LOS FILTROS
function LimpiarFiltros() {
    $('#txtRucFiltrar').val('');
    $('#txtRazonSocialFiltrar').val('');
    $('#txNombreConceFiltrar').val('');
    $('#txtNomDerechoMineroFiltrar').val('');
    $('#txtCodConcesionFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#cmbResultadoFiltrar').val('0');
    $('#cmbSedeFiltrar').val('0');
}

//CARGA EL NOMBRE DEL USUARIO
function nombreUsuario() {
    $(document).ready(function () {
        $("#UserName").text('');
        $.ajax({
            url: '/Home/CargarUser',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                //UsuarioNom = datos;
                $(datos).each(function (index, value) {

                    UsuarioNom = value.v_LOGIN;
                });
            },

        });
    });
}

//LISTA SEDES EN COMBO
function ListaSedes() {
    $.ajax({
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSede').empty();
            $('#cmbSede').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSede').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }
    });
}

//CARGA DATOS DE LA TABLA DOCUMENTOS PROVEEDOR
function cargardatosTablaDocProv(id) {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=6&N_CODREIN='+id+'&V_TIPOIMAG=%&V_TIPOIGAFOM=%',
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

            $_dataDocProv = datos;
            $_tableDocProv.bootstrapTable('destroy').bootstrapTable({
                data: $_dataDocProv,
                columns: [
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de Documento',

                        sortable: true,
                    },
                    {
                        field: 'v_DESCRIPARCH',
                        title: 'Nombre de Documento',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Archivo',

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
                searchAlign: "right",
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

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE IGAFOM CORRECTIVO
$("#cmbTipoDocProv").change(function () {
    if ($("#cmbTipoDocProv").val() != "0") {
        if ($("#txtDescArchDocProv").val().trim() != "") {
            $('#filesDocProv').prop('disabled', false);
        }
    } else {
        $('#filesDocProv').prop('disabled', true);
    }

});
$("#txtDescArchDocProv").keyup(function () {
    if ($("#cmbTipoDocProv").val() != "0") {
        if ($("#txtDescArchDocProv").val().trim() != "") {
            $('#filesDocProv').prop('disabled', false);
        } else {
            $('#filesDocProv').prop('disabled', true);
        }
    }
});

//DESCARGA EL ARCHIVO SELECCIONADO
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

//SUBE EL ARCHIVO SELECCIONADO
$("#filesDocProv").change(function () {
    uploadFilesDocProv('filesDocProv');
});

//SUBIDA DE DOCUMENTOS DE AYUDA
function uploadFilesDocProv(inputId) {

    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", $("#txtId_IdReinfo").val());
        formData.append("N_CODIGAFOM", 6);
        formData.append("V_TIPOARCH", "DOCUMENTOSPROVEEDOR"); //
        formData.append("V_TIPOIMAG", $("#cmbTipoDocProv").val());
        formData.append("V_TIPOIGAFOM", "NA"); //tipo doc
        formData.append("V_DESCRIPARCH", $("#txtDescArchDocProv").val());
    }

    $.ajax(
        {
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                $("#filesDocProv").val('');
                toastr["success"]("Se Almacenó el archivo seleccionado");
                cargardatosTablaDocProv($("#txtId_IdReinfo").val());
            },
            error: function (error) {
                toastr["error"]("Ocurrio un Error");
            }
        }
    );
}

//ELIMINA EL ARCHIVO
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

                    cargardatosTablaDocProv($("#txtId_IdReinfo").val());




                },

            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
}
