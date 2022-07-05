
var $_table = $('#table');
var $_data = [];

var $_tablefileIgafomCorrect = $('#tableIgaCorrec');
var $_datafileIgafCorrect = [];
var $_tablefileIgafomPrev = $('#tableIgaPrev');
var $_datafileIgafPrev = [];
var $_tablefileIgafomLevSus = $('#tableLevSus');
var $_datafileIgafLevSus = [];
var $_tablefileIgafomResolucion = $('#tableResolucion');
var $_datafileIgafResolucion = [];
var UserSede = 0;
var sedeReinfo = 0;

//CARGA DATOS DE TABLA
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
            $('#liigafom').addClass('active');
        },
        success: function (data) {

            var datos = data.data;
            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns:[
                    [
                        {
                            field: '',
                            title: 'DATOS DE REINFO',
                            colspan: 5,
                            align: 'center',
                        },
                      
                        {
                            field: '',
                            title: 'IGAFOM CORRECTIVO',
                            width: 140,
                            align: 'center',
                            colspan: 4,

                        },
                        {
                            field: '',
                            title: 'IGAFOM PREVENTIVO',
                            width: 140,
                            align: 'center',
                            colspan: 4,

                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',


                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',


                        },


                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',


                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',
                        },
                    ],
                    [{
                        field: 'n_SEDE',
                        title: 'Sede',
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
                        title: '<label style="width:230px">Proveedor</label>',
                        width:180,
                        sortable: true,
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: '<label style="width:130px">Código Concesión</label>',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: '<label style="width:150px">Nombre Concesión</label>',

                        sortable: true,
                    },

                    {
                        field: 'v_CARGOCORRECT',
                        title: 'Cargo',
                        formatter: IgafCorrectivo,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'v_INFOMERCORRECT',
                        title: ' Informes',
                        formatter: IgafCorrectivoInforme,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'v_OTROSCORRECT',
                        title: ' Otros',
                        formatter: IgafCorrectivoOtros,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: AccionIgafomCorrec,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },

                {
                    field: 'v_CARGOPREVENT',
                    title: 'Cargo',
                    formatter: IgafPreventivo,
                    width: 140,
                    align: 'center',
                    printIgnore: true,
                    clickToSelect: false,

                        },
                        {
                            field: 'v_INFORMEPREVENT',
                            title: 'Informes',
                            formatter: IgafPreventivoInformes,
                            width: 140,
                            align: 'center',
                            printIgnore: true,
                            clickToSelect: false,

                        },
                        {
                            field: 'v_OTROSPREVENT',
                            title: 'Otros',
                            formatter: IgafPreventivoOtros,
                            width: 140,
                            align: 'center',
                            printIgnore: true,
                            clickToSelect: false,

                        },
                {
                    field: 'n_CODREINFO',
                    title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',

                    formatter: AccionIgafomPrev,
                    width: 140,
                    align: 'center',
                    printIgnore: true,
                    clickToSelect: false,

                },

                {
                    field: 'v_CARGOLEVSUS',
                    title: 'Levantamiento<br>Suspensión',
                    formatter: LevantamientoInfo,
                    width: 140,
                    align: 'center',
                    printIgnore: true,
                    clickToSelect: false,

                },
                {
                    field: 'n_CODREINFO',
                    title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',

                    formatter: AccionLevantamiento,
                    width: 140,
                    align: 'center',
                    printIgnore: true,
                    clickToSelect: false,

                },


                    {
                        field: 'v_RESOLUCIONIGAFOM',
                        title: 'Resolución',

                        formatter: Resolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',

                        formatter: AccionResolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                ],
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
                                  <title>IGAFOM</title>\
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


    function IgafPreventivo(value, row, index, field) {
        
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
    function IgafPreventivoInformes(value, row, index, field) {

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
    function IgafPreventivoOtros(value, row, index, field) {

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
    function AccionIgafomPrev(value, row, index, field) {

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomPrev('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomPrev('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function IgafCorrectivo(value, row, index, field) {
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
    function IgafCorrectivoInforme(value, row, index, field) {
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
    function IgafCorrectivoOtros(value, row, index, field) {
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
    function AccionIgafomCorrec(value, row, index, field) {


        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomCorrec('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomCorrec('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function LevantamientoInfo(value, row, index, field) {
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
    function AccionLevantamiento(value, row, index, field) {
        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getLevantamientoSupen('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getLevantamientoSupen('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }

    }
    function Resolucion(value, row, index, field) {
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
    function AccionResolucion(value, row, index, field) {

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
 
    $('#filesCorrec').prop('disabled', true);
    $('#filesPrev').prop('disabled', true);
    $('#filesLevSus').prop('disabled', true);
    $('#filesResolucion').prop('disabled', true);
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
//exportar a excel
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

     var w=window.open("/Home/ExportaExcelIgafom?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede demorar unos minutos..");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargó el archivo..  ");
    //});
    //window.open("/Home/ExportaExcelIgafom?" + parametros, "_blank");
});

function getIgafomCorrec(id,condicion) {
    if (id > 0) {
        $('#filesCorrec').prop('disabled', true);
        $('#divDescripArchCorrec').css("display", "none");
        $("#cmbTipoArchivoCorrec").val('0');
        $("#txtDescArchCorrec").val('');
        $("#cmbTipoDocCorrec").val('0');
        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRazonSocialCorrec").val(value.v_PROVEEDOR);
                    $("#txtRucProveedorCorrec").val(value.v_RUC);
                    $("#txtCodDMCorrec").val(value.v_CODCONSECION);
                    $("#txtNomConceCorrec").val(value.v_NOMCONSECION);

                    $('#txtId_IgafomCorrec').val(value.n_CODREINFO);
                    $('#TxtIndicadorCorrec').val(1);
                    cargardatosTablaIgafCorrec(id,condicion);
                    $("#myModalIGafomCorrectivo").modal({ backdrop: 'static', keyboard: false });

                    if (condicion == 1) {
                        $('#divCondicionCorrectivo').css("display", "none");


                    } else {
                        $('#divCondicionCorrectivo').css("display", "block");

                    }
                    $("#myModalIGafomCorrectivo").modal('show');
                });

            },


        });
    }
}
function getIgafomPrev(id, condicion) {
    if (id > 0) {
        $('#filesPrev').prop('disabled', true);
        $('#divDescripArchPrev').css("display", "none");
        $("#cmbTipoArchivoPrev").val('0');
        $("#txtDescArchPrev").val('');
        $("#cmbTipoDocPrev").val('0');
        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) { 
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRazonSocialPrev").val(value.v_PROVEEDOR);
                    $("#txtRucProveedorPrev").val(value.v_RUC);
                    $("#txtCodDMPrev").val(value.v_CODCONSECION);
                    $("#txtNomConcePrev").val(value.v_NOMCONSECION);
                    cargardatosTablaIgaPrev(id,condicion);
                    $('#txtId_IgafomPrev').val(value.n_CODREINFO);
                    $('#TxtIndicador').val(1);

                    $("#myModalIGafomPrev").modal({ backdrop: 'static', keyboard: false });
                    if (condicion == 1) {
                        $('#divCondicionPreventivo').css("display", "none");


                    } else {
                        $('#divCondicionPreventivo').css("display", "block");

                    }
                    $("#myModalIGafomPrev").modal('show');
                });

            },


        });

    }
}
function getLevantamientoSupen(id, condicion) {

    if (id > 0) {
        $('#filesLevSus').prop('disabled', true);
        $('#divDescripArchLevSus').css("display", "none");
        $("#cmbTipoArchivoLevSus").val('0');
        $("#txtDescArchLevSus").val('');
        $("#cmbTipoDocLevSus").val('0');
        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRazonSocialLevSus").val(value.v_PROVEEDOR);
                    $("#txtRucProveedorLevSus").val(value.v_RUC);
                    $("#txtCodDMLevSus").val(value.v_CODCONSECION);
                    $("#txtNomConceLevSus").val(value.v_NOMCONSECION);
                    cargardatosTablaLevSus(id,condicion);
                    $('#txtId_LevSus').val(value.n_CODREINFO);
                    $('#TxtIndicadorLevSus').val(1);

                    $("#myModalLevSus").modal({ backdrop: 'static', keyboard: false });
                    if (condicion == 1) {
                        $('#divCondicionLev').css("display", "none");


                    } else {
                        $('#divCondicionLev').css("display", "block");

                    }
                    $("#myModalLevSus").modal('show');
                });

            },


        });


    }

}
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

