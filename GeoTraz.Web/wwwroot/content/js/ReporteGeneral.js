var $_table = $('#table');
var $_data = [];

jQuery(function ($) {

 
    cargardatosTabla();

});

function cargardatosTabla() {

    $.ajax({
        url: '/Home/ListaReporte',
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
            $('#liReporteGeneral').addClass('active');
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
                        field: 'v_RESULTADOS',
                        title: 'RESULTADO:',
                        formatter: RESULTADO,
                        sortable: true
                    },
                    {
                        field: 'v_FECHAREALIZADO',
                        title: 'FECHA REALIZADO:',
                        sortable: true
                    },
                    {
                        field: 'n_VERSION',
                        title: 'N° REPORTE:',
                        sortable: true
                    },
                    {
                        field: 'v_RUC',
                        title: 'RUC:',
                        sortable: true
                    },
                    {
                        field: 'v_PROVEEDOR',
                        title: 'RAZÓN SOCIAL:',
                        sortable: true
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: 'CODIGO CONCESIÓN:',
                        sortable: true
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: 'NOMBRE CONCESIÓN:',
                        sortable: true
                    },
                    //{
                    //    field: 'n_CODREPORTE',
                    //    title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                    //    formatter: formatTableCellActions,
                    //    width: 140,
                    //    align: 'center',
                    //    printIgnore: true,
                    //    clickToSelect: false,
                    //},
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
                                  <title>REPORTE</title>\
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
                                <a class="text-success mx-2px" href="#" onclick=getReporte('+ value + ') >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                               </div > ';
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
                    }
                });
            },
        });

        return '<label>' + nomSede + '</label>';
    }

    function RESULTADO(value, row, index, field) {

        if (value == "TZ") {
            return '<label  style="color:#2ECC71;">TRAZABLE</label>';
        } else if (value == "P") {
            return '<label  style="color:#F1C40F;">PENDIENTE</label>';
        }
        else if (value == "NT") {
            return '<label  style="color:#E74C3C;">NO TRAZABLE</label>';
        }
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
//exportar a excel
$('#btnExportaReinfoGeneral').click(function () {
    //$('#lireporte3').addClass('active');
    
    var V_RUC = '%';
    var V_PROVEEDOR = '%';
    var V_CODCONSECION = '%';
    var V_NOMCONSECION = '%';
    var V_REALIZADOPOR = '%';
    var V_REVISADOPOR = '%';
    var V_FECHAREALIZADO = '%';
    var V_FECHAREVISADO = '%';
    var N_SEDES = '%';
    var parametros = "V_RUC=" + V_RUC + "%&V_PROVEEDOR=%" + V_PROVEEDOR + "%&V_CODCONSECION=%" + V_CODCONSECION + "%&V_NOMCONSECION=%" + V_NOMCONSECION + "%&V_REALIZADOPOR=%&V_REVISADOPOR=%&V_FECHAREALIZADO=%&V_FECHAREVISADO=%&V_FECCREACION=%&N_SEDES=" + N_SEDES;
    var w = window.open("/Home/ExportaExcelReportesGeneral?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede demorar unos minutos...");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargo el archivo correctamente");
    //});
    //toastr["info"]("La descarga de archivo puede demorar unos minutos...");
});

