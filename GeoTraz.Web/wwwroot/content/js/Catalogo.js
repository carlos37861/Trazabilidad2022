//VARIABLES GLOBALES
var UsuarioNom = '';
var $_table = $('#table');
var $_data = [];
var $_tableDecMin = $('#tableCargoDecMin');
var $_dataDecMin = [];
var UserSede = 0;
var sedeReinfo = 0;
var datosPrueba = "";
var ChildrenIgafomCorrec = [];
var ChildrenIgafomPrev = [];
var ChildrenLevSus = [];
var ChildrenResolucion = [];
var ChildrenDecMinera = [];
var ChildrenFormalizadosContrato = [];
var ChildrenFormalizadosResolucion = [];
var ChildrenFormalizadosOtros = [];
var ChildrenDocProveedor = [];
var ChildrenReportReinfo = [];
var fileData = []
var fileTree = $('#id-jqtree-files');
//CONTADORES PARA ARBOL
var ContadorIgafomCorrectivo = 0;
var ContadorIgafomPreventivo = 0;
var ContadorLevSus = 0;
var ContadorResolucion = 0;
var ContadorDecMinera = 0;
var ContadorFormalizadosContrato = 0;
var ContadorFormalizadosResolucion = 0;
var ContadorFormalizadosOtros = 0;
var ContadorDocProveedor = 0;
var ContadorReportReinfo = 0;


//CARGA LA TABLA GENERAL DE REINFOS
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
            $('#lidocatalogo').addClass('active');
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
                        sortable: true,
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

    function formatTableCellActions(value, row, index, field) {

        if (sedeReinfo == UserSede || UserSede == 1) {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',0) >\
                                  <i class="fa fa-eye text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',1) >\
                                  <i class="fa fa-eye text-105"></i>\
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

//AL CARGAR LA APLICACIÓN
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
});

//EXPORTAR A EXCEL
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
    //    toastr["success"]("Se descargó el archivo.. ");
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

//CAPTURA EL ID DE REINFO Y MUESTRA LOS ARCHIVOS RELACIONADOS
function getReinfo(id, condicion) {

    LimpiarChildren();
    fileTree.tree('destroy');

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
                CargaIgafomCorrectivo(id);
                CargaIgafomPreventivo(id);
                CargaIgafomLevSus(id);
                CargaIgafomResolucion(id);
                CargaDecMinera(id);
                CargaFormalizadosContrato(id);
                CargaFormalizadosResolucion(id);
                CargaFormalizadosOtros(id);
                CargaDocProveedor(id);
                CargaReinfo(id);
                $("#myModalDeclaracionMinera").modal({ backdrop: 'static', keyboard: false })
                $("#myModalDeclaracionMinera").modal('show');
            });
        },
     });
    MuestraTree();
}

//LLENA DE DATOS EL ARBOL DE ARCHIVOS
function CargaIgafomCorrectivo(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=CORRECTIVO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $(datos).each(function (index, value) {
                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorIgafomCorrectivo = ContadorIgafomCorrectivo + 1;
                var nombre = (value.v_TIPOIMAG).substring(0, value.v_TIPOIMAG.length-10) + ' (' + value.v_NOMBRE + ')';
                ChildrenIgafomCorrec.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });
        },
    });
}
function CargaIgafomPreventivo(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=PREVENTIVO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorIgafomPreventivo = ContadorIgafomPreventivo + 1;
                var nombre = (value.v_TIPOIMAG).substring(0, value.v_TIPOIMAG.length - 10) + ' (' + value.v_NOMBRE + ')';
                ChildrenIgafomPrev.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });

            });

        },
    });
}
function CargaIgafomLevSus(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=LEVANTAMIENTO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorLevSus = ContadorLevSus + 1;
                var nombre = (value.v_TIPOIMAG).substring(0, value.v_TIPOIMAG.length - 6) + ' (' + value.v_NOMBRE + ')';
                ChildrenLevSus.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaIgafomResolucion(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=RESOLUCION',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorResolucion = ContadorResolucion + 1;
                var nombre = value.v_TIPOIMAG + ' (' + value.v_NOMBRE + ')';
                ChildrenResolucion.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaDecMinera(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorDecMinera = ContadorDecMinera + 1;
                var nombre = value.v_TIPOIMAG + ' - ' + value.v_TIPOIGAFOM + ' (' + value.v_NOMBRE + ')';
                ChildrenDecMinera.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaFormalizadosContrato(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=5&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=CONTRATO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorFormalizadosContrato = ContadorFormalizadosContrato + 1;
                var nombre = value.v_TIPOIMAG  + ' (' + value.v_NOMBRE + ')';
                ChildrenFormalizadosContrato.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaFormalizadosResolucion(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=5&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=RESOLUCION',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorFormalizadosResolucion = ContadorFormalizadosResolucion + 1;
                var nombre = value.v_TIPOIMAG + ' (' + value.v_NOMBRE + ')';
                ChildrenFormalizadosResolucion.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaFormalizadosOtros(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=5&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=OTROS',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorFormalizadosOtros = ContadorFormalizadosOtros + 1;
                var nombre = value.v_TIPOIMAG + ' (' + value.v_NOMBRE + ')';
                ChildrenFormalizadosOtros.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaDocProveedor(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=6&N_CODREIN=' + id+'&V_TIPOIMAG=%&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {

                var icon = "";
                if (value.v_EXTENSION.toLowerCase() == "jpg" || value.v_EXTENSION.toLowerCase() == "png") {
                    icon = "fa fa-image";
                    textcolor = "text-blue2-m2";
                } else if (value.v_EXTENSION.toLowerCase() == "pdf") {
                    icon = "fa fa-file-pdf";
                    textcolor = "text-danger-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "xlsx" || value.v_EXTENSION.toLowerCase() == "xls") {
                    icon = "fa fa-file-excel";
                    textcolor = "text-success-m1";
                } else if (value.v_EXTENSION.toLowerCase() == "txt") {
                    icon = "fa fa-file";
                    textcolor = "text-grey";
                } else {
                    icon = "fa fa-file";
                    textcolor = "text-info";
                }
                ContadorDocProveedor = ContadorDocProveedor + 1;
                var nombre = value.v_TIPOIMAG + ' (' + value.v_NOMBRE + ')';
                ChildrenDocProveedor.push({
                    id: value.v_NOMBRE, name: nombre, icons: {
                        'default': ['<i class="' + icon + '"></i>', textcolor]
                    }
                });
            });

        },
    });
}
function CargaReinfo(id) {
    ContadorReporteReinfo = 0;
    $.ajax({
        async:false,
        url: '/Home/ListaReporte',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                if (value.n_CODREIN == id) {
                    ContadorReporteReinfo = ContadorReporteReinfo + 1;
                    var textcolor = "text-danger-m1";
                    var version = 'V' + ('000' + value.n_VERSION).slice(-4);
                    ContadorReportReinfo = ContadorReportReinfo + 1;
                    ChildrenReportReinfo.push({
                        id: value.n_CODREPORTE, name: version, icons: {
                            'default': ['<i class="fa fa-list-alt"></i>', textcolor]
                        }
                    });
                }
            });
        },
    });
}