//SUBIR ARCHIVOS DE IGAFOM
$("#filesCorrec").change(function () {
    uploadFilesIgaCorrec('filesCorrec', $("#txtId_IgafomCorrec").val());

});
$("#filesPrev").change(function () {
    uploadFilesPrev('filesPrev', $("#txtId_IgafomPrev").val());

});
$("#filesLevSus").change(function () {
    uploadFilesLevSus('filesLevSus', $("#txtId_LevSus").val());

});
$("#filesResolucion").change(function () {
    uploadFilesResolucion('filesResolucion', $("#txtId_Resolucion").val());

});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE IGAFOM CORRECTIVO
$("#cmbTipoArchivoCorrec").change(function () {
    $("#txtDescArchCorrec").val('');
    if ($("#cmbTipoArchivoCorrec").val() == "0" || $("#cmbTipoDocCorrec").val() == "0") {
        $('#filesCorrec').prop('disabled', true);
    } else {
        if ($("#cmbTipoDocCorrec").val() == "OTROSCORRECTIVO") {
            $("#divDescripArchCorrec").css("display", "block");
            $('#filesCorrec').prop('disabled', true);
        } else {
            $("#divDescripArchCorrec").css("display", "none");
            $('#filesCorrec').prop('disabled', false);
        }

    }

});
$("#cmbTipoDocCorrec").change(function () {
    $("#txtDescArchCorrec").val('');
    if ($("#cmbTipoArchivoCorrec").val() == "0" || $("#cmbTipoDocCorrec").val() == "0") {
        $('#filesCorrec').prop('disabled', true);
    } else {
        if ($("#cmbTipoDocCorrec").val() == "OTROSCORRECTIVO") {
            $("#divDescripArchCorrec").css("display", "block");
            $('#filesCorrec').prop('disabled', true);
        } else {
            $("#divDescripArchCorrec").css("display", "none");
            $('#filesCorrec').prop('disabled', false);
        }
    }
});
$("#txtDescArchCorrec").keyup(function () {
    if ($("#txtDescArchCorrec").val().trim() == "") {
        $('#filesCorrec').prop('disabled', true);
    } else {
        $('#filesCorrec').prop('disabled', false);
    }
});


