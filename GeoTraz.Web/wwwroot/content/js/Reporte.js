var $_table = $('#table');
var $_data = [];

jQuery(function ($) {
    //initiate the plugin
    cargardatosTabla();
    ListaSedesFiltrar();


    
});
//exportar a excel
$('#btnExportar').click(function () {
   
    var V_RUC = $('#txtRucFiltrar').val();
    var V_PROVEEDOR = encodeURIComponent($('#txtRazonSocialFiltrar').val());
    var V_CODCONSECION = $('#txtCodConcesionFiltrar').val();
    var V_NOMCONSECION = $('#txNombreConceFiltrar').val();
    var V_REALIZADOPOR = $('#txtRealizadoPorFiltrar').val();
    var V_REVISADOPOR = $('#txtRevisadoPorFiltrar').val();
    var V_FECHAREALIZADO = $('#txtFechaRealizadoFiltrar').val();
    var V_FECHAREVISADO = $('#txtFechaRevisadoFiltrar').val();
    var N_SEDES = $('#cmbSedeFiltrar').val();
    var parametros = "V_RUC=" + V_RUC + "%&V_PROVEEDOR=%" + V_PROVEEDOR + "%&V_CODCONSECION=%" + V_CODCONSECION + "%&V_NOMCONSECION=%" + V_NOMCONSECION + "%&V_REALIZADOPOR=%&V_REVISADOPOR=%&V_FECHAREALIZADO=%&V_FECHAREVISADO=%&V_FECCREACION=%&N_SEDES=" + N_SEDES;

    var w = window.open("/Home/ExportaExcelReportes?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede demorar unos minutos...");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargó el archivo..  " );
    //});
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
            $('#liReporte').addClass('active');
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
                        title: 'CÓDIGO CONCESIÓN:',

                        sortable: true
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: 'NOMBRE CONCESIÓN:',

                        sortable: true
                    },

                    {
                        field: 'n_CODREPORTE',
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
                                  <title>REPORTE HISTORICO</title>\
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


function Imprimir() {
 $("#IdImprimir").printThis();
    }

//FUNCION PARA PODER RECUPERAR EL REPORTE, SUS DATOS Y MOSTRARLOS
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

function cargardatosTablafile1Print(id) {

    $('#trLaborMinera td').remove();
    $.ajax({
        async:false,
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
                    async:false,
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
                    async:false,
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

function DeleteReporte(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: 'Esta seguro de eliminar los datos del reporte?',
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
                url: '/Home/EliminarReporte?N_CODREPORTE=' + id,
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se Eliminaron los datos',
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



//LIMPIAR TEXTOS DE FILTROS DE BUSQUEDA
$('#btnReset').click(function () {
    cargardatosTabla();
    LimpiarFiltros();
});


$('#btnSearch').click(function () {
    Filtrar();
});

function Filtrar() {
    $.ajax({
        url: '/Home/FiltrarReporte?V_RUC=' + $('#txtRucFiltrar').val() + '%&V_PROVEEDOR=%' + encodeURIComponent($('#txtRazonSocialFiltrar').val()) + '%&V_CODCONSECION=' + $('#txtCodConcesionFiltrar').val() + '%&V_NOMCONSECION=' + $('#txNombreConceFiltrar').val() + '%&V_REALIZADOPOR=' + $('#txtRealizadoPorFiltrar').val() + '%&V_REVISADOPOR=' + $('#txtRevisadoPorFiltrar').val() + '%&V_FECHAREALIZADO=' + $('#txtFechaRealizadoFiltrar').val() + '%&V_FECHAREVISADO=' + $('#txtFechaRevisadoFiltrar').val() + '%' + '%&V_FECCREACION=%' + '&N_SEDES=' + $('#cmbSedeFiltrar').val(),
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
                    {
                        field: 'n_CODREPORTE',
                        title: '<i class="fa fa-times-circle text-secondary-d1 text-130"></i>',
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
//#endregion
function LimpiarFiltros() {
    $('#txtRucFiltrar').val('');
    $('#txtRazonSocialFiltrar').val('');
    $('#txtCodConcesionFiltrar').val('');
    $('#txNombreConceFiltrar').val('');
    $('#txtRealizadoPorFiltrar').val('');
    $('#txtRevisadoPorFiltrar').val('');
    $('#txtFechaRealizadoFiltrar').val('');
    $('#txtFechaRevisadoFiltrar').val('');
    $('#txtFechaCreacionFiltrar').val('');
    $('#cmbSedeFiltrar').val('0');
}

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
                            <td rowspan="2"><center><h6>REGISTRO DE INSPECCIÓN DE LABORES MINERAS TRAZABILIDAD</h6></center></td>\
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
                                            <td class="p-1" width="10%" style="font-size: 11px">UBICACIÓN POLÍTICA</td>\
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

function ListaDepartamentosPrint() {
    $.ajax({
        async:false,
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