//LIMPIA LOS ARRAY HIJOS DEL ARBOL
function LimpiarChildren() {
    //$("#id-jqtree-files").empty();
    for (let i = ChildrenIgafomCorrec.length; i > 0; i--) {
        ChildrenIgafomCorrec.pop();
    }
    for (let i = ChildrenIgafomPrev.length; i > 0; i--) {
        ChildrenIgafomPrev.pop();
    }
    for (let i = ChildrenLevSus.length; i > 0; i--) {
        ChildrenLevSus.pop();
    }
    for (let i = ChildrenResolucion.length; i > 0; i--) {
        ChildrenResolucion.pop();
    }
    for (let i = ChildrenDecMinera.length; i > 0; i--) {
        ChildrenDecMinera.pop();
    }
    for (let i = ChildrenFormalizadosContrato.length; i > 0; i--) {
        ChildrenFormalizadosContrato.pop();
    }
    for (let i = ChildrenFormalizadosResolucion.length; i > 0; i--) {
        ChildrenFormalizadosResolucion.pop();
    }
    for (let i = ChildrenFormalizadosOtros.length; i > 0; i--) {
        ChildrenFormalizadosOtros.pop();
    }
    for (let i = ChildrenDocProveedor.length; i > 0; i--) {
        ChildrenDocProveedor.pop();
    }
    for (let i = ChildrenReportReinfo.length; i > 0; i--) {
        ChildrenReportReinfo.pop();
    }
    ContadorIgafomCorrectivo = 0;
    ContadorIgafomPreventivo = 0;
    ContadorLevSus = 0;
    ContadorResolucion = 0;
    ContadorDecMinera = 0;
    ContadorFormalizadosContrato = 0;
    ContadorFormalizadosResolucion = 0;
    ContadorFormalizadosOtros = 0;
    ContadorDocProveedor = 0;
    ContadorReportReinfo = 0;
}

//LIMPIAR TEXTOS DE FILTROS DE BUSQUEDA
$('#btnReset').click(function () {
    cargardatosTabla();
    LimpiarFiltros();
});

//BOTON BUSCAR PARA QUE FILTRE CON LOS DATOS.
$('#btnSearch').click(function () {
    Filtrar();
});