//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE IGAFOM PREVENTIVO
$("#cmbTipoArchivoPrev").change(function () {
    $("#txtDescArchPrev").val('');
    if ($("#cmbTipoArchivoPrev").val() == "0" || $("#cmbTipoDocPrev").val() == "0") {
        $('#filesPrev').prop('disabled', true);
    } else {
        
        if ($("#cmbTipoDocPrev").val() == "OTROSPREVENTIVO") {
            $("#divDescripArchPrev").css("display", "block");
            $('#filesPrev').prop('disabled', true);
        } else {
            $("#divDescripArchPrev").css("display", "none");
            $('#filesPrev').prop('disabled', false);
        }
    }
});
$("#cmbTipoDocPrev").change(function () {
    $("#txtDescArchPrev").val('');
    if ($("#cmbTipoArchivoPrev").val() == "0" || $("#cmbTipoDocPrev").val() == "0") {
        $('#filesPrev').prop('disabled', true);
    } else {
       
        if ($("#cmbTipoDocPrev").val() == "OTROSPREVENTIVO") {
            $("#divDescripArchPrev").css("display", "block");
            $('#filesPrev').prop('disabled', true);
        } else {
            $("#divDescripArchPrev").css("display", "none");
            $('#filesPrev').prop('disabled', false);
        }
    }

});

$("#txtDescArchPrev").keyup(function () {
    if ($("#txtDescArchPrev").val().trim() == "") {
        $('#filesPrev').prop('disabled', true);
    } else {
        $('#filesPrev').prop('disabled', false);
    }
});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS DE LEVANTAMIENTO DE SUSPENSION
$("#cmbTipoArchivoLevSus").change(function () {
    $("#txtDescArchLevSus").val('');
    if ($("#cmbTipoArchivoLevSus").val() == "0" || $("#cmbTipoDocLevSus").val() == "0") {
        $('#filesLevSus').prop('disabled', true);
    } else {
        if ($("#cmbTipoDocLevSus").val() == "OTROSLEVSUS") {
            $("#divDescripArchLevSus").css("display", "block");
            $('#filesLevSus').prop('disabled', true);
        } else {
            $("#divDescripArchLevSus").css("display", "none");
            $('#filesLevSus').prop('disabled', false);
        }
        
    }

});
$("#cmbTipoDocLevSus").change(function () {
    $("#txtDescArchLevSus").val('');
    if ($("#cmbTipoArchivoLevSus").val() == "0" || $("#cmbTipoDocLevSus").val() == "0") {
        $('#filesLevSus').prop('disabled', true);
    } else {
        if ($("#cmbTipoDocLevSus").val() == "OTROSLEVSUS") {
            $("#divDescripArchLevSus").css("display", "block");
            $('#filesLevSus').prop('disabled', true);
        } else {
            $("#divDescripArchLevSus").css("display", "none");
            $('#filesLevSus').prop('disabled', false);
        }
    }

});

$("#txtDescArchLevSus").keyup(function () {
    if ($("#txtDescArchLevSus").val().trim() == "") {
        $('#filesLevSus').prop('disabled', true);
    } else {
        $('#filesLevSus').prop('disabled', false);
    }
});

//CODIGO PARA BLOQUEAR BOTON DE SUBIDA DE ARCHIVOS
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

//LISTAR TABLAS DE IGAFOM
function cargardatosTablaIgafCorrec(id,condicion) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=CORRECTIVO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafileIgafCorrect = datos;
            $_tablefileIgafomCorrect.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileIgafCorrect,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de documento',
                        formatter: tipoimag,
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Archivo',

                        sortable: true,
                    },
                    {
                        field: 'v_DESCRIPARCH',
                        title: 'Descripción del Archivo',
                        formatter: descripcion,
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',

                        formatter: formatTableCellActions2,
                        width: 80,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODARCHIVO',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions,
                        width: 80,
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
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoCorrec('+ value + ')>\
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
    function tipoimag(value, row, index, field) {

        return '<label>' + value.substring(0, value.length - 10) + '</label>';

    }
    function descripcion(value, row, index, field) {
        if (value == "") {
            return '-';
        } else {
            return value;
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
            field: 'n_CODARCHIVO',
            values: ids
        });
        $removeBtn.prop('disabled', true)
    });
}
function cargardatosTablaIgaPrev(id,condicion) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=PREVENTIVO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafileIgafPrev = datos;
            $_tablefileIgafomPrev.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileIgafPrev,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de Documento',
                        formatter: tipoimag2,
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Archivo',

                        sortable: true,
                    },
                    {
                        field: 'v_DESCRIPARCH',
                        title: 'Descripción del Archivo',
                        formatter: descripcion,
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',

                        formatter: formatTableCellActions2,
                        width: 80,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },



                    {
                        field: 'n_CODARCHIVO',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',

                        formatter: formatTableCellActions,
                        width: 80,
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
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoPrev('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                  <i class="fa fa-ban text-105"></i>\
                              </div > ';
        }
    }
    function tipoimag2(value, row, index, field) {

        return '<label>' + value.substring(0, value.length - 10) + '</label>';

    }
    function formatTableCellActions2(value, row, index, field) {

        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"  >\
                                  <i class="fa fa-download text-105"></i>\
                                </a></div>';
    }
    function descripcion(value, row, index, field) {
        if (value == "") {
            return '-';
        } else {
            return value;
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
            field: 'n_CODARCHIVO',
            values: ids
        });
        $removeBtn.prop('disabled', true)
    });
}