//MUESTRA TABLA AL LISTAR
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

                        sortable: true,
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

    //Creación de iconos
    function formatTableCellActions(value, row, index, field) {


        if (sedeReinfo == UserSede || UserSede == 1) {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',0) >\
                                  <i class="fa fa-eye text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',1) >\
                                  <i class="fa fa-eye text-105"></i>\
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

//LIMPIA CONTROLES DE FILTRO
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

//ELIMINA EL ARCHIVO
function DeleteArchivoDec(id) {
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
                    cargardatosTablaCargoDecMinera($("#txtId_IdReinfo").val(), 0);
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

//CAPTURA EL NOMBRE DEL USUARIO
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

//LISTA SEDES EN IMPRESION
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

//CARGAR NOMBRE ARCHIVOS IGAFOM

//Browse Files Tree ARBOL DE ARCHIVOS
function MuestraTree() {
    fileData = [
        {
            id: 0,
            name: 'Reporte Reinfo Minero (' + ContadorReportReinfo  + ' Archivos)',
            icons: {
                'default': ['<i class="fa fa-list-alt"></i>', 'text-success']
            },
            children: ChildrenReportReinfo
        },
        {
            id: 0,
            name: 'IGAFOM',
            icons: {
                'default': ['<i class="fas fa-tasks"></i>', 'text-blue-m1']
            },
            children: [
                {
                    id: 0,
                    name: 'IGAFOM CORRECTIVO (' + ContadorIgafomCorrectivo + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenIgafomCorrec
                },
                {
                    id: 0,
                    name: 'IGAFOM PREVENTIVO (' + ContadorIgafomPreventivo  + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenIgafomPrev
                },
                {
                    id: 0,
                    name: 'LEVANTAMIENTO DE SUSPENSIÓN (' + ContadorLevSus  + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenLevSus
                },
                {
                    id: 0,
                    name: 'RESOLUCIÓN (' + ContadorResolucion  + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenResolucion
                }

            ]
        },
                {
            id: 0,
            name: 'DECLARACIÓN DE PRODUCCIÓN MINERA (' + ContadorDecMinera  + ' Archivos)',
            icons: {
                'default': ['<i class="fa fa-industry"></i>', 'text-warning']
            },
                    children: ChildrenDecMinera
        },
        {
            id: 0,
            name: 'FORMALIZADOS',
            icons: {
                'default': ['<i class="fa fa-id-card"></i>', 'text-danger']
            },
            children: [
                {
                    id: 0,
                    name: 'CONTRATO (' + ContadorFormalizadosContrato  + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenFormalizadosContrato
                },
                {
                    id: 0,
                    name: 'RESOLUCIÓN (' + ContadorFormalizadosResolucion  + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenFormalizadosResolucion
                },
                {
                    id: 0,
                    name: 'OTROS DOCUMENTOS (' + ContadorFormalizadosOtros  + ' Archivos)',
                    icons: {
                        'default': ['<i class="fa fa-folder"></i>', 'text-orange-d1'],
                        'open': ['<i class="fa fa-folder-open"></i>', 'text-orange-d1']
                    },
                    children: ChildrenFormalizadosOtros
                }
            ]
        },
        {
            id: 0,
            name: 'DOCUMENTOS DE PROVEEDOR (' + ContadorDocProveedor  + ' Archivos)',
            icons: {
                'default': ['<i class="fa fa-archive"></i>', 'text-purple']
            },
            children: ChildrenDocProveedor
        },
    ];
    
    fileTree.tree({
        data: fileData,
        autoOpen: true,
        dragAndDrop: false,
        useContextMenu: true,
        //used to specify drag & dropped items's color         
        onCanMoveTo: function (node) {
            node.element.querySelector('* > .jqtree-element').classList.add('bgc-warning-l1', 'border-x-2', 'brc-warning');
            return true;
        },

        closedIcon: $('<i class="fa fa-caret-right text-muted"></i>'),
        openedIcon: $('<i class="fa fa-caret-right rotate-45 text-muted"></i>'),

        onCreateLi: function (node, $li) {
            //$li.find('.jqtree-element').addClass('bgc-h-danger-l3');
            $li.find('.jqtree-element').css("cursor","pointer");
            // insert the icons
            if (node.icons) {
                var $title = $li.find('.jqtree-title');
                
                var iconDefault = null
                // prepend the `default` icon
                if (node.icons.default) {
                    iconDefault = $(node.icons.default[0]).addClass(node.icons.default[1]).addClass('node-icon');
                    $title.prepend(iconDefault);
                }

                // prepend the `open` icon
                if (node.icons.open) {
                    if (iconDefault) iconDefault.addClass('closed-icon');
                    $title.prepend(
                        $(node.icons.open[0]).addClass(node.icons.open[1]).addClass('opened-icon').addClass('node-icon')
                    );
                }
                
            }
        }
    });

    var _highlightNode = function (node) {
        var className = node.children.length > 0 ? 'bgc-success-l2' : 'bgc-primary-l2';
        var el = node.element.querySelector('* > .jqtree-element');
        el.classList.add(className)
        el.classList.remove('bgc-h-warning-l3');
    }
    var _unhighlightNode = function (node) {
        var el = node.element.querySelector('* > .jqtree-element')
        el.classList.remove('bgc-success-l2');
        el.classList.remove('bgc-primary-l2');
        el.classList.add('bgc-h-warning-l3');
    }

    var _lastContextMenu = null, _lastDropdownItem = null;
    var _hideContextMenu = function (menu) {
        $(menu.parentNode).removeClass('dropdown dd-backdrop dd-backdrop-none-md');
        $(menu).next().remove();
        $(menu).dropdown('dispose').remove();
        _lastContextMenu = null;
        _lastDropdownItem = null;
    }

    fileTree.on('tree.click', function (e) {
        // Disable single selection
        e.preventDefault();

        if (_lastContextMenu != null) return;


        var selectedNode = e.node;

        if (selectedNode.id === undefined) {
            //console.warn('The multiple selection functions require that nodes have an id');
            return;
        }

        if (fileTree.tree('isNodeSelected', selectedNode)) {
            //fileTree.tree('removeFromSelection', selectedNode);
            //_unhighlightNode(selectedNode);

        } else {
            //fileTree.tree('addToSelection', selectedNode);
            //_highlightNode(selectedNode);
            if (selectedNode.id == 0) {
                
            } else {
                if (selectedNode.name.substring(0, 1) == "V") {
                    getReporte(selectedNode.id);
                } else {
                    descargar(selectedNode.id);
                }
            }
        
           // 

        }
    })
        .on('tree.contextmenu',
            function (event) {
                if (_lastContextMenu != null) {
                    if (event.node.element == _lastDropdownItem) return;//dropdown already shown
                    _hideContextMenu(_lastContextMenu);//hide previous dropdown
                }

                _lastDropdownItem = event.node.element;

                var item = event.node.element.querySelector('.jqtree-title');
                //$(item).addClass('dropdown dd-backdrop dd-backdrop-none-md').append('<a href="#" class="d-none" data-toggle="dropdown">&nbsp;</a>\
                //<div class="dropdown-menu dropdown-caret radius-1 border-b-2 shadow-sm brc-default-m2 dd-slide-up dd-slide-none-md"><div class="dropdown-inner">\
                //    <div class="d-md-none dropdown-title px-3 text-secondary-d3">'+ event.node.name + '</div>\
                //    <div class="d-md-none dropdown-divider"></div>\
                //    <a href="#" class="dropdown-item"><i class="fa fa-edit text-blue mr-1 w-2"></i> Rename</a>\
                //    <a href="#" class="dropdown-item"><i class="fa fa-trash-alt text-danger mr-1 w-2"></i> Delete</a>\
                //</div></div>');

                _lastContextMenu = item.querySelector('[data-toggle=dropdown]');
                $(_lastContextMenu.nextElementSibling).on('click', function (e) {
                    //e.stopImmediatePropagation();//so that node doesn't get selected
                    $(_lastContextMenu).dropdown('hide');//so that dropdown gets hidden
                });
                $(_lastContextMenu).dropdown('show').parent().one('hide.bs.dropdown', function (e) {
                    _hideContextMenu(this.querySelector('[data-toggle=dropdown]'));
                });
            }
        );
}

//CAPTURA EL ID DEL REPORTE Y MUESTRA SUS DATOS
function getReporte(id) {
    $.ajax({
        url: '/Home/BuscarReporte?N_CODREPORTE=' + id,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        beforeSend: function () {
            $('#myModalLoading2').removeAttr('hidden');
            $('#myModalLoading2').modal("show");
        },
        complete: function () {

            //$("#myModalPrint").append('<label>Cargando....</label>');
            $('#myModalLoading2').attr('hidden', true);
            $('#myModalLoading2').modal('hide');
            $("#myModalPrint").modal({ backdrop: 'static', keyboard: false })
            $("#myModalPrint").modal('show');

        },
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                if (value.v_VERSIONPROTOCOLO == "002") {
                    //$("#myModalPrint").empty();
                    crearModalV2();
                } else if (value.v_VERSIONPROTOCOLO == "003") {
                    // $("#myModalPrint").empty();
                    crearModalV3();
                }

                ListaFirmantesRealizado(value.v_REALIZADOPOR);
                ListaFirmantesRevisado(value.v_REVISADOPOR);

                $("#txtFechaRealizado").val(value.v_FECHAREALIZADO);
                $("#txtFechaRevisado").val(value.v_FECHAREVISADO);
                $("#txtFechaActual").text(value.v_FECCREACION);
                var dep = (value.v_UBIGEO).substring(0, 2);
                var prov = (value.v_UBIGEO).substring(0, 4);
                var dist = (value.v_UBIGEO).substring(0, 6);
                $("#txtPersonaNaturalJurPrint").val(value.v_PROVEEDOR);
                $("#txtRucPrint").val(value.v_RUC);
                $("#txtCodigoDMPrint").val(value.v_CODCONSECION);
                $("#txtConcesionPrint").val(value.v_NOMCONSECION);
                $("#txtTmphMesPrint").val(value.n_TMPH);
                $("#txtTmpsMesPrint").val(value.n_TMPS);
                //ZONA DE UBIGEO
                $("#cmbDepartamentoPrint").val(dep + '0000');

                //$("#cmbDepartamentoPrint").val('010000');
                $("#cmbProvinciaPrint").val(prov + '00');
                $("#cmbCiudadPrint").val(dist);
                //FIN ZONA UBIGEO
                $("#cmbSedePrint").val(value.n_SEDE),
                    $("#txtNomDerMinPrint").val(value.v_NOMDERECHMINE);
                $("#txtZonaReinPrint").val(value.v_CODZONAREI);
                $("#txtNorte1Print").val(value.n_NORTE1);
                $("#txtEste1Print").val(value.n_ESTE1);
                $("#txtTipoActivPrint").val(value.v_CODTIPOACT);
                $("#txtFechaReinfoPrint").val(value.v_FECREINFO);
                $("#txtNorte2Print").val(value.n_NORTE2);
                $("#txtEste2Print").val(value.n_ESTE2);
                $("#cmbComponentePrint").val(value.v_COMPONENT);
                $("#cmbZonaCampoPrint").val(value.v_CODZONACAMP);
                $("#txtNorteCPrint").val(value.n_NORTEC);
                $("#txtEsteCPrint").val(value.n_ESTEC);
                $("#txtDifCoordenadasPrint").val(value.n_DIFCORDE);
                $("#txtDescripLaborPrint").val(value.v_DESCRILABOR);
                $("#txtCantHombPrint").val(value.n_CANTHOMBRE);
                $("#txtCantMujePrint").val(value.n_CANTMUJE);
                $("#txtTotalPersoPrint").val(value.n_TOTALTRAB);
                $("#cmbIgafomCorrectPrint").val(value.v_IGAFOMCORREC);
                $("#cmbIgafomPrevenPrint").val(value.v_IGAFOMPREV);

                //agregado para la 3era version
                $("#cmbSituacionReinfoPrint").val(value.v_SITUACIONINGEMMET);
                $("#cmbSituacionProduccionPrint").val(value.v_SITACIONDECMINERA);
                $("#txtAnioPrint").val(value.v_ANIO);
                $("#txtSemestrePrint").val(value.v_MES);


                if (value.v_RESULTADOS == "TZ") {
                    $("#cmbResultadoPrint").val('TZ');
                    $("#cmbResultadoPrint").css('background-color', '#2ECC71');
                } else if (value.v_RESULTADOS == "NT") {
                    $("#cmbResultadoPrint").val('NT');
                    $("#cmbResultadoPrint").css('background-color', '#E74C3C');
                } else if (value.v_RESULTADOS == "P") {
                    $("#cmbResultadoPrint").val('P');
                    $("#cmbResultadoPrint").css('background-color', '#F1C40F');
                }
                //CAMBIAR DE COLOR ESTADO PROVEEDOR
                if (value.v_ESTADOIGAFOM == "FORMALIZADO") {
                    $("#cmbEstadoIgafomPrint").val('FORMALIZADO');
                    $("#cmbEstadoIgafomPrint").css('background-color', '#101A93');
                    $("#cmbEstadoIgafomPrint").css("color", "#F6F6F9");
                } else if (value.v_ESTADOIGAFOM == "VIGENTE") {
                    $("#cmbEstadoIgafomPrint").val('VIGENTE');
                    $("#cmbEstadoIgafomPrint").css('background-color', '#4381CD');
                    $("#cmbEstadoIgafomPrint").css("color", "#F6F6F9");
                } else if (value.v_ESTADOIGAFOM == "SUSPENDIDO") {
                    $("#cmbEstadoIgafomPrint").val('SUSPENDIDO');
                    $("#cmbEstadoIgafomPrint").css('background-color', '#E62E1F');
                    $("#cmbEstadoIgafomPrint").css("color", "#F6F6F9");
                }

                //LINEA PARA PODER ALMACENAR LOS PROTOCOLOS Y VERSION
                $('#lblProtocoloPrint').text(value.v_PROTOCOLO);
                $('#lblVersionPrint').text(('000' + value.n_VERSION).slice(-4));

                $('#lblVersionprotocolo').text(value.v_VERSIONPROTOCOLO);
                $('#lblFechaVersion').text(value.v_FECHAVERSION);

                cargardatosTablafile1Print(id);
                cargardatosTablafile2Print(id);
                cargardatosTablafile3Print(id);
                cargardatosListaEquiposPrint(id, value.n_CODREIN);
                cargardatosListaAmbientePrint(id, value.n_CODREIN);
                $("#txtConclusionPrint").val(value.v_CONCLUSION);

                //if (value.v_VERSIONPROTOCOLO == '002') {
                //    //$("#myModalPrintV3").modal('hide');
                //    //$("#myModalPrintV3").empty();
                //    $("#myModalPrint").modal({ backdrop: 'static', keyboard: false })
                //    $("#myModalPrint").modal('show');
                //} else if (value.v_VERSIONPROTOCOLO == '003') {
                //    //$("#myModalPrint").modal('hide');
                //    //$("#myModalPrint").empty();
                //    $("#myModalPrint").modal({ backdrop: 'static', keyboard: false })
                //    $("#myModalPrint").modal('show');
                //}
            });

        },


    });


}