function cargardatosTablaLevSus(id,condicion) {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=LEVANTAMIENTO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $_datafileIgafLevSus = datos;
            $_tablefileIgafomLevSus.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileIgafLevSus,
                columns: [
                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',
                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de Documento',
                        formatter: tipoimag3,
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Archivo',
                        sortable: true,
                    },
                    {
                        field: 'v_DESCRIPARCH',
                        title: 'Descripción del archivo',
                        formatter: descripcion,
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions2,
                        width: 80,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODARCHIVO',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions,
                        width: 80,
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
                //search: false,
                //searchAlign: "left",
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
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoLevSus('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                  <i class="fa fa-ban text-105"></i>\
                              </div > ';
        }
    }
    function tipoimag3(value, row, index, field) {

        return '<label>' + value.substring(0, value.length - 6) + '</label>';

    }

    function formatTableCellActions2(value, row, index, field) {

        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"  >\
                                  <i class="fa fa-download text-105"></i>\
                                </a></div>';
    }
    function descripcion(value, row, index, field) {
        if (value == "") {
            return '-';
        } else {
            return value;
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
            field: 'n_CODARCHIVO',
            values: ids
        });

        $removeBtn.prop('disabled', true)
    });


}
function cargardatosTablaResolucion(id, condicion) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=RESOLUCION',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafileIgafResolucion = datos;
            $_tablefileIgafomResolucion.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileIgafResolucion,

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
                        width: 80,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },

                    {
                        field: 'n_CODARCHIVO',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',

                        formatter: formatTableCellActions,
                        width: 80,
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
function ListaSedesFiltrar() {
    $.ajax({
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSedeFiltrar').empty();
            $('#cmbSedeFiltrar').append('<option selected value="0">TODOS..</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSedeFiltrar').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }
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

//SUBIR IGAFOM CORRECTIVO
function uploadFilesIgaCorrec(inputId, id) {
    if ($("#cmbTipoDocCorrec").val() =="CARGOCORRECTIVO") {
        $.ajax({
            url: "/Home/ValidaCargo?N_CODREIN=" + id + "&V_TIPOIMAG=CARGOCORRECTIVO",
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {

                if (data.data.length > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ya existe cargo Correctivo',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $("#filesCorrec").val('');
                    $("#txtDescArchCorrec").val('');
                } else {

                    var input = document.getElementById(inputId);
                    var files = input.files;
                    var formData = new FormData();
                    for (var i = 0; i != files.length; i++) {
                        formData.append("files", files[i]);
                        formData.append("N_CODREIN", id);
                        formData.append("N_CODIGAFOM", 1);
                        formData.append("V_TIPOARCH", $("#cmbTipoArchivoCorrec").val());
                        formData.append("V_TIPOIMAG", $("#cmbTipoDocCorrec").val());
                        formData.append("V_TIPOIGAFOM", "CORRECTIVO");
                        formData.append("V_DESCRIPARCH", $("#txtDescArchCorrec").val());
                    }

                    $.ajax(
                        {
                            url: "/Home/PostArchivos",
                            data: formData,
                            processData: false,
                            contentType: false,
                            type: "POST",
                            success: function (data) {

                                cargardatosTablaIgafCorrec($("#txtId_IgafomCorrec").val(),0);

                                $("#filesCorrec").val('');
                                $("#txtDescArchCorrec").val('');
                                cargardatosTabla();

                            }
                        }
                    );

                }
            }
        }
        );
    } else{
        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 1);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoCorrec").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocCorrec").val());
            formData.append("V_TIPOIGAFOM", "CORRECTIVO");
            formData.append("V_DESCRIPARCH", $("#txtDescArchCorrec").val());
        }

        $.ajax(
            {
                url: "/Home/PostArchivos",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {

                    cargardatosTablaIgafCorrec($("#txtId_IgafomCorrec").val(),0);

                    $("#filesCorrec").val('');
                    $("#txtDescArchCorrec").val('');
                    cargardatosTabla();

                }
            }
        );

    }
        
    


} 