//CARGA LAS IMAGENES Y TEXTO PARA LOS EQUIPOS Y AMBIENTES
function cargardatosTablafile1Print(id) {

    $('#trLaborMinera td').remove();
    $.ajax({
        async: false,
        url: '/Home/Listar4ReporteDet?N_CODREPORTE=' + id + '&V_TIPOIMAG=LABOR',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            var contador = 0;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                        // $("#ImagenContent").attr('src', datos);
                        $("#trLaborMinera").append('<td class="p-1" width="15%" align="center"><img src="' + datos + '" style="width: 60%;height:120px" /></td>');
                    },

                });

            });
            for (var i = 1; i <= 4 - contador; i++) {
                $("#trLaborMinera").append('<td class="p-1" width="15%" align="center"><img src="/images/imagenvacia.png" style="width: 60%;height:120px" /></td>');
            }

        },

    });
}
function cargardatosTablafile2Print(id) {
    $('#trEquipos td').remove();
    $.ajax({
        async: false,
        url: '/Home/Listar4ReporteDet?N_CODREPORTE=' + id + '&V_TIPOIMAG=EQUIPOS',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            var contador = 0;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                        // $("#ImagenContent").attr('src', datos);
                        $("#trEquipos").append('<td class="p-1" width="10%" align="center"><img src="' + datos + '" style="width: 70%;height:130px" /></td>');
                    },
                });

            });
            for (var i = 1; i <= 4 - contador; i++) {
                $("#trEquipos").append('<td class="p-1" width="10%" align="center"><img src="/images/imagenvacia.png" style="width: 70%;height:130px" /></td>');
            }
        },
    });
}
function cargardatosTablafile3Print(id) {
    $('#trAmbiente td').remove();
    $.ajax({
        async: false,
        url: '/Home/Listar4ReporteDet?N_CODREPORTE=' + id + '&V_TIPOIMAG=AMBIENTE',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            var contador = 0;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                        // $("#ImagenContent").attr('src', datos);
                        $("#trAmbiente").append('<td class="p-1" width="10%" align="center"><img src="' + datos + '" style="width: 70%;height:130px" /></td>');
                    },

                });


            });
            for (var i = 1; i <= 4 - contador; i++) {
                $("#trAmbiente").append('<td class="p-1" width="10%" align="center"><img src="/images/imagenvacia.png" style="width: 70%;height:130px" /></td>');
            }
        },

    });


}
function cargardatosListaEquiposPrint(id, codrein) {

    $('#pEquiposLista').empty();
    $.ajax({
        async: false,
        url: '/Home/ListarReporteDetEquiposAmbientes?N_CODREPORTE=' + id + '&N_CODREINFO=' + codrein + '&V_TIPO=E_H',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var contador = 0;
            var datos = data.data;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                if (contador <= 10) {
                    $('#pEquiposLista').append(contador + '. ' + value.v_DESCRIPCION + '<br />');
                }
            });
        },

    });


}
function cargardatosListaAmbientePrint(id, codrein) {
    $('#pAmbienteLista').empty();
    $.ajax({
        async: false,
        url: '/Home/ListarReporteDetEquiposAmbientes?N_CODREPORTE=' + id + '&N_CODREINFO=' + codrein + '&V_TIPO=AMB',
        type: 'GET',
        dataType: 'json',

        success: function (data) {
            var contador = 0;
            var datos = data.data;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                if (contador <= 10) {
                    $('#pAmbienteLista').append(contador + '. ' + value.v_DESCRIPCION + '<br />');
                }

            });
        },
    });
}