//IGAFOM PREVENTIVO
function uploadFilesPrev(inputId, id) {

    if ($("#cmbTipoDocPrev").val() == "CARGOPREVENTIVO") {
        $.ajax({
            url: "/Home/ValidaCargo?N_CODREIN=" + id + "&V_TIPOIMAG=CARGOPREVENTIVO",
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {

                if (data.data.length > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ya existe cargo preventivo',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $("#filesPrev").val('');
                    $("#txtDescArchPrev").val('');
                } else {
                    var input = document.getElementById(inputId);
                    var files = input.files;
                    var formData = new FormData();
                    for (var i = 0; i != files.length; i++) {
                        formData.append("files", files[i]);
                        formData.append("N_CODREIN", id);
                        formData.append("N_CODIGAFOM", 1);
                        formData.append("V_TIPOARCH", $("#cmbTipoArchivoPrev").val());
                        formData.append("V_TIPOIMAG", $("#cmbTipoDocPrev").val());
                        formData.append("V_TIPOIGAFOM", "PREVENTIVO");
                        formData.append("V_DESCRIPARCH", $("#txtDescArchPrev").val());
                    }

                    $.ajax(
                        {
                            url: "/Home/PostArchivos",
                            data: formData,
                            processData: false,
                            contentType: false,
                            type: "POST",
                            success: function (data) {

                                cargardatosTablaIgaPrev($("#txtId_IgafomPrev").val(),0);
                                $("#filesPrev").val('');
                                $("#txtDescArchPrev").val('');
                                cargardatosTabla();
                            }
                        }
                    );


                }
            }
        }
        );
    } else {
        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 1);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoPrev").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocPrev").val());
            formData.append("V_TIPOIGAFOM", "PREVENTIVO");
            formData.append("V_DESCRIPARCH", $("#txtDescArchPrev").val());
        }

        $.ajax(
            {
                url: "/Home/PostArchivos",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {

                    cargardatosTablaIgaPrev($("#txtId_IgafomPrev").val(),0);
                    $("#filesPrev").val('');
                    $("#txtDescArchPrev").val('');
                    cargardatosTabla();
                }
            }
        );


    }

}

//ARCHIVOS LEVANTAMIENTO DE SUSPENSION
function uploadFilesLevSus(inputId, id) {

  

    if ($("#cmbTipoDocLevSus").val() == "CARGOLEVSUS") {
        $.ajax({
            url: "/Home/ValidaCargo?N_CODREIN=" + id + "&V_TIPOIMAG=CARGOLEVSUS",
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {

                if (data.data.length > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ya existe cargo de levantamiento de suspensión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $("#filesLevSus").val('');
                    $("#txtDescArchLevSus").val('');
                } else {
                    
                    var input = document.getElementById(inputId);
                    var files = input.files;
                    var formData = new FormData();
                    for (var i = 0; i != files.length; i++) {
                        formData.append("files", files[i]);
                        formData.append("N_CODREIN", id);
                        formData.append("N_CODIGAFOM", 1);
                        formData.append("V_TIPOARCH", $("#cmbTipoArchivoLevSus").val());
                        formData.append("V_TIPOIMAG", $("#cmbTipoDocLevSus").val());
                        formData.append("V_TIPOIGAFOM", "LEVANTAMIENTO");
                        formData.append("V_DESCRIPARCH", $("#txtDescArchLevSus").val());
                    }


                    $.ajax({
                        url: "/Home/PostArchivos",
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: "POST",
                        success: function (data) {

                            cargardatosTablaLevSus($("#txtId_LevSus").val(),0);
                            $("#filesLevSus").val('');
                            $("#txtDescArchLevSus").val('');
                            cargardatosTabla();
                        }
                    }
                    );

                }
            }
        }
        );
    } else {
        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 1);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoLevSus").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocLevSus").val());
            formData.append("V_TIPOIGAFOM", "LEVANTAMIENTO");
            formData.append("V_DESCRIPARCH", $("#txtDescArchLevSus").val());
        }


        $.ajax({
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {

                cargardatosTablaLevSus($("#txtId_LevSus").val(),0);
                $("#filesLevSus").val('');
                $("#txtDescArchLevSus").val('');

                cargardatosTabla();
            }
        }
        );


    }
}

//ARCHIVOS RESOLUCION
function uploadFilesResolucion(inputId, id) {

        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM", 1);
            formData.append("V_TIPOARCH", $("#cmbTipoArchivoResolucion").val());
            formData.append("V_TIPOIMAG", $("#cmbTipoDocResolucion").val());
            formData.append("V_TIPOIGAFOM", "RESOLUCION");
        }


        $.ajax({
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

function DeleteArchivoCorrec(id) {

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
                      
                    cargardatosTablaIgafCorrec($("#txtId_IgafomCorrec").val(),0);
                         
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

function DeleteArchivoPrev(id) {

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

                    cargardatosTablaIgaPrev($("#txtId_IgafomPrev").val(),0);

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

function DeleteArchivoLevSus(id) {

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

                    cargardatosTablaLevSus($("#txtId_LevSus").val(),0);

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
                columns:[
                    [
                        {
                            field: '',
                            title: 'DATOS DE REINFO',
                            colspan: 5,
                            align: 'center',
                        },

                        {
                            field: '',
                            title: 'IGAFOM CORRECTIVO',
                            width: 140,
                            align: 'center',
                            colspan: 4,

                        },
                        {
                            field: '',
                            title: 'IGAFOM PREVENTIVO',
                            width: 140,
                            align: 'center',
                            colspan: 4,

                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',


                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',


                        },


                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',


                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            align: 'center',
                        },
                    ],
                    [
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
                        title: '<label style="width:230px">Proveedor</label>',
                        width: 180,
                        sortable: true,
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: '<label style="width:130px">Código Concesión</label>',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: '<label style="width:150px">Nombre Concesión</label>',
                        sortable: true,
                    },

                    {
                        field: 'v_CARGOCORRECT',
                        title: 'CARGO',
                        formatter: IgafCorrectivo,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                        },
                        {
                            field: 'v_INFOMERCORRECT',
                            title: 'INFORME',
                            formatter: IgafCorrectivo,
                            width: 140,
                            align: 'center',
                            printIgnore: true,
                            clickToSelect: false,
                        },
                        {
                            field: 'v_OTROSCORRECT',
                            title: 'OTROS',
                            formatter: IgafCorrectivo,
                            width: 140,
                            align: 'center',
                            printIgnore: true,
                            clickToSelect: false,
                        },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: AccionIgafomCorrec,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },

                    {
                        field: 'v_CARGOPREVENT',
                        title: 'CARGO',
                        formatter: IgafPreventivo,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                        },
                        {
                            field: 'v_INFORMEPREVENT',
                            title: 'INFORME',
                            formatter: IgafPreventivo,
                            width: 140,
                            align: 'center',
                            printIgnore: true,
                            clickToSelect: false,
                        },
                        {
                            field: 'v_OTROSPREVENT',
                            title: 'OTROS',
                            formatter: IgafPreventivo,
                            width: 140,
                            align: 'center',
                            printIgnore: true,
                            clickToSelect: false,
                        },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: AccionIgafomPrev,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },

                    {
                        field: 'v_CARGOLEVSUS',
                        title: 'Levantamiento<br>Suspensión',
                        formatter: LevantamientoInfo,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: AccionLevantamiento,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'v_RESOLUCIONIGAFOM',
                        title: 'Resolución',

                        formatter: Resolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',

                        formatter: AccionResolucion,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },

                ]
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
    function IgafPreventivo(value, row, index, field) {

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
    function AccionIgafomPrev(value, row, index, field) {
        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomPrev('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomPrev('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function IgafCorrectivo(value, row, index, field) {
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
    function AccionIgafomCorrec(value, row, index, field) {

        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomCorrec('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                                 <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getIgafomCorrec('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function LevantamientoInfo(value, row, index, field) {
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
    function AccionLevantamiento(value, row, index, field) {
        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getLevantamientoSupen('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        } else {
            return '<div class="action-buttons">\
                        <a class="text-purple mx-2px" style="cursor:pointer;" onclick=getLevantamientoSupen('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div>';
        }
    }
    function Resolucion(value, row, index, field) {
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
    $('#txNombreConceFiltrar').val('');
    $('#txtNomDerechoMineroFiltrar').val('');
    $('#txtCodConcesionFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#cmbResultado').val('0');
    $('#cmbSedeFiltrar').val('0');
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