//MUESTRA VISTA PREVIA DE PDF
function Imprimir() {
    $("#IdImprimir").printThis();
}

//MODALES DE ACUERDO A LA VERSION DEL REPORTE
function crearModalV3() {
    $("#myModalPrint").empty();
    $("#myModalPrint").append('<div class="modal-dialog modal-xl table-responsive" role="document">\
        <div class="modal-content">\
            <div class="modal-header">\
                <h6 class="modal-title">REPORTE REINFO VERSION 3</h6>\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
            <div id="IdImprimir">\
                <div class="modal-body ace-scrollbar p-0">\
                    <input type="text" id="txtId_reinfoReporte" style="display:none" />\
                    <table class="table table-responsive" style="width:100%" border="1">\
                        <tr>\
                            <th rowspan="4"><img src="/images/laytaruma.png" class="pt-2" /></th>\
                            <th width="61%"> <center><h5><strong>MINERA LAYTARUMA S.A.</strong></h5></center></th>\
                            <th width="25%" class="p-0 pl-1 pt-1" style="font-size:12px">\
                                Protocolo: <label id="lblProtocoloPrint"></label>\
                                <hr class="m-0" />\
                                Versión: <label id="lblVersionprotocolo"></label>\
                            </th>\
                        </tr>\
                        <tr>\
                            <td rowspan="2" class="p-0"><center><h6>REGISTRO INSPECCIÓN DE LABORES MINERAS TRAZABILIDAD</h6></center></td>\
                            <td style="font-size:13px" class="p-0 pl-1">\
                                Fecha : <label id="lblFechaVersion"></label>\
                                <hr class="m-0" />\
                                <label>Página 1 de 1</label>\
                            </td>\
                        </tr>\
                    </table>\
                    <table class="" border="1" style="width:100%">\
                        <tr>\
                            <th class="p-1" colspan="4" width="48%" style="font-size: 10px; background-color: lightgray ">01. DATOS GENERALES</th>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:11px" width="18%">PERSONA NATURAL/JURÍDICA</td>\
                            <td class="p-1" style="font-size:11px" width="40%"><input style="width: 100%; font-size: 11px" type="text" border="1" readonly id="txtPersonaNaturalJurPrint" /></td>\
                            <td class="p-1" style="font-size:11px">CONCESIÓN</td>\
                            <td class="p-1" style="font-size:11px"><input type="text" style="width: 100%;font-size:11px" border="1" readonly id="txtConcesionPrint" /></td>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:11px">RUC</td>\
                            <td class="p-1" style="font-size:11px"><input type="text" style="width:100%;font-size:11px" border="1" readonly id="txtRucPrint"></td>\
                                <td class="p-1" style="font-size:11px" width="14%">CÓDIGO</td>\
                                <td class="p-1" style="font-size:11px" width="30%"><input style="width: 100%; font-size: 11px" type="text" border="1" readonly id="txtCodigoDMPrint" /></td>\
                        </tr>\
                            <tr>\
                                <td class="p-1" style="font-size:11px">TM-PH/MES</td>\
                                <td class="p-1" style="font-size:11px"><input type="text" style="font-size: 11px; width: 100%;" border="1" readonly id="txtTmphMesPrint" /></td>\
                                <td class="p-1" style="font-size:11px">SITUACIÓN</td>\
                                <td class="p-1" style="font-size:11px"><select type="text" id="cmbSituacionReinfoPrint" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold">\
                                        <option value="VIGENTE">VIGENTE</option>\
                                  <option value="EXTINGUIDO">EXTINGUIDO</option></select></td>\
                             </tr>\
                                 <tr>\
                                <td class="p-1" colspan=2 style="font-size:12px"></td>\
                                <td class="p-1" colspan=2 style="font-size:8px">  * Si el derecho minero se encuentra Extinguido adjuntar el reporte del Ingemmet</td>\
                        </tr>\
                    </table>\
                        <table class="" border="1">\
                            <tr><th class="p-1" colspan="4" style="font-size: 10px; background-color: lightgray ">02. COORDENADAS</th></tr>\
                            <tr><td class="p-1" style="font-size: 10px">2.1 EN REINFO/ IGAFOM</td><td class="p-1" style="font-size: 10px">2.2 EN CAMPO</td>\
                            <tr><td class="p-1">\
                                    <table>\
                                        <tr>\
                                            <th class="p-1" style="font-size:11px" width="23%"></th>\
                                            <th class="p-1" style="font-size:11px"></th>\
                                            <th class="p-1" colspan="4" style="font-size:11px;border:groove"><center>WGS-84</center></th>\
                                            <th class="p-1" style="font-size:11px"></th>\
                                            <th class="p-1" style="font-size:11px"></th>\
                                        </tr>\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px; border: groove" width="23%">DERECHO MINERO</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ZONA</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">1.NORTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">1.ESTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">2.NORTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">2.ESTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ACTIVIDAD</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">FECHA</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px; border: groove" width="30%"><input type="text" style="width:100%" border="1" readonly id="txtNomDerMinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtZonaReinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtNorte1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtEste1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtNorte2Print" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtEste2Print" /></td>\
                                            <td class="p-1" width="16%" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtTipoActivPrint" /></td>\
                                            <td class="p-1" width="11%" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtFechaReinfoPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td class="p-1">\
                                    <table>\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px;"></th>\
                                            <th class="p-1" style="font-size: 11px;"></th>\
                                            <th class="p-1" colspan="2" style="font-size: 11px; border: groove"><center>WSG-84</center></th>\
                                        </tr>\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px; border: groove "  width="46%">COMPONENTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ZONA</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">NORTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ESTE</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="cmbComponentePrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="cmbZonaCampoPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtNorteCPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtEsteCPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 10px" colspan="2">2.3 DIFERENCIA ENTRE COORDENADAS: <input type="text" border="1" readonly style="width:17%" class="pl-2" id="txtDifCoordenadasPrint" /> METROS</td>\
                                <td class="p-1" style="font-size: 11px;display:none">2.4 SEDE: <select type="text" id="cmbSedePrint" border="1" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold" class="pl-2" /></td>\
                            </tr>\
                            <tr>\
                                <td colspan="3" class="p-0">\
                                    <table class="p-0" border="1" width="100%">\
                                        <tr>\
                                            <td class="p-1" width="13%" style="font-size: 10px">UBICACIÓN POLITICA</td>\
                                            <td class="p-1" style="font-size: 10px">DEPARTAMENTO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbDepartamentoPrint" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold" /></td>\
                                            <td class="p-1" style="font-size: 10px">PROVINCIA</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbProvinciaPrint" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold" /></td>\
                                            <td class="p-1" style="font-size: 10px">DISTRITO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbCiudadPrint" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="2" style="font-size: 10px; background-color:lightgray">03. DESCRIPCIÓN DE LA LABOR Y MINERALES:</td>\
                            </tr>\
                             <tr>\
                                <td class="p-1" colspan="2" style="font-size: 8px;">CARACTERISTICAS DE LA LABOR (Capacidad de producción - Clasificación de Mineral que extrae; óxidos y/o súlfuros - Tipos de Minerales )</td>\
                            </tr>\
                            <tr>\
                                <td colspan="2" class="p-2" style="font-size: 11px">\
                                    <textarea type="text" style="width:100%;resize:none" readonly id="txtDescripLaborPrint"></textarea>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 10px" colspan="2" >PANEL FOTOGRÁFICO (FOTOS DE LA LABOR)</td>\
                            </tr>\
                        </table>\
                        <table style="height:40%" border="1">\
                            <tr id="trLaborMinera" style="height:30%"></tr>\
                        </table>\
                        <table style="height:50%" border="1" width="100%">\
                            <tr>\
                                <td class="p-1" colspan="5" style="font-size: 10px; background-color:lightgray">04. EQUIPOS Y HERRAMIENTAS (Detallar los equipos mineros):</td>\
                            </tr>\
                              <tr>\
                                <td width="20%">\
                                    <table>\
                                        <tr id="trListaEquipos">\
                                            <td class="pt-2" width="10%" align="center"><p style="font-size:9px;text-align:left;font-weight:bold;color:darkblue" id="pEquiposLista"><div id="contenedorEquipos" style="font-size:9px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td ><td class="p-0">\
                                    <table border="1" style="height:100%" >\
                                        <tr id="trEquipos"></tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table style="height:50%" border="1" width="100%">\
                            <tr><td class="p-1" colspan="5" style="font-size: 11px; background-color:lightgray">05. INSTALACIONES Y AMBIENTES (Detallar las instalaciones y/o ambientes):</td></tr>\
                            <tr><td width="20%">\
                        <table>\
                                        <tr>\
                                            <td class="pt-2" width="10%" align="center"><p style="font-size:9px;text-align:left;font-weight:bold;color:darkblue" id="pAmbienteLista"><div id="contenedorAmbiente" style="font-size:9px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td class="p-0">\
                                    <table border="1" style="height:100%" >\
                                        <tr id="trAmbiente">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table class="table table-responsive" border="1">\
                            <tr>\
                                <td class="p-1" colspan="6" width="60%" style="font-size: 11px; background-color:lightgray">06. FUERZA LABORAL</td>\
                                <td class="p-1" colspan="4" width="40%" style="font-size: 11px; background-color:lightgray">07. ESTADO REINFO</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" width="3%" style="font-size: 11px">HOMBRES</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtCantHombPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" width="3%" style="font-size: 11px">MUJERES</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtCantMujePrint" readonly style="width:100%" /></td>\
                                <td class="p-1" width="3%" style="font-size: 11px">TOTAL PERSONAL</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtTotalPersoPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" colspan="2" width="10%" style="font-size: 11px">ESTADO REINFO</td>\
                                <td class="p-1" colspan="2" width="10%" style="font-size: 11px"><input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbEstadoIgafomPrint" /></td>\
                        </tr>\
                            <tr>\
                                <td class="p-1" colspan="4" width="60%" style="font-size: 11px; background-color:lightgray">08. IGAFOM</td>\
                                <td class="p-1" colspan="6" width="40%" style="font-size: 11px; background-color:lightgray">09. DECLARACIÓN DE PRODUCCIÓN</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" width="10%" style="font-size: 11px">IGAFOM CORRECTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomCorrectPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" width="10%" style="font-size: 11px">IGAFOM PREVENTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomPrevenPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" width="10%" style="font-size: 11px">SITUACIÓN</td>\
                                <td class="p-1" style="font-size: 11px"><select type="text" id="cmbSituacionProduccionPrint" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold" >\
                                     <option value="0"></option>\
                                <option value="DECLARADO">DECLARADO</option>\
                                  <option value="PENDIENTE">PENDIENTE</option>\
                                <option value="NO DECLARA">NO DECLARA</option>\
                                </select ></td >\
                                <td class="p-1" style="font-size: 11px">AÑO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="txtAnioPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">SEMESTRE</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="txtSemestrePrint" readonly style="width:100%" /></td>\
                            </tr>\
                              <tr>\
                                <td class="p-1" colspan="10" style="font-size: 11px; background-color:lightgray">10. CONCLUSIONES:</td>\
                            </tr>\
                            <tr>\
                                <td rowspan="1" class="p-2" style="font-size: 10px">\
                                    TRAZABILIDAD <input type="text" style="width:100%;font-size:12px;text-align:center;border:1" readonly id="cmbResultadoPrint" />\
                                </td>\
                                <td rowspan="1" class="p-2" style="font-size: 10px;display:none"">\
                                    ESTADO PROVEEDOR <input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbEstadoIgafomPrint" />\
                                </td>\
                                <td colspan="9" class="p-2" style="font-size: 12px">\
                                    <textarea id="txtConclusionPrint" class="pt-2" readonly type="text" rows="3" style="width:100%;resize:none"></textarea>\
                                </td>\
                            </tr>\
                        </table>\
                        <div>\
                            <table class="p-5" border="1" style="width:100%">\
                                <tr>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REALIZADO POR: </td>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REVISADO POR:</td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" width="20px" align="right">NOMBRE Y APELLIDO </td>\
                                    <td class="p-1" style="font-size: 11px">\
                                        <input type="text" id="txtRealizadoPor" style="width:100%" autocomplete="off" /><br />\
                                        <label id="lblErrortxtRealizadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                    <td class="p-1" style="font-size: 11px" width="20px" align="right">NOMBRE Y APELLIDO:</td>\
                                    <td class="p-1" style="font-size: 11px">\
                                        <input type="text" id="txtRevisadoPor" style="width:100%" autocomplete="off" /><br />\
                                        <label id="lblErrortxtRevisadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" align="right">FIRMA: </td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRealizadoPor" style="width:150px;height:80px" /></center></td>\
                                    <td class="p-1" style="font-size: 11px" align="right">FIRMA:</td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRevisadoPor" style="width:150px;height:80px" /></center></td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" align="right">FECHA DE INFORME: </td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRealizado" autocomplete="off" style="width:50%" /></td>\
                                    <td class="p-1" style="font-size: 11px" align="right">FECHA DE INFORME:</td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRevisado" autocomplete="off" style="width:50%" /></td>\
                                </tr>\
                            </table>\
                        </div>\
                </div>\
                </div>\
                <div class= "modal-footer" >\
                <div style="padding-right:66%;">\
                    <label>N° de Reporte:</label> <label id="lblVersionPrint" class="pl-1"></label>\
                </div>\
                <button type="button" class="btn btn-success" onclick="Imprimir()"><i class="fa fa-print text-110 align-text-bottom mr-1"></i>Imprimir</button>\
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times-circle text-110 align-text-bottom mr-1"></i>Cerrar</button><br /><br />\
            </div >\
            </div>\
    </div>');
    ListaDepartamentosPrint();
    ListaSedesPrint();

}
function crearModalV2() {
    $("#myModalPrint").empty();
    $("#myModalPrint").append('<div class="modal-dialog modal-xl table-responsive" role="document">\
        <div class="modal-content">\
            <div class="modal-header">\
                <h5 class="modal-title">Imprimir Reinfo</h5>\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
            <div id="IdImprimir">\
                <div class="modal-body ace-scrollbar p-0">\
                    <input type="text" id="TxtIndicador" style="display:none" />\
                    <input type="text" id="txtId_reinfoReporte" style="display:none" />\
                    <table class="table table-responsive" style="width:100%" border="1">\
                        <tr>\
                            <th rowspan="4"><img src="/images/laytaruma.png" class="pt-2" /></th>\
                            <th width="61%"> <center><h6><strong>MINERA LAYTARUMA S.A.</strong></h6></center></th>\
                            <th width="25%" class="p-0 pl-1 pt-1" style="font-size:12px">\
                                Protocolo: <label id="lblProtocoloPrint"></label>\
                                <hr class="m-0" />\
                                Versión: <label id="lblVersionprotocolo"></label>\
                            </th>\
                        </tr>\
                        <tr>\
                            <td rowspan="2"><center><h6>REGISTRO INSPECCIÓN DE LABORES MINERAS TRAZABILIDAD</h6></center></td>\
                            <td style="font-size:13px" class="p-0 pl-1">\
                                Fecha : <label id="lblFechaVersion"></label>\
                                <hr class="m-0" />\
                                <label>Página 1 de 1</label>\
                            </td>\
                        </tr >\
                    </table>\
                    <table class="" border="1" style="width:100%">\
                        <tr>\
                            <th class="p-1" colspan="4" width="48%" style="font-size: 12px; background-color: lightgray ">01. DATOS GENERALES</th>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:12px" width="18%">PERSONA NATURAL/JURÍDICA</td>\
                            <td class="p-1" style="font-size:12px" width="55%"><input style="width: 100%; font-size: 12px" type="text" border="1" readonly id="txtPersonaNaturalJurPrint" /></td>\
                            <td class="p-1" style="font-size:12px" width="14%">CÓDIGO DM CAMPO</td>\
                            <td class="p-1" style="font-size:12px" width="30%"><input style="width: 100%; font-size: 12px" type="text" border="1" readonly id="txtCodigoDMPrint" /></td>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:12px">RUC</td>\
                            <td class="p-1" style="font-size:12px"><input type="text" style="width:100%;font-size:12px" border="1" readonly id="txtRucPrint"></td>\
                                <td class="p-1" style="font-size:12px">TM-PH/MES</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="font-size: 12px; width: 100%;" border="1" readonly id="txtTmphMesPrint" /></td>\
                        </tr>\
                            <tr>\
                                <td class="p-1" style="font-size:12px">CONCESIÓN</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="width: 100%;font-size:12px" border="1" readonly id="txtConcesionPrint" /></td>\
                                <td class="p-1" style="font-size:12px">TM-PS/MES</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="width: 100%;font-size:12px" border="1" readonly id="txtTmpsMesPrint" /></td>\
                            </tr>\
                    </table>\
                        <table class="" border="1">\
                            <tr>\
                                <th class="p-1" colspan="4" style="font-size: 12px; background-color: lightgray ">02. COORDENADAS</th>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 11px">2.1 EN REINFO/DECLARACIÓN DE COMPROMISO</td>\
                                <td class="p-1" style="font-size: 11px">2.2 EN CAMPO</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1">\
                                    <table border="1">\
                                        <tr>\
                                            <th class="p-1" style="font-size:11px" width="28%">DERECHO MINERO</th>\
                                            <th class="p-1" style="font-size:11px">ZONA</th>\
                                            <th class="p-1" style="font-size:11px">1.NORTE</th>\
                                            <th class="p-1" style="font-size:11px">1.ESTE</th>\
                                            <th class="p-1" style="font-size:11px">2.NORTE</th>\
                                            <th class="p-1" style="font-size:11px">2.ESTE</th>\
                                            <th class="p-1" style="font-size:11px">ACTIVIDAD</th>\
                                            <th class="p-1" style="font-size:11px">FECHA</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px" width="26%"><input type="text" style="width:100%" border="1" readonly id="txtNomDerMinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtZonaReinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtNorte1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtEste1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtNorte2Print" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtEste2Print" /></td>\
                                            <td class="p-1" width="16%" style="font-size: 11px"><input type="text" style="width:100%" readonly border="1" id="txtTipoActivPrint" /></td>\
                                            <td class="p-1" width="11%" style="font-size: 11px"><input type="text" style="width:100%" readonly border="1" id="txtFechaReinfoPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td class="p-1">\
                                    <table border="1">\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px" width="41%">COMPONENTE</th>\
                                            <th class="p-1" style="font-size: 11px">ZONA</th>\
                                            <th class="p-1" style="font-size: 11px">NORTE C</th>\
                                            <th class="p-1" style="font-size: 11px">ESTE C</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" readonly border="1" id="cmbComponentePrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" readonly border="1" id="cmbZonaCampoPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" readonly border="1" id="txtNorteCPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" readonly border="1" id="txtEsteCPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 11px">2.3 DIFERENCIA DE COORDENADAS: <input type="text" border="1" readonly style="width:17%" class="pl-2" id="txtDifCoordenadasPrint" /> METROS</td>\
                                <td class="p-1" style="font-size: 11px">2.4 SEDE: <select type="text" id="cmbSedePrint" border="1" disabled="disabled" style="width: 100%; width: 100%; border-color: black; color: black; font: bold" class="pl-2" /></td>\
                            </tr>\
                            <tr>\
                                <td colspan="2" class="p-0">\
                                    <table class="p-0" border="1" width="100%">\
                                        <tr>\
                                            <td class="p-1" width="10%" style="font-size: 11px">UBICACIÓN POLITICA</td>\
                                            <td class="p-1" style="font-size: 11px">DEPARTAMENTO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbDepartamentoPrint" disabled="disabled" style="width:100%;border-color:black;color: black;font:bold" /></td>\
                                            <td class="p-1" style="font-size: 11px">PROVINCIA</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbProvinciaPrint" disabled="disabled" style="width: 100%; width: 100%; border-color: black; color: black; font: bold" /></td>\
                                            <td class="p-1" style="font-size: 11px">DISTRITO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbCiudadPrint" disabled="disabled" style="width: 100%; width: 100%; border-color: black; color: black; font: bold" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="2" style="font-size: 12px; background-color:lightgray">03. DESCRIPCIÓN DE LABORES:</td>\
                            </tr>\
                            <tr>\
                                <td colspan="2" class="p-2" style="font-size: 12px">\
                                    <textarea type="text" style="width:100%;resize:none" readonly id="txtDescripLaborPrint" border="1"></textarea>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan=2 style="font-size: 11px" width="100%">PANEL FOTOGRÁFICO (FOTOS DE LA LABOR MINERA)</td>\
                            </tr>\
                        </table>\
                        <table style="height:40%" border="1">\
                            <tr id="trLaborMinera" style="height:30%">\
                        </tr>\
                        </table>\
                        <table style="height:50%" width="100%" border="1">\
                            <tr>\
                                <td class="p-1" colspan="5" style="font-size: 12px; background-color:lightgray">04. EQUIPOS Y HERRAMIENTAS (Detallar los equipos mineros):</td>\
                            </tr>\
                            <tr>\
                                <td width="20%">\
                                    <table>\
                                        <tr id="trListaEquipos">\
                                            <td class="p-0" width="10%" align="center"><p style="font-size:9px;text-align:left;font-weight:bold;color:darkblue" id="pEquiposLista"><div id="contenedorEquipos" style="font-size:9px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td>\
                                    <table border="1">\
                                        <tr id="trEquipos">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table style="height:50%" width="100%" border="1">\
                            <tr>\
                                <td class="p-1" width="100%" colspan="5" style="font-size: 12px; background-color:lightgray">05. INSTALACIONES Y AMBIENTES (Detallar las instalaciones y/o ambientes):</td>\
                            </tr>\
                            <tr>\
                                <td width="20%">\
                                    <table>\
                                        <tr>\
                                            <td class="p-0" width="10%" align="center"><p style="font-size:9px;text-align:left;font-weight:bold;color:darkblue" id="pAmbienteLista"><div id="contenedorAmbiente" style="font-size:9px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td>\
                                    <table border="1">\
                                        <tr id="trAmbiente">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table class="" border="1">\
                            <tr>\
                                <td class="p-1" colspan="6" style="font-size: 12px; background-color:lightgray">06. FUERZA LABORAL</td>\
                                <td class="p-1" colspan="4" style="font-size: 12px; background-color:lightgray">07. IGAFOM</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" width="3%" style="font-size: 11px">HOMBRES</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtCantHombPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">MUJERES</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtCantMujePrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">TOTAL PERSONAL</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="txtTotalPersoPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">IGAFOM CORRECTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomCorrectPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">IGAFOM PREVENTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomPrevenPrint" readonly style="width:100%" /></td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="10" style="font-size: 11px; background-color:lightgray">08. CONCLUSIONES:</td>\
                            </tr>\
                            <tr>\
                                <td colspan="1" class="p-2" style="font-size: 10px;">\
                                    TRAZABILIDAD <input type="text" style="width:100%;font-size:16px;text-align:center" readonly id="cmbResultadoPrint" />\
                                </td>\
                                <td rowspan="1" class="p-2" style="font-size: 10px;">\
                                    ESTADO PROVEEDOR <input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbEstadoIgafomPrint" />\
                                </td>\
                                <td colspan="9" class="p-2" style="font-size: 12px">\
                                    <textarea id="txtConclusionPrint" class="pt-2" readonly type="text" rows="3" style="width:100%;resize:none"></textarea>\
                                </td>\
                            </tr>\
                        </table>\
                        <div>\
                            <table class="p-5" border="1" width="100%">\
                                <tr>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REALIZADO POR: </td>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REVISADO POR:</td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" width="20px" align="right">NOMBRE Y APELLIDO </td>\
                                    <td class="p-1" style="font-size: 11px">\
                                        <input type="text" id="txtRealizadoPor" style="width:100%" readonly /><br />\
                                        <label id="lblErrortxtRealizadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                    <td class="p-1" style="font-size: 11px" width="20px" align="right">NOMBRE Y APELLIDO:</td>\
                                    <td class="p-1" style="font-size: 11px">\
                                        <input type="text" id="txtRevisadoPor" style="width:100%" readonly /><br />\
                                        <label id="lblErrortxtRevisadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" align="right" >FIRMA: </td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRealizadoPor" style="width:150px;height:80px" /></center></td>\
                                    <td class="p-1" style="font-size: 11px" align="right" >FIRMA:</td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRevisadoPor" style="width:150px;height:80px" /></center></td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" align="right" >FECHA DE INFORME: </td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRealizado" maxlength="10" style="width:50%" readonly /></td>\
                                    <td class="p-1" style="font-size: 11px" align="right" >FECHA DE INFORME:</td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRevisado" maxlength="10" style="width:50%" readonly /></td>\
                                </tr>\
                            </table>\
                        </div>\
                </div>\
                </div>\
                <div class="modal-footer">\
                <div style="padding-right:66%;">\
                    <label>N° de Reporte:</label> <label id="lblVersionPrint" class="pl-1"></label>\
                </div>\
                <button type="button" class="btn btn-success" onclick="Imprimir()"><i class="fa fa-print text-110 align-text-bottom mr-1"></i>Imprimir</button>\
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times-circle text-110 align-text-bottom mr-1"></i>Cerrar</button><br /><br />\
                </div>\
            </div>\
        </div>');
    ListaDepartamentosPrint();
    ListaSedesPrint();

}

//LISTA LOS DEPARTAMENTOS Y SEDES PARA IMPRIMIR
function ListaDepartamentosPrint() {
    $.ajax({
        async: false,
        url: '/Home/ListaDepartamento',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#cmbDepartamentoPrint').empty();
            $('#cmbDepartamentoPrint').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbDepartamentoPrint').append('<option value=' + value.v_UBIGEO + '>' + value.v_DEP + '</option > ');
            });
            $.ajax({
                async: false,
                url: '/Home/ListaTodasProvincias',
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#cmbProvinciaPrint').empty();
                    $('#cmbProvinciaPrint').append('<option selected value="0">ELEGIR...</option>');
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $('#cmbProvinciaPrint').append('<option value=' + value.v_UBIGEO + '>' + value.v_PROV + '</option > ');
                    });
                    $.ajax({
                        async: false,
                        url: '/Home/ListaTodosDistritos',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            $('#cmbCiudadPrint').empty();
                            $('#cmbCiudadPrint').append('<option selected value="0">ELEGIR...</option>');
                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                $('#cmbCiudadPrint').append('<option value=' + value.v_UBIGEO + '>' + value.v_DIST + '</option > ');
                            });
                        },
                    });
                },
            });
        },
    });
}
function ListaSedesPrint() {
    $.ajax({
        async: false,
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSedePrint').empty();
            $('#cmbSedePrint').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSedePrint').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }


    });
}

//FUNCION QUE PERMITE CARGAR LA IMAGENES DE REALIZADO
function ListaFirmantesRealizado(V_DNI) {
    $.ajax({
        async: false,
        url: '/Home/ListaFirmantes?V_DNI=' + V_DNI,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#imgRealizadoPor').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $("#txtRealizadoPor").val(value.v_NOMBRES);
                $("#imgRealizadoPor").attr('src', '/firmas/' + value.v_FOTOFIRMA);

            });
        }

    });
}

//FUNCION QUE PERMITE CARGAR LA IMAGENES DE REVISADO
function ListaFirmantesRevisado(V_DNI) {
    $.ajax({
        async: false,
        url: '/Home/ListaFirmantes?V_DNI=' + V_DNI,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#imgRevisadoPor').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $("#txtRevisadoPor").val(value.v_NOMBRES);
                $("#imgRevisadoPor").attr('src', '/firmas/' + value.v_FOTOFIRMA);
            });
        }

    });
}

